"use client";
import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

interface Props { onOpen: () => void; onTap?: () => void; }

export default function PaperSection({ onOpen, onTap }: Props) {
  const videoRef  = useRef<HTMLVideoElement>(null);
  const triggered = useRef(false);
  const onOpenRef = useRef(onOpen);
  const [zooming, setZooming] = useState(false);

  // Keep ref current so the timeout always sees the latest callback
  useEffect(() => { onOpenRef.current = onOpen; }, [onOpen]);

  // Auto-start video on mount — no click required
  useEffect(() => {
    if (triggered.current) return;
    triggered.current = true;

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
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <motion.div
      className="fixed inset-0 z-40 overflow-hidden"
      style={{ background: "#07190F", cursor: "pointer" }}
      exit={{ opacity: 0, scale: 1.45, transition: { duration: 2.7, ease: [0.4, 0, 0.8, 1] } }}
      onClick={() => onTap?.()}
    >
      {/* Video — plays automatically from mount */}
      <video
        ref={videoRef}
        src="/images/Basmalah_Video.mp4"
        muted playsInline preload="auto"
        className="absolute inset-0 w-full h-full"
        style={{ objectFit: "cover", objectPosition: "center", zIndex: 1 }}
      />

      {/* Text — fades out when transition fires */}
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
    </motion.div>
  );
}
