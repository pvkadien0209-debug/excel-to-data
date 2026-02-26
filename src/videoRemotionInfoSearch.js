import { useState, useRef, useEffect, useCallback, useMemo } from "react";

/* ═══════════════════════════════════════════════════════════════
   DATA — paste your dataActionandCss.json content here
   ═══════════════════════════════════════════════════════════════ */
const RAW_DATA = [
  [
    [
      "Mẫu obj-chung",
      '{\n actions: [],\n code: "CSKA_000",\n timeFixed: 5,\n stt: 0,\n };',
    ],
    [
      "typingTextActionToID",
      '{\n cmd: CMD_Fetch.typingTextActionToID,\n toID: "DIV001",\n text: "⚠ Nhưng nếu khớp này gặp vấn đề…",\n styleCss: {\n fontSize: "100px",\n color: "yellow",\n fontWeight: "800",\n },\n group: groupD,\n },',
    ],
    [
      "divAction- BG",
      '{\n cmd: "divAction",\n id: "BG001",\n ToEndFrame: true,\n styleCss: {\n position: "absolute",\n top: 0,\n bottom: 0,\n left: 0,\n right: 0,\n backgroundColor: "red",\n },\n },',
    ],
    [
      "divAction-text -trên -giữa",
      '{\n cmd: "divAction",\n id: "DIV001",\n group: groupD,\n styleCss: {\n position: "absolute",\n gap: "20px",\n top: "200px",\n zIndex: "10",\n width: "100%",\n textAlign: "center",\n },\n },',
    ],
    [
      "divAction - img- căn giữa ngang",
      '{\n cmd: "divAction",\n id: "DIV002",\n group: groupD,\n styleCss: {\n position: "absolute",\n top: "500px",\n left: "50%",\n transform: "translateX(-50%)",\n textAlign: "center",\n overFlow: "hidden",\n },\n },',
    ],
    [
      "imageViewActionToID",
      '{\n cmd: CMD_Fetch.imageViewActionToID ,\n toID: "DIV002",\n group: groupD,\n img: "Default_daidien.png",\n styleCss: {\n width: "500px",\n },\n },',
    ],
    [
      "actionCssId - transform img",
      '{\n cmd: CMD_Fetch.actionCssId,\n toID: "DIV-A",\n cssMode: "add",\n css: {\n maxHeight: "600px",\n transition: "max-height 1s ease-in-out",\n },\n },',
    ],
    [
      "actionCssId - transform text hide",
      '{\n cmd: CMD_Fetch.actionCssId,\n toID: "typingTexx001",\n cssMode: "add",\n css: {\n fontSize: "0px",\n },\n group: groupD,\n },',
    ],
    [
      "videoView - luôn absolute và tự điều chỉnh; không bỏ div khác",
      '{\n cmd: CMD_Fetch.videoView,\n video: "kd_tranganninhbinh.mp4",\n ToEndFrame: true,\n videoStartFrom: 0,\n videoDuration: 10 * 60,\n styleCss: {\n position: "absolute",\n height: "1920px",\n },\n },',
    ],
    [
      "Tạo function_group - obj đơn",
      'let obj_004 = {\n actions: [],\n code: "CSKA_000",\n timeFixed: 5,\n stt: 0,\n};\nfinalSet.push(obj_004);',
    ],
    [
      "Tạo function_group - obj sets",
      'arrInput.slice(1, 4).forEach((e, i) => {\n let obj_002 = {\n actions: [],\n code: "CSKA_000",\n timeFixed: null,\n stt: 1,\n };\n finalSet.push(obj_002);\n});',
    ],
    [
      "Tạo functionGourp Outline",
      'function group001_group002(arrInput = [{}], groupD = "groupDefault002") {\n let finalSet = [];\n\n return finalSet;\n}',
    ],
  ],
  [
    [
      "cmd",
      "divAction",
      "group",
      "G002",
      "id",
      "A001",
      null,
      null,
      null,
      null,
      null,
      null,
    ],
    [
      "cmd",
      "typingText-toID",
      "group",
      "G003",
      "toID",
      "A001",
      "id",
      "T001",
      "text",
      "ADD_Text01",
      null,
      null,
    ],
    [
      "cmd",
      "videoView",
      "group",
      "G004",
      "video",
      "ADD_Video001",
      "videoStartFrom",
      "ADD_video02start",
      "id",
      "video2",
      null,
      null,
    ],
    [
      "cmd",
      "typingText-toID",
      "group",
      "G005",
      "toID",
      "A001",
      "id",
      "T002",
      "text",
      "ADD_Text02",
      null,
      null,
    ],
    [
      "cmd",
      "videoView",
      "group",
      "G006",
      "video",
      "ADD_Video001",
      "videoStartFrom",
      "ADD_video03start",
      "id",
      "video3",
      null,
      null,
    ],
    [
      "cmd",
      "actionCssId",
      "group",
      "G007",
      "css",
      'JSON_{\n opacity: "1",\n transition: "opacity 1s ease-out"\n}',
      "toID",
      "video2",
      null,
      null,
      null,
      null,
    ],
    [
      "cmd",
      "actionCssId",
      "group",
      "G008",
      "css",
      'JSON_{\n maxWidth: "100px",\n transition: "max-width 2s ease-in-out"\n}',
      "toID",
      "T001",
      "delay",
      60,
      "cssMode",
      "add",
    ],
  ],
];

/* ═══════════════════════════════════════════════════════════════
   CONSTANTS & HELPERS
   ═══════════════════════════════════════════════════════════════ */
const TRUNCATE_LEN = 60;
const isImageUrl = (text) =>
  typeof text === "string" && text.includes("postimg");
const cellToStr = (v) => (v == null ? "" : String(v));

const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.cssText = "position:fixed;opacity:0";
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    document.body.removeChild(ta);
    return true;
  }
};

/* ═══════════════════════════════════════════════════════════════
   TOAST
   ═══════════════════════════════════════════════════════════════ */
function Toast({ msg, onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 1600);
    return () => clearTimeout(t);
  }, [onDone]);
  return <div className="dv-toast">{msg}</div>;
}

/* ═══════════════════════════════════════════════════════════════
   MODAL
   ═══════════════════════════════════════════════════════════════ */
function Modal({ content, onClose }) {
  useEffect(() => {
    const handler = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div className="dv-modal-overlay" onClick={onClose}>
      <div className="dv-modal" onClick={(e) => e.stopPropagation()}>
        <div className="dv-modal-header">
          <span className="dv-modal-title">Chi tiết nội dung</span>
          <button className="dv-modal-close" onClick={onClose}>
            ✕
          </button>
        </div>
        <div className="dv-modal-body">
          {isImageUrl(content) ? (
            <img
              src={content}
              alt=""
              style={{ maxWidth: "100%", borderRadius: 8 }}
            />
          ) : (
            <pre className="dv-modal-pre">{content}</pre>
          )}
        </div>
        <div className="dv-modal-footer">
          <button
            className="dv-btn dv-btn-accent"
            onClick={() => copyToClipboard(cellToStr(content))}
          >
            📋 Copy nội dung
          </button>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CELL
   ═══════════════════════════════════════════════════════════════ */
function Cell({
  value,
  onShowModal,
  onCopied,
  rowIdx,
  colIdx,
  highlightId,
  sheetIdx,
}) {
  const text = cellToStr(value);
  const isImg = isImageUrl(text);
  const needTruncate = !isImg && text.length > TRUNCATE_LEN;
  const id = `${sheetIdx}-${rowIdx}-${colIdx}`;
  const isHighlighted = highlightId === id;

  return (
    <td
      className={`dv-cell ${isHighlighted ? "dv-cell-hl" : ""}`}
      id={`cell-${id}`}
    >
      <div className="dv-cell-inner">
        {isImg ? (
          <img
            src={text}
            alt=""
            className="dv-cell-img"
            onClick={() => onShowModal(text)}
          />
        ) : needTruncate ? (
          <span className="dv-cell-text">
            {text.slice(0, TRUNCATE_LEN)}…
            <button className="dv-link-btn" onClick={() => onShowModal(text)}>
              xem thêm
            </button>
          </span>
        ) : (
          <span className="dv-cell-text">
            {text || <span className="dv-null">—</span>}
          </span>
        )}
        {text && (
          <button
            className="dv-copy-micro"
            title="Copy ô"
            onClick={async () => {
              await copyToClipboard(text);
              onCopied("Đã copy ô!");
            }}
          >
            ⧉
          </button>
        )}
      </div>
    </td>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SHEET TABLE
   ═══════════════════════════════════════════════════════════════ */
function SheetTable({ data, sheetIdx, onCopied, highlightId }) {
  const [modalContent, setModalContent] = useState(null);
  if (!data || data.length === 0)
    return <p className="dv-empty">Sheet trống</p>;

  const maxCols = Math.max(...data.map((r) => r.length));

  const copyRow = async (rowIdx) => {
    const text = data[rowIdx].map(cellToStr).join("\t");
    await copyToClipboard(text);
    onCopied(`Đã copy dòng ${rowIdx + 1}!`);
  };

  const copyCol = async (colIdx) => {
    const text = data.map((r) => cellToStr(r[colIdx] ?? "")).join("\n");
    await copyToClipboard(text);
    onCopied(`Đã copy cột ${colIdx + 1}!`);
  };

  return (
    <>
      {modalContent !== null && (
        <Modal content={modalContent} onClose={() => setModalContent(null)} />
      )}
      <div className="dv-table-wrap">
        <table className="dv-table">
          <thead>
            <tr>
              <th className="dv-th dv-th-idx">#</th>
              {Array.from({ length: maxCols }, (_, ci) => (
                <th key={ci} className="dv-th">
                  <span className="dv-th-label">Col {ci + 1}</span>
                  <button
                    className="dv-copy-col"
                    title="Copy cột"
                    onClick={() => copyCol(ci)}
                  >
                    ⇅
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, ri) => (
              <tr key={ri} className="dv-row">
                <td className="dv-cell dv-cell-idx">
                  <span>{ri + 1}</span>
                  <button
                    className="dv-copy-row"
                    title="Copy dòng"
                    onClick={() => copyRow(ri)}
                  >
                    ⇉
                  </button>
                </td>
                {Array.from({ length: maxCols }, (_, ci) => (
                  <Cell
                    key={ci}
                    value={row[ci] ?? null}
                    rowIdx={ri}
                    colIdx={ci}
                    sheetIdx={sheetIdx}
                    highlightId={highlightId}
                    onShowModal={setModalContent}
                    onCopied={onCopied}
                  />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SEARCH
   ═══════════════════════════════════════════════════════════════ */
function SearchBar({ data, onNavigate }) {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const inputRef = useRef(null);
  const wrapRef = useRef(null);

  // close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target))
        setFocused(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    const hits = [];
    data.forEach((sheet, si) => {
      sheet.forEach((row, ri) => {
        row.forEach((cell, ci) => {
          const text = cellToStr(cell);
          if (text.toLowerCase().includes(q)) {
            hits.push({ sheetIdx: si, rowIdx: ri, colIdx: ci, text });
          }
        });
      });
    });
    return hits.slice(0, 30);
  }, [query, data]);

  const showDropdown = focused && query.trim() && results.length > 0;

  return (
    <div className="dv-search-wrap" ref={wrapRef}>
      <div className="dv-search-box">
        <span className="dv-search-icon">⌕</span>
        <input
          ref={inputRef}
          className="dv-search-input"
          type="text"
          placeholder="Tìm kiếm nội dung…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
        />
        {query && (
          <button
            className="dv-search-clear"
            onClick={() => {
              setQuery("");
              inputRef.current.focus();
            }}
          >
            ✕
          </button>
        )}
      </div>
      {showDropdown && (
        <div className="dv-dropdown">
          <div className="dv-dropdown-header">{results.length} kết quả</div>
          {results.map((r, i) => {
            const q = query.toLowerCase();
            const idx = r.text.toLowerCase().indexOf(q);
            const before = r.text.slice(Math.max(0, idx - 20), idx);
            const match = r.text.slice(idx, idx + query.length);
            const after = r.text.slice(
              idx + query.length,
              idx + query.length + 40,
            );
            return (
              <button
                key={i}
                className="dv-dropdown-item"
                onClick={() => {
                  onNavigate(
                    r.sheetIdx,
                    `${r.sheetIdx}-${r.rowIdx}-${r.colIdx}`,
                  );
                  setFocused(false);
                }}
              >
                <span className="dv-dropdown-badge">
                  Sheet {r.sheetIdx + 1} · R{r.rowIdx + 1}:C{r.colIdx + 1}
                </span>
                <span className="dv-dropdown-preview">
                  {before.length > 0 && "…"}
                  {before}
                  <mark>{match}</mark>
                  {after}
                  {after.length >= 40 && "…"}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN APP
   ═══════════════════════════════════════════════════════════════ */
export default function DataViewer() {
  const [activeSheet, setActiveSheet] = useState(0);
  const [toast, setToast] = useState(null);
  const [highlightId, setHighlightId] = useState(null);

  const showToast = useCallback((msg) => setToast(msg), []);

  const handleNavigate = useCallback((sheetIdx, cellId) => {
    setActiveSheet(sheetIdx);
    setHighlightId(cellId);

    // scroll to cell after sheet tab switches
    requestAnimationFrame(() => {
      setTimeout(() => {
        const el = document.getElementById(`cell-${cellId}`);
        if (el) {
          el.scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "center",
          });
          // remove highlight after animation
          setTimeout(() => setHighlightId(null), 2200);
        }
      }, 80);
    });
  }, []);

  return (
    <>
      <style>{CSS_TEXT}</style>
      <div className="dv-root">
        {/* HEADER */}
        <header className="dv-header">
          <div className="dv-header-left">
            <h1 className="dv-title">
              <span className="dv-title-icon">◈</span> Data Action &amp; CSS
            </h1>
            <span className="dv-subtitle">Reference Table Viewer</span>
          </div>
          <SearchBar data={RAW_DATA} onNavigate={handleNavigate} />
        </header>

        {/* SHEET TABS */}
        <nav className="dv-tabs">
          {RAW_DATA.map((_, i) => (
            <button
              key={i}
              className={`dv-tab ${activeSheet === i ? "dv-tab-active" : ""}`}
              onClick={() => setActiveSheet(i)}
            >
              <span className="dv-tab-dot" />
              Sheet {i + 1}
              <span className="dv-tab-count">{RAW_DATA[i].length} rows</span>
            </button>
          ))}
        </nav>

        {/* TABLE */}
        <SheetTable
          data={RAW_DATA[activeSheet]}
          sheetIdx={activeSheet}
          onCopied={showToast}
          highlightId={highlightId}
        />

        {/* TOAST */}
        {toast && <Toast msg={toast} onDone={() => setToast(null)} />}
      </div>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CSS
   ═══════════════════════════════════════════════════════════════ */
const CSS_TEXT = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700&family=JetBrains+Mono:wght@400;500;600&display=swap');

/* ── reset & root ── */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
.dv-root {
  --bg:        #0c0e13;
  --surface:   #13161d;
  --surface2:  #1a1e28;
  --border:    #23283488;
  --border-h:  #2d3340;
  --text:      #c8cdd8;
  --text2:     #727b8e;
  --text3:     #4a5167;
  --accent:    #5eead4;
  --accent2:   #2dd4bf;
  --accent-bg: rgba(94,234,212,0.06);
  --warn:      #fbbf24;
  --red:       #f87171;
  --blue:      #60a5fa;
  --purple:    #a78bfa;

  font-family: 'DM Sans', sans-serif;
  background: var(--bg);
  color: var(--text);
  min-height: 100vh;
  padding: 1.5rem 2rem 4rem;
}

/* ── header ── */
.dv-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}
.dv-header-left { display: flex; flex-direction: column; gap: 0.15rem; }
.dv-title {
  font-size: 1.35rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: #eef1f6;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.dv-title-icon {
  color: var(--accent);
  font-size: 1.1rem;
}
.dv-subtitle {
  font-size: 0.72rem;
  color: var(--text3);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  font-weight: 600;
}

/* ── search ── */
.dv-search-wrap { position: relative; flex: 0 1 380px; min-width: 240px; }
.dv-search-box {
  display: flex;
  align-items: center;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 0 0.75rem;
  transition: border-color .2s, box-shadow .2s;
}
.dv-search-box:focus-within {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px rgba(94,234,212,0.1);
}
.dv-search-icon { color: var(--text3); font-size: 1.1rem; margin-right: 0.45rem; }
.dv-search-input {
  flex: 1;
  background: none;
  border: none;
  outline: none;
  color: var(--text);
  font-family: inherit;
  font-size: 0.85rem;
  padding: 0.6rem 0;
}
.dv-search-input::placeholder { color: var(--text3); }
.dv-search-clear {
  background: none;
  border: none;
  color: var(--text3);
  cursor: pointer;
  font-size: 0.9rem;
  padding: 0.2rem;
  border-radius: 4px;
  transition: color .15s;
}
.dv-search-clear:hover { color: var(--red); }

/* dropdown */
.dv-dropdown {
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  right: 0;
  background: var(--surface2);
  border: 1px solid var(--border-h);
  border-radius: 12px;
  max-height: 380px;
  overflow-y: auto;
  z-index: 200;
  box-shadow: 0 16px 48px rgba(0,0,0,0.5);
  animation: dv-slideDown .18s ease;
}
@keyframes dv-slideDown {
  from { opacity: 0; transform: translateY(-6px); }
  to   { opacity: 1; transform: translateY(0); }
}
.dv-dropdown-header {
  position: sticky;
  top: 0;
  background: var(--surface2);
  padding: 0.5rem 0.85rem;
  font-size: 0.68rem;
  font-weight: 600;
  color: var(--text3);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  border-bottom: 1px solid var(--border);
}
.dv-dropdown-item {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  border-bottom: 1px solid var(--border);
  padding: 0.6rem 0.85rem;
  cursor: pointer;
  transition: background .12s;
  font-family: inherit;
  color: var(--text);
}
.dv-dropdown-item:last-child { border-bottom: none; }
.dv-dropdown-item:hover { background: var(--accent-bg); }
.dv-dropdown-badge {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.62rem;
  font-weight: 600;
  color: var(--accent2);
  letter-spacing: 0.03em;
}
.dv-dropdown-preview {
  font-size: 0.78rem;
  color: var(--text2);
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.dv-dropdown-preview mark {
  background: rgba(94,234,212,0.2);
  color: var(--accent);
  border-radius: 2px;
  padding: 0 2px;
}

/* ── tabs ── */
.dv-tabs {
  display: flex;
  gap: 0.4rem;
  margin-bottom: 1rem;
}
.dv-tab {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  font-family: inherit;
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--text2);
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 9px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: all .18s;
}
.dv-tab:hover { border-color: var(--border-h); color: var(--text); }
.dv-tab-active {
  background: var(--accent-bg);
  border-color: rgba(94,234,212,0.25);
  color: var(--accent);
}
.dv-tab-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--text3);
  transition: background .18s;
}
.dv-tab-active .dv-tab-dot { background: var(--accent); box-shadow: 0 0 6px var(--accent); }
.dv-tab-count {
  font-size: 0.62rem;
  color: var(--text3);
  background: rgba(255,255,255,0.04);
  padding: 0.15rem 0.4rem;
  border-radius: 5px;
}

/* ── table ── */
.dv-table-wrap {
  overflow-x: auto;
  border: 1px solid var(--border);
  border-radius: 14px;
  background: var(--surface);
}
.dv-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.82rem;
}
.dv-th {
  position: sticky;
  top: 0;
  background: var(--surface2);
  padding: 0.6rem 0.75rem;
  text-align: left;
  font-size: 0.68rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--text3);
  border-bottom: 1px solid var(--border);
  white-space: nowrap;
}
.dv-th-idx { width: 52px; text-align: center; }
.dv-th-label { margin-right: 0.35rem; }
.dv-copy-col {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: 1px solid transparent;
  color: var(--text3);
  font-size: 0.78rem;
  cursor: pointer;
  width: 22px;
  height: 22px;
  border-radius: 5px;
  transition: all .15s;
  vertical-align: middle;
}
.dv-copy-col:hover {
  background: var(--accent-bg);
  border-color: rgba(94,234,212,0.2);
  color: var(--accent);
}

/* ── rows & cells ── */
.dv-row { transition: background .12s; }
.dv-row:hover { background: rgba(255,255,255,0.015); }
.dv-row:not(:last-child) .dv-cell { border-bottom: 1px solid var(--border); }
.dv-cell {
  padding: 0.55rem 0.75rem;
  vertical-align: top;
  max-width: 420px;
  position: relative;
}
.dv-cell-idx {
  text-align: center;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.72rem;
  color: var(--text3);
  font-weight: 600;
  width: 52px;
  white-space: nowrap;
}
.dv-cell-inner {
  display: flex;
  align-items: flex-start;
  gap: 0.4rem;
}
.dv-cell-text {
  flex: 1;
  line-height: 1.55;
  word-break: break-word;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.76rem;
  color: var(--text);
}
.dv-null { color: var(--text3); }
.dv-cell-img {
  width: 300px;
  max-width: 100%;
  border-radius: 8px;
  border: 1px solid var(--border);
  cursor: pointer;
  transition: transform .2s, box-shadow .2s;
}
.dv-cell-img:hover {
  transform: scale(1.02);
  box-shadow: 0 8px 24px rgba(0,0,0,0.4);
}

/* link btn */
.dv-link-btn {
  display: inline;
  background: none;
  border: none;
  color: var(--accent2);
  font-family: inherit;
  font-size: 0.74rem;
  font-weight: 600;
  cursor: pointer;
  padding: 0 0.15rem;
  text-decoration: underline;
  text-decoration-style: dotted;
  text-underline-offset: 2px;
  transition: color .12s;
}
.dv-link-btn:hover { color: var(--accent); }

/* micro copy btn per cell */
.dv-copy-micro {
  flex-shrink: 0;
  background: none;
  border: 1px solid transparent;
  color: var(--text3);
  width: 24px;
  height: 24px;
  font-size: 0.82rem;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: all .15s;
}
.dv-cell:hover .dv-copy-micro { opacity: 1; }
.dv-copy-micro:hover {
  background: var(--accent-bg);
  border-color: rgba(94,234,212,0.2);
  color: var(--accent);
}

/* row copy btn */
.dv-copy-row {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: 1px solid transparent;
  color: var(--text3);
  font-size: 0.72rem;
  cursor: pointer;
  width: 22px;
  height: 22px;
  border-radius: 5px;
  opacity: 0;
  transition: all .15s;
  margin-left: 0.2rem;
}
.dv-row:hover .dv-copy-row { opacity: 1; }
.dv-copy-row:hover {
  background: var(--accent-bg);
  border-color: rgba(94,234,212,0.2);
  color: var(--accent);
}

/* highlight */
.dv-cell-hl {
  animation: dv-hlPulse 2s ease;
}
@keyframes dv-hlPulse {
  0%, 100% { background: transparent; }
  15%, 60% { background: rgba(94,234,212,0.12); }
}

/* ── modal ── */
.dv-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.65);
  backdrop-filter: blur(6px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: dv-fadeIn .15s ease;
  padding: 1.5rem;
}
@keyframes dv-fadeIn { from { opacity: 0; } to { opacity: 1; } }
.dv-modal {
  background: var(--surface2);
  border: 1px solid var(--border-h);
  border-radius: 16px;
  width: 100%;
  max-width: 640px;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 24px 64px rgba(0,0,0,0.5);
  animation: dv-scaleIn .2s ease;
}
@keyframes dv-scaleIn {
  from { opacity: 0; transform: scale(0.95); }
  to   { opacity: 1; transform: scale(1); }
}
.dv-modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.25rem;
  border-bottom: 1px solid var(--border);
}
.dv-modal-title {
  font-size: 0.88rem;
  font-weight: 700;
  color: #eef1f6;
}
.dv-modal-close {
  background: none;
  border: 1px solid var(--border);
  color: var(--text2);
  width: 30px;
  height: 30px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all .12s;
}
.dv-modal-close:hover {
  background: rgba(248,113,113,0.1);
  border-color: rgba(248,113,113,0.3);
  color: var(--red);
}
.dv-modal-body {
  padding: 1.25rem;
  overflow-y: auto;
  flex: 1;
}
.dv-modal-pre {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.8rem;
  line-height: 1.65;
  color: var(--text);
  white-space: pre-wrap;
  word-break: break-word;
}
.dv-modal-footer {
  padding: 0.75rem 1.25rem;
  border-top: 1px solid var(--border);
  display: flex;
  justify-content: flex-end;
}

/* ── buttons ── */
.dv-btn {
  font-family: inherit;
  font-size: 0.78rem;
  font-weight: 600;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  transition: all .15s;
}
.dv-btn-accent {
  background: linear-gradient(135deg, var(--accent2), var(--accent));
  color: #0c0e13;
  box-shadow: 0 2px 10px rgba(94,234,212,0.25);
}
.dv-btn-accent:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 16px rgba(94,234,212,0.35);
}

/* ── toast ── */
.dv-toast {
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  background: var(--accent);
  color: #0c0e13;
  font-weight: 700;
  font-size: 0.82rem;
  padding: 0.6rem 1.4rem;
  border-radius: 10px;
  box-shadow: 0 8px 28px rgba(94,234,212,0.35);
  z-index: 2000;
  animation: dv-toastIn .25s ease, dv-toastOut .3s ease 1.3s forwards;
}
@keyframes dv-toastIn {
  from { opacity: 0; transform: translateX(-50%) translateY(12px); }
  to   { opacity: 1; transform: translateX(-50%) translateY(0); }
}
@keyframes dv-toastOut {
  to { opacity: 0; transform: translateX(-50%) translateY(8px); }
}

.dv-empty {
  padding: 3rem;
  text-align: center;
  color: var(--text3);
  font-size: 0.88rem;
}

/* scrollbar */
.dv-table-wrap::-webkit-scrollbar,
.dv-dropdown::-webkit-scrollbar,
.dv-modal-body::-webkit-scrollbar { width: 6px; height: 6px; }
.dv-table-wrap::-webkit-scrollbar-track,
.dv-dropdown::-webkit-scrollbar-track,
.dv-modal-body::-webkit-scrollbar-track { background: transparent; }
.dv-table-wrap::-webkit-scrollbar-thumb,
.dv-dropdown::-webkit-scrollbar-thumb,
.dv-modal-body::-webkit-scrollbar-thumb {
  background: var(--border-h);
  border-radius: 3px;
}
`;
