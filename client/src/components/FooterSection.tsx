import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";
import { CompassSpinDecoration } from "@/components/CompassSpinDecoration";
import { ContactSection } from "@/components/ContactSection";
import { FloatingWhatsAppButton } from "@/components/FloatingWhatsAppButton";
import { publicUrl } from "@/lib/publicUrl";

const FOOTER_BG = publicUrl("hero-background.webp");

const EMAIL = "pixelstudioisrael@gmail.com";
const MAILTO = `mailto:${EMAIL}`;
const WA_DISPLAY = "0552892682";
const WA_HREF = "https://wa.me/972552892682";
const ADDRESS = "החצב 1, זיכרון יעקב";

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
        <CompassSpinDecoration />
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
            <h2 className="display-font mb-4 max-w-xl text-3xl font-black leading-tight text-[#722F37] md:mb-6 md:text-4xl lg:text-5xl">
              לשיחת אסטרטגיה חינם צרו איתנו קשר
            </h2>
            <p className="body-font max-w-xl text-base leading-relaxed text-[#111111] md:text-lg">
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
              <span className="body-font text-[#111111]">{ADDRESS}</span>
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
                className="body-font text-[#111111] transition-colors hover:text-[#b8942e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#F9F6F0]"
              >
                {WA_DISPLAY}
              </a>
            </motion.div>
          </div>

          <p className="body-font text-center text-sm text-[#111111]">
            © 2026 Pixel Studio. כל הזכויות שמורות.
          </p>
        </div>
      </div>

      <FloatingWhatsAppButton />
    </section>
  );
}
