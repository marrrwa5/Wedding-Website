"use client";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

interface Props { onContinue: () => void; }

/* ─── Scratch Canvas ──────────────────────────────── */
function ScratchCard({ onComplete }: { onComplete: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [pct, setPct] = useState(0);
  const [done, setDone] = useState(false);
  const calledRef = useRef(false);
  const drawing = useRef(false);
  // Keep onComplete in a ref so the stale-closure useEffect always calls the latest version
  const onCompleteRef = useRef(onComplete);
  useEffect(() => { onCompleteRef.current = onComplete; }, [onComplete]);

  const init = useCallback(() => {
    const c = canvasRef.current;
    if (!c) return;
    const parent = c.parentElement;
    if (parent) { c.width = parent.offsetWidth; c.height = parent.offsetHeight; }
    const ctx = c.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, c.width, c.height);
    const g = ctx.createLinearGradient(0, 0, c.width, c.height);
    g.addColorStop(0,   "#0B2818");
    g.addColorStop(0.4, "#133D22");
    g.addColorStop(0.7, "#1B4332");
    g.addColorStop(1,   "#0B2818");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, c.width, c.height);
    ctx.strokeStyle = "rgba(198,149,27,0.18)";
    ctx.lineWidth = 0.8;
    for (let i = 0; i < c.width; i += 9) {
      ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i + 14, c.height); ctx.stroke();
    }
    const fs = Math.max(12, Math.floor(c.width * 0.055));
    ctx.fillStyle = "rgba(198,149,27,0.75)";
    ctx.font = `${fs}px serif`;
    ctx.textAlign = "center";
    ctx.fillText("Scratch to reveal", c.width / 2, c.height / 2 - 8);
    ctx.font = `${Math.floor(fs * 0.7)}px serif`;
    ctx.fillStyle = "rgba(198,149,27,0.45)";
    ctx.fillText("Use your finger or mouse", c.width / 2, c.height / 2 + 14);
  }, []);

  useEffect(() => { init(); }, [init]);

  // Safe position helper — returns null if canvas is gone
  const getXY = (e: MouseEvent | TouchEvent): { x: number; y: number } | null => {
    const c = canvasRef.current;
    if (!c) return null;
    const r = c.getBoundingClientRect();
    const sx = c.width / r.width, sy = c.height / r.height;
    if ("touches" in e) {
      if (e.touches.length === 0) return null;
      return { x: (e.touches[0].clientX - r.left) * sx, y: (e.touches[0].clientY - r.top) * sy };
    }
    return { x: (e.clientX - r.left) * sx, y: (e.clientY - r.top) * sy };
  };

  const scratch = useCallback((x: number, y: number) => {
    // Stop processing once revealed
    if (calledRef.current) return;
    const c = canvasRef.current; if (!c) return;
    const ctx = c.getContext("2d"); if (!ctx) return;
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 30, 0, Math.PI * 2);
    ctx.fill();
    const d = ctx.getImageData(0, 0, c.width, c.height).data;
    let t = 0;
    for (let i = 3; i < d.length; i += 4) if (d[i] === 0) t++;
    const p = Math.round((t / (c.width * c.height)) * 100);
    setPct(p);
    if (p >= 52) {
      calledRef.current = true;
      setDone(true);
      // Fire confetti then advance phase
      import("canvas-confetti").then(mod => {
        mod.default({ particleCount: 120, spread: 80, origin: { y: 0.55 }, colors: ["#C6951B", "#E8C547", "#1B4332", "#F0E8D8"] });
      }).catch(() => {});
      setTimeout(() => onCompleteRef.current(), 1600);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const c = canvasRef.current; if (!c) return;
    const md = (e: MouseEvent) => { drawing.current = true; const p = getXY(e); if (p) scratch(p.x, p.y); };
    const mm = (e: MouseEvent) => { if (!drawing.current) return; const p = getXY(e); if (p) scratch(p.x, p.y); };
    const mu = () => { drawing.current = false; };
    const ts = (e: TouchEvent) => { e.preventDefault(); drawing.current = true; const p = getXY(e); if (p) scratch(p.x, p.y); };
    const tm = (e: TouchEvent) => { e.preventDefault(); if (!drawing.current) return; const p = getXY(e); if (p) scratch(p.x, p.y); };
    const te = () => { drawing.current = false; };
    c.addEventListener("mousedown", md); c.addEventListener("mousemove", mm); c.addEventListener("mouseup", mu); c.addEventListener("mouseleave", mu);
    c.addEventListener("touchstart", ts, { passive: false }); c.addEventListener("touchmove", tm, { passive: false }); c.addEventListener("touchend", te);
    return () => {
      c.removeEventListener("mousedown", md); c.removeEventListener("mousemove", mm); c.removeEventListener("mouseup", mu); c.removeEventListener("mouseleave", mu);
      c.removeEventListener("touchstart", ts); c.removeEventListener("touchmove", tm); c.removeEventListener("touchend", te);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scratch]);

  return (
    <div className="w-full">
      <p className="text-center mb-3" style={{
        fontFamily: "var(--serif-en)",
        fontSize: "clamp(11px,3vw,13px)",
        color: "rgba(198,149,27,0.65)",
        letterSpacing: "0.2em",
        textTransform: "uppercase",
      }}>
        {done ? "Revealed" : pct < 30 ? "Scratch to reveal the date" : pct < 52 ? "Almost there..." : ""}
      </p>

      <div className="relative rounded-2xl overflow-hidden mx-auto"
        style={{
          width: "min(340px, 86vw)",
          height: "clamp(100px,22vw,130px)",
          border: "1px solid rgba(198,149,27,0.35)",
          boxShadow: "0 12px 40px rgba(0,0,0,0.45), 0 0 0 1px rgba(198,149,27,0.15)",
        }}>
        {/* Date reveal underneath */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-1"
          style={{ background: "linear-gradient(135deg, var(--emerald-deep), var(--emerald-mid))" }}>
          <p style={{
            fontFamily: "var(--serif-en)",
            fontSize: "clamp(9px,2.5vw,11px)",
            color: "rgba(198,149,27,0.6)",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
          }}>Save the Date</p>
          <p className="shimmer-gold shimmer-loop" style={{
            fontFamily: "var(--serif-ar)",
            fontSize: "clamp(24px,7vw,38px)",
            fontWeight: 600,
            lineHeight: 1.1,
          }}>25 November 2026</p>
          <p style={{
            fontFamily: "var(--serif-en)",
            fontSize: "clamp(9px,2.5vw,12px)",
            color: "rgba(232,213,176,0.6)",
            letterSpacing: "0.15em",
          }}>Mohammad & Zahra</p>
        </div>
        {/* Scratch overlay */}
        <AnimatePresence>
          {!done && (
            <motion.canvas ref={canvasRef} className="absolute inset-0 w-full h-full cursor-crosshair"
              exit={{ opacity: 0, transition: { duration: 0.6 } }} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ─── Main LogoSection ────────────────────────────── */
export default function LogoSection({ onContinue }: Props) {
  const [shimmerDone, setShimmerDone] = useState(false);

  // Stop shimmer after 4 passes (4 × 3.5s)
  useEffect(() => {
    const t = setTimeout(() => setShimmerDone(true), 4 * 3500);
    return () => clearTimeout(t);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-40 flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "var(--emerald-deep)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.7 } }}
    >
      {/* Background */}
      <div className="absolute inset-0 pattern-islamic pointer-events-none" style={{ opacity: 0.45 }} />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 90% 80% at 50% 40%, rgba(27,67,50,0.7) 0%, transparent 100%)" }} />

      {/* Frame */}
      <div className="absolute inset-5 pointer-events-none rounded-xl"
        style={{ border: "1px solid rgba(198,149,27,0.1)" }} />

      <div className="relative z-10 w-full max-w-lg px-5 flex flex-col items-center gap-5">

        {/* Logo */}
        <motion.div
          className="relative float-gently"
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.9, ease: [0.34, 1.56, 0.64, 1] }}
        >
          <div className="relative">
            {/* Gold ring */}
            <div className="absolute inset-0 rounded-full"
              style={{ boxShadow: "0 0 40px rgba(198,149,27,0.2)", border: "1px solid rgba(198,149,27,0.25)" }} />
            <Image
              src="/images/zahra-logo.png"
              alt="Wedding Logo"
              width={130}
              height={130}
              className="object-contain blend-screen"
              style={{ width: "clamp(100px,26vw,130px)", height: "auto" }}
              priority
            />
          </div>
        </motion.div>

        {/* Divider */}
        <motion.div
          className="w-full flex items-center gap-4"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <div className="h-px flex-1" style={{ background: "linear-gradient(to right, transparent, rgba(198,149,27,0.45))" }} />
          <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: "var(--gold)", opacity: 0.7 }} />
          <div className="h-px flex-1" style={{ background: "linear-gradient(to left, transparent, rgba(198,149,27,0.45))" }} />
        </motion.div>

        {/* Couple names */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          <div
            className={shimmerDone ? "" : "shimmer-gold shimmer-loop"}
            style={{
              fontFamily: "var(--serif-ar)",
              fontSize: "clamp(36px,11vw,66px)",
              fontWeight: 600,
              lineHeight: 1.0,
              letterSpacing: "0.04em",
              ...(shimmerDone ? { color: "var(--gold-warm)" } : {}),
            }}
          >
            Mohammad
          </div>

          <motion.div
            className="flex items-center justify-center gap-5 my-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            <div className="h-px w-8" style={{ background: "rgba(198,149,27,0.4)" }} />
            <span style={{ color: "var(--gold)", fontSize: "clamp(14px,4vw,18px)", opacity: 0.8 }}>✦</span>
            <div className="h-px w-8" style={{ background: "rgba(198,149,27,0.4)" }} />
          </motion.div>

          <div
            className={shimmerDone ? "" : "shimmer-gold shimmer-loop"}
            style={{
              fontFamily: "var(--serif-ar)",
              fontSize: "clamp(36px,11vw,66px)",
              fontWeight: 600,
              lineHeight: 1.0,
              letterSpacing: "0.04em",
              animationDelay: "0.4s",
              ...(shimmerDone ? { color: "var(--gold-warm)" } : {}),
            }}
          >
            Zahra
          </div>

          <p style={{
            fontFamily: "var(--serif-en)",
            fontSize: "clamp(10px,2.8vw,13px)",
            color: "rgba(198,149,27,0.55)",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            marginTop: "6px",
          }}>
            — Wedding Invitation —
          </p>
        </motion.div>

        {/* Scratch card directly below names */}
        <motion.div
          className="w-full"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.8 }}
        >
          <ScratchCard onComplete={onContinue} />
        </motion.div>
      </div>
    </motion.div>
  );
}
