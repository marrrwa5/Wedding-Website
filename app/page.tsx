"use client";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Image from "next/image";
import AudioPlayer from "@/components/AudioPlayer";
import PaperSection from "@/components/PaperSection";
import ProseReveal from "@/components/ProseReveal";
import GateVideo from "@/components/GateVideo";
import NamesReveal from "@/components/NamesReveal";

// Flow: paper → prose → gate → names
type Phase = "paper" | "prose" | "gate" | "names";

export default function Home() {
  const [phase, setPhase] = useState<Phase>("paper");
  const go = (next: Phase) => setPhase(next);

  return (
    <>
      {/* ── Permanent frame background — always at z-0 ── */}
      <div className="fixed inset-0 z-0" style={{ background: "#07190F" }}>
        <Image
          src="/images/frame.png"
          alt=""
          fill
          priority
          sizes="100vw"
          quality={75}
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "rgba(14,26,8,0.20)" }}
        />
      </div>

      <AudioPlayer />

      {/* ── PaperSection — only in paper phase ── */}
      <AnimatePresence>
        {phase === "paper" && (
          <PaperSection
            key="paper"
            onOpen={() => go("prose")}
          />
        )}
      </AnimatePresence>

      {/* ── ProseReveal — PRE-MOUNTED during paper phase too (show=false),
           so it's already in the DOM when it becomes visible.
           AnimatePresence lets it animate out before unmounting. ── */}
      <AnimatePresence>
        {phase !== "names" && phase !== "gate" && (
          <ProseReveal
            key="prose-reveal"
            show={phase === "prose"}
            onDone={() => go("gate")}
          />
        )}
      </AnimatePresence>

      {/* ── Gate video — between prose and names ── */}
      <AnimatePresence>
        {phase === "gate" && (
          <GateVideo key="gate-video" onDone={() => go("names")} />
        )}
      </AnimatePresence>

      {/* ── Names — final scrollable page ── */}
      {phase === "names" && (
        <div className="fixed inset-0 z-40">
          <NamesReveal />
        </div>
      )}
    </>
  );
}
