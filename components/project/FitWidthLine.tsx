"use client";

import { useLayoutEffect, useRef } from "react";

const MIN_PX = 6;
const MAX_PX = 5000;

function fitFontSizeToWidth(textEl: HTMLElement, maxWidth: number) {
  if (maxWidth <= 0) return;

  textEl.style.fontSize = `${MAX_PX}px`;
  if (textEl.scrollWidth <= maxWidth) {
    textEl.style.fontSize = `${MAX_PX}px`;
    return;
  }

  textEl.style.fontSize = `${MIN_PX}px`;
  if (textEl.scrollWidth > maxWidth) {
    return;
  }

  let lo = MIN_PX;
  let hi = MAX_PX;
  for (let i = 0; i < 50; i++) {
    const mid = (lo + hi) / 2;
    textEl.style.fontSize = `${mid}px`;
    if (textEl.scrollWidth <= maxWidth) lo = mid;
    else hi = mid;
  }
  textEl.style.fontSize = `${lo}px`;
}

interface FitWidthLineProps {
  text: string;
  textClassName: string;
  wrapperClassName?: string;
}

/** One line of text; font size is computed so the string fills the wrapper width. */
export default function FitWidthLine({ text, textClassName, wrapperClassName = "" }: FitWidthLineProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const wrap = wrapRef.current;
    const textEl = textRef.current;
    if (!wrap || !textEl) return;

    const run = () => {
      fitFontSizeToWidth(textEl, wrap.clientWidth);
    };

    run();
    void document.fonts.ready.then(() => requestAnimationFrame(run));

    const ro = new ResizeObserver(() => requestAnimationFrame(run));
    ro.observe(wrap);
    return () => ro.disconnect();
  }, [text]);

  return (
    <div ref={wrapRef} className={`project-fit-line-wrap ${wrapperClassName}`}>
      <span ref={textRef} className={textClassName}>
        {text}
      </span>
    </div>
  );
}
