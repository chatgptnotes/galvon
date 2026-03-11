import { useState, useEffect } from 'react'
import { Zap, Droplets, Factory, Activity, Shield, Globe, ArrowRight, Building2, Flame, FlaskConical, Waves, CheckCircle, Menu, X, Cpu, Network, Lock, BarChart2, Layers } from 'lucide-react'

const VERSION = '1.0'
const BUILD_DATE = 'March 2026'
const GEMINI_KEY = import.meta.env.VITE_GEMINI_API_KEY

async function fetchGeminiText(prompt: string, fallback: string): Promise<string> {
  if (!GEMINI_KEY) return fallback
  try {
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_KEY}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }) })
    const data = await res.json()
    return data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || fallback
  } catch { return fallback }
}

function VoidPhoenix() {
  return (
    <svg viewBox="-140 -100 280 280" width="100%" height="100%" style={{ overflow: 'visible', maxWidth: 520 }}>
      <defs>
        <radialGradient id="aura" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#a855f7" stopOpacity="0.5" />
          <stop offset="60%" stopColor="#7c3aed" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#4c1d95" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#e0aaff" />
          <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
        </radialGradient>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="softGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <linearGradient id="wingL" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.4" />
        </linearGradient>
        <linearGradient id="wingR" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.4" />
        </linearGradient>
        <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#e0aaff" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>
        <linearGradient id="tailGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#4c1d95" stopOpacity="0.2" />
        </linearGradient>
      </defs>

      {/* Cosmic aura behind phoenix */}
      <ellipse cx="0" cy="30" rx="120" ry="90" fill="url(#aura)" />
      <ellipse cx="0" cy="-10" rx="60" ry="50" fill="url(#coreGlow)" opacity="0.3" />

      {/* Tail feathers — long sweeping down */}
      <path d="M-8,45 Q-30,90 -20,140 Q-10,155 0,145 Q10,155 20,140 Q30,90 8,45 Z" fill="url(#tailGrad)" filter="url(#softGlow)" />
      <path d="M-15,50 Q-60,100 -50,155 Q-40,165 -30,150 Q-20,130 -10,100 L-8,45 Z" fill="#4c1d95" opacity="0.5" filter="url(#softGlow)" />
      <path d="M15,50 Q60,100 50,155 Q40,165 30,150 Q20,130 10,100 L8,45 Z" fill="#4c1d95" opacity="0.5" filter="url(#softGlow)" />
      {/* tail feather lines */}
      {[-6,-2,2,6].map(x => (
        <line key={x} x1={x} y1="50" x2={x * 1.5} y2="140" stroke="#a855f7" strokeWidth="0.8" opacity="0.5" />
      ))}

      {/* Left wing — upper sweep */}
      <path d="M-18,-20 Q-65,-55 -110,-80 Q-90,-45 -55,-15 Q-35,-5 -20,5 Z" fill="url(#wingL)" filter="url(#glow)" opacity="0.9" />
      {/* Left wing — lower sweep */}
      <path d="M-22,15 Q-75,10 -120,35 Q-90,25 -50,18 Q-30,15 -18,10 Z" fill="#06b6d4" opacity="0.6" filter="url(#softGlow)" />
      {/* Left wing — mid feathers */}
      <path d="M-20,-5 Q-85,-15 -125,-5 Q-95,5 -28,8 Z" fill="#a855f7" opacity="0.5" />
      <path d="M-18,-13 Q-70,-35 -100,-55 Q-75,-25 -22,-2 Z" fill="#c084fc" opacity="0.4" />

      {/* Right wing — upper sweep */}
      <path d="M18,-20 Q65,-55 110,-80 Q90,-45 55,-15 Q35,-5 20,5 Z" fill="url(#wingR)" filter="url(#glow)" opacity="0.9" />
      {/* Right wing — lower sweep */}
      <path d="M22,15 Q75,10 120,35 Q90,25 50,18 Q30,15 18,10 Z" fill="#06b6d4" opacity="0.6" filter="url(#softGlow)" />
      {/* Right wing — mid feathers */}
      <path d="M20,-5 Q85,-15 125,-5 Q95,5 28,8 Z" fill="#a855f7" opacity="0.5" />
      <path d="M18,-13 Q70,-35 100,-55 Q75,-25 22,-2 Z" fill="#c084fc" opacity="0.4" />

      {/* Body */}
      <ellipse cx="0" cy="15" rx="16" ry="38" fill="url(#bodyGrad)" filter="url(#glow)" />

      {/* Head */}
      <circle cx="0" cy="-28" r="16" fill="#a855f7" filter="url(#glow)" />
      <circle cx="0" cy="-28" r="10" fill="#c084fc" />

      {/* Crest feathers */}
      <path d="M-4,-42 Q-12,-65 -6,-85 Q0,-75 0,-55 Z" fill="#06b6d4" filter="url(#glow)" />
      <path d="M0,-44 Q0,-72 0,-92 Q3,-78 2,-58 Z" fill="#e0aaff" filter="url(#glow)" />
      <path d="M4,-42 Q12,-65 6,-85 Q0,-75 0,-55 Z" fill="#06b6d4" filter="url(#glow)" />

      {/* Eye */}
      <circle cx="5" cy="-29" r="5" fill="#e0f2fe" />
      <circle cx="6" cy="-29" r="2.5" fill="#0284c7" />
      <circle cx="7" cy="-30" r="1" fill="white" />

      {/* Beak */}
      <path d="M8,-25 L18,-22 L10,-19 Z" fill="#fbbf24" />

      {/* Spark particles */}
      {[[-105,30], [105,30], [-90,-65], [90,-65], [-55,-75], [55,-75], [-35,60], [35,60], [-115,5], [115,5]].map(([x,y], i) => (
        <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 3 : i % 2 === 0 ? 2 : 1.5} fill={i % 2 === 0 ? '#06b6d4' : '#c084fc'} filter="url(#glow)" opacity={0.7 + Math.random() * 0.3} />
      ))}

      {/* Circuit lines on wings */}
      <polyline points="-35,0 -60,-10 -80,-8 -100,-20" fill="none" stroke="#06b6d4" strokeWidth="1" opacity="0.4" strokeDasharray="3,3" />
      <polyline points="35,0 60,-10 80,-8 100,-20" fill="none" stroke="#06b6d4" strokeWidth="1" opacity="0.4" strokeDasharray="3,3" />
    </svg>
  )
}

function WaveDivider({ flip = false, from = '#030014', to = '#0d0428' }: { flip?: boolean; from?: string; to?: string }) {
  return (
    <div style={{ background: to, lineHeight: 0 }} className={flip ? 'rotate-180' : ''}>
      <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" width="100%" height="80">
        <path d="M0,40 Q360,80 720,40 Q1080,0 1440,40 L1440,0 L0,0 Z" fill={from} />
      </svg>
    </div>
  )
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [heroTag, setHeroTag] = useState('Rise above complexity. Command every industrial system.')

  useEffect(() => {
    fetchGeminiText('Write a dramatic 10-word tagline for GALVON, an Industrial Intelligence platform. Like a phoenix rising from void. Bold, powerful, no quotes.', 'Rise above complexity. Command every industrial system.').then(setHeroTag)
  }, [])

  const products = [
    { name: 'Ampris', sub: 'Power and Electrical', icon: Zap, color: '#06b6d4', glow: '0 0 30px rgba(6,182,212,0.4)', border: 'rgba(6,182,212,0.4)', desc: 'SCADA for substations, energy management, and power utilities.' },
    { name: 'FlowNexus', sub: 'Flow and Liquid', icon: Droplets, color: '#38bdf8', glow: '0 0 30px rgba(56,189,248,0.4)', border: 'rgba(56,189,248,0.3)', desc: 'Pipelines, water treatment, and fluid process control systems.' },
    { name: 'NexaProc', sub: 'Factory and Process', icon: Factory, color: '#f59e0b', glow: '0 0 30px rgba(245,158,11,0.4)', border: 'rgba(245,158,11,0.3)', desc: 'Manufacturing plants, batch control, and process automation.' },
  ]

  const features = [
    { icon: Activity, title: 'Real-time SCADA', desc: 'Live telemetry from every sensor, PLC, and RTU across your entire operation.' },
    { icon: Shield, title: 'Cybersecurity Built-in', desc: 'IEC 62443 compliant. Role-based access. End-to-end encryption.' },
    { icon: Cpu, title: 'AI Predictive Engine', desc: 'Machine learning identifies equipment failure days before it happens.' },
    { icon: Network, title: 'Multi-site Unified', desc: 'Manage 1 plant or 100 from a single command center dashboard.' },
    { icon: Lock, title: 'Redundant Architecture', desc: '99.9% uptime with hot-standby failover and offline edge processing.' },
    { icon: BarChart2, title: 'Advanced Analytics', desc: 'KPI dashboards, OEE tracking, energy reports, and executive summaries.' },
  ]

  const stats = [
    { val: '3', label: 'SCADA Verticals' },
    { val: '100+', label: 'Plants Deployed' },
    { val: '99.9%', label: 'Uptime SLA' },
    { val: '10K+', label: 'Tags Supported' },
  ]

  const industries = [
    { icon: Zap, label: 'Power Utilities' },
    { icon: Flame, label: 'Oil and Gas' },
    { icon: Waves, label: 'Water Treatment' },
    { icon: Factory, label: 'Manufacturing' },
    { icon: FlaskConical, label: 'Pharma' },
    { icon: Building2, label: 'Food and Beverage' },
    { icon: Globe, label: 'Smart Cities' },
    { icon: Layers, label: 'Mining' },
  ]

  const process = [
    { n: '01', title: 'Connect', desc: 'Plug into existing PLCs, RTUs, DCS, sensors via OPC-UA, Modbus, MQTT' },
    { n: '02', title: 'Visualize', desc: 'Auto-generate live SCADA dashboards from your field device topology' },
    { n: '03', title: 'Analyze', desc: 'AI engine processes historical and real-time data for insights and alerts' },
    { n: '04', title: 'Optimize', desc: 'Close the loop — automate responses, reduce downtime, improve OEE' },
  ]

  const BG = '#030014'
  const BG2 = '#0a0228'
  const PURPLE = '#7c3aed'
  const CYAN = '#06b6d4'

  return (
    <div style={{ background: BG, color: 'white', fontFamily: "'Inter', system-ui, sans-serif" }} className="min-h-screen">

      {/* NAV */}
      <nav style={{ background: 'rgba(3,0,20,0.85)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(124,58,237,0.2)' }} className="fixed top-0 w-full z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div style={{ background: `linear-gradient(135deg, ${PURPLE}, ${CYAN})`, boxShadow: `0 0 20px rgba(124,58,237,0.5)` }} className="w-9 h-9 rounded-xl flex items-center justify-center">
              <Zap size={18} className="text-white" />
            </div>
            <span style={{ letterSpacing: '6px', fontWeight: 900, fontSize: 20 }}>GALVON</span>
          </div>
          <div className="hidden md:flex items-center gap-8" style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)' }}>
            {['Products', 'Features', 'Industries', 'Process'].map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} style={{ transition: 'color .2s' }} onMouseOver={e => (e.currentTarget.style.color = CYAN)} onMouseOut={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}>{l}</a>
            ))}
            <a href="#contact" style={{ background: `linear-gradient(135deg, ${PURPLE}, ${CYAN})`, padding: '8px 20px', borderRadius: 10, fontWeight: 700, color: 'white', boxShadow: `0 0 20px rgba(124,58,237,0.4)` }}>Request Demo</a>
          </div>
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={22} /> : <Menu size={22} />}</button>
        </div>
        {menuOpen && (
          <div style={{ borderTop: '1px solid rgba(124,58,237,0.2)', background: 'rgba(3,0,20,0.95)' }} className="md:hidden px-6 py-4 flex flex-col gap-4">
            {['Products', 'Features', 'Industries', 'Process', 'Contact'].map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setMenuOpen(false)} style={{ color: 'rgba(255,255,255,0.7)', fontSize: 15 }}>{l}</a>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section style={{ minHeight: '100vh', position: 'relative', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        {/* Background orbs */}
        <div style={{ position: 'absolute', top: '10%', left: '5%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,58,237,0.25) 0%, transparent 70%)', filter: 'blur(40px)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '20%', right: '5%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(6,182,212,0.2) 0%, transparent 70%)', filter: 'blur(40px)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '10%', left: '30%', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(168,85,247,0.15) 0%, transparent 70%)', filter: 'blur(50px)', pointerEvents: 'none' }} />

        {/* Star particles */}
        {[...Array(30)].map((_, i) => (
          <div key={i} style={{ position: 'absolute', left: `${(i * 37 + 13) % 100}%`, top: `${(i * 53 + 7) % 100}%`, width: i % 4 === 0 ? 3 : i % 3 === 0 ? 2 : 1, height: i % 4 === 0 ? 3 : i % 3 === 0 ? 2 : 1, borderRadius: '50%', background: i % 2 === 0 ? CYAN : '#c084fc', opacity: 0.3 + (i % 5) * 0.1, pointerEvents: 'none' }} />
        ))}

        {/* Grid lines */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(rgba(124,58,237,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.05) 1px, transparent 1px)`, backgroundSize: '60px 60px', pointerEvents: 'none' }} />

        <div className="max-w-7xl mx-auto px-6 w-full pt-24 pb-16" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'center' }}>
          {/* Left text */}
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.4)', borderRadius: 100, padding: '6px 16px', fontSize: 13, color: '#c084fc', marginBottom: 28, fontWeight: 600 }}>
              <Zap size={13} /> Industrial Intelligence Platform
            </div>
            <h1 style={{ fontSize: 'clamp(48px, 6vw, 80px)', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-1px', marginBottom: 24 }}>
              <span>GAL</span><span style={{ background: `linear-gradient(135deg, ${PURPLE}, ${CYAN})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>VON</span>
              <br />
              <span style={{ fontSize: '55%', color: 'rgba(255,255,255,0.85)', fontWeight: 700, letterSpacing: 0 }}>Rise. Connect. Control.</span>
            </h1>
            <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, marginBottom: 36, maxWidth: 480 }}>{heroTag}</p>

            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <a href="#products" style={{ display: 'flex', alignItems: 'center', gap: 8, background: `linear-gradient(135deg, ${PURPLE}, ${CYAN})`, padding: '14px 28px', borderRadius: 12, fontWeight: 700, fontSize: 15, boxShadow: `0 0 30px rgba(124,58,237,0.4)`, color: 'white', textDecoration: 'none' }}>
                Explore Suite <ArrowRight size={18} />
              </a>
              <a href="#contact" style={{ display: 'flex', alignItems: 'center', gap: 8, border: '1px solid rgba(124,58,237,0.4)', padding: '14px 28px', borderRadius: 12, fontWeight: 600, fontSize: 15, color: 'rgba(255,255,255,0.8)', textDecoration: 'none' }}>
                Request Demo
              </a>
            </div>

            {/* Mini stats */}
            <div style={{ display: 'flex', gap: 32, marginTop: 48 }}>
              {stats.slice(0, 3).map(s => (
                <div key={s.label}>
                  <div style={{ fontSize: 28, fontWeight: 900, background: `linear-gradient(135deg, ${CYAN}, #c084fc)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{s.val}</div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right phoenix */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
            {/* Glow ring behind phoenix */}
            <div style={{ position: 'absolute', width: 380, height: 380, borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,58,237,0.3) 0%, transparent 70%)', filter: 'blur(30px)' }} />
            <div style={{ position: 'relative', zIndex: 2, width: '100%', maxWidth: 480 }}>
              <VoidPhoenix />
            </div>
          </div>
        </div>
      </section>

      <WaveDivider from={BG} to={BG2} />

      {/* PRODUCTS */}
      <section id="products" style={{ background: BG2, padding: '80px 0' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <div style={{ display: 'inline-block', background: 'rgba(6,182,212,0.1)', border: '1px solid rgba(6,182,212,0.3)', borderRadius: 100, padding: '5px 18px', fontSize: 12, color: CYAN, fontWeight: 700, letterSpacing: 3, marginBottom: 16 }}>THE SUITE</div>
            <h2 style={{ fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 900 }}>Three Platforms. One Ecosystem.</h2>
            <p style={{ color: 'rgba(255,255,255,0.5)', marginTop: 12, fontSize: 17 }}>Specialized SCADA for every industrial vertical, unified under Galvon.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
            {products.map(p => (
              <div key={p.name} style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${p.border}`, borderRadius: 20, padding: 32, backdropFilter: 'blur(10px)', boxShadow: p.glow, transition: 'transform .3s', cursor: 'pointer' }}
                onMouseOver={e => (e.currentTarget.style.transform = 'translateY(-6px)')}
                onMouseOut={e => (e.currentTarget.style.transform = 'translateY(0)')}>
                <div style={{ width: 56, height: 56, borderRadius: 16, background: `${p.color}20`, border: `1px solid ${p.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                  <p.icon size={26} style={{ color: p.color }} />
                </div>
                <div style={{ fontSize: 11, color: p.color, fontWeight: 700, letterSpacing: 3, marginBottom: 6 }}>{p.sub.toUpperCase()}</div>
                <h3 style={{ fontSize: 26, fontWeight: 900, marginBottom: 12 }}>{p.name}</h3>
                <p style={{ color: 'rgba(255,255,255,0.55)', lineHeight: 1.6, marginBottom: 20 }}>{p.desc}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: p.color, fontSize: 14, fontWeight: 600 }}>Learn more <ArrowRight size={15} /></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WaveDivider from={BG2} to={BG} flip />

      {/* FEATURES */}
      <section id="features" style={{ background: BG, padding: '80px 0' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <div style={{ display: 'inline-block', background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.3)', borderRadius: 100, padding: '5px 18px', fontSize: 12, color: '#c084fc', fontWeight: 700, letterSpacing: 3, marginBottom: 16 }}>PLATFORM CAPABILITIES</div>
            <h2 style={{ fontSize: 'clamp(30px, 4vw, 48px)', fontWeight: 900 }}>Built for industrial-grade operations</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
            {features.map((f, i) => (
              <div key={f.title} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(124,58,237,0.15)', borderRadius: 16, padding: 28, transition: 'border-color .3s, background .3s' }}
                onMouseOver={e => { e.currentTarget.style.borderColor = 'rgba(124,58,237,0.5)'; e.currentTarget.style.background = 'rgba(124,58,237,0.06)' }}
                onMouseOut={e => { e.currentTarget.style.borderColor = 'rgba(124,58,237,0.15)'; e.currentTarget.style.background = 'rgba(255,255,255,0.02)' }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: i % 2 === 0 ? 'rgba(124,58,237,0.15)' : 'rgba(6,182,212,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                  <f.icon size={22} style={{ color: i % 2 === 0 ? '#c084fc' : CYAN }} />
                </div>
                <h3 style={{ fontWeight: 700, fontSize: 17, marginBottom: 8 }}>{f.title}</h3>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14, lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WaveDivider from={BG} to={BG2} />

      {/* HOW IT WORKS */}
      <section id="process" style={{ background: BG2, padding: '80px 0' }}>
        <div className="max-w-6xl mx-auto px-6">
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <div style={{ display: 'inline-block', background: 'rgba(6,182,212,0.08)', border: '1px solid rgba(6,182,212,0.3)', borderRadius: 100, padding: '5px 18px', fontSize: 12, color: CYAN, fontWeight: 700, letterSpacing: 3, marginBottom: 16 }}>HOW IT WORKS</div>
            <h2 style={{ fontSize: 'clamp(30px, 4vw, 48px)', fontWeight: 900 }}>From zero to full control in 4 steps</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 0, position: 'relative' }}>
            {/* Connector line */}
            <div style={{ position: 'absolute', top: 36, left: '12.5%', right: '12.5%', height: 2, background: `linear-gradient(90deg, ${PURPLE}, ${CYAN})`, opacity: 0.3, zIndex: 0 }} className="hidden md:block" />
            {process.map((p, i) => (
              <div key={p.n} style={{ textAlign: 'center', padding: '0 16px', position: 'relative', zIndex: 1 }}>
                <div style={{ width: 72, height: 72, borderRadius: '50%', background: `linear-gradient(135deg, rgba(124,58,237,0.3), rgba(6,182,212,0.3))`, border: `2px solid ${i % 2 === 0 ? PURPLE : CYAN}`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: 18, fontWeight: 900, color: i % 2 === 0 ? '#c084fc' : CYAN, boxShadow: `0 0 20px ${i % 2 === 0 ? 'rgba(124,58,237,0.3)' : 'rgba(6,182,212,0.3)'}` }}>
                  {p.n}
                </div>
                <h3 style={{ fontWeight: 800, fontSize: 18, marginBottom: 10 }}>{p.title}</h3>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14, lineHeight: 1.6 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WaveDivider from={BG2} to={BG} flip />

      {/* INDUSTRIES */}
      <section id="industries" style={{ background: BG, padding: '80px 0' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div style={{ textAlign: 'center', marginBottom: 50 }}>
            <h2 style={{ fontSize: 'clamp(30px, 4vw, 48px)', fontWeight: 900, marginBottom: 12 }}>Industries We Power</h2>
            <p style={{ color: 'rgba(255,255,255,0.5)' }}>Galvon adapts to every industrial environment on the planet.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 16 }}>
            {industries.map((ind, i) => (
              <div key={ind.label} style={{ border: '1px solid rgba(124,58,237,0.2)', borderRadius: 16, padding: '24px 16px', textAlign: 'center', background: 'rgba(255,255,255,0.02)', transition: 'all .3s', cursor: 'default' }}
                onMouseOver={e => { e.currentTarget.style.borderColor = CYAN; e.currentTarget.style.background = 'rgba(6,182,212,0.07)'; e.currentTarget.style.transform = 'scale(1.04)' }}
                onMouseOut={e => { e.currentTarget.style.borderColor = 'rgba(124,58,237,0.2)'; e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; e.currentTarget.style.transform = 'scale(1)' }}>
                <ind.icon size={30} style={{ color: i % 2 === 0 ? CYAN : '#c084fc', marginBottom: 10 }} />
                <div style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.75)' }}>{ind.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WaveDivider from={BG} to='#0d0428' />

      {/* CTA */}
      <section id="contact" style={{ background: '#0d0428', padding: '100px 24px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(124,58,237,0.2) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 680, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <CheckCircle size={48} style={{ color: CYAN, margin: '0 auto 24px' }} />
          <h2 style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 900, lineHeight: 1.1, marginBottom: 20 }}>
            Ready for the <span style={{ background: `linear-gradient(135deg, ${PURPLE}, ${CYAN})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Galvon Effect?</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 18, lineHeight: 1.7, marginBottom: 40 }}>Join the plants and utilities that have transformed their operations with the Galvon Industrial Intelligence Suite.</p>
          <a href="mailto:hello@galvon.com" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: `linear-gradient(135deg, ${PURPLE}, ${CYAN})`, padding: '16px 36px', borderRadius: 14, fontWeight: 800, fontSize: 17, color: 'white', boxShadow: `0 0 40px rgba(124,58,237,0.5)`, textDecoration: 'none' }}>
            Request a Demo <ArrowRight size={20} />
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: '#030014', borderTop: '1px solid rgba(124,58,237,0.15)', padding: '40px 24px' }}>
        <div className="max-w-7xl mx-auto" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ background: `linear-gradient(135deg, ${PURPLE}, ${CYAN})`, width: 32, height: 32, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Zap size={16} color="white" />
            </div>
            <span style={{ fontWeight: 900, letterSpacing: 5, fontSize: 18 }}>GALVON</span>
          </div>
          <div style={{ display: 'flex', gap: 24, fontSize: 14, color: 'rgba(255,255,255,0.4)' }}>
            {['Ampris', 'FlowNexus', 'NexaProc'].map(n => <span key={n}>{n}</span>)}
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13 }}>drmhope.com | A Bettroi Product</div>
            <div style={{ color: 'rgba(255,255,255,0.25)', fontSize: 11, marginTop: 4 }}>v{VERSION} | {BUILD_DATE} | galvon</div>
          </div>
        </div>
      </footer>
    </div>
  )
}
