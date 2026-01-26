"use client";

import { useRef, useState, useEffect, useCallback } from "react";

interface AudioPlayerProps {
  src: string;
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export default function AudioPlayer({ src }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const seek = useCallback(
    (clientX: number) => {
      const audio = audioRef.current;
      const progressBar = progressRef.current;
      if (!audio || !progressBar || !duration) return;

      const rect = progressBar.getBoundingClientRect();
      const percent = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      audio.currentTime = percent * duration;
      setCurrentTime(audio.currentTime);
    },
    [duration]
  );

  const handleProgressClick = (e: React.MouseEvent) => {
    seek(e.clientX);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    seek(e.clientX);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        seek(e.clientX);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, seek]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  return (
    <div className="inline-flex items-center gap-3 px-4 py-2 bg-white border border-black rounded-full select-none">
      <audio ref={audioRef} src={src} preload="metadata" />

      {/* Play/Pause Button */}
      <button
        onClick={togglePlay}
        className="w-4 h-4 flex items-center justify-center"
        aria-label={isPlaying ? "Pause" : "Play"}
      >
        {isPlaying ? (
          <svg viewBox="0 0 16 16" className="w-3 h-3 fill-black">
            <rect x="2" y="1" width="4" height="14" />
            <rect x="10" y="1" width="4" height="14" />
          </svg>
        ) : (
          <svg viewBox="0 0 16 16" className="w-3 h-3 fill-black">
            <polygon points="2,1 14,8 2,15" />
          </svg>
        )}
      </button>

      {/* Current Time */}
      <span className="text-xs text-black font-medium w-10">
        {formatTime(currentTime)}
      </span>

      {/* Progress Bar */}
      <div
        ref={progressRef}
        className="relative w-40 h-4 flex items-center cursor-pointer"
        onClick={handleProgressClick}
        onMouseDown={handleMouseDown}
      >
        <div className="absolute w-full h-[2px] bg-black/20 rounded-full" />
        <div
          className="absolute h-[2px] bg-black rounded-full"
          style={{ width: `${progress}%` }}
        />
        <div
          className="absolute w-2 h-2 bg-black rounded-full -translate-x-1/2"
          style={{ left: `${progress}%` }}
        />
      </div>

      {/* Duration */}
      <span className="text-xs text-black font-medium w-10 text-right">
        {formatTime(duration)}
      </span>
    </div>
  );
}
