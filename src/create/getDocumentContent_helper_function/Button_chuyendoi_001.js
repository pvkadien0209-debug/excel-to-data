import $ from "jquery";

function A_Unifile_Outside() {
  try {
    let input = JSON.parse($("#ResID").text());
    //  let getKeys = Object.keys(input[0])
    // console.log(input)
    let output = [];
    let i = input.length;
    let n = input[0].length;

    // console.log(input[i][n])
    for (let m = 0; m < n; m++) {
      let out = [];
      for (let j = 0; j < i; j++) {
        out = out.concat(input[j][m]);
      }
      output.push(out);
    }

    $("#ResID").text(JSON.stringify(output));
    // return output
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
    // console.log("Lỗi")
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
    // console.log("Lỗi")
    console.log(error);
  }
}

function C_NextStep_DontUnifile() {
  try {
    let input = JSON.parse($("#ResID").text());
    //  let getKeys = Object.keys(input[0])
    // console.log(input)
    let output = [];
    input.forEach((e) => {
      output.push(NextStep(e));
    });

    $("#ResID").text(JSON.stringify(output));
    // return output
  } catch (error) {
    console.log("Lỗi");
    console.log(error);
  }
}
// Button_chuyendoi_001.js - Thêm hàm mới vào cuối file

// Button_chuyendoi_001.js - Thay thế hàm C_TimVaHienThiThayThe

function D_TimVaHienThiThayThe() {
  try {
    let input = JSON.parse($("#ResID").text());

    if (!input || input.length < 2) {
      alert("Dữ liệu không đủ để xử lý. Cần ít nhất 2 sheet.");
      return;
    }

    // Array đầu tiên chứa các ADD_...
    let arrayGoc = input[0];

    // Tạo object để lưu kết quả theo từng ADD_
    let ketQuaMap = {};

    // Duyệt qua từng dòng của array gốc
    for (let rowIndex = 0; rowIndex < arrayGoc.length; rowIndex++) {
      let row = arrayGoc[rowIndex];

      // Duyệt qua từng cột trong dòng
      for (let colIndex = 0; colIndex < row.length; colIndex++) {
        let cellValue = row[colIndex];

        // Chỉ xử lý các cell có giá trị bắt đầu bằng "ADD_"
        if (
          cellValue &&
          typeof cellValue === "string" &&
          cellValue.startsWith("ADD_")
        ) {
          // Nếu chưa có key này trong map, khởi tạo
          if (!ketQuaMap[cellValue]) {
            ketQuaMap[cellValue] = {
              add: cellValue,
              sheets: [],
            };
          }

          // Tìm giá trị từ các sheet tiếp theo
          for (let arrIndex = 1; arrIndex < input.length; arrIndex++) {
            let arrayThayThe = input[arrIndex];

            // Kiểm tra xem có dòng và cột tương ứng không
            if (arrayThayThe[rowIndex] && arrayThayThe[rowIndex][colIndex]) {
              let giaTriThayThe = arrayThayThe[rowIndex][colIndex];

              // Lưu giá trị (kể cả NULL để giữ đúng vị trí cột)
              ketQuaMap[cellValue].sheets[arrIndex - 1] = giaTriThayThe;
            } else {
              // Nếu không có giá trị, để trống
              ketQuaMap[cellValue].sheets[arrIndex - 1] = "";
            }
          }
        }
      }
    }

    // Chuyển object thành array
    let ketQua = Object.values(ketQuaMap);

    // Số lượng sheet (trừ sheet đầu tiên)
    let soLuongSheet = input.length - 1;

    // Hiển thị popup với kết quả
    hienThiPopupKetQua(ketQua, soLuongSheet);
  } catch (error) {
    console.log("Lỗi C_TimVaHienThiThayThe");
    console.log(error);
    alert("Có lỗi xảy ra: " + error.message);
  }
}

function hienThiPopupKetQua(ketQua, soLuongSheet) {
  // Tạo header cho các cột sheet
  let headerSheets = "";
  for (let i = 1; i <= soLuongSheet; i++) {
    headerSheets += `<th style="padding: 12px; border: 1px solid #ddd; text-align: left;">Sheet ${i}</th>`;
  }

  // Tạo các dòng dữ liệu
  let rowsHTML = ketQua
    .map((item, index) => {
      let sheetsHTML = item.sheets
        .map((sheetValue) => {
          // Xử lý hiển thị giá trị
          let displayValue = sheetValue || "";
          let cellColor = "";

          // Tô màu khác nhau cho các loại giá trị
          if (displayValue === "NULL" || displayValue === "null") {
            cellColor = "background: #ffebee; color: #999;";
            displayValue = "NULL";
          } else if (displayValue.toString().startsWith("ADD_")) {
            cellColor = "background: #fff3e0; color: #e65100;";
          } else if (displayValue === "") {
            cellColor = "background: #fafafa;";
            displayValue = "-";
          } else {
            cellColor = "background: #e8f5e9;";
          }

          return `<td style="padding: 10px; border: 1px solid #ddd; ${cellColor}">${displayValue}</td>`;
        })
        .join("");

      return `
      <tr style="background: ${index % 2 === 0 ? "#f9f9f9" : "white"};">
        <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold; color: #d32f2f;">${item.add}</td>
        ${sheetsHTML}
      </tr>
    `;
    })
    .join("");

  // Tạo HTML cho popup
  let popupHTML = `
    <div id="popupOverlay" style="
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.7);
      z-index: 9999;
      display: flex;
      justify-content: center;
      align-items: center;
    ">
      <div style="
        background: white;
        padding: 20px;
        border-radius: 10px;
        max-width: 95%;
        max-height: 90%;
        overflow: auto;
        box-shadow: 0 4px 6px rgba(0,0,0,0.3);
      ">
        <h3 style="margin-top: 0; color: #333;">Kết quả tìm kiếm thay thế (${ketQua.length} dòng × ${soLuongSheet} sheets)</h3>
        
        <div style="margin-bottom: 15px;">
          <button id="btnCopyTable" style="
            padding: 10px 20px;
            background: #4CAF50;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            margin-right: 10px;
          ">📋 Copy Bảng</button>
          
          <button id="btnCopyJSON" style="
            padding: 10px 20px;
            background: #2196F3;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            margin-right: 10px;
          ">📄 Copy JSON</button>
          
          <button id="btnClosePopup" style="
            padding: 10px 20px;
            background: #f44336;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
          ">✖ Đóng</button>
        </div>
        
        <div style="margin-bottom: 10px; padding: 10px; background: #e3f2fd; border-radius: 5px; font-size: 13px;">
          <strong>Chú thích màu:</strong>
          <span style="display: inline-block; padding: 2px 8px; margin-left: 10px; background: #e8f5e9; border-radius: 3px;">Giá trị hợp lệ</span>
          <span style="display: inline-block; padding: 2px 8px; margin-left: 5px; background: #fff3e0; border-radius: 3px;">ADD_...</span>
          <span style="display: inline-block; padding: 2px 8px; margin-left: 5px; background: #ffebee; border-radius: 3px;">NULL</span>
          <span style="display: inline-block; padding: 2px 8px; margin-left: 5px; background: #fafafa; border-radius: 3px;">Trống</span>
        </div>
        
        <div id="tableContainer" style="
          max-height: 500px;
          overflow: auto;
          border: 1px solid #ddd;
          border-radius: 5px;
        ">
          <table id="resultTable" style="
            width: 100%;
            border-collapse: collapse;
            background: white;
          ">
            <thead style="
              position: sticky;
              top: 0;
              background: #2196F3;
              color: white;
              z-index: 10;
            ">
              <tr>
                <th style="padding: 12px; border: 1px solid #ddd; text-align: left; min-width: 150px;">ADD_...</th>
                ${headerSheets}
              </tr>
            </thead>
            <tbody>
              ${rowsHTML}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;

  // Thêm popup vào body
  $("body").append(popupHTML);

  // Xử lý nút Copy Table
  $("#btnCopyTable").click(function () {
    try {
      // Tạo text để copy (tab-separated for Excel)
      let textToCopy = "ADD_...";
      for (let i = 1; i <= soLuongSheet; i++) {
        textToCopy += `\tSheet ${i}`;
      }
      textToCopy += "\n";

      ketQua.forEach((item) => {
        textToCopy += item.add;
        item.sheets.forEach((sheetValue) => {
          let value = sheetValue || "";
          if (value === "NULL" || value === "null") value = "NULL";
          textToCopy += `\t${value}`;
        });
        textToCopy += "\n";
      });

      // Copy vào clipboard
      const tempTextArea = document.createElement("textarea");
      tempTextArea.value = textToCopy;
      document.body.appendChild(tempTextArea);
      tempTextArea.select();
      document.execCommand("copy");
      document.body.removeChild(tempTextArea);

      // Thông báo thành công
      $(this).text("✅ Đã Copy Table!");
      setTimeout(() => {
        $("#btnCopyTable").text("📋 Copy Bảng");
      }, 2000);
    } catch (error) {
      alert("Lỗi khi copy: " + error.message);
    }
  });

  // Xử lý nút Copy JSON
  $("#btnCopyJSON").click(function () {
    try {
      const jsonString = JSON.stringify(ketQua, null, 2);

      const tempTextArea = document.createElement("textarea");
      tempTextArea.value = jsonString;
      document.body.appendChild(tempTextArea);
      tempTextArea.select();
      document.execCommand("copy");
      document.body.removeChild(tempTextArea);

      $(this).text("✅ Đã Copy JSON!");
      setTimeout(() => {
        $("#btnCopyJSON").text("📄 Copy JSON");
      }, 2000);
    } catch (error) {
      alert("Lỗi khi copy JSON: " + error.message);
    }
  });

  // Xử lý nút Đóng
  $("#btnClosePopup, #popupOverlay").click(function (e) {
    if (e.target.id === "btnClosePopup" || e.target.id === "popupOverlay") {
      $("#popupOverlay").remove();
    }
  });
}

// Cập nhật hàm E_LayTatCaCodeVaText trong Button_chuyendoi_001.js

function E_LayTatCaCodeVaText() {
  try {
    let input = JSON.parse($("#ResID").text());

    if (!input || input.length === 0) {
      alert("Không có dữ liệu để xử lý.");
      return;
    }

    let allData = [];
    let stt = 1;

    // Danh sách các giá trị cần loại bỏ
    const invalidValues = ["NULL", "null", "NULLA", null, undefined, ""];

    // Duyệt qua từng sheet
    input.forEach((sheet, sheetIndex) => {
      if (!sheet || sheet.length === 0) return;

      // Row đầu tiên là header
      let header = sheet[0];

      // Tìm vị trí cột "code" và "text"
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

      // Duyệt qua các dòng data (bỏ qua header)
      for (let rowIndex = 1; rowIndex < sheet.length; rowIndex++) {
        let row = sheet[rowIndex];
        let codeValue = row[codeIndex];
        let textValue = row[textIndex];

        // Kiểm tra codeValue không nằm trong danh sách invalidValues
        let isCodeValid = codeValue && !invalidValues.includes(codeValue);

        // Kiểm tra textValue không nằm trong danh sách invalidValues
        let isTextValid = textValue && !invalidValues.includes(textValue);

        // Chỉ thêm vào nếu cả code và text đều hợp lệ
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

    // Hiển thị popup
    hienThiPopupCodeText(allData);
  } catch (error) {
    console.log("Lỗi E_LayTatCaCodeVaText");
    console.log(error);
    alert("Có lỗi xảy ra: " + error.message);
  }
}

function hienThiPopupCodeText(data) {
  // Tạo các dòng HTML
  let rowsHTML = data
    .map((item, index) => {
      return `
      <tr style="background: ${index % 2 === 0 ? "#f9f9f9" : "white"};">
        <td style="padding: 10px; border: 1px solid #ddd; text-align: center; font-weight: bold; color: #1976d2;">${item.stt}</td>
        <td style="padding: 10px; border: 1px solid #ddd; font-family: monospace; color: #d32f2f; max-width: 200px; word-break: break-word;">${item.code}</td>
        <td style="padding: 10px; border: 1px solid #ddd; max-width: 500px; word-wrap: break-word;">${item.text}</td>
        <td style="padding: 10px; border: 1px solid #ddd; text-align: center; color: #666; font-size: 12px;">Sheet ${item.sheet}<br>Row ${item.row}</td>
      </tr>
    `;
    })
    .join("");

  // Tạo HTML popup
  let popupHTML = `
    <div id="popupCodeTextOverlay" style="
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.7);
      z-index: 9999;
      display: flex;
      justify-content: center;
      align-items: center;
    ">
      <div style="
        background: white;
        padding: 20px;
        border-radius: 10px;
        max-width: 95%;
        max-height: 90%;
        overflow: auto;
        box-shadow: 0 4px 6px rgba(0,0,0,0.3);
      ">
        <h3 style="margin-top: 0; color: #333;">
          📋 Danh sách Code & Text (${data.length} dòng)
        </h3>
        
        <div style="margin-bottom: 15px;">
          <button id="btnCopyCodeText" style="
            padding: 10px 20px;
            background: #4CAF50;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            margin-right: 10px;
            font-weight: bold;
          ">📋 Copy Bảng</button>
          
          <button id="btnCopyCodeTextJSON" style="
            padding: 10px 20px;
            background: #2196F3;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            margin-right: 10px;
            font-weight: bold;
          ">📄 Copy JSON</button>
          
          <button id="btnCopyOnlyCode" style="
            padding: 10px 20px;
            background: #FF9800;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            margin-right: 10px;
          ">🔢 Copy Code Only</button>
          
          <button id="btnCopyOnlyText" style="
            padding: 10px 20px;
            background: #9C27B0;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            margin-right: 10px;
          ">📝 Copy Text Only</button>
          
          <button id="btnCloseCodeText" style="
            padding: 10px 20px;
            background: #f44336;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
          ">✖ Đóng</button>
        </div>
        
        <div style="margin-bottom: 10px; padding: 10px; background: #e8f5e9; border-radius: 5px; font-size: 13px; border-left: 4px solid #4CAF50;">
          <strong>💡 Thống kê:</strong> Tìm thấy <strong style="color: #d32f2f;">${data.length}</strong> cặp code-text hợp lệ từ tất cả các sheet
          <br>
          <small style="color: #666;">Đã loại bỏ: NULL, null, NULLA và giá trị rỗng</small>
        </div>
        
        <div id="tableCodeTextContainer" style="
          max-height: 500px;
          overflow: auto;
          border: 1px solid #ddd;
          border-radius: 5px;
        ">
          <table id="codeTextTable" style="
            width: 100%;
            border-collapse: collapse;
            background: white;
          ">
            <thead style="
              position: sticky;
              top: 0;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              z-index: 10;
            ">
              <tr>
                <th style="padding: 12px; border: 1px solid #ddd; text-align: center; width: 60px;">STT</th>
                <th style="padding: 12px; border: 1px solid #ddd; text-align: left; width: 180px;">Code</th>
                <th style="padding: 12px; border: 1px solid #ddd; text-align: left;">Text</th>
                <th style="padding: 12px; border: 1px solid #ddd; text-align: center; width: 100px;">Nguồn</th>
              </tr>
            </thead>
            <tbody>
              ${rowsHTML}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;

  // Thêm popup vào body
  $("body").append(popupHTML);

  // Xử lý nút Copy Bảng (tab-separated)
  $("#btnCopyCodeText").click(function () {
    try {
      let textToCopy = "STT\tCode\tText\tSheet\tRow\n";
      data.forEach((item) => {
        textToCopy += `${item.stt}\t${item.code}\t${item.text}\t${item.sheet}\t${item.row}\n`;
      });

      copyToClipboard(textToCopy);

      $(this).text("✅ Đã Copy!");
      setTimeout(() => {
        $("#btnCopyCodeText").text("📋 Copy Bảng");
      }, 2000);
    } catch (error) {
      alert("Lỗi khi copy: " + error.message);
    }
  });

  // Xử lý nút Copy JSON
  $("#btnCopyCodeTextJSON").click(function () {
    try {
      const jsonString = JSON.stringify(data, null, 2);
      copyToClipboard(jsonString);

      $(this).text("✅ Đã Copy!");
      setTimeout(() => {
        $("#btnCopyCodeTextJSON").text("📄 Copy JSON");
      }, 2000);
    } catch (error) {
      alert("Lỗi khi copy JSON: " + error.message);
    }
  });

  // Xử lý nút Copy Only Code
  $("#btnCopyOnlyCode").click(function () {
    try {
      let textToCopy = data.map((item) => item.code).join("\n");
      copyToClipboard(textToCopy);

      $(this).text("✅ Đã Copy!");
      setTimeout(() => {
        $("#btnCopyOnlyCode").text("🔢 Copy Code Only");
      }, 2000);
    } catch (error) {
      alert("Lỗi khi copy: " + error.message);
    }
  });

  // Xử lý nút Copy Only Text
  $("#btnCopyOnlyText").click(function () {
    try {
      let textToCopy = data.map((item) => item.text).join("\n");
      copyToClipboard(textToCopy);

      $(this).text("✅ Đã Copy!");
      setTimeout(() => {
        $("#btnCopyOnlyText").text("📝 Copy Text Only");
      }, 2000);
    } catch (error) {
      alert("Lỗi khi copy: " + error.message);
    }
  });

  // Xử lý nút Đóng
  $("#btnCloseCodeText, #popupCodeTextOverlay").click(function (e) {
    if (
      e.target.id === "btnCloseCodeText" ||
      e.target.id === "popupCodeTextOverlay"
    ) {
      $("#popupCodeTextOverlay").remove();
    }
  });
}

// Helper function để copy vào clipboard
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

// Cập nhật export
export {
  A_Unifile_Outside,
  B_NextStep_OUTSIDE,
  C_NextStep_DontUnifile,
  D_TimVaHienThiThayThe,
  E_LayTatCaCodeVaText,
};
