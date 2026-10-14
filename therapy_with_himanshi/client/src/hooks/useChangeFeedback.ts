import { useEffect, useRef } from "react";

// A quiet acknowledgement of a choice, without remounting focused controls.
export function useChangeFeedback(value: string | number) {
  const ref = useRef<HTMLDivElement>(null);
  const previous = useRef(value);
  useEffect(() => {
    if (previous.current === value) return;
    previous.current = value;
    const element = ref.current;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!element || preference.matches || !element.animate) return;
    const animation = element.animate(
      [{ opacity: 0.65, transform: "translateY(4px)" },
        { opacity: 1, transform: "translateY(0)" }],
      { duration: 260, easing: "cubic-bezier(.2,.65,.3,1)" },
    );
    const stop = () => { if (preference.matches) animation.cancel(); };
    preference.addEventListener("change", stop);
    return () => {
      animation.cancel();
      preference.removeEventListener("change", stop);
    };
  }, [value]);
  return ref;
}
