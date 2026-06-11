"use client";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Props { onEnter: () => void; }

export default function GateSection({ onEnter }: Props) {
  const [opening, setOpening] = useState(false);

  // Auto-open: short pause for the gate to settle, then swing open
  useEffect(() => {
    const startOpen = setTimeout(() => setOpening(true), 500);
    const callEnter = setTimeout(onEnter, 500 + 1500);
    return () => { clearTimeout(startOpen); clearTimeout(callEnter); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-40 overflow-hidden"
      style={{ background: "#000" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.5 } }}
      exit={{ opacity: 0, transition: { duration: 0.7 } }}
    >
      {/* Ambient gold centre glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 55% 55% at 50% 50%, rgba(27,67,50,0.45) 0%, transparent 70%)" }}
        animate={opening ? { opacity: 0 } : { opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      {/* ── LEFT gate panel ── */}
      <motion.div
        className="absolute inset-y-0 left-0 overflow-hidden"
        style={{ width: "50%", transformOrigin: "0% 50%" }}
        animate={opening
          ? { rotateY: -105, opacity: 0, transition: { duration: 1.4, ease: [0.4, 0, 0.2, 1] } }
          : { rotateY: 0, opacity: 1 }}
      >
        {/* Full image, left half visible */}
        <div className="absolute inset-y-0 left-0" style={{ width: "100vw" }}>
          <Image src="/images/gate.png" alt="Gate" fill className="object-cover object-center" priority />
        </div>
        {/* Right edge shadow */}
        <div className="absolute inset-y-0 right-0 pointer-events-none"
          style={{ width: "24px", background: "linear-gradient(to right, transparent, rgba(0,0,0,0.25))" }} />
      </motion.div>

      {/* ── RIGHT gate panel ── */}
      <motion.div
        className="absolute inset-y-0 right-0 overflow-hidden"
        style={{ width: "50%", transformOrigin: "100% 50%" }}
        animate={opening
          ? { rotateY: 105, opacity: 0, transition: { duration: 1.4, ease: [0.4, 0, 0.2, 1] } }
          : { rotateY: 0, opacity: 1 }}
      >
        {/* Full image, right half visible */}
        <div className="absolute inset-y-0 left-0" style={{ width: "100vw", marginLeft: "-50vw" }}>
          <Image src="/images/gate.png" alt="Gate" fill className="object-cover object-center" priority />
        </div>
        {/* Left edge shadow */}
        <div className="absolute inset-y-0 left-0 pointer-events-none"
          style={{ width: "24px", background: "linear-gradient(to left, transparent, rgba(0,0,0,0.25))" }} />
      </motion.div>

      {/* Light burst through the gap as it opens */}
      <AnimatePresence>
        {opening && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse 30% 80% at 50% 50%, rgba(245,224,122,0.75) 0%, rgba(198,149,27,0.3) 35%, transparent 65%)",
            }}
            initial={{ opacity: 0, scaleX: 0.1 }}
            animate={{ opacity: [0, 1, 0.6, 0], scaleX: [0.1, 0.4, 1, 1.5] }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
