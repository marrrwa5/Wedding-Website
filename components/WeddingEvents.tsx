"use client";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

/* ─── tokens ─────────────────────────────────── */
const GOLD_L    = "#E8C547";
const GOLD      = "#C6951B";
const CREAM     = "rgba(237,229,210,0.95)";
const SERIF_EN  = "var(--font-playfair,'Playfair Display',Georgia,serif)";
const SERIF_AR  = "KanzAlMarjaan, AlKanz, Georgia, serif";
const CORMORANT = "var(--font-cormorant,'Cormorant Garamond',Georgia,serif)";
const DG1 = "#07190F";   /* deep green main */
const DG2 = "#0B2818";   /* deep green mid  */
const DG3 = "#133D22";   /* deep green light*/

/* ─── inView helper (unused NODES/EDGES removed with CountryMap) ── */
type IV = {
  initial:     { opacity: number; y: number };
  whileInView: { opacity: number; y: number };
  viewport:    { once: boolean };
  transition:  { duration: number; delay: number; ease: "easeOut" };
};
function iv(delay = 0, y = 16): IV {
  return {
    initial:     { opacity: 0, y },
    whileInView: { opacity: 1, y: 0 },
    viewport:    { once: true },
    transition:  { duration: 0.85, delay, ease: "easeOut" as const },
  };
}

/* ─── Gold rule ──────────────────────────────── */
function GoldRule({ mb = "12px", w = 1 }: { mb?: string; w?: number }) {
  return (
    <motion.div
      initial={{ scaleX: 0.1, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: mb }}
    >
      <div style={{ flex:1, height:"2px", background:`linear-gradient(to right,transparent,rgba(198,149,27,${w*0.85}))` }}/>
      <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
        <rect x="1" y="1" width="11" height="11" transform="rotate(45 6.5 6.5)"
          stroke={`rgba(198,149,27,${w*0.9})`} strokeWidth="1.2" fill="none"/>
      </svg>
      <div style={{ flex:1, height:"2px", background:`linear-gradient(to left,transparent,rgba(198,149,27,${w*0.85}))` }}/>
    </motion.div>
  );
}

/* ─── Location button — white, bold, no italic ── */
function LocBtn({ url }: { url: string }) {
  return (
    <motion.a
      href={url} target="_blank" rel="noopener noreferrer"
      {...iv(0.48, 6)}
      whileHover={{ scale: 1.04, background: "rgba(255,255,255,0.18)" }}
      whileTap={{ scale: 0.96 }}
      style={{
        display:        "inline-flex", alignItems: "center", gap: "6px",
        padding:        "9px 22px",
        border:         "1px solid rgba(255,255,255,0.55)",
        borderRadius:   "26px",
        color:          "#ffffff",
        fontFamily:     "system-ui, Arial, Helvetica, sans-serif",
        fontSize:       "clamp(11px,3vw,13px)",
        fontWeight:     700,
        fontStyle:      "normal",
        letterSpacing:  "0.08em",
        textDecoration: "none",
        background:     "rgba(255,255,255,0.1)",
        backdropFilter: "blur(6px)",
      }}
    >
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
        <circle cx="12" cy="9" r="2.5"/>
      </svg>
      View Location
    </motion.a>
  );
}

/* ─── Event badge ────────────────────────────── */
function Badge({ num: _num, name }: { num: string; name: string }) {
  return (
    <div style={{ textAlign:"center", marginBottom:"4px" }}>
      <motion.h2 {...iv(0.12, 10)} style={{
        fontFamily: SERIF_EN, fontSize: "clamp(25px,7.5vw,42px)",
        fontWeight: 700, color: GOLD_L, letterSpacing: "0.07em",
        textTransform: "uppercase", lineHeight: 1.0, margin: 0,
        textShadow: "0 0 28px rgba(232,197,71,0.3)",
      }}>{name}</motion.h2>
    </div>
  );
}

/* ─── Event details ──────────────────────────── */
function Details({ date, islamic, venue, url }: {
  date: string; islamic: string; venue: string; url: string;
}) {
  return (
    <div style={{ textAlign:"center" }}>
      <motion.p {...iv(0.2, 6)} style={{
        fontFamily: "system-ui, Arial, Helvetica, sans-serif",
        fontSize: "clamp(15px,4vw,19px)",
        fontWeight: 800, color: "#ffffff",
        letterSpacing: "0.04em", marginBottom: "2px",
        textShadow: "0 1px 12px rgba(0,0,0,0.6)",
      }}>{date}</motion.p>
      <motion.p {...iv(0.26, 5)} style={{
        fontFamily: SERIF_AR, fontSize: "clamp(12px,3vw,14px)",
        color: `rgba(198,149,27,0.8)`, letterSpacing: "0.03em",
        marginBottom: "8px", direction: "rtl",
      }}>{islamic}</motion.p>
      <motion.p {...iv(0.32, 5)} style={{
        fontFamily: "system-ui, Arial, Helvetica, sans-serif",
        fontSize: "clamp(11px,2.8vw,13px)",
        fontWeight: 600, color: "rgba(255,255,255,0.85)",
        letterSpacing: "0.06em", textTransform: "uppercase",
        marginBottom: "16px",
      }}>{venue}</motion.p>
      <LocBtn url={url} />
    </div>
  );
}

/* ═══════════════════════════════════════════════
   SHARED EVENT BANNER
   — full-width, edge-to-edge, no rounded corners
   — all 4 identical in structure
═══════════════════════════════════════════════ */
type CardProps = {
  image?:   string;
  overlay:  string;
  shimmer:  string;
  quote:    string;
  num:      string;
  name:     string;
  date:     string;
  islamic:  string;
  venue:    string;
  url:      string;
  radius?:      string;
  sub?:         React.ReactNode;
  sparkle?:     React.ReactNode;
  nowrapQuote?: boolean;
};

function EventBanner({ image, overlay, shimmer, quote, num, name, date, islamic, venue, url, radius = "0px", sub, sparkle, nowrapQuote }: CardProps) {
  return (
    <section style={{
      position: "relative",
      width: "100%",
      aspectRatio: "1 / 1",
      overflow: "hidden",
      borderRadius: radius,
    }}>
      {image && (
        <Image src={image} alt="" fill priority
          style={{ objectFit: "cover", objectPosition: "center" }} />
      )}
      <div style={{ position:"absolute", inset:0, background:overlay, pointerEvents:"none" }} />
      <motion.div
        style={{ position:"absolute", inset:0, background:shimmer, pointerEvents:"none" }}
        animate={{ opacity:[0.35,1,0.35] }}
        transition={{ duration:4.5, repeat:Infinity, ease:"easeInOut" as const }}
      />
      <div style={{ position:"absolute", inset:"12px", border:"1px solid rgba(198,149,27,0.18)", pointerEvents:"none" }}/>

      {/* Sparkle overlay (Mehendi etc.) */}
      {sparkle && (
        <div style={{ position:"absolute", inset:0, pointerEvents:"none" }}>
          {sparkle}
        </div>
      )}

      {/* Content */}
      <motion.div
        initial={{ opacity:0, y:28, scale:0.97 }}
        whileInView={{ opacity:1, y:0, scale:1 }}
        viewport={{ once:true, amount:0.35 }}
        transition={{ duration:0.85, ease:"easeOut" as const }}
        style={{
          position:"absolute", inset:0,
          display:"flex", flexDirection:"column",
          alignItems:"center", justifyContent:"center",
          padding:"24px", textAlign:"center",
        }}
      >
        <motion.p
          initial={{ opacity:0, y:16 }}
          whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }}
          transition={{ duration:0.75, delay:0.15, ease:"easeOut" as const }}
          style={{
            fontFamily: CORMORANT, fontSize: nowrapQuote ? "clamp(12px,3.2vw,16px)" : "clamp(17px,4.6vw,21px)",
            fontStyle: "italic", fontWeight: 400,
            color: "rgba(255,248,228,0.97)", letterSpacing: "0.03em",
            lineHeight: 1.65, marginBottom: "10px",
            textShadow: "0 1px 14px rgba(0,0,0,0.8)",
            maxWidth: nowrapQuote ? "none" : "min(300px,76vw)",
            whiteSpace: nowrapQuote ? "nowrap" : "normal",
          }}
        >
          &ldquo;{quote}&rdquo;
        </motion.p>

        <GoldRule mb="8px"/>

        <motion.div
          initial={{ opacity:0, scale:0.94 }}
          whileInView={{ opacity:1, scale:1 }}
          viewport={{ once:true }}
          transition={{ duration:0.7, delay:0.25, ease:"easeOut" as const }}
        >
          <Badge num={num} name={name}/>
        </motion.div>

        {/* Sub element — directly under title */}
        {sub && (
          <motion.div
            initial={{ opacity:0, y:8 }}
            whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }}
            transition={{ duration:0.6, delay:0.3, ease:"easeOut" as const }}
            style={{ marginTop:"8px", marginBottom:"4px" }}
          >
            {sub}
          </motion.div>
        )}

        <GoldRule mb="10px"/>

        <motion.div
          initial={{ opacity:0, y:12 }}
          whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }}
          transition={{ duration:0.7, delay:0.35, ease:"easeOut" as const }}
        >
          <Details date={date} islamic={islamic} venue={venue} url={url}/>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   CELEBRATIONS HEADER
═══════════════════════════════════════════════ */
function CelebrationHeader() {
  return (
    <section style={{
      background: "linear-gradient(180deg,#1A3B25 0%,#224830 100%)",
      padding: "44px 28px 36px",
      textAlign: "center",
    }}>
      <motion.h2 {...iv(0.1, 16)} style={{
        fontFamily: SERIF_EN, fontSize: "clamp(28px,8vw,46px)",
        fontWeight: 700, color: GOLD_L, letterSpacing: "0.06em",
        textTransform: "uppercase", lineHeight: 1.05, margin: "0 0 8px",
        textShadow: "0 0 32px rgba(232,197,71,0.22)",
      }}>Our Celebrations</motion.h2>

      <GoldRule mb="14px" w={0.7}/>

      <motion.p {...iv(0.2, 10)} style={{
        fontFamily: "system-ui, Arial, Helvetica, sans-serif",
        fontSize: "clamp(13px,3.4vw,16px)",
        fontWeight: 400,
        color: "rgba(255,255,255,0.9)", letterSpacing: "0.04em", lineHeight: 1.7,
      }}>
        Moments of joy, love &amp; blessings
      </motion.p>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   KAATHA EXTRA — country map
═══════════════════════════════════════════════ */

function KaathaMap() {
  const Y = 36;
  /* wider spacing */
  const USA      = { x:16,  label:"USA",      sub:"home" };
  const Bahrain  = { x:100, label:"Bahrain",  sub:"home" };
  const Pakistan = { x:196, label:"Pakistan", sub:"from" };
  const India    = { x:282, label:"India",    sub:"from" };
  const spots    = [USA, Bahrain, Pakistan, India];

  const LBL  = "system-ui,Arial,sans-serif";
  const GOLD = "rgba(232,197,71,1)";
  const LINE = "rgba(232,197,71,0.45)";

  /* Pink: India → Bahrain (stop) → USA → India loop */
  const pinkX = [India.x-9, Bahrain.x-9, Bahrain.x-9, USA.x-9, India.x-9];
  const pinkY = [Y-20,      Y-30,         Y-30,         Y-20,    Y-20];
  const pinkR = [180,        180,           180,           180,     0];
  const pinkT = [0,          0.30,          0.48,          0.68,    1];

  /* Blue: Pakistan → USA → Bahrain → Pakistan loop */
  const blueX = [Pakistan.x-9, USA.x-9, Bahrain.x-9, Pakistan.x-9];
  const blueY = [Y-32, Y-20, Y-32, Y-32];
  const blueR = [180, 0, 0, 180];
  const blueT = [0, 0.4, 0.68, 1];

  return (
    <div style={{ position:"relative", width:300, height:88, margin:"0 auto" }}>
      <svg width={300} height={56} viewBox="0 0 300 56"
        style={{ position:"absolute", top:0, left:0, overflow:"visible" }}>

        {/* Base connecting line */}
        <line x1={USA.x} y1={Y} x2={India.x} y2={Y} stroke={LINE} strokeWidth="1" strokeDasharray="5,3"/>

        {/* Pink arc: India → Bahrain → USA */}
        <motion.path d={`M${India.x},${Y} Q${190},${4} ${Bahrain.x},${Y} Q${58},${4} ${USA.x},${Y}`}
          fill="none" stroke="rgba(255,144,179,0.45)" strokeWidth="1.2" strokeDasharray="5,3"
          initial={{ pathLength:0 }} whileInView={{ pathLength:1 }}
          viewport={{ once:true }} transition={{ duration:1.5 }}/>

        {/* Blue arc: Pakistan → USA → Bahrain */}
        <motion.path d={`M${Pakistan.x},${Y} Q${108},${-4} ${USA.x},${Y} Q${58},${14} ${Bahrain.x},${Y}`}
          fill="none" stroke="rgba(112,184,255,0.45)" strokeWidth="1.2" strokeDasharray="5,3"
          initial={{ pathLength:0 }} whileInView={{ pathLength:1 }}
          viewport={{ once:true }} transition={{ duration:1.5, delay:0.2 }}/>

        {/* Pulsing dots */}
        {spots.map((s,i) => (
          <g key={s.label}>
            <motion.circle cx={s.x} cy={Y} r={5} fill={GOLD}
              animate={{ r:[5,7.5,5] }} transition={{ duration:2.2, repeat:Infinity, delay:i*0.55 }}/>
            <motion.circle cx={s.x} cy={Y} r={11} fill="none" stroke="rgba(232,197,71,0.38)" strokeWidth="1"
              animate={{ r:[11,20,11], opacity:[0.55,0,0.55] }} transition={{ duration:2.2, repeat:Infinity, delay:i*0.55 }}/>
          </g>
        ))}
      </svg>

      {/* Pink plane: India → Bahrain → USA → India */}
      <motion.div
        animate={{ x:pinkX, y:pinkY, rotate:pinkR }}
        transition={{ duration:8, repeat:Infinity, ease:"easeInOut", times:pinkT }}
        style={{ position:"absolute", top:0, left:0, fontSize:17, color:"#FF90B3", pointerEvents:"none", filter:"drop-shadow(0 0 5px rgba(255,100,160,0.9))" }}
      >✈</motion.div>

      {/* Blue plane: Pakistan → USA → Bahrain → Pakistan */}
      <motion.div
        animate={{ x:blueX, y:blueY, rotate:blueR }}
        transition={{ duration:8, repeat:Infinity, ease:"easeInOut", times:blueT, delay:1.8 }}
        style={{ position:"absolute", top:0, left:0, fontSize:17, color:"#70B8FF", pointerEvents:"none", filter:"drop-shadow(0 0 5px rgba(80,160,255,0.9))" }}
      >✈</motion.div>

      {/* Labels */}
      {spots.map(s => (
        <div key={s.label} style={{ position:"absolute", left:s.x-28, top:Y+14, width:56, textAlign:"center" }}>
          <div style={{ fontFamily:LBL, fontSize:"11px", fontWeight:700, letterSpacing:"0.07em", textTransform:"uppercase", color:"#fff" }}>{s.label}</div>
          <div style={{ fontFamily:LBL, fontSize:"8px", letterSpacing:"0.06em", textTransform:"uppercase", color:"rgba(232,197,71,0.82)", marginTop:"2px" }}>{s.sub}</div>
        </div>
      ))}
    </div>
  );
}
function KaathaFlags() { return <KaathaMap/>; }

/* ─── Mehendi sparkles overlay ─────────────── */
function MehendiSparkles() {
  const orbs = [
    { x:"10%",  y:"12%", r:5,  dur:4.2, delay:0    },
    { x:"80%",  y:"10%", r:4,  dur:5.0, delay:0.8  },
    { x:"20%",  y:"70%", r:6,  dur:3.8, delay:1.4  },
    { x:"76%",  y:"66%", r:4,  dur:4.5, delay:0.5  },
    { x:"48%",  y:"6%",  r:3,  dur:4.8, delay:2.0  },
    { x:"90%",  y:"38%", r:5,  dur:3.6, delay:1.1  },
    { x:"6%",   y:"40%", r:4,  dur:5.2, delay:1.8  },
    { x:"36%",  y:"86%", r:3,  dur:4.0, delay:0.3  },
    { x:"63%",  y:"82%", r:5,  dur:4.6, delay:2.3  },
    { x:"53%",  y:"52%", r:3,  dur:5.5, delay:1.0  },
    { x:"30%",  y:"30%", r:4,  dur:4.3, delay:1.7  },
    { x:"68%",  y:"28%", r:3,  dur:4.9, delay:0.6  },
  ];
  return (
    <>
      {orbs.map((o, i) => (
        <motion.div key={i} style={{
          position:"absolute", left:o.x, top:o.y,
          width:o.r*2, height:o.r*2, borderRadius:"50%",
          background:"radial-gradient(circle, rgba(255,220,120,0.95) 0%, rgba(198,149,27,0.5) 55%, transparent 80%)",
          boxShadow:`0 0 ${o.r*3}px ${o.r}px rgba(220,170,60,0.4)`,
          pointerEvents:"none",
        }}
          animate={{ y:[0,-10,0], opacity:[0.2,0.8,0.2], scale:[0.7,1.2,0.7] }}
          transition={{ duration:o.dur, delay:o.delay, repeat:Infinity, ease:"easeInOut" as const }}
        />
      ))}
    </>
  );
}

/* ═══════════════════════════════════════════════
   PANNAT EXTRA — heartbeat
═══════════════════════════════════════════════ */
function Heartbeat() {
  return (
    <motion.svg width="min(190px,52vw)" height="28" viewBox="0 0 190 28" fill="none"
      initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }}
      transition={{ duration:0.6 }}>
      <motion.path
        d="M0 14 L26 14 L35 3 L44 25 L53 7 L62 21 L71 14 L190 14"
        stroke="rgba(198,149,27,0.82)" strokeWidth="1.8" fill="none"
        strokeLinecap="round" strokeLinejoin="round"
        animate={{ pathLength:[0, 1, 0], opacity:[0.5, 1, 0.5] }}
        transition={{ duration:3.2, repeat:Infinity, ease:"easeInOut" as const }}
      />
    </motion.svg>
  );
}

/* ═══════════════════════════════════════════════
   5 — PASSPORT TO FOREVER  (compact)
═══════════════════════════════════════════════ */
const BARCODE = [
  0.35,0.82,0.5,0.72,0.4,0.88,0.45,0.75,0.3,0.84,
  0.6,0.48,0.9,0.32,0.78,0.55,0.42,0.68,0.38,0.85,
  0.62,0.44,0.76,0.34,0.9,0.5,0.65,0.3,0.8,0.46,
  0.72,0.56,0.38,0.84,0.48,0.7,0.32,0.88,0.44,0.74,
  0.56,0.36,
];

function PassportSection() {
  const [torn, setTorn] = useState(false);
  return (
    <section style={{
      position:"relative", overflow:"hidden",
      display:"flex", flexDirection:"column",
      alignItems:"center", justifyContent:"center",
      background:"linear-gradient(165deg,#F2ECE4 0%,#EDE6D8 55%,#E8DFD0 100%)",
      padding:"38px 24px 36px",
    }}>
      <div className="pattern-islamic" style={{ position:"absolute",inset:0,opacity:0.05,pointerEvents:"none" }}/>

      <motion.h2 {...iv(0.08,16)} style={{ fontFamily:SERIF_EN,fontSize:"clamp(24px,7vw,40px)",fontWeight:700,color:"rgba(139,93,5,0.9)",letterSpacing:"0.06em",textTransform:"uppercase",marginBottom:"22px",textAlign:"center" }}>Passport to Forever</motion.h2>

      <motion.div
        initial={{ opacity:0,y:24 }} whileInView={{ opacity:1,y:0 }} viewport={{ once:true }}
        transition={{ duration:0.85,delay:0.15,ease:"easeOut" as const }}
        style={{ width:"min(340px,calc(100vw - 36px))", position:"relative" }}
      >
        {/* Top stub — tears away */}
        <AnimatePresence>
          {!torn && (
            <motion.div
              exit={{ y:-200,rotate:-7,opacity:0,transition:{ duration:0.6,ease:"easeIn" as const } }}
              style={{ background:"#FFFFFF",borderRadius:"10px 10px 0 0",padding:"18px 18px 14px",boxShadow:"0 -2px 14px rgba(0,0,0,0.25)" }}
            >
              <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"12px" }}>
                <div>
                  <p style={{ fontFamily:SERIF_EN,fontSize:"6px",color:"rgba(90,60,0,0.45)",letterSpacing:"0.28em",textTransform:"uppercase",margin:0 }}>Boarding Pass</p>
                  <p style={{ fontFamily:SERIF_EN,fontSize:"clamp(15px,4.2vw,19px)",fontWeight:700,color:"#3A2800",margin:"2px 0 0",letterSpacing:"0.03em" }}>Mohammad & Zahra</p>
                </div>
                <div style={{ textAlign:"right" }}>
                  <p style={{ fontFamily:SERIF_EN,fontSize:"6px",color:"rgba(90,60,0,0.45)",letterSpacing:"0.28em",textTransform:"uppercase",margin:0 }}>Flight</p>
                  <p style={{ fontFamily:SERIF_EN,fontSize:"clamp(8px,2.2vw,10px)",fontWeight:600,color:"#5A3800",margin:"2px 0 0",maxWidth:"90px",textAlign:"right" }}>Shifa Meets Hifazat</p>
                </div>
              </div>
              <div style={{ display:"flex",justifyContent:"space-between",marginBottom:"12px" }}>
                {[{l:"Destination",v:"BAHRAIN"},{l:"Gate",v:"LOVE"},{l:"Seat",v:"25.11"},{l:"Row",v:"2026"}].map(({ l,v }) => (
                  <div key={l} style={{ textAlign:"center" }}>
                    <p style={{ fontFamily:SERIF_EN,fontSize:"6px",color:"rgba(90,60,0,0.42)",letterSpacing:"0.2em",textTransform:"uppercase",margin:0 }}>{l}</p>
                    <p style={{ fontFamily:SERIF_EN,fontSize:"clamp(9px,2.4vw,12px)",fontWeight:700,color:"#3A2800",margin:"2px 0 0",letterSpacing:"0.05em" }}>{v}</p>
                  </div>
                ))}
              </div>
              <div style={{ display:"flex",gap:"1.5px",height:"22px" }}>
                {BARCODE.map((w,i) => <div key={i} style={{ flex:1,background:`rgba(45,25,0,${w})`,borderRadius:"1px" }}/>)}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Perforated tear line */}
        {!torn && (
          <div style={{ display:"flex",alignItems:"center",background:"#EDD898" }}>
            <div style={{ width:"14px",height:"14px",borderRadius:"50%",flexShrink:0,background:`linear-gradient(135deg,${DG1},${DG2})` }}/>
            <div style={{ flex:1,height:"1.5px",backgroundImage:"repeating-linear-gradient(90deg,rgba(90,60,0,0.4) 0,rgba(90,60,0,0.4) 6px,transparent 6px,transparent 12px)" }}/>
            <div style={{ width:"14px",height:"14px",borderRadius:"50%",flexShrink:0,background:`linear-gradient(135deg,${DG1},${DG2})` }}/>
          </div>
        )}

        {/* Bottom stub — always visible */}
        <div style={{ background:"#FFFFFF",borderRadius:torn?"10px":"0 0 10px 10px",padding:"14px 18px 18px",boxShadow:"0 4px 20px rgba(0,0,0,0.35)" }}>
          <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center" }}>
            <div>
              <p style={{ fontFamily:SERIF_EN,fontSize:"6px",color:"rgba(90,60,0,0.42)",letterSpacing:"0.26em",textTransform:"uppercase",margin:0 }}>Passenger</p>
              <p style={{ fontFamily:SERIF_EN,fontSize:"clamp(11px,3vw,14px)",fontWeight:700,color:"#3A2800",margin:"2px 0 0" }}>Mohammad & Zahra</p>
              <p style={{ fontFamily:SERIF_EN,fontSize:"clamp(8px,2.2vw,10px)",color:"#6A4A00",margin:"2px 0 0" }}>25 · 11 · 2026 · Bahrain</p>
            </div>
            <motion.div animate={{ rotate:[0,2,-2,0] }} transition={{ duration:5,repeat:Infinity,ease:"easeInOut" as const }}
              style={{ width:"50px",height:"50px",borderRadius:"50%",border:"1.5px solid rgba(90,60,0,0.3)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",background:"rgba(198,149,27,0.06)" }}>
              <p style={{ fontFamily:SERIF_EN,fontSize:"5px",color:"rgba(80,50,0,0.55)",letterSpacing:"0.14em",textTransform:"uppercase",textAlign:"center",margin:0,lineHeight:1.6 }}>BAHRAIN{"\n"}◉{"\n"}2026</p>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {!torn ? (
        <motion.button
          initial={{ opacity:0, y:10 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
          transition={{ delay:0.5, ease:"easeOut" as const }}
          onClick={() => setTorn(true)}
          whileHover={{ scale:1.06, background:"rgba(198,149,27,0.35)", boxShadow:"0 0 36px rgba(198,149,27,0.65)" }}
          whileTap={{ scale:0.96 }}
          style={{ marginTop:"24px",padding:"14px 36px",border:"2px solid rgba(101,58,12,0.7)",borderRadius:"32px",background:"rgba(101,58,12,0.82)",color:"#FFFFFF",fontFamily:"system-ui, Arial, Helvetica, sans-serif",fontSize:"clamp(13px,3.2vw,15px)",fontWeight:700,letterSpacing:"0.2em",textTransform:"uppercase",cursor:"pointer",boxShadow:"0 0 18px rgba(198,149,27,0.3)" }}
        >
          ✂ &nbsp;Tear Your Ticket
        </motion.button>
      ) : null}
    </section>
  );
}

/* ═══════════════════════════════════════════════
   RSVP  (tighter layout)
═══════════════════════════════════════════════ */
const WA_LINK = "https://wa.me/97339980752?text=Assalamu%20Alaikum!%0A%0AI%20am%20responding%20to%20the%20wedding%20invitation%20of%20Mohammad%20%26%20Zahra.%0A%0AName:%0AResponse:%20Attending%20/%20Regretfully%20Unable%20to%20Attend%0ANumber%20of%20Guests:%0A%0AThank%20you.";

function RSVPSection() {

  return (
    <section style={{
      position:"relative", overflow:"hidden",
      display:"flex", flexDirection:"column",
      alignItems:"center", justifyContent:"center",
      background:"linear-gradient(170deg,#1A3B25 0%,#224830 52%,#2A5A38 100%)",
      padding:"44px 28px 44px",
    }}>
      <div className="pattern-islamic" style={{ position:"absolute",inset:0,opacity:0.2,pointerEvents:"none" }}/>
      <div style={{ position:"absolute",inset:"12px",border:`1px solid rgba(198,149,27,0.09)`,pointerEvents:"none" }}/>

      <div style={{ position:"relative",zIndex:1,width:"100%",maxWidth:"400px",textAlign:"center" }}>
        <motion.p {...iv(0)} style={{ fontFamily:"system-ui, Arial, Helvetica, sans-serif",fontSize:"clamp(11px,2.8vw,13px)",fontWeight:700,letterSpacing:"0.3em",textTransform:"uppercase",color:"rgba(255,255,255,0.9)",marginBottom:"6px" }}>
          You are cordially invited
        </motion.p>
        <motion.h2 {...iv(0.08,16)} style={{ fontFamily:SERIF_EN,fontSize:"clamp(32px,9.5vw,52px)",fontWeight:700,color:GOLD_L,letterSpacing:"0.07em",textTransform:"uppercase",marginBottom:"4px",lineHeight:1.0,textShadow:`0 0 32px rgba(232,197,71,0.22)` }}>
          RSVP
        </motion.h2>
        <GoldRule mb="22px"/>

        <motion.div {...iv(0.28)} style={{ display:"flex",flexDirection:"column",gap:"12px" }}>
          <motion.button whileHover={{ scale:1.03, boxShadow:"0 6px 24px rgba(198,149,27,0.45)" }} whileTap={{ scale:0.97 }} onClick={() => window.open(WA_LINK, "_blank")}
            style={{ padding:"14px 22px",background:`linear-gradient(135deg,#C6951B,#D4A82A)`,border:"none",borderRadius:"7px",color:"#ffffff",fontFamily:"system-ui, Arial, Helvetica, sans-serif",fontSize:"clamp(13px,3.2vw,15px)",fontWeight:700,letterSpacing:"0.15em",textTransform:"uppercase",cursor:"pointer",boxShadow:"0 4px 16px rgba(198,149,27,0.35)" }}>
            ✓ &nbsp;Joyfully Accepted
          </motion.button>
          <motion.button whileHover={{ background:"rgba(255,255,255,0.08)",borderColor:"rgba(255,255,255,0.6)" }} whileTap={{ scale:0.97 }} onClick={() => window.open(WA_LINK, "_blank")}
            style={{ padding:"14px 22px",background:"transparent",border:"1px solid rgba(255,255,255,0.3)",borderRadius:"7px",color:"rgba(255,255,255,0.85)",fontFamily:"system-ui, Arial, Helvetica, sans-serif",fontSize:"clamp(13px,3.2vw,15px)",fontWeight:700,letterSpacing:"0.15em",textTransform:"uppercase",cursor:"pointer" }}>
            Regretfully Decline
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   CLOSING  (warm dark green, refined hierarchy)
═══════════════════════════════════════════════ */
function ClosingSection() {
  return (
    <section style={{
      position:"relative", overflow:"hidden",
      display:"flex", flexDirection:"column",
      alignItems:"center", justifyContent:"center",
      background:"linear-gradient(170deg,#F2ECE4 0%,#EDE6D8 60%,#E8DFD0 100%)",
      padding:"64px 32px 52px",
    }}>

      {/* ── Islamic background pattern — full section, very light ── */}
      <div className="pattern-islamic" style={{ position:"absolute", inset:0, opacity:1, pointerEvents:"none" }}/>

      {/* ── Islamic pattern corner decoration ── */}
      {["top:0,left:0","top:0,right:0,scaleX(-1)","bottom:0,left:0,scaleY(-1)","bottom:0,right:0,scale(-1,-1)"].map((pos,i) => {
        const s = pos.split(",");
        const style: React.CSSProperties = { position:"absolute", opacity:0.12, pointerEvents:"none",
          ...(s[0].includes("top") ? {top:0} : {bottom:0}),
          ...(s[1].includes("left") ? {left:0} : {right:0}),
          ...(s[2] ? {transform:s[2]} : {}),
        };
        return (
          <svg key={i} style={style} width="110" height="110" viewBox="0 0 110 110" fill="none">
            <g transform="translate(0,0)" stroke="rgba(139,93,5,1)" strokeWidth="0.7" fill="none">
              {/* 8-pointed star */}
              <g transform="translate(28,28)">
                <polygon points="0,-18 4.6,-4.6 18,0 4.6,4.6 0,18 -4.6,4.6 -18,0 -4.6,-4.6" stroke="rgba(139,93,5,0.9)" strokeWidth="0.8"/>
                <polygon points="0,-18 4.6,-4.6 18,0 4.6,4.6 0,18 -4.6,4.6 -18,0 -4.6,-4.6" transform="rotate(45)" stroke="rgba(139,93,5,0.6)" strokeWidth="0.6"/>
                <circle r="5" stroke="rgba(139,93,5,0.7)" strokeWidth="0.7"/>
              </g>
              {/* interlace lines */}
              <line x1="0" y1="28" x2="56" y2="28" strokeWidth="0.5" opacity="0.5"/>
              <line x1="28" y1="0" x2="28" y2="56" strokeWidth="0.5" opacity="0.5"/>
              <line x1="8" y1="8" x2="48" y2="48" strokeWidth="0.4" opacity="0.35"/>
              <line x1="48" y1="8" x2="8" y2="48" strokeWidth="0.4" opacity="0.35"/>
              {/* small star at corner */}
              <g transform="translate(70,12)">
                <polygon points="0,-8 2,-2 8,0 2,2 0,8 -2,2 -8,0 -2,-2" stroke="rgba(139,93,5,0.7)" strokeWidth="0.6"/>
              </g>
              <g transform="translate(12,70)">
                <polygon points="0,-8 2,-2 8,0 2,2 0,8 -2,2 -8,0 -2,-2" stroke="rgba(139,93,5,0.7)" strokeWidth="0.6"/>
              </g>
              {/* border arcs */}
              <path d="M0,55 Q14,42 28,55 Q42,68 56,55" strokeWidth="0.5" opacity="0.4"/>
              <path d="M55,0 Q42,14 55,28 Q68,42 55,56" strokeWidth="0.5" opacity="0.4"/>
            </g>
          </svg>
        );
      })}

      <div style={{ position:"relative",zIndex:1,textAlign:"center",maxWidth:"460px" }}>
        <GoldRule mb="28px"/>

        <motion.p {...iv(0.08)} style={{ fontFamily:SERIF_AR,fontSize:"clamp(20px,6vw,30px)",fontWeight:700,color:"rgba(139,93,5,0.85)",direction:"rtl",letterSpacing:"0.04em",lineHeight:1.8,marginBottom:"22px" }}>
          الحمدلله رب العالمين
        </motion.p>

        <GoldRule mb="22px" w={0.6}/>

        <motion.p {...iv(0.18,12)} style={{
          fontFamily:    CORMORANT,
          fontSize:      "clamp(30px,8.5vw,46px)",
          fontStyle:     "italic",
          fontWeight:    900,
          color:         "#3B2008",
          letterSpacing: "0.02em",
          lineHeight:    1.05,
          marginBottom:  "0px",
        }}>
          Come with your smiles
        </motion.p>
        <motion.p {...iv(0.2,10)} style={{
          fontFamily:    CORMORANT,
          fontSize:      "clamp(30px,8.5vw,46px)",
          fontStyle:     "italic",
          fontWeight:    900,
          color:         "#3B2008",
          letterSpacing: "0.02em",
          lineHeight:    1.05,
          marginBottom:  "22px",
        }}>
          and blessings
        </motion.p>

        <motion.p {...iv(0.28,10)} style={{
          fontFamily:    "system-ui, Arial, Helvetica, sans-serif",
          fontSize:      "clamp(15px,4vw,20px)",
          fontStyle:     "normal",
          fontWeight:    400,
          color:         "#5C3A1E",
          letterSpacing: "0.01em",
          lineHeight:    1.6,
          marginBottom:  "24px",
        }}>
          Your presence is the most meaningful<br/>gift to us.
        </motion.p>

        <GoldRule mb="28px" w={0.5}/>

        {/* Hosted by */}
        <motion.p {...iv(0.5,8)} style={{
          fontFamily:    CORMORANT,
          fontSize:      "clamp(30px,8.5vw,46px)",
          fontWeight:    700,
          fontStyle:     "italic",
          letterSpacing: "0.04em",
          color:         "rgba(139,93,5,0.9)",
          marginBottom:  "28px",
        }}>
          Joyfully Hosted by
        </motion.p>

        {/* Host 1 */}
        <motion.div {...iv(0.56,10)} style={{ marginBottom:"10px" }}>
          <p style={{
            fontFamily:    "system-ui, Arial, Helvetica, sans-serif",
            fontSize:      "clamp(15px,4vw,20px)",
            fontWeight:    400,
            color:         "#2C1A08",
            letterSpacing: "0em",
            lineHeight:    1.5,
            margin:        0,
          }}>
            Mrs & Mr Khairunnisa bai
          </p>
          <p style={{
            fontFamily:    "system-ui, Arial, Helvetica, sans-serif",
            fontSize:      "clamp(15px,4vw,20px)",
            fontWeight:    400,
            color:         "#2C1A08",
            letterSpacing: "0em",
            lineHeight:    1.5,
            margin:        "2px 0 0",
          }}>
            and Shk Hakimuddin bhai Kothriwala
          </p>
        </motion.div>

        <GoldRule mb="10px" w={0.4}/>

        {/* Host 2 */}
        <motion.div {...iv(0.64,10)} style={{ marginBottom:"10px" }}>
          <p style={{
            fontFamily:    "system-ui, Arial, Helvetica, sans-serif",
            fontSize:      "clamp(15px,4vw,20px)",
            fontWeight:    400,
            color:         "#2C1A08",
            letterSpacing: "0em",
            lineHeight:    1.5,
            margin:        0,
          }}>
            Mrs and Mr Farida bai
          </p>
          <p style={{
            fontFamily:    "system-ui, Arial, Helvetica, sans-serif",
            fontSize:      "clamp(15px,4vw,20px)",
            fontWeight:    400,
            color:         "#2C1A08",
            letterSpacing: "0em",
            lineHeight:    1.5,
            margin:        "2px 0 0",
          }}>
            and Shk Husain bhai Kothriwala
          </p>
        </motion.div>

        <GoldRule mb="10px" w={0.4}/>

        {/* Host 3 */}
        <motion.div {...iv(0.72,10)} style={{ marginBottom:"32px" }}>
          <p style={{
            fontFamily:    "system-ui, Arial, Helvetica, sans-serif",
            fontSize:      "clamp(15px,4vw,20px)",
            fontWeight:    400,
            color:         "#2C1A08",
            letterSpacing: "0em",
            lineHeight:    1.5,
            margin:        0,
          }}>
            Mrs and Mr Sakina bai
          </p>
          <p style={{
            fontFamily:    "system-ui, Arial, Helvetica, sans-serif",
            fontSize:      "clamp(15px,4vw,20px)",
            fontWeight:    400,
            color:         "#2C1A08",
            letterSpacing: "0em",
            lineHeight:    1.5,
            margin:        "2px 0 0",
          }}>
            and Mohammad Shk Hakimuddin Kothriwala
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Between-function divider ───────────────── */
function FuncDivider() {
  return (
    <div style={{
      background: DG1,
      padding: "10px 28px",
      display: "flex", alignItems: "center", gap: "10px",
    }}>
      <div style={{ flex:1, height:"2px", background:"linear-gradient(to right,transparent,rgba(198,149,27,0.8))" }}/>
      <svg width="52" height="10" viewBox="0 0 52 10" fill="none" style={{ flexShrink:0 }}>
        <rect x="1" y="3" width="6" height="6" transform="rotate(45 4 6)" stroke="rgba(198,149,27,0.9)" strokeWidth="1.2" fill="none"/>
        <circle cx="26" cy="5" r="2.2" fill="rgba(198,149,27,0.9)"/>
        <rect x="45" y="3" width="6" height="6" transform="rotate(45 48 6)" stroke="rgba(198,149,27,0.9)" strokeWidth="1.2" fill="none"/>
      </svg>
      <div style={{ flex:1, height:"2px", background:"linear-gradient(to left,transparent,rgba(198,149,27,0.8))" }}/>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   EXPORT
═══════════════════════════════════════════════ */
export default function WeddingEvents() {
  return (
    <>
      <CelebrationHeader />

      <EventBanner
        image="/images/shitabi.png"
        overlay="linear-gradient(180deg,rgba(10,5,0,0.28) 0%,rgba(35,16,0,0.52) 45%,rgba(10,5,0,0.88) 100%)"
        shimmer="radial-gradient(ellipse 80% 32% at 50% 78%,rgba(198,149,27,0.07) 0%,transparent 70%)"
        quote="Yahan mohabbat likhi gayi thi roohani qalam se"
        num="01" name="MITHI SHITABI"
        date="Wed, 25th November"
        islamic="١٦ جمادى الآخرة"
        venue="Burhani Masjid"
        url="https://maps.app.goo.gl/rfxjz3b8NN81Vjot6?g_st=ac"
      />

      <FuncDivider />

      <EventBanner
        image="/images/mehendi.png"
        overlay="linear-gradient(180deg,rgba(8,3,2,0.28) 0%,rgba(28,10,5,0.55) 45%,rgba(8,3,2,0.9) 100%)"
        shimmer="radial-gradient(ellipse 70% 30% at 50% 80%,rgba(220,140,80,0.06) 0%,transparent 70%)"
        quote="Ghar ki riwayat se bandha yeh safar, aaj duaoon mein mehek raha hai safar"
        num="02" name="MEHENDI"
        date="Thursday, 26th November"
        islamic="١٧ جمادى الآخرة"
        venue="Orchid Plaza, Juffair"
        url="https://maps.app.goo.gl/Ei9GpGcJiYEH7VC2A?g_st=iw"
        sparkle={<MehendiSparkles />}
      />

      <FuncDivider />

      <EventBanner
        image="/images/kaatha.png"
        overlay="linear-gradient(180deg,rgba(2,4,18,0.28) 0%,rgba(8,14,40,0.58) 45%,rgba(2,4,18,0.9) 100%)"
        shimmer="radial-gradient(ellipse 70% 28% at 50% 22%,rgba(198,149,27,0.06) 0%,transparent 65%)"
        quote="Do duniya ka Milan, ek nayi zindagi ka aaghaz" nowrapQuote
        num="03" name="KAATHA"
        date="Friday, 27th November"
        islamic="١٨ جمادى الآخرة"
        venue="AL Nayyara Hall, Amwaaj Islands"
        url="https://share.google/b3bplahDZELe6mBvg"
        sub={<KaathaFlags />}
      />

      <FuncDivider />

      <EventBanner
        image="/images/Grand.png"
        overlay="linear-gradient(180deg,rgba(0,8,4,0.22) 0%,rgba(0,14,8,0.55) 45%,rgba(0,8,4,0.88) 100%)"
        shimmer="radial-gradient(ellipse 70% 28% at 50% 20%,rgba(198,149,27,0.05) 0%,transparent 65%)"
        quote="Safar yahan mukammal hua magar safar abhi baqi hai"
        num="04" name="PANNAT"
        date="Sunday, 29th November"
        islamic="٢٠ جمادى الآخرة"
        venue="Burhani Masjid"
        url="https://maps.app.goo.gl/rfxjz3b8NN81Vjot6?g_st=ac"
        sub={<Heartbeat />}
      />

      <PassportSection />
      <RSVPSection />
      <ClosingSection />
    </>
  );
}

