"use client";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useRef, useState } from "react";

export default function PassportTicket() {
  const [torn, setTorn] = useState(false);
  const stubY = useMotionValue(0);
  const stubOpacity = useTransform(stubY, [0, 90], [1, 0]);
  const dragging = useRef(false);

  const onDragEnd = () => {
    dragging.current = false;
    if (stubY.get() > 60) {
      animate(stubY, 130, { duration: 0.4, ease: "easeOut" });
      setTimeout(() => setTorn(true), 380);
    } else {
      animate(stubY, 0, { duration: 0.35 });
    }
  };

  return (
    <section
      className="relative py-20 px-4 overflow-hidden"
      style={{ background: "linear-gradient(160deg, var(--emerald-dark), var(--emerald-deep))" }}
    >
      <div className="absolute inset-0 pattern-islamic pointer-events-none" style={{ opacity: 0.3 }} />

      {/* Header */}
      <motion.div
        className="text-center mb-12 relative z-10"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <svg width="160" height="14" viewBox="0 0 160 14" fill="none" className="mx-auto mb-4">
          <line x1="0" y1="7" x2="62" y2="7" stroke="rgba(198,149,27,0.4)" strokeWidth="0.7" />
          <path d="M62 7 Q71 2 80 7 Q89 12 98 7" stroke="rgba(198,149,27,0.6)" strokeWidth="0.9" fill="none" />
          <line x1="98" y1="7" x2="160" y2="7" stroke="rgba(198,149,27,0.4)" strokeWidth="0.7" />
          <circle cx="80" cy="7" r="2" fill="rgba(198,149,27,0.6)" />
        </svg>
        <h2 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(26px,6.5vw,40px)",
          fontWeight: 400,
          color: "var(--cream)",
          fontStyle: "italic",
          letterSpacing: "0.06em",
        }}>
          Passport to Forever
        </h2>
        <p style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(11px,3vw,14px)",
          color: "rgba(198,149,27,0.5)",
          marginTop: "6px",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
        }}>
          {torn ? "Safe travels on your journey together" : "Pull the stub downward to tear"}
        </p>
      </motion.div>

      <div className="relative z-10 flex justify-center">
        <motion.div
          style={{ width: "min(400px, calc(100vw - 32px))" }}
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* ── Main boarding pass ── */}
          <div
            className="rounded-t-2xl overflow-hidden"
            style={{
              background: "linear-gradient(160deg, var(--ivory) 0%, var(--cream) 100%)",
              border: "1px solid rgba(198,149,27,0.35)",
              boxShadow: "0 24px 60px rgba(0,0,0,0.5), 0 4px 12px rgba(0,0,0,0.3)",
            }}
          >
            {/* Gold header strip */}
            <div
              className="px-6 py-3 flex items-center justify-between"
              style={{ background: "linear-gradient(135deg, #8A6210, #C6951B 40%, #D4A82A 70%, #8A6210)" }}
            >
              <div>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(9px,2.2vw,11px)", color: "rgba(250,247,242,0.7)", letterSpacing: "0.25em", textTransform: "uppercase" }}>
                  Boarding Pass
                </p>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(14px,4vw,18px)", color: "var(--ivory)", fontWeight: 500 }}>
                  Mohammad &amp; Zahra
                </p>
              </div>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(250,247,242,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21 4 19 2c-2-2-4-2-5.5-.5L10 5 1.8 6.2c-.5.1-.9.5-.8 1l.5 2c.1.5.5.8 1 .8L7 9.9l-1.8 4.3 2.5 2.5L12 15l.9 4.5c0 .5.3.9.8 1l2 .5c.5.1.9-.3 1-.8z"/>
              </svg>
            </div>

            {/* Route row */}
            <div className="flex items-center justify-between px-6 py-5 border-b" style={{ borderColor: "rgba(198,149,27,0.15)" }}>
              <div className="text-center">
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(8px,2vw,10px)", color: "rgba(61,40,4,0.45)", letterSpacing: "0.22em", textTransform: "uppercase" }}>From</p>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(28px,8vw,42px)", fontWeight: 600, color: "#3d2804", lineHeight: 1, letterSpacing: "-0.02em" }}>♡</p>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(10px,2.5vw,13px)", color: "rgba(61,40,4,0.6)", letterSpacing: "0.08em" }}>Love</p>
              </div>

              <div className="flex flex-col items-center gap-1 flex-1 px-3">
                <div style={{ height: "1px", width: "100%", background: "linear-gradient(to right, rgba(198,149,27,0.3), rgba(198,149,27,0.7), rgba(198,149,27,0.3))" }} />
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(198,149,27,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(8px,2vw,10px)", color: "rgba(198,149,27,0.5)", letterSpacing: "0.1em" }}>Non-stop</p>
              </div>

              <div className="text-center">
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(8px,2vw,10px)", color: "rgba(61,40,4,0.45)", letterSpacing: "0.22em", textTransform: "uppercase" }}>To</p>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(20px,6vw,30px)", fontWeight: 700, color: "#3d2804", lineHeight: 1, letterSpacing: "0.02em" }}>BHR</p>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(10px,2.5vw,13px)", color: "rgba(61,40,4,0.6)", letterSpacing: "0.06em" }}>Bahrain</p>
              </div>
            </div>

            {/* Details grid */}
            <div className="grid grid-cols-2 gap-3 p-5">
              {[
                { label: "Gate",   value: "Love" },
                { label: "Seat",   value: "25.11" },
                { label: "Row",    value: "2026" },
                { label: "Flight", value: "Shifa Meets Hifazat" },
              ].map(item => (
                <div key={item.label} className="p-3 rounded-xl"
                  style={{ background: "rgba(198,149,27,0.06)", border: "1px solid rgba(198,149,27,0.15)" }}>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(8px,2vw,10px)", color: "rgba(61,40,4,0.4)", letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: "3px" }}>
                    {item.label}
                  </p>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(13px,3.5vw,17px)", fontWeight: 600, color: "#3d2804", letterSpacing: "0.02em" }}>
                    {item.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Barcode strip */}
            <div className="flex items-center gap-0.5 px-5 pb-4 opacity-20">
              {Array.from({ length: 34 }, (_, i) => (
                <div key={i} style={{ width: `${1 + (i % 3)}px`, height: "28px", background: "#3d2804", borderRadius: "0.5px" }} />
              ))}
            </div>
          </div>

          {/* ── Perforation ── */}
          <div
            className="relative flex items-center"
            style={{
              background: "linear-gradient(135deg, var(--ivory) 0%, var(--cream) 100%)",
              border: "1px solid rgba(198,149,27,0.35)",
              borderTop: "none",
              borderBottom: "none",
            }}
          >
            {/* Left semi-circle notch */}
            <div style={{ width: "16px", height: "16px", borderRadius: "50%", background: "linear-gradient(160deg, var(--emerald-dark), var(--emerald-deep))", flexShrink: 0, marginLeft: "-9px", border: "1px solid rgba(198,149,27,0.3)" }} />
            {/* Dashed perforation */}
            <div className="flex-1 mx-2 flex items-center justify-between">
              {Array.from({ length: 20 }, (_, i) => (
                <div key={i} style={{ width: "6px", height: "1.5px", background: "rgba(198,149,27,0.5)", borderRadius: "1px" }} />
              ))}
            </div>
            {/* Scissors */}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(198,149,27,0.65)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
              <circle cx="6" cy="6" r="3" /><circle cx="6" cy="18" r="3" />
              <line x1="20" y1="4" x2="8.12" y2="15.88" /><line x1="14.47" y1="14.48" x2="20" y2="20" /><line x1="8.12" y1="8.12" x2="12" y2="12" />
            </svg>
            <div className="flex-1 mx-2 flex items-center justify-between">
              {Array.from({ length: 20 }, (_, i) => (
                <div key={i} style={{ width: "6px", height: "1.5px", background: "rgba(198,149,27,0.5)", borderRadius: "1px" }} />
              ))}
            </div>
            {/* Right notch */}
            <div style={{ width: "16px", height: "16px", borderRadius: "50%", background: "linear-gradient(160deg, var(--emerald-dark), var(--emerald-deep))", flexShrink: 0, marginRight: "-9px", border: "1px solid rgba(198,149,27,0.3)" }} />
          </div>

          {/* ── Draggable stub ── */}
          {!torn ? (
            <motion.div
              drag="y"
              dragConstraints={{ top: 0, bottom: 130 }}
              dragElastic={0.15}
              onDragStart={() => { dragging.current = true; }}
              onDragEnd={onDragEnd}
              style={{ y: stubY, opacity: stubOpacity, cursor: "grab" }}
            >
              <div
                className="rounded-b-2xl overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, var(--ivory) 0%, var(--cream-dark) 100%)",
                  border: "1px solid rgba(198,149,27,0.35)",
                  borderTop: "none",
                  boxShadow: "0 12px 40px rgba(0,0,0,0.4)",
                }}
              >
                <div className="flex items-center justify-between px-5 py-4">
                  <div>
                    <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(8px,2vw,10px)", color: "rgba(61,40,4,0.4)", letterSpacing: "0.22em", textTransform: "uppercase" }}>Passenger</p>
                    <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(14px,4vw,18px)", fontWeight: 600, color: "#3d2804" }}>Mohammad &amp; Zahra</p>
                  </div>
                  <div className="text-center">
                    <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(8px,2vw,10px)", color: "rgba(61,40,4,0.4)", letterSpacing: "0.15em", textTransform: "uppercase" }}>Departure</p>
                    <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(15px,4vw,20px)", fontWeight: 700, color: "#C6951B", letterSpacing: "0.04em" }}>25 · 11 · 26</p>
                  </div>
                </div>
                <div className="pb-3 text-center">
                  <p style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "clamp(9px,2.3vw,11px)",
                    color: "rgba(198,149,27,0.45)",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                  }}>
                    ↓ &nbsp; Pull to tear &nbsp; ↓
                  </p>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              className="mt-5 py-7 text-center rounded-2xl"
              style={{ border: "1px dashed rgba(198,149,27,0.35)", background: "rgba(198,149,27,0.04)" }}
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.55 }}
            >
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(18px,5vw,26px)", color: "var(--gold-light)", fontStyle: "italic" }}>
                Your ticket is confirmed
              </p>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(12px,3vw,15px)", color: "rgba(198,149,27,0.55)", marginTop: "6px", letterSpacing: "0.1em" }}>
                We look forward to welcoming you
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
