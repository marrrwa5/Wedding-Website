"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

interface Props { onDone: () => void; show: boolean; }

const LINES = [
  "Hifz ka noor hai yaha",
  "aur shifa ki barakat bhi hai,",
  "Ek taraf hidayat",
  "aur doosri taraf rehmat bhi hai...",
  "", // couplet break
  "Sajege jab ilm aur shifa",
  "jodi bankar sath sath,",
  "Aasman ke qareeb hogi",
  "jo bhi dua mangege uthakar hath...",
];

/* ── Timing ───────────────────────────────────────── */
const WORD_GAP         = 260;
const LINE_BREAK       = 380;
const COUPLET_BREAK    = 750;
const WORD_FADE_MS     = 900;
const POST_TEXT_PAUSE  = 4000;
/* Top bracket animates in (1.1 s), then text starts */
const WORD_START_OFFSET = 1300;

interface WordEntry { lineIdx: number; wordIdx: number; word: string; delayMs: number; }

function buildEntries(): WordEntry[] {
  const entries: WordEntry[] = [];
  let t = 0;
  LINES.forEach((line, li) => {
    if (line === "") { t += COUPLET_BREAK; return; }
    line.split(" ").forEach((w, wi) => {
      entries.push({ lineIdx: li, wordIdx: wi, word: w, delayMs: t });
      t += WORD_GAP;
    });
    t += LINE_BREAK;
  });
  return entries;
}

const WORD_ENTRIES  = buildEntries();
const LAST_C1_ENTRY = WORD_ENTRIES.filter(e => e.lineIdx === 3).at(-1)!;
const AUTO_ADVANCE_MS =
  WORD_ENTRIES[WORD_ENTRIES.length - 1].delayMs + WORD_START_OFFSET + WORD_FADE_MS + POST_TEXT_PAUSE;

/* ─── Sparkles — pulled in from edges ───────────────── */
const SPARKLES = [
  { x: "10%", y: "12%", s: 3, d: 0.0 },
  { x: "90%", y: "11%", s: 2, d: 0.6 },
  { x: "9%",  y: "42%", s: 4, d: 1.3 },
  { x: "91%", y: "38%", s: 2, d: 0.9 },
  { x: "15%", y: "76%", s: 3, d: 1.9 },
  { x: "85%", y: "70%", s: 2, d: 0.4 },
  { x: "9%",  y: "86%", s: 2, d: 2.2 },
  { x: "91%", y: "82%", s: 3, d: 1.6 },
  { x: "24%", y: "6%",  s: 2, d: 0.8 },
  { x: "76%", y: "7%",  s: 3, d: 1.2 },
  { x: "47%", y: "4%",  s: 2, d: 2.0 },
  { x: "52%", y: "94%", s: 2, d: 0.5 },
  { x: "33%", y: "92%", s: 3, d: 2.6 },
  { x: "67%", y: "91%", s: 2, d: 1.4 },
  { x: "12%", y: "57%", s: 2, d: 2.9 },
  { x: "88%", y: "53%", s: 3, d: 1.0 },
];

/* ─── Firecracker burst ──────────────────────────── */
function FireBurst({ delay = 0, started }: { delay?: number; started: boolean }) {
  const angles = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330];
  return (
    <motion.svg width="34" height="34" viewBox="0 0 54 54" fill="none"
      initial={{ opacity: 0, scale: 0.2 }}
      animate={started ? { opacity: [0, 1, 1, 0], scale: [0.2, 1.1, 0.9, 0.6] } : { opacity: 0 }}
      transition={{ delay, duration: 2.8, repeat: Infinity, repeatDelay: 12 + delay, ease: "easeOut" }}
    >
      {angles.map(a => (
        <line key={a}
          x1="27" y1="27"
          x2={27 + Math.cos(a * Math.PI / 180) * 13}
          y2={27 + Math.sin(a * Math.PI / 180) * 13}
          stroke="rgba(232,197,71,0.8)" strokeWidth="1.3" strokeLinecap="round"
        />
      ))}
      <circle cx="27" cy="27" r="2.5" fill="rgba(255,240,160,0.98)" />
      <circle cx="27" cy="27" r="4" fill="none" stroke="rgba(232,197,71,0.3)" strokeWidth="1" />
    </motion.svg>
  );
}

/* ─── Crescent + star ────────────────────────────── */
function CrescentStar({ flip = false }: { flip?: boolean }) {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none"
      style={{ transform: flip ? "scaleX(-1)" : undefined }}>
      <path d="M30 6 Q15 12 15 24 Q15 36 30 42 Q8 40 6 24 Q4 8 30 6Z"
        fill="rgba(198,149,27,0.78)" />
      <polygon
        points="40,8 41.4,13 46,13 42.3,16 43.7,21 40,18 36.3,21 37.7,16 34,13 38.6,13"
        fill="rgba(232,197,71,0.9)" />
    </svg>
  );
}

/* ─── Diamond rule ───────────────────────────────── */
function DiamondRule() {
  return (
    <div className="flex items-center justify-center my-6">
      <div style={{ flex: 1, height: "0.5px", background: "linear-gradient(to right, transparent, rgba(255,235,180,0.45))" }} />
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ margin: "0 9px", flexShrink: 0 }}>
        <rect x="1.5" y="1.5" width="11" height="11" transform="rotate(45 7 7)"
          stroke="rgba(255,235,180,0.65)" strokeWidth="0.9" fill="rgba(255,235,180,0.07)" />
      </svg>
      <div style={{ flex: 1, height: "0.5px", background: "linear-gradient(to left, transparent, rgba(255,235,180,0.45))" }} />
    </div>
  );
}

/* ─── Leaf arch ornament ─────────────────────────── */
function LeafArch({ flip = false }: { flip?: boolean }) {
  return (
    <svg width="110" height="28" viewBox="0 0 110 28" fill="none"
      className="mx-auto"
      style={{ transform: flip ? "scaleY(-1)" : undefined }}>
      <path d="M5 24 Q55 4 105 24" stroke="rgba(255,235,180,0.38)" strokeWidth="0.8" fill="none" />
      <path d="M55 4 Q50 10 55 14 Q60 10 55 4Z" fill="rgba(255,235,180,0.42)" />
      <circle cx="5"   cy="24" r="1.5" fill="rgba(255,235,180,0.35)" />
      <circle cx="105" cy="24" r="1.5" fill="rgba(255,235,180,0.35)" />
    </svg>
  );
}

/* ─── Neon heartbeat — one continuous line ────────────
   Single unbroken path. No M gaps anywhere.
   Heart: entry (200,68) → left outer arc sweeps wide
   LEFT and dips below baseline → left lobe (183,8) →
   V notch (230,30, connected) → right lobe (277,8) →
   right outer arc mirrors exactly → exit (260,68).
   Open bottom = the 60 px gap between entry/exit.
   Baseline y=68, ViewBox 460×96.
───────────────────────────────────────────────────── */
const HEARTBEAT_PATH =
  /* Left ECG — wider-spaced peaks, shorter end flat */
  "M0,68 L48,68 " +
  "L50,76 L58,22 L66,80 " +
  "L76,68 " +
  "L86,50 L98,68 " +
  "L222,68 " +

  /* D-arc arches, V slightly sharper */
  "C191,60 191,15 207,12 " +
  "C212,5 225,18 230,20 " +
  "C235,18 248,5 253,12 " +
  "C269,15 269,60 238,68 " +

  /* Right ECG — mirror spacing, shorter end flat */
  "L362,68 " +
  "L374,50 L386,68 " +
  "L396,68 " +
  "L398,80 L406,22 L414,76 " +
  "L422,68 L460,68";

const GLOW =
  "drop-shadow(0 0 2px rgba(245,195,60,0.68)) " +
  "drop-shadow(0 0 7px rgba(210,158,30,0.46)) " +
  "drop-shadow(0 0 16px rgba(178,125,18,0.22))";

function NeonECG({ started }: { started: boolean }) {
  return (
    <motion.div
      className="pointer-events-none"
      style={{ marginTop: "14px", display: "flex", justifyContent: "center" }}
      initial={{ opacity: 0 }}
      animate={started ? { opacity: 1 } : { opacity: 0 }}
      transition={{ delay: 1.8, duration: 1.2 }}
    >
      <svg
        viewBox="0 0 460 96"
        fill="none"
        style={{ width: "min(270px, 78vw)", height: "auto", display: "block", overflow: "visible" }}
      >
        {/* Always-visible base — clearly readable at all times */}
        <path
          d={HEARTBEAT_PATH}
          stroke="rgba(215,162,38,0.55)"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
        />
        {/* Smooth golden sweep on top */}
        <motion.path
          d={HEARTBEAT_PATH}
          stroke="rgba(245,195,60,0.92)"
          strokeWidth="3.0"
          fill="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeDasharray="75 1200"
          animate={{ strokeDashoffset: [0, -1275] }}
          transition={{ duration: 7.5, repeat: Infinity, ease: "linear" }}
          style={{ filter: GLOW }}
        />
      </svg>
    </motion.div>
  );
}

/* ─── Main component ─────────────────────────────── */
export default function ProseReveal({ onDone, show }: Props) {
  const [wordVisible, setWordVisible] = useState<boolean[]>(() => WORD_ENTRIES.map(() => false));
  const [showDiv,  setShowDiv]  = useState(false);
  const [started,  setStarted]  = useState(false);

  useEffect(() => {
    if (show && !started) setStarted(true);
  }, [show, started]);

  useEffect(() => {
    if (!started) return;
    /* Words start WORD_START_OFFSET ms after started — bracket animates first */
    const wordTimers = WORD_ENTRIES.map((entry, i) =>
      setTimeout(
        () => setWordVisible(p => { const n = [...p]; n[i] = true; return n; }),
        entry.delayMs + WORD_START_OFFSET
      )
    );
    const divTimer = setTimeout(
      () => setShowDiv(true),
      LAST_C1_ENTRY.delayMs + WORD_START_OFFSET + WORD_FADE_MS + 150
    );
    const advance = setTimeout(onDone, AUTO_ADVANCE_MS);
    return () => {
      wordTimers.forEach(clearTimeout);
      clearTimeout(divTimer);
      clearTimeout(advance);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [started]);

  const entryIndexMap = useMemo(() => {
    const m = new Map<string, number>();
    WORD_ENTRIES.forEach((e, i) => m.set(`${e.lineIdx}-${e.wordIdx}`, i));
    return m;
  }, []);

  const isWordVisible = (li: number, wi: number) =>
    wordVisible[entryIndexMap.get(`${li}-${wi}`) ?? -1] ?? false;

  const lineStyle: React.CSSProperties = {
    fontFamily: "var(--font-playfair), 'Playfair Display', serif",
    fontStyle: "italic",
    fontWeight: 400,
    fontSize: "clamp(17px, 4.5vw, 22px)",
    lineHeight: 1.9,
    letterSpacing: "0.012em",
    textAlign: "center",
    whiteSpace: "nowrap",
    margin: 0,
  };

  const FADE_EASE = [0.4, 0, 0.6, 1] as [number, number, number, number];

  const wordAnimate = (li: number, wi: number) =>
    isWordVisible(li, wi)
      ? { opacity: 1, transition: { duration: WORD_FADE_MS / 1000, ease: FADE_EASE } }
      : { opacity: 0 };

  const renderLine = (li: number, alt: boolean) => {
    const line = LINES[li];
    if (!line) return null;
    const words = line.split(" ");
    return (
      <p key={li} style={{ ...lineStyle, color: !alt ? "rgba(252,244,218,0.96)" : "rgba(228,213,175,0.85)" }}>
        {words.map((word, wi) => (
          <motion.span
            key={wi}
            style={{ display: "inline-block", marginRight: wi < words.length - 1 ? "0.28em" : 0 }}
            initial={{ opacity: 0 }}
            animate={wordAnimate(li, wi)}
          >
            {word}
          </motion.span>
        ))}
      </p>
    );
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
      style={{ pointerEvents: show ? "auto" : "none" }}
      animate={{ opacity: show ? 1 : 0, scale: show ? 1 : 0.93 }}
      transition={{ duration: show ? 1.3 : 0, ease: [0.22, 1, 0.36, 1] }}
      exit={{ opacity: 0, y: -28, transition: { duration: 1.8, ease: "easeInOut" } }}
    >

      {/* ── Floating sparkles ── */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: started ? 1 : 0 }}
        transition={{ duration: 2.0, ease: "easeOut" }}
      >
        {SPARKLES.map((s, i) => (
          <motion.div key={i} className="absolute pointer-events-none"
            style={{ left: s.x, top: s.y }}
            animate={{ opacity: [0, 0.9, 0], y: [0, -14, 0], scale: [0.7, 1.3, 0.7] }}
            transition={{ delay: s.d, duration: 5.5, repeat: Infinity, repeatDelay: 4.0, ease: "easeInOut" }}
          >
            <div style={{
              width: s.s + "px", height: s.s + "px", borderRadius: "50%",
              background: "rgba(255,240,160,0.95)",
              boxShadow: `0 0 ${s.s * 3}px ${s.s}px rgba(198,149,27,0.6)`,
            }} />
          </motion.div>
        ))}
      </motion.div>

      {/* ── Firecracker bursts — pulled in from edges ── */}
      {[
        { style: { left: "8%",  top: "18%" }, delay: 0.4 },
        { style: { right: "8%", top: "18%" }, delay: 2.1 },
        { style: { left: "8%",  bottom: "18%" }, delay: 3.8 },
      ].map((b, i) => (
        <motion.div key={i} className="absolute pointer-events-none" style={b.style}
          animate={{ y: [-5, 5, -5], x: [-3, 3, -3] }}
          transition={{ duration: 8 + i * 0.8, repeat: Infinity, ease: "easeInOut", delay: i * 0.6 }}
        >
          <FireBurst delay={b.delay} started={started} />
        </motion.div>
      ))}

      {/* ── 2026 image — top left ── */}
      <motion.div className="absolute pointer-events-none" style={{ left: "10%", top: "10%" }}
        initial={{ opacity: 0 }} animate={started ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 0.6, duration: 1.4 }}
      >
        <motion.div
          animate={{
            scale: [1, 1.04, 1],
            filter: [
              "drop-shadow(0 0 2px rgba(232,197,71,0.3)) drop-shadow(0 0 5px rgba(232,197,71,0.12))",
              "drop-shadow(0 0 5px rgba(232,197,71,0.5)) drop-shadow(0 0 10px rgba(232,197,71,0.22))",
              "drop-shadow(0 0 2px rgba(232,197,71,0.3)) drop-shadow(0 0 5px rgba(232,197,71,0.12))",
            ],
          }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image src="/images/2026.png" alt="2026" width={72} height={40}
            style={{ width: "min(72px, 16vw)", height: "auto", objectFit: "contain" }} />
        </motion.div>
      </motion.div>

      {/* ── Content ── */}
      <div className="relative z-10 w-full px-4 text-center"
        style={{ maxWidth: "min(520px, 96vw)" }}>

        {/* Bismillah — fixed, high transparency, same animation as bracket */}
        <motion.div className="mb-3 pointer-events-none"
          initial={{ opacity: 0, scaleX: 0.4 }}
          animate={started
            ? { opacity: 0.82, scaleX: 1, transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] } }
            : { opacity: 0, scaleX: 0.4 }}
        >
          <p style={{
            fontFamily: "KanzAlMarjaan, AlKanz, Georgia, serif",
            fontSize: "clamp(15px,4vw,23px)",
            color: "rgba(232,197,71,1)",
            letterSpacing: "0.12em",
            whiteSpace: "nowrap",
            textAlign: "center",
            margin: 0,
            textShadow: "0 0 18px rgba(232,197,71,0.4)",
          }}>
            بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
          </p>
        </motion.div>

        {/* Top bracket — appears FIRST, before any text */}
        <motion.div className="mb-7"
          initial={{ opacity: 0, scaleX: 0.4 }}
          animate={started
            ? { opacity: 1, scaleX: 1, transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] } }
            : { opacity: 0, scaleX: 0.4 }}
        >
          <LeafArch />
        </motion.div>

        {/* Couplet 1 — starts after WORD_START_OFFSET */}
        <div className="flex flex-col items-center">
          {[0, 1, 2, 3].map((li, idx) => renderLine(li, idx % 2 !== 0))}
        </div>

        {/* Diamond rule */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0.15 }}
          animate={showDiv
            ? { opacity: 1, scaleX: 1, transition: { duration: 1.0, ease: [0.22, 1, 0.36, 1] } }
            : { opacity: 0, scaleX: 0.15 }}
        >
          <DiamondRule />
        </motion.div>

        {/* Couplet 2 */}
        <div className="flex flex-col items-center">
          {[5, 6, 7, 8].map((li, idx) => renderLine(li, idx % 2 !== 0))}
        </div>

        {/* Bottom bracket — appears when last word is visible */}
        <motion.div className="mt-7"
          initial={{ opacity: 0 }}
          animate={wordVisible[WORD_ENTRIES.length - 1]
            ? { opacity: 1, transition: { delay: 1.0, duration: 1.2 } }
            : { opacity: 0 }}
        >
          <LeafArch flip />
        </motion.div>

        {/* ECG + heart — sits directly below bottom bracket */}
        <NeonECG started={started} />

      </div>
    </motion.div>
  );
}
