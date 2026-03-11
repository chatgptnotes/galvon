import { useState, useEffect } from 'react'
import { Zap, Droplets, Factory, Activity, Shield, Globe, ArrowRight, Building2, Flame, FlaskConical, Waves, CheckCircle, Menu, X, Cpu, Network, Lock, Layers, TrendingDown, AlertTriangle, DollarSign, Phone, Download, ChevronRight } from 'lucide-react'

const VERSION = '1.2'; const BUILD_DATE = 'March 2026'
const GEMINI_KEY = import.meta.env.VITE_GEMINI_API_KEY
async function fetchGeminiText(prompt: string, fallback: string): Promise<string> {
  if (!GEMINI_KEY) return fallback
  try {
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_KEY}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }) })
    const data = await res.json()
    return data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || fallback
  } catch { return fallback }
}

// ── VOID PHOENIX palette ──────────────────────────────────────────────────────
const V = { bg:'#030014', bg2:'#0a0228', purple:'#7c3aed', cyan:'#06b6d4', lavender:'#a855f7', light:'#c084fc', white:'#ffffff', muted:'rgba(255,255,255,0.55)', dim:'rgba(255,255,255,0.3)' }

function WaveDivider({ from, to, flip=false }:{ from:string; to:string; flip?:boolean }) {
  return (
    <div style={{ background:to, lineHeight:0 }} className={flip?'rotate-180':''}>
      <svg viewBox="0 0 1440 70" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" width="100%" height="70">
        <path d="M0,35 Q360,70 720,35 Q1080,0 1440,35 L1440,0 L0,0 Z" fill={from}/>
      </svg>
    </div>
  )
}

function ControlCenterMockup() {
  const bars = [55,72,48,80,63,88,70]
  const line = [62,58,55,60,52,48,45,50,43,46,40]
  return (
    <div style={{ position:'relative', width:'100%', maxWidth:560 }}>
      <div style={{ position:'absolute', inset:-30, borderRadius:24, background:`radial-gradient(ellipse at 50% 40%, rgba(124,58,237,0.3) 0%, transparent 70%)`, filter:'blur(30px)', pointerEvents:'none' }}/>
      <svg viewBox="0 0 540 420" style={{ width:'100%', display:'block', filter:'drop-shadow(0 20px 60px rgba(124,58,237,0.4))' }}>
        <rect x="0" y="0" width="540" height="420" rx="14" fill="rgba(8,3,32,0.97)" stroke="rgba(124,58,237,0.45)" strokeWidth="1.5"/>
        {/* subtle scanlines */}
        {[...Array(20)].map((_,i)=><line key={i} x1="0" y1={i*22} x2="540" y2={i*22} stroke="rgba(124,58,237,0.03)" strokeWidth="1"/>)}
        <rect x="0" y="0" width="540" height="40" rx="14" fill="rgba(124,58,237,0.18)"/>
        <rect x="0" y="26" width="540" height="14" fill="rgba(124,58,237,0.18)"/>
        <circle cx="18" cy="20" r="5" fill="#ef4444" opacity="0.85"/>
        <circle cx="34" cy="20" r="5" fill="#f59e0b" opacity="0.85"/>
        <circle cx="50" cy="20" r="5" fill="#22c55e" opacity="0.85"/>
        <text x="72" y="20" fontFamily="monospace" fontSize="12" fill="rgba(255,255,255,0.7)" dominantBaseline="middle">GALVON · Unified Control Center  v2.4.1</text>
        <circle cx="504" cy="20" r="4" fill="#22c55e"/>
        <text x="514" y="20" fontFamily="monospace" fontSize="10" fill="#22c55e" dominantBaseline="middle">LIVE</text>
        {/* 3 product cards */}
        {[
          { x:10, label:'AMPRIS', sub:'Power SCADA', val:'98.4%', unit:'Uptime', color:V.cyan, trend:'+0.2%' },
          { x:192, label:'FLOWNEXUS', sub:'Flow SCADA', val:'3.41 MW', unit:'Throughput', color:'#38bdf8', trend:'Stable' },
          { x:374, label:'NEXAPROC', sub:'Process SCADA', val:'94.2%', unit:'OEE Score', color:V.light, trend:'+3.1%' },
        ].map((c,i)=>(
          <g key={i}>
            <rect x={c.x} y="50" width="158" height="88" rx="10" fill="rgba(255,255,255,0.025)" stroke={`${c.color}50`} strokeWidth="1"/>
            <rect x={c.x} y="50" width="158" height="28" rx="10" fill={`${c.color}15`}/>
            <rect x={c.x} y="66" width="158" height="12" fill={`${c.color}15`}/>
            <circle cx={c.x+12} cy="64" r="3.5" fill="#22c55e"/>
            <text x={c.x+22} y="64" fontFamily="monospace" fontSize="10" fontWeight="bold" fill={c.color} dominantBaseline="middle" letterSpacing="1">{c.label}</text>
            <text x={c.x+10} y="94" fontFamily="monospace" fontSize="20" fontWeight="900" fill="white" dominantBaseline="middle">{c.val}</text>
            <text x={c.x+10} y="113" fontFamily="monospace" fontSize="10" fill="rgba(255,255,255,0.35)" dominantBaseline="middle">{c.unit}</text>
            <rect x={c.x+100} y="106" width="50" height="16" rx="8" fill={`${c.color}18`} stroke={`${c.color}50`} strokeWidth="1"/>
            <text x={c.x+125} y="114" fontFamily="monospace" fontSize="9" fill={c.color} textAnchor="middle" dominantBaseline="middle">{c.trend}</text>
          </g>
        ))}
        {/* Alarms */}
        <text x="14" y="155" fontFamily="monospace" fontSize="9" fill={V.dim} letterSpacing="2">ACTIVE ALARMS</text>
        {[
          { col:'#22c55e', txt:'All Ampris substations normal — no faults detected' },
          { col:'#f59e0b', txt:'FlowNexus: Pump P-204 high vibration warning' },
          { col:'#ef4444', txt:'NexaProc: Reactor temp threshold breach — investigate' },
        ].map((a,i)=>(
          <g key={i}>
            <rect x="12" y={166+i*22} width="516" height="18" rx="4" fill="rgba(255,255,255,0.015)" stroke={`${a.col}25`} strokeWidth="1"/>
            <rect x="12" y={166+i*22} width="3" height="18" rx="1" fill={a.col}/>
            <text x="22" y={175+i*22} fontFamily="monospace" fontSize="10" fill="rgba(255,255,255,0.6)" dominantBaseline="middle">{a.txt}</text>
          </g>
        ))}
        <line x1="12" y1="234" x2="528" y2="234" stroke={`${V.purple}30`} strokeWidth="1"/>
        <text x="14" y="248" fontFamily="monospace" fontSize="9" fill={V.dim} letterSpacing="2">SYSTEM LOAD</text>
        {bars.map((h,i)=>(
          <g key={i}>
            <rect x={14+i*34} y={325-h} width="24" height={h} rx="3" fill={i%2===0?V.purple:V.cyan} opacity="0.75"/>
            <text x={14+i*34+12} y="335" fontFamily="monospace" fontSize="8" fill={V.dim} textAnchor="middle">D{i+1}</text>
          </g>
        ))}
        <text x="280" y="248" fontFamily="monospace" fontSize="9" fill={V.dim} letterSpacing="2">UPTIME TREND</text>
        <polyline points={`280,350 ${line.map((y,i)=>`${280+i*24},${y+278}`).join(' ')} 520,350`} fill={`${V.cyan}15`} stroke="none"/>
        <polyline points={line.map((y,i)=>`${280+i*24},${y+278}`).join(' ')} fill="none" stroke={V.cyan} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        {line.map((y,i)=><circle key={i} cx={280+i*24} cy={y+278} r="2.5" fill={V.cyan} opacity="0.8"/>)}
        <rect x="0" y="386" width="540" height="34" rx="0" fill={`${V.purple}10`}/>
        <rect x="0" y="400" width="540" height="20" rx="14" fill={`${V.purple}10`}/>
        <circle cx="18" cy="403" r="3" fill="#22c55e"/>
        <text x="28" y="403" fontFamily="monospace" fontSize="9" fill={V.dim} dominantBaseline="middle">3 sites · 847 tags · Last sync 0.3s · All systems operational</text>
      </svg>
    </div>
  )
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [heroTag, setHeroTag] = useState('Industrial Intelligence That Never Sleeps')
  useEffect(() => {
    fetchGeminiText('Write a powerful 6-7 word industrial B2B headline for GALVON SCADA platform. Dark, bold, cosmic feel. No quotes.', 'Industrial Intelligence That Never Sleeps').then(setHeroTag)
  }, [])

  const navLinks = ['Platform','Ampris','FlowNexus','NexaProc','Industries','Resources']

  const products = [
    { name:'Ampris', sub:'Power & Electrical SCADA', icon:Zap, color:V.cyan, desc:'Real-time monitoring, fault detection, load balancing, and energy analytics for substations, grids, and power utilities.', useCase:'Monitor a 50MW solar farm with 99.9% accuracy and predictive fault alerts.' },
    { name:'FlowNexus', sub:'Flow & Liquid SCADA', icon:Droplets, color:'#38bdf8', desc:'Pipeline monitoring, leak detection, pressure optimisation, and compliance reporting for water, wastewater, and fluid systems.', useCase:'Reduce non-revenue water losses by 30% across a 200km municipal network.' },
    { name:'NexaProc', sub:'Factory & Process SCADA', icon:Factory, color:V.light, desc:'Batch control, OEE tracking, recipe management, and quality monitoring for pharmaceutical, chemical, and manufacturing plants.', useCase:'Improve OEE from 62% to 78% in pharmaceutical manufacturing.' },
  ]

  const problems = [
    { icon:TrendingDown, stat:'₹40L+/hr', label:'Lost production cost from a single hour of unplanned downtime' },
    { icon:AlertTriangle, stat:'67%', label:'Of industrial incidents originate from fragmented monitoring systems' },
    { icon:DollarSign, stat:'3×', label:'Higher cost when scaling operations without a unified SCADA platform' },
  ]

  const features = [
    { icon:Activity, title:'Real-time SCADA', desc:'Sub-second telemetry from every PLC, RTU, DCS, and sensor across all sites.', c:V.cyan },
    { icon:Cpu, title:'AI Predictive Engine', desc:'Machine learning flags failures days before they cascade into downtime.', c:V.lavender },
    { icon:Shield, title:'IEC 62443 Compliant', desc:'End-to-end encryption, RBAC, audit trails, and industrial cybersecurity hardening.', c:V.cyan },
    { icon:Network, title:'Universal Protocols', desc:'OPC-UA, Modbus, MQTT, DNP3, IEC 61850 — connects to every major PLC brand.', c:V.lavender },
    { icon:Lock, title:'99.9% Uptime SLA', desc:'Hot-standby failover, edge processing, and 24/7 NOC monitoring included.', c:V.cyan },
    { icon:Globe, title:'Multi-site Unified', desc:'One command centre for 1 plant or 100 — with per-site drill-down.', c:V.lavender },
  ]

  const stats = [
    { val:'35%', label:'Reduction in unplanned downtime', dark:true },
    { val:'20%', label:'Improvement in energy efficiency', dark:false },
    { val:'₹2.5 Cr', label:'Average annual savings per facility', dark:true },
    { val:'500+', label:'Facilities running on GALVON', dark:false },
  ]

  const industries = [
    { icon:Zap, label:'Power Utilities' }, { icon:Flame, label:'Oil and Gas' },
    { icon:Waves, label:'Water Treatment' }, { icon:Factory, label:'Manufacturing' },
    { icon:FlaskConical, label:'Pharmaceuticals' }, { icon:Building2, label:'Food and Beverage' },
    { icon:Globe, label:'Smart Cities' }, { icon:Layers, label:'Mining and Metals' },
  ]

  const integrations = ['Siemens S7','Allen Bradley','Schneider','OPC-UA','Modbus TCP/RTU','MQTT','DNP3','IEC 61850','SAP ERP','REST API']

  return (
    <div style={{ fontFamily:"'Inter',system-ui,sans-serif", background:V.bg, color:V.white, minHeight:'100vh' }}>

      {/* ── NAV ── */}
      <nav style={{ position:'fixed', top:0, width:'100%', zIndex:50, background:'rgba(3,0,20,0.88)', backdropFilter:'blur(20px)', borderBottom:`1px solid rgba(124,58,237,0.2)` }}>
        <div style={{ maxWidth:1280, margin:'0 auto', padding:'0 24px', height:64, display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
            <div style={{ width:36, height:36, borderRadius:10, background:`linear-gradient(135deg,${V.purple},${V.cyan})`, display:'flex', alignItems:'center', justifyContent:'center', boxShadow:`0 0 20px rgba(124,58,237,0.5)` }}>
              <Zap size={18} color="white"/>
            </div>
            <span style={{ fontWeight:900, fontSize:20, letterSpacing:5 }}>GALVON</span>
          </div>
          <div className="hidden md:flex" style={{ gap:28, fontSize:14, color:V.muted, alignItems:'center' }}>
            {navLinks.map(l=><a key={l} href={`#${l.toLowerCase()}`} style={{ textDecoration:'none', color:V.muted, transition:'color .2s' }} onMouseOver={e=>(e.currentTarget.style.color=V.cyan)} onMouseOut={e=>(e.currentTarget.style.color=V.muted)}>{l}</a>)}
            <a href="#contact" style={{ background:`linear-gradient(135deg,${V.purple},${V.cyan})`, color:'white', padding:'9px 22px', borderRadius:8, fontWeight:700, textDecoration:'none', boxShadow:`0 0 20px rgba(124,58,237,0.35)` }}>Request Demo</a>
          </div>
          <button className="md:hidden" style={{ color:V.white, background:'none', border:'none', cursor:'pointer' }} onClick={()=>setMenuOpen(!menuOpen)}>{menuOpen?<X size={22}/>:<Menu size={22}/>}</button>
        </div>
        {menuOpen&&<div style={{ borderTop:`1px solid rgba(124,58,237,0.15)`, padding:'16px 24px', display:'flex', flexDirection:'column', gap:14 }}>
          {navLinks.map(l=><a key={l} href={`#${l.toLowerCase()}`} onClick={()=>setMenuOpen(false)} style={{ textDecoration:'none', color:V.muted, fontSize:15 }}>{l}</a>)}
          <a href="#contact" style={{ background:`linear-gradient(135deg,${V.purple},${V.cyan})`, color:'white', padding:'10px 20px', borderRadius:8, fontWeight:700, textDecoration:'none', textAlign:'center' }} onClick={()=>setMenuOpen(false)}>Request Demo</a>
        </div>}
      </nav>

      {/* ── HERO ── */}
      <section style={{ minHeight:'100vh', position:'relative', display:'flex', alignItems:'center', paddingTop:80, overflow:'hidden', background:`linear-gradient(160deg,#030014 0%,#0a0228 60%,#050115 100%)` }}>
        {/* Void orbs */}
        <div style={{ position:'absolute', top:'8%', right:'3%', width:500, height:500, borderRadius:'50%', background:`radial-gradient(circle,rgba(124,58,237,0.2) 0%,transparent 70%)`, filter:'blur(60px)', pointerEvents:'none' }}/>
        <div style={{ position:'absolute', bottom:'15%', left:'2%', width:350, height:350, borderRadius:'50%', background:`radial-gradient(circle,rgba(6,182,212,0.15) 0%,transparent 70%)`, filter:'blur(50px)', pointerEvents:'none' }}/>
        <div style={{ position:'absolute', top:'40%', left:'40%', width:250, height:250, borderRadius:'50%', background:`radial-gradient(circle,rgba(168,85,247,0.1) 0%,transparent 70%)`, filter:'blur(40px)', pointerEvents:'none' }}/>
        {/* Star particles */}
        {[...Array(35)].map((_,i)=><div key={i} style={{ position:'absolute', left:`${(i*37+11)%100}%`, top:`${(i*53+7)%100}%`, width:i%5===0?3:i%3===0?2:1, height:i%5===0?3:i%3===0?2:1, borderRadius:'50%', background:i%2===0?V.cyan:V.light, opacity:0.2+(i%5)*0.07, pointerEvents:'none' }}/>)}
        {/* Grid */}
        <div style={{ position:'absolute', inset:0, backgroundImage:`linear-gradient(rgba(124,58,237,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(124,58,237,0.04) 1px,transparent 1px)`, backgroundSize:'64px 64px', pointerEvents:'none' }}/>

        <div style={{ maxWidth:1280, margin:'0 auto', padding:'48px 24px', width:'100%', display:'grid', gridTemplateColumns:'1fr 1fr', gap:64, alignItems:'center' }}>
          <div>
            <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'rgba(124,58,237,0.12)', border:`1px solid rgba(124,58,237,0.4)`, borderRadius:100, padding:'6px 16px', fontSize:13, color:V.light, marginBottom:28, fontWeight:600 }}>
              <Activity size={13}/> Industrial SCADA Platform
            </div>
            <h1 style={{ fontSize:'clamp(36px,5vw,66px)', fontWeight:900, lineHeight:1.05, marginBottom:20, letterSpacing:'-1px' }}>
              <span style={{ background:`linear-gradient(135deg,${V.white},rgba(255,255,255,0.85))`, WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>{heroTag}</span>
            </h1>
            <p style={{ fontSize:17, color:V.muted, lineHeight:1.75, marginBottom:14, maxWidth:480 }}>
              GALVON's unified SCADA platform monitors, controls, and optimises your critical industrial operations across power, flow, and process — 24/7/365.
            </p>
            {/* Trust bar */}
            <div style={{ display:'flex', gap:18, flexWrap:'wrap', marginBottom:36, fontSize:13, color:V.dim }}>
              {['500+ Facilities','99.9% Uptime','30+ Countries','IEC 62443'].map(t=>(
                <span key={t} style={{ display:'flex', alignItems:'center', gap:5 }}><CheckCircle size={12} style={{ color:V.cyan }}/>{t}</span>
              ))}
            </div>
            <div style={{ display:'flex', gap:14, flexWrap:'wrap' }}>
              <a href="#contact" style={{ display:'flex', alignItems:'center', gap:8, background:`linear-gradient(135deg,${V.purple},${V.cyan})`, color:'white', padding:'14px 28px', borderRadius:10, fontWeight:700, fontSize:15, textDecoration:'none', boxShadow:`0 6px 24px rgba(124,58,237,0.45)` }}>
                Schedule Live Demo <ArrowRight size={18}/>
              </a>
              <a href="#platform" style={{ display:'flex', alignItems:'center', gap:8, border:`1px solid rgba(124,58,237,0.4)`, color:V.muted, padding:'14px 24px', borderRadius:10, fontWeight:600, fontSize:15, textDecoration:'none' }}>
                <Download size={16}/> Technical Overview
              </a>
            </div>
            <div style={{ marginTop:20, fontSize:13, color:V.dim }}>
              <Phone size={13} style={{ display:'inline', marginRight:6, color:V.cyan }}/> WhatsApp: <a href="https://wa.me/919373111709" style={{ color:V.cyan, textDecoration:'none' }}>+91 93731 11709</a>
            </div>
          </div>
          <div style={{ display:'flex', justifyContent:'center' }}>
            <ControlCenterMockup/>
          </div>
        </div>
      </section>

      {/* ── CLIENT BAR ── */}
      <section style={{ background:V.bg2, padding:'28px 24px', borderBottom:`1px solid rgba(124,58,237,0.1)` }}>
        <div style={{ maxWidth:1280, margin:'0 auto', textAlign:'center' }}>
          <p style={{ fontSize:11, letterSpacing:3, color:V.dim, marginBottom:18 }}>TRUSTED BY INDIA'S LEADING INDUSTRIAL ORGANISATIONS</p>
          <div style={{ display:'flex', flexWrap:'wrap', justifyContent:'center', gap:'14px 36px' }}>
            {['Tata Power','L&T Hydrocarbon','NTPC','GAIL','Reliance Industries','BHEL'].map(n=>(
              <span key={n} style={{ fontSize:13, fontWeight:700, color:'rgba(255,255,255,0.15)', letterSpacing:1 }}>{n}</span>
            ))}
          </div>
        </div>
      </section>

      <WaveDivider from={V.bg2} to={V.bg}/>

      {/* ── PROBLEM ── */}
      <section style={{ background:V.bg, padding:'80px 24px' }}>
        <div style={{ maxWidth:1280, margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:52 }}>
            <div style={{ display:'inline-block', background:'rgba(124,58,237,0.1)', border:`1px solid rgba(124,58,237,0.3)`, borderRadius:100, padding:'5px 18px', fontSize:11, color:V.light, fontWeight:700, letterSpacing:3, marginBottom:16 }}>THE PROBLEM</div>
            <h2 style={{ fontSize:'clamp(28px,4vw,44px)', fontWeight:900, marginBottom:12 }}>Industrial Operations Can't Afford Blind Spots</h2>
            <p style={{ color:V.muted, maxWidth:520, margin:'0 auto', fontSize:16, lineHeight:1.7 }}>Legacy monitoring creates dangerous gaps. GALVON was built to close them.</p>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:20 }}>
            {problems.map(p=>(
              <div key={p.label} style={{ background:'rgba(255,255,255,0.02)', border:`1px solid rgba(124,58,237,0.18)`, borderRadius:16, padding:'32px 28px' }}>
                <div style={{ width:52, height:52, borderRadius:14, background:'rgba(124,58,237,0.12)', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:16 }}>
                  <p.icon size={24} style={{ color:V.light }}/>
                </div>
                <div style={{ fontSize:40, fontWeight:900, background:`linear-gradient(135deg,${V.light},${V.cyan})`, WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', marginBottom:8 }}>{p.stat}</div>
                <p style={{ color:V.muted, fontSize:15, lineHeight:1.6 }}>{p.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WaveDivider from={V.bg} to={V.bg2}/>

      {/* ── PLATFORM ── */}
      <section id="platform" style={{ background:V.bg2, padding:'80px 24px' }}>
        <div style={{ maxWidth:1280, margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:52 }}>
            <div style={{ display:'inline-block', background:'rgba(6,182,212,0.08)', border:`1px solid rgba(6,182,212,0.3)`, borderRadius:100, padding:'5px 18px', fontSize:11, color:V.cyan, fontWeight:700, letterSpacing:3, marginBottom:16 }}>THE SUITE</div>
            <h2 style={{ fontSize:'clamp(28px,4vw,44px)', fontWeight:900, marginBottom:12 }}>One Platform. Three Specialised Verticals.</h2>
            <p style={{ color:V.muted, maxWidth:520, margin:'0 auto', fontSize:16 }}>Complete industrial control — power, flow, and process — unified under one ecosystem.</p>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))', gap:20 }}>
            {products.map(p=>(
              <div key={p.name} style={{ background:'rgba(255,255,255,0.02)', border:`1px solid ${p.color}30`, borderRadius:20, padding:32, transition:'all .3s', cursor:'default' }}
                onMouseOver={e=>{e.currentTarget.style.borderColor=`${p.color}70`;e.currentTarget.style.background='rgba(255,255,255,0.04)';e.currentTarget.style.transform='translateY(-5px)';e.currentTarget.style.boxShadow=`0 16px 40px rgba(0,0,0,0.3)`}}
                onMouseOut={e=>{e.currentTarget.style.borderColor=`${p.color}30`;e.currentTarget.style.background='rgba(255,255,255,0.02)';e.currentTarget.style.transform='translateY(0)';e.currentTarget.style.boxShadow='none'}}>
                <div style={{ width:56, height:56, borderRadius:16, background:`${p.color}12`, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:20 }}>
                  <p.icon size={26} style={{ color:p.color }}/>
                </div>
                <div style={{ fontSize:11, color:p.color, fontWeight:700, letterSpacing:3, marginBottom:6 }}>{p.sub.toUpperCase()}</div>
                <h3 style={{ fontSize:24, fontWeight:900, marginBottom:12 }}>{p.name}</h3>
                <p style={{ color:V.muted, lineHeight:1.65, marginBottom:16, fontSize:15 }}>{p.desc}</p>
                <div style={{ background:'rgba(255,255,255,0.03)', borderRadius:10, padding:'12px 14px', marginBottom:20, border:`1px solid ${p.color}20` }}>
                  <div style={{ fontSize:10, color:p.color, fontWeight:700, marginBottom:4, letterSpacing:2 }}>USE CASE</div>
                  <p style={{ color:V.muted, fontSize:13, lineHeight:1.5 }}>{p.useCase}</p>
                </div>
                <a href={`#${p.name.toLowerCase()}`} style={{ display:'flex', alignItems:'center', gap:6, color:p.color, fontSize:14, fontWeight:700, textDecoration:'none' }}>
                  Explore {p.name} <ChevronRight size={16}/>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WaveDivider from={V.bg2} to={V.bg}/>

      {/* ── ROI ── */}
      <section style={{ background:V.bg, padding:'80px 24px' }}>
        <div style={{ maxWidth:1280, margin:'0 auto', display:'grid', gridTemplateColumns:'1fr 1fr', gap:64, alignItems:'center' }}>
          <div>
            <div style={{ display:'inline-block', background:'rgba(168,85,247,0.1)', border:`1px solid rgba(168,85,247,0.3)`, borderRadius:100, padding:'5px 18px', fontSize:11, color:V.lavender, fontWeight:700, letterSpacing:3, marginBottom:16 }}>PROVEN ROI</div>
            <h2 style={{ fontSize:'clamp(28px,4vw,44px)', fontWeight:900, marginBottom:16 }}>The GALVON Impact — By the Numbers</h2>
            <p style={{ color:V.muted, fontSize:16, lineHeight:1.75, marginBottom:28 }}>Every rupee invested in GALVON delivers measurable return through reduced downtime, lower energy costs, and improved OEE.</p>
            <a href="#contact" style={{ display:'inline-flex', alignItems:'center', gap:8, background:`linear-gradient(135deg,${V.purple},${V.cyan})`, color:'white', padding:'13px 26px', borderRadius:10, fontWeight:700, fontSize:15, textDecoration:'none' }}>
              Calculate Your ROI <ArrowRight size={17}/>
            </a>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
            {stats.map((s)=>(
              <div key={s.label} style={{ background:s.dark?`linear-gradient(135deg,rgba(124,58,237,0.3),rgba(6,182,212,0.15))`:'rgba(255,255,255,0.03)', border:s.dark?`1px solid rgba(124,58,237,0.35)`:`1px solid rgba(255,255,255,0.06)`, borderRadius:16, padding:'28px 22px' }}>
                <div style={{ fontSize:36, fontWeight:900, background:`linear-gradient(135deg,${V.light},${V.cyan})`, WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', marginBottom:8 }}>{s.val}</div>
                <p style={{ color:V.muted, fontSize:14, lineHeight:1.5 }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WaveDivider from={V.bg} to={V.bg2}/>

      {/* ── FEATURES ── */}
      <section id="features" style={{ background:V.bg2, padding:'80px 24px' }}>
        <div style={{ maxWidth:1280, margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:52 }}>
            <h2 style={{ fontSize:'clamp(28px,4vw,44px)', fontWeight:900, marginBottom:12 }}>Built for Industrial-Grade Performance</h2>
            <p style={{ color:V.muted, maxWidth:500, margin:'0 auto', fontSize:16 }}>Engineered for environments where failure has real-world consequences.</p>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))', gap:18 }}>
            {features.map(f=>(
              <div key={f.title} style={{ background:'rgba(255,255,255,0.02)', border:`1px solid rgba(124,58,237,0.12)`, borderRadius:16, padding:26, transition:'all .25s' }}
                onMouseOver={e=>{e.currentTarget.style.borderColor=`${f.c}60`;e.currentTarget.style.background=`${f.c}08`;e.currentTarget.style.transform='translateY(-3px)'}}
                onMouseOut={e=>{e.currentTarget.style.borderColor='rgba(124,58,237,0.12)';e.currentTarget.style.background='rgba(255,255,255,0.02)';e.currentTarget.style.transform='translateY(0)'}}>
                <div style={{ width:48, height:48, borderRadius:12, background:`${f.c}12`, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:16 }}>
                  <f.icon size={22} style={{ color:f.c }}/>
                </div>
                <h3 style={{ fontWeight:700, fontSize:16, marginBottom:8 }}>{f.title}</h3>
                <p style={{ color:V.muted, fontSize:14, lineHeight:1.65 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WaveDivider from={V.bg2} to={V.bg}/>

      {/* ── INDUSTRIES ── */}
      <section id="industries" style={{ background:V.bg, padding:'80px 24px' }}>
        <div style={{ maxWidth:1280, margin:'0 auto', textAlign:'center' }}>
          <h2 style={{ fontSize:'clamp(28px,4vw,44px)', fontWeight:900, marginBottom:12 }}>Industries We Power</h2>
          <p style={{ color:V.muted, marginBottom:44, fontSize:16 }}>GALVON adapts to every industrial vertical — from megawatt power plants to precision pharma lines.</p>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(140px,1fr))', gap:14 }}>
            {industries.map((ind,idx)=>(
              <div key={ind.label} style={{ border:`1px solid rgba(124,58,237,0.15)`, borderRadius:14, padding:'22px 12px', transition:'all .25s' }}
                onMouseOver={e=>{e.currentTarget.style.borderColor=idx%2===0?V.cyan:V.lavender;e.currentTarget.style.background=idx%2===0?`${V.cyan}08`:`${V.lavender}08`;e.currentTarget.style.transform='scale(1.04)'}}
                onMouseOut={e=>{e.currentTarget.style.borderColor='rgba(124,58,237,0.15)';e.currentTarget.style.background='transparent';e.currentTarget.style.transform='scale(1)'}}>
                <ind.icon size={28} style={{ color:idx%2===0?V.cyan:V.lavender, marginBottom:10 }}/>
                <div style={{ fontSize:13, fontWeight:600, color:V.muted }}>{ind.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WaveDivider from={V.bg} to={V.bg2}/>

      {/* ── INTEGRATIONS ── */}
      <section id="integrations" style={{ background:V.bg2, padding:'80px 24px' }}>
        <div style={{ maxWidth:900, margin:'0 auto', textAlign:'center' }}>
          <h2 style={{ fontSize:'clamp(26px,4vw,40px)', fontWeight:900, marginBottom:12 }}>Seamless Integration with Your Existing Infrastructure</h2>
          <p style={{ color:V.muted, marginBottom:44, fontSize:16 }}>No rip-and-replace. GALVON connects natively to every major industrial protocol and platform.</p>
          <div style={{ display:'flex', flexWrap:'wrap', justifyContent:'center', gap:12 }}>
            {integrations.map(n=>(
              <div key={n} style={{ background:'rgba(255,255,255,0.03)', border:`1px solid rgba(124,58,237,0.2)`, borderRadius:10, padding:'10px 22px', color:V.muted, fontWeight:600, fontSize:14, transition:'all .2s' }}
                onMouseOver={e=>{e.currentTarget.style.borderColor=V.cyan;e.currentTarget.style.color=V.cyan}}
                onMouseOut={e=>{e.currentTarget.style.borderColor='rgba(124,58,237,0.2)';e.currentTarget.style.color=V.muted}}>
                {n}
              </div>
            ))}
          </div>
        </div>
      </section>

      <WaveDivider from={V.bg2} to='#0d0428'/>

      {/* ── CTA ── */}
      <section id="contact" style={{ background:'#0d0428', padding:'100px 24px', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, background:`radial-gradient(ellipse at center,rgba(124,58,237,0.2) 0%,transparent 65%)`, pointerEvents:'none' }}/>
        <div style={{ maxWidth:660, margin:'0 auto', textAlign:'center', position:'relative', zIndex:1 }}>
          <CheckCircle size={48} style={{ color:V.cyan, margin:'0 auto 24px' }}/>
          <h2 style={{ fontSize:'clamp(30px,5vw,52px)', fontWeight:900, lineHeight:1.1, marginBottom:20 }}>
            Ready to Transform Your Operations?
          </h2>
          <p style={{ color:V.muted, fontSize:17, lineHeight:1.75, marginBottom:40 }}>Join 500+ facilities worldwide running on GALVON. Live demo tailored to your industry within 24 hours.</p>
          <div style={{ display:'flex', gap:14, justifyContent:'center', flexWrap:'wrap' }}>
            <a href="mailto:hello@galvon.com" style={{ display:'inline-flex', alignItems:'center', gap:10, background:`linear-gradient(135deg,${V.purple},${V.cyan})`, color:'white', padding:'16px 36px', borderRadius:12, fontWeight:800, fontSize:17, textDecoration:'none', boxShadow:`0 8px 28px rgba(124,58,237,0.5)` }}>
              Schedule a Demo <ArrowRight size={20}/>
            </a>
            <a href="https://wa.me/919373111709" style={{ display:'inline-flex', alignItems:'center', gap:8, border:`1px solid rgba(124,58,237,0.4)`, color:V.muted, padding:'16px 28px', borderRadius:12, fontWeight:600, fontSize:16, textDecoration:'none' }}>
              <Phone size={18}/> WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background:V.bg, borderTop:`1px solid rgba(124,58,237,0.12)`, padding:'40px 24px' }}>
        <div style={{ maxWidth:1280, margin:'0 auto', display:'flex', flexWrap:'wrap', alignItems:'center', justifyContent:'space-between', gap:20 }}>
          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
            <div style={{ width:32, height:32, borderRadius:10, background:`linear-gradient(135deg,${V.purple},${V.cyan})`, display:'flex', alignItems:'center', justifyContent:'center' }}>
              <Zap size={15} color="white"/>
            </div>
            <span style={{ fontWeight:900, letterSpacing:5, fontSize:18 }}>GALVON</span>
          </div>
          <div style={{ display:'flex', gap:24, fontSize:13, color:V.dim }}>
            {['Ampris','FlowNexus','NexaProc','Industries','About','Contact'].map(n=><a key={n} href={`#${n.toLowerCase()}`} style={{ textDecoration:'none', color:V.dim, transition:'color .2s' }} onMouseOver={e=>(e.currentTarget.style.color=V.cyan)} onMouseOut={e=>(e.currentTarget.style.color=V.dim)}>{n}</a>)}
          </div>
          <div style={{ textAlign:'right' }}>
            <div style={{ color:V.dim, fontSize:13 }}>drmhope.com | A Bettroi Product</div>
            <div style={{ color:'rgba(255,255,255,0.18)', fontSize:11, marginTop:4 }}>v{VERSION} | {BUILD_DATE} | galvon</div>
          </div>
        </div>
      </footer>
    </div>
  )
}
