"use client";

import { useEffect, useState } from "react";
import { useFitText } from "@/hooks/useFitText";

export default function FitText({ children }: { children: React.ReactNode }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const ref = useFitText(isMobile);

  return (
    <span ref={ref as React.Ref<HTMLSpanElement>}>{children}</span>
  );
}
