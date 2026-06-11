"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props { onRevealed: () => void; }

export default function ScratchReveal({ onRevealed }: Props) {
  const [tapped, setTapped] = useState(false);

  const handleTap = () => {
    if (tapped) return;
    setTapped(true);
    try {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const confetti = require("canvas-confetti").default;
      confetti({ particleCount: 180, spread: 100, origin: { y: 0.55 }, colors: ["#C6951B", "#FFE08A", "#5D7B3A", "#E7D7C9", "#fff"] });
      setTimeout(() => confetti({ particleCount: 80, spread: 60, origin: { y: 0.5, x: 0.2 }, colors: ["#C6951B", "#FFE08A"] }), 300);
      setTimeout(() => confetti({ particleCount: 80, spread: 60, origin: { y: 0.5, x: 0.8 }, colors: ["#5D7B3A", "#E7D7C9"] }), 500);
    } catch {}
    setTimeout(onRevealed, 2200);
  };

  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-center justify-center z-40 overflow-hidden"
      style={{ background: "linear-gradient(135deg, #EDE9E3 0%, #E7D7C9 100%)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.6 } }}
    >
      {/* Decorative spinning rings */}
      {[...Array(5)].map((_, i) => (
        <motion.div key={i} className="absolute rounded-full pointer-events-none"
          style={{
            width: `${70 + i * 35}px`, height: `${70 + i * 35}px`,
            border: "1px solid rgba(198,149,27,0.18)",
            left: `${i % 2 === 0 ? 5 + i * 12 : 55 - i * 8}%`,
            top: `${8 + i * 14}%`,
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 22 + i * 5, repeat: Infinity, ease: "linear" }}
        />
      ))}

      {/* Click button */}
      <AnimatePresence mode="wait">
        {!tapped ? (
          <motion.div
            key="tap-box"
            className="flex flex-col items-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.35 } }}
            transition={{ duration: 0.55, ease: [0.34, 1.56, 0.64, 1] }}
          >
            {/* Floating finger */}
            <motion.div
              style={{ fontSize: "clamp(40px,11vw,54px)", lineHeight: 1, userSelect: "none" }}
              animate={{ y: [0, -12, 0], rotate: [-10, 10, -10] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            >
              👆
            </motion.div>

            {/* Button */}
            <motion.button
              onClick={handleTap}
              className="relative cursor-pointer select-none"
              style={{
                fontFamily: "var(--serif-en, Georgia, serif)",
                fontSize: "clamp(16px, 4.5vw, 22px)",
                fontWeight: 700,
                color: "#3d2804",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                background: "linear-gradient(135deg, #C6951B 0%, #e8b84b 40%, #FFE08A 60%, #C6951B 100%)",
                border: "none",
                borderRadius: "8px",
                padding: "18px 40px",
                cursor: "pointer",
                boxShadow: "0 8px 32px rgba(198,149,27,0.4), 0 2px 8px rgba(0,0,0,0.15)",
              }}
              animate={{
                boxShadow: [
                  "0 8px 32px rgba(198,149,27,0.3), 0 2px 8px rgba(0,0,0,0.15)",
                  "0 8px 48px rgba(198,149,27,0.6), 0 2px 8px rgba(0,0,0,0.15)",
                  "0 8px 32px rgba(198,149,27,0.3), 0 2px 8px rgba(0,0,0,0.15)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              whileTap={{ scale: 0.96 }}
              whileHover={{ scale: 1.03 }}
            >
              Click here to reveal date ✨
            </motion.button>
          </motion.div>
        ) : (
          /* Date reveal */
          <motion.div
            key="date-reveal"
            className="flex flex-col items-center justify-center rounded-2xl"
            style={{
              width: "min(340px, calc(100vw - 48px))",
              height: "190px",
              background: "linear-gradient(135deg, #3B0A0A, #6B1A1A)",
              border: "2.5px solid rgba(198,149,27,0.6)",
              boxShadow: "0 20px 60px rgba(198,149,27,0.3)",
            }}
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
          >
            <motion.p
              style={{ color: "#C6951B", fontFamily: "serif", fontSize: "clamp(11px, 3vw, 14px)", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "8px" }}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
            >
              Save the Date
            </motion.p>
            <motion.p
              className="shimmer-text"
              style={{ fontFamily: "AlKanz, KanzAlMarjaan, serif", fontSize: "clamp(26px, 8vw, 46px)", fontWeight: "bold", lineHeight: 1.1 }}
              initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.25, ease: [0.34, 1.56, 0.64, 1] }}
            >
              25 November
            </motion.p>
            <motion.p
              className="shimmer-text"
              style={{ fontFamily: "AlKanz, KanzAlMarjaan, serif", fontSize: "clamp(22px, 6vw, 38px)", fontWeight: "bold" }}
              initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.35, ease: [0.34, 1.56, 0.64, 1] }}
            >
              2026
            </motion.p>
            <motion.p
              style={{ color: "#E7D7C9", fontFamily: "serif", fontSize: "clamp(10px, 2.5vw, 13px)", marginTop: "6px", letterSpacing: "0.15em" }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            >
              ❋ Mohammad &amp; Zahra ❋
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
