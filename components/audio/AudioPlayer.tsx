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

    // Velocity tracking
    let scrubVelocity = 0;
    let lastMoveX = 0;
    let lastMoveTime = 0;
    let scrubTargetPct = 0;

    // playbackRate smoothing
    let currentRate = 1.0;
    let targetRate = 1.0;
    let rateRaf = 0;

    const VELOCITY_SCALE = 1.0;
    const RATE_LERP = 0.12;
    const VEL_EMA = 0.3;

    // Compute 0–1 fraction from clientX without touching audio
    const pctFromClientX = (clientX: number) => {
      const rect = bar.getBoundingClientRect();
      const x = clamp(clientX - rect.left, 0, rect.width);
      return rect.width ? x / rect.width : 0;
    };

    // Update progress bar visually without seeking
    const updateVisual = (pct: number) => {
      const host = hostRef.current;
      if (host) host.style.setProperty("--audio-player-progress", String(pct));
    };

    const scrubTick = () => {
      currentRate += (targetRate - currentRate) * RATE_LERP;
      a.playbackRate = currentRate;

      if (!scrubbing && Math.abs(currentRate - 1.0) < 0.002) {
        currentRate = 1.0;
        a.playbackRate = 1.0;
        a.preservesPitch = true;
        (a as HTMLAudioElement & { webkitPreservesPitch: boolean }).webkitPreservesPitch = true;
        rateRaf = 0;
        return;
      }

      rateRaf = requestAnimationFrame(scrubTick);
    };

    const onPointerDown = (e: PointerEvent) => {
      if (!Number.isFinite(a.duration) || a.duration <= 0) return;

      scrubbing = true;
      wasPlaying = !a.paused;

      lastMoveX = e.clientX;
      lastMoveTime = performance.now();
      scrubVelocity = 0;
      currentRate = 1.0;
      targetRate = 1.0;
      scrubTargetPct = pctFromClientX(e.clientX);
      updateVisual(scrubTargetPct);

      a.preservesPitch = false;
      (a as HTMLAudioElement & { webkitPreservesPitch: boolean }).webkitPreservesPitch = false;

      bar.setPointerCapture(e.pointerId);

      if (wasPlaying) a.play().catch(() => {});
      if (!rateRaf) rateRaf = requestAnimationFrame(scrubTick);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!scrubbing) return;

      const now = performance.now();
      const dt = now - lastMoveTime;

      if (dt > 0) {
        const rawVelocity = (e.clientX - lastMoveX) / dt;
        scrubVelocity += (rawVelocity - scrubVelocity) * VEL_EMA;
      }

      lastMoveX = e.clientX;
      lastMoveTime = now;
      scrubTargetPct = pctFromClientX(e.clientX);
      targetRate = clamp(Math.abs(scrubVelocity) * VELOCITY_SCALE, 0.1, 3.5);

      updateVisual(scrubTargetPct);
    };

    const end = () => {
      if (!scrubbing) return;
      scrubbing = false;
      scrubVelocity = 0;
      targetRate = 1.0;

      // Single seek on release — lands silently as rate winds back to 1.0
      if (Number.isFinite(a.duration) && a.duration > 0) {
        a.currentTime = scrubTargetPct * a.duration;
      }

      if (!wasPlaying) a.pause();
      // rateRaf continues until currentRate settles to 1.0
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
      if (rateRaf) { cancelAnimationFrame(rateRaf); rateRaf = 0; }
      a.playbackRate = 1.0;
      a.preservesPitch = true;
      (a as HTMLAudioElement & { webkitPreservesPitch: boolean }).webkitPreservesPitch = true;
    };
  }, []); // all state via stable refs — no external deps needed

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
