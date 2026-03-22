import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "wouter";

const FLYING_MACHINE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663459270785/T2vXmtCoKPgG35XUxSP9Qu/flying-machine-parallax-WYCWkoezX3SivLS79kjV9q.webp";

const PORTFOLIO_BASE = `/portfolio-assets/${encodeURIComponent("תיק עבודות")}`;
const projects = [
  {
    title: "אלי קדושים",
    category: "Branding",
    description: "ביטוח • פנסיה • פיננסים",
    image: `${PORTFOLIO_BASE}/11.png`,
  },
  {
    title: "יהונתן אצור",
    category: "Branding",
    description: "משרד עורכי דין",
    image: `${PORTFOLIO_BASE}/12.png`,
  },
  {
    title: "Silora Couture",
    category: "Branding",
    description: "Bridal Dresses Atelier",
    image: `${PORTFOLIO_BASE}/53.png`,
  },
  {
    title: "Naama Hrshkovitz",
    category: "Branding",
    description: "Eyebrows Artist",
    image: `${PORTFOLIO_BASE}/52.png`,
  },
  {
    title: "Raziel Jewelry",
    category: "Branding",
    description: "זוהר של רגעים בלתי נשכחים",
    image: `${PORTFOLIO_BASE}/6.png`,
  },
  {
    title: "Elistone Solutions",
    category: "Branding",
    description: "Your Natural Choice",
    image: `${PORTFOLIO_BASE}/7.png`,
  },
  {
    title: "Elifine",
    category: "Branding",
    description: "Hair Designer",
    image: `${PORTFOLIO_BASE}/1.png`,
  },
  {
    title: "יולי בולבי",
    category: "Branding",
    description: "Medical Esthetician",
    image: `${PORTFOLIO_BASE}/${encodeURIComponent("יולי בולבי.png")}`,
  },
  {
    title: "תהל אור",
    category: "Branding",
    description: "חשמלאי מוסמך • מקצוענות פוגשת אמינות",
    image: `${PORTFOLIO_BASE}/24.png`,
  },
];

export function PortfolioSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [, setLocation] = useLocation();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  // Parallax effect for artistic background
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.2, 0.35, 0.2]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowRight") {
        setLightboxIndex((i) => ((i ?? 0) + 1) % projects.length);
      }
      if (e.key === "ArrowLeft") {
        setLightboxIndex((i) => ((i ?? 0) - 1 + projects.length) % projects.length);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lightboxIndex]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full py-20 px-4 bg-white overflow-hidden"
    >
      {/* Slowly moving artistic background */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url('${FLYING_MACHINE}')`,
          backgroundSize: "600px 300px",
          backgroundRepeat: "repeat",
          backgroundPosition: "center",
          y: backgroundY,
          opacity: backgroundOpacity,
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="display-font mb-4 font-black text-[#111111] text-5xl md:text-6xl max-md:max-w-full max-md:whitespace-nowrap max-md:leading-[1.05] max-md:text-[clamp(1.35rem,8.5vw,2.75rem)]">
            גלריית עבודות
          </h2>
          <div className="mx-auto h-0.5 w-24 rounded-full bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
        </motion.div>

        {/* Museum Gallery Grid — מובייל: 2 בעמודה × 3 שורות (6 פריטים); md+: ללא שינוי */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 items-stretch gap-2 sm:gap-3 md:gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              whileHover={{ y: -12 }}
              className={
                index >= 6
                  ? "group hidden h-full cursor-pointer md:flex"
                  : "group flex h-full cursor-pointer"
              }
              onClick={() => setLightboxIndex(index)}
            >
              {/* Vintage Frame — ריפוד מינימלי, גובה שווה בשורה */}
              <div className="relative flex h-full min-h-0 w-full flex-col bg-[#F9F6F0] p-1 shadow-lg transition-shadow duration-300 hover:shadow-2xl md:p-2">
                {/* Inner frame line */}
                <div className="pointer-events-none absolute inset-1 border border-[#D4AF37]/40 md:inset-1.5" />

                {/* Gallery image — כמעט ללא ריפוד מתוך המסגרת */}
                <div className="relative w-full shrink-0 aspect-square overflow-hidden border-2 border-[#E8E5DC] bg-gradient-to-br from-[#D4AF37]/5 to-[#0055FF]/5">
                  <motion.div
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage: `url('${FLYING_MACHINE}')`,
                      backgroundSize: "200%",
                    }}
                    animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  />
                  <img
                    src={project.image}
                    alt={project.title}
                    className="absolute inset-0 z-10 h-full w-full object-cover"
                  />
                </div>

                {/* טקסט — קומפקטי, פחות ריווח בין שורות */}
                <div className="mt-1.5 flex shrink-0 flex-col border-t border-[#E8E5DC] pt-1.5 md:mt-2 md:pt-2">
                  <div className="mb-0.5 flex items-center justify-between gap-1">
                    <span className="display-font text-center text-[0.65rem] font-bold uppercase leading-none tracking-wide text-[#D4AF37] md:text-[0.7rem]">
                      {project.category}
                    </span>
                    <motion.div
                      className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-[#D4AF37] opacity-0 transition-opacity group-hover:opacity-100 md:h-5 md:w-5"
                      whileHover={{ scale: 1.1 }}
                    >
                      <span className="text-[0.6rem] text-[#D4AF37] md:text-xs">→</span>
                    </motion.div>
                  </div>

                  <h3 className="display-font mb-0.5 line-clamp-2 text-sm font-bold leading-tight text-[#111111] transition-colors group-hover:text-[#D4AF37] md:text-base">
                    {project.title}
                  </h3>

                  <p className="body-font line-clamp-2 text-[0.7rem] leading-snug text-[#666666] md:text-xs">
                    {project.description}
                  </p>
                </div>

                <div className="pointer-events-none absolute right-1 top-1 h-2 w-2 border-t border-r border-[#D4AF37]/30 md:right-1.5 md:top-1.5" />
                <div className="pointer-events-none absolute bottom-1 left-1 h-2 w-2 border-b border-l border-[#D4AF37]/30 md:bottom-1.5 md:left-1.5" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Gallery footer text and button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-[#999999] body-font italic mb-6">
            {"\u201Cפשטות היא התחכום האולטימטיבי.\u201D — לאונרדו דה וינצ'י"}
          </p>
          <motion.button
            onClick={() => setLocation("/portfolio")}
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(212, 175, 55, 0.4)" }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-[#D4AF37] text-[#111111] font-bold rounded-lg hover:bg-[#E5C158] transition-all duration-300 display-font"
          >
            צפה בגלריה המלאה
          </motion.button>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] bg-black/90 flex items-center justify-center p-4"
            onClick={() => setLightboxIndex(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 24 }}
              className="relative w-full max-w-5xl max-h-[90vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={projects[lightboxIndex].image}
                alt={projects[lightboxIndex].title}
                className="max-w-full max-h-[82vh] object-contain rounded-lg shadow-2xl"
              />

              <button
                type="button"
                dir="ltr"
                onClick={() =>
                  setLightboxIndex((i) => ((i ?? 0) - 1 + projects.length) % projects.length)
                }
                className="absolute left-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/25 md:left-6"
                aria-label="התמונה הקודמת"
              >
                <ChevronLeft className="h-7 w-7 shrink-0" aria-hidden strokeWidth={2.25} />
              </button>

              <button
                type="button"
                dir="ltr"
                onClick={() =>
                  setLightboxIndex((i) => ((i ?? 0) + 1) % projects.length)
                }
                className="absolute right-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/25 md:right-6"
                aria-label="התמונה הבאה"
              >
                <ChevronRight className="h-7 w-7 shrink-0" aria-hidden strokeWidth={2.25} />
              </button>

              <button
                type="button"
                onClick={() => setLightboxIndex(null)}
                className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/15 text-white text-xl hover:bg-white/25 transition"
                aria-label="סגור"
              >
                ×
              </button>

              <button
                type="button"
                onClick={() => setLocation("/portfolio")}
                className="display-font absolute bottom-4 left-1/2 -translate-x-1/2 rounded-lg px-3 py-1.5 text-sm font-bold text-[#F9F6F0] transition-all duration-300 max-md:bottom-3 max-md:border-[0.5px] max-md:border-white/55 max-md:bg-transparent max-md:hover:bg-white/10 md:border md:border-[#D4AF37]/50 md:bg-[#D4AF37]/15 md:px-6 md:py-3 md:text-base md:shadow-sm md:backdrop-blur-sm md:hover:bg-[#D4AF37]/30"
              >
                לתיק העבודות המלא
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
