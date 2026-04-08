import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useMemo } from "react";
import { publicUrl } from "@/lib/publicUrl";
import { HeroSection } from "@/components/HeroSection";
import { useIsMobile } from "@/hooks/useMobile";
import { ScrollHookSection } from "@/components/ScrollHookSection";
import { ProcessSection } from "@/components/ProcessSection";
import { PortfolioSection } from "@/components/PortfolioSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { FooterSection } from "@/components/FooterSection";
import { HOME_PAGE_DESCRIPTION, HOME_PAGE_TITLE, setPageMeta } from "@/lib/pageMeta";

const FLYING_MACHINE_IMG = publicUrl(encodeURIComponent("מכונה מעופפת ללא רקע.webp"));
const CLOUD_IMG = publicUrl("עננים.webp");

/** מובייל: פיזור סימטרי לפני גלילה (RTL היה מכווץ לצד) */
const CLOUD_LEFT_MOBILE = ["6%", "22%", "40%", "58%", "74%"] as const;
const CLOUD_LEFT_DESKTOP = ["8%", "28%", "48%", "62%", "78%"] as const;

/**
 * Pixel Design - Premium Landing Page
 * Design Philosophy: Modern Renaissance Maximalism
 *
 * Color Palette:
 * - Background: Cream/Off-White (#F9F6F0)
 * - Text: Sharp Black (#111111)
 * - Accents: Fine Gold (#D4AF37)
 * - Highlights: Electric Blue (#0055FF)
 *
 * Typography:
 * - Display: Heebo (Hebrew-optimized, geometric)
 * - Body: Assistant (Hebrew-optimized, readable)
 *
 * Animation Philosophy:
 * - Scroll-driven narrative
 * - Framer Motion for complex interactions
 * - Golden ratio and geometric precision
 * - Parallax effects for depth
 */

export default function Home() {
  useEffect(() => {
    setPageMeta(HOME_PAGE_TITLE, HOME_PAGE_DESCRIPTION);
  }, []);

  const { scrollY } = useScroll();
  const isMobile = useIsMobile();

  /** מובייל: חצי מרחק גלילה לאותה אנימציה (נכנס מוקדם, מסיים מהר). דסקטופ: ללא שינוי */
  const fmScroll = useMemo(() => (isMobile ? [0, 350, 750] : [0, 700, 1500]), [isMobile]);
  const fmOpacityScroll = useMemo(() => (isMobile ? [0, 5, 660, 750] : [0, 5, 1320, 1500]), [isMobile]);
  const cloudScroll = useMemo(() => (isMobile ? [0, 125, 300] : [0, 250, 600]), [isMobile]);
  const cloudOpacityScroll = useMemo(() => (isMobile ? [0, 75, 250, 450] : [0, 150, 500, 900]), [isMobile]);

  // מכונה מעופפת — באותו גובה כמו העננים, דבוקה לקו, חולפת שמאל→ימין
  const flyingMachineX = useTransform(scrollY, fmScroll, ["-90vw", "0vw", "100vw"]);
  const flyingMachineOpacity = useTransform(scrollY, fmOpacityScroll, [0, 0.85, 0.85, 0]);

  // עננים על התפר — מתחילים לזוז מהגלילה הראשונה
  const cloud0X = useTransform(scrollY, cloudScroll, [0, -180, -380]);
  const cloud1X = useTransform(scrollY, cloudScroll, [0, 160, 340]);
  const cloud2X = useTransform(scrollY, cloudScroll, [0, -140, -300]);
  const cloud3X = useTransform(scrollY, cloudScroll, [0, 200, 420]);
  const cloud4X = useTransform(scrollY, cloudScroll, [0, -120, -260]);
  const cloudOpacity = useTransform(scrollY, cloudOpacityScroll, [0.95, 0.9, 0.35, 0.05]);
  const clouds = [
    { x: cloud0X, scale: 0.7 },
    { x: cloud1X, scale: 0.85 },
    { x: cloud2X, scale: 0.65 },
    { x: cloud3X, scale: 0.75 },
    { x: cloud4X, scale: 0.6 },
  ];

  return (
    <div className="home-parchment-bg w-full min-h-screen overflow-x-hidden">
      {/* Hero Section: The Golden Ratio Reveal */}
      <HeroSection />

      {/* עננים ומכונה — במובייל: LTR לפיזור סימטרי, מרווח תחתון נוסף ~1.5 ס״מ */}
      <div
        className="relative h-px w-full max-md:mt-[calc(2.5rem+1.5cm)] md:mt-0"
        dir="ltr"
      >
        {clouds.map((cloud, i) => (
          <motion.div
            key={i}
            className="pointer-events-none absolute bottom-0 left-0 z-[100]"
            style={{
              left: isMobile ? CLOUD_LEFT_MOBILE[i] : CLOUD_LEFT_DESKTOP[i],
              width: isMobile
                ? "clamp(100px, 17vw, 150px)"
                : "clamp(140px, 22vw, 220px)",
              x: cloud.x,
              opacity: cloudOpacity,
              transformOrigin: "center bottom",
            }}
          >
            <img
              src={CLOUD_IMG}
              alt=""
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className="w-full h-auto object-contain"
              style={{ transform: `scale(${cloud.scale * 1.15 * 1.3})` }}
            />
          </motion.div>
        ))}
        {/* מכונה מעופפת — אותו גובה כמו העננים, חולפת שמאל→ימין */}
        <motion.div
          className="absolute bottom-0 left-1/2 pointer-events-none z-[90] -translate-x-1/2"
          style={{
            x: flyingMachineX,
            opacity: flyingMachineOpacity,
            transformOrigin: "center bottom",
          }}
          aria-hidden
        >
          <img
            src={FLYING_MACHINE_IMG}
            alt=""
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="h-auto w-60 max-md:translate-y-6 object-contain drop-shadow-lg sm:w-72 md:w-[21rem] md:translate-y-20"
          />
        </motion.div>
      </div>

      {/* Scroll Hook: The Chronos Descent */}
      <ScrollHookSection />

      {/* Process Section: The Clockwork */}
      <ProcessSection />

      {/* Portfolio Section: The Flying Machines */}
      <PortfolioSection />

      {/* Testimonials Section: The Codex */}
      <TestimonialsSection />

      {/* Footer/Contact Section: The Master's Desk */}
      <FooterSection />
    </div>
  );
}
