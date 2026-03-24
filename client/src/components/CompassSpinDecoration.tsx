import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { publicUrl } from "@/lib/publicUrl";

const COMPASS_IMG = publicUrl(`__manus__/${encodeURIComponent("מחוגה.png")}`);

/** מחוגה — סיבוב בכניסה לתצוגה, ואז כל 5 שניות */
export function CompassSpinDecoration() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const reduceMotion = useReducedMotion();
  const [spinCount, setSpinCount] = useState(0);

  useEffect(() => {
    if (!inView || reduceMotion) return;
    setSpinCount(1);
    const id = window.setInterval(() => {
      setSpinCount((c) => c + 1);
    }, 5000);
    return () => clearInterval(id);
  }, [inView, reduceMotion]);

  return (
    <div ref={ref} className="flex shrink-0 items-center justify-center" aria-hidden>
      <motion.div
        className="pointer-events-none w-[min(5.5rem,28vw)] shrink-0 md:w-24"
        animate={{ rotate: reduceMotion ? 0 : spinCount * 360 }}
        transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
      >
        <img
          src={COMPASS_IMG}
          alt=""
          className="h-auto w-full object-contain opacity-[0.92] drop-shadow-md mix-blend-multiply saturate-[0.85]"
          loading="lazy"
          decoding="async"
        />
      </motion.div>
    </div>
  );
}
