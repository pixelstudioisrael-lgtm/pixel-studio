import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";
import { ContactSection } from "@/components/ContactSection";
import { FloatingWhatsAppButton } from "@/components/FloatingWhatsAppButton";
import { publicUrl } from "@/lib/publicUrl";

const COMPASS_IMG = publicUrl(`__manus__/${encodeURIComponent("מחוגה.png")}`);
const FOOTER_BG = publicUrl(encodeURI("hero-background (1).png"));

const EMAIL = "pixelstudioisrael@gmail.com";
const MAILTO = `mailto:${EMAIL}`;
const WA_DISPLAY = "0552892682";
const WA_HREF = "https://wa.me/972552892682";
const ADDRESS = "החצב 1, זיכרון יעקב";

/** מחוגה — סיבוב בכניסה לתצוגה, ואז כל 5 שניות */
function FooterCompassDecoration() {
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

export function FooterSection() {
  return (
    <section
      dir="rtl"
      className="relative w-full overflow-visible border-t border-[#D4AF37] px-4 pb-16 pt-24 text-[#111111] md:pb-20 md:pt-28"
    >
      {/* רקע קלף — cover + מרכוז, מתאים מובייל ודסקטופ */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 bg-[#F9F6F0] bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('${FOOTER_BG}')` }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 bg-[#F9F6F0]/88"
      />

      {/* מחוגה על קו הזהב בין המלצות לפוטר, מעל הכותרת */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 z-20 -translate-x-1/2 -translate-y-1/2"
        aria-hidden
      >
        <FooterCompassDecoration />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="mb-14 grid grid-cols-1 items-start gap-3 md:mb-16 md:grid-cols-2 md:gap-x-16 md:items-start lg:gap-x-20">
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className="flex flex-col items-center text-center md:items-start md:text-right"
          >
            <h2 className="display-font mb-4 max-w-xl text-3xl font-black leading-tight text-[#111111] md:mb-6 md:text-4xl lg:text-5xl">
              לשיחת אסטרטגיה חינם צרו איתנו קשר
            </h2>
            <p className="body-font max-w-xl text-base leading-relaxed text-slate-700 md:text-lg">
              אנחנו כאן כדי להפוך את הרעיון שלך למציאות מדהימה. בואו נדבר על איך אנו יכולים לעזור לעסק שלך.
            </p>
          </motion.div>

          <div className="w-full md:self-start">
            <ContactSection />
          </div>
        </div>

        <motion.div
          className="mb-8 h-px w-full bg-gradient-to-r from-transparent via-[#D4AF37]/80 to-transparent"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          style={{ transformOrigin: "center" }}
          aria-hidden
        />

        {/* פרטי קשר + זכויות — בשורה אחת בדסקטופ; אייקון מימין לטקסט (RTL) */}
        <div className="flex flex-col items-center gap-6 md:gap-10">
          <div className="flex w-full flex-col items-center justify-center gap-5 md:flex-row md:flex-wrap md:gap-x-10 md:gap-y-4">
            <motion.div
              className="flex flex-row items-center justify-center gap-2.5"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 28 }}
            >
              <MapPin className="h-5 w-5 shrink-0 text-[#D4AF37]" strokeWidth={2} aria-hidden />
              <span className="body-font text-slate-700">{ADDRESS}</span>
            </motion.div>

            <motion.div
              className="flex flex-row items-center justify-center gap-2.5"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 28 }}
            >
              <Mail className="h-5 w-5 shrink-0 text-[#D4AF37]" strokeWidth={2} aria-hidden />
              <a
                href={MAILTO}
                className="body-font text-slate-700 transition-colors hover:text-[#b8942e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#F9F6F0]"
              >
                {EMAIL}
              </a>
            </motion.div>

            <motion.div
              className="flex flex-row items-center justify-center gap-2.5"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 28 }}
            >
              <Phone className="h-5 w-5 shrink-0 text-[#D4AF37]" strokeWidth={2} aria-hidden />
              <a
                href={WA_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="body-font text-slate-700 transition-colors hover:text-[#b8942e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#F9F6F0]"
              >
                {WA_DISPLAY}
              </a>
            </motion.div>
          </div>

          <p className="body-font text-center text-sm text-slate-600">
            © 2026 Pixel Studio. כל הזכויות שמורות.
          </p>
        </div>
      </div>

      <FloatingWhatsAppButton />
    </section>
  );
}
