import { motion, useReducedMotion } from "framer-motion";
import { Phone } from "lucide-react";
import { publicUrl } from "@/lib/publicUrl";

const HERO_BG = publicUrl("hero-background.webp");
const COMPASS_IMG = publicUrl(`__manus__/${encodeURIComponent("מחוגה.png")}`);
const VITRUVIAN_IMG = publicUrl(
  `__manus__/${encodeURIComponent("davinci-vitruvian-wireframe.webp")}`,
);

const WA_HREF =
  "https://wa.me/972552892682?text=%D7%A9%D7%9C%D7%95%D7%9D%20Pixel%20Studio";

/**
 * CTA סיום גלריה — מסגרת זהב רציפה, רקע שרטוט + מחוגה / ויטרוביוס כמו באתר.
 */
export function FinalCTA() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, margin: "-80px", amount: 0.15 }}
      className="relative mt-24 text-center md:mt-32"
      aria-labelledby="final-cta-heading"
    >
      <div className="relative mx-auto max-w-4xl px-1 sm:px-2">
        {/* מסגרת זהב רציפה ~1px — גרדיאנט מטאלי */}
        <div
          className="relative rounded-[3px] p-px shadow-[0_0_0_1px_rgba(212,175,55,0.14),0_1px_3px_rgba(0,0,0,0.04)]"
          style={{
            background:
              "linear-gradient(135deg, #f2e6c8 0%, #e0c66a 18%, #d4af37 42%, #b8942e 62%, #8a6a12 88%, #5c4810 100%)",
          }}
        >
          <div className="relative overflow-hidden rounded-[2px] bg-[#F9F6F0]">
            <div className="pointer-events-none absolute inset-0 bg-[#F9F6F0]" aria-hidden />
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.42]"
              style={{
                backgroundImage: `url('${HERO_BG}')`,
                backgroundRepeat: "repeat-y",
                backgroundSize: "100% auto",
                backgroundPosition: "center top",
              }}
              aria-hidden
            />

            <img
              src={COMPASS_IMG}
              alt=""
              className="pointer-events-none absolute right-0 top-0 z-0 h-auto w-[min(52%,10.5rem)] max-w-[11rem] -translate-y-1 translate-x-1 select-none object-contain opacity-[0.07] mix-blend-multiply saturate-[0.45] sm:w-[min(44%,12rem)] sm:max-w-[13rem] md:opacity-[0.09] lg:max-w-[15rem]"
              style={{ filter: "grayscale(0.85) contrast(0.95)" }}
              loading="lazy"
              decoding="async"
            />

            <img
              src={VITRUVIAN_IMG}
              alt=""
              className="pointer-events-none absolute bottom-0 left-0 z-0 h-auto w-[min(62%,13rem)] max-w-[15rem] translate-y-1 -translate-x-1 select-none object-contain object-left-bottom opacity-[0.147] mix-blend-multiply saturate-[0.5] sm:w-[min(54%,14rem)] sm:max-w-[16rem] md:opacity-[0.176] lg:max-w-[17rem]"
              style={{ filter: "grayscale(0.8) contrast(0.95)" }}
              loading="lazy"
              decoding="async"
            />

            <div className="relative z-10 px-4 py-12 sm:px-6 sm:py-14 md:px-8 md:py-16">
              <h2
                id="final-cta-heading"
                className="display-font mx-auto mb-5 max-w-3xl text-[clamp(1.625rem,4.8vw,3rem)] font-black leading-[1.2] tracking-tight text-neutral-900 md:mb-6"
              >
                הגיע הזמן לקחת את המותג שלכם לשלב הבא.
              </h2>

              <p className="body-font mx-auto mb-6 max-w-2xl text-base leading-relaxed text-gray-700 sm:text-lg md:mb-8 md:text-xl md:leading-[1.7]">
                הצטרפו ל
                <span className="bg-gradient-to-r from-[#8a6a12] via-[#c9a227] to-[#a67c1a] bg-clip-text font-semibold text-transparent">
                  מאות בעלי עסקים
                </span>
                {" "}שכבר יצאו איתנו למסע ויזואלי והפכו רעיון למציאות.
              </p>

              <motion.p
                className="body-font origin-top mx-auto mb-10 flex max-w-xl flex-wrap items-center justify-center gap-2 text-sm font-medium sm:mb-12 sm:text-base"
                initial={false}
                animate={
                  reduceMotion
                    ? {}
                    : {
                        /* נדנדה: סיבוב קל סביב ציר עליון — ימין / שמאל */
                        rotate: [0, 5.5, -5.5, 0],
                      }
                }
                transition={
                  reduceMotion
                    ? {}
                    : {
                        duration: 0.85,
                        repeat: Infinity,
                        repeatDelay: 3.15,
                        ease: [0.45, 0.05, 0.55, 0.95],
                        times: [0, 0.38, 0.72, 1],
                      }
                }
              >
                {/* ב-RTL: האייקון ראשון ב-DOM = מימין למשפט */}
                <Phone
                  className="h-4 w-4 shrink-0 text-[#b8942e] sm:h-[1.1rem] sm:w-[1.1rem]"
                  strokeWidth={2}
                  aria-hidden
                />
                <span className="text-[#7a6220]">
                  שיחת ייעוץ לגמרי בחינם וללא התחייבות.
                </span>
              </motion.p>

              <motion.a
                href={WA_HREF}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{
                  scale: 1.04,
                  boxShadow:
                    "0 2px 4px rgba(0,0,0,0.08), 0 0 0 1px rgba(184, 148, 46, 0.35), 0 10px 36px rgba(201, 162, 39, 0.28), 0 0 48px rgba(212, 175, 55, 0.18)",
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 420, damping: 24 }}
                className="relative inline-block rounded-xl bg-gradient-to-br from-[#e8d49a] from-[5%] via-[#c9a42e] via-[45%] to-[#8f7020] to-[100%] px-10 py-4 text-lg font-bold text-[#1c1508] shadow-[0_2px_8px_rgba(0,0,0,0.06),0_0_0_1px_rgba(180,145,55,0.35),0_6px_24px_rgba(201,162,39,0.22)] display-font transition-[filter] duration-300 hover:from-[#f0dfa8] hover:via-[#d4af37] hover:to-[#9a7824] sm:px-12 sm:py-[1.15rem] sm:text-xl"
              >
                אני רוצה מותג כזה
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
