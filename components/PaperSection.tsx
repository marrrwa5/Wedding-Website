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

      {/* All text — one group, fades out the moment user taps */}
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
        {/* Line 1 */}
        <p style={{
          fontFamily:    "var(--font-playfair), 'Playfair Display', Georgia, serif",
          fontSize:      "clamp(13px, 3.8vw, 19px)",
          fontWeight:    600,
          color:         "rgba(198,149,27,0.88)",
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          margin:        0,
          lineHeight:    1.5,
          userSelect:    "none",
        }}>
          You Are Invited To Our Special Day
        </p>

        {/* Thin gold divider */}
        <div style={{
          width:      "48px",
          height:     "1px",
          background: "linear-gradient(to right, transparent, rgba(198,149,27,0.6), transparent)",
          margin:     "12px auto",
        }} />

        {/* Bouncing finger */}
        <motion.div
          style={{ fontSize: "clamp(22px, 6vw, 30px)", lineHeight: 1, userSelect: "none", marginBottom: "8px" }}
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          👆
        </motion.div>

        {/* Tap CTA — same family, lighter weight, same size */}
        <motion.p
          style={{
            fontFamily:    "var(--font-playfair), 'Playfair Display', Georgia, serif",
            fontSize:      "clamp(13px, 3.8vw, 19px)",
            fontWeight:    500,
            color:         "rgba(232,197,71,0.9)",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            margin:        0,
            lineHeight:    1.5,
            userSelect:    "none",
          }}
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        >
          Tap To Open The Invitation
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
