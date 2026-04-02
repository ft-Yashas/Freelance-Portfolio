import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import gymImg from "./assets/gym.png";
import cafeImg from "./assets/cafe.png";
import realImg from "./assets/realestate.png";
// import portImg from "./assets/portfolio-bg.png";
// import testImg from "./assets/testimonial-bg.png";
import testimonialBg from "./assets/testimonial-bg.jpg";
import portfolioBg from "./assets/portfolio-bg.jpg";

/* ══════════════════ CONFIG ══════════════════ */
const BRAND = "Decypher Lab";
const WA = "917975495881";
const WA_URL = `https://wa.me/${WA}?text=${encodeURIComponent("Hi! I'm interested in working with Decypher Lab. Let's discuss my project.")}`;
const EMAIL = "hello@decypherlab.in";
const PHONE = "+91 7975495881";
const INSTA = "https://www.instagram.com/decypherlab/";
const LOC = "Bangalore, India";

const NAV = [
  { l: "Services", h: "#services" }, { l: "Work", h: "#work" },
  { l: "Process", h: "#process" }, { l: "Testimonials", h: "#testimonials" }, { l: "Contact", h: "#contact" },
];

const STATS = [
  { s: "30+", l: "Projects Delivered" }, { s: "98%", l: "Client Satisfaction" },
  { s: "3x", l: "Avg. Growth for Clients" }, { s: "24h", l: "Response Time" },
];

const SERVICES = [
  { title: "Website Development", desc: "High-performance websites that load fast, rank well, and convert visitors into paying customers.", icon: "monitor" },
  { title: "Mobile Applications", desc: "Native-quality apps for iOS & Android that your customers will genuinely enjoy using.", icon: "phone" },
  { title: "Automation & AI Systems", desc: "Intelligent workflows and AI-powered tools that eliminate busywork and scale your operations.", icon: "layers" },
  { title: "Performance & Redesign", desc: "Transform slow, outdated platforms into modern systems that drive measurable business growth.", icon: "zap" },
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

/* ══════════════════ ICONS ══════════════════ */
const IC = {
  monitor: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>,
  phone: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2"/><path d="M12 18h.01"/></svg>,
  layers: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>,
  zap: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>,
  sun: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>,
  moon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>,
  menu: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>,
  x: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>,
  arrow: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>,
  wa: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>,
  mail: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 4l-10 8L2 4"/></svg>,
  tel: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>,
  pin: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  ig: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zM17.5 6.5h.01"/></svg>,
  send: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>,
  chev: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"/></svg>,
};

/* ══════════════════ HOOKS ══════════════════ */
function useInView() {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const ob = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); ob.unobserve(el); } }, { threshold: 0.08, rootMargin: "0px 0px -20px 0px" });
    ob.observe(el); return () => ob.disconnect();
  }, []); return [ref, v];
}
function Rev({ children, delay = 0, cls = "", dir = "up" }) {
  const [ref, v] = useInView();
  const m = { up: "translateY(40px)", down: "translateY(-40px)", left: "translateX(40px)", right: "translateX(-40px)", scale: "scale(0.92)", none: "none" };
  return <div ref={ref} className={cls} style={{ opacity: v ? 1 : 0, transform: v ? "none" : m[dir], transition: `opacity .8s cubic-bezier(.16,1,.3,1) ${delay}s, transform .8s cubic-bezier(.16,1,.3,1) ${delay}s` }}>{children}</div>;
}

/* ══════════ ANIMATED BACKGROUND COMPONENTS ══════════ */

function GridBg({ color = "rgba(67,97,238,0.06)", dark }) {
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
      <svg width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
        <defs>
          <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke={color} strokeWidth="0.5" />
          </pattern>
          <linearGradient id="gridFade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={dark ? "#0B0F17" : "#FAFBFC"} stopOpacity="0" />
            <stop offset="85%" stopColor={dark ? "#0B0F17" : "#FAFBFC"} stopOpacity="1" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
        <rect width="100%" height="100%" fill="url(#gridFade)" />
      </svg>
    </div>
  );
}

function FloatingOrbs({ dark }) {
  const orbs = useMemo(() => [
    { size: 400, x: "15%", y: "20%", color: dark ? "rgba(108,142,255,0.12)" : "rgba(67,97,238,0.08)", dur: "18s", delay: "0s" },
    { size: 300, x: "75%", y: "60%", color: dark ? "rgba(139,100,255,0.1)" : "rgba(139,92,246,0.06)", dur: "22s", delay: "-5s" },
    { size: 250, x: "60%", y: "15%", color: dark ? "rgba(59,200,200,0.08)" : "rgba(6,182,212,0.05)", dur: "20s", delay: "-10s" },
    { size: 180, x: "30%", y: "75%", color: dark ? "rgba(108,142,255,0.08)" : "rgba(67,97,238,0.05)", dur: "25s", delay: "-3s" },
  ], [dark]);
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
      {orbs.map((o, i) => (
        <div key={i} style={{
          position: "absolute", left: o.x, top: o.y, width: o.size, height: o.size,
          borderRadius: "50%", background: `radial-gradient(circle, ${o.color} 0%, transparent 70%)`,
          animation: `orbFloat${i} ${o.dur} ease-in-out infinite`, animationDelay: o.delay,
          filter: "blur(40px)", transform: "translate(-50%, -50%)",
        }} />
      ))}
    </div>
  );
}

function ParticleField({ count = 30, dark }) {
  const particles = useMemo(() =>
    Array.from({ length: count }, (_, i) => ({
      x: Math.random() * 100, y: Math.random() * 100,
      size: Math.random() * 3 + 1, dur: Math.random() * 8 + 6,
      delay: Math.random() * -10, opacity: Math.random() * 0.4 + 0.1,
    })), [count]);
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
      {particles.map((p, i) => (
        <div key={i} style={{
          position: "absolute", left: `${p.x}%`, top: `${p.y}%`,
          width: p.size, height: p.size, borderRadius: "50%",
          background: dark ? `rgba(108,142,255,${p.opacity})` : `rgba(67,97,238,${p.opacity})`,
          animation: `particleDrift ${p.dur}s ease-in-out infinite`,
          animationDelay: `${p.delay}s`,
        }} />
      ))}
    </div>
  );
}

function ScanLine({ dark }) {
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
      <div style={{
        position: "absolute", left: 0, right: 0, height: 1,
        background: `linear-gradient(90deg, transparent, ${dark ? "rgba(108,142,255,0.15)" : "rgba(67,97,238,0.1)"}, transparent)`,
        animation: "scanDown 8s linear infinite",
      }} />
    </div>
  );
}

function CircuitPattern({ dark }) {
  const c = dark ? "rgba(108,142,255,0.07)" : "rgba(67,97,238,0.04)";
  const dot = dark ? "rgba(108,142,255,0.15)" : "rgba(67,97,238,0.08)";
  return (
    <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }} preserveAspectRatio="none">
      <defs>
        <pattern id="circuit" width="120" height="120" patternUnits="userSpaceOnUse">
          <path d="M0 60h30M60 0v30M90 60h30M60 90v30" stroke={c} strokeWidth="1" fill="none" />
          <circle cx="30" cy="60" r="2.5" fill={dot} /><circle cx="60" cy="30" r="2.5" fill={dot} />
          <circle cx="90" cy="60" r="2.5" fill={dot} /><circle cx="60" cy="90" r="2.5" fill={dot} />
          <circle cx="60" cy="60" r="4" fill="none" stroke={dot} strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#circuit)" opacity="0.7" />
    </svg>
  );
}

function HexGrid({ dark }) {
  const c = dark ? "rgba(108,142,255,0.05)" : "rgba(67,97,238,0.03)";
  return (
    <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0, opacity: 0.8 }}>
      <defs>
        <pattern id="hex" width="56" height="97" patternUnits="userSpaceOnUse" patternTransform="scale(1.5)">
          <path d="M28 0L56 16.5v33L28 66 0 49.5v-33z" fill="none" stroke={c} strokeWidth="0.8" />
          <path d="M28 66L56 82.5v14.5h-56v-14.5z" fill="none" stroke={c} strokeWidth="0.8" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#hex)" />
    </svg>
  );
}

function GlowRing({ size = 500, color, top, left, right, bottom }) {
  return (
    <div style={{
      position: "absolute", width: size, height: size, borderRadius: "50%",
      border: `1px solid ${color}`, top, left, right, bottom,
      animation: "ringPulse 6s ease-in-out infinite", pointerEvents: "none", zIndex: 0,
      boxShadow: `0 0 60px ${color}, inset 0 0 60px ${color}`,
    }} />
  );
}

/* ══════════════════ MAIN APP ══════════════════ */
export default function DecypherLab() {
  const dark = true;
  const [mob, setMob] = useState(false);
  const [form, setForm] = useState({ name: "", contact: "", message: "" });
  const [sent, setSent] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [ati, setAti] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    document.title = BRAND;
    const upsertLink = (rel, href, type) => {
      let link = document.querySelector(`link[rel='${rel}']${type ? `[type='${type}']` : ""}`);
      if (!link) {
        link = document.createElement("link");
        link.rel = rel;
        if (type) link.type = type;
        document.head.appendChild(link);
      }
      link.href = href;
    };
    upsertLink("icon", "/favicon.ico", "image/x-icon");
    // upsertLink("icon", "/logo.png", "image/png");
    // upsertLink("apple-touch-icon", "/logo.png");
  }, []);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setAti(p => (p + 1) % TESTI.length), 6000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const fn = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", fn, { passive: true });
    return () => window.removeEventListener("mousemove", fn);
  }, []);

  const go = useCallback((id) => { setMob(false); document.querySelector(id)?.scrollIntoView({ behavior: "smooth" }); }, []);
  const sub = (e) => { e.preventDefault(); setSent(true); setTimeout(() => setSent(false), 4000); setForm({ name: "", contact: "", message: "" }); };
  const H = (base, hover) => ({ onMouseEnter: e => Object.assign(e.currentTarget.style, hover), onMouseLeave: e => Object.assign(e.currentTarget.style, base) });

  const t = dark ? {
    bg: "#06080F", bg2: "#0C1018", bg3: "#111620", tx: "#E8ECF4", txM: "#8B95A9", txF: "#4A5568",
    brd: "#1A2035", brdL: "#141B2A", ac: "#6C8EFF", acS: "rgba(108,142,255,0.08)", acSB: "rgba(108,142,255,0.18)",
    acG: "rgba(108,142,255,0.5)", navBg: "rgba(6,8,15,0.8)",
    ctaBg: "linear-gradient(135deg, #0a0e1a 0%, #111827 50%, #0a0e1a 100%)",
    glow1: "rgba(108,142,255,0.06)", glow2: "rgba(139,100,255,0.05)",
  } : {
    bg: "#F8FAFC", bg2: "#FFFFFF", bg3: "#F1F5F9", tx: "#0F172A", txM: "#475569", txF: "#94A3B8",
    brd: "#E2E8F0", brdL: "#EEF2F7", ac: "#4361EE", acS: "rgba(67,97,238,0.05)", acSB: "rgba(67,97,238,0.12)",
    acG: "rgba(67,97,238,0.4)", navBg: "rgba(248,250,252,0.8)",
    ctaBg: "linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #0F172A 100%)",
    glow1: "rgba(67,97,238,0.04)", glow2: "rgba(139,92,246,0.03)",
  };

  return (
    <div style={{ background: t.bg, color: t.tx, fontFamily: "'Sora', 'Outfit', -apple-system, sans-serif", minHeight: "100vh", transition: "background .5s, color .5s", overflowX: "hidden" }}>

      {/* ══════ GLOBAL STYLES & ANIMATIONS ══════ */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth}body{overflow-x:hidden}
        ::selection{background:${t.ac}33;color:${t.tx}}

        .bp{background:${t.ac};color:#fff;border:none;padding:15px 34px;border-radius:12px;font-size:14.5px;font-weight:600;cursor:pointer;display:inline-flex;align-items:center;gap:8px;transition:all .3s cubic-bezier(.16,1,.3,1);font-family:inherit;text-decoration:none;position:relative;overflow:hidden}
        .bp::before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,rgba(255,255,255,0.15),transparent);opacity:0;transition:opacity .3s}
        .bp:hover{transform:translateY(-3px);box-shadow:0 8px 32px ${t.ac}50}
        .bp:hover::before{opacity:1}

        .bs{background:${dark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)"};color:${t.tx};border:1.5px solid ${t.brd};padding:15px 34px;border-radius:12px;font-size:14.5px;font-weight:500;cursor:pointer;display:inline-flex;align-items:center;gap:8px;transition:all .3s cubic-bezier(.16,1,.3,1);font-family:inherit;text-decoration:none;backdrop-filter:blur(8px)}
        .bs:hover{border-color:${t.ac};color:${t.ac};transform:translateY(-3px);background:${t.acS}}

        .wf{position:fixed;bottom:28px;right:28px;z-index:999;width:62px;height:62px;background:#25D366;border-radius:50%;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 24px rgba(37,211,102,.45);cursor:pointer;transition:all .3s;border:none;text-decoration:none}
        .wf:hover{transform:scale(1.12) rotate(8deg);box-shadow:0 8px 36px rgba(37,211,102,.6)}
        .wf svg{width:30px;height:30px;color:#fff}

        input,textarea{width:100%;padding:15px 20px;border:1.5px solid ${t.brd};border-radius:12px;background:${dark ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.8)"};color:${t.tx};font-size:15px;font-family:inherit;outline:none;transition:all .3s;backdrop-filter:blur(8px)}
        input:focus,textarea:focus{border-color:${t.ac};box-shadow:0 0 0 3px ${t.acS}}
        textarea{resize:vertical;min-height:130px}
        input::placeholder,textarea::placeholder{color:${t.txF}}
        .nl{color:${t.txM};text-decoration:none;font-size:14px;font-weight:500;transition:color .25s;cursor:pointer;position:relative}
        .nl:hover{color:${t.ac}}
        .nl::after{content:'';position:absolute;bottom:-2px;left:0;width:0;height:1.5px;background:${t.ac};transition:width .3s}
        .nl:hover::after{width:100%}

        @keyframes orbFloat0{0%,100%{transform:translate(-50%,-50%) translate(0,0)}25%{transform:translate(-50%,-50%) translate(30px,-20px)}50%{transform:translate(-50%,-50%) translate(-15px,25px)}75%{transform:translate(-50%,-50%) translate(20px,15px)}}
        @keyframes orbFloat1{0%,100%{transform:translate(-50%,-50%) translate(0,0)}25%{transform:translate(-50%,-50%) translate(-25px,15px)}50%{transform:translate(-50%,-50%) translate(20px,-20px)}75%{transform:translate(-50%,-50%) translate(-10px,-15px)}}
        @keyframes orbFloat2{0%,100%{transform:translate(-50%,-50%) translate(0,0)}33%{transform:translate(-50%,-50%) translate(15px,20px)}66%{transform:translate(-50%,-50%) translate(-20px,-10px)}}
        @keyframes orbFloat3{0%,100%{transform:translate(-50%,-50%) translate(0,0)}33%{transform:translate(-50%,-50%) translate(-20px,15px)}66%{transform:translate(-50%,-50%) translate(15px,-20px)}}
        @keyframes particleDrift{0%,100%{transform:translateY(0) translateX(0);opacity:0.2}25%{opacity:0.6}50%{transform:translateY(-20px) translateX(10px);opacity:0.3}75%{opacity:0.5}100%{transform:translateY(0) translateX(0)}}
        @keyframes scanDown{0%{top:-2%}100%{top:102%}}
        @keyframes ringPulse{0%,100%{opacity:0.3;transform:scale(1)}50%{opacity:0.6;transform:scale(1.03)}}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
        @keyframes pr{0%{transform:scale(1);opacity:.4}100%{transform:scale(1.7);opacity:0}}
        @keyframes heroGlow{0%,100%{opacity:0.5}50%{opacity:1}}
        @keyframes gradientShift{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
        @keyframes borderGlow{0%,100%{border-color:${t.brd}}50%{border-color:${t.ac}22}}
        @keyframes textShimmer{0%{background-position:-200% center}100%{background-position:200% center}}
        @keyframes nodeGlow{0%,100%{box-shadow:0 0 8px ${t.ac}30}50%{box-shadow:0 0 20px ${t.ac}60}}

        @media(max-width:768px){.dn{display:none!important}.mn{display:flex!important}}
      `}</style>

      {/* ══════ NAVBAR ══════ */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: scrolled ? t.navBg : "transparent", backdropFilter: scrolled ? "blur(20px) saturate(1.5)" : "none", borderBottom: scrolled ? `1px solid ${t.brdL}` : "1px solid transparent", transition: "all .4s" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 70 }}>
          <a href="#" style={{ textDecoration: "none", color: t.tx, fontWeight: 700, fontSize: 20, letterSpacing: "-.5px", display: "flex", alignItems: "center", gap: 10 }}>
           <img 
              src="/logo.svg" 
              alt="Decypher Lab Logo" 
              style={{ height: "96px", objectFit: "contain" }}
            />
          </a>
          <div className="dn" style={{ display: "flex", alignItems: "center", gap: 32 }}>
            {NAV.map(l => <span key={l.h} className="nl" onClick={() => go(l.h)}>{l.l}</span>)}
            <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="bp" style={{ padding: "10px 26px", fontSize: 13.5 }}>Let's Talk</a>
          </div>
          <div className="mn" style={{ display: "none", alignItems: "center", gap: 12 }}>
            <button onClick={() => setMob(!mob)} style={{ background: "none", border: "none", color: t.tx, cursor: "pointer", width: 28, height: 28 }}>{mob ? IC.x : IC.menu}</button>
          </div>
        </div>
        {mob && <div style={{ background: dark ? "rgba(12,16,24,0.98)" : "rgba(255,255,255,0.98)", backdropFilter: "blur(20px)", borderTop: `1px solid ${t.brd}`, padding: "20px 24px", display: "flex", flexDirection: "column", gap: 18 }}>
          {NAV.map(l => <span key={l.h} className="nl" onClick={() => go(l.h)} style={{ fontSize: 16, padding: "6px 0" }}>{l.l}</span>)}
          <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="bp" style={{ textAlign: "center", justifyContent: "center" }}>Let's Talk</a>
        </div>}
      </nav>

      {/* ══════ HERO ══════ */}
      <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "130px 24px 100px", overflow: "hidden" }}>
        <GridBg color={dark ? "rgba(108,142,255,0.04)" : "rgba(67,97,238,0.04)"} dark={dark} />
        <FloatingOrbs dark={dark} />
        <ParticleField count={40} dark={dark} />
        <ScanLine dark={dark} />

        {/* Hero glow ring decorations */}
        <GlowRing size={600} color={dark ? "rgba(108,142,255,0.04)" : "rgba(67,97,238,0.025)"} top="-10%" right="-15%" />
        <GlowRing size={400} color={dark ? "rgba(139,100,255,0.04)" : "rgba(139,92,246,0.02)"} bottom="5%" left="-10%" />

        {/* Interactive spotlight following mouse */}
        <div style={{
          position: "absolute", width: 720, height: 720, borderRadius: "50%",
          background: `radial-gradient(circle, ${dark ? "rgba(108,142,255,0.12)" : "rgba(67,97,238,0.08)"} 0%, transparent 70%)`,
          left: mousePos.x - 360, top: mousePos.y - 360, pointerEvents: "none", zIndex: 0, transition: "left 0.3s ease-out, top 0.3s ease-out",
        }} />

        <div style={{ maxWidth: 840, textAlign: "center", position: "relative", zIndex: 1 }}>
          <Rev>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 20px", background: t.acS, border: `1px solid ${t.acSB}`, borderRadius: 100, marginBottom: 32, fontSize: 13, fontWeight: 500, color: t.ac, backdropFilter: "blur(8px)" }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: t.ac, display: "inline-block", animation: "heroGlow 2s ease-in-out infinite" }} />
              Available for new projects
            </div>
          </Rev>
          <Rev delay={0.1}>
            <h1 style={{
              fontSize: "clamp(38px, 6.5vw, 72px)", fontWeight: 800, lineHeight: 1.05,
              letterSpacing: "-.04em", marginBottom: 24, color: "#E8ECF4",
              textShadow: "0 0 32px rgba(108,142,255,0.45)",
            }}>
              We build digital systems<br />that grow your business
            </h1>
          </Rev>
          <Rev delay={0.2}>
            <p style={{ fontSize: "clamp(16px, 2.2vw, 19px)", color: t.txM, lineHeight: 1.75, maxWidth: 600, margin: "0 auto 20px", fontWeight: 400 }}>
              Websites, mobile apps, and intelligent automation — designed to help businesses go online, operate smarter, and scale faster.
            </p>
          </Rev>
          <Rev delay={0.25}>
            <p style={{ fontSize: 14, color: t.txF, marginBottom: 40, fontWeight: 400, letterSpacing: ".02em" }}>A dedicated team from Bangalore, building for businesses worldwide.</p>
          </Rev>
          <Rev delay={0.35}>
            <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
              <button className="bp" onClick={() => go("#work")}>View Our Work <span style={{ width: 18, height: 18, display: "inline-flex" }}>{IC.arrow}</span></button>
              <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="bs">Get Started</a>
            </div>
          </Rev>
        </div>
        <div onClick={() => go("#trust")} style={{ position: "absolute", bottom: 36, left: "50%", transform: "translateX(-50%)", cursor: "pointer", opacity: .35, animation: "float 2.5s ease-in-out infinite", width: 26, height: 26, color: t.txM }}>{IC.chev}</div>
      </section>

      {/* ══════ TRUST ══════ */}
      <section id="trust" style={{ position: "relative", padding: "80px 24px", background: t.bg2, borderTop: `1px solid ${t.brd}`, borderBottom: `1px solid ${t.brd}`, overflow: "hidden" }}>
        <CircuitPattern dark={dark} />
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 24, position: "relative", zIndex: 1 }}>
          {STATS.map((it, i) => (
            <Rev key={i} delay={i * .1} dir="scale">
              <div style={{
                textAlign: "center", padding: "28px 16px", borderRadius: 16,
                background: dark ? "rgba(255,255,255,0.02)" : "rgba(67,97,238,0.02)",
                border: `1px solid ${t.brd}`, backdropFilter: "blur(8px)",
                transition: "all .4s", animation: "borderGlow 4s ease-in-out infinite",
                animationDelay: `${i * 0.5}s`,
              }} {...H({ transform: "none", boxShadow: "none" }, { transform: "translateY(-4px)", boxShadow: `0 8px 32px ${t.ac}10` })}>
                <div style={{ fontSize: 40, fontWeight: 800, letterSpacing: "-.04em", marginBottom: 4, color: t.ac, textShadow: `0 0 18px ${t.ac}40` }}>{it.s}</div>
                <div style={{ fontSize: 14, color: t.txM, fontWeight: 400 }}>{it.l}</div>
              </div>
            </Rev>
          ))}
        </div>
      </section>

      {/* ══════ SERVICES ══════ */}
      <section id="services" style={{ position: "relative", padding: "110px 24px", background: t.bg, overflow: "hidden" }}>
        <FloatingOrbs dark={dark} />
        <HexGrid dark={dark} />
        <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <Rev><p style={{ fontSize: 12, fontWeight: 600, color: t.ac, textTransform: "uppercase", letterSpacing: ".14em", marginBottom: 12, fontFamily: "'JetBrains Mono', monospace" }}>// Services</p></Rev>
          <Rev delay={.05}><h2 style={{ fontSize: "clamp(30px, 4.5vw, 48px)", fontWeight: 800, letterSpacing: "-.03em", marginBottom: 16, lineHeight: 1.1 }}>What we do best</h2></Rev>
          <Rev delay={.1}><p style={{ fontSize: 17, color: t.txM, maxWidth: 540, marginBottom: 60, lineHeight: 1.7 }}>We focus on outcomes, not just outputs. Every solution is built to move your business forward.</p></Rev>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 20 }}>
            {SERVICES.map((s, i) => (
              <Rev key={i} delay={i * .1} dir="scale">
                <div style={{
                  background: dark ? "rgba(17,22,32,0.7)" : "rgba(255,255,255,0.7)", border: `1px solid ${t.brd}`, borderRadius: 18, padding: "36px 30px",
                  transition: "all .4s cubic-bezier(.16,1,.3,1)", cursor: "default", height: "100%",
                  backdropFilter: "blur(12px)", position: "relative", overflow: "hidden",
                }} {...H(
                  { borderColor: t.brd, transform: "none", boxShadow: "none" },
                  { borderColor: t.ac + "55", transform: "translateY(-6px)", boxShadow: `0 16px 48px ${t.ac}15` }
                )}>
                  {/* Card glow on hover */}
                  <div style={{ position: "absolute", top: -40, right: -40, width: 120, height: 120, borderRadius: "50%", background: `radial-gradient(circle, ${t.ac}08 0%, transparent 70%)`, pointerEvents: "none" }} />
                  <div style={{
                    width: 52, height: 52, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center",
                    color: t.ac, marginBottom: 22,
                    background: `linear-gradient(135deg, ${t.acS}, ${dark ? "rgba(139,100,255,0.06)" : "rgba(139,92,246,0.04)"})`,
                    border: `1px solid ${t.acSB}`, boxShadow: `0 0 20px ${t.ac}10`,
                  }}>
                    <span style={{ width: 26, height: 26 }}>{IC[s.icon]}</span>
                  </div>
                  <h3 style={{ fontSize: 19, fontWeight: 700, marginBottom: 10, letterSpacing: "-.01em" }}>{s.title}</h3>
                  <p style={{ fontSize: 14.5, color: t.txM, lineHeight: 1.7 }}>{s.desc}</p>
                </div>
              </Rev>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ PORTFOLIO ══════ */}
      {/* <section id="work" style={{ position: "relative", padding: "110px 24px", background: t.bg2, borderTop: `1px solid ${t.brd}`, overflow: "hidden" }}> */}
      <section
              id="work"
              style={{
                padding: "110px 24px",
                position: "relative",
                backgroundImage: `url(${portfolioBg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat"
              }}
            >
        <GridBg color={dark ? "rgba(108,142,255,0.03)" : "rgba(67,97,238,0.025)"} dark={dark} />
        <ParticleField count={20} dark={dark} />
        <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <Rev><p style={{ fontSize: 12, fontWeight: 600, color: t.ac, textTransform: "uppercase", letterSpacing: ".14em", marginBottom: 12, fontFamily: "'JetBrains Mono', monospace" }}>// Portfolio</p></Rev>
          <Rev delay={.05}><h2 style={{ fontSize: "clamp(30px, 4.5vw, 48px)", fontWeight: 800, letterSpacing: "-.03em", marginBottom: 16, lineHeight: 1.1 }}>Selected work</h2></Rev>
          <Rev delay={.1}><p style={{ fontSize: 17, color: t.txM, maxWidth: 500, marginBottom: 60, lineHeight: 1.7 }}>Real projects, real results. Here's some of what we've shipped.</p></Rev>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: 24 }}>
            {PROJECTS.map((p, i) => (
              <Rev key={i} delay={i * .12} dir="scale">
                <div style={{
                  background: dark ? "rgba(17,22,32,0.6)" : "rgba(255,255,255,0.6)", border: `1px solid ${t.brd}`, borderRadius: 20,
                  overflow: "hidden", transition: "all .4s cubic-bezier(.16,1,.3,1)", height: "100%", display: "flex", flexDirection: "column",
                  backdropFilter: "blur(12px)",
                }} {...H(
                  { transform: "none", boxShadow: "none", borderColor: t.brd },
                  { transform: "translateY(-8px)", boxShadow: `0 24px 64px ${p.accent}20`, borderColor: p.accent + "44" }
                )}>
                  {/* Project visual area */}
                  <div style={{ height: 220, position: "relative", overflow: "hidden", borderBottom: `1px solid ${t.brd}` }}>
                    <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, ${p.accent}12 0%, ${dark ? "#0C1018" : "#F8FAFC"} 100%)` }} />
                    {/* Animated tech grid in project card */}
                    <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.3 }}>
                      <defs>
                        <pattern id={`pgrid${i}`} width="40" height="40" patternUnits="userSpaceOnUse">
                          <path d="M 40 0 L 0 0 0 40" fill="none" stroke={p.accent + "20"} strokeWidth="0.5" />
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill={`url(#pgrid${i})`} />
                    </svg>
                    {/* Floating orb in card */}
                    <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 150, height: 150, borderRadius: "50%", background: `radial-gradient(circle, ${p.accent}15 0%, transparent 70%)`, animation: `orbFloat${i % 4} 12s ease-in-out infinite` }} />
                    {/* Project initial badge */}
                    {/* <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 80, height: 80, borderRadius: 20, background: `linear-gradient(135deg, ${p.accent}25, ${p.accent}10)`, border: `2px solid ${p.accent}35`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 0 40px ${p.accent}15`, backdropFilter: "blur(8px)" }}>
                      <span style={{ fontSize: 34, fontWeight: 800, color: p.accent }}>{p.title.charAt(0)}</span>
                    </div> */}
                    <div style={{ height: "180px", overflow: "hidden", borderRadius: "12px" }}>
                        <img
                          src={p.image}
                          alt={p.title}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            transition: "transform 0.4s ease"
                          }}
                          onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                          onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
                        />
                      </div>
                    {/* Scan line in card */}
                    <div style={{ position: "absolute", left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent, ${p.accent}20, transparent)`, animation: `scanDown 6s linear infinite`, animationDelay: `${i * -2}s` }} />
                  </div>
                  <div style={{ padding: "28px 28px 32px", flex: 1, display: "flex", flexDirection: "column" }}>
                    <span style={{ fontSize: 11.5, fontWeight: 600, color: p.accent, textTransform: "uppercase", letterSpacing: ".1em", marginBottom: 12, fontFamily: "'JetBrains Mono', monospace" }}>{p.cat}</span>
                    <h3 style={{ fontSize: 21, fontWeight: 700, marginBottom: 10, letterSpacing: "-.01em" }}>{p.title}</h3>
                    <p style={{ fontSize: 14, color: t.txM, lineHeight: 1.7, flex: 1 }}>{p.desc}</p>
                    <a href={p.link} style={{ display: "inline-flex", alignItems: "center", gap: 6, marginTop: 20, fontSize: 14, fontWeight: 600, color: t.ac, textDecoration: "none", transition: "gap .3s" }}
                      {...H({ gap: "6px" }, { gap: "12px" })}>
                      View Project <span style={{ width: 16, height: 16 }}>{IC.arrow}</span>
                    </a>
                  </div>
                </div>
              </Rev>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ PROCESS ══════ */}
      <section id="process" style={{ position: "relative", padding: "110px 24px", background: t.bg, borderTop: `1px solid ${t.brd}`, overflow: "hidden" }}>
        <HexGrid dark={dark} />
        <ScanLine dark={dark} />
        <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <Rev><p style={{ fontSize: 12, fontWeight: 600, color: t.ac, textTransform: "uppercase", letterSpacing: ".14em", marginBottom: 12, fontFamily: "'JetBrains Mono', monospace" }}>// Process</p></Rev>
          <Rev delay={.05}><h2 style={{ fontSize: "clamp(30px, 4.5vw, 48px)", fontWeight: 800, letterSpacing: "-.03em", marginBottom: 16, lineHeight: 1.1 }}>How we work</h2></Rev>
          <Rev delay={.1}><p style={{ fontSize: 17, color: t.txM, maxWidth: 500, marginBottom: 60, lineHeight: 1.7 }}>A clear, proven process — from first call to launch and beyond.</p></Rev>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 16 }}>
            {STEPS.map((s, i) => (
              <Rev key={i} delay={i * .09} dir="scale">
                <div style={{
                  padding: "36px 26px", borderRadius: 18, height: "100%", position: "relative", overflow: "hidden",
                  background: dark ? "rgba(17,22,32,0.6)" : "rgba(255,255,255,0.6)",
                  border: `1px solid ${t.brd}`, backdropFilter: "blur(8px)",
                  transition: "all .4s",
                }} {...H({ borderColor: t.brd, transform: "none" }, { borderColor: t.ac + "44", transform: "translateY(-4px)" })}>
                  {/* Glowing step node */}
                  <div style={{
                    width: 44, height: 44, borderRadius: 12, marginBottom: 18,
                    background: `linear-gradient(135deg, ${t.ac}15, ${t.ac}05)`,
                    border: `1.5px solid ${t.ac}30`, display: "flex", alignItems: "center", justifyContent: "center",
                    animation: "nodeGlow 3s ease-in-out infinite", animationDelay: `${i * 0.6}s`,
                  }}>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 14, color: t.ac, fontWeight: 600 }}>{s.n}</span>
                  </div>
                  <h3 style={{ fontSize: 19, fontWeight: 700, marginBottom: 8 }}>{s.t}</h3>
                  <p style={{ fontSize: 13.5, color: t.txM, lineHeight: 1.65 }}>{s.d}</p>
                  {/* Connection line to next */}
                  {i < STEPS.length - 1 && (
                    <div style={{ position: "absolute", top: 54, right: -9, width: 18, height: 1, background: `linear-gradient(90deg, ${t.ac}30, transparent)`, display: "none" }} className="conn-line" />
                  )}
                </div>
              </Rev>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ TESTIMONIALS ══════ */}
      {/* <section id="testimonials" style={{ position: "relative", padding: "110px 24px", background: t.bg2, borderTop: `1px solid ${t.brd}`, overflow: "hidden" }}> */}
      <section
            id="testimonials"
            style={{
              padding: "80px 20px",
              position: "relative",
              backgroundImage: `url(${testimonialBg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat"
            }}
          >
        <FloatingOrbs dark={dark} />
        <CircuitPattern dark={dark} />
        <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
          <Rev><p style={{ fontSize: 12, fontWeight: 600, color: t.ac, textTransform: "uppercase", letterSpacing: ".14em", marginBottom: 12, fontFamily: "'JetBrains Mono', monospace" }}>// Testimonials</p></Rev>
          <Rev delay={.05}><h2 style={{ fontSize: "clamp(30px, 4.5vw, 48px)", fontWeight: 800, letterSpacing: "-.03em", marginBottom: 60, lineHeight: 1.1 }}>What clients say</h2></Rev>
          <Rev delay={.15}>
            <div style={{
              position: "relative", minHeight: 240, padding: "40px 32px", borderRadius: 24,
              background: dark ? "rgba(17,22,32,0.5)" : "rgba(255,255,255,0.5)",
              border: `1px solid ${t.brd}`, backdropFilter: "blur(12px)",
            }}>
              {/* Decorative quote glow */}
              <div style={{ position: "absolute", top: -30, left: "50%", transform: "translateX(-50%)", width: 200, height: 100, borderRadius: "50%", background: `radial-gradient(circle, ${t.ac}08, transparent)`, pointerEvents: "none" }} />
              {TESTI.map((tm, i) => (
                <div key={i} style={{
                  position: i === ati ? "relative" : "absolute", top: i === ati ? 0 : 40, left: 0, right: 0,
                  opacity: i === ati ? 1 : 0, transform: i === ati ? "translateY(0) scale(1)" : "translateY(20px) scale(0.97)",
                  transition: "all .7s cubic-bezier(.16,1,.3,1)", pointerEvents: i === ati ? "auto" : "none",
                }}>
                  <div style={{ fontSize: 52, lineHeight: 1, marginBottom: 18, background: `linear-gradient(135deg, ${t.ac}, ${dark ? "#8B6CFF" : "#6C5CE7"})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", opacity: 0.4 }}>"</div>
                  <p style={{ fontSize: "clamp(16px, 2.5vw, 19px)", color: t.tx, lineHeight: 1.75, fontWeight: 400, marginBottom: 30, fontStyle: "italic" }}>{tm.text}</p>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14 }}>
                    <div style={{
                      width: 48, height: 48, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                      color: "#fff", fontSize: 16, fontWeight: 700,
                      background: `linear-gradient(135deg, ${t.ac}, ${dark ? "#8B6CFF" : "#6C5CE7"})`,
                      boxShadow: `0 4px 16px ${t.ac}30`,
                    }}>{tm.ini}</div>
                    <div style={{ textAlign: "left" }}>
                      <div style={{ fontSize: 15, fontWeight: 600 }}>{tm.name}</div>
                      <div style={{ fontSize: 13, color: t.txM }}>{tm.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: 10, marginTop: 32 }}>
              {TESTI.map((_, i) => (
                <button key={i} onClick={() => setAti(i)} style={{
                  width: i === ati ? 32 : 10, height: 10, borderRadius: 100, border: "none", cursor: "pointer", padding: 0,
                  background: i === ati ? `linear-gradient(90deg, ${t.ac}, ${dark ? "#8B6CFF" : "#6C5CE7"})` : t.brd,
                  transition: "all .4s cubic-bezier(.16,1,.3,1)",
                  boxShadow: i === ati ? `0 0 12px ${t.ac}40` : "none",
                }} aria-label={`Testimonial ${i + 1}`} />
              ))}
            </div>
          </Rev>
        </div>
      </section>

      {/* ══════ CTA ══════ */}
      <section style={{ position: "relative", padding: "120px 24px", background: t.ctaBg, overflow: "hidden" }}>
        {/* CTA animated mesh */}
        <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
          <div style={{ position: "absolute", top: "-20%", left: "-10%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(108,142,255,0.08) 0%, transparent 70%)", animation: "orbFloat0 20s ease-in-out infinite" }} />
          <div style={{ position: "absolute", bottom: "-20%", right: "-10%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(139,100,255,0.06) 0%, transparent 70%)", animation: "orbFloat1 18s ease-in-out infinite" }} />
        </div>
        <ParticleField count={25} dark={true} />
        <GridBg color="rgba(108,142,255,0.035)" dark={true} />

        <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
          <Rev><h2 style={{
            fontSize: "clamp(30px, 5vw, 52px)", fontWeight: 800, letterSpacing: "-.035em", color: "#fff", marginBottom: 20, lineHeight: 1.1,
            background: "linear-gradient(135deg, #fff 0%, #6C8EFF 50%, #fff 100%)", backgroundSize: "200% auto",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", animation: "textShimmer 5s linear infinite",
          }}>Let's build something that<br />grows your business</h2></Rev>
          <Rev delay={.1}><p style={{ fontSize: 17, color: "rgba(255,255,255,.55)", marginBottom: 42, lineHeight: 1.7 }}>Ready to take your business to the next level? We're one message away.</p></Rev>
          <Rev delay={.2}>
            <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
              <button className="bp" onClick={() => go("#contact")} style={{ background: "#fff", color: "#0F172A" }}>Contact Us</button>
              <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="bs" style={{ borderColor: "rgba(255,255,255,.15)", color: "#fff" }}>
                <span style={{ width: 20, height: 20, display: "inline-flex" }}>{IC.wa}</span>WhatsApp Us
              </a>
            </div>
          </Rev>
        </div>
      </section>

      {/* ══════ CONTACT ══════ */}
      <section id="contact" style={{ position: "relative", padding: "110px 24px", background: t.bg, borderTop: `1px solid ${t.brd}`, overflow: "hidden" }}>
        <HexGrid dark={dark} />
        <FloatingOrbs dark={dark} />
        <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <Rev><p style={{ fontSize: 12, fontWeight: 600, color: t.ac, textTransform: "uppercase", letterSpacing: ".14em", marginBottom: 12, fontFamily: "'JetBrains Mono', monospace" }}>// Contact</p></Rev>
          <Rev delay={.05}><h2 style={{ fontSize: "clamp(30px, 4.5vw, 48px)", fontWeight: 800, letterSpacing: "-.03em", marginBottom: 60, lineHeight: 1.1 }}>Get in touch</h2></Rev>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(340px,1fr))", gap: 48 }}>
            <Rev delay={.12}>
              <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
                <p style={{ fontSize: 16.5, color: t.txM, lineHeight: 1.75 }}>Have a project in mind? We'd love to hear about it. Reach out and let's start a conversation.</p>
                {[
                  { icon: IC.mail, label: EMAIL, href: `mailto:${EMAIL}` },
                  { icon: IC.tel, label: PHONE, href: `tel:${PHONE}` },
                  { icon: IC.ig, label: "@decypherlab", href: INSTA },
                  { icon: IC.pin, label: LOC },
                ].map((c, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <div style={{
                      width: 46, height: 46, borderRadius: 13, display: "flex", alignItems: "center", justifyContent: "center",
                      color: t.ac, flexShrink: 0, backdropFilter: "blur(8px)",
                      background: `linear-gradient(135deg, ${t.acS}, ${dark ? "rgba(139,100,255,0.04)" : "rgba(139,92,246,0.02)"})`,
                      border: `1px solid ${t.acSB}`, boxShadow: `0 0 16px ${t.ac}08`,
                    }}><span style={{ width: 22, height: 22 }}>{c.icon}</span></div>
                    {c.href ? <a href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" style={{ color: t.tx, textDecoration: "none", fontSize: 15, fontWeight: 500, transition: "color .25s" }} {...H({ color: t.tx }, { color: t.ac })}>{c.label}</a>
                      : <span style={{ fontSize: 15, fontWeight: 500 }}>{c.label}</span>}
                  </div>
                ))}
                <a href={WA_URL} target="_blank" rel="noopener noreferrer" style={{
                  display: "inline-flex", alignItems: "center", gap: 10, padding: "15px 30px",
                  background: "linear-gradient(135deg, #25D366, #128C7E)", color: "#fff",
                  borderRadius: 14, fontWeight: 600, fontSize: 15, textDecoration: "none",
                  transition: "all .3s", width: "fit-content", marginTop: 4,
                  boxShadow: "0 4px 20px rgba(37,211,102,.2)",
                }} {...H({ transform: "none", boxShadow: "0 4px 20px rgba(37,211,102,.2)" }, { transform: "translateY(-3px)", boxShadow: "0 10px 32px rgba(37,211,102,.4)" })}>
                  <span style={{ width: 22, height: 22 }}>{IC.wa}</span>Chat on WhatsApp
                </a>
              </div>
            </Rev>
            <Rev delay={.22}>
              <form onSubmit={sub} style={{
                display: "flex", flexDirection: "column", gap: 18, padding: "36px 32px", borderRadius: 22,
                background: dark ? "rgba(17,22,32,0.5)" : "rgba(255,255,255,0.5)",
                border: `1px solid ${t.brd}`, backdropFilter: "blur(12px)",
              }}>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: t.txM, marginBottom: 8, textTransform: "uppercase", letterSpacing: ".08em", fontFamily: "'JetBrains Mono', monospace" }}>Your Name</label>
                  <input type="text" placeholder="John Doe" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: t.txM, marginBottom: 8, textTransform: "uppercase", letterSpacing: ".08em", fontFamily: "'JetBrains Mono', monospace" }}>Email or Phone</label>
                  <input type="text" placeholder="you@company.com" required value={form.contact} onChange={e => setForm({ ...form, contact: e.target.value })} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: t.txM, marginBottom: 8, textTransform: "uppercase", letterSpacing: ".08em", fontFamily: "'JetBrains Mono', monospace" }}>Message</label>
                  <textarea placeholder="Tell us about your project..." required value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
                </div>
                <button type="submit" className="bp" style={{ width: "100%", justifyContent: "center", marginTop: 6, padding: "16px 34px" }}>
                  {sent ? "Message Sent ✓" : <><span>Send Message</span><span style={{ width: 18, height: 18, display: "inline-flex" }}>{IC.send}</span></>}
                </button>
              </form>
            </Rev>
          </div>
        </div>
      </section>  

 {/* ══════ FOOTER ══════ */}
<footer style={{ position: "relative", padding: "52px 24px 36px", background: t.bg2, borderTop: `1px solid ${t.brd}`, overflow: "hidden" }}>
  <CircuitPattern dark={dark} />

  <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>

    {/* TOP SECTION */}
    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-start", gap: 36, marginBottom: 44 }}>

      {/* LEFT: LOGO + TEXT */}
      <div>
        <div style={{ marginBottom: 12 }}>
          <img 
            src="/logo.svg" 
            alt="Decypher Lab Logo"
            style={{ height: "72px", objectFit: "contain" }}
          />
        </div>

        <p style={{ fontSize: 14, color: t.txM, maxWidth: 290, lineHeight: 1.65 }}>
          Building digital systems that help businesses grow. Based in Bangalore.
        </p>
      </div>

      {/* RIGHT: LINKS + CONNECT */}
      <div style={{ display: "flex", gap: 52, flexWrap: "wrap" }}>

        {/* LINKS */}
        <div>
          <p style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: ".1em", color: t.txF, marginBottom: 16, fontFamily: "'JetBrains Mono', monospace" }}>
            Links
          </p>

          {NAV.map(l => (
            <span 
              key={l.h} 
              onClick={() => go(l.h)} 
              className="nl" 
              style={{ display: "block", marginBottom: 12, fontSize: 14 }}
            >
              {l.l}
            </span>
          ))}
        </div>

        {/* CONNECT */}
        <div>
          <p style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: ".1em", color: t.txF, marginBottom: 16, fontFamily: "'JetBrains Mono', monospace" }}>
            Connect
          </p>

          <a href={`mailto:${EMAIL}`} className="nl" style={{ display: "block", marginBottom: 12, fontSize: 14 }}>
            {EMAIL}
          </a>

          <a href={`tel:${PHONE}`} className="nl" style={{ display: "block", marginBottom: 12, fontSize: 14 }}>
            {PHONE}
          </a>

          <a href={INSTA} target="_blank" rel="noopener noreferrer" className="nl" style={{ display: "block", marginBottom: 12, fontSize: 14 }}>
            Instagram
          </a>

          <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="nl" style={{ display: "block", fontSize: 14 }}>
            WhatsApp
          </a>
        </div>

      </div>
    </div>

    {/* BOTTOM BAR */}
    <div style={{ borderTop: `1px solid ${t.brd}`, paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
      
      {/* LEFT TEXT (REMOVED BRAND NAME) */}
      <p style={{ fontSize: 13, color: t.txF }}>
        © {new Date().getFullYear()} All rights reserved.
      </p>

      {/* RIGHT TEXT */}
      <p style={{ fontSize: 13, color: t.txF, fontFamily: "'JetBrains Mono', monospace" }}>
        Crafted with precision in Bangalore
      </p>

    </div>

  </div>
</footer>
      {/* ══════ WHATSAPP FAB ══════ */}
      <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="wf" aria-label="Chat on WhatsApp">
        <span style={{ position: "absolute", width: "100%", height: "100%", borderRadius: "50%", background: "#25D366", animation: "pr 2s ease-out infinite", zIndex: -1 }} />
        {IC.wa}
      </a>
    </div>
  );
}
