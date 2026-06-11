"use client";
import { useRef, useEffect } from "react";
import { motion } from "framer-motion";

interface Props { onDone: () => void; }

export default function GateVideo({ onDone }: Props) {
  const ref   = useRef<HTMLVideoElement>(null);
  const fired = useRef(false);

  const triggerExit = () => {
    if (fired.current) return;
    fired.current = true;
    onDone();
  };

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.currentTime = 2;
    v.playbackRate = 1.6;
    v.play().catch(() => triggerExit());

    const onTime = () => { if (v.currentTime >= 4) triggerExit(); };
    v.addEventListener("timeupdate", onTime);
    return () => v.removeEventListener("timeupdate", onTime);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-50 overflow-hidden"
      style={{ pointerEvents: "none" }}
      initial={{ opacity: 0, scale: 1 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{
        scale: 2.5,
        opacity: 0,
        transition: {
          scale:   { duration: 4.0, ease: "easeInOut" },
          opacity: { duration: 4.0, ease: "easeInOut" },
        },
      }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
    >
      <video
        ref={ref}
        src="/Final_Gate2.mov"
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full"
        style={{ objectFit: "cover" }}
        onEnded={triggerExit}
      />
    </motion.div>
  );
}
