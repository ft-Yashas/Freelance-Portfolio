import { useState, useEffect, useRef, useMemo } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, ArrowRight, Monitor, Smartphone, Layers, Zap, Send, MapPin, Mail, Phone } from "lucide-react";
import gymImg from "./assets/gym.png";
import cafeImg from "./assets/cafe.png";
import realImg from "./assets/realestate.png";
import testimonialBg from "./assets/testimonial-bg.jpg";
import portfolioBg from "./assets/portfolio-bg.jpg";

/* ══════════════════ CONSTANTS ══════════════════ */
const WA = "917975495881";
const WA_URL = `https://wa.me/${WA}?text=${encodeURIComponent("Hi! I'm interested in working with Decypher Lab. Let's discuss my project.")}`;
const EMAIL = "hello@decypherlab.in";
const PHONE = "+91 7975495881";
const INSTA = "https://www.instagram.com/decypherlab/";
const LOC = "Bangalore, India";

const NAV = [
  { l: "HOME", h: "#" },
  { l: "SERVICES", h: "#services" },
  { l: "WORK", h: "#work" },
  { l: "PROCESS", h: "#process" },
  { l: "TESTIMONIALS", h: "#testimonials" },
  { l: "CONTACT", h: "#contact" },
];

const STATS = [
  { s: "15+", l: "Projects Delivered" },
  { s: "98%", l: "Client Satisfaction" },
  { s: "3x", l: "Avg. Growth for Clients" },
  { s: "24h", l: "Response Time" },
];

const SERVICES = [
  { title: "Website Development", desc: "High-performance websites that load fast, rank well, and convert visitors into paying customers.", Icon: Monitor, wa: "Hi! I'm interested in working with Decypher Lab. Let's discuss my project about Website Development." },
  { title: "Mobile Applications", desc: "Native-quality apps for Android that your customers will genuinely enjoy using.", Icon: Smartphone, wa: "Hi! I'm interested in working with Decypher Lab. Let's discuss my project about Mobile App Development." },
  { title: "Automation & AI Systems", desc: "Intelligent workflows and AI-powered tools that eliminate busywork and scale your operations.", Icon: Layers, wa: "Hi! I'm interested in working with Decypher Lab. Let's discuss my project about Automation & AI Systems." },
  { title: "Performance & Redesign", desc: "Transform slow, outdated platforms into modern systems that drive measurable business growth.", Icon: Zap, wa: "Hi! I'm interested in working with Decypher Lab. Let's discuss my project about Performance & Redesign." },
];

const PROJECTS = [
  { title: "Fitness Yard Fitness", cat: "Gym & Fitness Website", desc: "A dynamic fitness platform with class bookings, trainer profiles, and membership management — built to convert walk-ins into loyal members.", accent: "#E84C3D", link: "https://gym-site-sample-single0html-file.vercel.app/", image: gymImg },
  { title: "Brewhouse", cat: "Café Ordering System", desc: "A sleek digital ordering experience for a specialty café — menu browsing, cart management, and real-time order tracking.", accent: "#D4851F", link: "https://cafe-site-sample-single-html-file.vercel.app/", image: cafeImg },
  { title: "Nuvora", cat: "Real Estate Advisory Platform", desc: "A premium real estate advisory platform for Bangalore — connecting verified buyers with high-value properties across Bangalore.", accent: "#2D8CF0", link: "https://real-estate-site-sample-single0html.vercel.app/", image: realImg },
];

const STEPS = [
  { n: "01", t: "Understand", d: "We learn your business, goals, audience, and the real problems worth solving." },
  { n: "02", t: "Design", d: "We architect the experience — wireframes, UI design, and interactive prototypes." },
  { n: "03", t: "Build", d: "Clean, scalable code. We develop with performance and maintainability at the core." },
  { n: "04", t: "Launch", d: "Rigorous QA, deployment, and a smooth handover — your product goes live with confidence." },
  { n: "05", t: "Scale", d: "Ongoing iteration, analytics, and optimization to keep your growth compounding." },
];

const TESTI = [
  { name: "Rahul Menon", role: "Founder, Fitness Yard", text: "Decypher Lab didn't just build us a website — they built a system that brings in new members every week. The quality exceeded every expectation.", ini: "RM" },
  { name: "Priya Sharma", role: "CEO, Brewhouse", text: "From day one, the team understood our vision. The ordering platform they delivered increased our average ticket size by 40%. Absolutely worth it.", ini: "PS" },
  { name: "Arjun Desai", role: "Director, Nuvora Consulting", text: "We needed a lead engine, not just a pretty page. Decypher Lab delivered both. Our inbound leads tripled within the first two months.", ini: "AD" },
];

/* ══════════════════ THEME ══════════════════ */
function getTheme(dark) {
  return dark ? {
    bg: "#050505",
    bg2: "#0d0d0d",
    tx: "#f0f0f0",
    txM: "#888888",
    txF: "#3d3d3d",
    ac: "#fe2d2d",
    acS: "rgba(254,45,45,0.07)",
    acSB: "rgba(254,45,45,0.2)",
    brd: "#1e1e1e",
    navBg: "rgba(5,5,5,0.88)",
  } : {
    bg: "#f8f8f8",
    bg2: "#ffffff",
    tx: "#0a0a0a",
    txM: "#555555",
    txF: "#aaaaaa",
    ac: "#c41010",
    acS: "rgba(196,16,16,0.07)",
    acSB: "rgba(196,16,16,0.2)",
    brd: "#e0e0e0",
    navBg: "rgba(248,248,248,0.88)",
  };
}

/* ══════════════════ ANIMATION PRIMITIVES ══════════════════ */
function BlurText({ text, delay = 50, animateBy = "words", direction = "top", className = "", style }) {
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

function FadeIn({ children, delay = 0, dir = "up", className = "", style }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -60px 0px" });
  const initMap = {
    up: { opacity: 0, y: 35 },
    down: { opacity: 0, y: -35 },
    left: { opacity: 0, x: 35 },
    right: { opacity: 0, x: -35 },
    scale: { opacity: 0, scale: 0.94, y: 10 },
    none: { opacity: 0 },
  };
  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial={initMap[dir] || initMap.up}
      animate={inView ? { opacity: 1, y: 0, x: 0, scale: 1 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ══════════════════ BACKGROUND DECORATIONS ══════════════════ */
function GridBg({ color }) {
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
      <svg width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
        <defs>
          <pattern id="sitegrid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke={color} strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#sitegrid)" />
      </svg>
    </div>
  );
}

function FloatingOrbs({ dark }) {
  const orbs = useMemo(() => [
    { size: 420, x: "15%", y: "20%", color: dark ? "rgba(254,45,45,0.06)" : "rgba(254,45,45,0.05)", dur: 18, delay: 0 },
    { size: 300, x: "75%", y: "60%", color: dark ? "rgba(254,45,45,0.04)" : "rgba(254,45,45,0.03)", dur: 22, delay: -5 },
    { size: 240, x: "60%", y: "10%", color: dark ? "rgba(254,45,45,0.03)" : "rgba(254,45,45,0.025)", dur: 20, delay: -10 },
  ], [dark]);
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          style={{
            position: "absolute", left: orb.x, top: orb.y,
            width: orb.size, height: orb.size, borderRadius: "50%",
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
            filter: "blur(40px)", transform: "translate(-50%, -50%)",
          }}
          animate={{ x: [0, 25, -15, 20, 0], y: [0, -18, 22, -12, 0] }}
          transition={{ duration: orb.dur, repeat: Infinity, ease: "easeInOut", delay: orb.delay }}
        />
      ))}
    </div>
  );
}

/* ══════════════════ ICONS ══════════════════ */
function WAIcon({ size = 24 }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size} aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

function IgIcon({ size = 20 }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width={size} height={size} aria-hidden>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

/* ══════════════════ NAVBAR ══════════════════ */
function Navbar({ isDark, toggleTheme, t }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const fn = (e) => {
      if (menuOpen && !e.target.closest("[data-nav-menu]") && !e.target.closest("[data-nav-btn]")) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, [menuOpen]);

  const go = (hash) => {
    setMenuOpen(false);
    if (hash === "#") window.scrollTo({ top: 0, behavior: "smooth" });
    else document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? t.navBg : "transparent",
      backdropFilter: scrolled ? "blur(20px) saturate(1.5)" : "none",
      borderBottom: scrolled ? `1px solid ${t.brd}` : "1px solid transparent",
      transition: "all 0.4s",
    }}>
      <nav style={{
        maxWidth: 1200, margin: "0 auto", padding: "0 24px",
        display: "flex", alignItems: "center", justifyContent: "space-between", height: 70,
      }}>
        {/* Hamburger */}
        <div style={{ position: "relative" }}>
          <button
            data-nav-btn
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: "none", border: "none", cursor: "pointer",
              color: t.txM, padding: 8, display: "flex",
              alignItems: "center", justifyContent: "center",
              transition: "color 0.3s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = t.ac; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = t.txM; }}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={menuOpen ? "x" : "menu"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.18 }}
                style={{ display: "flex" }}
              >
                {menuOpen ? <X size={28} strokeWidth={2} /> : <Menu size={28} strokeWidth={2} />}
              </motion.span>
            </AnimatePresence>
          </button>

          <AnimatePresence>
            {menuOpen && (
              <motion.div
                data-nav-menu
                initial={{ opacity: 0, y: -8, scaleY: 0.95 }}
                animate={{ opacity: 1, y: 0, scaleY: 1 }}
                exit={{ opacity: 0, y: -8, scaleY: 0.95 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                style={{
                  position: "absolute", top: "100%", left: 0,
                  width: 220, borderRadius: 16, marginTop: 8, marginLeft: 4,
                  padding: "14px 16px",
                  background: isDark ? "#0d0d0d" : "#ffffff",
                  border: `1px solid ${t.brd}`,
                  boxShadow: isDark ? "0 24px 64px rgba(0,0,0,0.9)" : "0 16px 48px rgba(0,0,0,0.12)",
                  transformOrigin: "top left",
                  zIndex: 200,
                }}
              >
                {NAV.map((item, i) => (
                  <motion.button
                    key={item.h}
                    onClick={() => go(item.h)}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    style={{
                      display: "block", width: "100%", textAlign: "left",
                      background: "none", border: "none", cursor: "pointer",
                      fontSize: 17, fontWeight: 700, letterSpacing: "-0.01em",
                      padding: "8px 10px", borderRadius: 8,
                      color: i === 0 ? t.ac : t.tx,
                      fontFamily: "'Sora', sans-serif",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = t.ac; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = i === 0 ? t.ac : t.tx; }}
                  >
                    {item.l}
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Logo center */}
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); go("#"); }}
          style={{ textDecoration: "none", display: "flex", alignItems: "center" }}
        >
          <img src="/logo.svg" alt="Decypher Lab" style={{ height: 82, objectFit: "contain" }} />
        </a>

        {/* Right: desktop nav links + theme toggle */}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div className="hidden md:flex items-center gap-5">
            {NAV.slice(1, 5).map((item) => (
              <button
                key={item.h}
                onClick={() => go(item.h)}
                style={{
                  background: "none", border: "none", cursor: "pointer",
                  color: t.txM, fontSize: 12.5, fontWeight: 500,
                  letterSpacing: "0.06em", fontFamily: "'Sora', sans-serif",
                  transition: "color 0.25s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = t.ac; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = t.txM; }}
              >
                {item.l}
              </button>
            ))}
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: t.ac, color: "#000", padding: "9px 20px",
                borderRadius: 10, fontSize: 13, fontWeight: 700,
                textDecoration: "none", display: "flex", alignItems: "center", gap: 6,
                transition: "all 0.3s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 8px 28px rgba(254,45,45,0.4)`; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}
            >
              Let&apos;s Talk
            </a>
          </div>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            style={{
              width: 52, height: 28, borderRadius: 100,
              background: isDark ? "#1a1a1a" : "#e0e0e0",
              border: `1.5px solid ${t.brd}`,
              cursor: "pointer", position: "relative",
              flexShrink: 0, transition: "background 0.3s",
            }}
            aria-label="Toggle theme"
          >
            <motion.div
              style={{
                position: "absolute", top: 3, left: 3,
                width: 18, height: 18, borderRadius: "50%",
                background: isDark ? t.ac : "#0a0a0a",
              }}
              animate={{ x: isDark ? 22 : 0 }}
              transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 25 }}
            />
          </button>
        </div>
      </nav>
    </header>
  );
}

/* ══════════════════ HERO ══════════════════ */
function Hero({ isDark, t }) {
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

  useEffect(() => {
    const fn = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", fn, { passive: true });
    return () => window.removeEventListener("mousemove", fn);
  }, []);

  const go = (hash) => document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section style={{
      position: "relative", minHeight: "100vh",
      display: "flex", alignItems: "center", justifyContent: "center",
      overflow: "hidden", background: t.bg, padding: "110px 24px 90px",
    }}>
      <GridBg color="rgba(254,45,45,0.022)" />
      <FloatingOrbs dark={isDark} />

      {/* Mouse spotlight */}
      <div style={{
        position: "absolute", width: 720, height: 720, borderRadius: "50%",
        background: `radial-gradient(circle, rgba(254,45,45,0.07) 0%, transparent 70%)`,
        left: mousePos.x - 360, top: mousePos.y - 360,
        pointerEvents: "none", zIndex: 0,
        transition: "left 0.45s ease-out, top 0.45s ease-out",
      }} />

      {/* Content */}
      <div style={{ maxWidth: 820, width: "100%", textAlign: "center", position: "relative", zIndex: 1 }}>

        {/* Available badge */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "7px 18px", marginBottom: 40,
            background: t.acS, border: `1px solid ${t.acSB}`,
            borderRadius: 100, fontSize: 12, fontWeight: 500, color: t.ac,
          }}
        >
          <motion.span
            style={{ width: 6, height: 6, borderRadius: "50%", background: t.ac, display: "inline-block", flexShrink: 0 }}
            animate={{ opacity: [0.35, 1, 0.35] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          Available for new projects
        </motion.div>

        {/* Mono eyebrow label */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          style={{
            fontSize: 11, fontWeight: 600, color: t.txF,
            letterSpacing: "0.18em", textTransform: "uppercase",
            fontFamily: "'JetBrains Mono', monospace",
            marginBottom: 20,
          }}
        >
          // decypher.lab &nbsp;—&nbsp; since 2025
        </motion.p>

        {/* Main headline */}
        <h1 style={{ margin: "0 0 10px", padding: 0 }}>
          <BlurText
            text="We build digital systems"
            delay={55}
            style={{
              display: "block",
              fontSize: "clamp(36px, 6.5vw, 74px)",
              fontWeight: 800, color: t.tx,
              letterSpacing: "-0.04em", lineHeight: 1.06,
              fontFamily: "'Sora', sans-serif",
            }}
          />
          <span style={{ display: "block", fontSize: "clamp(36px, 6.5vw, 74px)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.06 }}>
            <BlurText
              text="that "
              delay={55}
              style={{ color: t.tx }}
            />
            <BlurText
              text="grow your business"
              delay={55}
              style={{
                color: t.ac,
                textShadow: `0 0 40px rgba(254,45,45,0.35)`,
              }}
            />
          </span>
        </h1>

        {/* Decorative rule */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{
            width: 48, height: 2, background: t.ac,
            borderRadius: 2, margin: "28px auto",
            boxShadow: `0 0 12px rgba(254,45,45,0.5)`,
          }}
        />

        {/* Subtitle */}
        <FadeIn delay={0.55}>
          <p style={{
            fontSize: "clamp(16px, 2.1vw, 18.5px)", color: t.txM,
            lineHeight: 1.78, maxWidth: 600, margin: "0 auto 18px",
            fontWeight: 400,
          }}>
            Websites, mobile apps, and intelligent automation — designed to help
            businesses go online, operate smarter, and scale faster.
          </p>
        </FadeIn>

        {/* Location / team line */}
        <FadeIn delay={0.65}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 44 }}>
            <span style={{ display: "inline-block", width: 24, height: 1, background: t.txF, flexShrink: 0 }} />
            <p style={{
              fontSize: 13, color: t.txF,
              fontFamily: "'JetBrains Mono', monospace",
              letterSpacing: "0.04em",
            }}>
              A dedicated team from Bangalore, building for businesses worldwide.
            </p>
            <span style={{ display: "inline-block", width: 24, height: 1, background: t.txF, flexShrink: 0 }} />
          </div>
        </FadeIn>

        {/* CTA buttons */}
        <FadeIn delay={0.75}>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <button
              onClick={() => go("#work")}
              style={{
                background: t.ac, color: "#fff",
                padding: "14px 32px", borderRadius: 12,
                fontSize: 14, fontWeight: 700, border: "none", cursor: "pointer",
                display: "inline-flex", alignItems: "center", gap: 8,
                transition: "all 0.3s", fontFamily: "'Sora', sans-serif",
                boxShadow: `0 4px 20px rgba(254,45,45,0.25)`,
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 14px 40px rgba(254,45,45,0.45)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(254,45,45,0.25)"; }}
            >
              View Our Work <ArrowRight size={15} />
            </button>
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: "transparent", color: t.tx,
                padding: "14px 32px", borderRadius: 12,
                fontSize: 14, fontWeight: 500,
                border: `1.5px solid ${t.brd}`,
                display: "inline-flex", alignItems: "center", gap: 8,
                textDecoration: "none", transition: "all 0.3s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = t.acSB; e.currentTarget.style.color = t.ac; e.currentTarget.style.transform = "translateY(-3px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = t.brd; e.currentTarget.style.color = t.tx; e.currentTarget.style.transform = "none"; }}
            >
              Get Started
            </a>
          </div>
        </FadeIn>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={() => go("#trust")}
        style={{
          position: "absolute", bottom: "3%", left: "50%",
          transform: "translateX(-50%)", zIndex: 1,
          background: "none", border: "none", cursor: "pointer", color: t.txF,
        }}
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        aria-label="Scroll down"
      >
        <ChevronDown size={26} />
      </motion.button>
    </section>
  );
}

/* ══════════════════ STATS ══════════════════ */
function Stats({ t }) {
  return (
    <section id="trust" style={{
      position: "relative", padding: "80px 24px",
      background: t.bg2,
      borderTop: `1px solid ${t.brd}`,
      borderBottom: `1px solid ${t.brd}`,
    }}>
      <div style={{
        maxWidth: 1100, margin: "0 auto",
        display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 24,
      }}>
        {STATS.map((stat, i) => (
          <FadeIn key={i} delay={i * 0.1} dir="scale">
            <div
              style={{
                textAlign: "center", padding: "32px 20px", borderRadius: 16,
                border: `1px solid ${t.brd}`, transition: "all 0.35s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(254,45,45,0.35)";
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 12px 36px rgba(254,45,45,0.06)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = t.brd;
                e.currentTarget.style.transform = "none";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div style={{
                fontSize: 42, fontWeight: 800, letterSpacing: "-0.04em",
                marginBottom: 6, color: t.ac,
                fontFamily: "'Fira Code', monospace",
              }}>{stat.s}</div>
              <div style={{ fontSize: 13.5, color: t.txM, fontWeight: 400 }}>{stat.l}</div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

/* ══════════════════ SERVICES ══════════════════ */
function Services({ t, isDark }) {
  return (
    <section id="services" style={{
      position: "relative", padding: "110px 24px",
      background: t.bg, overflow: "hidden",
    }}>
      <FloatingOrbs dark={isDark} />
      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <FadeIn>
          <p style={{
            fontSize: 11, fontWeight: 600, color: t.ac,
            textTransform: "uppercase", letterSpacing: "0.15em",
            marginBottom: 12, fontFamily: "'JetBrains Mono', monospace",
          }}>// Services</p>
        </FadeIn>
        <FadeIn delay={0.06}>
          <h2 style={{
            fontSize: "clamp(30px, 4.5vw, 48px)", fontWeight: 800,
            letterSpacing: "-0.03em", marginBottom: 16, lineHeight: 1.1, color: t.tx,
          }}>What we do best</h2>
        </FadeIn>
        <FadeIn delay={0.12}>
          <p style={{ fontSize: 17, color: t.txM, maxWidth: 540, marginBottom: 60, lineHeight: 1.75 }}>
            We focus on outcomes, not just outputs. Every solution is built to move your business forward.
          </p>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
          {SERVICES.map((svc, i) => (
            <FadeIn key={i} delay={i * 0.1} dir="scale">
              <a
                href={`https://wa.me/${WA}?text=${encodeURIComponent(svc.wa)}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "block", textDecoration: "none",
                  background: t.bg2, border: `1px solid ${t.brd}`, borderRadius: 18,
                  padding: "36px 30px", transition: "all 0.4s", cursor: "pointer",
                  height: "100%", position: "relative", overflow: "hidden",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(254,45,45,0.38)";
                  e.currentTarget.style.transform = "translateY(-6px)";
                  e.currentTarget.style.boxShadow = "0 16px 48px rgba(254,45,45,0.07)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = t.brd;
                  e.currentTarget.style.transform = "none";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div style={{
                  width: 52, height: 52, borderRadius: 14,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: t.ac, marginBottom: 22,
                  background: t.acS, border: `1px solid ${t.acSB}`,
                }}>
                  <svc.Icon size={26} strokeWidth={1.5} />
                </div>
                <h3 style={{ fontSize: 19, fontWeight: 700, marginBottom: 10, color: t.tx, letterSpacing: "-0.01em" }}>{svc.title}</h3>
                <p style={{ fontSize: 14.5, color: t.txM, lineHeight: 1.72, marginBottom: 20 }}>{svc.desc}</p>
                <span style={{
                  display: "inline-flex", alignItems: "center", gap: 6,
                  fontSize: 13, fontWeight: 600, color: t.ac,
                  transition: "gap 0.3s",
                }}>
                  Discuss this service <ArrowRight size={13} />
                </span>
              </a>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════ PORTFOLIO ══════════════════ */
function Portfolio({ t }) {
  return (
    <section id="work" style={{
      position: "relative", padding: "110px 24px",
      backgroundImage: `url(${portfolioBg})`,
      backgroundSize: "cover", backgroundPosition: "center", overflow: "hidden",
    }}>
      <div style={{ position: "absolute", inset: 0, background: "rgba(5,5,5,0.87)" }} />
      <GridBg color="rgba(254,45,45,0.02)" />
      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <FadeIn>
          <p style={{ fontSize: 11, fontWeight: 600, color: "#fe2d2d", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 12, fontFamily: "'JetBrains Mono', monospace" }}>// Portfolio</p>
        </FadeIn>
        <FadeIn delay={0.06}>
          <h2 style={{ fontSize: "clamp(30px, 4.5vw, 48px)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 16, lineHeight: 1.1, color: "#f0f0f0" }}>Selected work</h2>
        </FadeIn>
        <FadeIn delay={0.12}>
          <p style={{ fontSize: 17, color: "#888", maxWidth: 500, marginBottom: 60, lineHeight: 1.75 }}>
            Real projects, real results. Here's some of what we've shipped.
          </p>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(310px, 1fr))", gap: 24 }}>
          {PROJECTS.map((proj, i) => (
            <FadeIn key={i} delay={i * 0.12} dir="scale">
              <div
                style={{
                  background: "rgba(10,10,10,0.72)", border: "1px solid #1e1e1e", borderRadius: 20,
                  overflow: "hidden", transition: "all 0.4s", height: "100%",
                  display: "flex", flexDirection: "column", backdropFilter: "blur(12px)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-8px)";
                  e.currentTarget.style.borderColor = proj.accent + "55";
                  e.currentTarget.style.boxShadow = `0 24px 64px ${proj.accent}18`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "none";
                  e.currentTarget.style.borderColor = "#1e1e1e";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div style={{ height: 200, overflow: "hidden" }}>
                  <img
                    src={proj.image}
                    alt={proj.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" }}
                    onMouseOver={(e) => { e.currentTarget.style.transform = "scale(1.06)"; }}
                    onMouseOut={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
                  />
                </div>
                <div style={{ padding: "24px 28px 28px", flex: 1, display: "flex", flexDirection: "column" }}>
                  <span style={{
                    fontSize: 11, fontWeight: 600, color: proj.accent,
                    textTransform: "uppercase", letterSpacing: "0.1em",
                    marginBottom: 10, fontFamily: "'JetBrains Mono', monospace",
                  }}>{proj.cat}</span>
                  <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8, color: "#f0f0f0", letterSpacing: "-0.01em" }}>{proj.title}</h3>
                  <p style={{ fontSize: 14, color: "#888", lineHeight: 1.72, flex: 1 }}>{proj.desc}</p>
                  <a
                    href={proj.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-flex", alignItems: "center", gap: 6,
                      marginTop: 20, fontSize: 13, fontWeight: 600,
                      color: "#fe2d2d", textDecoration: "none", transition: "gap 0.3s",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.gap = "12px"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.gap = "6px"; }}
                  >
                    View Project <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════ PROCESS ══════════════════ */
function Process({ t }) {
  return (
    <section id="process" style={{
      position: "relative", padding: "110px 24px",
      background: t.bg, borderTop: `1px solid ${t.brd}`, overflow: "hidden",
    }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <FadeIn>
          <p style={{ fontSize: 11, fontWeight: 600, color: t.ac, textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 12, fontFamily: "'JetBrains Mono', monospace" }}>// Process</p>
        </FadeIn>
        <FadeIn delay={0.06}>
          <h2 style={{ fontSize: "clamp(30px, 4.5vw, 48px)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 16, lineHeight: 1.1, color: t.tx }}>How we work</h2>
        </FadeIn>
        <FadeIn delay={0.12}>
          <p style={{ fontSize: 17, color: t.txM, maxWidth: 500, marginBottom: 60, lineHeight: 1.75 }}>
            A clear, proven process — from first call to launch and beyond.
          </p>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
          {STEPS.map((step, i) => (
            <FadeIn key={i} delay={i * 0.09} dir="scale">
              <div
                style={{
                  padding: "36px 26px", borderRadius: 18, height: "100%",
                  background: t.bg2, border: `1px solid ${t.brd}`,
                  transition: "all 0.4s", position: "relative",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(254,45,45,0.35)";
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "0 12px 32px rgba(254,45,45,0.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = t.brd;
                  e.currentTarget.style.transform = "none";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div style={{
                  width: 44, height: 44, borderRadius: 12, marginBottom: 18,
                  background: t.acS, border: `1.5px solid ${t.acSB}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 14, color: t.ac, fontWeight: 600 }}>{step.n}</span>
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8, color: t.tx }}>{step.t}</h3>
                <p style={{ fontSize: 13.5, color: t.txM, lineHeight: 1.68 }}>{step.d}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════ TESTIMONIALS ══════════════════ */
function Testimonials({ t }) {
  const [ati, setAti] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setAti((p) => (p + 1) % TESTI.length), 6000);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="testimonials" style={{
      position: "relative", padding: "110px 24px",
      backgroundImage: `url(${testimonialBg})`,
      backgroundSize: "cover", backgroundPosition: "center", overflow: "hidden",
    }}>
      <div style={{ position: "absolute", inset: 0, background: "rgba(5,5,5,0.9)" }} />
      <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
        <FadeIn>
          <p style={{ fontSize: 11, fontWeight: 600, color: "#fe2d2d", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 12, fontFamily: "'JetBrains Mono', monospace" }}>// Testimonials</p>
        </FadeIn>
        <FadeIn delay={0.06}>
          <h2 style={{ fontSize: "clamp(30px, 4.5vw, 48px)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 60, lineHeight: 1.1, color: "#f0f0f0" }}>What clients say</h2>
        </FadeIn>
        <FadeIn delay={0.15}>
          <div style={{
            position: "relative", minHeight: 240, padding: "40px 32px", borderRadius: 24,
            background: "rgba(10,10,10,0.65)",
            border: "1px solid #1e1e1e", backdropFilter: "blur(12px)",
          }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={ati}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <div style={{
                  fontSize: 52, lineHeight: 1, marginBottom: 18,
                  color: "#fe2d2d", opacity: 0.45,
                  fontFamily: "'Fira Code', monospace",
                }}>"</div>
                <p style={{
                  fontSize: "clamp(15px, 2.5vw, 18px)", color: "#f0f0f0",
                  lineHeight: 1.82, fontStyle: "italic", marginBottom: 28,
                }}>{TESTI[ati].text}</p>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14 }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: "50%",
                    background: "linear-gradient(135deg, #fe2d2d, #c41010)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#000", fontSize: 15, fontWeight: 700,
                  }}>{TESTI[ati].ini}</div>
                  <div style={{ textAlign: "left" }}>
                    <div style={{ fontSize: 15, fontWeight: 600, color: "#f0f0f0" }}>{TESTI[ati].name}</div>
                    <div style={{ fontSize: 13, color: "#888" }}>{TESTI[ati].role}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div style={{ display: "flex", justifyContent: "center", gap: 10, marginTop: 28 }}>
            {TESTI.map((_, i) => (
              <motion.button
                key={i}
                onClick={() => setAti(i)}
                animate={{ width: i === ati ? 32 : 10 }}
                transition={{ duration: 0.4 }}
                style={{
                  height: 10, borderRadius: 100, border: "none", cursor: "pointer", padding: 0,
                  background: i === ati ? "#fe2d2d" : "#1e1e1e",
                  boxShadow: i === ati ? "0 0 12px rgba(254,45,45,0.5)" : "none",
                }}
                aria-label={`Testimonial ${i + 1}`}
              />
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ══════════════════ CTA ══════════════════ */
function CTA({ t }) {
  const go = (hash) => document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section style={{
      position: "relative", padding: "120px 24px",
      background: "linear-gradient(135deg, #020202 0%, #0d0d0d 50%, #020202 100%)",
      overflow: "hidden",
    }}>
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <motion.div
          style={{ position: "absolute", top: "-20%", left: "-10%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(254,45,45,0.06) 0%, transparent 70%)" }}
          animate={{ x: [0, 20, 0], y: [0, -15, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          style={{ position: "absolute", bottom: "-20%", right: "-10%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(254,45,45,0.05) 0%, transparent 70%)" }}
          animate={{ x: [0, -20, 0], y: [0, 12, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
        <FadeIn>
          <h2 style={{
            fontSize: "clamp(30px, 5vw, 52px)", fontWeight: 800,
            letterSpacing: "-0.035em", marginBottom: 20, lineHeight: 1.12,
          }}>
            <span style={{ color: "#f0f0f0" }}>Let&apos;s build something that<br /></span>
            <span style={{ color: t.ac }}>grows your business</span>
          </h2>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p style={{ fontSize: 17, color: "#666", marginBottom: 42, lineHeight: 1.75 }}>
            Ready to take your business to the next level? We&apos;re one message away.
          </p>
        </FadeIn>
        <FadeIn delay={0.2}>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <button
              onClick={() => go("#contact")}
              style={{
                background: t.ac, color: "#000", padding: "15px 34px",
                borderRadius: 12, fontSize: 14.5, fontWeight: 700,
                border: "none", cursor: "pointer",
                display: "inline-flex", alignItems: "center", gap: 8,
                transition: "all 0.3s", fontFamily: "'Sora', sans-serif",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 12px 36px rgba(254,45,45,0.4)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}
            >
              Contact Us
            </button>
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: "transparent", color: "#f0f0f0",
                padding: "15px 34px", borderRadius: 12, fontSize: 14.5, fontWeight: 500,
                border: "1.5px solid #2a2a2a", cursor: "pointer",
                display: "inline-flex", alignItems: "center", gap: 8,
                textDecoration: "none", transition: "all 0.3s", backdropFilter: "blur(8px)",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(254,45,45,0.45)"; e.currentTarget.style.color = t.ac; e.currentTarget.style.transform = "translateY(-3px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#2a2a2a"; e.currentTarget.style.color = "#f0f0f0"; e.currentTarget.style.transform = "none"; }}
            >
              <WAIcon size={20} /> WhatsApp Us
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ══════════════════ CONTACT ══════════════════ */
// ← Paste your Web3Forms access key here (get it free at web3forms.com)
const WEB3FORMS_KEY = "b5587dc2-e831-4096-8eb2-41b9ad088f19";

function Contact({ t, isDark }) {
  const [form, setForm] = useState({ name: "", contact: "", message: "" }); 
  const [status, setStatus] = useState("idle"); // "idle" | "sending" | "sent" | "error"

  const sub = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `New enquiry from ${form.name} — Decypher Lab`,
          name: form.name,
          "Email or Phone": form.contact,
          message: form.message,
          from_name: "Decypher Lab Website",
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("sent");
        setForm({ name: "", contact: "", message: "" });
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 4000);
      }
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  const inputStyle = {
    width: "100%", padding: "14px 18px",
    border: `1.5px solid ${t.brd}`, borderRadius: 10,
    background: t.bg, color: t.tx,
    fontSize: 14.5, fontFamily: "'Sora', sans-serif",
    outline: "none", transition: "border-color 0.3s",
  };

  return (
    <section id="contact" style={{
      position: "relative", padding: "110px 24px",
      background: t.bg, borderTop: `1px solid ${t.brd}`, overflow: "hidden",
    }}>
      <FloatingOrbs dark={isDark} />
      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <FadeIn>
          <p style={{ fontSize: 11, fontWeight: 600, color: t.ac, textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 12, fontFamily: "'JetBrains Mono', monospace" }}>// Contact</p>
        </FadeIn>
        <FadeIn delay={0.06}>
          <h2 style={{ fontSize: "clamp(30px, 4.5vw, 48px)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 60, lineHeight: 1.1, color: t.tx }}>Get in touch</h2>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 48 }}>
          <FadeIn delay={0.12}>
            <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
              <p style={{ fontSize: 16, color: t.txM, lineHeight: 1.8 }}>
                Have a project in mind? We&apos;d love to hear about it. Reach out and let&apos;s start a conversation.
              </p>
              {[
                { Icon: Mail, label: EMAIL, href: `mailto:${EMAIL}` },
                { Icon: Phone, label: PHONE, href: `tel:${PHONE}` },
                { Icon: IgIcon, label: "@decypherlab", href: INSTA },
                { Icon: MapPin, label: LOC },
              ].map((c, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <div style={{
                    width: 46, height: 46, borderRadius: 13,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: t.ac, flexShrink: 0,
                    background: t.acS, border: `1px solid ${t.acSB}`,
                  }}>
                    <c.Icon size={20} strokeWidth={1.5} />
                  </div>
                  {c.href ? (
                    <a
                      href={c.href}
                      target={c.href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      style={{ color: t.tx, textDecoration: "none", fontSize: 15, fontWeight: 500, transition: "color 0.25s" }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = t.ac; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = t.tx; }}
                    >{c.label}</a>
                  ) : (
                    <span style={{ fontSize: 15, fontWeight: 500, color: t.tx }}>{c.label}</span>
                  )}
                </div>
              ))}
              <a
                href={WA_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 10,
                  padding: "15px 30px",
                  background: "linear-gradient(135deg, #25D366, #128C7E)",
                  color: "#fff", borderRadius: 14, fontWeight: 600, fontSize: 15,
                  textDecoration: "none", transition: "all 0.3s", width: "fit-content",
                  boxShadow: "0 4px 20px rgba(37,211,102,0.2)",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 12px 36px rgba(37,211,102,0.4)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(37,211,102,0.2)"; }}
              >
                <WAIcon size={22} /> Chat on WhatsApp
              </a>
            </div>
          </FadeIn>
          <FadeIn delay={0.22}>
            <form onSubmit={sub} style={{
              display: "flex", flexDirection: "column", gap: 18,
              padding: "36px 32px", borderRadius: 22,
              background: t.bg2, border: `1px solid ${t.brd}`,
            }}>
              {[
                { key: "name", label: "Your Name", placeholder: "John Doe" },
                { key: "contact", label: "Email or Phone", placeholder: "you@company.com" },
              ].map((f) => (
                <div key={f.key}>
                  <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: t.txM, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "'JetBrains Mono', monospace" }}>{f.label}</label>
                  <input
                    type="text"
                    placeholder={f.placeholder}
                    required
                    value={form[f.key]}
                    onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                    style={inputStyle}
                    onFocus={(e) => { e.currentTarget.style.borderColor = t.ac; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = t.brd; }}
                  />
                </div>
              ))}
              <div>
                <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: t.txM, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "'JetBrains Mono', monospace" }}>Message</label>
                <textarea
                  placeholder="Tell us about your project..."
                  required
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  style={{ ...inputStyle, resize: "vertical", minHeight: 120 }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = t.ac; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = t.brd; }}
                />
              </div>
              <button
                type="submit"
                disabled={status === "sending"}
                style={{
                  background: status === "sent" ? "#22c55e" : status === "error" ? "#ef4444" : t.ac,
                  color: "#fff", padding: "15px 34px",
                  borderRadius: 12, fontSize: 14.5, fontWeight: 700,
                  border: "none", cursor: status === "sending" ? "not-allowed" : "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                  transition: "all 0.3s", marginTop: 6,
                  fontFamily: "'Sora', sans-serif",
                  opacity: status === "sending" ? 0.7 : 1,
                }}
                onMouseEnter={(e) => { if (status === "idle") { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(254,45,45,0.35)"; } }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}
              >
                {status === "sending" && "Sending…"}
                {status === "sent" && "Message Sent ✓"}
                {status === "error" && "Failed — try WhatsApp"}
                {status === "idle" && <><span>Send Message</span><Send size={16} /></>}
              </button>
            </form>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════ FOOTER ══════════════════ */
function Footer({ t }) {
  const go = (hash) => {
    if (hash === "#") window.scrollTo({ top: 0, behavior: "smooth" });
    else document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer style={{
      position: "relative", padding: "52px 24px 36px",
      background: t.bg2, borderTop: `1px solid ${t.brd}`,
    }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-start", gap: 36, marginBottom: 44 }}>
          <div>
            <div style={{ marginBottom: 14 }}>
              <img src="/logo.svg" alt="Decypher Lab" style={{ height: 72, objectFit: "contain" }} />
            </div>
            <p style={{ fontSize: 14, color: t.txM, maxWidth: 280, lineHeight: 1.68 }}>
              Building digital systems that help businesses grow. Based in Bangalore.
            </p>
          </div>
          <div style={{ display: "flex", gap: 52, flexWrap: "wrap" }}>
            <div>
              <p style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: t.txF, marginBottom: 16, fontFamily: "'JetBrains Mono', monospace" }}>Links</p>
              {NAV.map((l) => (
                <button
                  key={l.h}
                  onClick={() => go(l.h)}
                  style={{
                    display: "block", marginBottom: 12, fontSize: 14,
                    background: "none", border: "none", cursor: "pointer",
                    color: t.txM, fontFamily: "'Sora', sans-serif",
                    textAlign: "left", transition: "color 0.25s", padding: 0,
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = t.ac; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = t.txM; }}
                >{l.l}</button>
              ))}
            </div>
            <div>
              <p style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: t.txF, marginBottom: 16, fontFamily: "'JetBrains Mono', monospace" }}>Connect</p>
              {[
                { label: EMAIL, href: `mailto:${EMAIL}` },
                { label: PHONE, href: `tel:${PHONE}` },
                { label: "Instagram", href: INSTA },
                { label: "WhatsApp", href: WA_URL },
              ].map((c, i) => (
                <a
                  key={i}
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  style={{ display: "block", marginBottom: 12, fontSize: 14, color: t.txM, textDecoration: "none", transition: "color 0.25s" }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = t.ac; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = t.txM; }}
                >{c.label}</a>
              ))}
            </div>
          </div>
        </div>
        <div style={{ borderTop: `1px solid ${t.brd}`, paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <p style={{ fontSize: 13, color: t.txF }}>© {new Date().getFullYear()} Decypher Lab. All rights reserved.</p>
          <p style={{ fontSize: 13, color: t.txF, fontFamily: "'JetBrains Mono', monospace" }}>Crafted with precision in Bangalore</p>
        </div>
      </div>
    </footer>
  );
}

/* ══════════════════ ROOT ══════════════════ */
export default function DecypherLab() {
  const [isDark, setIsDark] = useState(true);
  const t = getTheme(isDark);

  useEffect(() => {
    document.title = "Decypher Lab — Digital Systems for Business";
  }, []);

  const toggleTheme = () => setIsDark((prev) => !prev);

  return (
    <div style={{
      background: t.bg, color: t.tx,
      fontFamily: "'Sora', system-ui, sans-serif",
      minHeight: "100vh",
      transition: "background 0.5s, color 0.5s",
      overflowX: "hidden",
    }}>
      <Navbar isDark={isDark} toggleTheme={toggleTheme} t={t} />
      <Hero isDark={isDark} t={t} />
      <Stats t={t} />
      <Services t={t} isDark={isDark} />
      <Portfolio t={t} />
      <Process t={t} />
      <Testimonials t={t} />
      <CTA t={t} />
      <Contact t={t} isDark={isDark} />
      <Footer t={t} />

      {/* WhatsApp FAB */}
      <motion.a
        href={WA_URL}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: "fixed", bottom: 28, right: 28, zIndex: 999,
          width: 62, height: 62, background: "#25D366", borderRadius: "50%",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "#fff", boxShadow: "0 4px 24px rgba(37,211,102,0.45)",
          textDecoration: "none",
        }}
        whileHover={{ scale: 1.12, rotate: 8 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Chat on WhatsApp"
      >
        <motion.span
          style={{
            position: "absolute", width: "100%", height: "100%",
            borderRadius: "50%", background: "#25D366",
          }}
          animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0, 0.4] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
        />
        <WAIcon size={30} />
      </motion.a>
    </div>
  );
}
