"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Props { onContinue: () => void; }

const lines = [
  "Hifz ka noor hai yaha",
  "aur shifa ki barakat bhi hai,",
  "Ek taraf hidayat",
  "aur doosri taraf rehmat bhi hai...",
  "Sajege jab ilm aur shifa",
  "jodi bankar sath sath,",
  "Aasman ke qareeb hogi",
  "jo bhi dua mangege uthakar hath...",
];

/* ── Geometric star — drawn as pure SVG ── */
function GeomStar({ size = 60, opacity = 0.12 }: { size?: number; opacity?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" fill="none" style={{ opacity }}>
      <polygon points="30,4 34,22 52,16 40,30 52,44 34,38 30,56 26,38 8,44 20,30 8,16 26,22"
        stroke="rgba(198,149,27,1)" strokeWidth="0.8" fill="none" />
      <polygon points="30,10 33,22 46,18 38,28 46,38 33,34 30,46 27,34 14,38 22,28 14,18 27,22"
        stroke="rgba(198,149,27,0.5)" strokeWidth="0.4" fill="none" />
    </svg>
  );
}

export default function ProseSection({ onContinue }: Props) {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowButton(true), lines.length * 650 + 1200);
    return () => clearTimeout(t);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-40 flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "var(--emerald-deep)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8 } }}
    >
      {/* Layered luxury background */}
      <div className="absolute inset-0 pattern-islamic pointer-events-none" style={{ opacity: 0.5 }} />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 70% at 50% 50%, rgba(19,61,34,0.75) 0%, transparent 100%)" }} />
      {/* Warm centre glow */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 pointer-events-none rounded-full"
        style={{ background: "radial-gradient(circle, rgba(198,149,27,0.07) 0%, transparent 70%)" }} />

      {/* Scattered geometric stars background */}
      {[
        { x: "8%",  y: "12%", s: 50, o: 0.10 },
        { x: "85%", y: "8%",  s: 40, o: 0.08 },
        { x: "5%",  y: "75%", s: 55, o: 0.09 },
        { x: "88%", y: "80%", s: 44, o: 0.08 },
        { x: "50%", y: "5%",  s: 36, o: 0.07 },
        { x: "50%", y: "92%", s: 36, o: 0.07 },
      ].map((p, i) => (
        <div key={i} className="absolute pointer-events-none" style={{ left: p.x, top: p.y }}>
          <GeomStar size={p.s} opacity={p.o} />
        </div>
      ))}

      {/* Frame lines */}
      <div className="absolute inset-5 pointer-events-none rounded-xl"
        style={{ border: "1px solid rgba(198,149,27,0.1)" }} />

      {/* ── Content ── */}
      <div className="relative z-10 w-full max-w-xl px-6 flex flex-col items-center">

        {/* Ornamental top line */}
        <motion.div
          className="flex items-center gap-4 mb-10"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.2, duration: 0.9 }}
        >
          <div className="h-px flex-1" style={{ background: "linear-gradient(to right, transparent, rgba(198,149,27,0.5))" }} />
          <GeomStar size={28} opacity={0.6} />
          <div className="h-px flex-1" style={{ background: "linear-gradient(to left, transparent, rgba(198,149,27,0.5))" }} />
        </motion.div>

        {/* Prose — 2 lines per stanza, balanced */}
        <div className="text-center space-y-0 mb-3">
          {[0, 2, 4, 6].map((startIdx, stanzaIdx) => (
            <motion.div
              key={stanzaIdx}
              className="mb-5"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + stanzaIdx * 0.9, duration: 0.8, ease: "easeOut" }}
            >
              <p style={{
                fontFamily: "var(--serif-en)",
                fontStyle: "italic",
                fontWeight: 300,
                fontSize: "clamp(30px,8.5vw,46px)",
                color: stanzaIdx % 2 === 0 ? "var(--cream)" : "var(--gold-light)",
                lineHeight: 1.65,
                letterSpacing: "0.01em",
              }}>
                {lines[startIdx]}{" "}
                <span style={{ opacity: 0.85 }}>{lines[startIdx + 1]}</span>
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bismillah — positioned lower, NOT at top */}
        <motion.div
          className="mt-2 mb-8 text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: lines.length * 0.45 + 0.5, duration: 0.9 }}
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px flex-1" style={{ background: "linear-gradient(to right, transparent, rgba(198,149,27,0.4))" }} />
            <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: "var(--gold)" }} />
            <div className="h-px flex-1" style={{ background: "linear-gradient(to left, transparent, rgba(198,149,27,0.4))" }} />
          </div>
          <p style={{
            fontFamily: "var(--serif-ar)",
            fontSize: "clamp(16px,4.5vw,22px)",
            color: "rgba(232,197,71,0.75)",
            letterSpacing: "0.05em",
          }}>
            بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
          </p>
        </motion.div>

        {/* Continue */}
        <motion.button
          onClick={onContinue}
          className="px-9 py-3 rounded-full"
          style={{
            background: "transparent",
            border: "1px solid rgba(198,149,27,0.55)",
            color: "var(--gold-light)",
            fontFamily: "var(--serif-en)",
            fontSize: "clamp(11px,3vw,13px)",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            fontWeight: 400,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: showButton ? 1 : 0 }}
          transition={{ duration: 0.7 }}
          whileHover={{ background: "rgba(198,149,27,0.1)", borderColor: "rgba(198,149,27,0.8)" }}
          whileTap={{ scale: 0.97 }}
        >
          Continue
        </motion.button>
      </div>
    </motion.div>
  );
}
