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

// ── GALVON LOGO — Void Phoenix colour theme ──────────────────────────────────
function GalvonLogo({ size = 'full' }: { size?: 'full' | 'compact' }) {
  if (size === 'compact') {
    return (
      <svg viewBox="0 0 44 44" width="36" height="36" style={{ overflow: 'visible' }}>
        <defs>
          <linearGradient id="lgIcon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7c3aed" /><stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
          <filter id="lgGlow"><feGaussianBlur stdDeviation="2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        </defs>
        <polygon points="22,2 40,12 40,32 22,42 4,32 4,12" fill="rgba(124,58,237,0.15)" stroke="url(#lgIcon)" strokeWidth="1.5"/>
        {/* circuit nodes */}
        {[[22,2],[40,12],[40,32],[22,42],[4,32],[4,12]].map(([x,y],i)=>(
          <circle key={i} cx={x} cy={y} r="2.5" fill="#06b6d4" filter="url(#lgGlow)"/>
        ))}
        {/* lightning bolt */}
        <path d="M24 11 L18 22 L22 22 L20 33 L26 21 L22 21 Z" fill="url(#lgIcon)" filter="url(#lgGlow)"/>
        <circle cx="22" cy="22" r="3.5" fill="#7c3aed" stroke="#06b6d4" strokeWidth="1"/>
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 600 220" width="100%" style={{ maxWidth: 560, display: 'block' }}>
      <defs>
        <linearGradient id="lgBolt" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#06b6d4"/><stop offset="100%" stopColor="#7c3aed"/>
        </linearGradient>
        <linearGradient id="lgLine" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#7c3aed"/><stop offset="100%" stopColor="#06b6d4"/>
        </linearGradient>
        <filter id="lgGlowF"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        <filter id="lgSoft"><feGaussianBlur stdDeviation="2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>

      {/* Hexagon icon */}
      <polygon points="75,8 135,42 135,108 75,142 15,108 15,42" fill="rgba(124,58,237,0.12)" stroke="#7c3aed" strokeWidth="1.5" opacity="0.8"/>
      <polygon points="75,20 118,44 118,93 75,118 32,93 32,44" fill="rgba(6,182,212,0.07)" stroke="#06b6d4" strokeWidth="1" opacity="0.5"/>
      {/* circuit nodes */}
      {[[75,8],[135,42],[135,108],[75,142],[15,108],[15,42]].map(([x,y],i)=>(
        <circle key={i} cx={x} cy={y} r="4" fill="#06b6d4" filter="url(#lgGlowF)" opacity="0.9"/>
      ))}
      {/* connecting lines */}
      <polyline points="75,8 135,42 135,108 75,142 15,108 15,42 75,8" fill="none" stroke="#7c3aed" strokeWidth="1" opacity="0.4"/>
      {/* lightning bolt */}
      <path d="M84 38 L62 75 L76 75 L66 112 L90 73 L74 73 Z" fill="url(#lgBolt)" filter="url(#lgGlowF)"/>
      <circle cx="75" cy="75" r="6" fill="#4c1d95" stroke="#06b6d4" strokeWidth="1.5"/>

      {/* Wordmark GALVON */}
      <text x="160" y="92" fontFamily="'Arial Black', Arial, sans-serif" fontWeight="900" fontSize="68" letterSpacing="12" fill="white" dominantBaseline="middle">GALVON</text>

      {/* Tagline */}
      <text x="163" y="132" fontFamily="Arial, sans-serif" fontWeight="400" fontSize="14" letterSpacing="5" fill="#06b6d4" dominantBaseline="middle">INDUSTRIAL INTELLIGENCE</text>

      {/* Accent line */}
      <rect x="163" y="147" width="390" height="1.5" rx="1" fill="url(#lgLine)" opacity="0.6"/>

      {/* Product badges */}
      <rect x="163" y="163" width="78" height="22" rx="11" fill="rgba(6,182,212,0.12)" stroke="#06b6d4" strokeWidth="1"/>
      <text x="202" y="174" fontFamily="Arial, sans-serif" fontSize="10" fontWeight="700" fill="#67e8f9" textAnchor="middle" dominantBaseline="middle" letterSpacing="1">AMPRIS</text>

      <rect x="250" y="163" width="92" height="22" rx="11" fill="rgba(56,189,248,0.1)" stroke="#38bdf8" strokeWidth="1"/>
      <text x="296" y="174" fontFamily="Arial, sans-serif" fontSize="10" fontWeight="700" fill="#7dd3fc" textAnchor="middle" dominantBaseline="middle" letterSpacing="1">FLOWNEXUS</text>

      <rect x="351" y="163" width="90" height="22" rx="11" fill="rgba(245,158,11,0.1)" stroke="#f59e0b" strokeWidth="1"/>
      <text x="396" y="174" fontFamily="Arial, sans-serif" fontSize="10" fontWeight="700" fill="#fcd34d" textAnchor="middle" dominantBaseline="middle" letterSpacing="1">NEXAPROC</text>
    </svg>
  )
}

function GalvonDashboard() {
  const PURPLE = '#7c3aed'; const CYAN = '#06b6d4'
  const nodes = [[80,200],[160,160],[240,200],[320,160],[400,200],[240,130]]
  const edges = [[0,1],[1,2],[2,3],[3,4],[1,5],[3,5],[5,2]]
  const barH = [68,52,80,44,72,60,88]
  const lineY = [110,100,95,105,88,92,80,86,75,82,70]
  return (
    <div style={{position:'relative',width:'100%',maxWidth:520}}>
      {/* Glow backdrop */}
      <div style={{position:'absolute',inset:0,borderRadius:20,background:'radial-gradient(ellipse at 60% 40%, rgba(124,58,237,0.25) 0%, transparent 70%)',filter:'blur(30px)',pointerEvents:'none'}}/>
      <svg viewBox="0 0 520 400" style={{width:'100%',display:'block',filter:'drop-shadow(0 0 40px rgba(124,58,237,0.3))'}}>
        {/* Panel bg */}
        <rect x="0" y="0" width="520" height="400" rx="18" fill="rgba(8,3,32,0.95)" stroke="rgba(124,58,237,0.5)" strokeWidth="1.5"/>
        {/* Header */}
        <rect x="0" y="0" width="520" height="46" rx="18" fill="rgba(124,58,237,0.18)"/>
        <rect x="0" y="30" width="520" height="16" fill="rgba(124,58,237,0.18)"/>
        <circle cx="20" cy="23" r="5" fill="#ef4444" opacity="0.85"/>
        <circle cx="36" cy="23" r="5" fill="#f59e0b" opacity="0.85"/>
        <circle cx="52" cy="23" r="5" fill="#22c55e" opacity="0.85"/>
        <text x="74" y="23" fontFamily="monospace" fontSize="12" fill="rgba(255,255,255,0.75)" dominantBaseline="middle">GALVON · Unified Control Center</text>
        <circle cx="458" cy="23" r="4" fill="#22c55e"/>
        <text x="468" y="23" fontFamily="monospace" fontSize="11" fill="#22c55e" dominantBaseline="middle">LIVE</text>

        {/* 3 Product status cards */}
        {[
          {x:12, label:'AMPRIS', sub:'Power SCADA', val:'98.2%', unit:'Uptime', color:'#06b6d4', status:'ONLINE'},
          {x:183, label:'FLOWNEXUS', sub:'Flow SCADA', val:'3.41 MW', unit:'Throughput', color:'#38bdf8', status:'ONLINE'},
          {x:354, label:'NEXAPROC', sub:'Process SCADA', val:'847/hr', unit:'Output', color:'#f59e0b', status:'ACTIVE'},
        ].map((c,i) => (
          <g key={i}>
            <rect x={c.x} y="58" width="155" height="92" rx="10" fill="rgba(255,255,255,0.03)" stroke={c.color} strokeWidth="1" strokeOpacity="0.4"/>
            <rect x={c.x} y="58" width="155" height="28" rx="10" fill={`${c.color}18`}/>
            <rect x={c.x} y="72" width="155" height="14" fill={`${c.color}18`}/>
            <circle cx={c.x+14} cy="72" r="4" fill={c.status === 'ONLINE' ? '#22c55e' : '#f59e0b'}/>
            <text x={c.x+24} y="72" fontFamily="monospace" fontSize="10" fontWeight="bold" fill={c.color} dominantBaseline="middle" letterSpacing="1">{c.label}</text>
            <text x={c.x+10} y="100" fontFamily="monospace" fontSize="20" fontWeight="900" fill="white" dominantBaseline="middle">{c.val}</text>
            <text x={c.x+10} y="120" fontFamily="monospace" fontSize="10" fill="rgba(255,255,255,0.4)" dominantBaseline="middle">{c.unit}</text>
            <rect x={c.x+95} y="112" width="50" height="16" rx="8" fill={`${c.color}20`} stroke={c.color} strokeWidth="0.8"/>
            <text x={c.x+120} y="120" fontFamily="monospace" fontSize="9" fill={c.color} textAnchor="middle" dominantBaseline="middle">{c.status}</text>
          </g>
        ))}

        {/* Section label */}
        <text x="16" y="170" fontFamily="monospace" fontSize="10" fill="rgba(255,255,255,0.3)" letterSpacing="2">NETWORK TOPOLOGY</text>

        {/* Network topology */}
        {edges.map(([a,b],i) => (
          <line key={i} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} stroke={CYAN} strokeWidth="1" strokeOpacity="0.35" strokeDasharray="4,3"/>
        ))}
        {nodes.map(([x,y],i) => (
          <g key={i}>
            <circle cx={x} cy={y} r="10" fill="rgba(124,58,237,0.2)" stroke={i===5?CYAN:PURPLE} strokeWidth="1.5"/>
            <circle cx={x} cy={y} r="4" fill={i===5?CYAN:PURPLE} opacity="0.9"/>
          </g>
        ))}
        {/* Node labels */}
        {[['Substation','A'],['Gateway','B'],['PLC','C'],['RTU','D'],['HMI','E'],['Master','']] .map(([l],i) => (
          <text key={i} x={nodes[i][0]} y={nodes[i][1]+20} fontFamily="monospace" fontSize="8" fill="rgba(255,255,255,0.35)" textAnchor="middle">{l}</text>
        ))}

        {/* Divider */}
        <line x1="12" y1="230" x2="508" y2="230" stroke="rgba(124,58,237,0.2)" strokeWidth="1"/>

        {/* Bar chart left */}
        <text x="16" y="244" fontFamily="monospace" fontSize="10" fill="rgba(255,255,255,0.3)" letterSpacing="2">LOAD BY SYSTEM</text>
        {barH.map((h,i) => (
          <g key={i}>
            <rect x={16+i*32} y={330-h} width="22" height={h} rx="4" fill={i%2===0?PURPLE:CYAN} opacity="0.7"/>
            <text x={16+i*32+11} y="340" fontFamily="monospace" fontSize="8" fill="rgba(255,255,255,0.3)" textAnchor="middle">W{i+1}</text>
          </g>
        ))}

        {/* Line chart right */}
        <text x="276" y="244" fontFamily="monospace" fontSize="10" fill="rgba(255,255,255,0.3)" letterSpacing="2">UPTIME TREND</text>
        <polyline
          points={lineY.map((y,i)=>`${276+i*22},${y+220}`).join(' ')}
          fill="none" stroke={CYAN} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        {/* Area fill */}
        <polyline
          points={`276,350 ${lineY.map((y,i)=>`${276+i*22},${y+220}`).join(' ')} ${276+10*22},350`}
          fill={`${CYAN}18`} stroke="none"/>
        {lineY.map((y,i) => (
          <circle key={i} cx={276+i*22} cy={y+220} r="2.5" fill={CYAN} opacity="0.8"/>
        ))}

        {/* Footer bar */}
        <rect x="0" y="370" width="520" height="30" rx="0" fill="rgba(124,58,237,0.08)"/>
        <rect x="0" y="382" width="520" height="18" rx="18" fill="rgba(124,58,237,0.08)"/>
        <circle cx="18" cy="385" r="3" fill="#22c55e"/>
        <text x="26" y="385" fontFamily="monospace" fontSize="9" fill="rgba(255,255,255,0.35)" dominantBaseline="middle">All systems operational · Last sync 0.3s ago · 3 sites active</text>
      </svg>
    </div>
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
            <GalvonLogo size="compact" />
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
            <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, marginBottom: 32, maxWidth: 480 }}>{heroTag}</p>
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
              <GalvonDashboard />
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
            <GalvonLogo size="compact" />
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
