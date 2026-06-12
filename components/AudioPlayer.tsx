"use client";
import { useEffect, useRef, useState } from "react";

export default function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [muted, setMuted] = useState(false);
  const played = useRef(false);

  const tryPlay = () => {
    if (played.current) return;
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.45;
    audio.playbackRate = 1.1;
    audio.loop = true;
    audio.muted = false;
    audio.play().then(() => {
      played.current = true;
    }).catch(() => {});
  };

  useEffect(() => {
    // Attempt immediately — works on desktop and some Android configs
    tryPlay();

    // Fallback: fire on the very first user gesture, as early as possible.
    // capture:true — intercepts before any child handler can stop propagation.
    // passive:true on touch — never blocks scroll performance.
    const opts = { once: true, capture: true } as const;
    const passiveOpts = { once: true, capture: true, passive: true } as const;
    document.addEventListener("pointerdown", tryPlay, passiveOpts);
    document.addEventListener("touchstart",  tryPlay, passiveOpts);
    document.addEventListener("click",       tryPlay, opts);
    document.addEventListener("keydown",     tryPlay, opts);

    return () => {
      document.removeEventListener("pointerdown", tryPlay);
      document.removeEventListener("touchstart",  tryPlay);
      document.removeEventListener("click",       tryPlay);
      document.removeEventListener("keydown",     tryPlay);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    const next = !muted;
    audio.muted = next;
    setMuted(next);
    if (audio.paused && !next) audio.play().catch(() => {});
  };

  return (
    <>
      <audio ref={audioRef} src="/music/wedding.mp4" preload="auto" />
      <button
        onClick={toggleMute}
        className="fixed right-5 z-[60] w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300"
        style={{
          bottom:         "62px",
          background:     "rgba(11,40,24,0.65)",
          border:         "1px solid rgba(198,149,27,0.35)",
          backdropFilter: "blur(12px)",
          color:          "#E8C547",
        }}
        aria-label={muted ? "Unmute" : "Mute"}
      >
        {muted ? (
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <line x1="23" y1="9" x2="17" y2="15" /><line x1="17" y1="9" x2="23" y2="15" />
          </svg>
        ) : (
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
          </svg>
        )}
      </button>
    </>
  );
}
