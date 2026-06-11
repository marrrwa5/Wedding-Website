"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  onRevealed: () => void;
}

export default function ScratchReveal({ onRevealed }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [percentage, setPercentage] = useState(0);
  const isDrawing = useRef(false);
  const calledReveal = useRef(false);

  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Golden scratch overlay
    const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    grad.addColorStop(0, "#C6951B");
    grad.addColorStop(0.3, "#e8b84b");
    grad.addColorStop(0.5, "#FFE08A");
    grad.addColorStop(0.7, "#C6951B");
    grad.addColorStop(1, "#9d750f");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Texture lines
    ctx.strokeStyle = "rgba(255,255,255,0.15)";
    ctx.lineWidth = 1;
    for (let i = 0; i < canvas.width; i += 8) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i + 20, canvas.height);
      ctx.stroke();
    }

    // Instruction text
    ctx.fillStyle = "rgba(255,255,255,0.8)";
    ctx.font = `bold ${Math.floor(canvas.width * 0.05)}px serif`;
    ctx.textAlign = "center";
    ctx.fillText("Scratch to Reveal ✨", canvas.width / 2, canvas.height / 2 - 10);
    ctx.font = `${Math.floor(canvas.width * 0.035)}px serif`;
    ctx.fillText("Use your finger or mouse", canvas.width / 2, canvas.height / 2 + 20);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.parentElement?.getBoundingClientRect();
    if (rect) {
      canvas.width = rect.width;
      canvas.height = rect.height;
    } else {
      canvas.width = Math.min(window.innerWidth - 48, 380);
      canvas.height = 200;
    }
    initCanvas();
  }, [initCanvas]);

  const getPos = (e: MouseEvent | TouchEvent) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    if ("touches" in e) {
      return {
        x: (e.touches[0].clientX - rect.left) * scaleX,
        y: (e.touches[0].clientY - rect.top) * scaleY,
      };
    }
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  const scratch = (x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 28, 0, Math.PI * 2);
    ctx.fill();

    // Check percentage
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let transparentPixels = 0;
    for (let i = 3; i < imageData.data.length; i += 4) {
      if (imageData.data[i] === 0) transparentPixels++;
    }
    const total = canvas.width * canvas.height;
    const pct = Math.round((transparentPixels / total) * 100);
    setPercentage(pct);

    if (pct >= 55 && !calledReveal.current) {
      calledReveal.current = true;
      setRevealed(true);
      // Animate canvas away then callback
      setTimeout(() => {
        try {
          // eslint-disable-next-line @typescript-eslint/no-require-imports
          const confetti = require("canvas-confetti").default;
          confetti({ particleCount: 150, spread: 90, origin: { y: 0.6 }, colors: ["#C6951B", "#FFE08A", "#5D7B3A", "#E7D7C9"] });
        } catch {}
        setTimeout(onRevealed, 1500);
      }, 300);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const onMouseDown = (e: MouseEvent) => { isDrawing.current = true; scratch(getPos(e).x, getPos(e).y); };
    const onMouseMove = (e: MouseEvent) => { if (!isDrawing.current) return; scratch(getPos(e).x, getPos(e).y); };
    const onMouseUp = () => { isDrawing.current = false; };
    const onTouchStart = (e: TouchEvent) => { e.preventDefault(); isDrawing.current = true; scratch(getPos(e).x, getPos(e).y); };
    const onTouchMove = (e: TouchEvent) => { e.preventDefault(); if (!isDrawing.current) return; scratch(getPos(e).x, getPos(e).y); };
    const onTouchEnd = () => { isDrawing.current = false; };

    canvas.addEventListener("mousedown", onMouseDown);
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseup", onMouseUp);
    canvas.addEventListener("mouseleave", onMouseUp);
    canvas.addEventListener("touchstart", onTouchStart, { passive: false });
    canvas.addEventListener("touchmove", onTouchMove, { passive: false });
    canvas.addEventListener("touchend", onTouchEnd);

    return () => {
      canvas.removeEventListener("mousedown", onMouseDown);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseup", onMouseUp);
      canvas.removeEventListener("mouseleave", onMouseUp);
      canvas.removeEventListener("touchstart", onTouchStart);
      canvas.removeEventListener("touchmove", onTouchMove);
      canvas.removeEventListener("touchend", onTouchEnd);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-center justify-center z-40 overflow-hidden"
      style={{ background: "linear-gradient(135deg, #EDE9E3 0%, #E7D7C9 100%)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.6 } }}
    >
      {/* Decorative background */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: `${60 + i * 30}px`,
            height: `${60 + i * 30}px`,
            border: "1px solid rgba(198,149,27,0.2)",
            left: `${i % 2 === 0 ? 5 + i * 12 : 60 - i * 10}%`,
            top: `${10 + i * 12}%`,
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 20 + i * 5, repeat: Infinity, ease: "linear" }}
        />
      ))}

      <motion.p
        className="mb-6 text-center px-4"
        style={{
          color: "#5D7B3A",
          fontFamily: "serif",
          fontSize: "clamp(14px, 4vw, 20px)",
          letterSpacing: "0.1em",
        }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        ✨ Scratch to reveal your special date ✨
      </motion.p>

      {/* Scratch card */}
      <motion.div
        className="relative rounded-2xl overflow-hidden shadow-2xl"
        style={{
          width: "min(380px, calc(100vw - 48px))",
          height: "200px",
          border: "3px solid rgba(198,149,27,0.6)",
          boxShadow: "0 20px 60px rgba(198,149,27,0.25)",
        }}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
      >
        {/* Revealed content underneath */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center"
          style={{ background: "linear-gradient(135deg, #3B0A0A, #6B1A1A)" }}
        >
          <motion.div
            className="text-center"
            animate={{ opacity: revealed ? 1 : 0.8 }}
          >
            <p style={{ color: "#C6951B", fontFamily: "serif", fontSize: "clamp(11px, 3vw, 14px)", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "8px" }}>
              Save the Date
            </p>
            <p
              className="shimmer-text"
              style={{
                fontFamily: "AlKanz, KanzAlMarjaan, serif",
                fontSize: "clamp(24px, 8vw, 44px)",
                fontWeight: "bold",
                lineHeight: 1.1,
              }}
            >
              25 November
            </p>
            <p
              className="shimmer-text"
              style={{
                fontFamily: "AlKanz, KanzAlMarjaan, serif",
                fontSize: "clamp(20px, 6vw, 36px)",
                fontWeight: "bold",
              }}
            >
              2026
            </p>
            <p style={{ color: "#E7D7C9", fontFamily: "serif", fontSize: "clamp(10px, 2.5vw, 13px)", marginTop: "6px", letterSpacing: "0.15em" }}>
              ❋ Mohammad & Zahra ❋
            </p>
          </motion.div>
        </div>

        {/* Scratch canvas overlay */}
        <AnimatePresence>
          {!revealed && (
            <motion.canvas
              ref={canvasRef}
              className="absolute inset-0 w-full h-full cursor-crosshair"
              exit={{ opacity: 0, transition: { duration: 0.5 } }}
            />
          )}
        </AnimatePresence>
      </motion.div>

      {/* Progress hint */}
      <motion.p
        className="mt-4 text-center"
        style={{ color: "#9d750f", fontFamily: "serif", fontSize: "clamp(11px, 3vw, 13px)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        {percentage < 30 ? "Keep scratching..." : percentage < 55 ? "Almost there..." : "🎉 Revealed!"}
      </motion.p>
    </motion.div>
  );
}
