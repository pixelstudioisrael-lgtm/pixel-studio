import { motion } from "framer-motion";

import { publicUrl } from "@/lib/publicUrl";

const WHATSAPP_ICON = publicUrl(encodeURIComponent("כפתור ווצאפ.webp"));

/** אותו קישור כמו ב-FinalCTA / Footer */
const WA_HREF =
  "https://wa.me/972552892682?text=%D7%A9%D7%9C%D7%95%D7%9D%20Pixel%20Studio";

/**
 * כפתור וואטסאפ צף — קבוע למטה-שמאל (מתאים ל־RTL).
 */
export function FloatingWhatsAppButton() {
  return (
    <motion.a
      href={WA_HREF}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 left-8 z-50 flex h-14 w-14 items-center justify-center rounded-full border border-[#E8E5DC] bg-white shadow-lg hover:shadow-xl"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1 }}
      title="צור קשר בוואטסאפ"
    >
      <img
        src={WHATSAPP_ICON}
        alt="וואטסאפ"
        className="pointer-events-none h-8 w-8 object-contain"
        draggable={false}
        loading="lazy"
        decoding="async"
      />
    </motion.a>
  );
}
