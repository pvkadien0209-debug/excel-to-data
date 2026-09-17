import { useEffect, useState } from "react";
import $ from "jquery";
import readXlsxFile from "read-excel-file";
import * as Button_chuyendoi_001 from "./create/getDocumentContent_helper_function/Button_chuyendoi_001";
import * as ChuyenDoi_Buoc_1 from "./create/getDocumentContent_helper_function/JSON_chuyendoiSangDangThucbang";
import * as ChuyenDoi_Buoc_2 from "./create/getDocumentContent_helper_function/Create_A_InputData_Tranfer_2024_HOPEFINAL_C001";
import {
  findClosestMatch,
  getRandomElement,
  parceARandomSets,
  shuffleArray,
  collectWeSay,
  removeNoneElements,
  transper_to_table_f_json_obj,
  copyTable_f_id,
} from "./ulti/help_prac_function";

/* ── inline styles ───────────────────────────────────────────── */
const styles = {
  /* ── root ── */
  root: {
    fontFamily: "'Segoe UI', 'SF Pro Display', -apple-system, sans-serif",
    background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
    color: "#e2e8f0",
    minHeight: "100vh",
    padding: "2rem 2.5rem",
    boxSizing: "border-box",
  },

  /* ── top bar / file section ── */
  topBar: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: "0.75rem",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "14px",
    padding: "1rem 1.25rem",
    marginBottom: "1.25rem",
    backdropFilter: "blur(12px)",
  },
  label: {
    fontSize: "0.82rem",
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.06em",
    color: "#94a3b8",
  },
  sheetBadge: {
    display: "inline-flex",
    alignItems: "center",
    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    color: "#fff",
    fontWeight: 700,
    fontSize: "0.85rem",
    padding: "0.3rem 0.8rem",
    borderRadius: "8px",
  },
  textInput: {
    flex: "1 1 180px",
    minWidth: 0,
    padding: "0.55rem 0.9rem",
    borderRadius: "10px",
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(255,255,255,0.06)",
    color: "#e2e8f0",
    fontSize: "0.88rem",
    outline: "none",
    transition: "border-color .2s, box-shadow .2s",
  },
  fileLabel: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.4rem",
    cursor: "pointer",
    padding: "0.5rem 1rem",
    borderRadius: "10px",
    background: "linear-gradient(135deg, #0ea5e9, #06b6d4)",
    color: "#fff",
    fontWeight: 600,
    fontSize: "0.82rem",
    letterSpacing: "0.02em",
    transition: "transform .15s, box-shadow .15s",
    boxShadow: "0 2px 8px rgba(14,165,233,0.35)",
  },
  fileInput: { display: "none" },
  rowBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.35rem",
    background: "rgba(251,191,36,0.12)",
    border: "1px solid rgba(251,191,36,0.25)",
    borderRadius: "8px",
    padding: "0.3rem 0.7rem",
    fontSize: "0.78rem",
    color: "#fbbf24",
  },
  hint: {
    fontSize: "0.72rem",
    color: "#64748b",
    fontStyle: "italic",
  },

  /* ── buttons ── */
  btnDanger: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.35rem",
    padding: "0.5rem 1rem",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer",
    fontWeight: 600,
    fontSize: "0.82rem",
    background: "linear-gradient(135deg, #ef4444, #dc2626)",
    color: "#fff",
    boxShadow: "0 2px 8px rgba(239,68,68,0.3)",
    transition: "transform .12s, box-shadow .12s",
  },
  btnPrimary: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.4rem",
    padding: "0.55rem 1.15rem",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer",
    fontWeight: 600,
    fontSize: "0.82rem",
    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    color: "#fff",
    boxShadow: "0 2px 10px rgba(99,102,241,0.35)",
    transition: "transform .12s, box-shadow .12s",
  },
  btnSuccess: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.4rem",
    padding: "0.55rem 1.15rem",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer",
    fontWeight: 600,
    fontSize: "0.82rem",
    background: "linear-gradient(135deg, #10b981, #059669)",
    color: "#fff",
    boxShadow: "0 2px 10px rgba(16,185,129,0.35)",
    transition: "transform .12s, box-shadow .12s",
  },
  btnRemotion: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.4rem",
    padding: "0.55rem 1.15rem",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer",
    fontWeight: 700,
    fontSize: "0.82rem",
    background: "linear-gradient(135deg, #f43f5e, #ec4899)",
    color: "#fff",
    boxShadow: "0 2px 10px rgba(244,63,94,0.35)",
    transition: "transform .12s, box-shadow .12s",
    marginLeft: "0.75rem",
  },
  btnModule: {
    display: "inline-block",
    padding: "0.5rem 1rem",
    margin: "0.3rem",
    borderRadius: "10px",
    border: "1px solid rgba(255,255,255,0.1)",
    cursor: "pointer",
    fontWeight: 600,
    fontSize: "0.78rem",
    background: "rgba(255,255,255,0.05)",
    color: "#cbd5e1",
    transition: "all .18s ease",
    letterSpacing: "0.01em",
  },
  btnModuleHoverish: {
    /* will apply via onMouseEnter / Leave */
    background: "rgba(99,102,241,0.15)",
    borderColor: "rgba(99,102,241,0.4)",
    color: "#a5b4fc",
    transform: "translateY(-1px)",
    boxShadow: "0 4px 12px rgba(99,102,241,0.2)",
  },

  /* ── panels / cards ── */
  mainGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "1.25rem",
    marginBottom: "1.25rem",
  },
  card: {
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: "14px",
    padding: "1.25rem",
    backdropFilter: "blur(8px)",
  },
  cardTitle: {
    fontSize: "0.75rem",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    color: "#64748b",
    marginBottom: "0.75rem",
  },
  sectionDivider: {
    border: "none",
    borderTop: "1px solid rgba(255,255,255,0.06)",
    margin: "0.85rem 0",
  },
  showLabel: {
    color: "#38bdf8",
    fontSize: "0.85rem",
    fontWeight: 600,
    minHeight: "1.4em",
  },

  /* ── result strip ── */
  resultStrip: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "0.75rem",
    maxHeight: "360px",
    overflow: "hidden",
    marginBottom: "1.25rem",
  },
  resultCell: {
    background: "rgba(255,255,255,0.025)",
    border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: "12px",
    padding: "0.75rem",
    fontSize: "0.72rem",
    color: "#94a3b8",
    overflow: "hidden",
    wordBreak: "break-all",
  },
  resultLabel: {
    fontSize: "0.68rem",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    color: "#475569",
    marginBottom: "0.4rem",
  },

  /* ── bottom preview ── */
  previewBox: {
    maxHeight: "280px",
    overflow: "hidden",
    background: "rgba(255,255,255,0.02)",
    border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: "12px",
    padding: "0.75rem",
    marginTop: "0.75rem",
  },
};

/* ── hover helper (lightweight) ── */
const hoverProps = (base, hover) => ({
  style: base,
  onMouseEnter: (e) => Object.assign(e.currentTarget.style, hover),
  onMouseLeave: (e) => Object.assign(e.currentTarget.style, base),
});

/* ══════════════════════════════════════════════════════════════ */
/*  COMPONENT                                                    */
/* ══════════════════════════════════════════════════════════════ */
function GetDocument() {
  const [IndexExcel, SetIndexExcel] = useState("1");

  /* Bước "Lấy file gần nhất": nạp lại file đã lưu CÙNG với giá trị sheet
     (vd "1-4") vừa nhập gần nhất, rồi xử lý y như chọn file thủ công. */
  const handleLayFileGanNhat = async () => {
    const record = await loadLastExcelFile();
    if (!record) {
      alert("Chưa có file nào được lưu.");
      return false;
    }
    const lastIndexText = getLastIndexText();
    if (lastIndexText) SetIndexExcel(lastIndexText);
    await processExcelSource(record.blob, lastIndexText || undefined);
    return true;
  };

  /* ── URL param ── */
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const rowParam = params.get("row");
    document.getElementById("SODONGEXCELCANLAYID").textContent = rowParam || 4;
  }, []);

  /* ── file reader ── */
  useEffect(() => {
    const handleFileChange = async (event) => {
      const file = event.target.files[0];
      if (!file) return;
      await processExcelSource(file);
      saveLastExcelFile(file); // lưu lại file vừa chọn, dùng cho nút "Lấy file gần nhất"
    };
    $("#headerID").hide();
    const input = document.getElementById("input");
    input.addEventListener("change", handleFileChange);
    return () => {
      input.removeEventListener("change", handleFileChange);
    };
  }, []);

  /* ── render ── */
  return (
    <div style={styles.root} id="remodeDiv">
      {/* ─── TOP BAR ─── */}
      <div style={styles.topBar}>
        <span style={styles.label}>Sheet</span>
        <span style={styles.sheetBadge} id="IndexExcel">
          {IndexExcel}
        </span>

        <input
          placeholder="Nhập ds sheet cần lấy…"
          onChange={(e) => {
            const value = e.currentTarget.value.trim();
            SetIndexExcel(value);
            saveLastIndexText(value); // để nút "Lấy file gần nhất" khôi phục lại đúng giá trị này
          }}
          type="text"
          style={styles.textInput}
          onFocus={(e) => {
            e.target.style.borderColor = "rgba(99,102,241,0.5)";
            e.target.style.boxShadow = "0 0 0 3px rgba(99,102,241,0.15)";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = "rgba(255,255,255,0.12)";
            e.target.style.boxShadow = "none";
          }}
        />

        <label
          style={styles.fileLabel}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-1px)";
            e.currentTarget.style.boxShadow =
              "0 4px 14px rgba(14,165,233,0.45)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 2px 8px rgba(14,165,233,0.35)";
          }}
        >
          📁 Chọn file
          <input type="file" id="input" style={styles.fileInput} />
        </label>

        <button
          style={styles.btnPrimary}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-1px)";
            e.currentTarget.style.boxShadow =
              "0 4px 16px rgba(99,102,241,0.45)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow =
              "0 2px 10px rgba(99,102,241,0.35)";
          }}
          onClick={handleLayFileGanNhat}
        >
          🕘 Lấy file gần nhất
        </button>
        <span style={styles.hint} id="LastFileNameID"></span>

        <button
          style={styles.btnDanger}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-1px)";
            e.currentTarget.style.boxShadow = "0 4px 14px rgba(239,68,68,0.45)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 2px 8px rgba(239,68,68,0.3)";
          }}
          onClick={() => {
            $("#input").val("");
            $("#ResID").text("");
          }}
        >
          ✕ Xóa
        </button>

        <span style={styles.rowBadge}>
          Rows:&nbsp;<b id="SODONGEXCELCANLAYID">4</b>
        </span>
        <span style={styles.hint}>
          Dùng param <code style={{ color: "#fbbf24" }}>?row=</code> để set số
          dòng
        </span>
      </div>

      {/* ─── MAIN 2-COL ─── */}
      <div style={styles.mainGrid}>
        {/* left – module buttons */}
        <div style={styles.card}>
          <div style={styles.cardTitle}>⚡ Công cụ chuyển đổi</div>
          {showButtonNew(Button_chuyendoi_001)}
          <hr style={styles.sectionDivider} />
          {showButtonNew(ChuyenDoi_Buoc_1)}
          <hr style={styles.sectionDivider} />
          {showButtonNew(ChuyenDoi_Buoc_2)}
        </div>

        {/* right – sub buttons + status */}
        <div style={styles.card}>
          <div style={styles.cardTitle}>📌 Các nút con</div>
          <div
            id="viewBTN"
            style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem" }}
          ></div>
          <div id="showID" style={styles.showLabel}></div>
        </div>
      </div>

      {/* ─── DOWNLOAD ROW ─── */}
      <div style={{ marginBottom: "1.25rem" }}>
        <button
          style={styles.btnPrimary}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-1px)";
            e.currentTarget.style.boxShadow =
              "0 4px 16px rgba(99,102,241,0.45)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow =
              "0 2px 10px rgba(99,102,241,0.35)";
          }}
          onClick={() => generateDownloadLinkFromDiv()}
        >
          ⬇ Lấy link download JSON TH | Tạo transMutiSet (A-B) từng lần 1 và bấm
        </button>

        <button
          style={styles.btnRemotion}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-1px)";
            e.currentTarget.style.boxShadow = "0 4px 16px rgba(244,63,94,0.5)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow =
              "0 2px 10px rgba(244,63,94,0.35)";
          }}
          onClick={async () => {
            try {
              // Bấm lần lượt từng nút, chờ có kết quả xong mới bấm nút tiếp theo
              const daCoFile = await handleLayFileGanNhat(); // 1: "Lấy file gần nhất" (kèm sheet đã lưu, vd "1-4")
              if (!daCoFile) return;
              Button_chuyendoi_001.C_NextStep_DontUnifile(); // 2: "NextStepDontUnifile"
              copyElementTextToClipboard("ResID"); // 3: "Copy" Result #01
            } catch (error) {
              console.error("Lỗi JSON REMOTION:", error);
              alert("Có lỗi khi chạy JSON REMOTION: " + error.message);
            }
          }}
        >
          🎬 JSON REMOTION
        </button>
      </div>

      {/* ─── RESULT STRIP ─── */}
      <div style={styles.resultStrip}>
        {["ResID", "ResID02", "ResID03", "ResID04"].map((id, i) => (
          <div key={id} style={styles.resultCell}>
            <div style={styles.resultLabel}>
              Result #{String(i + 1).padStart(2, "0")}
            </div>
            <div id={id}></div>
          </div>
        ))}
      </div>

      {/* ─── COPY + PREVIEW ─── */}
      <button
        style={styles.btnSuccess}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-1px)";
          e.currentTarget.style.boxShadow = "0 4px 14px rgba(16,185,129,0.45)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 2px 10px rgba(16,185,129,0.35)";
        }}
        onClick={() => copyElementTextToClipboard("ResID05")}
      >
        📋 Copy nội dung table #ResID05
      </button>

      <div style={styles.previewBox}>
        <div id="ResID05"></div>
      </div>
    </div>
  );
}

export default GetDocument;

/* ══════════════════════════════════════════════════════════════ */
/*  HELPERS (logic giữ nguyên)                                   */
/* ══════════════════════════════════════════════════════════════ */

/**
 * Chuẩn hoá chuỗi nhập danh sách sheet. Hỗ trợ:
 *  - Danh sách rời rạc:      "1,2,3"
 *  - Có khoảng trắng:        "1,  2,4"      -> bỏ hết khoảng trắng trước khi tách
 *  - Khoảng liên tục:        "1-4"          -> 1,2,3,4
 *  - Kết hợp cả 2 kiểu:      "2, 6-8"       -> 2,6,7,8
 * Đồng thời tự đoán các trường hợp bấm nhầm phổ biến:
 *  - Đảo chiều khoảng:       "8-6"          -> hiểu như "6-8" -> 6,7,8
 *  - Trùng lặp giữa danh sách và khoảng: "3,1-4" -> 1,2,3,4 (bỏ trùng)
 */
function parseSheetIndexInput(text) {
  const cleaned = (text || "").split(" ").join("");
  const numbers = [];

  cleaned.split(",").forEach((token) => {
    if (!token) return; // bỏ qua dấu phẩy thừa/liên tiếp, ví dụ "1,,2"
    if (token.includes("-")) {
      const [rawStart, rawEnd] = token.split("-");
      let start = parseInt(rawStart, 10);
      let end = parseInt(rawEnd, 10);
      if (Number.isNaN(start) || Number.isNaN(end)) return;
      if (start > end) [start, end] = [end, start]; // bấm nhầm đảo khoảng, vd "8-6"
      for (let i = start; i <= end; i++) numbers.push(i);
    } else {
      const n = parseInt(token, 10);
      if (!Number.isNaN(n)) numbers.push(n);
    }
  });

  // bỏ số trùng (bấm nhầm kiểu "3,1-4") và sắp xếp tăng dần cho dễ đoán kết quả
  return Array.from(new Set(numbers))
    .sort((a, b) => a - b)
    .map(String);
}

/**
 * Đọc 1 nguồn file Excel (File từ input, hoặc Blob lấy từ IndexedDB) theo
 * danh sách sheet đang nhập (hoặc indexTextOverride nếu truyền vào), rồi ghi
 * kết quả JSON ra #ResID. Dùng chung cho input file, nút "Lấy file gần nhất"
 * và nút "JSON REMOTION".
 */
async function processExcelSource(fileOrBlob, indexTextOverride) {
  try {
    const indexText = indexTextOverride ?? $("#IndexExcel").text();
    const ArrIndex = parseSheetIndexInput(indexText);
    let ArrOUT = [];
    for (const e of ArrIndex) {
      const rows = await readXlsxFile(fileOrBlob, { sheet: e });
      ArrOUT.push(rows);
    }
    $("#ResID").text(JSON.stringify(ArrOUT));
  } catch (error) {
    console.error(error);
  }
}

/* ── Lưu / lấy lại file excel đã chọn gần nhất (IndexedDB) ── */
const LAST_FILE_DB_NAME = "excelDataTool_LastFileDB";
const LAST_FILE_STORE = "lastExcelFile";

function openLastFileDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(LAST_FILE_DB_NAME, 1);
    req.onupgradeneeded = () => {
      req.result.createObjectStore(LAST_FILE_STORE);
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function saveLastExcelFile(file) {
  try {
    const db = await openLastFileDB();
    await new Promise((resolve, reject) => {
      const tx = db.transaction(LAST_FILE_STORE, "readwrite");
      tx.objectStore(LAST_FILE_STORE).put(
        { blob: file, name: file.name, savedAt: Date.now() },
        "latest",
      );
      tx.oncomplete = resolve;
      tx.onerror = () => reject(tx.error);
    });
    const badge = document.getElementById("LastFileNameID");
    if (badge) badge.textContent = "Đã lưu: " + file.name;
  } catch (error) {
    console.error("Không lưu được file gần nhất:", error);
  }
}

async function loadLastExcelFile() {
  try {
    const db = await openLastFileDB();
    const record = await new Promise((resolve, reject) => {
      const tx = db.transaction(LAST_FILE_STORE, "readonly");
      const req = tx.objectStore(LAST_FILE_STORE).get("latest");
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => reject(req.error);
    });
    const badge = document.getElementById("LastFileNameID");
    if (badge) {
      badge.textContent = record
        ? "Đang dùng: " + record.name
        : "Chưa có file đã lưu";
    }
    return record;
  } catch (error) {
    console.error("Không lấy được file gần nhất:", error);
    return null;
  }
}

/* ── Lưu / lấy lại giá trị sheet (vd "1-4") vừa nhập gần nhất (localStorage) ── */
const LAST_INDEX_TEXT_KEY = "excelDataTool_lastIndexText";

function saveLastIndexText(text) {
  try {
    localStorage.setItem(LAST_INDEX_TEXT_KEY, text);
  } catch (error) {
    console.error("Không lưu được giá trị sheet vừa nhập:", error);
  }
}

function getLastIndexText() {
  try {
    return localStorage.getItem(LAST_INDEX_TEXT_KEY);
  } catch (error) {
    return null;
  }
}

/* ── Copy nội dung 1 phần tử (theo id) vào clipboard ── */
function copyElementTextToClipboard(elementId) {
  try {
    const div = document.getElementById(elementId);
    if (!div) return;
    const content = div.innerText || div.textContent;
    const tempTextArea = document.createElement("textarea");
    tempTextArea.value = content;
    document.body.appendChild(tempTextArea);
    tempTextArea.select();
    document.execCommand("copy");
    document.body.removeChild(tempTextArea);
    alert("Content copied to clipboard!");
  } catch (error) {}
}

function showButton(ArrBTN, color) {
  let ArrObj = Object.keys(ArrBTN);
  return ArrObj.map((e, i) => (
    <button
      key={i}
      style={{
        ...styles.btnModule,
        borderColor: color || "rgba(255,255,255,0.1)",
        color: color || "#cbd5e1",
      }}
      onClick={() => {
        ArrBTN[e]();
      }}
    >
      {e}
    </button>
  ));
}

function showButtonNew(ArrBTN) {
  let ArrObj = Object.keys(ArrBTN);
  return ArrObj.map((e, i) => (
    <button
      id={e}
      key={i}
      style={styles.btnModule}
      onMouseEnter={(ev) =>
        Object.assign(ev.currentTarget.style, styles.btnModuleHoverish)
      }
      onMouseLeave={(ev) =>
        Object.assign(ev.currentTarget.style, styles.btnModule)
      }
      onClick={() => {
        document.getElementById("showID").textContent = e;
        try {
          ArrBTN[e]();
        } catch (error) {
          const moduleObject = ArrBTN[e];
          if (moduleObject && typeof moduleObject === "object") {
            const functionNames = Object.keys(moduleObject).filter(
              (key) => typeof moduleObject[key] === "function",
            );
            const viewBTN = document.getElementById("viewBTN");
            viewBTN.textContent = "";
            if (viewBTN) {
              functionNames.forEach((funcName) => {
                const button = document.createElement("button");
                button.textContent = funcName;
                /* style injected sub-buttons to match theme */
                Object.assign(button.style, {
                  padding: "0.45rem 0.85rem",
                  margin: "0.25rem",
                  borderRadius: "8px",
                  border: "1px solid rgba(56,189,248,0.25)",
                  background: "rgba(56,189,248,0.08)",
                  color: "#38bdf8",
                  fontWeight: "600",
                  fontSize: "0.76rem",
                  cursor: "pointer",
                  transition: "all .15s ease",
                });
                button.onmouseenter = () =>
                  Object.assign(button.style, {
                    background: "rgba(56,189,248,0.18)",
                    borderColor: "rgba(56,189,248,0.5)",
                    transform: "translateY(-1px)",
                    boxShadow: "0 3px 10px rgba(56,189,248,0.2)",
                  });
                button.onmouseleave = () =>
                  Object.assign(button.style, {
                    background: "rgba(56,189,248,0.08)",
                    borderColor: "rgba(56,189,248,0.25)",
                    transform: "translateY(0)",
                    boxShadow: "none",
                  });
                button.onclick = moduleObject[funcName];
                viewBTN.appendChild(button);
              });
            } else {
              console.error('Element with id="viewBTN" not found.');
            }
          } else {
            console.error(
              "Invalid module object or no functions found in ArrBTN[e].",
            );
          }
        }
      }}
    >
      {e}
    </button>
  ));
}

function generateDownloadLinkFromDiv() {
  const sourceDiv = document.getElementById("ResID");
  const targetDiv = document.getElementById("ResID02");
  if (!sourceDiv || !targetDiv) {
    console.error("Không tìm thấy div với id 'ResID' hoặc 'ResID02'");
    return;
  }
  try {
    const data = JSON.parse(sourceDiv.textContent || sourceDiv.innerText);
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const downloadLink = document.createElement("a");
    downloadLink.href = url;
    downloadLink.download = "result" + $("#IndexExcel").text() + ".json";
    downloadLink.textContent =
      "Tải xuống kết quả JSON " + $("#IndexExcel").text();
    /* style the generated download link */
    Object.assign(downloadLink.style, {
      display: "inline-flex",
      alignItems: "center",
      gap: "0.35rem",
      marginTop: "8px",
      padding: "0.5rem 1rem",
      borderRadius: "8px",
      background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
      color: "#fff",
      fontWeight: "600",
      fontSize: "0.82rem",
      textDecoration: "none",
      boxShadow: "0 2px 8px rgba(99,102,241,0.35)",
    });
    targetDiv.innerHTML = "";
    targetDiv.appendChild(downloadLink);
  } catch (err) {
    console.error("Không thể phân tích JSON từ nội dung của div 'ResID':", err);
    targetDiv.textContent = "Lỗi: Dữ liệu không hợp lệ.";
  }
}
