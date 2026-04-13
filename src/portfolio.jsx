import { useState, useEffect, useRef } from "react";
import {
  motion, AnimatePresence,
  useMotionValue, useSpring,
  useInView, useScroll, useTransform,
  animate as fmAnimate
} from "framer-motion";
import {
  Mail, ExternalLink, X,
  ChevronDown, Zap, Shield, Brain, ArrowRight, TrendingUp
} from "lucide-react";

const Github = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.293 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z"></path></svg>
);

const Linkedin = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
);

/* ─────────────────────────────  DATA  ───────────────────────────── */

const SKILLS = [
  { name: "React", icon: "⚛", color: "#61dafb", level: "Expert" },
  { name: "Angular", icon: "🅰", color: "#dd0031", level: "Advanced" },
  { name: ".NET", icon: "◈", color: "#7b5cf0", level: "Expert" },
  { name: "Node.js", icon: "◉", color: "#68a063", level: "Advanced" },
  { name: "AWS", icon: "☁", color: "#ff9900", level: "Intermediate" },
  { name: "MongoDB", icon: "◬", color: "#4db33d", level: "Advanced" },
  { name: "SQL", icon: "⊞", color: "#336791", level: "Expert" },
  { name: "UI / UX", icon: "✦", color: "#ff7262", level: "Advanced" },
];

const PROJECTS = [
  {
    id: 1,
    title: "Enterprise Analytics Platform",
    category: "Full-Stack",
    problem:
      "A Fortune 500 company spent 40+ hrs/week manually compiling sales reports from 12 disparate data sources, causing delayed decision-making and costly blind spots.",
    solution:
      "Built a real-time analytics dashboard that aggregated data via REST APIs, processed it through a Node.js pipeline, and surfaced insights with React-based interactive charts and drill-down filters.",
    tech: ["React", "Node.js", "AWS Lambda", "MongoDB", "D3.js"],
    impact: ["87% less reporting time", "12 sources unified", "200+ daily analysts", "$2.4M saved annually"],
    color: "#6366f1",
  },
  {
    id: 2,
    title: "Healthcare Booking System",
    category: ".NET / React",
    problem:
      "A healthcare network had 35% appointment no-shows and a fragmented booking experience across 8 clinic locations, costing $1.2M/year in lost revenue.",
    solution:
      "Built a centralised scheduling platform with smart reminders, waitlist management and two-way calendar sync — .NET Core backend, React frontend, real-time updates via SignalR.",
    tech: ["React", ".NET Core", "SQL Server", "Azure", "SignalR"],
    impact: ["No-shows dropped 68%", "Booking time cut 75%", "8 clinics unified", "$890K revenue recovered"],
    color: "#06b6d4",
  },
  {
    id: 3,
    title: "E-Commerce Microservices Migration",
    category: "Cloud / Architecture",
    problem:
      "A growing e-commerce platform suffered 12-hour downtime on every peak sale day (Black Friday) due to a monolithic architecture incapable of elastic scaling.",
    solution:
      "Architected migration to AWS microservices with auto-scaling groups, CDN edge optimisation, and a blue-green deployment pipeline — zero downtime from day one.",
    tech: ["AWS ECS", "Node.js", "React", "MongoDB", "Docker", "Nginx"],
    impact: ["Zero downtime achieved", "Load time 3.2s → 0.8s", "10× traffic spike handled", "99.97% uptime SLA met"],
    color: "#8b5cf6",
  },
  {
    id: 4,
    title: "Real-Time Collaboration Tool",
    category: "Full-Stack / WebSockets",
    problem:
      "A distributed team of 500+ employees needed a secure, low-latency document-collaboration tool that continued working offline and synced changes on reconnection.",
    solution:
      "Built a Notion-style editor with CRDT-based conflict resolution, offline-first PWA architecture, and real-time WebSocket sync — shipped under 10 weeks.",
    tech: ["React", "Node.js", "WebSockets", "MongoDB", "Service Workers"],
    impact: ["Sub-100ms latency", "Seamless offline mode", "500+ active users", "NPS score 72"],
    color: "#f59e0b",
  },
];

const WHY_ME = [
  { Icon: Zap, title: "Fast Delivery", desc: "I ship production-ready features in days, not weeks — without cutting corners on quality or scalability.", color: "#f59e0b" },
  { Icon: Shield, title: "Clean Code", desc: "Every line is reviewed, tested and documented. Maintainability is the default, not an afterthought.", color: "#6366f1" },
  { Icon: Brain, title: "Business Understanding", desc: "I understand your domain, your users and your revenue model before writing line one — saving costly pivots.", color: "#06b6d4" },
  { Icon: TrendingUp, title: "Scalable Architecture", desc: "From 10 users to 10 million, the systems I build are designed to grow with your business — not collapse under it.", color: "#8b5cf6" },
];

const STATS = [
  { value: 25, suffix: "+", label: "Projects Shipped" },
  { value: 15, suffix: "+", label: "Happy Clients" },
  { value: 4, suffix: "+", label: "Years Experience" },
  { value: 99, suffix: "%", label: "Client Retention" },
];

/* ──────────────────────────  ANIMATION PRESETS  ─────────────────── */

const up = {
  hidden: { opacity: 0, y: 44 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
};
const stagger = { visible: { transition: { staggerChildren: 0.13 } } };

/* ──────────────────────────  CURSOR GLOW  ───────────────────────── */

function CursorGlow() {
  const mx = useMotionValue(0), my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 70, damping: 18 });
  const sy = useSpring(my, { stiffness: 70, damping: 18 });
  useEffect(() => {
    const fn = e => { mx.set(e.clientX); my.set(e.clientY); };
    window.addEventListener("mousemove", fn);
    return () => window.removeEventListener("mousemove", fn);
  }, [mx, my]);
  return (
    <motion.div
      style={{
        position: "fixed", left: sx, top: sy,
        width: 700, height: 700, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 65%)",
        transform: "translate(-50%,-50%)",
        pointerEvents: "none", zIndex: 0, mixBlendMode: "screen",
      }}
    />
  );
}

/* ──────────────────────────  ANIMATED COUNTER  ──────────────────── */

function Counter({ value, suffix }) {
  const [n, setN] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    const ctrl = fmAnimate(0, value, { duration: 2.2, ease: "easeOut", onUpdate: v => setN(Math.round(v)) });
    return ctrl.stop;
  }, [inView, value]);
  return <span ref={ref}>{n}{suffix}</span>;
}

/* ──────────────────────────  SCROLL SECTION WRAPPER  ────────────── */

function Reveal({ children, className = "", style = {} }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} variants={stagger} initial="hidden" animate={inView ? "visible" : "hidden"}
      className={className} style={style}>{children}</motion.div>
  );
}

/* ──────────────────────────  NAVBAR  ────────────────────────────── */

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <motion.nav initial={{ y: -72, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "0 40px", height: 66,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: scrolled ? "rgba(4,4,10,0.82)" : "transparent",
        backdropFilter: scrolled ? "blur(22px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(99,102,241,0.14)" : "1px solid transparent",
        transition: "all 0.35s ease",
      }}>
      <span style={{
        fontFamily: "'Syne',sans-serif", fontSize: 22, fontWeight: 800, letterSpacing: "-0.5px",
        background: "linear-gradient(135deg,#6366f1,#06b6d4)",
        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
      }}>HS.</span>

      <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
        {["About", "Skills", "Projects", "Contact"].map(l => (
          <a key={l} href={`#${l.toLowerCase()}`}
            style={{ color: "rgba(255,255,255,0.55)", textDecoration: "none", fontSize: 14, fontWeight: 500, letterSpacing: "0.02em", transition: "color .2s" }}
            onMouseEnter={e => e.target.style.color = "#fff"}
            onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.55)"}>{l}</a>
        ))}
        <a href="#contact" style={{
          padding: "8px 20px", borderRadius: 9,
          background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
          color: "#fff", textDecoration: "none", fontSize: 14, fontWeight: 600,
          boxShadow: "0 0 22px rgba(99,102,241,0.45)", transition: "box-shadow .25s, transform .25s",
        }}
          onMouseEnter={e => { e.target.style.boxShadow = "0 0 40px rgba(99,102,241,0.7)"; e.target.style.transform = "translateY(-1px)"; }}
          onMouseLeave={e => { e.target.style.boxShadow = "0 0 22px rgba(99,102,241,0.45)"; e.target.style.transform = "translateY(0)"; }}>
          Hire Me
        </a>
      </div>
    </motion.nav>
  );
}

/* ──────────────────────────  HERO  ──────────────────────────────── */

function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 130]);
  const op = useTransform(scrollY, [0, 380], [1, 0]);

  return (
    <section id="home" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden", padding: "0 24px" }}>
      {/* floating blobs */}
      <div className="blob b1" />
      <div className="blob b2" />
      <div className="blob b3" />
      {/* subtle grid */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none",
        backgroundImage: "linear-gradient(rgba(99,102,241,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(99,102,241,0.05) 1px,transparent 1px)",
        backgroundSize: "58px 58px",
        WebkitMaskImage: "radial-gradient(ellipse at center, black 25%, transparent 72%)",
        maskImage: "radial-gradient(ellipse at center, black 25%, transparent 72%)",
      }} />

      <motion.div style={{ y, opacity: op, textAlign: "center", position: "relative", zIndex: 10, maxWidth: 940 }}>
        {/* availability badge */}
        <motion.div initial={{ opacity: 0, scale: 0.88 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.55, delay: 0.3 }}
          style={{
            display: "inline-flex", alignItems: "center", gap: 8, padding: "5px 16px",
            borderRadius: 100, border: "1px solid rgba(99,102,241,0.38)",
            background: "rgba(99,102,241,0.08)", marginBottom: 36,
            fontSize: 12, color: "#a5b4fc", letterSpacing: "0.09em", textTransform: "uppercase",
          }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#6ee7b7", boxShadow: "0 0 9px #6ee7b7", flexShrink: 0 }} />
          Available for new projects
        </motion.div>

        {/* name */}
        <motion.h1 initial={{ opacity: 0, y: 55 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: "'Syne',sans-serif",
            fontSize: "clamp(48px,9vw,96px)", fontWeight: 800,
            lineHeight: 1.03, letterSpacing: "-2.5px", marginBottom: 4,
          }}>
          <span style={{ color: "#fff" }}>Harshit </span>
          <span style={{ background: "linear-gradient(135deg,#6366f1 0%,#8b5cf6 48%,#06b6d4 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Sharma
          </span>
        </motion.h1>

        {/* headline */}
        <motion.p initial={{ opacity: 0, y: 42 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontSize: "clamp(16px,2.4vw,23px)", lineHeight: 1.55,
            color: "rgba(255,255,255,0.62)", maxWidth: 700, margin: "0 auto 52px", fontWeight: 400,
          }}>
          I build{" "}
          <span style={{ color: "#a5b4fc", fontWeight: 600 }}>scalable, high-performance</span>{" "}
          digital products that drive{" "}
          <span style={{ color: "#67e8f9", fontWeight: 600 }}>real business impact</span>
        </motion.p>

        {/* CTAs */}
        <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.78 }}
          style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
          <a href="#projects" className="btn-p">
            View Work <ArrowRight size={15} style={{ display: "inline", marginLeft: 8, verticalAlign: "middle" }} />
          </a>
          <a href="#contact" className="btn-s">Hire Me</a>
        </motion.div>

        {/* scroll hint */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }}
          style={{ marginTop: 110, display: "flex", flexDirection: "column", alignItems: "center", gap: 7, color: "rgba(255,255,255,0.28)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase" }}>
          <span>Scroll</span>
          <motion.div animate={{ y: [0, 9, 0] }} transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}>
            <ChevronDown size={15} />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ──────────────────────────  ABOUT  ─────────────────────────────── */

function About() {
  return (
    <section id="about" style={{ padding: "130px 40px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Reveal style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          <motion.div variants={up}>
            <div className="pill" style={{ marginBottom: 22 }}>About Me</div>
            <h2 className="h2">Developer who thinks<br />
              <span className="grad">like a strategist</span>
            </h2>
            <p className="muted" style={{ lineHeight: 1.82, marginBottom: 18 }}>
              I'm a full-stack developer with 4+ years of experience shipping end-to-end digital products — from pixel-perfect UIs to battle-tested back-end systems handling millions of daily requests.
            </p>
            <p className="muted" style={{ lineHeight: 1.82, marginBottom: 36 }}>
              My background as a business analyst gives me an edge: I don't just write code — I understand the <em style={{ color: "#a5b4fc" }}>why</em> behind every feature, helping teams avoid costly pivots and ship things that actually move metrics.
            </p>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {["Scalable Systems", "Business Analysis", "Team Leadership", "Cloud Architecture"].map(t => (
                <span key={t} style={{ padding: "6px 14px", borderRadius: 100, border: "1px solid rgba(99,102,241,0.28)", background: "rgba(99,102,241,0.07)", color: "#a5b4fc", fontSize: 13, fontWeight: 500 }}>{t}</span>
              ))}
            </div>
          </motion.div>

          <motion.div variants={up} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            {[
              { e: "🚀", l: "Delivery Speed", v: "2× faster than avg" },
              { e: "💡", l: "Problem Solving", v: "Root-cause focused" },
              { e: "📊", l: "Business Impact", v: "Metric-driven builds" },
              { e: "🔒", l: "Code Quality", v: "Test-driven always" },
            ].map(i => (
              <motion.div key={i.l} variants={up}
                style={{ padding: "22px 20px", borderRadius: 16, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", backdropFilter: "blur(10px)" }}>
                <div style={{ fontSize: 28, marginBottom: 10 }}>{i.e}</div>
                <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: 4 }}>{i.l}</div>
                <div style={{ color: "#fff", fontWeight: 600, fontSize: 15 }}>{i.v}</div>
              </motion.div>
            ))}
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}

/* ──────────────────────────  SKILLS  ────────────────────────────── */

function Skills() {
  return (
    <section id="skills" style={{ padding: "130px 40px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Reveal>
          <motion.div variants={up} style={{ textAlign: "center", marginBottom: 64 }}>
            <div className="pill" style={{ marginBottom: 16, display: "inline-block" }}>Tech Stack</div>
            <h2 className="h2" style={{ textAlign: "center" }}>Tools I <span className="grad">master</span></h2>
          </motion.div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: 16 }}>
            {SKILLS.map((s, i) => (
              <motion.div key={s.name} variants={up}
                whileHover={{ scale: 1.05, y: -5 }}
                style={{
                  padding: "28px 22px", borderRadius: 16,
                  background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
                  backdropFilter: "blur(12px)", cursor: "default", transition: "border-color .3s, box-shadow .3s",
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = s.color + "66"; e.currentTarget.style.boxShadow = `0 0 34px ${s.color}22`; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.boxShadow = "none"; }}>
                <div style={{ fontSize: 34, marginBottom: 12 }}>{s.icon}</div>
                <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 18, color: "#fff", marginBottom: 4 }}>{s.name}</div>
                <div style={{ fontSize: 11, color: s.color, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em" }}>{s.level}</div>
              </motion.div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ──────────────────────────  PROJECTS  ──────────────────────────── */

function Projects() {
  const [sel, setSel] = useState(null);

  return (
    <section id="projects" style={{ padding: "130px 40px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Reveal>
          <motion.div variants={up} style={{ textAlign: "center", marginBottom: 64 }}>
            <div className="pill" style={{ marginBottom: 16, display: "inline-block" }}>Case Studies</div>
            <h2 className="h2" style={{ textAlign: "center" }}>Projects that <span className="grad">moved metrics</span></h2>
          </motion.div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(460px,1fr))", gap: 22 }}>
            {PROJECTS.map(p => (
              <motion.div key={p.id} variants={up} onClick={() => setSel(p)}
                whileHover={{ y: -7 }}
                style={{
                  padding: 32, borderRadius: 22, cursor: "pointer",
                  background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
                  backdropFilter: "blur(12px)", position: "relative", overflow: "hidden",
                  transition: "border-color .3s, box-shadow .3s",
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = p.color + "55"; e.currentTarget.style.boxShadow = `0 22px 70px ${p.color}20`; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.boxShadow = "none"; }}>

                {/* top gradient strip */}
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg,transparent,${p.color},transparent)` }} />

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                  <span style={{ fontSize: 11, color: p.color, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.09em", background: p.color + "18", padding: "4px 11px", borderRadius: 100, border: `1px solid ${p.color}33` }}>{p.category}</span>
                  <ExternalLink size={15} style={{ color: "rgba(255,255,255,0.28)", marginTop: 2 }} />
                </div>

                <h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: 22, fontWeight: 700, color: "#fff", marginBottom: 10, lineHeight: 1.25 }}>{p.title}</h3>
                <p style={{ color: "rgba(255,255,255,0.48)", fontSize: 14, lineHeight: 1.72, marginBottom: 22 }}>{p.problem.slice(0, 118)}…</p>

                <div style={{ display: "flex", gap: 7, flexWrap: "wrap", marginBottom: 20 }}>
                  {p.tech.slice(0, 4).map(t => (
                    <span key={t} style={{ padding: "4px 10px", borderRadius: 6, background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.7)", fontSize: 12, fontWeight: 500 }}>{t}</span>
                  ))}
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 9 }}>
                  {p.impact.slice(0, 2).map(m => (
                    <div key={m} style={{ padding: "10px 13px", borderRadius: 10, background: p.color + "12", border: `1px solid ${p.color}26`, fontSize: 12, color: p.color, fontWeight: 600 }}>✓ {m}</div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </Reveal>
      </div>

      {/* ── modal ── */}
      <AnimatePresence>
        {sel && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setSel(null)}
            style={{
              position: "fixed", inset: 0, zIndex: 200,
              background: "rgba(0,0,0,0.88)", backdropFilter: "blur(22px)",
              display: "flex", alignItems: "center", justifyContent: "center", padding: 24,
            }}>
            <motion.div initial={{ scale: 0.84, opacity: 0, y: 28 }} animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.84, opacity: 0, y: 28 }}
              transition={{ type: "spring", damping: 26, stiffness: 320 }}
              onClick={e => e.stopPropagation()}
              style={{
                background: "rgba(10,10,18,0.96)", border: `1px solid ${sel.color}44`,
                borderRadius: 24, padding: 48, maxWidth: 660, width: "100%",
                maxHeight: "86vh", overflowY: "auto", position: "relative",
                boxShadow: `0 48px 120px ${sel.color}22`,
              }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg,transparent,${sel.color},transparent)`, borderRadius: "24px 24px 0 0" }} />
              <button onClick={() => setSel(null)}
                style={{ position: "absolute", top: 20, right: 20, background: "rgba(255,255,255,0.08)", border: "none", borderRadius: 8, width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#fff" }}>
                <X size={15} />
              </button>

              <span style={{ fontSize: 11, color: sel.color, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em" }}>{sel.category}</span>
              <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: 30, fontWeight: 800, color: "#fff", margin: "10px 0 30px", lineHeight: 1.2 }}>{sel.title}</h2>

              {[{ label: "🔴 The Problem", text: sel.problem }, { label: "🟢 The Solution", text: sel.solution }].map(({ label, text }) => (
                <div key={label} style={{ marginBottom: 26 }}>
                  <div style={{ fontWeight: 700, color: "#fff", marginBottom: 8, fontSize: 15 }}>{label}</div>
                  <p style={{ color: "rgba(255,255,255,0.62)", lineHeight: 1.78, fontSize: 15 }}>{text}</p>
                </div>
              ))}

              <div style={{ marginBottom: 26 }}>
                <div style={{ fontWeight: 700, color: "#fff", marginBottom: 12, fontSize: 15 }}>⚡ Tech Stack</div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {sel.tech.map(t => (
                    <span key={t} style={{ padding: "6px 14px", borderRadius: 8, background: "rgba(255,255,255,0.07)", color: "#fff", fontSize: 13, fontWeight: 500, border: "1px solid rgba(255,255,255,0.11)" }}>{t}</span>
                  ))}
                </div>
              </div>

              <div>
                <div style={{ fontWeight: 700, color: "#fff", marginBottom: 12, fontSize: 15 }}>📈 Impact & Results</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  {sel.impact.map(m => (
                    <div key={m} style={{ padding: "13px 16px", borderRadius: 12, background: sel.color + "12", border: `1px solid ${sel.color}2e`, display: "flex", alignItems: "center", gap: 9 }}>
                      <span style={{ color: sel.color, fontSize: 16, flexShrink: 0 }}>✓</span>
                      <span style={{ color: "#fff", fontSize: 14, fontWeight: 500 }}>{m}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ──────────────────────────  WHY ME  ────────────────────────────── */

function WhyMe() {
  return (
    <section style={{ padding: "130px 40px", background: "rgba(99,102,241,0.025)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Reveal>
          <motion.div variants={up} style={{ textAlign: "center", marginBottom: 64 }}>
            <div className="pill" style={{ marginBottom: 16, display: "inline-block" }}>Why Me</div>
            <h2 className="h2" style={{ textAlign: "center" }}>Why clients <span className="grad">keep coming back</span></h2>
          </motion.div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 20 }}>
            {WHY_ME.map(({ Icon, title, desc, color }) => (
              <motion.div key={title} variants={up}
                whileHover={{ y: -7, scale: 1.025 }}
                style={{ padding: 32, borderRadius: 20, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(12px)", transition: "border-color .3s, box-shadow .3s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = color + "55"; e.currentTarget.style.boxShadow = `0 22px 70px ${color}18`; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.boxShadow = "none"; }}>
                <div style={{ width: 52, height: 52, borderRadius: 14, background: color + "18", border: `1px solid ${color}33`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20, boxShadow: `0 0 20px ${color}22` }}>
                  <Icon size={24} style={{ color }} />
                </div>
                <h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 10 }}>{title}</h3>
                <p style={{ color: "rgba(255,255,255,0.52)", fontSize: 14, lineHeight: 1.78 }}>{desc}</p>
              </motion.div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ──────────────────────────  STATS  ─────────────────────────────── */

function Stats() {
  return (
    <section style={{ padding: "100px 40px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Reveal>
          <motion.div variants={up}
            style={{
              display: "grid", gridTemplateColumns: "repeat(4,1fr)",
              padding: 3, borderRadius: 24,
              background: "linear-gradient(135deg,rgba(99,102,241,0.35),rgba(6,182,212,0.35))",
              gap: 2,
            }}>
            {STATS.map((s, i) => (
              <motion.div key={s.label} variants={up}
                style={{
                  padding: "48px 28px", background: "#050508", textAlign: "center",
                  borderRadius: i === 0 ? "22px 0 0 22px" : i === 3 ? "0 22px 22px 0" : 0,
                }}>
                <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 52, fontWeight: 800, lineHeight: 1, marginBottom: 8, background: "linear-gradient(135deg,#6366f1,#06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  <Counter value={s.value} suffix={s.suffix} />
                </div>
                <div style={{ color: "rgba(255,255,255,0.48)", fontSize: 14, fontWeight: 500, letterSpacing: "0.04em" }}>{s.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}

/* ──────────────────────────  CONTACT  ───────────────────────────── */

function Contact() {
  return (
    <footer id="contact" style={{ padding: "130px 40px 64px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", bottom: -200, left: "50%", transform: "translateX(-50%)", width: 700, height: 500, borderRadius: "50%", background: "radial-gradient(ellipse,rgba(99,102,241,0.1) 0%,transparent 68%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 680, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 10 }}>
        <Reveal>
          <motion.div variants={up}>
            <div className="pill" style={{ marginBottom: 22, display: "inline-block" }}>Contact</div>
            <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(36px,6vw,64px)", fontWeight: 800, color: "#fff", lineHeight: 1.08, letterSpacing: "-1.5px", marginBottom: 18 }}>
              Let's build something<br /><span className="grad">great together</span>
            </h2>
            <p className="muted" style={{ fontSize: 17, lineHeight: 1.72, marginBottom: 50 }}>
              Whether you have a product idea, a scaling challenge, or just want to explore what's possible — I'm three seconds away.
            </p>
          </motion.div>

          <motion.div variants={up} style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", marginBottom: 64 }}>
            {[
              { Icon: Mail, label: "harshit@email.com", href: "mailto:sharmaharshit69657@gmail.com", c: "#6366f1" },
              { Icon: Github, label: "GitHub", href: "https://github.com/harshitsharma32145", c: "#fff" },
              { Icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/harshit-sharma-339b58177", c: "#0a66c2" },
            ].map(({ Icon, label, href, c }) => (
              <motion.a key={label} href={href} target="_blank" rel="noopener noreferrer"
                whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.97 }}
                style={{
                  display: "flex", alignItems: "center", gap: 10, padding: "14px 24px",
                  borderRadius: 12, background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.09)", color: "#fff",
                  textDecoration: "none", fontSize: 15, fontWeight: 500,
                  backdropFilter: "blur(10px)", transition: "border-color .2s, box-shadow .2s",
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = c + "88"; e.currentTarget.style.boxShadow = `0 8px 28px ${c}22`; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)"; e.currentTarget.style.boxShadow = "none"; }}>
                <Icon size={17} style={{ color: c }} />{label}
              </motion.a>
            ))}
          </motion.div>

          <motion.div variants={up} style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: 30, color: "rgba(255,255,255,0.28)", fontSize: 13 }}>
            © 2024 Harshit Sharma · Crafted with precision
          </motion.div>
        </Reveal>
      </div>
    </footer>
  );
}

/* ──────────────────────────  GLOBAL CSS  ─────────────────────────── */

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{background:#050508;color:#fff;font-family:'DM Sans',sans-serif;overflow-x:hidden;-webkit-font-smoothing:antialiased}
::-webkit-scrollbar{width:4px}
::-webkit-scrollbar-track{background:#050508}
::-webkit-scrollbar-thumb{background:rgba(99,102,241,0.5);border-radius:10px}

.h2{font-family:'Syne',sans-serif;font-size:clamp(30px,4.5vw,52px);font-weight:800;color:#fff;line-height:1.08;letter-spacing:-1.5px;margin-bottom:18px}
.grad{background:linear-gradient(135deg,#6366f1 0%,#8b5cf6 48%,#06b6d4 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.muted{color:rgba(255,255,255,0.58);font-size:16px}
.pill{display:inline-flex;align-items:center;gap:6px;padding:5px 14px;border-radius:100px;background:rgba(99,102,241,0.1);border:1px solid rgba(99,102,241,0.3);color:#a5b4fc;font-size:11px;font-weight:700;letter-spacing:.09em;text-transform:uppercase}

.btn-p{display:inline-flex;align-items:center;padding:14px 32px;background:linear-gradient(135deg,#6366f1,#8b5cf6);color:#fff;border-radius:12px;text-decoration:none;font-size:15px;font-weight:600;box-shadow:0 0 32px rgba(99,102,241,.42),0 4px 20px rgba(0,0,0,.3);transition:all .22s ease}
.btn-p:hover{box-shadow:0 0 54px rgba(99,102,241,.7),0 8px 30px rgba(0,0,0,.4);transform:translateY(-2px)}
.btn-s{display:inline-flex;align-items:center;padding:14px 32px;background:rgba(255,255,255,.05);color:#fff;border-radius:12px;text-decoration:none;font-size:15px;font-weight:600;border:1px solid rgba(255,255,255,.12);backdrop-filter:blur(10px);transition:all .22s ease}
.btn-s:hover{background:rgba(255,255,255,.1);border-color:rgba(255,255,255,.24);transform:translateY(-2px)}

.blob{position:absolute;border-radius:50%;filter:blur(90px);pointer-events:none;z-index:0;animation:bfloat 9s ease-in-out infinite}
.b1{width:520px;height:520px;background:radial-gradient(circle,rgba(99,102,241,.18) 0%,transparent 70%);top:-80px;left:-160px;animation-delay:0s}
.b2{width:620px;height:620px;background:radial-gradient(circle,rgba(139,92,246,.12) 0%,transparent 70%);top:180px;right:-200px;animation-delay:-3.5s}
.b3{width:440px;height:440px;background:radial-gradient(circle,rgba(6,182,212,.1) 0%,transparent 70%);bottom:0;left:30%;animation-delay:-6s}
@keyframes bfloat{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(28px,-18px) scale(1.05)}66%{transform:translate(-18px,14px) scale(.97)}}
`;

/* ──────────────────────────  APP  ───────────────────────────────── */

export default function Portfolio() {
  return (
    <>
      <style>{CSS}</style>
      <div style={{ background: "#050508", minHeight: "100vh", position: "relative" }}>
        <CursorGlow />
        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <WhyMe />
          <Stats />
          <Contact />
        </main>
      </div>
    </>
  );
}
