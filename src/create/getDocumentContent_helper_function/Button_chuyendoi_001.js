import $ from "jquery";
import * as XLSX from "xlsx"; // ← thêm để xuất Excel

/* ── Helper: xuất Excel với 1 sheet tên "Bảng kết quả" ── */
function downloadAsExcel(sheetData, fileName) {
  try {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(sheetData);
    XLSX.utils.book_append_sheet(wb, ws, "Bảng kết quả");
    XLSX.writeFile(wb, fileName);
  } catch (error) {
    alert("Lỗi khi xuất Excel: " + error.message);
  }
}

function A_Unifile_Outside() {
  try {
    let input = JSON.parse($("#ResID").text());
    let output = [];
    let i = input.length;
    let n = input[0].length;
    for (let m = 0; m < n; m++) {
      let out = [];
      for (let j = 0; j < i; j++) {
        out = out.concat(input[j][m]);
      }
      output.push(out);
    }
    $("#ResID").text(JSON.stringify(output));
  } catch (error) {
    console.log("Lỗi Unifile_Outside");
    console.log(error);
  }
}

function NextStep(inX) {
  try {
    let rows = inX;
    let Arr1 = rows[0];
    let arr = [];
    rows.forEach((e, i) => {
      if (i > 0) {
        let obj = {};
        Arr1.forEach((ee, i) => {
          obj[ee] = e[i];
        });
        arr.push(obj);
      }
    });
    arr.forEach((e) => {
      delete e["null"];
    });
    return arr;
  } catch (error) {
    console.log(error);
  }
}

function B_NextStep_OUTSIDE() {
  try {
    let rows = JSON.parse($("#ResID").text());
    let Arr1 = rows[0];
    let arr = [];
    rows.forEach((e, i) => {
      if (i > 0) {
        let obj = {};
        Arr1.forEach((ee, i) => {
          obj[ee] = e[i];
        });
        arr.push(obj);
      }
    });
    arr.forEach((e) => {
      delete e["null"];
    });
    $("#ResID").text(JSON.stringify(arr));
  } catch (error) {
    console.log(error);
  }
}

function C_NextStep_DontUnifile() {
  try {
    let input = JSON.parse($("#ResID").text());
    let output = [];
    input.forEach((e) => {
      output.push(NextStep(e));
    });
    $("#ResID").text(JSON.stringify(output));
  } catch (error) {
    console.log("Lỗi");
    console.log(error);
  }
}

function D_TimVaHienThiThayThe_AddvaMode_tuFileExcelMuti10_11_12() {
  try {
    let input = JSON.parse($("#ResID").text());
    if (!input || input.length < 2) {
      alert("Dữ liệu không đủ để xử lý. Cần ít nhất 2 sheet.");
      return;
    }
    let arrayGoc = input[0];
    let ketQuaMap = {};
    let headerGoc = arrayGoc[0] || [];
    let headersThayThe = [];
    for (let arrIndex = 1; arrIndex < input.length; arrIndex++) {
      headersThayThe[arrIndex - 1] = input[arrIndex][0] || [];
    }
    for (let rowIndex = 0; rowIndex < arrayGoc.length; rowIndex++) {
      let row = arrayGoc[rowIndex];
      for (let colIndex = 0; colIndex < row.length; colIndex++) {
        let cellValue = row[colIndex];
        if (
          cellValue &&
          typeof cellValue === "string" &&
          cellValue.startsWith("ADD_")
        ) {
          if (!ketQuaMap[cellValue]) {
            ketQuaMap[cellValue] = { add: cellValue, sheets: [] };
          }
          if (cellValue.startsWith("ADD_MODEOBJ")) {
            for (let arrIndex = 1; arrIndex < input.length; arrIndex++) {
              let arrayThayThe = input[arrIndex];
              let headerSheet = headersThayThe[arrIndex - 1];
              if (arrayThayThe[rowIndex]) {
                let rowData = arrayThayThe[rowIndex];
                let obj = {};
                for (let h = 0; h < headerSheet.length; h++) {
                  let key = headerSheet[h];
                  let val = rowData[h] !== undefined ? rowData[h] : null;
                  obj[key] = val;
                }
                ketQuaMap[cellValue].sheets[arrIndex - 1] = JSON.stringify(obj);
              } else {
                ketQuaMap[cellValue].sheets[arrIndex - 1] = "";
              }
            }
          } else {
            for (let arrIndex = 1; arrIndex < input.length; arrIndex++) {
              let arrayThayThe = input[arrIndex];
              if (arrayThayThe[rowIndex] && arrayThayThe[rowIndex][colIndex]) {
                ketQuaMap[cellValue].sheets[arrIndex - 1] =
                  arrayThayThe[rowIndex][colIndex];
              } else {
                ketQuaMap[cellValue].sheets[arrIndex - 1] = "";
              }
            }
          }
        }
      }
    }
    let ketQua = Object.values(ketQuaMap);
    let soLuongSheet = input.length - 1;
    hienThiPopupKetQua(ketQua, soLuongSheet);
  } catch (error) {
    console.log("Lỗi C_TimVaHienThiThayThe");
    console.log(error);
    alert("Có lỗi xảy ra: " + error.message);
  }
}

function hienThiPopupKetQua(ketQua, soLuongSheet) {
  let headerSheets = "";
  for (let i = 1; i <= soLuongSheet; i++) {
    headerSheets += `<th style="padding: 12px; border: 1px solid #ddd; text-align: left;">Sheet ${i}</th>`;
  }

  let rowsHTML = ketQua
    .map((item, index) => {
      let sheetsHTML = item.sheets
        .map((sheetValue) => {
          let displayValue = sheetValue || "";
          let cellColor = "";
          if (displayValue === "NULL" || displayValue === "null") {
            cellColor = "background: #ffebee; color: #999;";
            displayValue = "NULL";
          } else if (displayValue.toString().startsWith("ADD_")) {
            cellColor = "background: #fff3e0; color: #e65100;";
          } else if (displayValue === "") {
            cellColor = "background: #fafafa;";
            displayValue = "-";
          } else if (item.add.startsWith("ADD_MODEOBJ")) {
            cellColor = "background: #e1f5fe; color: #01579b;";
            if (displayValue.length > 120) {
              displayValue = `<span title='${displayValue.replace(/'/g, "&#39;")}'>${displayValue.substring(0, 120)}...</span>`;
            }
          } else {
            cellColor = "background: #e8f5e9;";
          }
          return `<td style="padding: 10px; border: 1px solid #ddd; ${cellColor} max-width: 400px; word-break: break-all; font-size: 12px;">${displayValue}</td>`;
        })
        .join("");
      return `
      <tr style="background: ${index % 2 === 0 ? "#f9f9f9" : "white"};">
        <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold; color: #d32f2f;">${item.add}</td>
        ${sheetsHTML}
      </tr>`;
    })
    .join("");

  let popupHTML = `
    <div id="popupOverlay" style="
      position: fixed; top: 0; left: 0; width: 100%; height: 100%;
      background: rgba(0,0,0,0.7); z-index: 9999;
      display: flex; justify-content: center; align-items: center;">
      <div style="
        background: white; padding: 20px; border-radius: 10px;
        max-width: 95%; max-height: 90%; overflow: auto;
        box-shadow: 0 4px 6px rgba(0,0,0,0.3);">
        <h3 style="margin-top: 0; color: #333;">
          Kết quả tìm kiếm thay thế (${ketQua.length} dòng × ${soLuongSheet} sheets)
        </h3>
        <div style="margin-bottom: 15px;">
          <button id="btnCopyTable" style="
            padding: 10px 20px; background: #4CAF50; color: white;
            border: none; border-radius: 5px; cursor: pointer; margin-right: 10px;">
            📋 Copy Bảng
          </button>
          <button id="btnCopyJSON" style="
            padding: 10px 20px; background: #2196F3; color: white;
            border: none; border-radius: 5px; cursor: pointer; margin-right: 10px;">
            📄 Copy JSON
          </button>
          <!-- ★ NÚT DOWNLOAD EXCEL MỚI ★ -->
          <button id="btnDownloadExcelD" style="
            padding: 10px 20px; background: #217346; color: white;
            border: none; border-radius: 5px; cursor: pointer; margin-right: 10px;
            font-weight: bold;">
            ⬇ Download Excel
          </button>
          <button id="btnClosePopup" style="
            padding: 10px 20px; background: #f44336; color: white;
            border: none; border-radius: 5px; cursor: pointer;">
            ✖ Đóng
          </button>
        </div>
        <div style="margin-bottom: 10px; padding: 10px; background: #e3f2fd;
          border-radius: 5px; font-size: 13px;">
          <strong>Chú thích màu:</strong>
          <span style="display:inline-block;padding:2px 8px;margin-left:10px;background:#e8f5e9;border-radius:3px;">Giá trị hợp lệ</span>
          <span style="display:inline-block;padding:2px 8px;margin-left:5px;background:#e1f5fe;border-radius:3px;">MODEOBJ (JSON)</span>
          <span style="display:inline-block;padding:2px 8px;margin-left:5px;background:#fff3e0;border-radius:3px;">ADD_...</span>
          <span style="display:inline-block;padding:2px 8px;margin-left:5px;background:#ffebee;border-radius:3px;">NULL</span>
          <span style="display:inline-block;padding:2px 8px;margin-left:5px;background:#fafafa;border-radius:3px;">Trống</span>
        </div>
        <div id="tableContainer" style="max-height:500px;overflow:auto;border:1px solid #ddd;border-radius:5px;">
          <table id="resultTable" style="width:100%;border-collapse:collapse;background:white;">
            <thead style="position:sticky;top:0;background:#2196F3;color:white;z-index:10;">
              <tr>
                <th style="padding:12px;border:1px solid #ddd;text-align:left;min-width:150px;">ADD_...</th>
                ${headerSheets}
              </tr>
            </thead>
            <tbody>${rowsHTML}</tbody>
          </table>
        </div>
      </div>
    </div>`;

  $("body").append(popupHTML);

  /* Copy Bảng */
  $("#btnCopyTable").click(function () {
    try {
      let textToCopy = "ADD_...";
      for (let i = 1; i <= soLuongSheet; i++) textToCopy += `\tSheet ${i}`;
      textToCopy += "\n";
      ketQua.forEach((item) => {
        textToCopy += item.add;
        item.sheets.forEach((v) => {
          let value = v || "";
          if (value === "NULL" || value === "null") value = "NULL";
          textToCopy += `\t${value}`;
        });
        textToCopy += "\n";
      });
      copyToClipboard(textToCopy);
      $(this).text("✅ Đã Copy Table!");
      setTimeout(() => $("#btnCopyTable").text("📋 Copy Bảng"), 2000);
    } catch (error) {
      alert("Lỗi khi copy: " + error.message);
    }
  });

  /* Copy JSON */
  $("#btnCopyJSON").click(function () {
    try {
      copyToClipboard(JSON.stringify(ketQua, null, 2));
      $(this).text("✅ Đã Copy JSON!");
      setTimeout(() => $("#btnCopyJSON").text("📄 Copy JSON"), 2000);
    } catch (error) {
      alert("Lỗi khi copy JSON: " + error.message);
    }
  });

  /* ★ Download Excel – hàm D ★ */
  $("#btnDownloadExcelD").click(function () {
    try {
      // Hàng header
      let headerRow = ["ADD_..."];
      for (let i = 1; i <= soLuongSheet; i++) headerRow.push(`Sheet ${i}`);

      // Các hàng dữ liệu
      let dataRows = ketQua.map((item) => {
        let row = [item.add];
        item.sheets.forEach((v) => {
          let val = v || "";
          if (val === "NULL" || val === "null") val = "NULL";
          if (val === "") val = "-";
          row.push(val);
        });
        return row;
      });

      downloadAsExcel([headerRow, ...dataRows], "ket_qua_D.xlsx");

      $(this).text("✅ Đã xuất Excel!");
      setTimeout(() => $("#btnDownloadExcelD").text("⬇ Download Excel"), 2000);
    } catch (error) {
      alert("Lỗi khi xuất Excel: " + error.message);
    }
  });

  /* Đóng */
  $("#btnClosePopup, #popupOverlay").click(function (e) {
    if (e.target.id === "btnClosePopup" || e.target.id === "popupOverlay") {
      $("#popupOverlay").remove();
    }
  });
}

function E_LayTatCaCodeVaText_toAudioCode_11_12_musthavecodevtext() {
  try {
    let input = JSON.parse($("#ResID").text());
    if (!input || input.length === 0) {
      alert("Không có dữ liệu để xử lý.");
      return;
    }
    let allData = [];
    let stt = 1;
    const invalidValues = ["NULL", "null", "NULLA", null, undefined, ""];
    input.forEach((sheet, sheetIndex) => {
      if (!sheet || sheet.length === 0) return;
      let header = sheet[0];
      let codeIndex = header.findIndex(
        (col) => col && col.toLowerCase() === "code",
      );
      let textIndex = header.findIndex(
        (col) => col && col.toLowerCase() === "text",
      );
      if (codeIndex === -1 || textIndex === -1) {
        console.log(
          `Sheet ${sheetIndex + 1}: Không tìm thấy cột code hoặc text`,
        );
        return;
      }
      for (let rowIndex = 1; rowIndex < sheet.length; rowIndex++) {
        let row = sheet[rowIndex];
        let codeValue = row[codeIndex];
        let textValue = row[textIndex];
        let isCodeValid = codeValue && !invalidValues.includes(codeValue);
        let isTextValid = textValue && !invalidValues.includes(textValue);
        if (isCodeValid && isTextValid) {
          allData.push({
            stt: stt++,
            code: codeValue,
            text: textValue,
            sheet: sheetIndex + 1,
            row: rowIndex + 1,
          });
        }
      }
    });
    if (allData.length === 0) {
      alert("Không tìm thấy dữ liệu code và text hợp lệ.");
      return;
    }
    hienThiPopupCodeText(allData);
  } catch (error) {
    console.log("Lỗi E_LayTatCaCodeVaText_toAudioCode_11_12_musthavecodevtext");
    console.log(error);
    alert("Có lỗi xảy ra: " + error.message);
  }
}

function hienThiPopupCodeText(data) {
  let rowsHTML = data
    .map((item, index) => {
      return `
      <tr style="background: ${index % 2 === 0 ? "#f9f9f9" : "white"};">
        <td style="padding:10px;border:1px solid #ddd;text-align:center;font-weight:bold;color:#1976d2;">${item.stt}</td>
        <td style="padding:10px;border:1px solid #ddd;font-family:monospace;color:#d32f2f;max-width:200px;word-break:break-word;">${item.code}</td>
        <td style="padding:10px;border:1px solid #ddd;max-width:500px;word-wrap:break-word;">${item.text}</td>
        <td style="padding:10px;border:1px solid #ddd;text-align:center;color:#666;font-size:12px;">Sheet ${item.sheet}<br>Row ${item.row}</td>
      </tr>`;
    })
    .join("");

  let popupHTML = `
    <div id="popupCodeTextOverlay" style="
      position:fixed;top:0;left:0;width:100%;height:100%;
      background:rgba(0,0,0,0.7);z-index:9999;
      display:flex;justify-content:center;align-items:center;">
      <div style="
        background:white;padding:20px;border-radius:10px;
        max-width:95%;max-height:90%;overflow:auto;
        box-shadow:0 4px 6px rgba(0,0,0,0.3);">
        <h3 style="margin-top:0;color:#333;">
          📋 Danh sách Code & Text (${data.length} dòng)
        </h3>
        <div style="margin-bottom:15px;">
          <button id="btnCopyCodeText" style="
            padding:10px 20px;background:#4CAF50;color:white;
            border:none;border-radius:5px;cursor:pointer;
            margin-right:10px;font-weight:bold;">
            📋 Copy Bảng
          </button>
          <button id="btnCopyCodeTextJSON" style="
            padding:10px 20px;background:#2196F3;color:white;
            border:none;border-radius:5px;cursor:pointer;
            margin-right:10px;font-weight:bold;">
            📄 Copy JSON
          </button>
          <!-- ★ NÚT DOWNLOAD EXCEL MỚI ★ -->
          <button id="btnDownloadExcelE" style="
            padding:10px 20px;background:#217346;color:white;
            border:none;border-radius:5px;cursor:pointer;
            margin-right:10px;font-weight:bold;">
            ⬇ Download Excel
          </button>
          <button id="btnCopyOnlyCode" style="
            padding:10px 20px;background:#FF9800;color:white;
            border:none;border-radius:5px;cursor:pointer;margin-right:10px;">
            🔢 Copy Code Only
          </button>
          <button id="btnCopyOnlyText" style="
            padding:10px 20px;background:#9C27B0;color:white;
            border:none;border-radius:5px;cursor:pointer;margin-right:10px;">
            📝 Copy Text Only
          </button>
          <button id="btnCloseCodeText" style="
            padding:10px 20px;background:#f44336;color:white;
            border:none;border-radius:5px;cursor:pointer;">
            ✖ Đóng
          </button>
        </div>
        <div style="margin-bottom:10px;padding:10px;background:#e8f5e9;
          border-radius:5px;font-size:13px;border-left:4px solid #4CAF50;">
          <strong>💡 Thống kê:</strong> Tìm thấy
          <strong style="color:#d32f2f;">${data.length}</strong>
          cặp code-text hợp lệ từ tất cả các sheet<br>
          <small style="color:#666;">Đã loại bỏ: NULL, null, NULLA và giá trị rỗng</small>
        </div>
        <div id="tableCodeTextContainer" style="
          max-height:500px;overflow:auto;
          border:1px solid #ddd;border-radius:5px;">
          <table id="codeTextTable" style="width:100%;border-collapse:collapse;background:white;">
            <thead style="position:sticky;top:0;
              background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);
              color:white;z-index:10;">
              <tr>
                <th style="padding:12px;border:1px solid #ddd;text-align:center;width:60px;">STT</th>
                <th style="padding:12px;border:1px solid #ddd;text-align:left;width:180px;">Code</th>
                <th style="padding:12px;border:1px solid #ddd;text-align:left;">Text</th>
                <th style="padding:12px;border:1px solid #ddd;text-align:center;width:100px;">Nguồn</th>
              </tr>
            </thead>
            <tbody>${rowsHTML}</tbody>
          </table>
        </div>
      </div>
    </div>`;

  $("body").append(popupHTML);

  /* Copy Bảng */
  $("#btnCopyCodeText").click(function () {
    try {
      let textToCopy = "STT\tCode\tText\tSheet\tRow\n";
      data.forEach((item) => {
        textToCopy += `${item.stt}\t${item.code}\t${item.text}\t${item.sheet}\t${item.row}\n`;
      });
      copyToClipboard(textToCopy);
      $(this).text("✅ Đã Copy!");
      setTimeout(() => $("#btnCopyCodeText").text("📋 Copy Bảng"), 2000);
    } catch (error) {
      alert("Lỗi khi copy: " + error.message);
    }
  });

  /* Copy JSON */
  $("#btnCopyCodeTextJSON").click(function () {
    try {
      copyToClipboard(JSON.stringify(data, null, 2));
      $(this).text("✅ Đã Copy!");
      setTimeout(() => $("#btnCopyCodeTextJSON").text("📄 Copy JSON"), 2000);
    } catch (error) {
      alert("Lỗi khi copy JSON: " + error.message);
    }
  });

  /* ★ Download Excel – hàm E ★ */
  $("#btnDownloadExcelE").click(function () {
    try {
      const headerRow = ["STT", "Code", "Text", "Sheet", "Row"];
      const dataRows = data.map((item) => [
        item.stt,
        item.code,
        item.text,
        item.sheet,
        item.row,
      ]);
      downloadAsExcel([headerRow, ...dataRows], "code_text_E.xlsx");
      $(this).text("✅ Đã xuất Excel!");
      setTimeout(() => $("#btnDownloadExcelE").text("⬇ Download Excel"), 2000);
    } catch (error) {
      alert("Lỗi khi xuất Excel: " + error.message);
    }
  });

  /* Copy Code Only */
  $("#btnCopyOnlyCode").click(function () {
    try {
      copyToClipboard(data.map((item) => item.code).join("\n"));
      $(this).text("✅ Đã Copy!");
      setTimeout(() => $("#btnCopyOnlyCode").text("🔢 Copy Code Only"), 2000);
    } catch (error) {
      alert("Lỗi khi copy: " + error.message);
    }
  });

  /* Copy Text Only */
  $("#btnCopyOnlyText").click(function () {
    try {
      copyToClipboard(data.map((item) => item.text).join("\n"));
      $(this).text("✅ Đã Copy!");
      setTimeout(() => $("#btnCopyOnlyText").text("📝 Copy Text Only"), 2000);
    } catch (error) {
      alert("Lỗi khi copy: " + error.message);
    }
  });

  /* Đóng */
  $("#btnCloseCodeText, #popupCodeTextOverlay").click(function (e) {
    if (
      e.target.id === "btnCloseCodeText" ||
      e.target.id === "popupCodeTextOverlay"
    ) {
      $("#popupCodeTextOverlay").remove();
    }
  });
}

/* Helper: copy vào clipboard */
function copyToClipboard(text) {
  const tempTextArea = document.createElement("textarea");
  tempTextArea.value = text;
  tempTextArea.style.position = "fixed";
  tempTextArea.style.left = "-9999px";
  document.body.appendChild(tempTextArea);
  tempTextArea.select();
  document.execCommand("copy");
  document.body.removeChild(tempTextArea);
}

function HD_Button_chuyendoi_001() {
  alert("Edit tại Button_chuyendoi_001");
}

export {
  HD_Button_chuyendoi_001,
  A_Unifile_Outside,
  B_NextStep_OUTSIDE,
  C_NextStep_DontUnifile,
  D_TimVaHienThiThayThe_AddvaMode_tuFileExcelMuti10_11_12,
  E_LayTatCaCodeVaText_toAudioCode_11_12_musthavecodevtext,
};
