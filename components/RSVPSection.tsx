"use client";
import { motion } from "framer-motion";

const WA_LINK = "https://wa.me/97339980752?text=Assalamu%20Alaikum!%0A%0AI%20am%20responding%20to%20the%20wedding%20invitation%20of%20Mohammad%20%26%20Zahra.%0A%0AName:%0AResponse:%20Attending%20/%20Regretfully%20Unable%20to%20Attend%0ANumber%20of%20Guests:%0A%0AThank%20you.";

export default function RSVPSection() {

  return (
    <section
      className="relative py-24 px-4 overflow-hidden safe-bottom"
      style={{ background: "linear-gradient(160deg, #F7F2EC 0%, #EDE9E3 60%, #E8DFD0 100%)" }}
    >
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 pattern-islamic pointer-events-none" style={{ opacity: 0.06 }} />
      {/* Soft warm radial glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 70% 60% at 50% 40%, rgba(198,149,27,0.07) 0%, transparent 100%)" }} />

      <div className="relative z-10 max-w-md mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <svg width="160" height="14" viewBox="0 0 160 14" fill="none" className="mx-auto mb-4">
            <line x1="0" y1="7" x2="62" y2="7" stroke="rgba(198,149,27,0.5)" strokeWidth="0.8" />
            <path d="M62 7 Q71 2 80 7 Q89 12 98 7" stroke="rgba(198,149,27,0.75)" strokeWidth="1" fill="none" />
            <line x1="98" y1="7" x2="160" y2="7" stroke="rgba(198,149,27,0.5)" strokeWidth="0.8" />
            <circle cx="80" cy="7" r="2.2" fill="rgba(198,149,27,0.75)" />
          </svg>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(28px,7vw,46px)",
            fontWeight: 700,
            color: "#3D2B1F",
            fontStyle: "normal",
            letterSpacing: "0.1em",
          }}>
            RSVP
          </h2>
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 600,
            fontSize: "clamp(11px,3vw,13px)",
            color: "rgba(198,149,27,0.8)",
            marginTop: "6px",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}>
            Kindly respond by 15 November 2026
          </p>
        </motion.div>

        {/* Card */}
        <motion.div
          className="rounded-2xl p-7 md:p-9"
          style={{
            background: "rgba(255,255,255,0.72)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(198,149,27,0.28)",
            boxShadow: "0 12px 48px rgba(61,43,31,0.12), 0 2px 8px rgba(198,149,27,0.1)",
          }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.7 }}
        >

          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 600,
            fontSize: "clamp(10px,2.5vw,12px)",
            color: "rgba(61,43,31,0.55)",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            marginBottom: "10px",
          }}>
            Will you join us?
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <motion.button
              onClick={() => window.open(WA_LINK, "_blank")}
              className="flex-1 py-3.5 px-4 rounded-xl"
              style={{
                background: "linear-gradient(135deg, #C6951B, #D4A82A)",
                border: "none",
                color: "#FFF8EE",
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 700,
                fontSize: "clamp(13px,3.5vw,16px)",
                letterSpacing: "0.08em",
                cursor: "pointer",
                boxShadow: "0 4px 16px rgba(198,149,27,0.35)",
              }}
              whileHover={{ scale: 1.02, boxShadow: "0 6px 22px rgba(198,149,27,0.45)" }}
              whileTap={{ scale: 0.97 }}
            >
              Joyfully Accepted
            </motion.button>

            <motion.button
              onClick={() => window.open(WA_LINK, "_blank")}
              className="flex-1 py-3.5 px-4 rounded-xl"
              style={{
                background: "transparent",
                border: "1px solid rgba(61,43,31,0.25)",
                color: "rgba(61,43,31,0.65)",
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 600,
                fontSize: "clamp(13px,3.5vw,16px)",
                letterSpacing: "0.08em",
                cursor: "pointer",
              }}
              whileHover={{ background: "rgba(61,43,31,0.05)", borderColor: "rgba(61,43,31,0.45)" }}
              whileTap={{ scale: 0.97 }}
            >
              Regretfully Decline
            </motion.button>
          </div>

          <p style={{
            textAlign: "center",
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(9px,2.3vw,11px)",
            color: "rgba(61,43,31,0.35)",
            marginTop: "10px",
            letterSpacing: "0.1em",
          }}>
            Response sent via WhatsApp
          </p>
        </motion.div>

        {/* Closing message */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25, duration: 0.8 }}
          style={{ maxWidth: "360px", margin: "64px auto 0" }}
        >
          {/* Ornament */}
          <svg width="120" height="14" viewBox="0 0 120 14" fill="none" className="mx-auto mb-8">
            <line x1="0" y1="7" x2="44" y2="7" stroke="rgba(198,149,27,0.45)" strokeWidth="0.7" />
            <circle cx="60" cy="7" r="2.8" fill="rgba(198,149,27,0.55)" />
            <line x1="76" y1="7" x2="120" y2="7" stroke="rgba(198,149,27,0.45)" strokeWidth="0.7" />
            <circle cx="44" cy="7" r="1.4" fill="rgba(198,149,27,0.4)" />
            <circle cx="76" cy="7" r="1.4" fill="rgba(198,149,27,0.4)" />
          </svg>

          {/* Blessing + presence + no-gifts — one cohesive block */}
          <div style={{ textAlign: "center", marginBottom: "28px" }}>
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
              fontWeight: 500,
              fontSize: "clamp(18px,4.8vw,22px)",
              color: "#3D2B1F",
              lineHeight: 1.55,
              marginBottom: "4px",
            }}>
              Come with your smiles
            </p>
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
              fontWeight: 500,
              fontSize: "clamp(18px,4.8vw,22px)",
              color: "#3D2B1F",
              lineHeight: 1.55,
              marginBottom: "12px",
            }}>
              and blessings
            </p>
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(15px,4vw,18px)",
              color: "rgba(61,43,31,0.72)",
              lineHeight: 1.6,
              marginBottom: "8px",
            }}>
              Your presence is the most meaningful gift to us.
            </p>
          </div>

          {/* Divider */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-16" style={{ background: "linear-gradient(to right, transparent, rgba(198,149,27,0.5))" }} />
            <span style={{ color: "rgba(198,149,27,0.6)", fontSize: "12px" }}>✦</span>
            <div className="h-px w-16" style={{ background: "linear-gradient(to left, transparent, rgba(198,149,27,0.5))" }} />
          </div>

          {/* Names */}
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 600,
            fontSize: "clamp(15px,4vw,18px)",
            color: "rgba(61,43,31,0.65)",
            letterSpacing: "0.14em",
            marginBottom: "12px",
          }}>
            — Mohammad &amp; Zahra —
          </p>

          {/* Arabic blessing */}
          <p style={{
            fontFamily: "var(--serif-ar)",
            fontSize: "clamp(17px,4.5vw,21px)",
            color: "rgba(198,149,27,0.7)",
            lineHeight: 1.7,
          }}>
            بارك الله لهما وبارك عليهما
          </p>
        </motion.div>
      </div>
    </section>
  );
}
