"use client";

import * as React from "react";

type AudioPlayerProps = {
  src: string;   // "/audio/test.mp3"
  label: string; // "Cancuncito"
  className?: string;
};

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

export default function AudioPlayer({ src, label, className = "" }: AudioPlayerProps) {
  const hostRef = React.useRef<HTMLDivElement | null>(null);
  const barRef = React.useRef<HTMLDivElement | null>(null);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  const [status, setStatus] = React.useState<"playing" | "stopped">("stopped");

  // Keep CSS var progress in sync
  const setProgressVar = React.useCallback(() => {
    const host = hostRef.current;
    const a = audioRef.current;
    if (!host || !a || !Number.isFinite(a.duration) || a.duration <= 0) return;
    const pct = clamp(a.currentTime / a.duration, 0, 1);
    host.style.setProperty("--audio-player-progress", String(pct));
  }, []);

  // Seek based on clientX inside the time bar
  const seekFromClientX = React.useCallback(
    (clientX: number) => {
      const a = audioRef.current;
      const bar = barRef.current;
      if (!a || !bar || !Number.isFinite(a.duration) || a.duration <= 0) return;

      const rect = bar.getBoundingClientRect();
      const x = clamp(clientX - rect.left, 0, rect.width);
      const pct = rect.width ? x / rect.width : 0;

      a.currentTime = pct * a.duration;
      setProgressVar();
    },
    [setProgressVar]
  );

  const toggle = React.useCallback(async () => {
    const a = audioRef.current;
    if (!a) return;

    try {
      if (a.paused) await a.play();
      else a.pause();
    } catch {
      // ignore gesture/autoplay errors
    }
  }, []);

  // Audio element event wiring
  React.useEffect(() => {
    const a = audioRef.current;
    const host = hostRef.current;
    if (!a || !host) return;

    const onPlay = () => {
      setStatus("playing");
      setProgressVar();
    };
    const onPause = () => {
      setStatus("stopped");
      setProgressVar();
    };
    const onTime = () => setProgressVar();
    const onMeta = () => setProgressVar();
    const onEnded = () => {
      setStatus("stopped");
      setProgressVar();
    };

    a.addEventListener("play", onPlay);
    a.addEventListener("pause", onPause);
    a.addEventListener("timeupdate", onTime);
    a.addEventListener("loadedmetadata", onMeta);
    a.addEventListener("ended", onEnded);

    return () => {
      a.removeEventListener("play", onPlay);
      a.removeEventListener("pause", onPause);
      a.removeEventListener("timeupdate", onTime);
      a.removeEventListener("loadedmetadata", onMeta);
      a.removeEventListener("ended", onEnded);
    };
  }, [setProgressVar]);

  // Drag scrubbing (click + drag anywhere on time bar)
  React.useEffect(() => {
    const bar = barRef.current;
    const a = audioRef.current;
    if (!bar || !a) return;

    let scrubbing = false;
    let wasPlaying = false;

    // rAF throttle for smoothness + "tape" feel
    let raf = 0;
    let lastX = 0;

    const requestSeek = (x: number) => {
      lastX = x;
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        seekFromClientX(lastX);
      });
    };

    const onPointerDown = (e: PointerEvent) => {
      if (!Number.isFinite(a.duration) || a.duration <= 0) return;

      scrubbing = true;
      wasPlaying = !a.paused;

      bar.setPointerCapture(e.pointerId);
      requestSeek(e.clientX);

      // "Tape scrub" behavior: keep playing if was playing
      if (wasPlaying) a.play().catch(() => {});
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!scrubbing) return;
      requestSeek(e.clientX);
    };

    const end = () => {
      if (!scrubbing) return;
      scrubbing = false;

      if (!wasPlaying) a.pause();

      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };

    bar.addEventListener("pointerdown", onPointerDown);
    bar.addEventListener("pointermove", onPointerMove);
    bar.addEventListener("pointerup", end);
    bar.addEventListener("pointercancel", end);
    bar.addEventListener("lostpointercapture", end);

    return () => {
      bar.removeEventListener("pointerdown", onPointerDown);
      bar.removeEventListener("pointermove", onPointerMove);
      bar.removeEventListener("pointerup", end);
      bar.removeEventListener("pointercancel", end);
      bar.removeEventListener("lostpointercapture", end);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [seekFromClientX]);

  return (
    <div
      ref={hostRef}
      className={`ap-host ${className}`}
      data-status={status}
    >
      <div className="ap">
        <div className="ap-pill">
          <div
            className="ap-button"
            onClick={(e) => {
              e.stopPropagation();
              toggle();
            }}
            role="button"
            aria-label={status === "playing" ? "Pause" : "Play"}
          >
            {status === "playing" ? (
              <span className="ap-pauseIcon" aria-hidden="true">
                <span />
                <span />
              </span>
            ) : (
              <span className="ap-playIcon" aria-hidden="true" />
            )}
          </div>

          <div className="ap-sep" />

          <div ref={barRef} className="ap-timebar" aria-label="Scrub audio timeline">
            <div className="ap-progress" />
            <div className="ap-label">{label}</div>
          </div>

          <audio ref={audioRef} src={src} preload="metadata" />
        </div>
      </div>
    </div>
  );
}
