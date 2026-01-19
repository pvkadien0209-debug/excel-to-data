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
      { threshold: 0.1 },
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
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
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
    <div>
      <h1>document getting/doc</h1>
    </div>
  );
}
