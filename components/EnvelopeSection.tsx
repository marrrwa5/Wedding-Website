"use client";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

interface Props { onOpen: () => void; }

/* ── Corner ornament SVG ── */
function CornerOrn({ flip }: { flip?: boolean }) {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none"
      style={{ transform: flip ? "rotate(180deg)" : undefined }}>
      <path d="M4 4 L4 18 Q4 36 22 36 L36 36" stroke="rgba(198,149,27,0.7)" strokeWidth="1" fill="none" strokeLinecap="round"/>
      <circle cx="4" cy="4" r="2" fill="rgba(198,149,27,0.7)" />
      <circle cx="36" cy="36" r="2" fill="rgba(198,149,27,0.7)" />
      <path d="M10 4 L10 12 Q10 24 22 24 L36 24" stroke="rgba(198,149,27,0.35)" strokeWidth="0.6" fill="none"/>
    </svg>
  );
}

/* ── Islamic arch ornament ── */
function ArchOrn() {
  return (
    <svg width="180" height="28" viewBox="0 0 180 28" fill="none">
      <path d="M0 28 Q45 4 90 4 Q135 4 180 28" stroke="rgba(198,149,27,0.5)" strokeWidth="1" fill="none"/>
      <path d="M20 28 Q55 12 90 12 Q125 12 160 28" stroke="rgba(198,149,27,0.25)" strokeWidth="0.6" fill="none"/>
      <circle cx="90" cy="4" r="3" fill="rgba(198,149,27,0.6)" />
      {[30,60,90,120,150].map(x => (
        <circle key={x} cx={x} cy={x === 90 ? 4 : 28 - Math.abs(x - 90) * 0.26} r="1.2" fill="rgba(198,149,27,0.4)" />
      ))}
    </svg>
  );
}

export default function EnvelopeSection({ onOpen }: Props) {
  const [opening, setOpening] = useState(false);

  const handleOpen = () => {
    if (opening) return;
    setOpening(true);
    setTimeout(onOpen, 1400);
  };

  return (
    <motion.div
      className="fixed inset-0 z-40 flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "var(--emerald-deep)" }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
    >
      {/* ── Layered luxury background ── */}
      {/* Radial glow centre */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(27,67,50,0.9) 0%, rgba(7,25,15,0) 100%)" }} />
      {/* Islamic pattern overlay */}
      <div className="absolute inset-0 pattern-islamic pointer-events-none opacity-60" />
      {/* Soft top-center warm glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-64 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center top, rgba(198,149,27,0.12) 0%, transparent 70%)" }} />
      {/* Bottom vignette */}
      <div className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
        style={{ background: "linear-gradient(to top, rgba(7,25,15,0.8), transparent)" }} />

      {/* ── Decorative frame lines ── */}
      <div className="absolute inset-4 pointer-events-none rounded-lg"
        style={{ border: "1px solid rgba(198,149,27,0.12)" }} />
      <div className="absolute inset-6 pointer-events-none rounded-lg"
        style={{ border: "1px solid rgba(198,149,27,0.06)" }} />

      {/* Corner ornaments */}
      <div className="absolute top-5 left-5 pointer-events-none"><CornerOrn /></div>
      <div className="absolute bottom-5 right-5 pointer-events-none" style={{ transform: "rotate(180deg)" }}><CornerOrn /></div>
      <div className="absolute top-5 right-5 pointer-events-none" style={{ transform: "scaleX(-1)" }}><CornerOrn /></div>
      <div className="absolute bottom-5 left-5 pointer-events-none" style={{ transform: "scaleY(-1)" }}><CornerOrn /></div>

      {/* ── Envelope card ── */}
      <motion.div
        onClick={handleOpen}
        className="relative cursor-pointer select-none"
        style={{ width: "min(360px, 88vw)" }}
        whileHover={opening ? {} : { y: -4, transition: { duration: 0.3 } }}
        whileTap={opening ? {} : { scale: 0.98 }}
      >
        {/* Outer glow ring */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{ boxShadow: "0 0 60px rgba(198,149,27,0.18), 0 0 120px rgba(198,149,27,0.06)" }}
          animate={opening ? {} : { boxShadow: ["0 0 40px rgba(198,149,27,0.12)", "0 0 70px rgba(198,149,27,0.22)", "0 0 40px rgba(198,149,27,0.12)"] }}
          transition={{ duration: 3, repeat: Infinity }}
        />

        {/* ── Envelope body ── */}
        <div className="relative rounded-2xl overflow-hidden"
          style={{
            background: "linear-gradient(160deg, var(--ivory) 0%, var(--cream) 60%, var(--cream-dark) 100%)",
            boxShadow: "0 32px 80px rgba(0,0,0,0.6), 0 8px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.6)",
            border: "1.5px solid rgba(198,149,27,0.45)",
          }}>

          {/* Embossed gold lines */}
          <div className="absolute inset-x-3 top-3 bottom-3 rounded-xl pointer-events-none"
            style={{ border: "0.5px solid rgba(198,149,27,0.3)" }} />

          {/* ── Envelope flap ── */}
          <div className="relative overflow-hidden" style={{ height: "clamp(110px, 30vw, 145px)" }}>
            <motion.div
              style={{ transformOrigin: "top center", transformPerspective: "600px" }}
              animate={opening ? { rotateX: -175, opacity: 0.1 } : { rotateX: 0 }}
              transition={{ duration: 0.95, ease: [0.4, 0, 0.2, 1] }}
            >
              <svg
                viewBox="0 0 360 145"
                className="w-full"
                preserveAspectRatio="none"
                style={{ display: "block" }}
              >
                <defs>
                  <linearGradient id="flapGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#FAF7F2" />
                    <stop offset="100%" stopColor="#E0D0B0" />
                  </linearGradient>
                  <linearGradient id="flapEdge" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="rgba(198,149,27,0)" />
                    <stop offset="30%" stopColor="rgba(198,149,27,0.5)" />
                    <stop offset="70%" stopColor="rgba(198,149,27,0.5)" />
                    <stop offset="100%" stopColor="rgba(198,149,27,0)" />
                  </linearGradient>
                </defs>
                {/* Flap triangle */}
                <polygon points="0,0 360,0 180,145" fill="url(#flapGrad)" />
                {/* Gold edge on fold line */}
                <line x1="0" y1="1" x2="360" y2="1" stroke="url(#flapEdge)" strokeWidth="1.5" />
                {/* Subtle fold crease */}
                <line x1="0" y1="0" x2="180" y2="145" stroke="rgba(198,149,27,0.12)" strokeWidth="0.5" />
                <line x1="360" y1="0" x2="180" y2="145" stroke="rgba(198,149,27,0.12)" strokeWidth="0.5" />
                {/* Arch ornament on flap */}
                <g transform="translate(90,16)">
                  <path d="M0 35 Q45 8 90 8 Q135 8 180 35" stroke="rgba(198,149,27,0.35)" strokeWidth="0.7" fill="none"/>
                  <circle cx="90" cy="8" r="2.5" fill="rgba(198,149,27,0.45)" />
                </g>
              </svg>
            </motion.div>

            {/* Letter peek on open */}
            <AnimatePresence>
              {opening && (
                <motion.div
                  className="absolute inset-x-8 top-4 bottom-2 rounded-sm flex flex-col items-center justify-center gap-1"
                  style={{ background: "linear-gradient(160deg, #fffdf8, #f5ede0)", border: "0.5px solid rgba(198,149,27,0.25)" }}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: -20, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <span style={{ color: "var(--gold)", fontFamily: "var(--serif-ar)", fontSize: "clamp(13px,3.5vw,17px)" }}>
                    بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ── Envelope body content ── */}
          <div className="relative px-6 pb-7 pt-3 flex flex-col items-center gap-4"
            style={{ background: "linear-gradient(160deg, var(--cream) 0%, var(--cream-dark) 100%)" }}>

            {/* Bottom V-folds (decorative) */}
            <svg className="absolute bottom-0 left-0 w-full pointer-events-none" viewBox="0 0 360 80" preserveAspectRatio="none" style={{ height: "70px" }}>
              <defs>
                <linearGradient id="vGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#E0D0B0" />
                  <stop offset="50%" stopColor="#F0E8D8" />
                  <stop offset="100%" stopColor="#E0D0B0" />
                </linearGradient>
              </defs>
              <polygon points="0,80 180,20 360,80" fill="url(#vGrad)" />
              <line x1="0" y1="80" x2="180" y2="20" stroke="rgba(198,149,27,0.35)" strokeWidth="1" />
              <line x1="360" y1="80" x2="180" y2="20" stroke="rgba(198,149,27,0.35)" strokeWidth="1" />
            </svg>

            {/* ── Wax seal (Logo) ── */}
            <motion.div
              className="relative z-10 flex flex-col items-center"
              initial={{ scale: 0, rotate: -15 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
            >
              <div className="relative"
                style={{
                  width: "clamp(76px,22vw,96px)",
                  height: "clamp(76px,22vw,96px)",
                  borderRadius: "50%",
                  background: "radial-gradient(circle at 40% 35%, #8A6210, #3d2804)",
                  boxShadow: "0 6px 20px rgba(0,0,0,0.45), 0 2px 6px rgba(0,0,0,0.3), inset 0 1px 2px rgba(255,200,80,0.25)",
                  border: "2.5px solid rgba(198,149,27,0.7)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                }}>
                <Image
                  src="/images/zahra-logo.png"
                  alt="Wedding seal"
                  width={80}
                  height={80}
                  className="object-contain blend-multiply"
                  style={{ width: "75%", height: "75%", filter: "sepia(1) saturate(2) hue-rotate(5deg) brightness(1.1)" }}
                  priority
                />
              </div>
              {/* Seal glow */}
              <motion.div
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{ boxShadow: "0 0 0 4px rgba(198,149,27,0.2)" }}
                animate={{ boxShadow: ["0 0 0 4px rgba(198,149,27,0.15)", "0 0 0 10px rgba(198,149,27,0.04)", "0 0 0 4px rgba(198,149,27,0.15)"] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              />
            </motion.div>

            {/* Name text */}
            <motion.div
              className="text-center z-10"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.7 }}
            >
              <p style={{
                fontFamily: "var(--serif-ar)",
                fontSize: "clamp(18px,5vw,24px)",
                color: "#3d2804",
                letterSpacing: "0.08em",
                lineHeight: 1.3,
              }}>
                محمد &amp; زهراء
              </p>
              <p style={{
                fontFamily: "var(--serif-en)",
                fontSize: "clamp(10px,2.8vw,13px)",
                color: "rgba(61,40,4,0.55)",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                marginTop: "4px",
              }}>
                Wedding Invitation
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* ── Tap instruction ── */}
      <motion.div
        className="mt-8 flex flex-col items-center gap-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: opening ? 0 : 1, y: 0 }}
        transition={{ delay: 1, duration: 0.7 }}
      >
        <ArchOrn />

        {/* Floating finger icon */}
        <motion.div
          style={{ fontSize: "clamp(36px,10vw,50px)", lineHeight: 1, userSelect: "none" }}
          animate={{ y: [0, -12, 0], rotate: [-10, 10, -10] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          👆
        </motion.div>

        {/* Click here button */}
        <motion.button
          onClick={handleOpen}
          style={{
            fontFamily: "var(--serif-en)",
            fontSize: "clamp(13px,3.8vw,17px)",
            fontWeight: 600,
            color: "#C6951B",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            background: "transparent",
            border: "1.5px solid rgba(198,149,27,0.55)",
            borderRadius: "4px",
            padding: "10px 28px",
            cursor: "pointer",
            userSelect: "none",
          }}
          animate={{
            boxShadow: [
              "0 0 0px rgba(198,149,27,0)",
              "0 0 18px rgba(198,149,27,0.35)",
              "0 0 0px rgba(198,149,27,0)",
            ],
            borderColor: ["rgba(198,149,27,0.4)", "rgba(198,149,27,0.9)", "rgba(198,149,27,0.4)"],
          }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          whileTap={{ scale: 0.96 }}
        >
          Click here to see invitation
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
