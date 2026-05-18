import $, { data } from "jquery";
import { replace } from "react-router-dom";
import peopleSets from "../dataCreate/peopleSets.json";
import * as XLSX from "xlsx";

// ─────────────────────────────────────────────────────────────────────────────
// DATA HELPERS
// ─────────────────────────────────────────────────────────────────────────────
function GetData() {
  let data_get_from_RESID = [];
  try {
    data_get_from_RESID = JSON.parse($("#ResID").text());
  } catch (error) {
    $("ResID04").text("KHÔNG CÓ JSON THÍCH HỢP");
  }
  return data_get_from_RESID;
}

function GetDatabyid(id) {
  let data_get_from_RESID = [];
  try {
    data_get_from_RESID = JSON.parse($(id).text());
  } catch (error) {
    $("ResID04").text("KHÔNG CÓ JSON THÍCH HỢP");
  }
  return data_get_from_RESID;
}

// ─────────────────────────────────────────────────────────────────────────────
// (1) ĐỐI TƯỢNG ĐƠN: {x:A2, y:HD-03}  →  thay thế 1:1, không sinh thêm dòng
//
// Luồng xử lý:
//   extractObjectsFromString("{x:A2, y:HD-03}")
//     → [{origin:"{x:A2, y:HD-03}", x:"A2", y:"HD-03"}]
//   findValueByHDAndKey(data_02, "A2", "HD-03")
//     → tìm row có HD-Bmark="A2", lấy giá trị cột "HD-03" → "For here-"
//   str.split("{x:A2, y:HD-03}").join("For here-")
//     → "For here-"
//
// Hàm extractObjectsFromString chỉ match {key:val,...} PHẲNG (không có [] bên trong).
// Regex (?!data:\[) đảm bảo bỏ qua {data:[...], group:...} để tránh xung đột.
// ─────────────────────────────────────────────────────────────────────────────

function extractObjectsFromString(str) {
  const regex = /\{(?!data:\s*\[)[^}]+\}/g;
  const matches = str.match(regex);
  return matches
    ? matches.map((match) => {
        const objStr = match.slice(1, -1);
        const obj = { origin: match };
        objStr.split(",").forEach((pair) => {
          const colonIdx = pair.indexOf(":");
          if (colonIdx >= 0) {
            const key = pair.slice(0, colonIdx).trim();
            const value = pair.slice(colonIdx + 1).trim();
            obj[key] = value;
          }
        });
        return obj;
      })
    : [];
}

// ─────────────────────────────────────────────────────────────────────────────
// (2) ĐỐI TƯỢNG NHIỀU GIÁ TRỊ: {data:[{x:...,y:...},...], group:TÊN}
//
// NGUYÊN TẮC:
//   • Cùng group name → ZIP theo index (đồng bộ):
//       group:A2 field-A [v0,v1,v2] + group:A2 field-B [w0,w1,w2]
//       → 3 combo: (v0,w0), (v1,w1), (v2,w2)
//
//   • Khác group name → CARTESIAN PRODUCT giữa các trục:
//       group:A1 (3 combo) × group:A2 (3 combo) → 9 combo tổng
//
//   • Vị trí trong pipeline: TRƯỚC bước res04 (sau res03)
//     Sau expand, field values đã là giá trị thực → res04 xử lý {x,y} đơn bình thường.
//
// VÍ DỤ Row A1:
//   02-aw-01:     {data:[{x:A5,y:HD-02},{x:A6,y:HD-02},{x:A7,y:HD-02}], group:A1}
//   02-submit-01: {data:[{x:A5,y:HD-03},{x:A6,y:HD-03},{x:A7,y:HD-03}], group:A1}
//   → cùng group:A1 → zip → sinh 3 row:
//     row1: 02-aw-01="Table for two.|..." 02-submit-01="Two people-"
//     row2: 02-aw-01="Table for three.|..." 02-submit-01="Three people-"
//     row3: 02-aw-01="Table for four.|..." 02-submit-01="Four people-"
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Parse {data:[{x:...,y:...},...], group:NAME} từ một chuỗi field.
 *
 * Regex xử lý:
 *   \{data:\s*\[   → mở đầu {data:[  (bỏ qua khoảng trắng/tab)
 *   ([^\]]*)       → nội dung mảng  (không chứa ] → bắt được {x:..} bên trong)
 *   \]\s*,?\s*group:\s*  → đóng ] rồi group:
 *   ([^\s}]+)      → tên group (A1, A2, ...)
 *   \s*\}          → đóng }
 *
 * @param {string} str - Chuỗi field value
 * @returns {{ origin:string, data:Object[], group:string }[]}
 */
function extractMultiValuePatterns(str) {
  if (!str || typeof str !== "string") return [];
  const results = [];
  // Hỗ trợ whitespace (tab, newline) giữa các thành phần
  const regex = /\{data:\s*\[([^\]]*)\]\s*,?\s*group:\s*([^\s}]+)\s*\}/g;
  let match;
  while ((match = regex.exec(str)) !== null) {
    const origin = match[0]; // Toàn bộ chuỗi khớp → dùng để split/replace
    const dataStr = match[1]; // Phần bên trong data:[...]
    const groupVal = match[2].trim(); // Tên group: A1, A2, ...

    // Parse từng item {x:..., y:..., z?:...} bên trong data:[...]
    const itemRegex = /\{([^}]+)\}/g;
    const items = [];
    let itemMatch;
    while ((itemMatch = itemRegex.exec(dataStr)) !== null) {
      const itemObj = {};
      itemMatch[1].split(",").forEach((pair) => {
        const colonIdx = pair.indexOf(":");
        if (colonIdx >= 0) {
          const k = pair.slice(0, colonIdx).trim();
          const v = pair.slice(colonIdx + 1).trim();
          if (k && v) itemObj[k] = v;
        }
      });
      items.push(itemObj);
    }
    if (items.length > 0) {
      results.push({ origin, data: items, group: groupVal });
    }
  }
  return results;
}

/**
 * Mở rộng các row chứa {data:[...], group:NAME} thành nhiều row.
 *
 * Bước 1: Scan tất cả field trong row, tìm multi-value patterns.
 * Bước 2: Nhóm patterns theo group name → mỗi group = 1 "trục".
 *         Trong mỗi trục: các field cùng group ZIP theo index.
 * Bước 3: Cartesian product giữa các trục khác nhau.
 * Bước 4: Áp dụng từng tổ hợp → sinh row mới.
 *
 * @param {Object[]} rows        - Mảng object JSON (res03)
 * @param {Object[]} data_lookup - Bảng tra cứu (data_02)
 * @returns {Object[]}           - Mảng row đã mở rộng
 */
function expandGroupPatterns(rows, data_lookup) {
  const result = [];

  rows.forEach((row) => {
    // ── Bước 1: Thu thập tất cả patterns trong row ────────────────────────
    const allPatterns = []; // [{fieldKey, origin, group, resolvedValues}]

    Object.keys(row).forEach((fieldKey) => {
      const val = row[fieldKey];
      if (!val || typeof val !== "string") return;
      const patterns = extractMultiValuePatterns(val);
      patterns.forEach((p) => {
        allPatterns.push({
          fieldKey,
          origin: p.origin,
          group: p.group,
          // Tra bảng ngay để lấy giá trị thực cho mỗi item
          resolvedValues: p.data.map(
            (item) =>
              findValueByHDAndKey(data_lookup, item.x, item.y, item.z) ||
              "ERROR",
          ),
        });
      });
    });

    // Không có pattern → giữ nguyên row
    if (allPatterns.length === 0) {
      result.push(row);
      return;
    }

    // ── Bước 2: Nhóm theo group name ──────────────────────────────────────
    // byGroup = { "A1": [...patterns], "A2": [...patterns], ... }
    const byGroup = {};
    allPatterns.forEach((p) => {
      if (!byGroup[p.group]) byGroup[p.group] = [];
      byGroup[p.group].push(p);
    });

    // ── Bước 3: Xây dựng các "trục" (axes) ───────────────────────────────
    // Mỗi trục = mảng các "slot-set" (1 slot-set = 1 bước trong tổ hợp)
    // Slot-set = [{fieldKey, origin, value}, ...] để apply cùng lúc
    //
    // • Cùng group → ZIP: index i của tất cả patterns trong group đi cùng nhau
    // • Khác group → Cartesian: mỗi group = 1 trục độc lập
    const axes = [];

    Object.keys(byGroup).forEach((groupName) => {
      const groupPatterns = byGroup[groupName];
      const maxLen = Math.max(
        ...groupPatterns.map((p) => p.resolvedValues.length),
      );

      // Trục này có maxLen slot-set, mỗi slot-set gom tất cả field cùng group tại index i
      const axis = [];
      for (let i = 0; i < maxLen; i++) {
        const slotSet = groupPatterns.map((p) => ({
          fieldKey: p.fieldKey,
          origin: p.origin,
          // Nếu index vượt quá độ dài, lấy phần tử cuối (safety fallback)
          value: p.resolvedValues[Math.min(i, p.resolvedValues.length - 1)],
        }));
        axis.push(slotSet);
      }
      axes.push(axis);
    });

    // ── Bước 4: Cartesian product giữa các trục ───────────────────────────
    // combinations[k] = mảng phẳng các slot cho tổ hợp thứ k
    let combinations = [[]];
    axes.forEach((axis) => {
      const newCombos = [];
      combinations.forEach((combo) => {
        axis.forEach((slotSet) => {
          newCombos.push([...combo, ...slotSet]);
        });
      });
      combinations = newCombos;
    });

    // ── Bước 5: Áp dụng từng tổ hợp → sinh row mới ───────────────────────
    combinations.forEach((slots) => {
      const newRow = Object.assign({}, row);
      slots.forEach(({ fieldKey, origin, value }) => {
        if (newRow[fieldKey] !== null && newRow[fieldKey] !== undefined) {
          newRow[fieldKey] = String(newRow[fieldKey])
            .split(origin)
            .join(value !== undefined ? String(value) : "ERROR");
        }
      });
      result.push(newRow);
    });
  });

  return result;
}

// ─────────────────────────────────────────────────────────────────────────────
// CORE FUNCTIONS  (FN_01 và FN_A1 đều thêm expandGroupPatterns giữa res03→res04)
// ─────────────────────────────────────────────────────────────────────────────

function FN_01() {
  $("#ResID04").text(`
    (1) Lấy tất cả Object có Type là không có HD.
    (->) Lấy các obj ra thành phần riêng.
    `);
  const data = GetData();
  const data_02 = GetData();
  let res = [];
  data.forEach((e) => {
    if (e.type) {
      res.push(e);
    }
  });
  res.forEach((e) => {
    let keySets = Object.keys(e);
    keySets.forEach((e1) => {
      let iCheck = true;
      if (e1.includes("HD")) {
        iCheck = false;
        delete e[e1];
      }
      if (e1 === "getIndexInTable") {
        iCheck = false;
        const input = e[e1];
        let res_index = JSON.parse(input);
        res_index.forEach((e2) => {
          e2.newValue = e2.index
            ? e2.index
            : findValueByHDAndKey(data_02, e2.x, e2.y, e2.z);
          delete e2.index;
          delete e2.x;
          delete e2.y;
        });
        $("#ResID03").text(
          JSON.stringify(transformArrayToNameValueSet(res_index)),
        );
        e.getIndexInTable = transformArrayToNameValueSet(res_index);
      }
    });
  });

  let res_01 = [];
  res.forEach((e) => {
    let indexLoopInput = e.getIndexInTable;
    delete e.getIndexInTable;
    let strOfElement = JSON.stringify(e);
    res_01.push({ indexLoopInput, strOfElement });
  });

  let res_02 = [];
  res_01.forEach((e) => {
    res_02 = res_02.concat(
      put_data_in_loop_total(e.indexLoopInput, 0, [e.strOfElement]),
    );
  });

  let res03 = [];
  res_02.forEach((e) => {
    res03.push(JSON.parse(e));
  });

  // ── MỚI: Mở rộng {data:[...], group:NAME} thành các tổ hợp đầy đủ ──────
  // • Cùng group name → ZIP theo index (field cùng group đồng bộ index)
  // • Khác group name → CARTESIAN PRODUCT giữa các trục
  let res03_expanded = expandGroupPatterns(res03, data_02);
  // ─────────────────────────────────────────────────────────────────────────

  let res04 = [];
  res03_expanded.forEach((e) => {
    let obj = {};
    Object.keys(e).forEach((e1, i1) => {
      const key = "A" + (10 + i1);
      obj[key] = {
        id: i1,
        origin: e[e1],
        index: e1,
        replace: [],
        final: "",
      };
      // Sau expandGroupPatterns, các field {data:[...]} đã thay thế xong.
      // extractObjectsFromString chỉ còn xử lý {x:A2, y:HD-03} đơn giản.
      if (e[e1] && e[e1].includes("{")) {
        let condition = extractObjectsFromString(e[e1]);
        obj[key].condition = condition;
        condition.forEach((e) => {
          let lookupValue = findValueByHDAndKey(data_02, e.x, e.y, e.z);
          let yesValue = e.yes || lookupValue || "ERROR";
          let noValue = e.no || "ERROR";
          let replaceValue = lookupValue ? yesValue : noValue;
          let replaceIndex = e.origin;
          obj[key].replace.push({ replaceIndex, replaceValue, lookupValue });
        });
      }
      if (obj[key].origin !== null) {
        obj[key].final = obj[key].origin;
        obj[key].replace.forEach((e) => {
          obj[key].final = obj[key].final
            .split(e.replaceIndex)
            .join(e.replaceValue);
        });
      } else {
        obj[key].final = null;
      }
    });
    res04.push(obj);
  });

  let res05 = [];
  res04.forEach((e) => {
    let keySets = Object.keys(e);
    let obj = {};
    keySets.forEach((e1) => {
      obj[e[e1]["index"]] = e[e1]["final"];
    });
    res05.push(JSON.stringify(obj));
  });

  let res06 = removeDuplicates(res05);
  let res07 = [];
  res06.forEach((e) => {
    res07.push(JSON.parse(e));
  });
  res07.forEach((e, i) => {
    e.img = peopleSets[i % 10].img;
    e.name = peopleSets[i % 10].name;
    e.gender = peopleSets[i % 10].gender;
  });

  createTableFromArray("ResID05", res07);
  $("#ResID02").text(JSON.stringify(res07));
}

function FN_A1(id) {
  const data = GetDatabyid(id);
  const data_02 = GetDatabyid(id);
  let res = [];
  data.forEach((e) => {
    if (e.type) {
      res.push(e);
    }
  });
  res.forEach((e) => {
    let keySets = Object.keys(e);
    keySets.forEach((e1) => {
      let iCheck = true;
      if (e1.includes("HD")) {
        iCheck = false;
        delete e[e1];
      }
      if (e1 === "getIndexInTable") {
        iCheck = false;
        const input = e[e1];
        let res_index = JSON.parse(input);
        res_index.forEach((e2) => {
          e2.newValue = e2.index
            ? e2.index
            : findValueByHDAndKey(data_02, e2.x, e2.y, e2.z);
          delete e2.index;
          delete e2.x;
          delete e2.y;
        });
        e.getIndexInTable = transformArrayToNameValueSet(res_index);
      }
    });
  });

  let res_01 = [];
  res.forEach((e) => {
    let indexLoopInput = e.getIndexInTable;
    delete e.getIndexInTable;
    let strOfElement = JSON.stringify(e);
    res_01.push({ indexLoopInput, strOfElement });
  });

  let res_02 = [];
  res_01.forEach((e) => {
    res_02 = res_02.concat(
      put_data_in_loop_total(e.indexLoopInput, 0, [e.strOfElement]),
    );
  });

  let res03 = [];
  res_02.forEach((e) => {
    res03.push(JSON.parse(e));
  });

  // ── MỚI: Mở rộng {data:[...], group:NAME} ───────────────────────────────
  let res03_expanded = expandGroupPatterns(res03, data_02);
  // ─────────────────────────────────────────────────────────────────────────

  let res04 = [];
  res03_expanded.forEach((e) => {
    let obj = {};
    Object.keys(e).forEach((e1, i1) => {
      const key = "A" + (10 + i1);
      obj[key] = {
        id: i1,
        origin: e[e1],
        index: e1,
        replace: [],
        final: "",
      };
      if (e[e1] && e[e1].includes("{")) {
        let condition = extractObjectsFromString(e[e1]);
        obj[key].condition = condition;
        condition.forEach((e) => {
          let lookupValue = findValueByHDAndKey(data_02, e.x, e.y, e.z);
          let yesValue = e.yes || lookupValue || "ERROR";
          let noValue = e.no || "ERROR";
          let replaceValue = lookupValue ? yesValue : noValue;
          let replaceIndex = e.origin;
          obj[key].replace.push({ replaceIndex, replaceValue, lookupValue });
        });
      }
      if (obj[key].origin !== null) {
        obj[key].final = obj[key].origin;
        obj[key].replace.forEach((e) => {
          obj[key].final = obj[key].final
            .split(e.replaceIndex)
            .join(e.replaceValue);
        });
      } else {
        obj[key].final = null;
      }
    });
    res04.push(obj);
  });

  let res05 = [];
  res04.forEach((e) => {
    let keySets = Object.keys(e);
    let obj = {};
    keySets.forEach((e1) => {
      obj[e[e1]["index"]] = e[e1]["final"];
    });
    res05.push(JSON.stringify(obj));
  });

  let res06 = removeDuplicates(res05);
  let res07 = [];
  res06.forEach((e) => {
    res07.push(JSON.parse(e));
  });
  res07.forEach((e, i) => {
    e.img = peopleSets[i % 10].img;
    e.name = peopleSets[i % 10].name;
    e.gender = peopleSets[i % 10].gender;
  });

  return res07;
}

// ─────────────────────────────────────────────────────────────────────────────
// UNCHANGED FUNCTIONS
// ─────────────────────────────────────────────────────────────────────────────

function FN_ZZZZA1() {
  const data = GetData()[1];
  let SODONGEXCELCANLAY = 12;
  try {
    SODONGEXCELCANLAY = parseInt($("#SODONGEXCELCANLAYID").text());
  } catch (error) {}
  let data_xuly_01 = [];
  for (let i = 0; i < data.length; i += SODONGEXCELCANLAY) {
    let chunk = data.slice(i, i + SODONGEXCELCANLAY);
    let mergedArray = [].concat(...chunk);
    data_xuly_01.push(mergedArray);
  }
  $("#ResID02").text(JSON.stringify(data_xuly_01));
  console.log(data_xuly_01);
  $("#ResID02").text(JSON.stringify(nextStepOutside(data_xuly_01)));
  $("#ResID03").text(JSON.stringify(GetData()[0]));
  $("#ResID04").text(JSON.stringify(GetData()[2]));
}

function FN_ZZZZA1_HD01() {
  let data_ZZZZA1 = JSON.parse($("#ResID02").text());
  let Data_hd = JSON.parse($("#ResID03").text());
  let Data_hd_excel = JSON.parse($("#ResID04").text());
  let res = [];
  let res_02 = [];
  let objKeys = Object.keys(data_ZZZZA1[0]);
  data_ZZZZA1.forEach((e, ie) => {
    let data_string_hd01 = JSON.stringify(Data_hd);
    objKeys.forEach((e1) => {
      try {
        data_string_hd01 = data_string_hd01
          .split(e1)
          .join(e[e1].split(`"`).join(`'`));
      } catch (error) {}
    });
    let data_chuyendoi_gancuoi = nextStepOutside(JSON.parse(data_string_hd01));
    $("#ResID05").text(JSON.stringify(data_chuyendoi_gancuoi));
    let data_toprac = FN_A1("#ResID05");
    let key = Object.keys(data_toprac[0]);
    let setstoprac = [key];
    data_toprac.forEach((eA) => {
      let tem = [];
      key.forEach((eB) => {
        tem.push(eA[eB]);
      });
      setstoprac.push(tem);
    });
    res.push(JSON.parse(data_string_hd01));
    let data_string_hd_excel = JSON.stringify(Data_hd_excel);
    objKeys.forEach((e1) => {
      try {
        data_string_hd_excel = data_string_hd_excel
          .split(e1)
          .join(e[e1].split(`"`).join(`'`));
      } catch (error) {}
    });
    data_string_hd_excel = data_string_hd_excel
      .split("_F")
      .join("_F" + (ie + 1));
    let data_hd_excel = JSON.parse(data_string_hd_excel);
    let maxRows = Math.max(data_hd_excel.length, setstoprac.length);
    while (data_hd_excel.length < maxRows) {
      data_hd_excel.push(new Array(data_hd_excel[0].length).fill(""));
    }
    while (setstoprac.length < maxRows) {
      setstoprac.push(new Array(setstoprac[0].length).fill(""));
    }
    let mergedData = [];
    for (let i = 0; i < maxRows; i++) {
      mergedData.push([...data_hd_excel[i], ...setstoprac[i]]);
    }
    res_02.push(mergedData);
  });
  exportToExcel(res.concat(res_02));
  console.log(JSON.stringify(res));
}

const exportToExcel = (data) => {
  const wb = XLSX.utils.book_new();
  data.forEach((e, i) => {
    const ws = XLSX.utils.aoa_to_sheet(e);
    XLSX.utils.book_append_sheet(wb, ws, `${i + 1}`);
  });
  XLSX.writeFile(wb, "B_FILE_01.xlsx");
};

const ChuyenDoi_Buoc_1 = {
  HuongDan: () => {
    $("#ResID04").text(
      `Chào mừng đến với Các Bước chuyển đổi từ JSON ban đầu 
      (1) Lấy tất cả Object có Type là không có HD | 
      Từ file excel thuần không chuyển đổi A-B-C`,
    );
  },
  LayBangFsp_1bang_toCopy: () => FN_01(),
  LayBangZZZZA1: () => FN_ZZZZA1(),
  DaCo_ZZZZA1_GHEP_HD01_exportFileExcel: () => FN_ZZZZA1_HD01(),
};
export { ChuyenDoi_Buoc_1 };

// ─────────────────────────────────────────────────────────────────────────────
// UTILITY FUNCTIONS
// ─────────────────────────────────────────────────────────────────────────────

function findValueByHDAndKey(arr, x, y, z) {
  const result = arr.find((e) => e["HD-Bmark"] === x);
  if (z && result) {
    console.log(z, result);
    try {
      let res = result[y].split(";")[z].trim();
      return res;
    } catch (error) {}
  }
  return result ? result[y] : undefined;
}

function transformArrayToNameValueSet(arr) {
  const grouped = arr.reduce((acc, { name, newValue }) => {
    const existingGroup = acc.find((group) => group.name === name);
    if (existingGroup) {
      existingGroup.valueSet.push(newValue);
    } else {
      acc.push({ name, valueSet: [newValue] });
    }
    return acc;
  }, []);
  return grouped;
}

function put_data_in_loop_total(setTotal, n, strOfElement) {
  let res = [];
  if (n >= setTotal.length) {
    return strOfElement;
  }
  let set01_valueSet = setTotal[n].valueSet;
  let set01_name = setTotal[n].name;
  set01_valueSet.forEach((e1) => {
    strOfElement.forEach((e2) => {
      res.push(e2.split(set01_name).join(e1));
    });
  });
  return put_data_in_loop_total(setTotal, n + 1, res);
}

function removeDuplicates(strings) {
  return [...new Set(strings)];
}

function createTableFromArray(id, array) {
  const keys = Object.keys(array[0]);
  let table = $("#" + id);
  let headerRow = $("<tr></tr>");
  keys.forEach((key) => {
    let headerCell = $("<th></th>").text(key);
    headerRow.append(headerCell);
  });
  table.append(headerRow);
  array.forEach((obj) => {
    let row = $("<tr></tr>");
    keys.forEach((key) => {
      let cell = $("<td></td>").text(
        obj[key] !== null ? (obj[key] === "null" ? "" : obj[key]) : "",
      );
      row.append(cell);
    });
    table.append(row);
  });
}

function copyContent(id) {
  var content = $("#" + id).text();
  navigator.clipboard
    .writeText(content)
    .then(function () {
      alert("Đã sao chép xong!");
    })
    .catch(function (error) {
      alert("Có lỗi xảy ra khi sao chép: " + error);
    });
}

function nextStepOutside(rows) {
  try {
    if (rows.length === 0) return [];
    let headers = rows[0];
    let formattedData = rows.slice(1).map((row) => {
      let obj = {};
      headers.forEach((header, index) => {
        obj[header] = row[index];
      });
      delete obj["null"];
      return obj;
    });
    return formattedData;
  } catch (error) {
    console.error("Error in nextStepOutside function:", error);
    return [];
  }
}
