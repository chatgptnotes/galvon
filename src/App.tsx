import { useState, useEffect } from 'react'
import { Zap, Droplets, Factory, Activity, Shield, Globe, ArrowRight, Building2, Flame, FlaskConical, Waves, CheckCircle, Menu, X, Cpu, Network, Lock, Layers, TrendingDown, AlertTriangle, DollarSign, Phone, Download, ChevronRight } from 'lucide-react'

const VERSION = '1.3'; const BUILD_DATE = 'March 2026'
const GEMINI_KEY = import.meta.env.VITE_GEMINI_API_KEY
async function fetchGeminiText(prompt: string, fallback: string): Promise<string> {
  if (!GEMINI_KEY) return fallback
  try {
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_KEY}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }) })
    const data = await res.json()
    return data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || fallback
  } catch { return fallback }
}

// ── WATER / ICE PHOENIX palette ───────────────────────────────────────────────
const W = {
  bg:      '#010d1a',   // deep ocean abyss
  bg2:     '#020f1e',   // midnight water
  bg3:     '#011523',   // dark trench
  blue:    '#0ea5e9',   // electric surface blue
  cyan:    '#22d3ee',   // bioluminescent cyan
  ice:     '#bae6fd',   // frost/ice
  teal:    '#06b6d4',   // deep teal
  glow:    '#67e8f9',   // neon bioluminescence
  white:   '#ffffff',
  muted:   'rgba(255,255,255,0.58)',
  dim:     'rgba(255,255,255,0.3)',
  dimmer:  'rgba(255,255,255,0.14)',
}

function WaveDivider({ from, to, flip=false }:{ from:string; to:string; flip?:boolean }) {
  return (
    <div style={{ background:to, lineHeight:0 }} className={flip?'rotate-180':''}>
      <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" width="100%" height="80">
        <path d="M0,40 Q180,80 360,40 Q540,0 720,40 Q900,80 1080,40 Q1260,0 1440,40 L1440,0 L0,0 Z" fill={from}/>
      </svg>
    </div>
  )
}

function IceMockup() {
  const bars = [48,65,52,78,60,84,70]
  const line = [60,55,52,58,48,44,40,46,38,42,35,40,32]
  return (
    <div style={{ position:'relative', width:'100%', maxWidth:560 }}>
      {/* Ice glow */}
      <div style={{ position:'absolute', inset:-40, borderRadius:30, background:`radial-gradient(ellipse 60% 50% at 50% 40%, rgba(34,211,238,0.22) 0%, rgba(14,165,233,0.12) 40%, transparent 70%)`, filter:'blur(20px)', pointerEvents:'none' }}/>
      {/* Frost ring */}
      <div style={{ position:'absolute', top:-15, left:-15, right:-15, bottom:-15, borderRadius:24, border:`1px solid rgba(103,232,249,0.12)`, pointerEvents:'none' }}/>
      <svg viewBox="0 0 560 440" style={{ width:'100%', display:'block', filter:'drop-shadow(0 0 40px rgba(34,211,238,0.35)) drop-shadow(0 20px 60px rgba(14,165,233,0.2))' }}>
        {/* Outer frost frame */}
        <defs>
          <linearGradient id="iceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(14,165,233,0.9)"/>
            <stop offset="100%" stopColor="rgba(34,211,238,0.6)"/>
          </linearGradient>
          <linearGradient id="barGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#22d3ee"/>
            <stop offset="100%" stopColor="#0ea5e9"/>
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="560" height="440" rx="16" fill="rgba(1,12,24,0.97)" stroke="rgba(34,211,238,0.3)" strokeWidth="1.5"/>
        {/* Ice crystal corners */}
        <path d="M0,0 L30,0 L0,30 Z" fill="rgba(34,211,238,0.08)" rx="16"/>
        <path d="M530,0 L560,0 L560,30 Z" fill="rgba(14,165,233,0.08)"/>
        <path d="M0,410 L0,440 L30,440 Z" fill="rgba(34,211,238,0.06)"/>
        <path d="M530,440 L560,440 L560,410 Z" fill="rgba(14,165,233,0.06)"/>
        {/* Scanlines */}
        {[...Array(20)].map((_,i)=><line key={i} x1="0" y1={i*22} x2="560" y2={i*22} stroke="rgba(34,211,238,0.02)" strokeWidth="1"/>)}
        {/* Header */}
        <rect x="0" y="0" width="560" height="42" rx="16" fill="rgba(14,165,233,0.12)"/>
        <rect x="0" y="28" width="560" height="14" fill="rgba(14,165,233,0.12)"/>
        <circle cx="18" cy="21" r="5" fill="#ef4444" opacity="0.8"/>
        <circle cx="34" cy="21" r="5" fill="#f59e0b" opacity="0.8"/>
        <circle cx="50" cy="21" r="5" fill="#22c55e" opacity="0.8"/>
        <text x="72" y="21" fontFamily="monospace" fontSize="12" fill="rgba(255,255,255,0.7)" dominantBaseline="middle">GALVON  ·  Unified Control Center  ·  v2.4.1</text>
        <circle cx="522" cy="21" r="4" fill={W.glow}/>
        <text x="532" y="21" fontFamily="monospace" fontSize="10" fill={W.glow} dominantBaseline="middle">LIVE</text>
        {/* Product cards */}
        {[
          { x:10,  label:'AMPRIS',    sub:'Power SCADA',   val:'98.4%',  unit:'Uptime',      color:W.cyan,  badge:'Normal' },
          { x:196, label:'FLOWNEXUS', sub:'Flow SCADA',    val:'3.41MW', unit:'Throughput',  color:W.blue,  badge:'Stable' },
          { x:382, label:'NEXAPROC',  sub:'Process SCADA', val:'94.2%',  unit:'OEE Score',   color:W.ice,   badge:'+3.1%'  },
        ].map((c)=>(
          <g key={c.label}>
            <rect x={c.x} y="52" width="170" height="90" rx="10" fill="rgba(14,165,233,0.05)" stroke={`${c.color}40`} strokeWidth="1"/>
            <rect x={c.x} y="52" width="170" height="28" rx="10" fill={`${c.color}12`}/>
            <rect x={c.x} y="68" width="170" height="12" fill={`${c.color}12`}/>
            <circle cx={c.x+14} cy="66" r="3.5" fill="#22c55e"/>
            <text x={c.x+24} y="66" fontFamily="monospace" fontSize="10" fontWeight="bold" fill={c.color} dominantBaseline="middle" letterSpacing="1">{c.label}</text>
            <text x={c.x+12} y="100" fontFamily="monospace" fontSize="21" fontWeight="900" fill="white" dominantBaseline="middle">{c.val}</text>
            <text x={c.x+12} y="120" fontFamily="monospace" fontSize="10" fill={W.dim} dominantBaseline="middle">{c.unit}</text>
            <rect x={c.x+110} y="112" width="52" height="17" rx="8" fill={`${c.color}15`} stroke={`${c.color}45`} strokeWidth="1"/>
            <text x={c.x+136} y="121" fontFamily="monospace" fontSize="9" fill={c.color} textAnchor="middle" dominantBaseline="middle">{c.badge}</text>
          </g>
        ))}
        {/* Alarms */}
        <text x="14" y="158" fontFamily="monospace" fontSize="9" fill={W.dim} letterSpacing="2">ACTIVE ALARMS</text>
        {[
          { col:'#22c55e', txt:'All Ampris substations normal — no critical faults detected' },
          { col:'#f59e0b', txt:'FlowNexus: Pump P-204 high vibration — monitor closely' },
          { col:'#ef4444', txt:'NexaProc: Reactor B temp threshold breach — investigate now' },
        ].map((a,i)=>(
          <g key={i}>
            <rect x="12" y={168+i*22} width="536" height="18" rx="4" fill="rgba(255,255,255,0.015)" stroke={`${a.col}20`} strokeWidth="1"/>
            <rect x="12" y={168+i*22} width="3" height="18" rx="1" fill={a.col}/>
            <text x="22" y={177+i*22} fontFamily="monospace" fontSize="10" fill="rgba(255,255,255,0.6)" dominantBaseline="middle">{a.txt}</text>
          </g>
        ))}
        <line x1="12" y1="238" x2="548" y2="238" stroke={`${W.cyan}18`} strokeWidth="1"/>
        {/* Bar chart */}
        <text x="14" y="252" fontFamily="monospace" fontSize="9" fill={W.dim} letterSpacing="2">SYSTEM LOAD  (7-DAY)</text>
        {bars.map((h,bi)=>(
          <g key={bi}>
            <rect x={14+bi*36} y={332-h} width="26" height={h} rx="3" fill={bi%2===0?W.cyan:W.blue} opacity="0.7"/>
            <text x={14+bi*36+13} y="342" fontFamily="monospace" fontSize="8" fill={W.dim} textAnchor="middle">D{bi+1}</text>
          </g>
        ))}
        {/* Line chart */}
        <text x="294" y="252" fontFamily="monospace" fontSize="9" fill={W.dim} letterSpacing="2">UPTIME TREND  (13-HR)</text>
        {[0,1,2,3].map(j=><line key={j} x1="294" y1={270+j*18} x2="548" y2={270+j*18} stroke="rgba(255,255,255,0.03)" strokeWidth="1"/>)}
        <polyline points={`294,350 ${line.map((y,i)=>`${294+i*21},${y+282}`).join(' ')} 546,350`} fill={`${W.glow}10`} stroke="none"/>
        <polyline points={line.map((y,i)=>`${294+i*21},${y+282}`).join(' ')} fill="none" stroke={W.glow} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        {line.map((y,i)=><circle key={i} cx={294+i*21} cy={y+282} r="2.5" fill={W.glow} opacity="0.9"/>)}
        {/* Footer bar */}
        <rect x="0" y="400" width="560" height="40" rx="0" fill={`${W.blue}08`}/>
        <rect x="0" y="416" width="560" height="24" rx="16" fill={`${W.blue}08`}/>
        <circle cx="18" cy="420" r="3" fill="#22c55e"/>
        <text x="28" y="420" fontFamily="monospace" fontSize="9" fill={W.dim} dominantBaseline="middle">3 sites · 847 tags · Last sync 0.3s · All systems operational</text>
      </svg>
    </div>
  )
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [heroTag, setHeroTag] = useState('Where Industrial Control Meets the Deep')
  useEffect(() => {
    fetchGeminiText('Write a bold 6-7 word headline for GALVON, an industrial SCADA platform. Ocean/ice/water energy — powerful, cosmic, deep. No quotes.', 'Where Industrial Control Meets the Deep').then(setHeroTag)
  }, [])

  const navLinks = ['Platform','Ampris','FlowNexus','NexaProc','Industries','Resources']

  const products = [
    { name:'Ampris', sub:'Power & Electrical SCADA', icon:Zap, color:W.cyan, desc:'Real-time monitoring, fault detection, load balancing, and energy analytics for substations, grids, and power utilities.', useCase:'Monitor a 50MW solar farm with 99.9% accuracy and predictive fault alerts.' },
    { name:'FlowNexus', sub:'Flow & Liquid SCADA', icon:Droplets, color:W.blue, desc:'Pipeline monitoring, leak detection, pressure optimisation, and compliance reporting for water, wastewater, and fluid systems.', useCase:'Reduce non-revenue water losses by 30% across a 200km municipal network.', url:'https://flownexus.work' },
    { name:'NexaProc', sub:'Factory & Process SCADA', icon:Factory, color:W.ice, desc:'Batch control, OEE tracking, recipe management, and quality monitoring for pharmaceutical, chemical, and manufacturing plants.', useCase:'Improve OEE from 62% to 78% in pharmaceutical manufacturing.' },
  ]

  const problems = [
    { icon:TrendingDown, stat:'₹40L+/hr', label:'Lost production cost from a single hour of unplanned downtime' },
    { icon:AlertTriangle, stat:'67%', label:'Of industrial incidents originate from fragmented monitoring systems' },
    { icon:DollarSign, stat:'3×', label:'Higher cost when scaling without a unified SCADA platform' },
  ]

  const features = [
    { icon:Activity, title:'Real-time SCADA', desc:'Sub-second telemetry from every PLC, RTU, DCS, and sensor across all sites.', c:W.cyan },
    { icon:Cpu, title:'AI Predictive Engine', desc:'Machine learning flags failures days before they cascade into downtime.', c:W.blue },
    { icon:Shield, title:'IEC 62443 Compliant', desc:'End-to-end encryption, RBAC, audit trails, and industrial cybersecurity hardening.', c:W.cyan },
    { icon:Network, title:'Universal Protocols', desc:'OPC-UA, Modbus, MQTT, DNP3, IEC 61850 — connects to every major PLC brand.', c:W.blue },
    { icon:Lock, title:'99.9% Uptime SLA', desc:'Hot-standby failover, edge processing, and 24/7 NOC monitoring included.', c:W.glow },
    { icon:Globe, title:'Multi-site Unified', desc:'One command centre for 1 plant or 100 — with per-site drill-down analytics.', c:W.teal },
  ]

  const stats = [
    { val:'35%', label:'Reduction in unplanned downtime', hi:true },
    { val:'20%', label:'Improvement in energy efficiency', hi:false },
    { val:'₹2.5 Cr', label:'Average annual savings per facility', hi:true },
    { val:'500+', label:'Facilities running on GALVON worldwide', hi:false },
  ]

  const industries = [
    { icon:Zap, label:'Power Utilities' }, { icon:Flame, label:'Oil and Gas' },
    { icon:Waves, label:'Water Treatment' }, { icon:Factory, label:'Manufacturing' },
    { icon:FlaskConical, label:'Pharmaceuticals' }, { icon:Building2, label:'Food and Beverage' },
    { icon:Globe, label:'Smart Cities' }, { icon:Layers, label:'Mining and Metals' },
  ]

  const integrations = ['Siemens S7','Allen Bradley','Schneider','OPC-UA','Modbus TCP/RTU','MQTT','DNP3','IEC 61850','SAP ERP','REST API']

  return (
    <div style={{ fontFamily:"'Inter',system-ui,sans-serif", background:W.bg, color:W.white, minHeight:'100vh' }}>

      {/* ── NAV ── */}
      <nav style={{ position:'fixed', top:0, width:'100%', zIndex:50, background:'rgba(1,13,26,0.9)', backdropFilter:'blur(24px)', borderBottom:`1px solid rgba(34,211,238,0.18)` }}>
        <div style={{ maxWidth:1280, margin:'0 auto', padding:'0 24px', height:64, display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
            <div style={{ width:38, height:38, borderRadius:11, background:`linear-gradient(135deg,${W.blue},${W.glow})`, display:'flex', alignItems:'center', justifyContent:'center', boxShadow:`0 0 24px rgba(34,211,238,0.55)` }}>
              <Zap size={19} color="white"/>
            </div>
            <span style={{ fontWeight:900, fontSize:20, letterSpacing:5, background:`linear-gradient(90deg,${W.ice},${W.cyan})`, WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>GALVON</span>
          </div>
          <div className="hidden md:flex" style={{ gap:28, fontSize:14, color:W.muted, alignItems:'center' }}>
            {navLinks.map(l=><a key={l} href={`#${l.toLowerCase()}`} style={{ textDecoration:'none', color:W.muted, transition:'color .2s' }} onMouseOver={e=>(e.currentTarget.style.color=W.glow)} onMouseOut={e=>(e.currentTarget.style.color=W.muted)}>{l}</a>)}
            <a href="#contact" style={{ background:`linear-gradient(135deg,${W.blue},${W.cyan})`, color:'white', padding:'9px 22px', borderRadius:8, fontWeight:700, textDecoration:'none', boxShadow:`0 0 20px rgba(34,211,238,0.4)` }}>Request Demo</a>
          </div>
          <button className="md:hidden" style={{ color:W.white, background:'none', border:'none', cursor:'pointer' }} onClick={()=>setMenuOpen(!menuOpen)}>{menuOpen?<X size={22}/>:<Menu size={22}/>}</button>
        </div>
        {menuOpen&&<div style={{ borderTop:`1px solid rgba(34,211,238,0.12)`, padding:'16px 24px', display:'flex', flexDirection:'column', gap:14 }}>
          {navLinks.map(l=><a key={l} href={`#${l.toLowerCase()}`} onClick={()=>setMenuOpen(false)} style={{ textDecoration:'none', color:W.muted, fontSize:15 }}>{l}</a>)}
          <a href="#contact" style={{ background:`linear-gradient(135deg,${W.blue},${W.cyan})`, color:'white', padding:'10px 20px', borderRadius:8, fontWeight:700, textDecoration:'none', textAlign:'center' }} onClick={()=>setMenuOpen(false)}>Request Demo</a>
        </div>}
      </nav>

      {/* ── HERO ── */}
      <section style={{ minHeight:'100vh', position:'relative', display:'flex', alignItems:'center', paddingTop:80, overflow:'hidden', background:`linear-gradient(170deg,#010d1a 0%,#020f1e 50%,#000b16 100%)` }}>
        {/* Deep ocean orbs */}
        <div style={{ position:'absolute', top:'5%', right:'2%', width:600, height:600, borderRadius:'50%', background:`radial-gradient(circle,rgba(34,211,238,0.18) 0%,rgba(14,165,233,0.08) 40%,transparent 70%)`, filter:'blur(70px)', pointerEvents:'none' }}/>
        <div style={{ position:'absolute', bottom:'10%', left:'0%', width:450, height:450, borderRadius:'50%', background:`radial-gradient(circle,rgba(6,182,212,0.12) 0%,transparent 70%)`, filter:'blur(60px)', pointerEvents:'none' }}/>
        <div style={{ position:'absolute', top:'45%', left:'35%', width:300, height:300, borderRadius:'50%', background:`radial-gradient(circle,rgba(103,232,249,0.08) 0%,transparent 70%)`, filter:'blur(50px)', pointerEvents:'none' }}/>
        {/* Ice crystal particles */}
        {[...Array(40)].map((_,i)=>(
          <div key={i} style={{ position:'absolute', left:`${(i*37+11)%100}%`, top:`${(i*53+7)%100}%`, width:i%6===0?4:i%3===0?2:1.5, height:i%6===0?4:i%3===0?2:1.5, borderRadius:'50%', background:i%3===0?W.glow:i%2===0?W.cyan:W.ice, opacity:0.15+(i%5)*0.08, pointerEvents:'none', boxShadow:i%8===0?`0 0 6px ${W.glow}`:undefined }}/>
        ))}
        {/* Water ripple grid */}
        <div style={{ position:'absolute', inset:0, backgroundImage:`radial-gradient(circle,rgba(34,211,238,0.06) 1px,transparent 1px)`, backgroundSize:'52px 52px', pointerEvents:'none' }}/>
        {/* Horizontal light rays */}
        <div style={{ position:'absolute', top:'30%', left:0, right:0, height:1, background:`linear-gradient(90deg,transparent,rgba(34,211,238,0.08),transparent)`, pointerEvents:'none' }}/>
        <div style={{ position:'absolute', top:'60%', left:0, right:0, height:1, background:`linear-gradient(90deg,transparent,rgba(14,165,233,0.05),transparent)`, pointerEvents:'none' }}/>

        <div style={{ maxWidth:1280, margin:'0 auto', padding:'48px 24px', width:'100%', display:'grid', gridTemplateColumns:'1fr 1fr', gap:72, alignItems:'center' }}>
          <div>
            <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'rgba(34,211,238,0.1)', border:`1px solid rgba(34,211,238,0.35)`, borderRadius:100, padding:'6px 16px', fontSize:13, color:W.glow, marginBottom:28, fontWeight:600, boxShadow:`0 0 20px rgba(34,211,238,0.1)` }}>
              <Activity size={13}/> Industrial SCADA Platform
            </div>
            <h1 style={{ fontSize:'clamp(36px,5vw,68px)', fontWeight:900, lineHeight:1.04, marginBottom:22, letterSpacing:'-1.5px' }}>
              <span style={{ background:`linear-gradient(135deg,${W.ice} 0%,${W.cyan} 40%,${W.glow} 70%,${W.blue} 100%)`, WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', filter:'drop-shadow(0 0 20px rgba(34,211,238,0.4))' }}>{heroTag}</span>
            </h1>
            <p style={{ fontSize:17, color:W.muted, lineHeight:1.78, marginBottom:16, maxWidth:490 }}>
              GALVON's unified SCADA platform monitors, controls, and optimises your critical industrial operations across power, flow, and process — 24/7/365.
            </p>
            <div style={{ display:'flex', gap:18, flexWrap:'wrap', marginBottom:36, fontSize:13, color:W.dim }}>
              {['500+ Facilities','99.9% Uptime','30+ Countries','IEC 62443'].map(t=>(
                <span key={t} style={{ display:'flex', alignItems:'center', gap:5 }}><CheckCircle size={12} style={{ color:W.cyan }}/>{t}</span>
              ))}
            </div>
            <div style={{ display:'flex', gap:14, flexWrap:'wrap' }}>
              <a href="#contact" style={{ display:'flex', alignItems:'center', gap:8, background:`linear-gradient(135deg,${W.blue},${W.cyan})`, color:'white', padding:'14px 28px', borderRadius:10, fontWeight:700, fontSize:15, textDecoration:'none', boxShadow:`0 6px 30px rgba(34,211,238,0.45)` }}>
                Schedule Live Demo <ArrowRight size={18}/>
              </a>
              <a href="#platform" style={{ display:'flex', alignItems:'center', gap:8, border:`1px solid rgba(34,211,238,0.3)`, color:W.muted, padding:'14px 24px', borderRadius:10, fontWeight:600, fontSize:15, textDecoration:'none', background:'rgba(34,211,238,0.04)' }}>
                <Download size={16}/> Technical Overview
              </a>
            </div>
            <div style={{ marginTop:20, fontSize:13, color:W.dim }}>
              <Phone size={13} style={{ display:'inline', marginRight:6, color:W.cyan }}/> WhatsApp: <a href="https://wa.me/919373111709" style={{ color:W.cyan, textDecoration:'none', fontWeight:600 }}>+91 93731 11709</a>
            </div>
          </div>
          <div style={{ display:'flex', justifyContent:'center' }}>
            <IceMockup/>
          </div>
        </div>
      </section>

      {/* ── CLIENT BAR ── */}
      <section style={{ background:W.bg2, padding:'28px 24px', borderBottom:`1px solid rgba(34,211,238,0.08)` }}>
        <div style={{ maxWidth:1280, margin:'0 auto', textAlign:'center' }}>
          <p style={{ fontSize:11, letterSpacing:3, color:W.dimmer, marginBottom:18 }}>TRUSTED BY INDIA'S LEADING INDUSTRIAL ORGANISATIONS</p>
          <div style={{ display:'flex', flexWrap:'wrap', justifyContent:'center', gap:'12px 40px' }}>
            {['Tata Power','L&T Hydrocarbon','NTPC','GAIL','Reliance Industries','BHEL'].map(n=>(
              <span key={n} style={{ fontSize:13, fontWeight:700, color:W.dimmer, letterSpacing:1 }}>{n}</span>
            ))}
          </div>
        </div>
      </section>

      <WaveDivider from={W.bg2} to={W.bg}/>

      {/* ── PROBLEM ── */}
      <section style={{ background:W.bg, padding:'88px 24px' }}>
        <div style={{ maxWidth:1280, margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:56 }}>
            <div style={{ display:'inline-block', background:'rgba(34,211,238,0.08)', border:`1px solid rgba(34,211,238,0.25)`, borderRadius:100, padding:'5px 18px', fontSize:11, color:W.glow, fontWeight:700, letterSpacing:3, marginBottom:16 }}>THE PROBLEM</div>
            <h2 style={{ fontSize:'clamp(28px,4vw,46px)', fontWeight:900, marginBottom:12 }}>Industrial Operations Can't Afford Blind Spots</h2>
            <p style={{ color:W.muted, maxWidth:520, margin:'0 auto', fontSize:16, lineHeight:1.7 }}>Legacy monitoring creates dangerous gaps. GALVON was built to close them.</p>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:22 }}>
            {problems.map(p=>(
              <div key={p.label} style={{ background:'rgba(14,165,233,0.04)', border:`1px solid rgba(34,211,238,0.14)`, borderRadius:18, padding:'34px 28px', transition:'all .3s' }}
                onMouseOver={e=>{e.currentTarget.style.borderColor='rgba(34,211,238,0.4)';e.currentTarget.style.background='rgba(34,211,238,0.07)';e.currentTarget.style.boxShadow=`0 0 30px rgba(34,211,238,0.1)`}}
                onMouseOut={e=>{e.currentTarget.style.borderColor='rgba(34,211,238,0.14)';e.currentTarget.style.background='rgba(14,165,233,0.04)';e.currentTarget.style.boxShadow='none'}}>
                <div style={{ width:54, height:54, borderRadius:15, background:'rgba(34,211,238,0.1)', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:18, boxShadow:`0 0 20px rgba(34,211,238,0.15)` }}>
                  <p.icon size={25} style={{ color:W.cyan }}/>
                </div>
                <div style={{ fontSize:44, fontWeight:900, background:`linear-gradient(135deg,${W.ice},${W.glow})`, WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', marginBottom:10, filter:'drop-shadow(0 0 8px rgba(34,211,238,0.3))' }}>{p.stat}</div>
                <p style={{ color:W.muted, fontSize:15, lineHeight:1.65 }}>{p.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WaveDivider from={W.bg} to={W.bg3}/>

      {/* ── PLATFORM SUITE ── */}
      <section id="platform" style={{ background:W.bg3, padding:'88px 24px' }}>
        <div style={{ maxWidth:1280, margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:56 }}>
            <div style={{ display:'inline-block', background:'rgba(6,182,212,0.08)', border:`1px solid rgba(6,182,212,0.28)`, borderRadius:100, padding:'5px 18px', fontSize:11, color:W.teal, fontWeight:700, letterSpacing:3, marginBottom:16 }}>THE SUITE</div>
            <h2 style={{ fontSize:'clamp(28px,4vw,46px)', fontWeight:900, marginBottom:12 }}>One Platform. Three Specialised Verticals.</h2>
            <p style={{ color:W.muted, maxWidth:520, margin:'0 auto', fontSize:16 }}>Complete industrial control — power, flow, and process — unified under one ecosystem.</p>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(310px,1fr))', gap:22 }}>
            {products.map(p=>(
              <div key={p.name} style={{ background:'rgba(14,165,233,0.04)', border:`1px solid ${p.color}28`, borderRadius:22, padding:34, transition:'all .3s', cursor:'default' }}
                onMouseOver={e=>{e.currentTarget.style.borderColor=`${p.color}65`;e.currentTarget.style.background=`${p.color}07`;e.currentTarget.style.transform='translateY(-6px)';e.currentTarget.style.boxShadow=`0 20px 50px rgba(0,0,0,0.3),0 0 40px ${p.color}14`}}
                onMouseOut={e=>{e.currentTarget.style.borderColor=`${p.color}28`;e.currentTarget.style.background='rgba(14,165,233,0.04)';e.currentTarget.style.transform='translateY(0)';e.currentTarget.style.boxShadow='none'}}>
                <div style={{ width:58, height:58, borderRadius:17, background:`${p.color}12`, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:22, boxShadow:`0 0 24px ${p.color}25` }}>
                  <p.icon size={27} style={{ color:p.color }}/>
                </div>
                <div style={{ fontSize:11, color:p.color, fontWeight:700, letterSpacing:3, marginBottom:7 }}>{p.sub.toUpperCase()}</div>
                <h3 style={{ fontSize:26, fontWeight:900, marginBottom:13 }}>{p.name}</h3>
                <p style={{ color:W.muted, lineHeight:1.68, marginBottom:18, fontSize:15 }}>{p.desc}</p>
                <div style={{ background:'rgba(255,255,255,0.03)', borderRadius:11, padding:'13px 15px', marginBottom:22, border:`1px solid ${p.color}18` }}>
                  <div style={{ fontSize:10, color:p.color, fontWeight:700, marginBottom:5, letterSpacing:2 }}>USE CASE</div>
                  <p style={{ color:W.muted, fontSize:13, lineHeight:1.55 }}>{p.useCase}</p>
                </div>
                <a href={(p as {url?:string}).url || `#${p.name.toLowerCase()}`} target={(p as {url?:string}).url ? '_blank' : undefined} rel={(p as {url?:string}).url ? 'noopener noreferrer' : undefined} style={{ display:'flex', alignItems:'center', gap:6, color:p.color, fontSize:14, fontWeight:700, textDecoration:'none' }}>
                  Explore {p.name} <ChevronRight size={16}/>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WaveDivider from={W.bg3} to={W.bg}/>

      {/* ── ROI ── */}
      <section style={{ background:W.bg, padding:'88px 24px' }}>
        <div style={{ maxWidth:1280, margin:'0 auto', display:'grid', gridTemplateColumns:'1fr 1fr', gap:72, alignItems:'center' }}>
          <div>
            <div style={{ display:'inline-block', background:'rgba(103,232,249,0.08)', border:`1px solid rgba(103,232,249,0.28)`, borderRadius:100, padding:'5px 18px', fontSize:11, color:W.glow, fontWeight:700, letterSpacing:3, marginBottom:16 }}>PROVEN ROI</div>
            <h2 style={{ fontSize:'clamp(28px,4vw,46px)', fontWeight:900, marginBottom:18 }}>The GALVON Impact — By the Numbers</h2>
            <p style={{ color:W.muted, fontSize:16, lineHeight:1.78, marginBottom:30 }}>Every rupee invested in GALVON delivers measurable return through reduced downtime, lower energy costs, and improved OEE.</p>
            <a href="#contact" style={{ display:'inline-flex', alignItems:'center', gap:8, background:`linear-gradient(135deg,${W.blue},${W.cyan})`, color:'white', padding:'13px 28px', borderRadius:10, fontWeight:700, fontSize:15, textDecoration:'none', boxShadow:`0 6px 24px rgba(34,211,238,0.35)` }}>
              Calculate Your ROI <ArrowRight size={17}/>
            </a>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:18 }}>
            {stats.map(s=>(
              <div key={s.label} style={{ background:s.hi?`linear-gradient(135deg,rgba(14,165,233,0.22),rgba(34,211,238,0.12))`:'rgba(255,255,255,0.03)', border:s.hi?`1px solid rgba(34,211,238,0.38)`:`1px solid rgba(255,255,255,0.07)`, borderRadius:18, padding:'30px 24px', boxShadow:s.hi?`0 0 30px rgba(34,211,238,0.1)`:undefined }}>
                <div style={{ fontSize:38, fontWeight:900, background:`linear-gradient(135deg,${W.ice},${W.glow})`, WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', marginBottom:9, filter:s.hi?'drop-shadow(0 0 8px rgba(34,211,238,0.35))':undefined }}>{s.val}</div>
                <p style={{ color:W.muted, fontSize:14, lineHeight:1.5 }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WaveDivider from={W.bg} to={W.bg3}/>

      {/* ── FEATURES ── */}
      <section id="features" style={{ background:W.bg3, padding:'88px 24px' }}>
        <div style={{ maxWidth:1280, margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:56 }}>
            <h2 style={{ fontSize:'clamp(28px,4vw,46px)', fontWeight:900, marginBottom:12 }}>Built for Industrial-Grade Performance</h2>
            <p style={{ color:W.muted, maxWidth:500, margin:'0 auto', fontSize:16 }}>Engineered for environments where failure has real-world consequences.</p>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(270px,1fr))', gap:20 }}>
            {features.map(f=>(
              <div key={f.title} style={{ background:'rgba(14,165,233,0.04)', border:`1px solid rgba(34,211,238,0.1)`, borderRadius:18, padding:28, transition:'all .28s' }}
                onMouseOver={e=>{e.currentTarget.style.borderColor=`${f.c}55`;e.currentTarget.style.background=`${f.c}07`;e.currentTarget.style.transform='translateY(-4px)';e.currentTarget.style.boxShadow=`0 0 30px ${f.c}12`}}
                onMouseOut={e=>{e.currentTarget.style.borderColor='rgba(34,211,238,0.1)';e.currentTarget.style.background='rgba(14,165,233,0.04)';e.currentTarget.style.transform='translateY(0)';e.currentTarget.style.boxShadow='none'}}>
                <div style={{ width:50, height:50, borderRadius:14, background:`${f.c}12`, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:18, boxShadow:`0 0 16px ${f.c}20` }}>
                  <f.icon size={23} style={{ color:f.c }}/>
                </div>
                <h3 style={{ fontWeight:700, fontSize:16, marginBottom:9 }}>{f.title}</h3>
                <p style={{ color:W.muted, fontSize:14, lineHeight:1.67 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WaveDivider from={W.bg3} to={W.bg}/>

      {/* ── INDUSTRIES ── */}
      <section id="industries" style={{ background:W.bg, padding:'88px 24px' }}>
        <div style={{ maxWidth:1280, margin:'0 auto', textAlign:'center' }}>
          <h2 style={{ fontSize:'clamp(28px,4vw,46px)', fontWeight:900, marginBottom:12 }}>Industries We Power</h2>
          <p style={{ color:W.muted, marginBottom:48, fontSize:16 }}>GALVON adapts to every industrial vertical — from megawatt power plants to precision pharma lines.</p>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(145px,1fr))', gap:14 }}>
            {industries.map((ind,idx)=>(
              <div key={ind.label} style={{ border:`1px solid rgba(34,211,238,0.12)`, borderRadius:15, padding:'24px 12px', transition:'all .25s', background:'rgba(14,165,233,0.02)' }}
                onMouseOver={e=>{e.currentTarget.style.borderColor=idx%2===0?W.cyan:W.teal;e.currentTarget.style.background=idx%2===0?`${W.cyan}08`:`${W.teal}08`;e.currentTarget.style.transform='scale(1.05)';e.currentTarget.style.boxShadow=`0 0 20px rgba(34,211,238,0.1)`}}
                onMouseOut={e=>{e.currentTarget.style.borderColor='rgba(34,211,238,0.12)';e.currentTarget.style.background='rgba(14,165,233,0.02)';e.currentTarget.style.transform='scale(1)';e.currentTarget.style.boxShadow='none'}}>
                <ind.icon size={29} style={{ color:idx%2===0?W.cyan:W.teal, marginBottom:11 }}/>
                <div style={{ fontSize:13, fontWeight:600, color:W.muted }}>{ind.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WaveDivider from={W.bg} to={W.bg3}/>

      {/* ── INTEGRATIONS ── */}
      <section id="integrations" style={{ background:W.bg3, padding:'88px 24px' }}>
        <div style={{ maxWidth:900, margin:'0 auto', textAlign:'center' }}>
          <h2 style={{ fontSize:'clamp(26px,4vw,42px)', fontWeight:900, marginBottom:12 }}>Seamless Integration with Your Existing Infrastructure</h2>
          <p style={{ color:W.muted, marginBottom:48, fontSize:16 }}>No rip-and-replace. GALVON connects natively to every major industrial protocol and platform.</p>
          <div style={{ display:'flex', flexWrap:'wrap', justifyContent:'center', gap:13 }}>
            {integrations.map(n=>(
              <div key={n} style={{ background:'rgba(14,165,233,0.05)', border:`1px solid rgba(34,211,238,0.18)`, borderRadius:10, padding:'10px 22px', color:W.muted, fontWeight:600, fontSize:14, transition:'all .2s' }}
                onMouseOver={e=>{e.currentTarget.style.borderColor=W.cyan;e.currentTarget.style.color=W.glow;e.currentTarget.style.background='rgba(34,211,238,0.08)';e.currentTarget.style.boxShadow=`0 0 15px rgba(34,211,238,0.12)`}}
                onMouseOut={e=>{e.currentTarget.style.borderColor='rgba(34,211,238,0.18)';e.currentTarget.style.color=W.muted;e.currentTarget.style.background='rgba(14,165,233,0.05)';e.currentTarget.style.boxShadow='none'}}>
                {n}
              </div>
            ))}
          </div>
        </div>
      </section>

      <WaveDivider from={W.bg3} to='#010c1a'/>

      {/* ── CTA ── */}
      <section id="contact" style={{ background:'#010c1a', padding:'110px 24px', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, background:`radial-gradient(ellipse at 50% 50%,rgba(34,211,238,0.15) 0%,rgba(14,165,233,0.06) 40%,transparent 70%)`, pointerEvents:'none' }}/>
        <div style={{ position:'absolute', top:0, left:0, right:0, height:1, background:`linear-gradient(90deg,transparent,rgba(34,211,238,0.35),transparent)`, pointerEvents:'none' }}/>
        <div style={{ position:'absolute', bottom:0, left:0, right:0, height:1, background:`linear-gradient(90deg,transparent,rgba(14,165,233,0.2),transparent)`, pointerEvents:'none' }}/>
        <div style={{ maxWidth:680, margin:'0 auto', textAlign:'center', position:'relative', zIndex:1 }}>
          <div style={{ width:64, height:64, borderRadius:'50%', background:`radial-gradient(circle,rgba(34,211,238,0.2),rgba(14,165,233,0.1))`, border:`1px solid rgba(34,211,238,0.35)`, display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 28px', boxShadow:`0 0 40px rgba(34,211,238,0.25)` }}>
            <CheckCircle size={30} style={{ color:W.glow }}/>
          </div>
          <h2 style={{ fontSize:'clamp(30px,5vw,54px)', fontWeight:900, lineHeight:1.1, marginBottom:22, background:`linear-gradient(135deg,${W.white},${W.ice},${W.cyan})`, WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>
            Ready to Transform Your Operations?
          </h2>
          <p style={{ color:W.muted, fontSize:17, lineHeight:1.78, marginBottom:42 }}>Join 500+ facilities worldwide running on GALVON. Live demo tailored to your industry within 24 hours.</p>
          <div style={{ display:'flex', gap:14, justifyContent:'center', flexWrap:'wrap' }}>
            <a href="mailto:hello@galvon.com" style={{ display:'inline-flex', alignItems:'center', gap:10, background:`linear-gradient(135deg,${W.blue},${W.cyan})`, color:'white', padding:'16px 38px', borderRadius:12, fontWeight:800, fontSize:17, textDecoration:'none', boxShadow:`0 8px 32px rgba(34,211,238,0.45)` }}>
              Schedule a Demo <ArrowRight size={20}/>
            </a>
            <a href="https://wa.me/919373111709" style={{ display:'inline-flex', alignItems:'center', gap:8, border:`1px solid rgba(34,211,238,0.3)`, color:W.muted, padding:'16px 28px', borderRadius:12, fontWeight:600, fontSize:16, textDecoration:'none', background:'rgba(34,211,238,0.04)' }}>
              <Phone size={18}/> WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background:W.bg, borderTop:`1px solid rgba(34,211,238,0.1)`, padding:'42px 24px' }}>
        <div style={{ maxWidth:1280, margin:'0 auto', display:'flex', flexWrap:'wrap', alignItems:'center', justifyContent:'space-between', gap:22 }}>
          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
            <div style={{ width:34, height:34, borderRadius:10, background:`linear-gradient(135deg,${W.blue},${W.glow})`, display:'flex', alignItems:'center', justifyContent:'center', boxShadow:`0 0 16px rgba(34,211,238,0.4)` }}>
              <Zap size={16} color="white"/>
            </div>
            <span style={{ fontWeight:900, letterSpacing:5, fontSize:18, background:`linear-gradient(90deg,${W.ice},${W.cyan})`, WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>GALVON</span>
          </div>
          <div style={{ display:'flex', gap:26, fontSize:13, color:W.dim }}>
            {['Ampris','FlowNexus','NexaProc','Industries','About','Contact'].map(n=><a key={n} href={`#${n.toLowerCase()}`} style={{ textDecoration:'none', color:W.dim, transition:'color .2s' }} onMouseOver={e=>(e.currentTarget.style.color=W.glow)} onMouseOut={e=>(e.currentTarget.style.color=W.dim)}>{n}</a>)}
          </div>
          <div style={{ textAlign:'right' }}>
            <div style={{ color:W.dim, fontSize:13 }}>drmhope.com | A Bettroi Product</div>
            <div style={{ color:W.dimmer, fontSize:11, marginTop:4 }}>v{VERSION} | {BUILD_DATE} | galvon</div>
          </div>
        </div>
      </footer>
    </div>
  )
}
