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

  // Keep CSS var progress in sync (like de Rue)
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

      // Just seek. Do NOT call load(), do NOT reset src.
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

  // Drag scrubbing like de Rue (click + drag anywhere on time bar)
  React.useEffect(() => {
    const bar = barRef.current;
    const a = audioRef.current;
    if (!bar || !a) return;

    let scrubbing = false;
    let wasPlaying = false;

    // rAF throttle for smoothness + better “tape” feel
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

      // Seek immediately
      requestSeek(e.clientX);

      // “Tape scrub” behavior:
      // If it WAS playing, keep playing so you hear the scrubbing.
      // If it was paused, leave it paused (silent scrubbing).
      if (wasPlaying) a.play().catch(() => {});
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!scrubbing) return;
      requestSeek(e.clientX);
    };

    const end = () => {
      if (!scrubbing) return;
      scrubbing = false;

      // Restore pre-scrub state
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

  // Minimal de Rue-ish styling (inline so you don’t fight Tailwind config)
  // You can move this to CSS later.
  return (
    <div
      ref={hostRef}
      className={className}
      data-status={status}
      style={{
        // same “API” as his component
        // progress is set dynamically in setProgressVar()
        ["--audio-player-progress" as any]: 0,
        width: "100%",
        display: "inline-flex",
        alignItems: "stretch",
        maxWidth: "100%",
      }}
    >
      <style>{`
        .ap * { box-sizing: border-box; }
        .ap {
          width: 100%;
          display: inline-flex;
          align-items: stretch;
          gap: 0;
        }

        /* ONE PILL */
        .ap-pill{
          width: 100%;
          display: inline-flex;
          align-items: stretch;
          border: 1px solid rgba(0,0,0,.22);
          border-radius: 999px;
          overflow: hidden;
          background: transparent;
        }

        .ap-button{
          width: 32px;
          height: 32px;
          display: grid;
          place-items: center;
          cursor: pointer;
          user-select: none;
          position: relative;
          background: transparent;
          padding-left: 10px;
        }

        /* divider stroke (the “simple line” you described) */
        .ap-sep{
          width: 1px;
          background: rgba(0,0,0,.22);
          margin-left: 10px;
        }

        .ap-timebar{
          position: relative;
          flex: 1;
          height: 32px;
          display: flex;
          align-items: center;
          padding: 0 14px;
          cursor: ew-resize;
          user-select: none;
          touch-action: none;
          overflow: hidden;
        }

        /* subtle progress fill behind label (but only inside timebar) */
        .ap-progress{
          position: absolute;
          inset: 0;
          width: calc(var(--audio-player-progress, 0) * 100%);
          background: rgba(0,0,0,.06);
          pointer-events: none;
        }

        .ap-label{
          position: relative;
          z-index: 1;
          font-size: 14px;
          letter-spacing: .02em;
          color: rgba(0,0,0,.85);
          white-space: nowrap;
          overflow: hidden;
          text-transform: uppercase;
          text-overflow: ellipsis;
        }

        .ap-playIcon{
          width: 0; height: 0;
          border-top: 7px solid transparent;
          border-bottom: 7px solid transparent;
          border-left: 12px solid rgba(0,0,0,.75);
          margin-left: 2px;
        }

        .ap-pauseIcon{
          display: flex;
          gap: 4px;
        }
        .ap-pauseIcon > span{
          width: 3px;
          height: 14px;
          background: rgba(0,0,0,.75);
          border-radius: 2px;
        }
      `}</style>

      <div className="ap">
        <div className="ap-pill">
          {/* part="button" */}
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

          {/* part="separator" */}
          <div className="ap-sep" />

          {/* part="time-bar" */}
          <div ref={barRef} className="ap-timebar" aria-label="Scrub audio timeline">
            {/* part="progress" */}
            <div className="ap-progress" />
            {/* part="label" */}
            <div className="ap-label">{label}</div>
          </div>

          <audio ref={audioRef} src={src} preload="metadata" />
        </div>
      </div>
    </div>
  );
}
