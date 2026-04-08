import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef, useSyncExternalStore } from "react";
import { publicUrl } from "@/lib/publicUrl";

/** התאמה ל־max-md (767px) — ערך נכון כבר ב־hydration כדי לאנימציית לוגו נכונה במובייל */
function useMatchMaxMd() {
  return useSyncExternalStore(
    (onStoreChange) => {
      const mq = window.matchMedia("(max-width: 767px)");
      mq.addEventListener("change", onStoreChange);
      return () => mq.removeEventListener("change", onStoreChange);
    },
    () => window.matchMedia("(max-width: 767px)").matches,
    () => false,
  );
}

const FLYING_MACHINE = publicUrl("flying-machine-parallax.webp");
const LOGO = publicUrl(
  `${encodeURIComponent("אירונים חדשים")}/${encodeURIComponent("Pixel Studio LOGO NEW.webp")}`,
);

const WA_HREF =
  "https://wa.me/972552892682?text=%D7%A9%D7%9C%D7%95%D7%9D%20Pixel%20Design";

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const isMobile = useMatchMaxMd();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const logoScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.6]);
  const logoY = useTransform(scrollYProgress, [0, 0.5], [0, -80]);
  const logoOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0.3]);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-0 w-full items-start justify-center overflow-hidden max-md:pb-12 max-md:pt-2 md:min-h-screen md:items-center"
      style={{
        backgroundColor: "transparent",
      }}
    >
      <motion.div
        className="pointer-events-none absolute left-0 top-20 z-[1] h-28 w-full opacity-20 md:h-32"
        style={{
          backgroundImage: `url('${FLYING_MACHINE}')`,
          backgroundSize: "480px 160px",
          backgroundRepeat: "repeat-x",
        }}
        animate={{ x: [0, 24, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute bottom-1/3 right-0 z-[1] h-28 w-full scale-x-[-1] opacity-15 md:h-32"
        style={{
          backgroundImage: `url('${FLYING_MACHINE}')`,
          backgroundSize: "480px 160px",
          backgroundRepeat: "repeat-x",
        }}
        animate={{ x: [-24, 0, -24] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-b from-transparent via-transparent to-[#F9F6F0]/30" />

      <div className="relative z-30 mx-auto flex w-full max-w-4xl flex-col items-center justify-center px-6 pb-10 pt-2 max-md:translate-y-0 md:-translate-y-10 md:px-4 md:py-14 md:pb-12">
        <motion.div
          className="mb-8 flex items-center justify-center md:mb-10"
          style={{
            scale: logoScale,
            y: logoY,
            opacity: logoOpacity,
          }}
        >
          <motion.img
            src={LOGO}
            alt="Pixel Design Logo"
            width={256}
            height={256}
            loading="eager"
            fetchPriority="high"
            className="w-auto max-md:h-[8.8rem] object-contain drop-shadow-2xl md:h-64"
            initial={
              reduceMotion
                ? { opacity: 1, scale: 1, y: 0, rotate: 0 }
                : isMobile
                  ? { opacity: 0, scale: 0.65, y: 52, rotate: -4 }
                  : { opacity: 0, scale: 0.5, y: 80, rotate: 0 }
            }
            animate={
              reduceMotion
                ? { opacity: 1, scale: 1, y: 0, rotate: 0 }
                : { opacity: 1, scale: 1, y: 0, rotate: 0 }
            }
            transition={
              reduceMotion
                ? { duration: 0 }
                : isMobile
                  ? {
                      type: "spring",
                      stiffness: 380,
                      damping: 20,
                      mass: 0.62,
                    }
                  : {
                      duration: 1.3,
                      ease: [0.22, 1, 0.36, 1],
                    }
            }
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="display-font mb-5 max-w-[22rem] text-center text-4xl font-black leading-[1.1] tracking-tighter text-[#722F37] max-md:max-w-full max-md:whitespace-nowrap max-md:leading-[1.05] max-md:text-[clamp(1.35rem,8.5vw,2.75rem)] sm:max-w-none md:mb-7 md:text-6xl"
        >
          מרעיון ליצירת מופת.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="body-font mb-8 max-w-2xl text-center text-base leading-relaxed text-[#111111] md:mb-10 md:text-xl md:leading-relaxed"
        >
          ב-Pixel Design אנחנו לא מעצבים{" "}
          <span className="whitespace-nowrap">
            {"\u201Cסתם עוד לוגו\u201D"}.
          </span>{" "}
          יחד איתכם, אנחנו יוצקים משמעות לתוך החזון שלכם ובונים זהות ויזואלית עוצמתית, מדויקת ובלתי
          נשכחת שתבליט את העסק שלכם מעל כולם.
        </motion.p>

        <motion.a
          href={WA_HREF}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 24, boxShadow: "0 4px 18px rgba(212, 175, 55, 0.2)" }}
          animate={
            reduceMotion
              ? { opacity: 1, y: 0, boxShadow: "0 4px 20px rgba(212, 175, 55, 0.2)" }
              : {
                  opacity: 1,
                  y: 0,
                  boxShadow: [
                    "0 4px 20px rgba(212, 175, 55, 0.22)",
                    "0 6px 36px rgba(212, 175, 55, 0.5)",
                    "0 4px 20px rgba(212, 175, 55, 0.22)",
                  ],
                }
          }
          transition={{
            opacity: { duration: 0.85, delay: 0.55, ease: [0.22, 1, 0.36, 1] },
            y: { duration: 0.85, delay: 0.55, ease: [0.22, 1, 0.36, 1] },
            boxShadow: reduceMotion
              ? { duration: 0 }
              : {
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1.35,
                },
          }}
          whileHover={
            reduceMotion
              ? {}
              : {
                  scale: 1.04,
                  boxShadow:
                    "0 2px 4px rgba(0,0,0,0.08), 0 0 0 1px rgba(184, 148, 46, 0.35), 0 10px 36px rgba(201, 162, 39, 0.28)",
                }
          }
          whileTap={{ scale: 0.98 }}
          className="display-font rounded-xl bg-gradient-to-br from-[#e8d49a] from-[5%] via-[#c9a42e] via-[45%] to-[#8f7020] to-[100%] px-8 py-4 text-lg font-bold text-[#1c1508] shadow-[0_2px_8px_rgba(0,0,0,0.06),0_0_0_1px_rgba(180,145,55,0.35),0_6px_24px_rgba(201,162,39,0.22)] transition-[filter] duration-300 hover:from-[#f0dfa8] hover:via-[#d4af37] hover:to-[#9a7824]"
        >
          אני רוצה מותג כזה
        </motion.a>
      </div>
    </section>
  );
}
