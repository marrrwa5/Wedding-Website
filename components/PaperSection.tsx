"use client";
import { useRef, useState } from "react";
import { motion } from "framer-motion";

interface Props { onOpen: () => void; onTap?: () => void; }

export default function PaperSection({ onOpen, onTap }: Props) {
  const videoRef  = useRef<HTMLVideoElement>(null);
  const triggered = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [zooming, setZooming] = useState(false);

  const handleClick = () => {
    if (triggered.current) return;
    triggered.current = true;
    setPlaying(true);
    onTap?.();

    const v = videoRef.current;
    if (!v) { onOpen(); return; }

    v.currentTime = 0;
    const p = v.play();

    const afterStart = () => {
      /* Fade text 500 ms before zoom transition fires */
      setTimeout(() => { setZooming(true); }, 5500);
      setTimeout(() => { onOpen(); }, 6000);
    };

    if (p !== undefined) { p.then(afterStart).catch(() => onOpen()); }
    else { afterStart(); }
  };

  return (
    <motion.div
      className="fixed inset-0 z-40 overflow-hidden"
      style={{ background: "#07190F", cursor: playing ? "default" : "pointer" }}
      exit={{ opacity: 0, scale: 1.45, transition: { duration: 2.7, ease: [0.4, 0, 0.8, 1] } }}
      onClick={handleClick}
    >
      {/* Video — auto-plays muted to paint first frame, then paused */}
      <video
        ref={videoRef}
        src="/images/Basmalah_Video.mp4"
        autoPlay muted playsInline preload="auto"
        className="absolute inset-0 w-full h-full"
        style={{ objectFit: "cover", objectPosition: "center", zIndex: 1 }}
        onPlay={e => { if (!triggered.current) e.currentTarget.pause(); }}
      />

      {/* ── Text — fades out when animation starts ── */}
      <motion.div
        className="absolute pointer-events-none"
        animate={{ opacity: zooming ? 0 : 1 }}
        transition={{ duration: 0.5 }}
        style={{
          bottom:      "18%",
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
          fontStyle:     "normal",
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
          fontStyle:     "normal",
          color:         "#7B4B2A",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          margin:        "3px 0 0",
          lineHeight:    1.35,
        }}>
          Special Day
        </p>
      </motion.div>
    </motion.div>
  );
}
