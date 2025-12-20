import { useState, useEffect, useRef } from "react";

export default function WeddingPages() {
  const [scrollY, setScrollY] = useState(0);
  const [daysUntil, setDaysUntil] = useState(0);
  const [hoursUntil, setHoursUntil] = useState(0);
  const [minutesUntil, setMinutesUntil] = useState(0);
  const observerRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    // Scroll effect
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    // Intersection Observer for fade-in animations
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll(".fade-in-up");
    elements.forEach((el) => observerRef.current.observe(el));

    // Countdown timer
    const weddingDate = new Date("2025-12-28T11:00:00");
    const updateCountdown = () => {
      const now = new Date();
      const difference = weddingDate - now;
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      setDaysUntil(days);
      setHoursUntil(hours);
      setMinutesUntil(minutes);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 60000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600;700&family=Playfair+Display:wght@400;600;700&family=Great+Vibes&display=swap');
          
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            font-family: 'Cormorant Garamond', serif;
            overflow-x: hidden;
            background: #ffe6f0;
          }
          
          .wedding-container {
            position: relative;
            min-height: 100vh;
            background: linear-gradient(135deg, #ffeef8 0%, #ffe0f0 25%, #ffd6e8 50%, #ffc0e0 75%, #ffb3d9 100%);
          }
          
          /* Floating Flowers Background */
          .floating-flowers {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
            overflow: hidden;
          }
          
          .flower {
            position: absolute;
            font-size: 24px;
            opacity: 0.6;
            animation: float linear infinite;
          }
          
          @keyframes float {
            0% {
              transform: translateY(-100px) rotate(0deg);
              opacity: 0;
            }
            10% {
              opacity: 0.6;
            }
            90% {
              opacity: 0.6;
            }
            100% {
              transform: translateY(100vh) rotate(360deg);
              opacity: 0;
            }
          }
          
          .flower:nth-child(1) { left: 10%; animation-duration: 15s; animation-delay: 0s; }
          .flower:nth-child(2) { left: 25%; animation-duration: 18s; animation-delay: 2s; font-size: 20px; }
          .flower:nth-child(3) { left: 40%; animation-duration: 20s; animation-delay: 4s; }
          .flower:nth-child(4) { left: 55%; animation-duration: 16s; animation-delay: 1s; font-size: 28px; }
          .flower:nth-child(5) { left: 70%; animation-duration: 22s; animation-delay: 3s; }
          .flower:nth-child(6) { left: 85%; animation-duration: 19s; animation-delay: 5s; font-size: 22px; }
          .flower:nth-child(7) { left: 15%; animation-duration: 17s; animation-delay: 6s; }
          .flower:nth-child(8) { left: 60%; animation-duration: 21s; animation-delay: 7s; font-size: 26px; }
          
          /* Stars/Hearts Background */
          .stars {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 0;
          }
          
          .star {
            position: absolute;
            width: 3px;
            height: 3px;
            background: rgba(255, 105, 180, 0.6);
            border-radius: 50%;
            animation: twinkle 3s infinite;
            box-shadow: 0 0 10px rgba(255, 105, 180, 0.8);
          }
          
          @keyframes twinkle {
            0%, 100% { opacity: 0.3; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.3); }
          }
          
          /* Hero Section with Key Info */
          .hero-section {
            position: relative;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 20px;
            z-index: 2;
            background: radial-gradient(ellipse at top, rgba(255, 182, 193, 0.3) 0%, transparent 70%);
          }
          
          .logo-image {
            width: 120px;
            height: 120px;
            object-fit: cover;
            border-radius: 50%;
            border: 4px solid rgba(255, 20, 147, 0.5);
            margin-bottom: 20px;
            box-shadow: 0 10px 40px rgba(255, 105, 180, 0.5), 0 0 60px rgba(255, 192, 203, 0.3);
            animation: logoFloat 3s ease-in-out infinite;
          }
          
          @keyframes logoFloat {
            0%, 100% { transform: translateY(0) scale(1); }
            50% { transform: translateY(-10px) scale(1.05); }
          }
          
          .invite-badge {
            font-family: 'Playfair Display', serif;
            font-size: 14px;
            letter-spacing: 4px;
            color: #d4145a;
            text-transform: uppercase;
            margin-bottom: 15px;
            animation: fadeInDown 1s ease-out;
          }
          
          @keyframes fadeInDown {
            from {
              opacity: 0;
              transform: translateY(-30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          .couple-names {
            font-family: 'Great Vibes', cursive;
            font-size: 52px;
            color: #c91f5c;
            margin: 20px 0;
            text-align: center;
            text-shadow: 2px 2px 4px rgba(255, 105, 180, 0.3), 0 0 30px rgba(255, 192, 203, 0.5);
            animation: fadeInUp 1s ease-out 0.3s both;
          }
          
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          .event-title {
            font-family: 'Playfair Display', serif;
            font-size: 24px;
            color: #e91e63;
            margin-bottom: 30px;
            letter-spacing: 3px;
            animation: fadeInUp 1s ease-out 0.5s both;
          }
          
          /* Important Info Card with Enhanced Effects */
          .key-info-card {
            background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 240, 245, 0.95) 100%);
            backdrop-filter: blur(20px);
            border: 4px solid transparent;
            background-clip: padding-box;
            border-radius: 25px;
            padding: 40px;
            margin: 30px 0;
            max-width: 600px;
            width: 100%;
            box-shadow: 
              0 20px 60px rgba(255, 20, 147, 0.4),
              0 10px 30px rgba(255, 105, 180, 0.3),
              inset 0 1px 0 rgba(255, 255, 255, 0.8);
            position: relative;
            animation: cardEntrance 1s ease-out 0.7s both, cardFloat 4s ease-in-out infinite 2s;
          }
          
          .key-info-card::before {
            content: '';
            position: absolute;
            top: -4px;
            left: -4px;
            right: -4px;
            bottom: -4px;
            background: linear-gradient(45deg, #ff1493, #ff69b4, #ff1493, #ff69b4);
            border-radius: 25px;
            z-index: -1;
            animation: borderRotate 3s linear infinite;
            background-size: 300% 300%;
          }
          
          @keyframes borderRotate {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          
          @keyframes cardEntrance {
            from {
              opacity: 0;
              transform: scale(0.8) translateY(50px);
            }
            to {
              opacity: 1;
              transform: scale(1) translateY(0);
            }
          }
          
          @keyframes cardFloat {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-8px); }
          }
          
          .info-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
          }
          
          .info-section {
            text-align: center;
            padding: 25px 20px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 15px;
            border: 2px solid rgba(255, 105, 180, 0.2);
            transition: all 0.3s ease;
            animation: slideInUp 0.8s ease-out both;
          }
          
          .info-section:nth-child(1) { animation-delay: 0.9s; }
          .info-section:nth-child(2) { animation-delay: 1.1s; }
          
          @keyframes slideInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          .info-section:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 30px rgba(255, 20, 147, 0.25);
            border-color: rgba(255, 105, 180, 0.4);
          }
          
          .info-label {
            font-size: 12px;
            color: #d4145a;
            text-transform: uppercase;
            letter-spacing: 3px;
            margin-bottom: 12px;
            font-weight: 600;
            opacity: 0.8;
          }
          
          .info-main {
            font-size: 32px;
            color: #c91f5c;
            font-weight: 700;
            margin-bottom: 8px;
            font-family: 'Playfair Display', serif;
            text-shadow: 1px 1px 2px rgba(255, 105, 180, 0.2);
            line-height: 1.2;
          }
          
          .info-detail {
            font-size: 16px;
            color: #9c0f47;
            margin-top: 8px;
            line-height: 1.6;
          }
          
          .info-divider {
            height: 2px;
            background: linear-gradient(90deg, transparent, #ff69b4, transparent);
            margin: 8px 0;
            opacity: 0.5;
          }
          
          .scroll-indicator {
            margin-top: 40px;
            animation: bounce 2s infinite;
            cursor: pointer;
            filter: drop-shadow(0 4px 8px rgba(255, 105, 180, 0.4));
          }
          
          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(15px); }
          }
          
          /* Content Sections */
          .content-section {
            position: relative;
            z-index: 2;
            padding: 80px 20px;
            max-width: 1200px;
            margin: 0 auto;
          }
          
          .section-title {
            font-family: 'Playfair Display', serif;
            font-size: 42px;
            text-align: center;
            color: #c91f5c;
            margin-bottom: 15px;
            text-shadow: 2px 2px 4px rgba(255, 182, 193, 0.3);
          }
          
          .section-subtitle {
            text-align: center;
            color: #e91e63;
            font-size: 18px;
            margin-bottom: 50px;
          }
          
          /* Story Cards */
          .story-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 30px;
            margin-top: 40px;
          }
          
          .story-card {
            background: rgba(255, 255, 255, 0.9);
            backdrop-filter: blur(10px);
            border-radius: 20px;
            padding: 30px;
            text-align: center;
            border: 2px solid rgba(255, 105, 180, 0.3);
            box-shadow: 0 10px 30px rgba(255, 20, 147, 0.2);
            transition: transform 0.3s, box-shadow 0.3s;
          }
          
          .story-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 20px 40px rgba(255, 105, 180, 0.3);
          }
          
          .story-icon {
            font-size: 48px;
            margin-bottom: 20px;
          }
          
          .story-title {
            font-size: 24px;
            color: #d4145a;
            margin-bottom: 15px;
            font-family: 'Playfair Display', serif;
          }
          
          .story-text {
            color: #9c0f47;
            font-size: 16px;
            line-height: 1.8;
          }
          
          /* Gallery */
          .gallery-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin-top: 40px;
          }
          
          .gallery-item {
            position: relative;
            overflow: hidden;
            border-radius: 15px;
            aspect-ratio: 1;
            cursor: pointer;
            box-shadow: 0 10px 30px rgba(255, 20, 147, 0.3);
            transition: transform 0.3s;
          }
          
          .gallery-item:hover {
            transform: scale(1.05);
          }
          
          .gallery-item img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.5s;
          }
          
          .gallery-item:hover img {
            transform: scale(1.1);
          }
          
          /* Video Section */
          .video-container {
            position: relative;
            max-width: 800px;
            margin: 40px auto;
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 20px 60px rgba(255, 20, 147, 0.4);
            border: 3px solid rgba(255, 105, 180, 0.5);
          }
          
          .video-container video {
            width: 100%;
            display: block;
          }
          
          /* Dress Code */
          .dress-code-card {
            background: rgba(255, 255, 255, 0.9);
            backdrop-filter: blur(10px);
            border-radius: 20px;
            padding: 40px;
            text-align: center;
            border: 2px solid rgba(255, 105, 180, 0.4);
            box-shadow: 0 15px 40px rgba(255, 20, 147, 0.3);
            max-width: 600px;
            margin: 0 auto;
          }
          
          .dress-icon {
            font-size: 64px;
            margin-bottom: 20px;
          }
          
          .dress-title {
            font-family: 'Playfair Display', serif;
            font-size: 32px;
            color: #d4145a;
            margin-bottom: 30px;
          }
          
          .color-swatches {
            display: flex;
            justify-content: center;
            gap: 20px;
            margin: 30px 0;
            flex-wrap: wrap;
          }
          
          .color-swatch {
            text-align: center;
          }
          
          .color-circle {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            margin: 0 auto 10px;
            border: 3px solid rgba(255, 255, 255, 0.8);
            box-shadow: 0 5px 20px rgba(255, 20, 147, 0.3);
          }
          
          .color-label {
            color: #c91f5c;
            font-size: 16px;
            font-weight: 600;
          }
          
          .dress-note {
            color: #9c0f47;
            font-size: 18px;
            line-height: 1.8;
            margin-top: 20px;
          }
          
          /* Countdown */
          .countdown-card {
            background: linear-gradient(135deg, rgba(255, 105, 180, 0.3), rgba(255, 20, 147, 0.3));
            backdrop-filter: blur(10px);
            border-radius: 20px;
            padding: 40px;
            text-align: center;
            border: 2px solid rgba(255, 105, 180, 0.5);
            box-shadow: 0 15px 40px rgba(255, 20, 147, 0.3);
            max-width: 500px;
            margin: 0 auto;
          }
          
          .countdown-title {
            font-family: 'Playfair Display', serif;
            font-size: 28px;
            color: #d4145a;
            margin-bottom: 30px;
          }
          
          .countdown-display {
            display: flex;
            justify-content: center;
            gap: 20px;
            margin: 30px 0;
            flex-wrap: wrap;
          }
          
          .countdown-unit {
            background: rgba(255, 255, 255, 0.9);
            border-radius: 15px;
            padding: 20px;
            min-width: 80px;
            box-shadow: 0 5px 15px rgba(255, 20, 147, 0.2);
          }
          
          .countdown-number {
            font-size: 48px;
            font-weight: 700;
            color: #c91f5c;
            text-shadow: 2px 2px 4px rgba(255, 182, 193, 0.3);
          }
          
          .countdown-label {
            font-size: 14px;
            color: #e91e63;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-top: 5px;
          }
          
          .countdown-message {
            color: #9c0f47;
            font-size: 18px;
            margin: 20px 0;
            line-height: 1.8;
          }
          
          .rsvp-button {
            background: linear-gradient(135deg, #ff1493, #ff69b4);
            color: white;
            border: none;
            padding: 18px 50px;
            font-size: 18px;
            border-radius: 50px;
            cursor: pointer;
            font-family: 'Playfair Display', serif;
            letter-spacing: 2px;
            text-transform: uppercase;
            box-shadow: 0 10px 30px rgba(255, 20, 147, 0.4);
            transition: all 0.3s;
            margin-top: 20px;
          }
          
          .rsvp-button:hover {
            transform: translateY(-3px);
            box-shadow: 0 15px 40px rgba(255, 20, 147, 0.6);
          }
          
          /* Footer */
          .footer {
            text-align: center;
            padding: 40px 20px;
            background: rgba(255, 192, 203, 0.3);
            color: #c91f5c;
          }
          
          .footer-heart {
            font-size: 32px;
            margin-bottom: 15px;
          }
          
          .footer-names {
            font-family: 'Great Vibes', cursive;
            font-size: 32px;
            margin-bottom: 10px;
          }
          
          .footer-date {
            font-size: 16px;
            color: #e91e63;
          }
          
          /* Fade in animation */
          .fade-in-up {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s, transform 0.8s;
          }
          
          .fade-in-up.visible {
            opacity: 1;
            transform: translateY(0);
          }
          
          /* Map container */
          .map-container {
            background: rgba(255, 255, 255, 0.9);
            backdrop-filter: blur(10px);
            border-radius: 20px;
            padding: 30px;
            margin-top: 40px;
            border: 2px solid rgba(255, 105, 180, 0.3);
            box-shadow: 0 10px 30px rgba(255, 20, 147, 0.2);
          }
          
          .map-embed {
            width: 100%;
            height: 400px;
            border-radius: 15px;
            border: none;
          }
          
          .venue-info {
            margin-top: 20px;
            text-align: center;
          }
          
          .venue-name {
            font-size: 24px;
            color: #d4145a;
            margin-bottom: 10px;
            font-weight: 600;
          }
          
          .venue-address {
            color: #9c0f47;
            font-size: 16px;
            line-height: 1.6;
            margin-bottom: 20px;
          }
          
          .directions-button {
            background: linear-gradient(135deg, #ff1493, #ff69b4);
            color: white;
            border: none;
            padding: 12px 30px;
            border-radius: 25px;
            font-size: 16px;
            cursor: pointer;
            transition: all 0.3s;
            text-decoration: none;
            display: inline-block;
            box-shadow: 0 5px 15px rgba(255, 20, 147, 0.3);
          }
          
          .directions-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 25px rgba(255, 20, 147, 0.4);
          }
          
          /* Mobile Responsive */
          @media (max-width: 768px) {
            .couple-names {
              font-size: 36px;
            }
            
            .event-title {
              font-size: 20px;
            }
            
            .section-title {
              font-size: 32px;
            }
            
            .key-info-card {
              padding: 30px 20px;
            }
            
            .info-grid {
              grid-template-columns: 1fr;
              gap: 15px;
            }
            
            .info-section {
              padding: 20px 15px;
            }
            
            .info-main {
              font-size: 26px;
            }
            
            .info-detail {
              font-size: 14px;
            }
            
            .logo-image {
              width: 100px;
              height: 100px;
            }
            
            .countdown-display {
              gap: 10px;
            }
            
            .countdown-unit {
              min-width: 70px;
              padding: 15px;
            }
            
            .countdown-number {
              font-size: 36px;
            }
          }
        `}
      </style>

      <div className="wedding-container">
        {/* Floating Flowers */}
        <div className="floating-flowers">
          <div className="flower">🌸</div>
          <div className="flower">🌺</div>
          <div className="flower">🌹</div>
          <div className="flower">🌷</div>
          <div className="flower">🌼</div>
          <div className="flower">💐</div>
          <div className="flower">🌸</div>
          <div className="flower">🌺</div>
        </div>

        {/* Stars Background */}
        <div className="stars">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="star"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
              }}
            />
          ))}
        </div>

        {/* Hero Section with Key Information */}
        <div className="hero-section">
          <img src="/logo192.png" alt="Wedding Logo" className="logo-image" />

          <div className="invite-badge">Trân Trọng Kính Mời</div>

          <div className="couple-names">Văn Điện & Mỹ Oanh</div>

          <div className="event-title">Tiệc Báo Hỷ</div>

          {/* Key Information Card - Modern Minimal */}
          <div className="key-info-card">
            <div className="info-grid">
              <div className="info-section">
                <div className="info-label">Thời Gian</div>
                <div className="info-main">11:00</div>
                <div className="info-divider"></div>
                <div className="info-detail">Chủ Nhật, 28 Tháng 12, 2025</div>
              </div>

              <div className="info-section">
                <div className="info-label">Địa Điểm</div>
                <div className="info-main">THE ADORA LUXURY</div>
                <div className="info-divider"></div>
                <div className="info-detail">
                  198 Hoàng Văn Thụ, Phường 9<br />
                  Phú Nhuận, TP. Hồ Chí Minh
                </div>
              </div>
            </div>
          </div>

          <div
            className="scroll-indicator"
            onClick={() =>
              window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
            }
          >
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#d4145a"
              strokeWidth="2"
            >
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Story Section */}
        <div className="content-section fade-in-up">
          <h2 className="section-title">Câu Chuyện Tình Yêu</h2>
          <p className="section-subtitle">Hành trình của chúng mình</p>

          <div className="story-grid">
            <div className="story-card">
              <div className="story-icon">💑</div>
              <h3 className="story-title">Gặp Gỡ Định Mệnh</h3>
              <p className="story-text">
                Câu chuyện tình yêu của chúng mình bắt đầu như một phép màu. Từ
                những buổi gặp gỡ đầu tiên đến những khoảnh khắc ngọt ngào, mọi
                thứ đều như được an bài sẵn bởi số phận.
              </p>
            </div>

            <div className="story-card">
              <div className="story-icon">💝</div>
              <h3 className="story-title">Lời Hứa Trọn Đời</h3>
              <p className="story-text">
                Sau những ngày tháng yêu thương và thấu hiểu, chúng mình đã
                quyết định bước vào hôn nhân - nơi mà tình yêu được vun đắp mỗi
                ngày, và hạnh phúc được chia sẻ trọn vẹn.
              </p>
            </div>
          </div>
        </div>

        {/* Gallery Section */}
        <div className="content-section fade-in-up">
          <h2 className="section-title">Khoảnh Khắc Của Chúng Mình</h2>
          <p className="section-subtitle">Những hình ảnh đáng nhớ</p>

          <div className="gallery-grid">
            <div className="gallery-item">
              <img src="/data/DZ4I6850.jpg" alt="Wedding Photo 1" />
            </div>
            <div className="gallery-item">
              <img src="/data/DZ4I6871.jpg" alt="Wedding Photo 2" />
            </div>
            <div className="gallery-item">
              <img src="/data/DZ4I7437.jpg" alt="Wedding Photo 3" />
            </div>
            <div className="gallery-item">
              <img src="/data/DZ4I7068.jpg" alt="Wedding Photo 4" />
            </div>{" "}
            <div className="gallery-item">
              <img src="/data/DZ4I7592.jpg" alt="Wedding Photo 5" />
            </div>
          </div>

          {/* Video Section - No Poster */}
          {/* <div className="video-container">
            <video ref={videoRef} controls>
              <source src="/data/project_outro.mp4" type="video/mp4" />
              Trình duyệt của bạn không hỗ trợ video.
            </video>
          </div> */}
        </div>

        {/* Dress Code Section */}
        <div className="content-section fade-in-up">
          <div className="dress-code-card">
            <div className="dress-icon">👔</div>
            <h3 className="dress-title">Dress Code</h3>

            <div className="color-swatches">
              <div className="color-swatch">
                <div
                  className="color-circle"
                  style={{ background: "#000000" }}
                ></div>
                <div className="color-label">Đen</div>
              </div>
              <div className="color-swatch">
                <div
                  className="color-circle"
                  style={{ background: "#1e3a8a" }}
                ></div>
                <div className="color-label">Xanh Biển</div>
              </div>
              <div className="color-swatch">
                <div
                  className="color-circle"
                  style={{ background: "#f5deb3" }}
                ></div>
                <div className="color-label">Nude</div>
              </div>
              <div className="color-swatch">
                <div
                  className="color-circle"
                  style={{ background: "#ffb6c1" }}
                ></div>
                <div className="color-label">Hồng</div>
              </div>
            </div>

            <p className="dress-note">
              Chúng mình rất vinh dự được đón tiếp quý khách trong trang phục
              tông màu <strong>Đen - Xanh Biển - Nude - Hồng</strong>
            </p>
          </div>
        </div>

        {/* Venue & Map Section */}
        <div className="content-section fade-in-up">
          <h2 className="section-title">Địa Điểm Tổ Chức</h2>

          <div className="map-container">
            <iframe
              className="map-embed"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.1272448850994!2d106.67754931533405!3d10.802050761671836!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317528d4a7c59c03%3A0x8e3a6e2c4d4d4d4d!2zMTk4IMSQLiBIb8OgbmcgVsSDbiBUaOG7pSwgUGjGsOG7nW5nIDksIFBow7ogTmh14bqtbiwgVGjDoG5oIHBo4buRIEjhu5MgQ2jDrSBNaW5oLCBWaWV0bmFt!5e0!3m2!1sen!2s!4v1234567890123!5m2!1sen!2s"
              loading="lazy"
            ></iframe>

            <div className="venue-info">
              <h3 className="venue-name">
                Trung Tâm Hội Nghị & Tiệc Cưới THE ADORA LUXURY
              </h3>
              <p className="venue-address">
                198 Đ. Hoàng Văn Thụ, Phường 9, Phú Nhuận
                <br />
                Thành phố Hồ Chí Minh, Việt Nam
              </p>
              <a
                href="https://maps.google.com/?q=198+Hoang+Van+Thu+Phu+Nhuan+Ho+Chi+Minh"
                target="_blank"
                rel="noopener noreferrer"
                className="directions-button"
              >
                🗺️ Chỉ Đường
              </a>
            </div>
          </div>
        </div>

        {/* Countdown & RSVP Section */}
        <div className="content-section fade-in-up">
          <div className="countdown-card">
            <h3 className="countdown-title">⏳ Đếm Ngược</h3>

            {daysUntil > 0 ? (
              <>
                <div className="countdown-display">
                  <div className="countdown-unit">
                    <div className="countdown-number">{daysUntil}</div>
                    <div className="countdown-label">Ngày</div>
                  </div>
                  <div className="countdown-unit">
                    <div className="countdown-number">{hoursUntil}</div>
                    <div className="countdown-label">Giờ</div>
                  </div>
                  <div className="countdown-unit">
                    <div className="countdown-number">{minutesUntil}</div>
                    <div className="countdown-label">Phút</div>
                  </div>
                </div>
                <p className="countdown-message">
                  Đến Ngày Vui Của Chúng Mình!
                </p>
              </>
            ) : (
              <div className="countdown-number" style={{ fontSize: "72px" }}>
                🎉
              </div>
            )}

            <p className="countdown-message">
              Sự hiện diện của quý khách là niềm vinh hạnh cho gia đình chúng
              tôi. Rất mong được đón tiếp!
            </p>

            <button
              className="rsvp-button"
              onClick={() =>
                alert(
                  "Cảm ơn bạn đã xác nhận tham dự! 💕\n\nChúng mình rất mong được gặp bạn tại tiệc cưới!"
                )
              }
            >
              ✉️ Xác Nhận Tham Dự
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="footer">
          <div className="footer-heart">❤️</div>
          <div className="footer-names">Văn Điện & Mỹ Oanh</div>
          <div className="footer-date">28.12.2025 • Hẹn Gặp Lại!</div>
        </div>
      </div>
    </>
  );
}
