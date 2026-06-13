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

      {/* "You Are Invited" — fades out when zooming starts */}
      <motion.div
        className="absolute pointer-events-none"
        animate={{ opacity: zooming ? 0 : 1 }}
        transition={{ duration: 0.5 }}
        style={{
          bottom:      "26%",
          left:        "50%",
          transform:   "translateX(-50%)",
          textAlign:   "center",
          zIndex:      5,
          width:       "100%",
          paddingLeft: "28px", paddingRight: "28px",
        }}
      >
        <p style={{
          fontFamily:    "var(--font-playfair), 'Playfair Display', Georgia, serif",
          fontSize:      "clamp(15px, 4vw, 22px)",
          fontWeight:    700,
          color:         "#7B4B2A",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          margin:        0,
          lineHeight:    1.35,
        }}>
          You Are Invited To Our
        </p>
        <p style={{
          fontFamily:    "var(--font-playfair), 'Playfair Display', Georgia, serif",
          fontSize:      "clamp(15px, 4vw, 22px)",
          fontWeight:    700,
          color:         "#7B4B2A",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          margin:        "3px 0 0",
          lineHeight:    1.35,
        }}>
          Special Day
        </p>
      </motion.div>

      {/* "Tap To Open" CTA — fades out immediately on tap */}
      <motion.div
        className="absolute pointer-events-none"
        animate={{ opacity: tapped ? 0 : 1 }}
        transition={{ duration: 0.35 }}
        style={{
          bottom:    "7%",
          left:      "50%",
          transform: "translateX(-50%)",
          textAlign: "center",
          zIndex:    5,
          width:     "100%",
        }}
      >
        {/* Bouncing finger */}
        <motion.div
          style={{ fontSize: "clamp(26px, 7vw, 36px)", lineHeight: 1, userSelect: "none" }}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          👆
        </motion.div>

        {/* Pulsing label */}
        <motion.p
          style={{
            fontFamily:    "var(--font-playfair), 'Playfair Display', Georgia, serif",
            fontSize:      "clamp(12px, 3.4vw, 17px)",
            fontWeight:    600,
            color:         "rgba(232,197,71,0.92)",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            margin:        "10px 0 0",
            userSelect:    "none",
          }}
          animate={{ opacity: [0.65, 1, 0.65] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        >
          Tap To Open The Invitation
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
