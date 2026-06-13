"use client";
import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

interface Props { onOpen: () => void; }

export default function PaperSection({ onOpen }: Props) {
  const videoRef  = useRef<HTMLVideoElement>(null);
  const triggered = useRef(false);
  const onOpenRef = useRef(onOpen);
  const [tapped,  setTapped]  = useState(false);
  const [zooming, setZooming] = useState(false);

  useEffect(() => { onOpenRef.current = onOpen; }, [onOpen]);

  const handleTap = () => {
    if (triggered.current) return;
    triggered.current = true;
    setTapped(true);

    const v = videoRef.current;
    if (!v) { onOpenRef.current(); return; }

    v.currentTime = 0;
    const p = v.play();

    const afterStart = () => {
      setTimeout(() => setZooming(true), 5500);
      setTimeout(() => onOpenRef.current(), 6000);
    };

    if (p !== undefined) { p.then(afterStart).catch(() => onOpenRef.current()); }
    else { afterStart(); }
  };

  return (
    <motion.div
      className="fixed inset-0 z-40 overflow-hidden"
      style={{ background: "#07190F", cursor: tapped ? "default" : "pointer" }}
      exit={{ opacity: 0, scale: 1.45, transition: { duration: 2.7, ease: [0.4, 0, 0.8, 1] } }}
      onClick={handleTap}
    >
      {/* Video — autoPlay+onPlay pause trick shows first frame without playing */}
      <video
        ref={videoRef}
        src="/images/Basmalah_Video.mp4"
        autoPlay muted playsInline preload="auto"
        className="absolute inset-0 w-full h-full"
        style={{ objectFit: "cover", objectPosition: "center", zIndex: 1 }}
        onPlay={e => { if (!triggered.current) e.currentTarget.pause(); }}
      />

      {/* All text — one group, fades out on tap */}
      <motion.div
        className="absolute pointer-events-none"
        animate={{ opacity: tapped ? 0 : 1 }}
        transition={{ duration: 0.35 }}
        style={{
          bottom:      "12%",
          left:        "50%",
          transform:   "translateX(-50%)",
          textAlign:   "center",
          zIndex:      5,
          width:       "100%",
          paddingLeft: "28px", paddingRight: "28px",
        }}
      >
        {/* "You Are Invited" — original brown, bold */}
        <p style={{
          fontFamily:    "var(--font-playfair), 'Playfair Display', Georgia, serif",
          fontSize:      "clamp(15px, 4vw, 22px)",
          fontWeight:    700,
          color:         "#7B4B2A",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          margin:        0,
          lineHeight:    1.35,
          userSelect:    "none",
        }}>
          You Are Invited To Our Special Day
        </p>

        {/* ──────◆────── divider */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", margin: "14px auto" }}>
          <div style={{ width: "52px", height: "1px", background: "linear-gradient(to right, transparent, #A0622A)" }} />
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <rect x="1" y="1" width="8" height="8" transform="rotate(45 5 5)" fill="#A0622A" />
          </svg>
          <div style={{ width: "52px", height: "1px", background: "linear-gradient(to left, transparent, #A0622A)" }} />
        </div>

        {/* "Tap To Open" — slightly lighter brown, same font */}
        <motion.p
          style={{
            fontFamily:    "var(--font-playfair), 'Playfair Display', Georgia, serif",
            fontSize:      "clamp(15px, 4vw, 22px)",
            fontWeight:    600,
            color:         "#C07848",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            margin:        0,
            lineHeight:    1.35,
            userSelect:    "none",
          }}
          animate={{ opacity: [0.75, 1, 0.75] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        >
          Tap To Open The Invitation
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
