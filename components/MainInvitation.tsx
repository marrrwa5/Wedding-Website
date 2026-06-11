"use client";
import { motion, type Variants } from "framer-motion";
import Image from "next/image";

/* Staggered line reveal container */
const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.18 } },
};
const lineReveal: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
};

function RevealLine({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <motion.div variants={lineReveal} style={style}>
      {children}
    </motion.div>
  );
}

/* Ornamental SVG divider */
function OrnDivider({ gold = false }: { gold?: boolean }) {
  const c = gold ? "rgba(198,149,27,0.7)" : "rgba(198,149,27,0.4)";
  return (
    <svg width="220" height="18" viewBox="0 0 220 18" fill="none" className="mx-auto">
      <line x1="0" y1="9" x2="88" y2="9" stroke={c} strokeWidth="0.8" />
      <path d="M88 9 Q99 3 110 9 Q121 15 132 9" stroke={c} strokeWidth="0.9" fill="none" />
      <line x1="132" y1="9" x2="220" y2="9" stroke={c} strokeWidth="0.8" />
      <circle cx="110" cy="9" r="2.5" fill={c} />
      <circle cx="0" cy="9" r="1.5" fill={c} />
      <circle cx="220" cy="9" r="1.5" fill={c} />
    </svg>
  );
}

export default function MainInvitation() {
  return (
    <motion.section
      className="relative w-full overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
    >
      {/* ── Background ── */}
      <div className="fixed inset-0 -z-10">
        <Image src="/images/bg.png" alt="Background" fill className="object-cover object-center" priority />
        {/* Rich emerald overlay — layered */}
        <div className="absolute inset-0"
          style={{ background: "linear-gradient(160deg, rgba(7,25,15,0.82) 0%, rgba(11,40,24,0.72) 50%, rgba(7,25,15,0.88) 100%)" }} />
        <div className="absolute inset-0 pattern-islamic" style={{ opacity: 0.25 }} />
        {/* Warm gold vignette top */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-96 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(198,149,27,0.08) 0%, transparent 70%)" }} />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-5 py-16 text-center">

        {/* ── Main.png header ── */}
        <motion.div
          className="flex justify-center mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          <Image
            src="/images/main.png"
            alt=""
            width={300}
            height={110}
            className="object-contain blend-screen"
            style={{ maxWidth: "min(300px,80vw)", height: "auto" }}
          />
        </motion.div>

        {/* الحمد لله */}
        <motion.p
          className="rtl mb-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          style={{
            fontFamily: "var(--serif-ar)",
            fontSize: "clamp(16px,4.5vw,22px)",
            color: "var(--gold-light)",
          }}
        >
          الحمد لله ، شكرًا لله
        </motion.p>

        <motion.div className="my-5" initial={{ scaleX: 0, opacity: 0 }} animate={{ scaleX: 1, opacity: 1 }} transition={{ delay: 0.8, duration: 0.7 }}>
          <OrnDivider gold />
        </motion.div>

        {/* ── Animated text block ── */}
        <motion.div
          className="rtl space-y-4 text-right"
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          style={{ direction: "rtl" }}
        >
          <RevealLine style={{ fontFamily: "var(--serif-ar)", fontSize: "clamp(13px,3.6vw,18px)", color: "var(--cream)", lineHeight: 1.9 }}>
            سيد الشهداء الامام الحسين ع م ني ذكر نا كراونار{" "}
            <strong style={{ color: "var(--gold-light)" }}>سيدنا ومولانا</strong>
            {" "}ابو جعفر الصادق عالي قدر مفضل سيف الدين اطال الله عمره الشريف الى يوم الدين
          </RevealLine>

          <RevealLine style={{ fontFamily: "var(--serif-ar)", fontSize: "clamp(12px,3.3vw,17px)", color: "var(--cream-dark)", lineHeight: 1.9 }}>
            نا سبب{" "}
            <strong style={{ color: "var(--gold-light)" }}>مؤمنين نو محل ككهنو بلند</strong>
            {" "}؛ ، يه الامام الحسين ع م ني ذكر كروا سي جه بلندي هم غلامو انسس بانديو نسس حاصل تهئي ؛ ،
          </RevealLine>

          <RevealLine style={{ fontFamily: "var(--serif-ar)", fontSize: "clamp(14px,4vw,19px)", color: "var(--gold)", letterSpacing: "0.04em" }}>
            اهنا طفيل ما،
          </RevealLine>
        </motion.div>

        <div className="my-6"><OrnDivider /></div>

        {/* ── Three-column couple names ── */}
        <motion.div
          className="grid grid-cols-3 gap-2 items-center text-center"
          style={{ direction: "rtl" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.9 }}
        >
          {/* Right — Bride */}
          <div className="flex flex-col items-center gap-1">
            <p style={{ fontFamily: "var(--serif-ar)", fontSize: "clamp(11px,3vw,15px)", color: "var(--cream-dark)" }}>
              البنت العزيزة
            </p>
            <p className="shimmer-gold shimmer-loop" style={{
              fontFamily: "var(--serif-ar)",
              fontSize: "clamp(22px,7vw,38px)",
              fontWeight: 700,
              lineHeight: 1.1,
            }}>
              زهراء
            </p>
            <p style={{ fontFamily: "var(--serif-ar)", fontSize: "clamp(10px,2.8vw,14px)", color: "var(--gold-warm)", opacity: 0.85 }}>
              حافظة القرآن
            </p>
          </div>

          {/* Centre — connector */}
          <div className="flex flex-col items-center gap-1">
            <div className="h-px w-full" style={{ background: "rgba(198,149,27,0.25)" }} />
            <p style={{ fontFamily: "var(--serif-ar)", fontSize: "clamp(12px,3.5vw,17px)", color: "rgba(198,149,27,0.7)", letterSpacing: "0.05em" }}>
              في شادي
            </p>
            <div className="h-px w-full" style={{ background: "rgba(198,149,27,0.25)" }} />
          </div>

          {/* Left — Groom */}
          <div className="flex flex-col items-center gap-1">
            <p style={{ fontFamily: "var(--serif-ar)", fontSize: "clamp(11px,3vw,15px)", color: "var(--cream-dark)" }}>
              الولد الأحب
            </p>
            <p className="shimmer-gold shimmer-loop" style={{
              fontFamily: "var(--serif-ar)",
              fontSize: "clamp(22px,7vw,38px)",
              fontWeight: 700,
              lineHeight: 1.1,
              animationDelay: "0.5s",
            }}>
              محمد
            </p>
            <p style={{ fontFamily: "var(--serif-ar)", fontSize: "clamp(10px,2.8vw,14px)", color: "var(--cream-dark)", lineHeight: 1.6, opacity: 0.8 }}>
              ملا مصطفى بهائي<br />حكيم الدين بهائي<br />سيتامو والا
            </p>
          </div>
        </motion.div>

        <div className="my-6"><OrnDivider /></div>

        {/* Closing line */}
        <motion.p
          className="rtl"
          style={{ fontFamily: "var(--serif-ar)", fontSize: "clamp(12px,3.3vw,17px)", color: "var(--cream-dark)", lineHeight: 2, direction: "rtl" }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2, duration: 0.9 }}
        >
          نا خوشي نو موقع نصيب تهيو ؛ اهنو اثثنسس مع الاكرام جمن نو اذن ثثيش كرئيسس ؛
        </motion.p>
      </div>
    </motion.section>
  );
}
