import { useState, useEffect, useRef } from "react";
import {
  motion, AnimatePresence,
  useMotionValue, useSpring,
  useInView, useScroll, useTransform,
  animate as fmAnimate
} from "framer-motion";
import { FaGithub, FaLinkedin, FaExternalLinkAlt, FaEnvelope, FaDownload, FaArrowRight, FaServer, FaCode, FaCloud, FaTools } from "react-icons/fa";

/* ─────────────────────────────  DATA  ───────────────────────────── */

const SKILLS = [
  { category: "Frontend", icon: <FaCode />, color: "#3b82f6", skills: ["Angular", "TypeScript", "React", "HTML5/CSS3", "Tailwind CSS", "RxJS"] },
  { category: "Backend", icon: <FaServer />, color: "#8b5cf6", skills: [".NET Core", "C#", "RESTful APIs", "SQL Server", "Entity Framework", "Node.js"] },
  { category: "Cloud & DevOps", icon: <FaCloud />, color: "#0ea5e9", skills: ["AWS (S3, SES, SNS, EC2)", "Docker", "CI/CD Pipelines", "GitActions", "IIS Hosting"] },
  { category: "Tools & Methodologies", icon: <FaTools />, color: "#10b981", skills: ["Agile/Scrum", "JIRA", "BRD/FRD Creation", "Git", "Postman", "Figma"] }
];

const EXPERIENCE = [
  {
    id: 1,
    company: "eClerx",
    role: "Business Analyst / Technical Lead",
    duration: "January 2026 – Present",
    focus: "Strategic Analysis & Process Optimization",
    points: [
      "Bridge the gap between business stakeholders and technical execution by developing comprehensive BRDs and FRDs.",
      "Conduct in-depth data analysis and synthesize reporting to drive key executive-level decision making.",
      "Spearhead process improvement initiatives, reducing workflow bottlenecks and accelerating project delivery times.",
      "Collaborate directly with cross-functional software engineering teams to ensure architectural alignment with business goals."
    ]
  },
  {
    id: 2,
    company: "SmartData Enterprises",
    role: "Full Stack Developer & Business Analyst",
    duration: "March 2023 – December 2025",
    focus: "Enterprise Development & Cloud Architecture",
    points: [
      "Architected and developed secure, scalable enterprise web applications utilizing Angular on the frontend and .NET Core for backend microservices.",
      "Integrated AWS cloud solutions actively (S3 for storage, SES for email, SNS for push notifications) to ensure robust system availability.",
      "Implemented secure application development practices including advanced JWT authentication, strict hashing, and RBAC.",
      "Developed high-throughput real-time notification systems leveraging WebSockets / SignalR.",
      "Drove end-to-end Agile software lifecycles via JIRA, participating in sprint planning, retrospectives, and daily standups."
    ]
  }
];

const PROJECTS = [
  {
    id: 1,
    title: "Enterprise FinTech Dashboard",
    category: "Full Stack / AWS",
    problem: "A financial organization struggled with a legacy monolithic system that took 12+ seconds to load critical compliance reports, severely impacting operational efficiency.",
    solution: "Re-architected the reporting module using a decentralized microservice approach. Built an Angular frontend and a highly optimized .NET Core Web API.",
    tech: ["Angular", ".NET Core", "SQL Server", "AWS EC2", "AWS S3"],
    features: ["Real-time data visualization", "Role-based access control (RBAC)", "Automated scheduled reporting"],
    impact: ["Reduced report load times by 85% (12s → 1.8s)", "Supported 500+ concurrent analysts without latency spikes", "Resulted in $120k/yr operational cost savings"],
    color: "#3b82f6",
    github: "https://github.com/harshitsharma32145",
    live: "#"
  },
  {
    id: 2,
    title: "Cloud-Native CRM System",
    category: "Architecture & Frontend",
    problem: "Sales representatives were losing leads due to a disconnected system lacking real-time notifications and centralized client tracking.",
    solution: "Conceptualized and built a unified, cloud-native CRM. Developed the UI in Angular and powered the infrastructure with .NET and AWS SNS/SES for instant alerts.",
    tech: ["Angular", "C#", ".NET 8", "AWS SNS/SES", "Entity Framework"],
    features: ["Instant lead push notifications", "Secure authentication/hashing", "Advanced filtering and grid systems"],
    impact: ["Increased lead conversion rate by 22%", "Eliminated manual communication gaps", "Achieved 99.9% uptime via AWS cloud architecture"],
    color: "#8b5cf6",
    github: "https://github.com/harshitsharma32145",
    live: "#"
  }
];

/* ──────────────────────────  ANIMATION VARIANTS  ────────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};
const staggerContainer = { visible: { transition: { staggerChildren: 0.1 } } };

/* ──────────────────────────  COMPONENTS  ────────────────────────── */

function Reveal({ children, className = "", style = {} }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <motion.div ref={ref} variants={staggerContainer} initial="hidden" animate={inView ? "visible" : "hidden"} className={className} style={style}>
      {children}
    </motion.div>
  );
}

function CursorGlow() {
  const mx = useMotionValue(0), my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 50, damping: 20 });
  const sy = useSpring(my, { stiffness: 50, damping: 20 });
  useEffect(() => {
    const fn = e => { mx.set(e.clientX); my.set(e.clientY); };
    window.addEventListener("mousemove", fn);
    return () => window.removeEventListener("mousemove", fn);
  }, [mx, my]);
  return (
    <motion.div
      style={{
        position: "fixed", left: sx, top: sy,
        width: 800, height: 800, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(37, 99, 235, 0.06) 0%, transparent 60%)",
        transform: "translate(-50%,-50%)",
        pointerEvents: "none", zIndex: 0, mixBlendMode: "screen",
      }}
    />
  );
}

/* ──────────────────────────  NAVBAR  ────────────────────────────── */

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <motion.nav initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}
      className={`navbar ${scrolled ? 'nav-scrolled' : ''}`}>
      <span className="logo">HS.</span>
      <div className="nav-links">
        {["About", "Experience", "Skills", "Projects"].map(l => (
          <a key={l} href={`#${l.toLowerCase()}`}>{l}</a>
        ))}
        <a href="#contact" className="nav-cta">Connect</a>
      </div>
    </motion.nav>
  );
}

/* ──────────────────────────  HERO  ──────────────────────────────── */

function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section id="home" className="hero-section">
      <div className="grid-bg" />
      <motion.div style={{ y, opacity }} className="hero-content">
        
        <motion.div variants={fadeUp} initial="hidden" animate="visible" className="badge">
          <span className="pulse-dot" /> Open to impactful opportunities
        </motion.div>

        <motion.h1 variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: 0.1 }}>
          <span style={{ display: "block", fontSize: "0.55em", fontWeight: 500, color: "var(--text-muted)", marginBottom: "12px", letterSpacing: "1px" }}>Hi, I'm Harshit Sharma.</span>
          Architecting Scalable Cloud Solutions & <br/><span className="text-gradient">Driving Business Impact.</span>
        </motion.h1>

        <motion.h2 variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: 0.2 }} className="hero-sub">
          Senior Full Stack Developer specializing in <strong className="text-white">Angular, .NET Core, & AWS</strong>
        </motion.h2>

        <motion.p variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: 0.3 }} className="hero-desc">
          I bridge the gap between complex technical execution and high-level business strategy. I engineer secure, high-performance web applications designed for scale and revenue generation.
        </motion.p>

        <motion.div variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: 0.4 }} className="hero-ctas">
          <a href="#projects" className="btn-primary">
            View Projects <FaArrowRight />
          </a>
          <a href="/resume.pdf" target="_blank" className="btn-secondary">
            <FaDownload /> Download Resume
          </a>
          <a href="#contact" className="btn-ghost">
            Contact Me
          </a>
        </motion.div>

      </motion.div>
    </section>
  );
}

/* ──────────────────────────  ABOUT  ─────────────────────────────── */

function About() {
  return (
    <section id="about" className="section-padding">
      <Reveal className="container">
        <motion.div variants={fadeUp} className="section-header">
          <div className="section-badge">Professional Summary</div>
          <h2 className="section-title">More than just code.<br />I build <span className="text-gradient">solutions.</span></h2>
        </motion.div>

        <div className="about-grid">
          <motion.div variants={fadeUp} className="about-text">
            <p className="large-p">
              I am a results-driven <strong>Full Stack Engineer & Business Analyst</strong> with a proven track record of architecting scalable systems that solve complex enterprise problems. 
            </p>
            <p>
              My dual expertise allows me to seamlessly translate BRDs/FRDs into robust microservices, cloud-native deployments, and intuitive UIs. Rather than simply taking orders, I analyze the "why" behind the software, guaranteeing the final product aligns perfectly with measurable business KPIs.
            </p>
            <div className="strengths-wrapper">
              <div className="strength">
                <span className="check">✓</span> <strong>Scalable Systems:</strong> Building microservices with .NET 8 that handle thousands of concurrent transactions.
              </div>
              <div className="strength">
                <span className="check">✓</span> <strong>Cloud Infrastructure:</strong> Architecting resilient AWS topologies (S3, SES, EC2) targeting 99.99% uptime.
              </div>
              <div className="strength">
                <span className="check">✓</span> <strong>Business Optimization:</strong> Identifying bottlenecks via data analysis to reduce operational latency.
              </div>
            </div>
          </motion.div>
          
          <motion.div variants={fadeUp} className="about-stats">
            <div className="stat-card">
              <h3>4+</h3>
              <span>Years of Enterprise Dev</span>
            </div>
            <div className="stat-card">
              <h3>Agile</h3>
              <span>Scrum & Sprint Master</span>
            </div>
            <div className="stat-card full-width">
              <h3>Outcome Driven</h3>
              <span>Committed to ROI & Performance</span>
            </div>
          </motion.div>
        </div>
      </Reveal>
    </section>
  );
}

/* ──────────────────────────  EXPERIENCE  ────────────────────────── */

function Experience() {
  return (
    <section id="experience" className="section-padding bg-darker">
      <Reveal className="container">
        <motion.div variants={fadeUp} className="section-header">
          <div className="section-badge">Career Journey</div>
          <h2 className="section-title">Where I've delivered <span className="text-gradient">value.</span></h2>
        </motion.div>

        <div className="timeline">
          {EXPERIENCE.map((exp, i) => (
            <motion.div key={exp.id} variants={fadeUp} className="timeline-item">
              <div className="timeline-dot" />
              <div className="timeline-content card-hover">
                <div className="exp-meta">
                  <h3>{exp.role}</h3>
                  <span className="exp-date">{exp.duration}</span>
                </div>
                <h4 className="exp-company">{exp.company}</h4>
                <div className="exp-focus">{exp.focus}</div>
                <ul className="exp-list">
                  {exp.points.map((pt, idx) => (
                    <li key={idx}>{pt}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

/* ──────────────────────────  SKILLS  ────────────────────────────── */

function Skills() {
  return (
    <section id="skills" className="section-padding">
      <Reveal className="container">
        <motion.div variants={fadeUp} className="section-header center">
          <div className="section-badge">Technical Arsenal</div>
          <h2 className="section-title">Technologies tailored for <span className="text-gradient">scale.</span></h2>
        </motion.div>

        <div className="skills-grid">
          {SKILLS.map((set, i) => (
            <motion.div key={i} variants={fadeUp} className="skill-card card-hover" style={{ '--hover-color': set.color }}>
              <div className="skill-icon" style={{ color: set.color, background: `${set.color}15` }}>
                {set.icon}
              </div>
              <h3>{set.category}</h3>
              <div className="skill-tags">
                {set.skills.map((skill, idx) => (
                  <span key={idx} className="skill-tag">{skill}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

/* ──────────────────────────  PROJECTS  ──────────────────────────── */

function Projects() {
  return (
    <section id="projects" className="section-padding bg-darker">
      <Reveal className="container">
        <motion.div variants={fadeUp} className="section-header center">
          <div className="section-badge">Featured Work</div>
          <h2 className="section-title">Engineering that drives <span className="text-gradient">results.</span></h2>
        </motion.div>

        <div className="projects-wrapper">
          {PROJECTS.map((proj, i) => (
            <motion.div key={proj.id} variants={fadeUp} className="project-card card-hover">
              <div className="project-header">
                <div>
                  <span className="project-category">{proj.category}</span>
                  <h3>{proj.title}</h3>
                </div>
                <div className="project-links">
                  <a href={proj.github} target="_blank" rel="noreferrer" title="View Source"><FaGithub size={20} /></a>
                  <a href={proj.live} target="_blank" rel="noreferrer" title="Live App"><FaExternalLinkAlt size={18} /></a>
                </div>
              </div>

              <div className="project-body">
                <div className="biz-context">
                  <strong>🔴 The Problem:</strong>
                  <p>{proj.problem}</p>
                </div>
                <div className="biz-context">
                  <strong>🟢 The Solution:</strong>
                  <p>{proj.solution}</p>
                </div>

                <div className="features-list">
                  <strong>Key Features:</strong>
                  <ul>
                    {proj.features.map(f => <li key={f}>{f}</li>)}
                  </ul>
                </div>

                <div className="impact-box">
                  <strong>📈 Measurable Impact:</strong>
                  {proj.impact.map(imp => (
                    <div key={imp} className="impact-item">✓ {imp}</div>
                  ))}
                </div>
              </div>

              <div className="project-footer">
                {proj.tech.map(tech => (
                  <span key={tech} className="tech-pill">{tech}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

/* ──────────────────────────  CONTACT  ───────────────────────────── */

function Contact() {
  return (
    <footer id="contact" className="section-padding contact-section">
      <div className="contact-blur" />
      <Reveal className="container relative">
        <motion.div variants={fadeUp} className="contact-card">
          <h2 className="h2-massive">Ready to scale?</h2>
          <p className="contact-desc">
            If you are looking for an engineer who writes clean code, understands business requirements natively, and obsessively focuses on performance—I'm ready for my next big challenge. Let's build something impactful together.
          </p>
          
          <div className="contact-actions">
            <a href="mailto:sharmaharshit69657@gmail.com" className="btn-primary large">
              <FaEnvelope /> Email Me Directly
            </a>
            <div className="social-pills">
              <a href="https://github.com/harshitsharma32145" target="_blank" rel="noreferrer" className="pill-link">
                <FaGithub /> GitHub Profile
              </a>
              <a href="https://www.linkedin.com/in/harshit-sharma-339b58177" target="_blank" rel="noreferrer" className="pill-link">
                <FaLinkedin /> LinkedIn Profile
              </a>
            </div>
          </div>
        </motion.div>
      </Reveal>
      <div className="copyright">
        © {new Date().getFullYear()} Harshit Sharma • Engineered for Excellence
      </div>
    </footer>
  );
}

/* ──────────────────────────  GLOBAL CSS  ─────────────────────────── */

const CSS = `
:root {
  --bg-main: #0B0F19;
  --bg-darker: #06090F;
  --bg-card: rgba(30, 41, 59, 0.4);
  --border-card: rgba(255, 255, 255, 0.08);
  
  --text-main: #F8FAFC;
  --text-muted: #94A3B8;
  --text-blue: #60A5FA;
  
  --primary: #3B82F6;
  --secondary: #8B5CF6;
  --accent: #06B6D4;
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body { 
  background: var(--bg-main); 
  color: var(--text-main); 
  font-family: 'Inter', sans-serif; 
  -webkit-font-smoothing: antialiased; 
  line-height: 1.6;
}

h1, h2, h3, h4, h5, .font-heading { font-family: 'Plus Jakarta Sans', sans-serif; }

/* UTILITIES */
.container { max-width: 1200px; margin: 0 auto; padding: 0 5%; position: relative; z-index: 10; }
.section-padding { padding: 140px 0; }
.bg-darker { background: var(--bg-darker); }
.text-white { color: white; }

.section-title { font-size: clamp(32px, 5vw, 48px); font-weight: 800; line-height: 1.1; margin-bottom: 24px; letter-spacing: -1px; }
.text-gradient { background: linear-gradient(135deg, var(--primary), var(--accent)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
.section-badge { display: inline-block; padding: 6px 16px; border-radius: 100px; background: rgba(59, 130, 246, 0.1); border: 1px solid rgba(59, 130, 246, 0.2); color: var(--text-blue); font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 16px; }
.section-header.center { text-align: center; display: flex; flex-direction: column; align-items: center; margin-bottom: 60px; }

/* BUTTONS */
.btn-primary { display: inline-flex; align-items: center; gap: 8px; padding: 14px 28px; background: var(--primary); color: white; font-weight: 600; text-decoration: none; border-radius: 12px; transition: all 0.2s; box-shadow: 0 4px 14px rgba(59, 130, 246, 0.4); }
.btn-primary:hover { background: #2563EB; transform: translateY(-2px); box-shadow: 0 6px 20px rgba(59, 130, 246, 0.6); }
.btn-primary.large { padding: 18px 36px; font-size: 18px; }

.btn-secondary { display: inline-flex; align-items: center; gap: 8px; padding: 14px 28px; background: var(--bg-card); color: white; font-weight: 600; text-decoration: none; border-radius: 12px; border: 1px solid var(--border-card); backdrop-filter: blur(10px); transition: all 0.2s; }
.btn-secondary:hover { background: rgba(255,255,255,0.08); transform: translateY(-2px); }

.btn-ghost { display: inline-flex; align-items: center; padding: 14px 24px; color: var(--text-muted); font-weight: 500; text-decoration: none; transition: all 0.2s; }
.btn-ghost:hover { color: white; }

/* CARDS */
.card-hover {
  background: var(--bg-card);
  border: 1px solid var(--border-card);
  border-radius: 20px;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}
.card-hover:hover {
  transform: translateY(-5px);
  border-color: rgba(255,255,255,0.15);
  box-shadow: 0 20px 40px rgba(0,0,0,0.4);
}

/* NAVBAR */
.navbar { position: fixed; top: 0; left: 0; right: 0; height: 80px; display: flex; align-items: center; justify-content: space-between; padding: 0 5%; z-index: 100; transition: all 0.3s ease; border-bottom: 1px solid transparent; }
.nav-scrolled { background: rgba(11, 15, 25, 0.85); backdrop-filter: blur(16px); border-bottom-color: rgba(255,255,255,0.05); height: 70px; }
.logo { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 24px; font-weight: 800; color: white; letter-spacing: -1px; }
.nav-links { display: flex; gap: 32px; align-items: center; }
.nav-links a { color: var(--text-muted); text-decoration: none; font-size: 14px; font-weight: 500; transition: color 0.2s; }
.nav-links a:hover { color: white; }
.nav-cta { padding: 8px 18px; border-radius: 8px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: white !important; }
.nav-cta:hover { background: white; color: black !important; }

/* HERO */
.hero-section { min-height: 100vh; display: flex; align-items: center; justify-content: center; position: relative; padding-top: 80px; }
.hero-content { text-align: center; max-width: 900px; position: relative; z-index: 10; padding: 0 20px; }
.badge { display: inline-flex; align-items: center; gap: 8px; padding: 6px 14px; border-radius: 100px; background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.2); color: #34D399; font-size: 13px; font-weight: 600; margin-bottom: 40px; }
.pulse-dot { width: 8px; height: 8px; border-radius: 50%; background: #34D399; box-shadow: 0 0 12px #34D399; animation: pulse 2s infinite; }
@keyframes pulse { 0% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(1.5); } 100% { opacity: 1; transform: scale(1); } }
.hero-section h1 { font-size: clamp(40px, 7vw, 76px); font-weight: 800; line-height: 1.05; letter-spacing: -2px; margin-bottom: 24px; }
.hero-sub { font-size: clamp(18px, 2.5vw, 24px); font-weight: 400; color: var(--text-muted); margin-bottom: 20px; }
.hero-desc { font-size: 18px; color: var(--text-muted); max-width: 700px; margin: 0 auto 40px; line-height: 1.7; }
.hero-ctas { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }
.grid-bg { position: absolute; inset: 0; background-image: linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px); background-size: 50px 50px; mask-image: radial-gradient(ellipse at center, black 40%, transparent 80%); pointer-events: none; }

/* ABOUT */
.about-grid { display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 60px; align-items: center; }
.large-p { font-size: 20px; font-weight: 500; color: white; margin-bottom: 24px; line-height: 1.6; }
.about-text p { color: var(--text-muted); font-size: 16px; margin-bottom: 30px; }
.strengths-wrapper { display: flex; flex-direction: column; gap: 14px; }
.strength { padding: 14px 20px; background: rgba(255,255,255,0.03); border-radius: 12px; border: 1px solid rgba(255,255,255,0.05); color: var(--text-muted); font-size: 15px; }
.strength strong { color: white; }
.check { color: #10B981; margin-right: 8px; font-weight: bold; }
.about-stats { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.stat-card { background: linear-gradient(145deg, rgba(30,41,59,0.5), rgba(15,23,42,0.5)); border: 1px solid var(--border-card); border-radius: 16px; padding: 30px; text-align: center; display: flex; flex-direction: column; justify-content: center; }
.stat-card h3 { font-size: 42px; font-weight: 800; background: linear-gradient(135deg, white, var(--text-muted)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 8px; }
.stat-card span { font-size: 13px; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1px; font-weight: 600; }
.full-width { grid-column: span 2; }

/* TIMELINE (EXPERIENCE) */
.timeline { border-left: 2px solid rgba(255,255,255,0.1); margin-left: 20px; padding-left: 40px; display: flex; flex-direction: column; gap: 40px; }
.timeline-item { position: relative; }
.timeline-dot { position: absolute; left: -49px; top: 0; width: 16px; height: 16px; border-radius: 50%; background: var(--primary); border: 4px solid var(--bg-darker); }
.timeline-content { padding: 32px; }
.exp-meta { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; flex-wrap: wrap; gap: 10px; }
.exp-meta h3 { font-size: 22px; color: white; }
.exp-date { background: rgba(255,255,255,0.08); padding: 4px 12px; border-radius: 100px; font-size: 13px; font-weight: 600; color: #cbd5e1; }
.exp-company { font-size: 16px; color: var(--primary); margin-bottom: 12px; font-weight: 600; letter-spacing: 0.5px; }
.exp-focus { display: inline-block; padding: 6px 12px; background: rgba(6, 182, 212, 0.1); border: 1px solid rgba(6, 182, 212, 0.2); border-radius: 6px; color: #67E8F9; font-size: 14px; margin-bottom: 20px; }
.exp-list { list-style: none; display: flex; flex-direction: column; gap: 12px; }
.exp-list li { color: var(--text-muted); font-size: 15px; position: relative; padding-left: 20px; }
.exp-list li::before { content: "→"; position: absolute; left: 0; color: var(--primary); font-family: sans-serif; }

/* SKILLS */
.skills-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 24px; }
.skill-card { padding: 32px; }
.skill-card:hover { border-color: var(--hover-color); box-shadow: 0 10px 30px rgba(0,0,0,0.5), inset 0 0 40px rgba(255,255,255,0.02); }
.skill-icon { width: 48px; height: 48px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 22px; margin-bottom: 24px; }
.skill-card h3 { font-size: 20px; margin-bottom: 20px; color: white; }
.skill-tags { display: flex; flex-wrap: wrap; gap: 10px; }
.skill-tag { padding: 6px 12px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.05); border-radius: 6px; font-size: 13px; color: #cbd5e1; font-weight: 500; }

/* PROJECTS */
.projects-wrapper { display: flex; flex-direction: column; gap: 40px; }
.project-card { padding: 40px; display: flex; flex-direction: column; gap: 24px; }
.project-header { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 1px solid rgba(255,255,255,0.06); padding-bottom: 20px; }
.project-category { color: var(--accent); font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; display: block; margin-bottom: 8px; }
.project-header h3 { font-size: 28px; color: white; }
.project-links { display: flex; gap: 16px; }
.project-links a { color: var(--text-muted); transition: color 0.2s; }
.project-links a:hover { color: white; }

.project-body { display: grid; grid-template-columns: 1fr 1fr; gap: 30px; }
.biz-context { background: rgba(0,0,0,0.2); padding: 20px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.03); }
.biz-context strong { display: block; color: white; margin-bottom: 8px; font-size: 15px; }
.biz-context p { color: var(--text-muted); font-size: 14px; line-height: 1.6; }

.features-list strong, .impact-box strong { color: white; display: block; margin-bottom: 12px; font-size: 15px; }
.features-list ul { list-style: disc inside; color: var(--text-muted); font-size: 14px; line-height: 1.8; }
.impact-item { padding: 12px; background: rgba(16, 185, 129, 0.05); border: 1px solid rgba(16, 185, 129, 0.15); border-radius: 8px; color: #34D399; font-size: 14px; font-weight: 500; margin-bottom: 8px; }

.project-footer { display: flex; gap: 10px; flex-wrap: wrap; padding-top: 10px; border-top: 1px solid rgba(255,255,255,0.06); }
.tech-pill { padding: 6px 14px; background: rgba(59, 130, 246, 0.1); border-radius: 100px; color: #93C5FD; font-size: 12px; font-weight: 600; }

/* CONTACT */
.contact-section { position: relative; text-align: center; }
.contact-blur { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 60vw; height: 60vh; background: radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 60%); pointer-events: none; z-index: 0; }
.contact-card { padding: 80px 40px; background: linear-gradient(180deg, rgba(30,41,59,0.3) 0%, rgba(15,23,42,0.8) 100%); border: 1px solid rgba(255,255,255,0.08); border-radius: 32px; backdrop-filter: blur(20px); position: relative; z-index: 10; max-width: 800px; margin: 0 auto; box-shadow: 0 30px 60px rgba(0,0,0,0.5); }
.h2-massive { font-size: clamp(40px, 8vw, 64px); font-weight: 800; color: white; letter-spacing: -2px; margin-bottom: 24px; }
.contact-desc { font-size: 18px; color: var(--text-muted); max-width: 600px; margin: 0 auto 40px; line-height: 1.7; }
.contact-actions { display: flex; flex-direction: column; align-items: center; gap: 24px; }
.social-pills { display: flex; gap: 16px; flex-wrap: wrap; justify-content: center; }
.pill-link { display: inline-flex; align-items: center; gap: 8px; padding: 10px 20px; background: rgba(255,255,255,0.05); color: white; text-decoration: none; border-radius: 100px; border: 1px solid rgba(255,255,255,0.1); transition: all 0.2s; font-size: 14px; font-weight: 500; }
.pill-link:hover { background: white; color: black; }
.copyright { text-align: center; margin-top: 60px; color: rgba(255,255,255,0.3); font-size: 14px; position: relative; z-index: 10; }

/* MEDIA QUERIES */
@media (max-width: 900px) {
  .about-grid { grid-template-columns: 1fr; gap: 40px; }
  .project-body { grid-template-columns: 1fr; }
  .nav-links { display: none; }
}
@media (max-width: 600px) {
  .timeline { padding-left: 20px; margin-left: 10px; }
  .timeline-dot { left: -29px; }
  .timeline-content, .project-card, .contact-card { padding: 24px; }
}
`;

/* ──────────────────────────  APP  ───────────────────────────────── */

export default function Portfolio() {
  return (
    <>
      <style>{CSS}</style>
      <div className="app-container" style={{ position: "relative", zIndex: 1, overflowX: "hidden" }}>
        <CursorGlow />
        <Navbar />
        <main>
          <Hero />
          <About />
          <Experience />
          <Skills />
          <Projects />
        </main>
        <Contact />
      </div>
    </>
  );
}
