import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";

const NAV_ITEMS = [
  {
    path: "/doc",
    label: "Documents",
    icon: "📄",
    desc: "Quản lý tài liệu & nội dung",
  },
  {
    path: "/rem",
    label: "Remotion Info",
    icon: "🎬",
    desc: "Tìm kiếm thông tin video Remotion",
  },
  { path: "/test", label: "Test", icon: "🧪", desc: "Kiểm thử component" },
  { path: "/videoview", label: "Video View", icon: "▶️", desc: "Xem video" },
  {
    path: "/voice",
    label: "Voice List",
    icon: "🎙️",
    desc: "Danh sách giọng đọc",
  },
  {
    path: "/video",
    label: "Video Create",
    icon: "🎥",
    desc: "Tạo video (Move 01)",
  },
  {
    path: "/video-01",
    label: "Video Create 01",
    icon: "🎞️",
    desc: "Tạo video (Version 01)",
  },
  {
    path: "/record",
    label: "TTS Recorder",
    icon: "🔴",
    desc: "Text to Speech & ghi âm",
  },
  {
    path: "/newvideomodel",
    label: "New Video Model",
    icon: "🆕",
    desc: "Mô hình video mới",
  },
  {
    path: "/newtable",
    label: "New Table JSON",
    icon: "📊",
    desc: "Tạo bảng từ JSON",
  },
  {
    path: "/cut",
    label: "Audio Splitter",
    icon: "✂️",
    desc: "Cắt & chia audio",
  },
  { path: "/merge", label: "Video Merger", icon: "🔗", desc: "Ghép file MP4" },
  { path: "/ghiam", label: "Ghi Âm", icon: "🎤", desc: "Ghi âm trực tiếp" },
  {
    path: "/youtube",
    label: "YouTube Playlist",
    icon: "📺",
    desc: "Playlist YouTube",
  },
  {
    path: "/tiktok",
    label: "TikTok Ghép Âm",
    icon: "🎵",
    desc: "Quay video TikTok ghép âm",
  },
  {
    path: "/ipasort",
    label: "IPA Sort",
    icon: "🔤",
    desc: "Sắp xếp IPA phiên âm",
  },
];

export default function StartPage() {
  const canvasRef = useRef(null);

  // Animated particle background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const dots = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2 + 0.5,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      o: Math.random() * 0.5 + 0.15,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      dots.forEach((d) => {
        d.x += d.vx;
        d.y += d.vy;
        if (d.x < 0 || d.x > canvas.width) d.vx *= -1;
        if (d.y < 0 || d.y > canvas.height) d.vy *= -1;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(99,210,190,${d.o})`;
        ctx.fill();
      });
      // draw connecting lines
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x;
          const dy = dots[i].y - dots[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.strokeStyle = `rgba(99,210,190,${0.12 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .sp-root {
          min-height: 100vh;
          background: #0b0f14;
          font-family: 'DM Mono', monospace;
          color: #e2e8f0;
          position: relative;
          overflow-x: hidden;
        }

        .sp-canvas {
          position: fixed;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 0;
        }

        .sp-content {
          position: relative;
          z-index: 1;
          max-width: 1100px;
          margin: 0 auto;
          padding: 60px 24px 80px;
        }

        /* ── HEADER ── */
        .sp-header {
          text-align: center;
          margin-bottom: 56px;
        }
        .sp-badge {
          display: inline-block;
          font-size: 11px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #63d2be;
          border: 1px solid rgba(99,210,190,0.35);
          padding: 5px 14px;
          border-radius: 100px;
          margin-bottom: 20px;
          font-family: 'DM Mono', monospace;
        }
        .sp-title {
          font-family: 'Syne', sans-serif;
          font-size: clamp(2rem, 5vw, 3.6rem);
          font-weight: 800;
          line-height: 1.1;
          background: linear-gradient(135deg, #e2e8f0 30%, #63d2be 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 14px;
        }
        .sp-subtitle {
          font-size: 13px;
          color: #64748b;
          letter-spacing: 0.05em;
        }
        .sp-divider {
          width: 48px;
          height: 2px;
          background: linear-gradient(90deg, #63d2be, transparent);
          margin: 20px auto 0;
          border-radius: 2px;
        }

        /* ── GRID ── */
        .sp-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 14px;
        }

        /* ── CARD ── */
        .sp-card {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          padding: 18px 20px;
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,0.06);
          background: rgba(255,255,255,0.03);
          text-decoration: none;
          color: inherit;
          transition: transform 0.2s ease, border-color 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;
          position: relative;
          overflow: hidden;
        }
        .sp-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(99,210,190,0.07) 0%, transparent 60%);
          opacity: 0;
          transition: opacity 0.25s ease;
          pointer-events: none;
        }
        .sp-card:hover {
          transform: translateY(-3px);
          border-color: rgba(99,210,190,0.35);
          background: rgba(99,210,190,0.06);
          box-shadow: 0 8px 32px rgba(0,0,0,0.35), 0 0 0 1px rgba(99,210,190,0.15);
          color: inherit;
          text-decoration: none;
        }
        .sp-card:hover::before { opacity: 1; }

        .sp-icon {
          font-size: 22px;
          min-width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(99,210,190,0.1);
          border-radius: 8px;
          border: 1px solid rgba(99,210,190,0.15);
          flex-shrink: 0;
          margin-top: 1px;
        }

        .sp-card-body { flex: 1; min-width: 0; }
        .sp-card-label {
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 14px;
          color: #f1f5f9;
          margin-bottom: 4px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .sp-card-desc {
          font-size: 11px;
          color: #475569;
          line-height: 1.5;
        }
        .sp-card-path {
          font-size: 10px;
          color: #63d2be;
          opacity: 0.6;
          margin-top: 6px;
          letter-spacing: 0.05em;
        }

        .sp-arrow {
          color: #63d2be;
          opacity: 0;
          font-size: 16px;
          transition: opacity 0.2s, transform 0.2s;
          align-self: center;
          flex-shrink: 0;
        }
        .sp-card:hover .sp-arrow {
          opacity: 1;
          transform: translateX(3px);
        }

        /* ── FOOTER ── */
        .sp-footer {
          text-align: center;
          margin-top: 56px;
          font-size: 11px;
          color: #334155;
          letter-spacing: 0.08em;
        }
        .sp-footer span { color: #63d2be; opacity: 0.6; }

        /* ── ANIMATIONS ── */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .sp-header  { animation: fadeUp 0.6s ease both; }
        .sp-card    { animation: fadeUp 0.5s ease both; }
        ${NAV_ITEMS.map((_, i) => `.sp-card:nth-child(${i + 1}) { animation-delay: ${0.05 + i * 0.035}s; }`).join("\n")}
      `}</style>

      <div className="sp-root">
        <canvas ref={canvasRef} className="sp-canvas" />

        <div className="sp-content">
          <header className="sp-header">
            <div className="sp-badge">Dev Dashboard</div>
            <h1 className="sp-title">
              Video Production
              <br />
              Tool Suite
            </h1>
            <p className="sp-subtitle">Chọn module để bắt đầu làm việc</p>
            <div className="sp-divider" />
          </header>

          <nav className="sp-grid">
            {NAV_ITEMS.map((item) => (
              <Link key={item.path} to={item.path} className="sp-card">
                <div className="sp-icon">{item.icon}</div>
                <div className="sp-card-body">
                  <div className="sp-card-label">{item.label}</div>
                  <div className="sp-card-desc">{item.desc}</div>
                  <div className="sp-card-path">{item.path}</div>
                </div>
                <span className="sp-arrow">›</span>
              </Link>
            ))}
          </nav>

          <footer className="sp-footer">
            <span>●</span>&nbsp;&nbsp;{NAV_ITEMS.length} modules available
            &nbsp;&nbsp;<span>●</span>&nbsp;&nbsp;React Router v6
          </footer>
        </div>
      </div>
    </>
  );
}
