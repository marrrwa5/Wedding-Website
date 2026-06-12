"use client";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import WeddingEvents from "@/components/WeddingEvents";

/* ═══════════════════════════════════════════════════════════
   PREMIUM COUNTDOWN — sophisticated, airy, mobile-first
═══════════════════════════════════════════════════════════ */
const WEDDING = new Date("2026-11-25T18:00:00");
function getLeft() {
  const d = WEDDING.getTime() - Date.now();
  if (d <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days:    Math.floor(d / 86400000),
    hours:   Math.floor((d / 3600000) % 24),
    minutes: Math.floor((d / 60000) % 60),
    seconds: Math.floor((d / 1000) % 60),
  };
}

function PremiumCountdown() {
  const [t, setT] = useState(getLeft());
  useEffect(() => {
    const id = setInterval(() => setT(getLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  /* Plain span — no AnimatePresence, no layout shift, no flicker */
  const Box = ({ val, lbl }: { val: number; lbl: string }) => (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
      <div style={{
        position: "relative",
        width:    "clamp(64px,17vw,82px)",
        height:   "clamp(68px,18vw,88px)",
        borderRadius: "6px",
        border:   "1px solid rgba(198,149,27,0.22)",
        padding:  "1px",
      }}>
        <div style={{
          width: "100%", height: "100%",
          borderRadius: "5px",
          border: "1px solid rgba(198,149,27,0.15)",
          background: "linear-gradient(175deg, rgba(18,38,16,0.96) 0%, rgba(6,16,7,0.98) 100%)",
          display: "flex", alignItems: "center", justifyContent: "center",
          position: "relative", overflow: "hidden",
          boxShadow: "0 8px 28px rgba(0,0,0,0.55), inset 0 1px 0 rgba(198,149,27,0.12)",
        }}>
          <div style={{
            position: "absolute", left: "12%", right: "12%",
            top: "50%", height: "1px",
            background: "rgba(198,149,27,0.08)",
          }} />
          <span style={{
            fontFamily:    "var(--font-playfair,'Playfair Display',Georgia,serif)",
            fontSize:      "clamp(28px,8vw,44px)",
            fontWeight:    500,
            color:         "#E8C547",
            lineHeight:    1,
            letterSpacing: "-0.01em",
            position:      "relative", zIndex: 1,
          }}>
            {String(val).padStart(2, "0")}
          </span>
        </div>
      </div>
      <span style={{
        fontFamily:    "system-ui, Arial, Helvetica, sans-serif",
        fontSize:      "clamp(9px,2.4vw,11px)",
        fontWeight:    700,
        color:         "rgba(255,255,255,0.85)",
        letterSpacing: "0.2em",
        textTransform: "uppercase",
      }}>
        {lbl}
      </span>
    </div>
  );

  const Diamond = () => (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "center",
      paddingBottom: "clamp(20px,4.5vw,28px)", flexShrink: 0,
    }}>
      <svg width="6" height="6" viewBox="0 0 6 6" fill="none">
        <rect x="0.5" y="0.5" width="5" height="5" rx="0"
          transform="rotate(45 3 3)"
          fill="rgba(198,149,27,0.45)" />
      </svg>
    </div>
  );

  return (
    <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "center", gap: "8px" }}>
      <Box val={t.days}    lbl="Days" />
      <Diamond />
      <Box val={t.hours}   lbl="Hours" />
      <Diamond />
      <Box val={t.minutes} lbl="Mins" />
      <Diamond />
      <Box val={t.seconds} lbl="Secs" />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   CLICK-TO-REVEAL DATE CARD
═══════════════════════════════════════════════════════════ */
function ScratchCard({ onDone: _onDone }: { onDone: () => void }) {
  const [revealed,     setRevealed]     = useState(false);
  const confettiFired                   = useRef(false);

  const fireConfetti = () => {
    if (confettiFired.current) return;
    confettiFired.current = true;
    try {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const confetti = require("canvas-confetti").default;
      confetti({ particleCount: 80, angle: 60,  spread: 55,
        origin: { x: 0.1, y: 0.7 }, colors: ["#C6951B","#EDD060","#F5E07A","#E7D7C9","#5D7B3A"] });
      confetti({ particleCount: 80, angle: 120, spread: 55,
        origin: { x: 0.9, y: 0.7 }, colors: ["#C6951B","#EDD060","#F5E07A","#E7D7C9","#5D7B3A"] });
      setTimeout(() => confetti({ particleCount: 60, spread: 80,
        origin: { x: 0.5, y: 0.6 }, colors: ["#C6951B","#EDD060","#ffffff","#E7D7C9"] }), 200);
    } catch {}
  };

  const fireParty = () => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const confetti = require("canvas-confetti").default;
      const scalar = 2;
      const emojis = ["🎉","💍","💕","✨","🌸","🎊","💫","🥂"];
      const shapes = emojis.map((e) => confetti.shapeFromText({ text: e, scalar }));
      const colors = ["#C6951B","#EDD060","#FF9DC4","#B8E0D2","#ffffff","#F5E07A"];
      confetti({ particleCount: 32, spread: 90, origin: { x: 0.5, y: 0 },
        shapes, scalar, gravity: 0.55, ticks: 280, drift: 0.4 });
      setTimeout(() => {
        confetti({ particleCount: 55, angle: 65,  spread: 50,
          origin: { x: 0.05, y: 0.6 }, colors, gravity: 0.7, ticks: 220 });
        confetti({ particleCount: 55, angle: 115, spread: 50,
          origin: { x: 0.95, y: 0.6 }, colors, gravity: 0.7, ticks: 220 });
      }, 300);
      setTimeout(() => {
        confetti({ particleCount: 28, spread: 120, origin: { x: 0.5, y: 0.45 },
          shapes, scalar, gravity: 0.5, ticks: 300, drift: 0.6 });
        confetti({ particleCount: 40, spread: 100, origin: { x: 0.5, y: 0.5 },
          colors, gravity: 0.65, ticks: 240 });
      }, 650);
    } catch {}
  };

  const handleClick = () => {
    if (revealed) return;
    setRevealed(true);
    fireConfetti();
    fireParty();
  };

  return (
    <div style={{ textAlign: "center" }}>

      {/* Save the Date label — fades out on reveal */}
      <AnimatePresence>
        {!revealed && (
          <motion.div
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            style={{ marginBottom: "16px" }}
          >
            <p style={{
              fontFamily:    "var(--font-playfair,'Playfair Display',Georgia,serif)",
              fontSize:      "clamp(12px,3vw,16px)",
              fontWeight:    500,
              letterSpacing: "0.36em",
              textTransform: "uppercase",
              color:         "rgba(185,140,28,0.92)",
              lineHeight:    1,
            }}>Save the Date</p>
            <div style={{
              width: "40px", height: "1px",
              background: "linear-gradient(to right,transparent,rgba(232,197,71,0.4),transparent)",
              margin: "8px auto 0",
            }} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Click button → revealed date */}
      <AnimatePresence mode="wait">
        {!revealed ? (
          <motion.div
            key="click-box"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{
              opacity:   1,
              scale:     1,
              boxShadow: [
                "0 0 0 1px rgba(198,149,27,0.08),0 8px 24px rgba(198,149,27,0.3)",
                "0 0 0 1px rgba(198,149,27,0.08),0 8px 40px rgba(198,149,27,0.6)",
                "0 0 0 1px rgba(198,149,27,0.08),0 8px 24px rgba(198,149,27,0.3)",
              ],
            }}
            exit={{ scale: 1.08, opacity: 0, transition: { duration: 0.25 } }}
            transition={{
              opacity:   { duration: 0.4 },
              scale:     { duration: 0.4 },
              boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" },
            }}
          >
            <button
              onClick={handleClick}
              style={{
                width:          "min(210px,calc(100vw - 48px))",
                height:         "50px",
                borderRadius:   "25px",
                display:        "flex",
                alignItems:     "center",
                justifyContent: "center",
                cursor:         "pointer",
                background:     "linear-gradient(135deg,#C6951B 0%,#e8b84b 35%,#FFE08A 55%,#C6951B 100%)",
                border:         "1px solid rgba(198,149,27,0.7)",
                userSelect:     "none",
                touchAction:    "manipulation",
              }}
            >
              <span style={{
                fontFamily:    "var(--font-playfair,'Playfair Display',Georgia,serif)",
                fontSize:      "clamp(11px,3vw,14px)",
                fontWeight:    700,
                letterSpacing: "0.08em",
                color:         "#3d2804",
                userSelect:    "none",
              }}>Click To Reveal The Date</span>
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="date-revealed"
            style={{
              width:          "min(210px,calc(100vw - 48px))",
              height:         "50px",
              borderRadius:   "25px",
              margin:         "0 auto",
              border:         "1px solid rgba(198,149,27,0.35)",
              boxShadow:      "0 0 0 1px rgba(198,149,27,0.08),0 12px 36px rgba(0,0,0,0.48)",
              display:        "flex",
              alignItems:     "center",
              justifyContent: "center",
              background:     "linear-gradient(160deg,#2D0A0A 0%,#5C1212 55%,#2D0A0A 100%)",
            }}
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
          >
            <p style={{
              fontFamily:    "var(--font-playfair,'Playfair Display',Georgia,serif)",
              fontSize:      "clamp(13px,3.8vw,18px)",
              fontWeight:    700,
              letterSpacing: "0.1em",
              lineHeight:    1,
              color:         "#E8C547",
              margin:        0,
            }}>25 November 2026</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   NAMES REVEAL — main component
═══════════════════════════════════════════════════════════ */
export default function NamesReveal() {
  const [showCountdown, setShowCountdown] = useState(false);
  const [shimmerGone,   setShimmerGone]   = useState(false);

  useEffect(() => {
    const t2 = setTimeout(() => setShimmerGone(true), 1500);
    return () => { clearTimeout(t2); };
  }, []);

  /* Name styles — AlKanz, no text-shadow */
  const nameStyle: React.CSSProperties = {
    fontFamily: "AlKanz, KanzAlMarjaan, Georgia, serif",
    fontSize:   "clamp(52px,14vw,100px)",
    fontWeight: "bold",
    lineHeight: 1,
    color:      "#D4A82A",
    whiteSpace: "nowrap",
    display:    "block",
  };
  const ampStyle: React.CSSProperties = {
    fontFamily: "var(--font-cormorant,Georgia,serif)",
    fontSize:   "clamp(28px,7.5vw,54px)",
    fontStyle:  "italic",
    fontWeight: 300,
    color:      "rgba(212,168,42,0.52)",
    padding:    "0 0.14em",
    whiteSpace: "nowrap",
    display:    "block",
  };

  const NameDivider = () => (
    <div style={{ display:"flex", alignItems:"center", gap:"8px", margin:"3px 0" }}>
      <div style={{ width:"28px", height:"1px", background:"rgba(198,149,27,0.35)" }}/>
      <span style={{ color:"rgba(198,149,27,0.6)", fontSize:"clamp(10px,2.6vw,12px)" }}>✦</span>
      <div style={{ width:"28px", height:"1px", background:"rgba(198,149,27,0.35)" }}/>
    </div>
  );

  const StaticRow = () => (
    <div style={{ display:"flex", alignItems:"center", justifyContent:"center" }}>
      <span style={{ ...nameStyle, display:"inline-block" }}>محمد</span>
      <span style={{ ...ampStyle, display:"inline-block" }}>&</span>
      <span style={{ ...nameStyle, display:"inline-block" }}>زهراء</span>
    </div>
  );

  const ShimmerRow = () => (
    <div style={{ display:"flex", alignItems:"center", justifyContent:"center" }}>
      <span className="shimmer-gold shimmer-loop" style={{ ...nameStyle, color:undefined, display:"inline-block" }}>محمد</span>
      <span className="shimmer-gold shimmer-loop" style={{ ...ampStyle,  color:undefined, display:"inline-block" }}>&</span>
      <span className="shimmer-gold shimmer-loop" style={{ ...nameStyle, color:undefined, display:"inline-block" }}>زهراء</span>
    </div>
  );

  return (
    <motion.div
      style={{ position: "fixed", inset: 0, zIndex: 40, overflow: "hidden" }}
    >
      {/* ── Single scrollable container ── */}
      <div style={{ width: "100%", height: "100%", overflowY: "auto", overflowX: "hidden", scrollBehavior: "smooth" }}>

        {/* ════════════════════════════════════════════════
            SECTION 1 — Names & Save the Date (original)
        ════════════════════════════════════════════════ */}
        <div style={{ position: "relative", minHeight: "100vh", overflow: "hidden", display: "flex", flexDirection: "column" }}>

          <Image
            src="/images/mad.png"
            alt="" fill priority
            style={{ objectFit: "cover", objectPosition: "center" }}
          />


          {/* Content — shifted lower, tight spacing */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            style={{
              position: "relative", zIndex: 1, flex: 1,
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "flex-start",
              paddingTop: "clamp(150px,32vh,220px)",
              paddingLeft: "28px", paddingRight: "28px",
              paddingBottom: "32px",
            }}
          >
            {/* بسم الله الرحمن الرحيم */}
            <p style={{
              fontFamily:    "KanzAlMarjaan, AlKanz, Georgia, serif",
              fontSize:      "clamp(20px,5.5vw,30px)",
              fontWeight:    "normal",
              color:         "#C6951B",
              direction:     "rtl",
              letterSpacing: "0.06em",
              lineHeight:    1.7,
              marginBottom:  "10px",
              textAlign:     "center",
            }}>
              بسم الله الرحمن الرحيم
            </p>

            {/* Divider — ✦ ✦ ✦ style */}
            <div style={{ display:"flex", alignItems:"center", gap:"8px", marginBottom:"12px", width:"min(180px,55vw)" }}>
              <div style={{ flex:1, height:"1px", background:"linear-gradient(to right,transparent,rgba(198,149,27,0.3))" }}/>
              <span style={{ color:"rgba(198,149,27,0.45)", fontSize:"8px", letterSpacing:"4px" }}>✦ ✦ ✦</span>
              <div style={{ flex:1, height:"1px", background:"linear-gradient(to left,transparent,rgba(198,149,27,0.3))" }}/>
            </div>

            {/* Intro copy */}
            <div style={{ textAlign: "center", marginBottom: "14px" }}>
              <p style={{
                fontFamily:    "var(--font-playfair,'Playfair Display',Georgia,serif)",
                fontSize:      "clamp(13px,3.4vw,18px)",
                fontWeight:    600,
                letterSpacing: "0.24em",
                textTransform: "uppercase",
                color:         "rgba(190,158,72,0.96)",
                marginBottom:  "5px",
              }}>
                Together in Faith and Love
              </p>
              <p style={{
                fontFamily:    "var(--font-lora,'Lora',Georgia,serif)",
                fontSize:      "clamp(11px,2.9vw,14px)",
                fontStyle:     "italic",
                fontWeight:    400,
                letterSpacing: "0.07em",
                color:         "rgba(170,138,58,0.82)",
                margin:        0,
              }}>
                we joyfully announce the union of
              </p>
            </div>

            {/* Divider above names */}
            <div style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"8px", width:"min(200px,62vw)" }}>
              <div style={{ flex:1, height:"1px", background:"linear-gradient(to right,transparent,rgba(198,149,27,0.38))" }}/>
              <span style={{ color:"rgba(198,149,27,0.55)", fontSize:"11px" }}>✦</span>
              <div style={{ flex:1, height:"1px", background:"linear-gradient(to left,transparent,rgba(198,149,27,0.38))" }}/>
            </div>

            {/* Names — vertical stack */}
            <div style={{ position: "relative", marginBottom: "8px" }}>
              <StaticRow />
              <motion.div
                aria-hidden
                style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
                initial={{ opacity: 1 }}
                animate={{ opacity: shimmerGone ? 0 : 1 }}
                transition={{ duration: 0.7 }}
              >
                <ShimmerRow />
              </motion.div>
            </div>

            {/* Divider below names */}
            <div style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"4px", width:"min(200px,62vw)" }}>
              <div style={{ flex:1, height:"1px", background:"linear-gradient(to right,transparent,rgba(198,149,27,0.38))" }}/>
              <span style={{ color:"rgba(198,149,27,0.55)", fontSize:"11px" }}>✦</span>
              <div style={{ flex:1, height:"1px", background:"linear-gradient(to left,transparent,rgba(198,149,27,0.38))" }}/>
            </div>

            {/* Date text — appears below names after scratch reveal */}
            <AnimatePresence>
              {showCountdown && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  style={{
                    fontFamily:    "var(--font-playfair,'Playfair Display',Georgia,serif)",
                    fontSize:      "clamp(15px,4vw,22px)",
                    fontWeight:    600,
                    letterSpacing: "0.14em",
                    color:         "#E8C547",
                    textAlign:     "center",
                    marginTop:     "8px",
                    marginBottom:  "0px",
                  }}
                >
                  25 November 2026
                </motion.p>
              )}
            </AnimatePresence>

            {/* Scratch card ↔ Countdown */}
            <div style={{ marginTop: "28px", width: "100%", display: "flex", justifyContent: "center" }}>
              <AnimatePresence mode="wait">
                {!showCountdown ? (
                  <motion.div
                    key="scratch"
                    exit={{ opacity: 0, y: -10, transition: { duration: 0.4 } }}
                  >
                    <ScratchCard onDone={() => setShowCountdown(true)} />
                  </motion.div>
                ) : (
                  <motion.div key="countdown">
                    <PremiumCountdown />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* No BG — inline, immediately under the date box */}
            <div style={{ display: "flex", justifyContent: "center", marginTop: "45px" }}>
              <Image
                src="/images/no-bg.png"
                alt=""
                width={80}
                height={80}
                style={{ width: "min(80px,20vw)", height: "auto", objectFit: "contain" }}
              />
            </div>

          </motion.div>

        </div>

        {/* ════════════════════════════════════════════════
            SECTION 2 — Countdown Timer
        ════════════════════════════════════════════════ */}
        <div style={{
          background: "linear-gradient(175deg, #07190F 0%, #0B2818 48%, #133D22 100%)",
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          padding: "56px 28px 60px",
          position: "relative", overflow: "hidden",
        }}>

          {/* Islamic pattern overlay */}
          <div className="pattern-islamic" style={{ position: "absolute", inset: 0, opacity: 0.28, pointerEvents: "none" }} />

          {/* Radial gold glow */}
          <div style={{
            position: "absolute", top: "50%", left: "50%",
            transform: "translate(-50%,-50%)",
            width: "340px", height: "340px", borderRadius: "50%",
            background: "radial-gradient(circle, rgba(198,149,27,0.07) 0%, transparent 70%)",
            pointerEvents: "none",
          }} />

          {/* ── Content ── */}
          <div style={{ position: "relative", zIndex: 1, textAlign: "center", width: "100%", maxWidth: "420px" }}>

            {/* Top ornamental divider */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0.2 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.0, ease: [0.22,1,0.36,1] }}
              style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "32px" }}
            >
              <div style={{ flex:1, height:"2px", background:"linear-gradient(to right,transparent,rgba(198,149,27,0.75))" }}/>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <rect x="1.5" y="1.5" width="11" height="11"
                  transform="rotate(45 7 7)"
                  stroke="rgba(198,149,27,0.9)" strokeWidth="1.2" fill="none"/>
              </svg>
              <div style={{ flex:1, height:"2px", background:"linear-gradient(to left,transparent,rgba(198,149,27,0.75))" }}/>
            </motion.div>

            {/* Heading — large, bold, single block */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.0, delay: 0.2, ease: "easeOut" }}
              style={{ marginBottom: "36px" }}
            >
              <p style={{
                fontFamily:    "system-ui, Arial, Helvetica, sans-serif",
                fontSize:      "clamp(12px,3.2vw,14px)",
                fontWeight:    700,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color:         "rgba(255,255,255,0.9)",
                marginBottom:  "6px",
              }}>
                Counting Down to
              </p>
              <p style={{
                fontFamily:    "var(--font-playfair,'Playfair Display',Georgia,serif)",
                fontSize:      "clamp(30px,8.5vw,48px)",
                fontWeight:    700,
                color:         "rgba(232,197,71,0.96)",
                letterSpacing: "0.01em",
                lineHeight:    1.15,
                margin:        0,
              }}>
                Our Special Day
              </p>
            </motion.div>

            {/* Countdown boxes — fixed, no flicker */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.0, delay: 0.4, ease: "easeOut" }}
            >
              <PremiumCountdown />
            </motion.div>

            {/* Prominent date */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.65, ease: "easeOut" }}
              style={{ marginTop: "32px" }}
            >
              <p style={{
                fontFamily:    "system-ui, Arial, Helvetica, sans-serif",
                fontSize:      "clamp(17px,4.8vw,24px)",
                fontWeight:    700,
                letterSpacing: "0.16em",
                color:         "#ffffff",
                textTransform: "uppercase",
                marginBottom:  "10px",
              }}>
                25 November 2026
              </p>
              <div style={{ display:"flex", alignItems:"center", gap:"10px", justifyContent:"center" }}>
                <div style={{ flex:1, height:"1px", background:"linear-gradient(to right,transparent,rgba(198,149,27,0.35))" }}/>
                <svg width="6" height="6" viewBox="0 0 6 6" fill="none">
                  <rect x="0.5" y="0.5" width="5" height="5" transform="rotate(45 3 3)" fill="rgba(198,149,27,0.5)"/>
                </svg>
                <div style={{ flex:1, height:"1px", background:"linear-gradient(to left,transparent,rgba(198,149,27,0.35))" }}/>
              </div>
            </motion.div>

          </div>
        </div>

        {/* ════════════════════════════════════════════════
            SECTION 3 — Formal Invitation
        ════════════════════════════════════════════════ */}
        <div style={{
          background: "linear-gradient(180deg, #F2ECE4 0%, #EDE6D8 55%, #E8DFD0 100%)",
          display: "flex", flexDirection: "column",
          alignItems: "center",
          padding: "52px 24px 48px",
          position: "relative", overflow: "hidden",
          direction: "rtl",
        }}>
          {/* Pattern overlay */}
          <div className="pattern-islamic" style={{ position: "absolute", inset: 0, opacity: 0.06, pointerEvents: "none" }} />

          <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: "480px", textAlign: "center" }}>

            {/* ── Arabic poetry — bold, animated reflection ── */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.0, ease: "easeOut" }}
              style={{ display: "flex", justifyContent: "center", marginBottom: "14px" }}
            >
              <Image
                src="/images/9.12.png"
                alt=""
                width={420}
                height={180}
                style={{ width: "min(420px, 90vw)", height: "auto", objectFit: "contain" }}
              />
            </motion.div>

            {/* Gold top divider */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0.2 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.1 }}
              style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "24px", marginBottom: "28px" }}
            >
              <div style={{ flex:1, height:"2px", background:"linear-gradient(to left,transparent,rgba(198,149,27,0.8))" }}/>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <rect x="1" y="1" width="12" height="12" transform="rotate(45 7 7)" stroke="rgba(198,149,27,0.9)" strokeWidth="1.2" fill="none"/>
              </svg>
              <div style={{ flex:1, height:"2px", background:"linear-gradient(to right,transparent,rgba(198,149,27,0.8))" }}/>
            </motion.div>

            {/* ── Middle image ── */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.15 }}
              style={{ display: "flex", justifyContent: "center", width: "100%", marginBottom: "10px" }}
            >
              <Image
                src="/images/Vip.png"
                alt=""
                width={480}
                height={300}
                style={{ width: "min(480px, 92vw)", height: "auto", objectFit: "contain" }}
              />
            </motion.div>

            {/* Elegant ornamental divider — replaces plain dot */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0.3 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.45, ease: [0.22,1,0.36,1] }}
              style={{ display: "flex", alignItems: "center", gap: "8px", width: "100%", maxWidth: "320px", margin: "24px auto 24px" }}
            >
              <div style={{ flex:1, height:"1px", background:"linear-gradient(to right,transparent,rgba(198,149,27,0.45))" }}/>
              <svg width="72" height="14" viewBox="0 0 72 14" fill="none" style={{ flexShrink:0 }}>
                {/* left diamond */}
                <rect x="1.5" y="5" width="6" height="6" transform="rotate(45 4.5 8)" stroke="rgba(198,149,27,0.65)" strokeWidth="0.9" fill="none"/>
                {/* left dot */}
                <circle cx="18" cy="7" r="1.5" fill="rgba(198,149,27,0.45)"/>
                {/* centre star */}
                <circle cx="36" cy="7" r="3" fill="rgba(198,149,27,0.12)" stroke="rgba(198,149,27,0.55)" strokeWidth="0.8"/>
                <circle cx="36" cy="7" r="1.4" fill="rgba(198,149,27,0.8)"/>
                {/* right dot */}
                <circle cx="54" cy="7" r="1.5" fill="rgba(198,149,27,0.45)"/>
                {/* right diamond */}
                <rect x="63.5" y="5" width="6" height="6" transform="rotate(45 66.5 8)" stroke="rgba(198,149,27,0.65)" strokeWidth="0.9" fill="none"/>
              </svg>
              <div style={{ flex:1, height:"1px", background:"linear-gradient(to left,transparent,rgba(198,149,27,0.45))" }}/>
            </motion.div>

            {/* ── Three-column names ── */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.0, delay: 0.5 }}
              style={{
                display:             "grid",
                gridTemplateColumns: "1fr auto 1fr",
                gap:                 "12px 8px",
                alignItems:          "stretch",
                marginTop:           "16px",
                marginBottom:        "12px",
                width:               "100%",
              }}
            >
              {/* Right column — Bride */}
              <div style={{ textAlign: "center" }}>
                <p style={{ fontFamily:"KanzAlMarjaan, AlKanz, Georgia, serif", fontSize:"clamp(11px,2.8vw,13px)", fontWeight:700, color:"rgba(45,25,5,0.82)", lineHeight:1.9, margin:0 }}>
                  البنت العزيزة
                </p>
                <motion.p
                  style={{ fontFamily:"KanzAlMarjaan, AlKanz, Georgia, serif", fontSize:"clamp(34px,9.5vw,50px)", color:"#2D6A1A", fontWeight:700, lineHeight:1.4, margin:"2px 0 4px", letterSpacing:"0.03em", WebkitBoxReflect:"below 2px linear-gradient(transparent 42%, rgba(45,106,26,0.22))" } as React.CSSProperties}
                  animate={{ filter:["brightness(1)","brightness(1.35)","brightness(1)"] }}
                  transition={{ duration:3, repeat:Infinity, ease:"easeInOut" }}
                >
                  زهراء
                </motion.p>
                <p style={{ fontFamily:"KanzAlMarjaan, AlKanz, Georgia, serif", fontSize:"clamp(11px,2.8vw,13px)", fontWeight:700, color:"rgba(45,25,5,0.72)", lineHeight:1.8, margin:0, marginTop:"8px" }}>
                  (حافظ القران)
                </p>
              </div>

              {/* Center — Occasion */}
              <div style={{ textAlign: "center", padding: "0 4px", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", height:"100%" }}>
                <div style={{ flex:1, width:"1px", background:"linear-gradient(to bottom,transparent,rgba(198,149,27,0.5),transparent)", margin:"0 auto 8px" }}/>
                <p style={{ fontFamily:"KanzAlMarjaan, AlKanz, Georgia, serif", fontSize:"clamp(16px,4vw,20px)", fontWeight:700, color:"rgba(45,25,5,0.9)", lineHeight:1.5, margin:0, whiteSpace:"nowrap" }}>
                  ني شادي
                </p>
                <div style={{ flex:1, width:"1px", background:"linear-gradient(to bottom,transparent,rgba(198,149,27,0.5),transparent)", margin:"8px auto 0" }}/>
              </div>

              {/* Left column — Groom */}
              <div style={{ textAlign: "center" }}>
                <p style={{ fontFamily:"KanzAlMarjaan, AlKanz, Georgia, serif", fontSize:"clamp(11px,2.8vw,13px)", fontWeight:700, color:"rgba(45,25,5,0.82)", lineHeight:1.9, margin:0 }}>
                  الولد الاحب
                </p>
                <motion.p
                  style={{ fontFamily:"KanzAlMarjaan, AlKanz, Georgia, serif", fontSize:"clamp(34px,9.5vw,50px)", color:"#2D6A1A", fontWeight:700, lineHeight:1.4, margin:"2px 0 4px", letterSpacing:"0.03em", WebkitBoxReflect:"below 2px linear-gradient(transparent 42%, rgba(45,106,26,0.22))" } as React.CSSProperties}
                  animate={{ filter:["brightness(1)","brightness(1.35)","brightness(1)"] }}
                  transition={{ duration:3, repeat:Infinity, ease:"easeInOut", delay:0.4 }}
                >
                  محمد
                </motion.p>
                <p style={{ fontFamily:"KanzAlMarjaan, AlKanz, Georgia, serif", fontSize:"clamp(11px,2.8vw,13px)", fontWeight:700, color:"rgba(45,25,5,0.72)", lineHeight:1.9, margin:0, marginTop:"8px", whiteSpace:"nowrap" }}>
                  ملا مصطفىٰ بهائي حكيم الدين بهائي سيتامووالا
                </p>
              </div>
            </motion.div>

            {/* Gold bottom divider */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.55 }}
              style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "8px", marginBottom: "16px" }}
            >
              <div style={{ flex:1, height:"2px", background:"linear-gradient(to left,transparent,rgba(198,149,27,0.8))" }}/>
              <div style={{ width:"7px", height:"7px", borderRadius:"50%", background:"rgba(198,149,27,0.9)", flexShrink:0 }}/>
              <div style={{ flex:1, height:"2px", background:"linear-gradient(to right,transparent,rgba(198,149,27,0.8))" }}/>
            </motion.div>

            {/* ── Closing image ── */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.6 }}
              style={{ display: "flex", justifyContent: "center", width: "100%" }}
            >
              <Image
                src="/images/Nah.png"
                alt=""
                width={420}
                height={120}
                style={{ width: "min(200px, 52vw)", height: "auto", objectFit: "contain" }}
              />
            </motion.div>

          </div>
        </div>

        {/* ════════════════════════════════════════════════
            SECTIONS 4-10 — Events, RSVP, Closing
        ════════════════════════════════════════════════ */}
        <WeddingEvents />

      </div>{/* end scrollable container */}
    </motion.div>
  );
}
