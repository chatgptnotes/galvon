import { useState, useEffect } from 'react'
import { Zap, Droplets, Factory, Activity, Shield, Globe, ArrowRight, Building2, Flame, FlaskConical, Waves, CheckCircle, Menu, X, Cpu, Network, Lock, Layers, TrendingDown, AlertTriangle, DollarSign, Phone, Download, ChevronRight } from 'lucide-react'

const VERSION = '1.1'
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

// ── Colour tokens ─────────────────────────────────────────────────────────────
const C = {
  navy:   '#1B365D',
  teal:   '#00B4D8',
  orange: '#FF6B35',
  steel:  '#4A5568',
  light:  '#F7FAFC',
  white:  '#FFFFFF',
  dark:   '#1A202C',
  green:  '#2E7D32',
}

// ── Dashboard mockup ──────────────────────────────────────────────────────────
function ControlCenterMockup() {
  const bars = [55,72,48,80,63,88,70]
  const line = [62,58,55,60,52,48,45,50,43,46,40]
  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: 560 }}>
      {/* Glow */}
      <div style={{ position: 'absolute', inset: -20, borderRadius: 24, background: `radial-gradient(ellipse at 50% 40%, rgba(0,180,216,0.18) 0%, transparent 70%)`, filter: 'blur(20px)', pointerEvents: 'none' }} />
      <svg viewBox="0 0 540 420" style={{ width: '100%', display: 'block', filter: 'drop-shadow(0 20px 60px rgba(27,54,93,0.35))' }}>
        {/* Window chrome */}
        <rect x="0" y="0" width="540" height="420" rx="14" fill="#0d1b2e" stroke="rgba(0,180,216,0.3)" strokeWidth="1.5"/>
        <rect x="0" y="0" width="540" height="40" rx="14" fill="rgba(0,180,216,0.1)"/>
        <rect x="0" y="26" width="540" height="14" fill="rgba(0,180,216,0.1)"/>
        <circle cx="18" cy="20" r="5" fill="#ef4444" opacity="0.8"/>
        <circle cx="34" cy="20" r="5" fill="#f59e0b" opacity="0.8"/>
        <circle cx="50" cy="20" r="5" fill="#22c55e" opacity="0.8"/>
        <text x="72" y="20" fontFamily="monospace" fontSize="12" fill="rgba(255,255,255,0.7)" dominantBaseline="middle">GALVON · Unified Control Center  v2.4.1</text>
        <circle cx="504" cy="20" r="4" fill="#22c55e"/>
        <text x="514" y="20" fontFamily="monospace" fontSize="10" fill="#22c55e" dominantBaseline="middle">LIVE</text>

        {/* 3 vertical cards */}
        {[
          { x:10, label:'AMPRIS', sub:'Power SCADA', val:'98.4', unit:'% Uptime', color:'#00B4D8', trend:'+0.2%' },
          { x:192, label:'FLOWNEXUS', sub:'Flow SCADA', val:'3.41', unit:'MW Flow', color:'#38bdf8', trend:'Normal' },
          { x:374, label:'NEXAPROC', sub:'Process SCADA', val:'94.2', unit:'% OEE', color:'#FF6B35', trend:'+3.1%' },
        ].map((c,i) => (
          <g key={i}>
            <rect x={c.x} y="50" width="158" height="88" rx="10" fill="rgba(255,255,255,0.03)" stroke={`${c.color}60`} strokeWidth="1"/>
            <rect x={c.x} y="50" width="158" height="28" rx="10" fill={`${c.color}18`}/>
            <rect x={c.x} y="66" width="158" height="12" fill={`${c.color}18`}/>
            <circle cx={c.x+12} cy="64" r="4" fill="#22c55e"/>
            <text x={c.x+22} y="64" fontFamily="monospace" fontSize="10" fontWeight="bold" fill={c.color} dominantBaseline="middle" letterSpacing="1">{c.label}</text>
            <text x={c.x+10} y="94" fontFamily="monospace" fontSize="22" fontWeight="900" fill="white" dominantBaseline="middle">{c.val}</text>
            <text x={c.x+10} y="113" fontFamily="monospace" fontSize="10" fill="rgba(255,255,255,0.4)" dominantBaseline="middle">{c.unit}</text>
            <rect x={c.x+100} y="106" width="50" height="16" rx="8" fill={`${c.color}20`} stroke={`${c.color}60`} strokeWidth="1"/>
            <text x={c.x+125} y="114" fontFamily="monospace" fontSize="9" fill={c.color} textAnchor="middle" dominantBaseline="middle">{c.trend}</text>
          </g>
        ))}

        {/* Alarm panel */}
        <text x="14" y="155" fontFamily="monospace" fontSize="9" fill="rgba(255,255,255,0.3)" letterSpacing="2">ACTIVE ALARMS</text>
        {[
          { col:'#22c55e', txt:'All Ampris substations normal', time:'09:42' },
          { col:'#f59e0b', txt:'FlowNexus: Pump P-204 high vibration', time:'09:38' },
          { col:'#ef4444', txt:'NexaProc: Reactor temp threshold breach', time:'09:31' },
        ].map((a,i) => (
          <g key={i}>
            <rect x="12" y={166+i*22} width="516" height="18" rx="4" fill="rgba(255,255,255,0.015)" stroke={`${a.col}30`} strokeWidth="1"/>
            <rect x="12" y={166+i*22} width="3" height="18" rx="1" fill={a.col}/>
            <text x="22" y={175+i*22} fontFamily="monospace" fontSize="10" fill="rgba(255,255,255,0.65)" dominantBaseline="middle">{a.txt}</text>
            <text x="490" y={175+i*22} fontFamily="monospace" fontSize="9" fill="rgba(255,255,255,0.3)" dominantBaseline="middle">{a.time}</text>
          </g>
        ))}

        {/* Separator */}
        <line x1="12" y1="236" x2="528" y2="236" stroke="rgba(0,180,216,0.12)" strokeWidth="1"/>

        {/* Bar chart */}
        <text x="14" y="250" fontFamily="monospace" fontSize="9" fill="rgba(255,255,255,0.3)" letterSpacing="2">SYSTEM LOAD — 7 DAY</text>
        {bars.map((h,i) => (
          <g key={i}>
            <rect x={14+i*34} y={330-h} width="24" height={h} rx="3" fill={i===5?C.teal:C.orange} opacity="0.7"/>
            <text x={14+i*34+12} y="340" fontFamily="monospace" fontSize="8" fill="rgba(255,255,255,0.25)" textAnchor="middle">D{i+1}</text>
          </g>
        ))}

        {/* Line chart */}
        <text x="280" y="250" fontFamily="monospace" fontSize="9" fill="rgba(255,255,255,0.3)" letterSpacing="2">UPTIME TREND</text>
        <polyline points={`280,350 ${line.map((y,i)=>`${280+i*24},${y+278}`).join(' ')} 520,350`} fill={`${C.teal}18`} stroke="none"/>
        <polyline points={line.map((y,i)=>`${280+i*24},${y+278}`).join(' ')} fill="none" stroke={C.teal} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        {line.map((y,i) => <circle key={i} cx={280+i*24} cy={y+278} r="2.5" fill={C.teal} opacity="0.8"/>)}

        {/* Footer bar */}
        <rect x="0" y="386" width="540" height="34" rx="0" fill="rgba(0,180,216,0.06)"/>
        <rect x="0" y="400" width="540" height="20" rx="14" fill="rgba(0,180,216,0.06)"/>
        <circle cx="18" cy="403" r="3" fill="#22c55e"/>
        <text x="28" y="403" fontFamily="monospace" fontSize="9" fill="rgba(255,255,255,0.3)" dominantBaseline="middle">3 sites · 847 tags · Last sync 0.3s · All systems operational</text>
      </svg>
    </div>
  )
}

function WaveDivider({ from, to, flip=false }: { from:string; to:string; flip?:boolean }) {
  return (
    <div style={{ background: to, lineHeight: 0 }} className={flip ? 'rotate-180' : ''}>
      <svg viewBox="0 0 1440 70" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" width="100%" height="70">
        <path d="M0,35 Q360,70 720,35 Q1080,0 1440,35 L1440,0 L0,0 Z" fill={from}/>
      </svg>
    </div>
  )
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [heroTag, setHeroTag] = useState('Industrial Intelligence That Never Sleeps')

  useEffect(() => {
    fetchGeminiText('Write a powerful 6-word industrial B2B headline for GALVON SCADA platform. No quotes. Examples: "Industrial Intelligence That Never Sleeps"', 'Industrial Intelligence That Never Sleeps').then(setHeroTag)
  }, [])

  const navLinks = ['Platform', 'Ampris', 'FlowNexus', 'NexaProc', 'Industries', 'Resources']

  const products = [
    { name:'Ampris', sub:'Power & Electrical SCADA', icon:Zap, color:C.teal, desc:'Real-time monitoring, fault detection, load balancing, and energy analytics for substations, grids, and power utilities.', useCase:'Monitor a 50MW solar farm with 99.9% accuracy and predictive fault alerts.' },
    { name:'FlowNexus', sub:'Flow & Liquid SCADA', icon:Droplets, color:'#38bdf8', desc:'Pipeline monitoring, leak detection, pressure optimisation, and compliance reporting for water, wastewater, and fluid systems.', useCase:'Reduce non-revenue water losses by 30% across a 200km municipal network.' },
    { name:'NexaProc', sub:'Factory & Process SCADA', icon:Factory, color:C.orange, desc:'Batch control, OEE tracking, recipe management, and quality monitoring for pharmaceutical, food, chemical, and manufacturing plants.', useCase:'Improve OEE from 62% to 78% in pharmaceutical manufacturing.' },
  ]

  const problems = [
    { icon:TrendingDown, stat:'₹40L+/hr', label:'Lost production cost from unplanned downtime' },
    { icon:AlertTriangle, stat:'67%', label:'Of industrial incidents caused by siloed legacy systems' },
    { icon:DollarSign, stat:'3x', label:'Higher cost when scaling monitoring without a unified platform' },
  ]

  const features = [
    { icon:Activity, title:'Real-time SCADA', desc:'Sub-second data refresh from every PLC, RTU, and sensor across your operation.' },
    { icon:Cpu, title:'Predictive Analytics', desc:'AI-powered anomaly detection and failure prediction — catch issues days in advance.' },
    { icon:Shield, title:'IEC 62443 Compliant', desc:'End-to-end encryption, RBAC, audit trails, and full cybersecurity hardening.' },
    { icon:Network, title:'OPC-UA / Modbus / MQTT', desc:'Connects natively to Siemens, Allen-Bradley, Schneider, and every major PLC brand.' },
    { icon:Lock, title:'99.9% Uptime SLA', desc:'Hot-standby failover, edge processing, and 24/7 NOC monitoring included.' },
    { icon:Globe, title:'Multi-site Unified', desc:'Single pane of glass across 1 plant or 100 — with per-site drill-down.' },
  ]

  const stats = [
    { val:'35%', label:'Reduction in unplanned downtime' },
    { val:'20%', label:'Improvement in energy efficiency' },
    { val:'₹2.5 Cr', label:'Average annual savings per facility' },
    { val:'500+', label:'Facilities running on GALVON' },
  ]

  const industries = [
    { icon:Zap, label:'Power Utilities' }, { icon:Flame, label:'Oil and Gas' },
    { icon:Waves, label:'Water Treatment' }, { icon:Factory, label:'Manufacturing' },
    { icon:FlaskConical, label:'Pharmaceuticals' }, { icon:Building2, label:'Food and Beverage' },
    { icon:Globe, label:'Smart Cities' }, { icon:Layers, label:'Mining and Metals' },
  ]

  const integrations = ['Siemens S7', 'Allen Bradley', 'Schneider', 'OPC-UA', 'Modbus TCP/RTU', 'MQTT', 'DNP3', 'IEC 61850', 'SAP', 'REST API']

  return (
    <div style={{ fontFamily:"'Inter', system-ui, sans-serif", background:C.white, color:C.dark }}>

      {/* NAV */}
      <nav style={{ position:'fixed', top:0, width:'100%', zIndex:50, background:'rgba(255,255,255,0.97)', backdropFilter:'blur(16px)', borderBottom:`1px solid rgba(27,54,93,0.1)`, boxShadow:'0 1px 12px rgba(27,54,93,0.08)' }}>
        <div style={{ maxWidth:1280, margin:'0 auto', padding:'0 24px', height:64, display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
            <div style={{ width:36, height:36, borderRadius:10, background:`linear-gradient(135deg, ${C.navy}, ${C.teal})`, display:'flex', alignItems:'center', justifyContent:'center', boxShadow:`0 4px 12px rgba(0,180,216,0.3)` }}>
              <Zap size={18} color="white"/>
            </div>
            <span style={{ fontWeight:900, fontSize:20, letterSpacing:5, color:C.navy }}>GALVON</span>
          </div>
          <div className="hidden md:flex" style={{ gap:28, fontSize:14, color:C.steel, alignItems:'center' }}>
            {navLinks.map(l => <a key={l} href={`#${l.toLowerCase()}`} style={{ textDecoration:'none', color:C.steel, transition:'color .2s' }} onMouseOver={e=>(e.currentTarget.style.color=C.teal)} onMouseOut={e=>(e.currentTarget.style.color=C.steel)}>{l}</a>)}
            <a href="#contact" style={{ background:C.orange, color:'white', padding:'9px 22px', borderRadius:8, fontWeight:700, textDecoration:'none', boxShadow:`0 4px 14px rgba(255,107,53,0.35)` }}>Request Demo</a>
          </div>
          <button className="md:hidden" style={{ color:C.navy, background:'none', border:'none', cursor:'pointer' }} onClick={()=>setMenuOpen(!menuOpen)}>{menuOpen?<X size={22}/>:<Menu size={22}/>}</button>
        </div>
        {menuOpen && (
          <div style={{ borderTop:`1px solid rgba(27,54,93,0.1)`, padding:'16px 24px', display:'flex', flexDirection:'column', gap:16 }}>
            {navLinks.map(l => <a key={l} href={`#${l.toLowerCase()}`} onClick={()=>setMenuOpen(false)} style={{ textDecoration:'none', color:C.steel, fontSize:15 }}>{l}</a>)}
            <a href="#contact" style={{ background:C.orange, color:'white', padding:'10px 20px', borderRadius:8, fontWeight:700, textDecoration:'none', textAlign:'center' }} onClick={()=>setMenuOpen(false)}>Request Demo</a>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section style={{ minHeight:'100vh', background:`linear-gradient(160deg, #0d1b2e 0%, #1B365D 50%, #0a2540 100%)`, display:'flex', alignItems:'center', paddingTop:80, position:'relative', overflow:'hidden' }}>
        {/* Grid overlay */}
        <div style={{ position:'absolute', inset:0, backgroundImage:`linear-gradient(rgba(0,180,216,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,180,216,0.04) 1px, transparent 1px)`, backgroundSize:'64px 64px', pointerEvents:'none' }}/>
        {/* Orbs */}
        <div style={{ position:'absolute', top:'15%', right:'8%', width:400, height:400, borderRadius:'50%', background:`radial-gradient(circle, rgba(0,180,216,0.15) 0%, transparent 70%)`, filter:'blur(50px)', pointerEvents:'none' }}/>
        <div style={{ position:'absolute', bottom:'10%', left:'5%', width:300, height:300, borderRadius:'50%', background:`radial-gradient(circle, rgba(255,107,53,0.1) 0%, transparent 70%)`, filter:'blur(40px)', pointerEvents:'none' }}/>

        <div style={{ maxWidth:1280, margin:'0 auto', padding:'48px 24px', width:'100%', display:'grid', gridTemplateColumns:'1fr 1fr', gap:64, alignItems:'center' }}>
          {/* Left */}
          <div>
            <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'rgba(0,180,216,0.12)', border:'1px solid rgba(0,180,216,0.35)', borderRadius:100, padding:'6px 16px', fontSize:13, color:C.teal, marginBottom:28, fontWeight:600 }}>
              <Activity size={13}/> Industrial SCADA Platform
            </div>
            <h1 style={{ fontSize:'clamp(36px,5vw,64px)', fontWeight:900, lineHeight:1.05, color:'white', marginBottom:20, letterSpacing:'-1px' }}>
              {heroTag}
            </h1>
            <p style={{ fontSize:18, color:'rgba(255,255,255,0.65)', lineHeight:1.75, marginBottom:12, maxWidth:480 }}>
              GALVON's unified SCADA platform monitors, controls, and optimises your critical industrial operations across power, flow, and process systems — 24/7/365.
            </p>

            {/* Trust micro-bar */}
            <div style={{ display:'flex', gap:20, flexWrap:'wrap', marginBottom:36, fontSize:13, color:'rgba(255,255,255,0.5)' }}>
              {['500+ Facilities', '99.9% Uptime', '30+ Countries', 'IEC 62443 Certified'].map(t => (
                <span key={t} style={{ display:'flex', alignItems:'center', gap:5 }}><CheckCircle size={13} style={{ color:C.teal }}/>{t}</span>
              ))}
            </div>

            <div style={{ display:'flex', gap:14, flexWrap:'wrap' }}>
              <a href="#contact" style={{ display:'flex', alignItems:'center', gap:8, background:C.orange, color:'white', padding:'14px 28px', borderRadius:10, fontWeight:700, fontSize:15, textDecoration:'none', boxShadow:`0 6px 24px rgba(255,107,53,0.4)` }}>
                Schedule Live Demo <ArrowRight size={18}/>
              </a>
              <a href="#platform" style={{ display:'flex', alignItems:'center', gap:8, border:'1px solid rgba(255,255,255,0.25)', color:'rgba(255,255,255,0.85)', padding:'14px 24px', borderRadius:10, fontWeight:600, fontSize:15, textDecoration:'none' }}>
                <Download size={16}/> Technical Overview
              </a>
            </div>

            {/* WhatsApp CTA — India-specific */}
            <div style={{ marginTop:20, fontSize:13, color:'rgba(255,255,255,0.45)' }}>
              <Phone size={13} style={{ display:'inline', marginRight:6, color:C.teal }}/>
              Call or WhatsApp: <a href="https://wa.me/919373111709" style={{ color:C.teal, textDecoration:'none' }}>+91 93731 11709</a>
            </div>
          </div>

          {/* Right — dashboard */}
          <div style={{ display:'flex', justifyContent:'center' }}>
            <ControlCenterMockup/>
          </div>
        </div>
      </section>

      {/* LOGO / CLIENT BAR */}
      <section style={{ background:C.light, padding:'28px 24px', borderBottom:`1px solid rgba(27,54,93,0.08)` }}>
        <div style={{ maxWidth:1280, margin:'0 auto', textAlign:'center' }}>
          <p style={{ fontSize:12, letterSpacing:3, color:C.steel, marginBottom:20, opacity:0.6 }}>TRUSTED BY INDIA'S LEADING INDUSTRIAL ORGANISATIONS</p>
          <div style={{ display:'flex', flexWrap:'wrap', justifyContent:'center', gap:'16px 40px' }}>
            {['Tata Power', 'L&T Hydrocarbon', 'NTPC', 'GAIL', 'Reliance Industries', 'BHEL'].map(n => (
              <span key={n} style={{ fontSize:14, fontWeight:700, color:'rgba(27,54,93,0.35)', letterSpacing:1 }}>{n}</span>
            ))}
          </div>
        </div>
      </section>

      <WaveDivider from={C.light} to={C.white}/>

      {/* PROBLEM */}
      <section style={{ background:C.white, padding:'80px 24px' }}>
        <div style={{ maxWidth:1280, margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:56 }}>
            <div style={{ display:'inline-block', background:`${C.teal}15`, border:`1px solid ${C.teal}40`, borderRadius:100, padding:'5px 18px', fontSize:12, color:C.teal, fontWeight:700, letterSpacing:3, marginBottom:16 }}>THE PROBLEM</div>
            <h2 style={{ fontSize:'clamp(28px,4vw,44px)', fontWeight:900, color:C.dark, marginBottom:14 }}>Industrial Operations Can't Afford Blind Spots</h2>
            <p style={{ color:C.steel, maxWidth:560, margin:'0 auto', fontSize:17, lineHeight:1.7 }}>Legacy monitoring systems create dangerous gaps. GALVON was built to close them.</p>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(280px, 1fr))', gap:24 }}>
            {problems.map(p => (
              <div key={p.label} style={{ background:C.light, borderRadius:16, padding:'32px 28px', border:`1px solid rgba(27,54,93,0.08)`, display:'flex', flexDirection:'column', gap:12 }}>
                <div style={{ width:52, height:52, borderRadius:14, background:`${C.orange}15`, display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <p.icon size={24} style={{ color:C.orange }}/>
                </div>
                <div style={{ fontSize:40, fontWeight:900, color:C.navy }}>{p.stat}</div>
                <p style={{ color:C.steel, fontSize:15, lineHeight:1.6 }}>{p.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WaveDivider from={C.white} to={C.light}/>

      {/* PLATFORM OVERVIEW — 3 verticals */}
      <section id="platform" style={{ background:C.light, padding:'80px 24px' }}>
        <div style={{ maxWidth:1280, margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:56 }}>
            <div style={{ display:'inline-block', background:`${C.navy}10`, border:`1px solid ${C.navy}25`, borderRadius:100, padding:'5px 18px', fontSize:12, color:C.navy, fontWeight:700, letterSpacing:3, marginBottom:16 }}>THE SUITE</div>
            <h2 style={{ fontSize:'clamp(28px,4vw,44px)', fontWeight:900, color:C.dark, marginBottom:14 }}>One Platform. Three Specialised Solutions.</h2>
            <p style={{ color:C.steel, maxWidth:560, margin:'0 auto', fontSize:17 }}>Complete industrial control — power, flow, and process — unified under one ecosystem.</p>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(300px,1fr))', gap:24 }}>
            {products.map(p => (
              <div key={p.name} style={{ background:C.white, borderRadius:20, padding:'32px', border:`1px solid rgba(27,54,93,0.08)`, boxShadow:'0 2px 16px rgba(27,54,93,0.06)', transition:'all .3s' }}
                onMouseOver={e=>{e.currentTarget.style.borderColor=p.color;e.currentTarget.style.boxShadow=`0 8px 32px rgba(27,54,93,0.12)`;e.currentTarget.style.transform='translateY(-4px)'}}
                onMouseOut={e=>{e.currentTarget.style.borderColor='rgba(27,54,93,0.08)';e.currentTarget.style.boxShadow='0 2px 16px rgba(27,54,93,0.06)';e.currentTarget.style.transform='translateY(0)'}}>
                <div style={{ width:56, height:56, borderRadius:16, background:`${p.color}15`, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:20 }}>
                  <p.icon size={26} style={{ color:p.color }}/>
                </div>
                <div style={{ fontSize:11, color:p.color, fontWeight:700, letterSpacing:3, marginBottom:6 }}>{p.sub.toUpperCase()}</div>
                <h3 style={{ fontSize:24, fontWeight:900, color:C.dark, marginBottom:12 }}>{p.name}</h3>
                <p style={{ color:C.steel, lineHeight:1.65, marginBottom:16, fontSize:15 }}>{p.desc}</p>
                <div style={{ background:C.light, borderRadius:10, padding:'12px 16px', marginBottom:20 }}>
                  <div style={{ fontSize:11, color:p.color, fontWeight:700, marginBottom:4 }}>USE CASE</div>
                  <p style={{ color:C.steel, fontSize:13, lineHeight:1.5 }}>{p.useCase}</p>
                </div>
                <a href={`#${p.name.toLowerCase()}`} style={{ display:'flex', alignItems:'center', gap:6, color:p.color, fontSize:14, fontWeight:700, textDecoration:'none' }}>
                  Explore {p.name} <ChevronRight size={16}/>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WaveDivider from={C.light} to={C.white}/>

      {/* ROI STATS */}
      <section style={{ background:C.white, padding:'80px 24px' }}>
        <div style={{ maxWidth:1280, margin:'0 auto', display:'grid', gridTemplateColumns:'1fr 1fr', gap:64, alignItems:'center' }}>
          <div>
            <div style={{ display:'inline-block', background:`${C.orange}12`, border:`1px solid ${C.orange}35`, borderRadius:100, padding:'5px 18px', fontSize:12, color:C.orange, fontWeight:700, letterSpacing:3, marginBottom:16 }}>PROVEN ROI</div>
            <h2 style={{ fontSize:'clamp(28px,4vw,44px)', fontWeight:900, color:C.dark, marginBottom:16 }}>The GALVON Impact — By the Numbers</h2>
            <p style={{ color:C.steel, fontSize:16, lineHeight:1.75, marginBottom:28 }}>Every rupee invested in GALVON delivers measurable return through reduced downtime, lower energy costs, and operational efficiency gains.</p>
            <a href="#contact" style={{ display:'inline-flex', alignItems:'center', gap:8, background:C.navy, color:'white', padding:'13px 26px', borderRadius:10, fontWeight:700, fontSize:15, textDecoration:'none' }}>
              Calculate Your ROI <ArrowRight size={17}/>
            </a>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
            {stats.map((s,i) => (
              <div key={s.label} style={{ background:i%2===0?C.navy:`${C.teal}12`, borderRadius:16, padding:'28px 24px', border:`1px solid ${i%2===0?'transparent':`${C.teal}30`}` }}>
                <div style={{ fontSize:36, fontWeight:900, color:i%2===0?C.teal:C.navy, marginBottom:8 }}>{s.val}</div>
                <p style={{ color:i%2===0?'rgba(255,255,255,0.7)':C.steel, fontSize:14, lineHeight:1.5 }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WaveDivider from={C.white} to={C.light}/>

      {/* FEATURES */}
      <section id="features" style={{ background:C.light, padding:'80px 24px' }}>
        <div style={{ maxWidth:1280, margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:56 }}>
            <h2 style={{ fontSize:'clamp(28px,4vw,44px)', fontWeight:900, color:C.dark, marginBottom:12 }}>Built for Industrial-Grade Performance</h2>
            <p style={{ color:C.steel, maxWidth:520, margin:'0 auto', fontSize:16 }}>Every feature engineered for environments where failure has real consequences.</p>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(260px,1fr))', gap:20 }}>
            {features.map((f,i) => (
              <div key={f.title} style={{ background:C.white, borderRadius:16, padding:'28px', border:`1px solid rgba(27,54,93,0.07)`, transition:'all .25s' }}
                onMouseOver={e=>{e.currentTarget.style.borderColor=C.teal;e.currentTarget.style.boxShadow=`0 4px 20px rgba(0,180,216,0.12)`;e.currentTarget.style.transform='translateY(-3px)'}}
                onMouseOut={e=>{e.currentTarget.style.borderColor='rgba(27,54,93,0.07)';e.currentTarget.style.boxShadow='none';e.currentTarget.style.transform='translateY(0)'}}>
                <div style={{ width:48, height:48, borderRadius:12, background:i%2===0?`${C.teal}12`:`${C.navy}08`, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:16 }}>
                  <f.icon size={22} style={{ color:i%2===0?C.teal:C.navy }}/>
                </div>
                <h3 style={{ fontWeight:700, fontSize:16, color:C.dark, marginBottom:8 }}>{f.title}</h3>
                <p style={{ color:C.steel, fontSize:14, lineHeight:1.65 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WaveDivider from={C.light} to={C.white}/>

      {/* INDUSTRIES */}
      <section id="industries" style={{ background:C.white, padding:'80px 24px' }}>
        <div style={{ maxWidth:1280, margin:'0 auto', textAlign:'center' }}>
          <h2 style={{ fontSize:'clamp(28px,4vw,44px)', fontWeight:900, color:C.dark, marginBottom:12 }}>Industries We Power</h2>
          <p style={{ color:C.steel, marginBottom:48, fontSize:16 }}>GALVON adapts to every industrial vertical — from megawatt power plants to litre-per-hour pharma lines.</p>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(140px,1fr))', gap:16 }}>
            {industries.map((ind,i) => (
              <div key={ind.label} style={{ border:`1px solid rgba(27,54,93,0.1)`, borderRadius:14, padding:'24px 12px', transition:'all .25s', cursor:'default' }}
                onMouseOver={e=>{e.currentTarget.style.borderColor=C.teal;e.currentTarget.style.background=`${C.teal}06`;e.currentTarget.style.transform='scale(1.04)'}}
                onMouseOut={e=>{e.currentTarget.style.borderColor='rgba(27,54,93,0.1)';e.currentTarget.style.background='transparent';e.currentTarget.style.transform='scale(1)'}}>
                <ind.icon size={28} style={{ color:i%2===0?C.teal:C.navy, marginBottom:10 }}/>
                <div style={{ fontSize:13, fontWeight:600, color:C.dark }}>{ind.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WaveDivider from={C.white} to={C.light}/>

      {/* INTEGRATIONS */}
      <section id="integrations" style={{ background:C.light, padding:'80px 24px' }}>
        <div style={{ maxWidth:900, margin:'0 auto', textAlign:'center' }}>
          <h2 style={{ fontSize:'clamp(26px,4vw,40px)', fontWeight:900, color:C.dark, marginBottom:12 }}>Seamless Integration with Your Existing Systems</h2>
          <p style={{ color:C.steel, marginBottom:44, fontSize:16 }}>No rip-and-replace. GALVON connects to everything you already have.</p>
          <div style={{ display:'flex', flexWrap:'wrap', justifyContent:'center', gap:12 }}>
            {integrations.map(n => (
              <div key={n} style={{ background:C.white, border:`1px solid rgba(27,54,93,0.12)`, borderRadius:10, padding:'10px 22px', color:C.steel, fontWeight:600, fontSize:14, transition:'all .2s' }}
                onMouseOver={e=>{e.currentTarget.style.borderColor=C.teal;e.currentTarget.style.color=C.teal;e.currentTarget.style.background=`${C.teal}06`}}
                onMouseOut={e=>{e.currentTarget.style.borderColor='rgba(27,54,93,0.12)';e.currentTarget.style.color=C.steel;e.currentTarget.style.background=C.white}}>
                {n}
              </div>
            ))}
          </div>
        </div>
      </section>

      <WaveDivider from={C.light} to={C.navy}/>

      {/* CTA */}
      <section id="contact" style={{ background:C.navy, padding:'100px 24px', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, background:`radial-gradient(ellipse at 60% 50%, rgba(0,180,216,0.15) 0%, transparent 65%)`, pointerEvents:'none' }}/>
        <div style={{ maxWidth:680, margin:'0 auto', textAlign:'center', position:'relative', zIndex:1 }}>
          <CheckCircle size={48} style={{ color:C.teal, margin:'0 auto 24px' }}/>
          <h2 style={{ fontSize:'clamp(30px,5vw,52px)', fontWeight:900, color:'white', lineHeight:1.1, marginBottom:20 }}>
            Ready to Transform Your Operations?
          </h2>
          <p style={{ color:'rgba(255,255,255,0.6)', fontSize:17, lineHeight:1.75, marginBottom:40 }}>
            Join 500+ facilities worldwide running on GALVON. Our team sets up a live demo tailored to your industry within 24 hours.
          </p>
          <div style={{ display:'flex', gap:14, justifyContent:'center', flexWrap:'wrap' }}>
            <a href="mailto:hello@galvon.com" style={{ display:'inline-flex', alignItems:'center', gap:10, background:C.orange, color:'white', padding:'16px 36px', borderRadius:12, fontWeight:800, fontSize:17, textDecoration:'none', boxShadow:`0 8px 28px rgba(255,107,53,0.45)` }}>
              Schedule a Demo <ArrowRight size={20}/>
            </a>
            <a href="https://wa.me/919373111709" style={{ display:'inline-flex', alignItems:'center', gap:8, border:'1px solid rgba(255,255,255,0.3)', color:'rgba(255,255,255,0.85)', padding:'16px 28px', borderRadius:12, fontWeight:600, fontSize:16, textDecoration:'none' }}>
              <Phone size={18}/> WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background:'#0d1b2e', borderTop:`1px solid rgba(0,180,216,0.1)`, padding:'44px 24px' }}>
        <div style={{ maxWidth:1280, margin:'0 auto', display:'flex', flexWrap:'wrap', alignItems:'center', justifyContent:'space-between', gap:24 }}>
          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
            <div style={{ width:32, height:32, borderRadius:10, background:`linear-gradient(135deg, ${C.navy}, ${C.teal})`, display:'flex', alignItems:'center', justifyContent:'center' }}>
              <Zap size={15} color="white"/>
            </div>
            <span style={{ fontWeight:900, letterSpacing:5, fontSize:18, color:'white' }}>GALVON</span>
          </div>
          <div style={{ display:'flex', gap:24, fontSize:13, color:'rgba(255,255,255,0.35)' }}>
            {['Ampris','FlowNexus','NexaProc','Industries','About','Contact'].map(n => <a key={n} href={`#${n.toLowerCase()}`} style={{ textDecoration:'none', color:'rgba(255,255,255,0.35)', transition:'color .2s' }} onMouseOver={e=>(e.currentTarget.style.color=C.teal)} onMouseOut={e=>(e.currentTarget.style.color='rgba(255,255,255,0.35)')}>{n}</a>)}
          </div>
          <div style={{ textAlign:'right' }}>
            <div style={{ color:'rgba(255,255,255,0.4)', fontSize:13 }}>drmhope.com | A Bettroi Product</div>
            <div style={{ color:'rgba(255,255,255,0.2)', fontSize:11, marginTop:4 }}>v{VERSION} | {BUILD_DATE} | galvon</div>
          </div>
        </div>
      </footer>
    </div>
  )
}
