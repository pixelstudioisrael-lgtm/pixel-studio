import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { publicUrl } from "@/lib/publicUrl";

const VITRUVIAN = publicUrl(
  `__manus__/${encodeURIComponent("davinci-vitruvian-wireframe.webp")}`,
);
const GEARS = publicUrl(
  `${encodeURIComponent("אירונים חדשים")}/${encodeURIComponent("גלגלי שיניים.webp")}`,
);
const MONA_LISA = "https://d2xsxph8kpxj0f.cloudfront.net/310519663459270785/T2vXmtCoKPgG35XUxSP9Qu/mona-lisa-faint-bkycUPnmpCCcUq8hTzk8YW.webp";
const MONA_LISA_FRAMED = publicUrl(`__manus__/${encodeURIComponent("אמונה ליזה.webp")}`);

export function ScrollHookSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  // Vitruvian Man falls down
  const vitruvianY = useTransform(scrollYProgress, [0, 1], [-100, 300]);
  const vitruvianRotate = useTransform(scrollYProgress, [0, 1], [0, 45]);
  const vitruvianOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.3]);

  // Mona Lisa framed - scroll animation (falls, rotates) + reduced opacity
  const monaLisaFramedY = useTransform(scrollYProgress, [0, 1], [-80, 280]);
  const monaLisaFramedRotate = useTransform(scrollYProgress, [0, 1], [0, -35]);
  const monaLisaFramedOpacity = useTransform(scrollYProgress, [0, 0.4, 0.8, 1], [0.55, 0.65, 0.5, 0.35]);

  // Mona Lisa parallax with color gradient
  const monaLisaY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const monaLisaOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 0.4, 0.6, 0.2]);

  // Gears — דסקטופ: אנימציית כניסה כמו קודם; מובייל: גלגלים נפרדים למטה (שכבה אחורית + חצי מחוץ למסך)
  const gearsLeftX = useTransform(scrollYProgress, [0, 0.5, 1], [-200, -100, 0]);
  const gearsRightX = useTransform(scrollYProgress, [0, 0.5, 1], [200, 100, 0]);
  const gearsRotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const gearsRotateRight = useTransform(scrollYProgress, [0, 1], [0, -360]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full bg-transparent py-20 px-4 overflow-hidden"
    >
      {/* טקסטורת parchment — כמו ב-Home (רוחב מלא, חזרה אנכית) */}
      <div
        className="parchment-texture-layer pointer-events-none absolute inset-0 z-0"
        aria-hidden
      />

      {/* מעבר לקרם (#F9F6F0) כמו Process והדף — לא לבן טהור שלא יוצר פס */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-transparent to-[#F9F6F0]"
        aria-hidden
      />

      {/* Mona Lisa Parallax Background with Color Gradient */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-[2]"
        style={{
          backgroundImage: `url('${MONA_LISA}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          y: monaLisaY,
          opacity: monaLisaOpacity,
        }}
      />

      {/* Color Gradient Overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-[3]"
        style={{
          background: "linear-gradient(135deg, rgba(212, 175, 55, 0.1) 0%, rgba(0, 85, 255, 0.1) 100%)",
          opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.5, 0]),
        }}
      />

      <div className="relative isolate z-10 mx-auto flex h-screen max-w-6xl items-center justify-center">
        {/* מובייל בלבד: גלגלים בשכבה האחורית (z-0), חצי מחוץ למסך — max-md */}
        <div
          className="pointer-events-none absolute bottom-[26%] left-0 z-0 h-[7.25rem] w-[7.25rem] -translate-x-1/2 md:hidden"
          aria-hidden
        >
          <motion.div
            className="h-full w-full"
            style={{ rotate: gearsRotate }}
          >
            <img
              src={GEARS}
              alt=""
              className="h-full w-full object-contain opacity-40"
              loading="lazy"
              decoding="async"
            />
          </motion.div>
        </div>
        <div
          className="pointer-events-none absolute bottom-[26%] right-0 z-0 h-[7.25rem] w-[7.25rem] translate-x-1/2 md:hidden"
          aria-hidden
        >
          <motion.div
            className="h-full w-full"
            style={{ rotate: gearsRotateRight }}
          >
            <img
              src={GEARS}
              alt=""
              className="h-full w-full object-contain opacity-40"
              loading="lazy"
              decoding="async"
            />
          </motion.div>
        </div>

        {/* Falling Vitruvian Man — מעל הגלגלים במובייל */}
        <motion.div
          className="absolute left-[8%] z-10 h-24 w-24 md:left-1/4 md:z-auto md:h-40 md:w-40"
          style={{
            y: vitruvianY,
            rotate: vitruvianRotate,
            opacity: vitruvianOpacity,
          }}
        >
          <img
            src={VITRUVIAN}
            alt="Vitruvian Man"
            className="h-full w-full object-contain drop-shadow-lg"
            loading="lazy"
            decoding="async"
          />
        </motion.div>

        {/* Mona Lisa framed */}
        <motion.div
          className="pointer-events-none absolute right-[8%] z-10 h-32 w-32 md:right-1/4 md:z-auto md:h-56 md:w-48"
          style={{
            y: monaLisaFramedY,
            rotate: monaLisaFramedRotate,
            opacity: monaLisaFramedOpacity,
          }}
        >
          <img
            src={MONA_LISA_FRAMED}
            alt="אמונה ליזה"
            className="h-full w-full object-contain drop-shadow-xl"
            loading="lazy"
            decoding="async"
            style={{ filter: "brightness(0.95) contrast(0.98)" }}
          />
        </motion.div>

        {/* דסקטופ בלבד: אנימציית גלגלים כמו קודם */}
        <motion.div
          className="absolute bottom-1/3 left-0 hidden h-32 w-32 md:block"
          style={{
            x: gearsLeftX,
            rotate: gearsRotate,
          }}
        >
          <img
            src={GEARS}
            alt="Gears"
            className="h-full w-full object-contain opacity-40"
            loading="lazy"
            decoding="async"
          />
        </motion.div>

        <motion.div
          className="absolute bottom-1/3 right-0 hidden h-32 w-32 md:block"
          style={{
            x: gearsRightX,
            rotate: gearsRotateRight,
          }}
        >
          <img
            src={GEARS}
            alt="Gears"
            className="h-full w-full object-contain opacity-40"
            loading="lazy"
            decoding="async"
          />
        </motion.div>

        {/* About headline — בראש הסקשן, שכבה עליונה */}
        <motion.div
          className="absolute top-28 left-1/2 transform -translate-x-1/2 text-center z-[50] w-full max-w-4xl px-4"
          style={{
            opacity: useTransform(scrollYProgress, [0, 0.3, 1], [0.3, 1, 1]),
          }}
        >
          <motion.div
            className="display-font max-md:max-w-full max-md:whitespace-nowrap max-md:leading-[1.05] max-md:text-[clamp(1.35rem,8.5vw,2.75rem)] text-5xl md:text-6xl font-black text-[#722F37]"
            style={{
              scale: useTransform(scrollYProgress, [0, 0.3, 1], [0.8, 1, 1]),
            }}
          >
            אז מי אנחנו?
          </motion.div>
          <p className="mt-4 text-[#111111] text-base md:text-lg leading-relaxed body-font max-w-3xl mx-auto">
            Pixel Studio מתמחה במיתוג מקיף למגוון רחב של עסקים. בעזרת נבחרת המעצבים המוכשרים שלנו,
            אנו מעניקים מעטפת עיצובית מלאה - מלוגו ועד כרטיס ביקור וכל נכסי המותג - כדי להבטיח שהעסק
            שלכם יבלוט בדיוק בצורה שמגיעה לו.
          </p>
          <motion.div
            className="mx-auto mt-4 h-0.5 w-32 rounded-full bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent"
            style={{
              scaleX: useTransform(scrollYProgress, [0, 0.3, 1], [0.5, 1, 1]),
            }}
          />
        </motion.div>
      </div>

      {/* ציטוט דה־וינצ'י — ילד ישיר של הסקשן: מעל כל השכבות + תחתית הסקשן (לא נעלם בגלל whileInView+opacity) */}
      <motion.div
        className="absolute inset-x-0 bottom-[4cm] z-[100] mx-auto flex w-full max-w-4xl flex-col items-center px-4 pb-6 pt-2 text-center sm:pb-8 md:pb-10"
        initial={
          reduceMotion
            ? { y: 0, skewX: 0, scale: 1 }
            : { y: 28, skewX: -9, scale: 0.9 }
        }
        whileInView={{ y: 0, skewX: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.08, margin: "0px 0px 120px 0px" }}
        transition={
          reduceMotion
            ? { duration: 0 }
            : {
                type: "spring",
                stiffness: 420,
                damping: 19,
                mass: 0.72,
              }
        }
      >
        <p
          className="pixel-no-ui-frame body-font relative z-[101] mx-auto max-w-3xl text-center text-base font-medium italic leading-snug tracking-wide text-[#722F37] sm:text-lg md:text-xl md:leading-relaxed lg:text-[1.35rem]"
          style={{
            textWrap: "balance",
            border: "none",
            outline: "none",
            boxShadow: "none",
          }}
        >
          {"\u201Cפרטים יוצרים שלמות, ושלמות אינה פרט.\u201D — לאונרדו דה וינצ'י"}
        </p>
      </motion.div>
    </section>
  );
}
