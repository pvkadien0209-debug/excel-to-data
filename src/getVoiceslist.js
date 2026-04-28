import { useEffect, useRef, useState } from "react";

// ─── Edge/Windows resume hack ──────────────────────────────────────────────
// Edge trên Windows có bug: speechSynthesis tự pause sau ~14s
// Fix: gọi resume() mỗi 5 giây khi đang đọc
function startEdgeResumeFix() {
  return setInterval(() => {
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
    }
  }, 5000);
}

// ─── Tách text thành mảng câu ngắn ─────────────────────────────────────────
function splitIntoChunks(text) {
  // Tách theo . ! ? — giữ dấu câu ở cuối mỗi chunk
  const chunks = text.match(/[^.!?,;]+[.!?,;]*/g) ?? [text];
  return chunks.map((c) => c.trim()).filter(Boolean);
}

// ─── Đọc tuần tự từng chunk — fix giật tiếng Việt ─────────────────────────
function speakChunks(chunks, voice, rate, onDone) {
  if (!chunks.length) {
    onDone?.();
    return;
  }

  const [head, ...tail] = chunks;
  const utt = new SpeechSynthesisUtterance(head);
  utt.voice = voice;
  utt.lang = voice.lang;
  utt.rate = 1.2;
  utt.pitch = 1.0;
  utt.volume = 1.0;

  utt.onend = () => speakChunks(tail, voice, rate, onDone);
  utt.onerror = (err) => {
    // Bỏ qua lỗi "interrupted" (do cancel trước đó), tiếp tục chunk tiếp theo
    if (err.error !== "interrupted") {
      console.error("Speech error:", err.error, "|", head);
    }
    speakChunks(tail, voice, rate, onDone);
  };

  window.speechSynthesis.speak(utt);
}

// ─── ReadMessage ────────────────────────────────────────────────────────────
function ReadMessage(voice, text, resumeTimerRef) {
  window.speechSynthesis.cancel();

  // Xoá timer cũ nếu có
  if (resumeTimerRef.current) clearInterval(resumeTimerRef.current);
  resumeTimerRef.current = startEdgeResumeFix();

  const chunks = splitIntoChunks(text);

  speakChunks(chunks, voice, 0.85, () => {
    clearInterval(resumeTimerRef.current);
    resumeTimerRef.current = null;
    console.log("✅ Đọc xong toàn bộ");
  });
}

// ─── Tìm voices trên Windows Edge ──────────────────────────────────────────
const VI_KEYWORDS = ["vi-VN", "Vietnamese", "HoaiMy", "NamMinh", "vi_VN"];
const EN_MALE_KEYWORDS = ["David", "Mark", "Guy", "James", "Richard"];
const EN_FEMALE_KEYWORDS = ["Zira", "Jenny", "Aria", "Michelle", "Clara"];

function findVoicesWindows() {
  const all = window.speechSynthesis.getVoices();

  const vi = all.filter((v) =>
    VI_KEYWORDS.some((kw) => v.lang.includes(kw) || v.name.includes(kw))
  );

  const enAll = all.filter((v) => v.lang.startsWith("en"));
  const enMale =
    enAll.find((v) => EN_MALE_KEYWORDS.some((k) => v.name.includes(k))) ?? null;
  const enFemale =
    enAll.find((v) => EN_FEMALE_KEYWORDS.some((k) => v.name.includes(k))) ?? null;

  return { vi, enMale, enFemale, all };
}

// ─── Load voices (Edge đôi khi cần chờ onvoiceschanged) ────────────────────
function loadVoices() {
  return new Promise((resolve) => {
    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) return resolve(findVoicesWindows());
    window.speechSynthesis.onvoiceschanged = () =>
      resolve(findVoicesWindows());
  });
}

// ─── Component ──────────────────────────────────────────────────────────────
const DEMO_TEXT_VI =
  "Tôi là người Việt Nam. Tôi rất vui khi được gặp bạn hôm nay. Chúc bạn một ngày tốt lành và thật nhiều may mắn.";
const DEMO_TEXT_EN =
  "She is of medium height. She has long black hair and is always smiling. It is a pleasure to meet you today.";

const VoiceList = () => {
  const [voices, setVoices] = useState({ vi: [], enMale: null, enFemale: null, all: [] });
  const [activeIdx, setActiveIdx] = useState(null);
  const resumeTimerRef = useRef(null);

  useEffect(() => {
    loadVoices().then(setVoices);
    return () => {
      window.speechSynthesis.cancel();
      if (resumeTimerRef.current) clearInterval(resumeTimerRef.current);
    };
  }, []);

  const speak = (voice, text, idx) => {
    setActiveIdx(idx);
    ReadMessage(voice, text, resumeTimerRef);
  };

  const stop = () => {
    window.speechSynthesis.cancel();
    clearInterval(resumeTimerRef.current);
    resumeTimerRef.current = null;
    setActiveIdx(null);
  };

  return (
    <div style={styles.wrap}>
      <h2 style={styles.title}>🔊 Voice Tester — Edge / Windows</h2>

      {/* ── Tiếng Việt ── */}
      <section style={styles.section}>
        <h3 style={styles.sectionTitle}>🇻🇳 Tiếng Việt ({voices.vi.length})</h3>
        {voices.vi.length === 0 && (
          <p style={styles.empty}>Không tìm thấy voice tiếng Việt trên thiết bị này.</p>
        )}
        {voices.vi.map((v, i) => (
          <VoiceRow
            key={v.name}
            voice={v}
            text={DEMO_TEXT_VI}
            idx={`vi-${i}`}
            active={activeIdx === `vi-${i}`}
            onPlay={(voice, text) => speak(voice, text, `vi-${i}`)}
          />
        ))}
      </section>

      {/* ── Tiếng Anh ── */}
      <section style={styles.section}>
        <h3 style={styles.sectionTitle}>🇬🇧 Tiếng Anh</h3>
        {[voices.enMale, voices.enFemale].filter(Boolean).map((v, i) => (
          <VoiceRow
            key={v.name}
            voice={v}
            text={DEMO_TEXT_EN}
            idx={`en-${i}`}
            active={activeIdx === `en-${i}`}
            onPlay={(voice, text) => speak(voice, text, `en-${i}`)}
          />
        ))}
      </section>

      {/* ── Tất cả voices ── */}
      <section style={styles.section}>
        <h3 style={styles.sectionTitle}>📋 Tất cả ({voices.all.length})</h3>
        <div style={styles.allList}>
          {voices.all.map((v, i) => (
            <div key={v.name} style={styles.allRow}>
              <span style={styles.badge}>{i}</span>
              <span style={styles.name}>{v.name}</span>
              <span style={styles.lang}>{v.lang}</span>
              <button
                style={styles.btn}
                onClick={() =>
                  speak(v, v.lang.startsWith("vi") ? DEMO_TEXT_VI : DEMO_TEXT_EN, `all-${i}`)
                }
              >
                ▶
              </button>
            </div>
          ))}
        </div>
      </section>

      <button style={styles.stopBtn} onClick={stop}>
        ⏹ Dừng
      </button>
    </div>
  );
};

// ─── VoiceRow ───────────────────────────────────────────────────────────────
const VoiceRow = ({ voice, text, idx, active, onPlay }) => (
  <div style={{ ...styles.row, ...(active ? styles.rowActive : {}) }}>
    <div>
      <strong>{voice.name}</strong>
      <span style={styles.langTag}>{voice.lang}</span>
    </div>
    <button style={styles.btn} onClick={() => onPlay(voice, text)}>
      {active ? "🔊" : "▶ Test"}
    </button>
  </div>
);

// ─── Styles ─────────────────────────────────────────────────────────────────
const styles = {
  wrap: { fontFamily: "sans-serif", maxWidth: 680, margin: "0 auto", padding: 24 },
  title: { fontSize: 22, marginBottom: 16 },
  section: { marginBottom: 24 },
  sectionTitle: { fontSize: 16, color: "#555", borderBottom: "1px solid #ddd", paddingBottom: 4 },
  empty: { color: "#999", fontSize: 14 },
  row: {
    display: "flex", justifyContent: "space-between", alignItems: "center",
    padding: "8px 12px", borderRadius: 8, background: "#f5f5f5", marginBottom: 6,
  },
  rowActive: { background: "#e0f7fa" },
  langTag: { marginLeft: 8, fontSize: 12, color: "#888" },
  btn: {
    padding: "4px 12px", borderRadius: 6, border: "none",
    background: "#1976d2", color: "#fff", cursor: "pointer", fontSize: 13,
  },
  stopBtn: {
    padding: "8px 24px", borderRadius: 8, border: "none",
    background: "#d32f2f", color: "#fff", cursor: "pointer", fontSize: 15, marginTop: 8,
  },
  allList: { display: "flex", flexDirection: "column", gap: 4 },
  allRow: {
    display: "flex", alignItems: "center", gap: 8,
    padding: "4px 8px", borderRadius: 6, background: "#fafafa", fontSize: 13,
  },
  badge: {
    minWidth: 28, textAlign: "center", background: "#eee",
    borderRadius: 4, padding: "1px 4px", fontSize: 11, color: "#666",
  },
  name: { flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" },
  lang: { color: "#888", fontSize: 12, minWidth: 60 },
};

export default VoiceList;