import { useEffect, useRef } from "react";

export function useFitText(enabled: boolean = true) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (!enabled) {
      el.style.fontSize = "";
      el.style.whiteSpace = "";
      return;
    }

    let busy = false;

    const fit = () => {
      if (busy) return;
      const parent = el.parentElement;
      if (!parent) return;

      const parentStyle = getComputedStyle(parent);
      const containerWidth =
        parent.clientWidth -
        parseFloat(parentStyle.paddingLeft) -
        parseFloat(parentStyle.paddingRight);

      if (containerWidth <= 0) return;

      // inline-block + nowrap so scrollWidth reflects full single-line text width
      const measure = (size: number): number => {
        busy = true;
        el.style.fontSize = size + "px";
        el.style.display = "inline-block";
        el.style.whiteSpace = "nowrap";
        const w = el.scrollWidth;
        el.style.display = "";
        el.style.whiteSpace = "";
        busy = false;
        return w;
      };

      const w1 = measure(100);
      if (w1 === 0) return;
      const pass1 = (containerWidth / w1) * 100;

      const w2 = measure(pass1);
      if (w2 === 0) return;
      const finalSize = (containerWidth / w2) * pass1;

      el.style.fontSize = finalSize + "px";
      // keep nowrap so the text stays on one line at the fitted size
      el.style.whiteSpace = "nowrap";
    };

    const observer = new ResizeObserver(fit);
    observer.observe(el.parentElement ?? el);
    fit();

    return () => observer.disconnect();
  }, [enabled]);

  return ref;
}
