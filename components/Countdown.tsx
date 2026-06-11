"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TARGET = new Date("2026-11-25T00:00:00");

function getTimeLeft() {
  const diff = TARGET.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days:    Math.floor(diff / 86400000),
    hours:   Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

/* One countdown unit — AnimatePresence cross-fade on change */
function Unit({ value, label }: { value: number; label: string }) {
  const display = String(value).padStart(2, "0");

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="relative overflow-hidden flex items-center justify-center"
        style={{
          width: "clamp(64px,17vw,88px)",
          height: "clamp(72px,19vw,96px)",
          background: "linear-gradient(160deg, rgba(27,67,50,0.9) 0%, rgba(7,25,15,0.95) 100%)",
          border: "1px solid rgba(198,149,27,0.35)",
          borderRadius: "10px",
          boxShadow: "0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(198,149,27,0.15)",
        }}
      >
        {/* Centre divider line — pure decoration */}
        <div className="absolute left-0 right-0 pointer-events-none"
          style={{ top: "50%", height: "1px", background: "rgba(198,149,27,0.15)" }} />

        {/* Number — cross-fades when it changes */}
        <AnimatePresence mode="popLayout">
          <motion.span
            key={display}
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "clamp(30px,8.5vw,52px)",
              fontWeight: 600,
              color: "var(--gold-light)",
              letterSpacing: "-0.02em",
              lineHeight: 1,
            }}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } }}
            exit={{ opacity: 0, y: -14, transition: { duration: 0.25, ease: "easeIn" } }}
          >
            {display}
          </motion.span>
        </AnimatePresence>
      </div>

      <span style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: "clamp(9px,2.3vw,11px)",
        color: "rgba(198,149,27,0.55)",
        letterSpacing: "0.22em",
        textTransform: "uppercase",
      }}>
        {label}
      </span>
    </div>
  );
}

export default function Countdown() {
  const [time, setTime] = useState(getTimeLeft());

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      className="relative py-20 px-4 overflow-hidden"
      style={{ background: "linear-gradient(160deg, var(--emerald-deep), var(--emerald-dark))" }}
    >
      {/* Pattern bg */}
      <div className="absolute inset-0 pattern-islamic pointer-events-none" style={{ opacity: 0.35 }} />
      {/* Centre glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(27,67,50,0.6) 0%, transparent 100%)" }} />

      <div className="relative z-10 max-w-xl mx-auto">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {/* Top ornament */}
          <svg width="160" height="14" viewBox="0 0 160 14" fill="none" className="mx-auto mb-4">
            <line x1="0" y1="7" x2="64" y2="7" stroke="rgba(198,149,27,0.4)" strokeWidth="0.7" />
            <path d="M64 7 Q72 2 80 7 Q88 12 96 7" stroke="rgba(198,149,27,0.55)" strokeWidth="0.9" fill="none" />
            <line x1="96" y1="7" x2="160" y2="7" stroke="rgba(198,149,27,0.4)" strokeWidth="0.7" />
            <circle cx="80" cy="7" r="2" fill="rgba(198,149,27,0.6)" />
          </svg>

          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(22px,5.5vw,34px)",
            fontWeight: 500,
            color: "var(--cream)",
            letterSpacing: "0.06em",
            fontStyle: "italic",
          }}>
            Counting Down to Forever
          </h2>
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(12px,3vw,15px)",
            color: "rgba(198,149,27,0.6)",
            marginTop: "6px",
            letterSpacing: "0.12em",
          }}>
            25 November 2026 &nbsp;·&nbsp; 20 Jamadal Ukhra 1448
          </p>
        </motion.div>

        <motion.div
          className="flex justify-center items-end gap-3 flex-wrap"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          <Unit value={time.days}    label="Days" />
          <span style={{ color: "rgba(198,149,27,0.5)", fontSize: "clamp(22px,5vw,36px)", paddingBottom: "24px", fontFamily: "serif" }}>:</span>
          <Unit value={time.hours}   label="Hours" />
          <span style={{ color: "rgba(198,149,27,0.5)", fontSize: "clamp(22px,5vw,36px)", paddingBottom: "24px", fontFamily: "serif" }}>:</span>
          <Unit value={time.minutes} label="Minutes" />
          <span style={{ color: "rgba(198,149,27,0.5)", fontSize: "clamp(22px,5vw,36px)", paddingBottom: "24px", fontFamily: "serif" }}>:</span>
          <Unit value={time.seconds} label="Seconds" />
        </motion.div>
      </div>
    </section>
  );
}
