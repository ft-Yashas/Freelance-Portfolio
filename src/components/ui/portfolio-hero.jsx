import { useState, useEffect, useRef, useMemo } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";

/* ─── BlurText ─── */
export function BlurText({ text, delay = 50, animateBy = "words", direction = "top", className = "", style }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const segments = useMemo(
    () => (animateBy === "letters" ? text.split("") : text.split(" ")),
    [text, animateBy]
  );

  return (
    <span ref={ref} className={`inline-flex flex-wrap ${className}`} style={style}>
      {segments.map((seg, i) => (
        <motion.span
          key={i}
          style={{ display: "inline-block" }}
          initial={{ filter: "blur(10px)", opacity: 0, y: direction === "top" ? -20 : 20 }}
          animate={inView ? { filter: "blur(0px)", opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: i * (delay / 1000), ease: "easeOut" }}
        >
          {seg}
          {animateBy === "words" && i < segments.length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
    </span>
  );
}

/* ─── Standalone Hero Component (Decypher Lab branding) ─── */
export default function PortfolioHero() {
  const [isDark, setIsDark] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  const WA_URL = "https://wa.me/917975495881?text=Hi%21%20I'm%20interested%20in%20working%20with%20Decypher%20Lab.";

  const menuItems = [
    { label: "HOME", href: "#", highlight: true },
    { label: "SERVICES", href: "#services" },
    { label: "WORK", href: "#work" },
    { label: "PROCESS", href: "#process" },
    { label: "TESTIMONIALS", href: "#testimonials" },
    { label: "CONTACT", href: "#contact" },
  ];

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMenuOpen &&
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    if (next) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  };

  const bg = isDark ? "hsl(0 0% 2%)" : "hsl(0 0% 98%)";
  const fg = isDark ? "hsl(0 0% 100%)" : "hsl(0 0% 10%)";

  return (
    <div
      className="min-h-screen transition-colors"
      style={{ backgroundColor: bg, color: fg }}
    >
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 py-6">
        <nav className="flex items-center justify-between max-w-screen-2xl mx-auto">
          {/* Hamburger */}
          <div className="relative">
            <button
              ref={buttonRef}
              type="button"
              className="p-2 transition-colors duration-300 z-50 text-neutral-500 hover:text-black dark:hover:text-white"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={isMenuOpen ? "x" : "menu"}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  style={{ display: "flex" }}
                >
                  {isMenuOpen
                    ? <X className="w-8 h-8" strokeWidth={2} />
                    : <Menu className="w-8 h-8" strokeWidth={2} />}
                </motion.span>
              </AnimatePresence>
            </button>

            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  ref={menuRef}
                  initial={{ opacity: 0, y: -8, scaleY: 0.95 }}
                  animate={{ opacity: 1, y: 0, scaleY: 1 }}
                  exit={{ opacity: 0, y: -8, scaleY: 0.95 }}
                  transition={{ duration: 0.18 }}
                  className="absolute top-full left-0 w-[200px] md:w-[240px] shadow-2xl mt-2 ml-4 p-4 rounded-2xl z-[100]"
                  style={{ backgroundColor: bg, border: "1px solid rgba(254,45,45,0.15)" }}
                >
                  {menuItems.map((item, i) => (
                    <motion.a
                      key={item.label}
                      href={item.href}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 }}
                      className="block text-lg md:text-xl font-bold tracking-tight py-1.5 px-2 cursor-pointer transition-colors duration-200 rounded-lg"
                      style={{ color: item.highlight ? "#fe2d2d" : fg }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = "#fe2d2d"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = item.highlight ? "#fe2d2d" : fg; }}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </motion.a>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Logo */}
          <a href="#" className="flex items-center">
            <img src="/logo.svg" alt="Decypher Lab" style={{ height: 72, objectFit: "contain" }} />
          </a>

          {/* Theme toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            className="relative w-16 h-8 rounded-full hover:opacity-80 transition-opacity"
            style={{ backgroundColor: isDark ? "hsl(0 0% 15%)" : "hsl(0 0% 90%)" }}
            aria-label="Toggle theme"
          >
            <motion.div
              className="absolute top-1 left-1 w-6 h-6 rounded-full"
              style={{ backgroundColor: isDark ? "#fe2d2d" : "hsl(0 0% 10%)" }}
              animate={{ x: isDark ? "2rem" : 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            />
          </button>
        </nav>
      </header>

      {/* Hero */}
      <main className="relative min-h-screen flex flex-col">
        {/* Centered branding */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full px-4">
          <div className="relative text-center">
            {/* DECYPHER */}
            <div>
              <BlurText
                text="DECYPHER"
                delay={80}
                animateBy="letters"
                direction="top"
                className="font-bold justify-center whitespace-nowrap"
                style={{
                  fontSize: "clamp(52px, 11vw, 150px)",
                  lineHeight: 0.75,
                  letterSpacing: "-0.04em",
                  color: "#fe2d2d",
                  fontFamily: "'Fira Code', monospace",
                  display: "flex",
                }}
              />
            </div>

            {/* LAB */}
            <div>
              <BlurText
                text="LAB"
                delay={80}
                animateBy="letters"
                direction="top"
                className="font-bold justify-center whitespace-nowrap"
                style={{
                  fontSize: "clamp(65px, 13.5vw, 185px)",
                  lineHeight: 0.85,
                  letterSpacing: "-0.04em",
                  color: "#fe2d2d",
                  fontFamily: "'Fira Code', monospace",
                  display: "flex",
                }}
              />
            </div>
          </div>
        </div>

        {/* Tagline */}
        <div className="absolute bottom-16 sm:bottom-20 md:bottom-24 left-1/2 -translate-x-1/2 w-full px-6">
          <div className="flex justify-center">
            <BlurText
              text="Designing digital systems for businesses."
              delay={120}
              animateBy="words"
              direction="top"
              className="text-center"
              style={{
                fontSize: "clamp(14px, 2vw, 20px)",
                color: "rgb(120,120,120)",
                fontFamily: "'Sora', sans-serif",
                display: "flex",
                justifyContent: "center",
              }}
            />
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.button
          type="button"
          className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          aria-label="Scroll down"
          style={{ background: "none", border: "none", cursor: "pointer", color: "rgb(100,100,100)" }}
        >
          <ChevronDown className="w-5 h-5 md:w-8 md:h-8" />
        </motion.button>
      </main>
    </div>
  );
}
