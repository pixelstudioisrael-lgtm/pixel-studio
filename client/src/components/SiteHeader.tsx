import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { publicUrl } from "@/lib/publicUrl";

/** תמונה בראש תפריט המובייל — public/אירונים חדשים/מצפן.webp */
const MOBILE_MENU_IMG = publicUrl(
  `${encodeURIComponent("אירונים חדשים")}/${encodeURIComponent("מצפן.webp")}`,
);

const NAV_ITEMS = [
  { href: "/", label: "דף הבית" },
  { href: "/portfolio", label: "גלריה" },
  { href: "/terms", label: "תקנון ותנאי שימוש" },
] as const;

function useIsActive(href: string) {
  const [location] = useLocation();
  return location === href || (href !== "/" && location.startsWith(href));
}

function NavLink({
  href,
  children,
  onNavigate,
  className = "",
}: {
  href: string;
  children: ReactNode;
  onNavigate?: () => void;
  className?: string;
}) {
  const active = useIsActive(href);
  return (
    <Link
      href={href}
      onClick={onNavigate}
      className={`body-font text-sm md:text-base font-medium transition-colors hover:text-[#D4AF37] max-md:whitespace-nowrap ${
        active ? "text-[#D4AF37]" : "text-[#111111]"
      } ${className}`}
    >
      {children}
    </Link>
  );
}

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [location] = useLocation();
  const reduceMotion = useReducedMotion();
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const mobileMenuPortal =
    mounted &&
    createPortal(
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[500] flex items-center justify-center p-4 pt-[max(1rem,env(safe-area-inset-top))] pb-[max(1.25rem,env(safe-area-inset-bottom))] md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <button
              type="button"
              className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
              aria-label="סגור תפריט"
              onClick={closeMenu}
            />
            <motion.div
              id="mobile-nav-dialog"
              role="dialog"
              aria-modal="true"
              aria-label="תפריט ניווט"
              className="relative z-10 w-full max-w-[22rem] max-h-[min(85dvh,32rem)] overflow-y-auto overscroll-contain rounded-2xl border-2 border-[#E8E5DC] bg-[#F9F6F0] px-6 pb-7 pt-6 shadow-2xl"
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ type: "spring", damping: 26, stiffness: 320 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={closeMenu}
                className="absolute right-2 top-2 z-20 rounded-full p-2 text-[#111111] transition-colors hover:bg-black/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
                aria-label="סגור תפריט"
              >
                <X className="h-6 w-6" strokeWidth={2.25} />
              </button>
              <div className="mb-5 flex flex-col items-center pt-2">
                <motion.img
                  src={MOBILE_MENU_IMG}
                  alt=""
                  className="h-auto max-h-[6.5rem] w-auto origin-center object-contain object-center drop-shadow-md"
                  loading="lazy"
                  decoding="async"
                  initial={{ rotate: 0 }}
                  animate={{ rotate: reduceMotion ? 0 : 1080 }}
                  transition={{
                    duration: reduceMotion ? 0 : 1.25,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                />
              </div>
              <ul className="flex flex-col gap-1">
                {NAV_ITEMS.map((item) => (
                  <MobileNavRow key={item.href} href={item.href} label={item.label} onNavigate={closeMenu} />
                ))}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>,
      document.body
    );

  return (
    <>
    <header
      className="sticky top-0 z-[200] w-full border-b border-[#E8E5DC] bg-[#F9F6F0]/95 backdrop-blur-md shadow-sm"
      role="banner"
    >
      {/* מובייל: המבורגר מימין, PIXEL DESIGN משמאל (ב־RTL: ראשון=ימין, שני=שמאל) */}
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:hidden">
        <button
          type="button"
          className="rounded-lg p-2 text-black hover:bg-black/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:ring-offset-2"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav-dialog"
          aria-label={menuOpen ? "סגור תפריט" : "פתח תפריט"}
          onClick={() => setMenuOpen((o) => !o)}
        >
          {menuOpen ? <X className="h-7 w-7 stroke-[2.5]" /> : <Menu className="h-7 w-7 stroke-[2.5]" />}
        </button>
        <span
          lang="en"
          className="shrink-0 whitespace-nowrap text-black font-extralight text-[11px] tracking-[0.06em]"
          style={{ fontFamily: '"Apple Color Emoji"' }}
        >
          PIXEL DESIGN
        </span>
      </div>

      {/* דסקטופ: ניווט מלא */}
      <nav
        className="mx-auto hidden max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-3 md:flex md:gap-6 md:py-4"
        aria-label="ניווט ראשי"
      >
        <div className="flex min-w-0 flex-1 flex-wrap items-center justify-start gap-4 md:gap-8">
          <NavLink href="/">דף הבית</NavLink>
          <ul className="flex flex-wrap items-center justify-start gap-4 md:gap-8">
            <li>
              <NavLink href="/portfolio">גלריה</NavLink>
            </li>
            <li>
              <NavLink href="/terms">תקנון ותנאי שימוש</NavLink>
            </li>
          </ul>
        </div>

        <span
          lang="en"
          className="shrink-0 whitespace-nowrap text-[#D4AF37] font-extralight text-sm tracking-[0.2em] md:text-base"
          style={{ fontFamily: "system-ui, 'Segoe UI', sans-serif" }}
        >
          PIXEL DESIGN
        </span>
      </nav>
    </header>
    {mobileMenuPortal}
    </>
  );
}

function MobileNavRow({
  href,
  label,
  onNavigate,
}: {
  href: string;
  label: string;
  onNavigate: () => void;
}) {
  const active = useIsActive(href);
  return (
    <li>
      <Link
        href={href}
        onClick={onNavigate}
        className={`body-font block rounded-xl px-4 py-3 text-center text-lg font-semibold transition-colors ${
          active ? "text-[#D4AF37]" : "text-[#111111] hover:bg-[#E8E5DC]/60"
        }`}
      >
        {label}
      </Link>
    </li>
  );
}
