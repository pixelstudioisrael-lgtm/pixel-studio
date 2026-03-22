import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { publicUrl } from "@/lib/publicUrl";

/** public/אירונים חדשים/זכוכית מגדלת.svg — שלב 02 */
const STEP02_MAGNIFIER = publicUrl(
  `${encodeURIComponent("אירונים חדשים")}/${encodeURIComponent("זכוכית מגדלת.svg")}`,
);

const steps = [
  {
    image: publicUrl(encodeURI("אירונים חדשים/מצפן.svg")),
    number: "01.",
    title: "מיפוי ואסטרטגיה",
    description:
      "הבסיס לכל מותג מנצח. יחד איתכם נכיר לעומק את אופי העסק ונתכנן תוכנית מיתוג אסטרטגית התפורה בדיוק לכם.",
  },
  {
    image: STEP02_MAGNIFIER,
    number: "02.",
    title: "מחקר שוק ובידול",
    description:
      "נצלול לנתונים ונפענח את נקודות המפתח שיגרמו לכם להשאיר אבק למתחרים, לבנות סמכות בשוק ולהתבלט בכל זירה שבה העסק פועל.",
  },
  {
    image: publicUrl(encodeURI("אירונים חדשים/פלטת צבעים חדש SZG.svg")),
    number: "03.",
    title: "עיצוב מדויק",
    description:
      "השלב שבו החזון הופך למציאות. אנחנו נרקום עור וגידים לרעיון שלכם וניצור שפה ויזואלית עוצמתית, חדה ויוקרתית כזו שפשוט אי אפשר להתעלם ממנה.",
  },
];

export function ProcessSection() {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  // Each image rotates 360° as user scrolls through its section
  const img0Rotate = useTransform(scrollYProgress, [0, 0.25, 0.5], [0, 180, 360]);
  const img1Rotate = useTransform(scrollYProgress, [0.25, 0.5, 0.75], [0, 180, 360]);
  const img2Rotate = useTransform(scrollYProgress, [0.5, 0.75, 1], [0, 180, 360]);
  const imgRotations = [img0Rotate, img1Rotate, img2Rotate];

  return (
    <section
      ref={containerRef}
      dir="rtl"
      className="relative min-h-screen w-full overflow-hidden bg-[#F9F6F0] py-24"
    >
      {/* Background texture */}
      <div
        className="parchment-texture-layer absolute inset-0 pointer-events-none opacity-[0.45]"
        aria-hidden
      />

      <div className="relative z-10 mx-auto w-full max-w-5xl px-4">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-black text-[#111111] mb-4 display-font">
            התהליך שלנו
          </h2>
          <div className="mx-auto h-0.5 w-20 rounded-full bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
        </motion.div>

        {/* Vertical Timeline Layout */}
        <div className="relative flex flex-col gap-16 md:gap-24">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.1,
                type: "spring",
                stiffness: 80,
                damping: 16,
              }}
              viewport={{ once: true, margin: "-120px" }}
              className="relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-12 md:odd:flex-row-reverse"
            >
              {/* Content side — centered on mobile, alternating on desktop */}
              <div
                className={
                  index % 2 === 0
                    ? "flex flex-1 flex-col items-stretch text-right md:items-start"
                    : "flex flex-1 flex-col items-stretch text-right md:items-end"
                }
              >
                <h3 className="mb-3 display-font text-2xl font-bold text-[#111111] md:text-3xl">
                  <span className="font-extrabold text-[#D4AF37]">{step.number}</span>{" "}
                  <span>{step.title}</span>
                </h3>
                <p className="body-font max-w-xl text-base leading-relaxed text-[#444444] md:text-lg">
                  {step.description}
                </p>
              </div>

              {/* Image side — rotates in place on scroll */}
              <motion.div
                style={{ rotate: imgRotations[index] }}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="flex-1 w-full max-w-sm"
              >
                <div className="relative overflow-hidden aspect-square bg-transparent">
                  <img
                    src={step.image}
                    alt={`${step.number} ${step.title}`}
                    loading="lazy"
                    decoding="async"
                    className={
                      index === 2
                        ? "h-full w-full origin-center scale-[0.85] object-contain"
                        : "h-full w-full object-contain"
                    }
                  />
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
