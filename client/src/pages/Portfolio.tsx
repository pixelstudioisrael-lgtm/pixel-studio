import { FinalCTA } from "@/components/FinalCTA";
import { FloatingWhatsAppButton } from "@/components/FloatingWhatsAppButton";
import { publicUrl } from "@/lib/publicUrl";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useRef, useState, useEffect, useLayoutEffect } from "react";

const HERO_BG = publicUrl("hero-background.webp");
const FLYING_MACHINE = publicUrl("flying-machine-parallax.webp");
/** public/אירונים חדשים/פלטת צבעים חדש SZG.webp — פלטה ליד מונה ליזה (דסקטופ + מובייל) */
const PALETTE_IMG = publicUrl(
  `${encodeURIComponent("אירונים חדשים")}/${encodeURIComponent("פלטת צבעים חדש SZG.webp")}`,
);
const MONA_LISA_IMG = publicUrl(`__manus__/${encodeURIComponent("אמונה ליזה.webp")}`);

function shuffleWithSeed<T>(arr: T[], seed: number): T[] {
  const a = [...arr];
  let s = seed;
  for (let i = a.length - 1; i > 0; i--) {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    const j = s % (i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const IMAGE_INDICES = Array.from({ length: 64 }, (_, i) => i + 1);
const SHUFFLED_IMAGES = shuffleWithSeed(IMAGE_INDICES, 42);

const portfolioItems = SHUFFLED_IMAGES.map((idx) => ({
  src: publicUrl(`Gallery/${idx}.webp`),
}));

/** קו עליון של שכבת הדקורציה במובייל — נמוך מהציטוט כדי שלא יכסה את הטקסט (היה 168px) */
const MOBILE_DECO_TOP_PX = 240;

export default function Portfolio() {
  const mainRef = useRef<HTMLElement>(null);
  const gridTargetRef = useRef<HTMLDivElement>(null);
  /** מובייל: דעיכה כשמגיעים לפריט הגריד באינדקס 27 */
  const gridItem27Ref = useRef<HTMLDivElement | null>(null);
  const mobileFadeRangeRef = useRef({ fadeStart: 0, fadeEnd: 12_000 });
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowRight") setLightboxIndex((i) => ((i ?? 0) - 1 + 64) % 64);
      if (e.key === "ArrowLeft") setLightboxIndex((i) => ((i ?? 0) + 1) % 64);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lightboxIndex]);

  // כאשר הגריד נכנס לטווח — הדעיכה מתגברת עד העלמות מלאה (כשמגיעים לפרויקט G)
  const { scrollYProgress: gridProgress } = useScroll({
    target: gridTargetRef,
    offset: ["start end", "center center"],
  });

  /** גלילת עמוד — אנימציית דקורציה במובייל */
  const { scrollY } = useScroll();

  const mobileDecoFallY = useTransform(scrollY, [0, 600, 4500, 14_000], [0, 140, 980, 2200]);
  const mobilePaletteRotate = useTransform(scrollY, [0, 500, 5000, 14_000], [0, 160, 520, 980]);
  const mobileMonaRotate = useTransform(scrollY, [0, 500, 5000, 14_000], [0, -160, -520, -980]);
  const mobileDecoScale = useTransform(scrollY, [0, 9000], [1, 0.82]);

  const mobileDecoOpacity = useTransform(scrollY, (y) => {
    const { fadeStart, fadeEnd } = mobileFadeRangeRef.current;
    if (y <= fadeStart) return 1;
    if (y >= fadeEnd) return 0;
    return 1 - (y - fadeStart) / (fadeEnd - fadeStart);
  });

  const recalcMobileFadeRange = () => {
    const el = gridItem27Ref.current;
    if (!el) return;
    const docTop = el.getBoundingClientRect().top + window.scrollY;
    const fadeEnd = Math.max(120, docTop - MOBILE_DECO_TOP_PX);
    const fadeStart = Math.min(fadeEnd - 80, Math.max(400, fadeEnd - 3200));
    mobileFadeRangeRef.current = { fadeStart, fadeEnd };
  };

  useLayoutEffect(() => {
    recalcMobileFadeRange();
    const t1 = window.setTimeout(recalcMobileFadeRange, 400);
    const t2 = window.setTimeout(recalcMobileFadeRange, 1400);
    window.addEventListener("resize", recalcMobileFadeRange);
    const ro = new ResizeObserver(() => recalcMobileFadeRange());
    ro.observe(document.documentElement);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.removeEventListener("resize", recalcMobileFadeRange);
      ro.disconnect();
    };
  }, []);

  // פלטת צבעים (דקורציה) — מתחילה גבוה (מתחילת main), פוזיציה ישרה, נפילה ארוכה יותר
  const paletteY = useTransform(gridProgress, [0, 0.2, 0.45, 0.7, 0.9, 1], [0, 50, 150, 300, 450, 520]);
  const paletteOpacity = useTransform(gridProgress, [0, 0.1, 0.35, 0.6, 0.85, 1], [1, 1, 1, 0.5, 0.1, 0]);
  const paletteRotate = useTransform(gridProgress, [0, 0.2, 0.5, 1], [0, 0, 180, 360]);
  const paletteScale = useTransform(gridProgress, [0, 0.85, 1], [1, 0.9, 0.82]);

  // מונה ליזה — אותו גובה, מתחילה ישרה, נפילה ארוכה מסונכרנת
  const monaY = useTransform(gridProgress, [0, 0.2, 0.45, 0.7, 0.9, 1], [0, 50, 150, 300, 450, 520]);
  const monaOpacity = useTransform(gridProgress, [0, 0.1, 0.35, 0.6, 0.85, 1], [1, 1, 1, 0.5, 0.1, 0]);
  /** דסקטופ: לפי גלילה בגריד */
  const monaRotateDesktop = useTransform(gridProgress, [0, 0.2, 0.5, 1], [0, 0, -180, -360]);
  const monaScale = useTransform(gridProgress, [0, 0.85, 1], [1, 0.9, 0.8]);

  return (
    <div className="min-h-screen w-full relative bg-[#F9F6F0]">
      {/* רקע טקסטורת סקיצות — hero-background */}
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `url('${HERO_BG}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundColor: "#F9F6F0",
        }}
      />

      {/* דסקטופ בלבד: פלטה + מונה ליזה ליד הכותרת (fixed) */}
      <motion.div
        className="pointer-events-none fixed top-[140px] left-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))] z-[30] hidden -translate-y-1/2 will-change-transform md:block"
        style={{
          y: paletteY,
          opacity: paletteOpacity,
          rotate: paletteRotate,
          scale: paletteScale,
        }}
      >
        <img
          src={PALETTE_IMG}
          alt=""
          className="h-[6.6rem] w-[6.6rem] object-contain drop-shadow-lg"
          aria-hidden
        />
      </motion.div>

      <motion.div
        className="pointer-events-none fixed top-[140px] right-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))] z-[30] hidden -translate-y-1/2 will-change-transform md:block"
        style={{
          y: monaY,
          opacity: monaOpacity,
          rotate: monaRotateDesktop,
          scale: monaScale,
        }}
      >
        <img
          src={MONA_LISA_IMG}
          alt=""
          className="h-40 w-28 object-contain drop-shadow-xl"
          loading="lazy"
          decoding="async"
          aria-hidden
        />
      </motion.div>

      <main
        ref={mainRef}
        className="relative z-10 mx-auto max-w-7xl px-6 pt-6 pb-16 md:py-24"
      >
        {/* Page Title — עם פלטת צבעים משמאל ומונה ליזה מימין */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-40 mb-20 flex items-center justify-center gap-8 max-md:mb-12 md:z-auto md:gap-16"
        >
          <div className="w-full flex-1 text-center">
            <h1 className="mb-2 display-font font-black text-[#111111] max-md:whitespace-nowrap max-md:text-[clamp(1.625rem,6.5vw,2.75rem)] md:mb-4 md:text-7xl md:whitespace-normal">
              גלריית העבודות
            </h1>
            <div className="mx-auto h-0.5 w-24 rounded-full bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
            <p
              className="body-font mx-auto mb-5 mt-3 max-w-2xl text-center text-sm italic leading-relaxed tracking-wide text-[#722F37] md:mt-4 md:mb-6"
              style={{ textWrap: "balance" }}
            >
              {
                "\u201Cבמקום שבו הרוח אינה עובדת עם היד, אין אמנות.\u201D — לאונרדו דה וינצ'י"
              }
            </p>

            {/* מובייל: רווח לשכבת התמונות הקבועה מתחת לציטוט */}
            <div className="h-[6.25rem] w-full max-md:block md:hidden" aria-hidden />
          </div>
        </motion.div>

        {/* Grid — z נמוך יותר מהבלוק שלמעלה כדי שהדקורציות לא יוסתרו בגלילה */}
        <div className="relative z-0 overflow-hidden rounded-lg">
          {/* רקע flying-machine — אנימציית תזוזה ימינה ושמאלה */}
          <motion.div
            className="absolute inset-0 pointer-events-none opacity-[0.14] z-0"
            style={{
              backgroundImage: `url('${FLYING_MACHINE}')`,
              backgroundSize: "480px 200px",
              backgroundRepeat: "repeat",
              backgroundPosition: "center",
            }}
            animate={{ x: [0, 24, 0] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute inset-0 pointer-events-none opacity-[0.1] z-0 scale-x-[-1]"
            style={{
              backgroundImage: `url('${FLYING_MACHINE}')`,
              backgroundSize: "500px 220px",
              backgroundRepeat: "repeat",
              backgroundPosition: "center",
            }}
            animate={{ x: [-20, 0, -20] }}
            transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />

          <motion.div
            ref={gridTargetRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative z-0 grid grid-cols-3 gap-4 md:grid-cols-4"
          >
          {portfolioItems.map((item, index) => (
            <motion.div
              key={index}
              ref={index === 27 ? gridItem27Ref : undefined}
              initial={{ opacity: 0, y: 40, scale: 0.88 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.65,
                ease: [0.22, 1, 0.36, 1],
                delay: Math.min(0.2 + 0.035 * index + 0.03 * Math.floor(index / 4), 1.3),
              }}
              whileHover={{ x: [0, -3, 3, -2, 2, 0], transition: { duration: 0.4 } }}
              className={
                index === portfolioItems.length - 1
                  ? "group w-full cursor-pointer max-md:hidden"
                  : "group w-full cursor-pointer"
              }
              onClick={() => setLightboxIndex(index)}
            >
              {/* Vintage Frame — מסגרת בלבד, שיקשוק בהובר */}
              <div className="relative bg-[#F9F6F0] p-4 shadow-lg hover:shadow-2xl transition-shadow duration-300">
                {/* Inner frame line */}
                <div className="absolute inset-2 border-2 border-[#D4AF37]/40 pointer-events-none" />

                {/* תמונה אחת לכל מסגרת — ריבוע מושלם */}
                <div className="relative w-full aspect-square overflow-hidden border-4 border-[#E8E5DC]">
                  <img
                    src={item.src}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>

                {/* Decorative corner elements */}
                <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-[#D4AF37]/30" />
                <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-[#D4AF37]/30" />
              </div>
            </motion.div>
          ))}
          </motion.div>
        </div>

        <FinalCTA />
      </main>

      {/* מובייל: פלטה + מונה ליזה — מתחת לציטוט (top גבוה יותר מ־168px כדי שלא יכסו את הטקסט) */}
      <div
        className="pointer-events-none fixed inset-x-0 z-[60] mx-auto hidden max-w-7xl flex-row items-center justify-between gap-2 px-6 max-md:flex"
        style={{ top: MOBILE_DECO_TOP_PX }}
        dir="ltr"
      >
        <motion.div
          className="flex h-[calc(5.525rem*0.75*1.1)] w-[calc(5.525rem*0.75*1.1)] shrink-0 items-center justify-center will-change-transform"
          style={{
            y: mobileDecoFallY,
            opacity: mobileDecoOpacity,
            rotate: mobilePaletteRotate,
            scale: mobileDecoScale,
          }}
        >
          <img
            src={PALETTE_IMG}
            alt=""
            className="max-h-full max-w-full object-contain drop-shadow-lg"
            aria-hidden
          />
        </motion.div>
        <motion.div
          className="flex h-[5.525rem] w-[5.525rem] shrink-0 items-center justify-center will-change-transform"
          style={{
            y: mobileDecoFallY,
            opacity: mobileDecoOpacity,
            rotate: mobileMonaRotate,
            scale: mobileDecoScale,
          }}
        >
          <img
            src={MONA_LISA_IMG}
            alt=""
            className="max-h-full max-w-full object-contain drop-shadow-xl"
            loading="lazy"
            decoding="async"
            aria-hidden
          />
        </motion.div>
      </div>

      {/* Lightbox — תמונה בגדול במרכז עם חצים */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
            onClick={() => setLightboxIndex(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative max-w-4xl max-h-[85vh] w-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={portfolioItems[lightboxIndex].src}
                alt=""
                className="max-w-full max-h-[85vh] w-auto h-auto object-contain rounded-lg shadow-2xl"
              />

              {/* כפתור סגירה */}
              <button
                onClick={() => setLightboxIndex(null)}
                className="absolute -top-12 left-1/2 -translate-x-1/2 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
                aria-label="סגור"
              >
                <X className="w-6 h-6" />
              </button>

              {/* חץ קודם */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex((lightboxIndex - 1 + 64) % 64);
                }}
                className="absolute right-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-16 p-3 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
                aria-label="הקודם"
              >
                <ChevronRight className="w-8 h-8" />
              </button>

              {/* חץ הבא */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex((lightboxIndex + 1) % 64);
                }}
                className="absolute left-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-16 p-3 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
                aria-label="הבא"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <FloatingWhatsAppButton />
    </div>
  );
}
