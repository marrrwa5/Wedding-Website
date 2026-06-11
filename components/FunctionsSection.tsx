"use client";
import { motion } from "framer-motion";
import Image from "next/image";

/* ── SVG icon components ── */
function CalIcon({ color }: { color: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}
function PinIcon({ color }: { color: string }) {
  return (
    <svg width="12" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
    </svg>
  );
}
function HeartLine({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 160 28" height="24" className="w-full" style={{ maxWidth: "160px" }}>
      <polyline points="0,14 25,14 32,6 39,22 46,14 60,14 66,4 73,24 80,14 94,14 100,9 107,19 114,14 140,14"
        fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
        style={{ strokeDasharray: 200, animation: "heartbeatLine 2.2s linear infinite" }} />
    </svg>
  );
}

interface Evt {
  id: number;
  name: string;
  nameAr?: string;
  prose: string;
  date: string;
  hijri: string;
  venue: string;
  locationUrl: string;
  image?: string;
  theme: "iraq" | "mehendi" | "kaatha" | "pannat";
}

const events: Evt[] = [
  {
    id: 1, name: "Mithi Shitabi", nameAr: "ميتهي شيتابي",
    prose: "Yahan mohabbat likhi gayi thi roohani qalam se",
    date: "Wednesday, 25 November 2026",
    hijri: "16 Jamadal Ukhra 1448",
    venue: "Burhani Masjid",
    locationUrl: "https://maps.app.goo.gl/rfxjz3b8NN81Vjot6",
    image: "/images/iraq.png", theme: "iraq",
  },
  {
    id: 2, name: "Mehendi", nameAr: "الحنّاء",
    prose: "Ghar ki riwayat se bandha yeh safar, aaj duaoon mein mehek raha hai safar",
    date: "Thursday, 26 November 2026",
    hijri: "17 Jamadal Ukhra 1448",
    venue: "Orchid Plaza, Juffair",
    locationUrl: "https://maps.app.goo.gl/Ei9GpGcJiYEH7VC2A",
    image: "/images/love.png", theme: "mehendi",
  },
  {
    id: 3, name: "Kaatha", nameAr: "كاثا",
    prose: "Do duniya ka Milan, ek nayi zindagi ka aaghaz",
    date: "Friday, 27 November 2026",
    hijri: "18 Jamadal Ukhra 1448",
    venue: "AL Nayyara Hall, Amwaaj Islands",
    locationUrl: "https://share.google/b3bplahDZELe6mBvg",
    image: "/images/4-countries.png", theme: "kaatha",
  },
  {
    id: 4, name: "Pannat", nameAr: "پانّت",
    prose: "Safar yahan mukammal hua magar safar abhi baqi hai",
    date: "Sunday, 29 November 2026",
    hijri: "20 Jamadal Ukhra 1448",
    venue: "Burhani Masjid",
    locationUrl: "https://maps.app.goo.gl/rfxjz3b8NN81Vjot6",
    image: "/images/Grand.png", theme: "pannat",
  },
];

const themes = {
  iraq: {
    bg: "linear-gradient(160deg, #0d1a08 0%, #1a2e10 60%, #0d1a08 100%)",
    accent: "#D4A82A",
    text: "#EDE9E3",
    sub: "rgba(212,168,42,0.7)",
    label: "Karbala · Iraq",
    num: "01",
  },
  mehendi: {
    bg: "linear-gradient(160deg, #0a1a12 0%, #163020 60%, #0a1a12 100%)",
    accent: "#7CB87A",
    text: "#E8F0D8",
    sub: "rgba(124,184,122,0.75)",
    label: "A Love Story",
    num: "02",
  },
  kaatha: {
    bg: "linear-gradient(160deg, #0a0f1a 0%, #12203a 60%, #0a0f1a 100%)",
    accent: "#C6951B",
    text: "#E8DFC8",
    sub: "rgba(198,149,27,0.75)",
    label: "PK · IN · BH · USA",
    num: "03",
  },
  pannat: {
    bg: "linear-gradient(160deg, #140606 0%, #2a1010 60%, #140606 100%)",
    accent: "#C47070",
    text: "#F0E0E0",
    sub: "rgba(196,112,112,0.75)",
    label: "Shifa · Hifazat",
    num: "04",
  },
};

/* Country flags row for Kaatha */
function Countries() {
  const list = [
    { code: "Pakistan", flag: "🇵🇰" },
    { code: "India",    flag: "🇮🇳" },
    { code: "Bahrain",  flag: "🇧🇭" },
    { code: "USA",      flag: "🇺🇸" },
  ];
  return (
    <div className="flex justify-center gap-5 mt-3 mb-1">
      {list.map((c, i) => (
        <motion.div key={c.code} className="flex flex-col items-center gap-1"
          initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ delay: i * 0.1, type: "spring", stiffness: 200 }}>
          <motion.span
            style={{ fontSize: "clamp(20px,5.5vw,30px)", display: "block" }}
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 2.5 + i * 0.4, repeat: Infinity, ease: "easeInOut" }}>
            {c.flag}
          </motion.span>
          <span style={{ color: "rgba(198,149,27,0.65)", fontSize: "clamp(8px,2vw,10px)", letterSpacing: "0.14em", fontFamily: "'Cormorant Garamond', serif" }}>
            {c.code}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

/* Animated mosque icon for Iraq */
function MosqueIcon({ color }: { color: string }) {
  return (
    <motion.div
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      className="mb-3 flex justify-center"
      style={{ opacity: 0.55 }}>
      <svg viewBox="0 0 100 44" width="90" fill="none">
        <rect x="44" y="6" width="12" height="34" fill={color} rx="1"/>
        <path d="M44 6 Q50 0 56 6" fill={color} />
        <circle cx="50" cy="4" r="3" fill={color} />
        <rect x="28" y="18" width="8" height="22" fill={color} opacity="0.6" rx="1"/>
        <path d="M28 18 Q32 12 36 18" fill={color} opacity="0.6"/>
        <rect x="64" y="18" width="8" height="22" fill={color} opacity="0.6" rx="1"/>
        <path d="M64 18 Q68 12 72 18" fill={color} opacity="0.6"/>
        <ellipse cx="50" cy="42" rx="44" ry="5" fill={color} opacity="0.18"/>
      </svg>
    </motion.div>
  );
}

/* Animated leaf/petal row for Mehendi */
function MehendiLeaves({ color }: { color: string }) {
  const petals = ["🌿", "✦", "🌿", "✦", "🌿"];
  return (
    <div className="flex justify-center gap-3 mb-3">
      {petals.map((p, i) => (
        <motion.span key={i}
          style={{ fontSize: i % 2 === 0 ? "16px" : "10px", color, opacity: 0.65 }}
          animate={{ y: [0, -5, 0], rotate: i % 2 === 0 ? [0, 8, 0] : [0, 0, 0] }}
          transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: "easeInOut", delay: i * 0.15 }}>
          {p}
        </motion.span>
      ))}
    </div>
  );
}

export default function FunctionsSection() {
  return (
    <section className="py-20 px-4" style={{ background: "linear-gradient(160deg, var(--emerald-deep), var(--emerald-dark))" }}>
      <div className="absolute left-0 right-0 pointer-events-none" style={{ position: "relative" }}>
        <div className="absolute inset-0 pattern-islamic" style={{ opacity: 0.25 }} />
      </div>

      {/* Section header */}
      <motion.div
        className="text-center mb-14"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <svg width="160" height="14" viewBox="0 0 160 14" fill="none" className="mx-auto mb-4">
          <line x1="0" y1="7" x2="62" y2="7" stroke="rgba(198,149,27,0.5)" strokeWidth="0.8" />
          <path d="M62 7 Q71 2 80 7 Q89 12 98 7" stroke="rgba(198,149,27,0.7)" strokeWidth="1.1" fill="none" />
          <line x1="98" y1="7" x2="160" y2="7" stroke="rgba(198,149,27,0.5)" strokeWidth="0.8" />
          <circle cx="80" cy="7" r="2.5" fill="rgba(198,149,27,0.7)" />
        </svg>
        <h2 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(26px,6.5vw,42px)",
          fontWeight: 700,
          color: "var(--cream)",
          letterSpacing: "0.07em",
          fontStyle: "normal",
        }}>
          Wedding Celebrations
        </h2>
        <p style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontWeight: 600,
          fontSize: "clamp(12px,3.2vw,15px)",
          color: "rgba(198,149,27,0.65)",
          marginTop: "6px",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
        }}>
          Four evenings of joy and blessings
        </p>
      </motion.div>

      <div className="max-w-2xl mx-auto space-y-8">
        {events.map((evt, idx) => {
          const th = themes[evt.theme];
          const accentRgb =
            evt.theme === "iraq"    ? "212,168,42"  :
            evt.theme === "mehendi" ? "124,184,122" :
            evt.theme === "kaatha"  ? "198,149,27"  :
                                      "196,112,112";
          return (
            <motion.article
              key={evt.id}
              className="relative overflow-hidden"
              style={{
                background: th.bg,
                border: `1px solid rgba(${accentRgb},0.32)`,
                boxShadow: "0 24px 60px rgba(0,0,0,0.5)",
                borderRadius: 0,
              }}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: idx * 0.08 }}
              whileHover={{ y: -6, boxShadow: `0 36px 80px rgba(0,0,0,0.65), 0 0 40px rgba(${accentRgb},0.12)` }}
            >
              {/* ── Square image header ── */}
              {evt.image && (
                <div className="relative w-full overflow-hidden" style={{ aspectRatio: "1 / 1" }}>
                  <motion.div className="absolute inset-0"
                    whileHover={{ scale: 1.04 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}>
                    <Image src={evt.image} alt={evt.name} fill className="object-cover object-center" style={{ borderRadius: 0 }} />
                  </motion.div>
                  {/* Gradient fade to card bg */}
                  <div className="absolute inset-0"
                    style={{ background: `linear-gradient(to bottom, rgba(0,0,0,0.18) 0%, ${th.bg.replace("linear-gradient(160deg, ", "").split(" 0%")[0]} 100%)`, pointerEvents: "none" }} />
                  {/* Floating number watermark */}
                  <motion.div
                    className="absolute top-4 right-5"
                    animate={{ y: [0, -12, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(50px,14vw,80px)", color: "rgba(255,255,255,0.09)", fontWeight: 700, lineHeight: 1, pointerEvents: "none" }}>
                    {th.num}
                  </motion.div>
                  {/* Corner accent line */}
                  <div className="absolute bottom-0 left-0 right-0" style={{ height: "2px", background: `linear-gradient(to right, transparent, rgba(${accentRgb},0.6), transparent)` }} />
                </div>
              )}

              <div className="p-6 md:p-8">
                {/* Label chip */}
                <div className="flex items-center gap-3 mb-3">
                  <motion.span
                    style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(9px,2.3vw,11px)", color: th.sub, letterSpacing: "0.25em", textTransform: "uppercase", fontWeight: 600 }}
                    initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                    transition={{ delay: 0.2 }}>
                    {th.label}
                  </motion.span>
                  <div className="h-px flex-1" style={{ background: `linear-gradient(to right, rgba(${accentRgb},0.65), transparent)` }} />
                </div>

                {/* Event name */}
                <motion.h3
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "clamp(28px,7.5vw,44px)",
                    fontWeight: 700,
                    color: th.accent,
                    lineHeight: 1.05,
                    letterSpacing: "0.02em",
                    fontStyle: "normal",
                    marginBottom: "8px",
                  }}
                  initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                  transition={{ delay: 0.15 }}>
                  {evt.name}
                  {evt.nameAr && (
                    <span style={{ fontFamily: "var(--serif-ar)", fontSize: "0.55em", marginRight: "10px", opacity: 0.7, fontStyle: "normal" }}>
                      &ensp;{evt.nameAr}
                    </span>
                  )}
                </motion.h3>

                {/* Prose */}
                <p style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: "italic",
                  fontWeight: 400,
                  fontSize: "clamp(14px,3.8vw,18px)",
                  color: th.text,
                  lineHeight: 1.65,
                  opacity: 0.88,
                  marginBottom: "16px",
                }}>
                  &ldquo;{evt.prose}&rdquo;
                </p>

                {/* Theme extras */}
                {evt.theme === "pannat" && (
                  <div className="mb-4 flex flex-col items-center gap-2">
                    <HeartLine color={th.accent} />
                    <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, fontSize: "clamp(12px,3vw,14px)", color: th.text, opacity: 0.8, fontStyle: "normal", textAlign: "center" }}>
                      May Allah bless this union with Shifa &amp; Hifazat
                    </p>
                  </div>
                )}
                {evt.theme === "kaatha" && <Countries />}
                {evt.theme === "iraq" && <MosqueIcon color={th.accent} />}
                {evt.theme === "mehendi" && <MehendiLeaves color={th.accent} />}

                {/* Divider — clear and visible, pulsing dot */}
                <div className="flex items-center gap-3 my-4">
                  <div className="flex-1 h-px" style={{ background: `linear-gradient(to right, transparent, rgba(${accentRgb},0.75))` }} />
                  <motion.div
                    animate={{ scale: [1, 1.9, 1], opacity: [0.55, 1, 0.55] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    style={{ width: "5px", height: "5px", borderRadius: "50%", background: th.accent, flexShrink: 0 }} />
                  <div className="flex-1 h-px" style={{ background: `linear-gradient(to left, transparent, rgba(${accentRgb},0.75))` }} />
                </div>

                {/* Date & venue */}
                <div className="space-y-2 mb-5">
                  <motion.div className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -8 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.25 }}>
                    <div className="mt-0.5 flex-shrink-0"><CalIcon color={th.accent} /></div>
                    <div>
                      <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, fontSize: "clamp(13px,3.5vw,16px)", color: th.text }}>
                        {evt.date}
                      </p>
                      <p style={{ fontFamily: "var(--serif-ar)", fontSize: "clamp(10px,2.5vw,13px)", color: th.sub }}>
                        {evt.hijri}
                      </p>
                    </div>
                  </motion.div>
                  <motion.div className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -8 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.32 }}>
                    <div className="flex-shrink-0"><PinIcon color={th.accent} /></div>
                    <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, fontSize: "clamp(13px,3.5vw,16px)", color: th.text }}>
                      {evt.venue}
                    </p>
                  </motion.div>
                </div>

                {/* Location link */}
                <motion.a
                  href={evt.locationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3"
                  style={{
                    background: "transparent",
                    border: `1px solid rgba(${accentRgb},0.45)`,
                    color: th.accent,
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 700,
                    fontSize: "clamp(12px,3.2vw,15px)",
                    letterSpacing: "0.14em",
                    textDecoration: "none",
                    textTransform: "uppercase",
                    borderRadius: 0,
                  }}
                  whileHover={{ background: `rgba(${accentRgb},0.1)`, borderColor: `rgba(${accentRgb},0.85)` }}
                  whileTap={{ scale: 0.98 }}
                  animate={{ boxShadow: [`0 0 0px rgba(${accentRgb},0)`, `0 0 14px rgba(${accentRgb},0.18)`, `0 0 0px rgba(${accentRgb},0)`] }}
                  transition={{ boxShadow: { duration: 3, repeat: Infinity, ease: "easeInOut" } }}
                >
                  <PinIcon color={th.accent} />
                  View Directions
                </motion.a>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
