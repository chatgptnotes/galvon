import { useState } from 'react'
import { Zap, Droplets, Factory, Activity, Shield, Globe, ArrowRight, Waves, CheckCircle, Menu, X, Cpu, Network, Lock, Layers, TrendingDown, AlertTriangle, DollarSign, Phone } from 'lucide-react'

const VERSION = '2.0'; const BUILD_DATE = 'March 2026'

// ── VOID PHOENIX palette ──────────────────────────────────────────────────────
const V = {
  bg:      '#010d08',   // deep void
  bg2:     '#020f0a',   // midnight void
  bg3:     '#010b06',   // abyssal void
  mint:    '#6ee7b7',   // ethereal mint
  teal:    '#2dd4bf',   // void teal
  glow:    '#a7f3d0',   // spectral glow
  lavender:'#c4b5fd',   // phoenix feather lavender
  violet:  '#a78bfa',   // deep violet
  white:   '#f0fdf4',
  muted:   'rgba(240,253,244,0.60)',
  dim:     'rgba(240,253,244,0.32)',
  dimmer:  'rgba(240,253,244,0.12)',
  card:    'rgba(6,20,12,0.82)',
  border:  'rgba(110,231,183,0.15)',
}

// ── Shared styles ─────────────────────────────────────────────────────────────
const glass = {
  background: 'rgba(6,20,12,0.72)',
  border: `1px solid ${V.border}`,
  backdropFilter: 'blur(20px)',
  borderRadius: 16,
}

function Nav({ open, setOpen }: { open: boolean; setOpen: (v: boolean) => void }) {
  return (
    <nav style={{ position:'fixed', top:0, left:0, right:0, zIndex:100, backdropFilter:'blur(20px)', borderBottom:`1px solid ${V.border}`, background:'rgba(1,13,8,0.92)' }}>
      <div style={{ maxWidth:1200, margin:'0 auto', padding:'0 24px', height:64, display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <div style={{ display:'flex', alignItems:'center', gap:12 }}>
          <div style={{ width:38, height:38, borderRadius:10, background:`linear-gradient(135deg,${V.violet} 0%,${V.teal} 100%)`, display:'flex', alignItems:'center', justifyContent:'center', boxShadow:`0 0 20px rgba(167,139,250,0.5)` }}>
            <Zap size={20} color="#fff" />
          </div>
          <span style={{ fontSize:22, fontWeight:800, letterSpacing:-0.5, color:V.white }}>GALVON</span>
        </div>
        <div className="hidden md:flex" style={{ display:'flex', gap:32 }}>
          {['Platform','Features','Industries','Contact'].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} style={{ color:V.muted, fontSize:14, fontWeight:500, textDecoration:'none', transition:'color .2s' }}
              onMouseEnter={e=>(e.currentTarget.style.color=V.glow)} onMouseLeave={e=>(e.currentTarget.style.color=V.muted)}>{l}</a>
          ))}
        </div>
        <a href="https://ampris.vercel.app" target="_blank" rel="noopener" style={{ padding:'8px 20px', borderRadius:8, background:`linear-gradient(135deg,${V.violet},${V.teal})`, color:'#fff', fontSize:13, fontWeight:700, textDecoration:'none', boxShadow:`0 0 20px rgba(196,181,253,0.3)` }}>
          Launch Platform
        </a>
        <button onClick={()=>setOpen(!open)} style={{ display:'none', background:'none', border:'none', color:V.white, cursor:'pointer' }} className="md:hidden">
          {open ? <X size={24}/> : <Menu size={24}/>}
        </button>
      </div>
    </nav>
  )
}

function LeafCard({ icon, title, sub }: { icon: React.ReactNode; title: string; sub: string }) {
  return (
    <div style={{ ...glass, padding:'16px 20px', display:'flex', alignItems:'center', gap:14, minWidth:220 }}>
      <div style={{ width:36, height:36, borderRadius:10, background:`linear-gradient(135deg,${V.violet}22,${V.teal}22)`, border:`1px solid ${V.border}`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>{icon}</div>
      <div>
        <div style={{ fontSize:12, fontWeight:700, color:V.glow, letterSpacing:1, textTransform:'uppercase' }}>{title}</div>
        <div style={{ fontSize:11, color:V.muted, marginTop:2 }}>{sub}</div>
        <div style={{ fontSize:10, color:V.mint, marginTop:3, display:'flex', alignItems:'center', gap:4 }}>
          <span style={{ width:5, height:5, borderRadius:'50%', background:V.mint, display:'inline-block' }}/>
          STATUS: OPTIMAL · Uptime 99.9%
        </div>
      </div>
    </div>
  )
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div style={{ fontFamily:"'Inter',system-ui,sans-serif", background:V.bg, color:V.white, minHeight:'100vh' }}>
      <Nav open={menuOpen} setOpen={setMenuOpen} />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section style={{ minHeight:'100vh', position:'relative', display:'flex', alignItems:'center', paddingTop:80, overflow:'hidden' }}>
        {/* Hero background image */}
        <div style={{ position:'absolute', inset:0, backgroundImage:'url(/hero_void.jpg)', backgroundSize:'cover', backgroundPosition:'center', opacity:0.85 }}/>
        <div style={{ position:'absolute', inset:0, background:`linear-gradient(to right, rgba(1,13,8,0.92) 0%, rgba(1,13,8,0.55) 50%, rgba(1,13,8,0.3) 100%)` }}/>

        <div style={{ position:'relative', maxWidth:1200, margin:'0 auto', padding:'80px 24px', width:'100%' }}>
          <div style={{ maxWidth:600 }}>
            {/* Badge */}
            <div style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'6px 16px', borderRadius:100, background:'rgba(196,181,253,0.08)', border:`1px solid rgba(196,181,253,0.2)`, marginBottom:24 }}>
              <span style={{ width:6, height:6, borderRadius:'50%', background:V.lavender, boxShadow:`0 0 8px ${V.lavender}` }}/>
              <span style={{ fontSize:12, fontWeight:600, color:V.lavender, letterSpacing:1.5, textTransform:'uppercase' }}>Void Phoenix Industrial Suite</span>
            </div>

            <h1 style={{ fontSize:'clamp(36px,5vw,64px)', fontWeight:900, lineHeight:1.1, letterSpacing:-2, margin:'0 0 24px' }}>
              <span style={{ color:V.white }}>Industrial Control</span>
              <br />
              <span style={{ background:`linear-gradient(135deg,${V.lavender} 0%,${V.teal} 50%,${V.glow} 100%)`, WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', filter:`drop-shadow(0 0 20px rgba(196,181,253,0.4))` }}>Born from the Void</span>
            </h1>

            <p style={{ fontSize:18, color:V.muted, lineHeight:1.7, marginBottom:32, maxWidth:520 }}>
              As ancient runes guide the rising phoenix through the void, Galvon unifies your industrial infrastructure — power, flow, and process — into one ethereal intelligence.
            </p>

            <div style={{ display:'flex', gap:16, flexWrap:'wrap', marginBottom:48 }}>
              <a href="https://ampris.vercel.app" target="_blank" rel="noopener"
                style={{ padding:'14px 28px', borderRadius:10, background:`linear-gradient(135deg,${V.violet},${V.teal})`, color:'#fff', fontWeight:700, fontSize:15, textDecoration:'none', display:'flex', alignItems:'center', gap:8, boxShadow:`0 0 30px rgba(196,181,253,0.4)` }}>
                Enter the Void <ArrowRight size={16}/>
              </a>
              <a href="#platform"
                style={{ padding:'14px 28px', borderRadius:10, background:'rgba(110,231,183,0.06)', border:`1px solid ${V.border}`, color:V.glow, fontWeight:600, fontSize:15, textDecoration:'none' }}>
                Explore Platform
              </a>
            </div>

            {/* Leaf status cards */}
            <div style={{ display:'flex', flexWrap:'wrap', gap:12 }}>
              <LeafCard icon={<Droplets size={16} color={V.teal}/>} title="FlowNexus" sub="Flow Management"/>
              <LeafCard icon={<Factory size={16} color={V.mint}/>} title="NexaProc" sub="Industrial Process"/>
              <LeafCard icon={<Zap size={16} color={V.lavender}/>} title="Ampris" sub="Electrical System"/>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ────────────────────────────────────────────────────── */}
      <div style={{ background:V.bg2, borderTop:`1px solid ${V.border}`, borderBottom:`1px solid ${V.border}`, padding:'20px 24px' }}>
        <div style={{ maxWidth:1200, margin:'0 auto', display:'flex', flexWrap:'wrap', gap:32, justifyContent:'center' }}>
          {[['99.9%','Platform Uptime'],['3','Verticals Unified'],['<50ms','Response Time'],['24/7','Void Watch Active']].map(([v,l])=>(
            <div key={l} style={{ textAlign:'center' }}>
              <div style={{ fontSize:24, fontWeight:800, background:`linear-gradient(135deg,${V.lavender},${V.teal})`, WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>{v}</div>
              <div style={{ fontSize:12, color:V.dim, marginTop:2 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── PROBLEMS ─────────────────────────────────────────────────────── */}
      <section style={{ position:'relative', padding:'96px 24px', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, backgroundImage:'url(/problems_void.jpg)', backgroundSize:'cover', backgroundPosition:'center', opacity:0.25 }}/>
        <div style={{ position:'absolute', inset:0, background:`linear-gradient(to bottom, ${V.bg} 0%, transparent 20%, transparent 80%, ${V.bg} 100%)` }}/>

        <div style={{ position:'relative', maxWidth:1200, margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:56 }}>
            <div style={{ fontSize:12, fontWeight:700, color:V.lavender, letterSpacing:2, textTransform:'uppercase', marginBottom:12 }}>The Old Way</div>
            <h2 style={{ fontSize:'clamp(28px,4vw,48px)', fontWeight:800, letterSpacing:-1, margin:0 }}>
              Darkness <span style={{ color:V.lavender }}>Before the Phoenix</span>
            </h2>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))', gap:20 }}>
            {[
              [AlertTriangle, V.lavender, 'Fragmented Systems', 'Siloed PLCs, SCADA islands, and disconnected sensors create operational blind spots'],
              [TrendingDown, V.teal, 'Invisible Downtime', 'Manual monitoring misses the early signals — failures appear without warning'],
              [DollarSign, V.mint, 'Energy Drain', 'Inefficient load distribution burns capital in every shift, invisible to managers'],
              [Globe, V.lavender, 'No Remote Clarity', 'Field engineers make decisions without real-time data from the control room'],
              [Lock, V.teal, 'Security Gaps', 'Legacy OT systems expose critical infrastructure to modern cyber threats'],
              [Network, V.mint, 'Integration Pain', 'Protocols don\'t speak — MODBUS, DNP3, IEC 61850 remain forever isolated'],
            ].map(([Icon, color, title, desc]) => (
              <div key={title as string} style={{ ...glass, padding:'24px', transition:'transform .2s,box-shadow .2s' }}
                onMouseEnter={e=>{ e.currentTarget.style.transform='translateY(-4px)'; e.currentTarget.style.boxShadow=`0 12px 40px rgba(196,181,253,0.12)` }}
                onMouseLeave={e=>{ e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='none' }}>
                <div style={{ width:40, height:40, borderRadius:10, background:`${color}18`, border:`1px solid ${color}30`, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:14 }}>
                  <Icon size={18} color={color as string}/>
                </div>
                <h3 style={{ fontSize:15, fontWeight:700, margin:'0 0 8px', color:V.white }}>{title as string}</h3>
                <p style={{ fontSize:13, color:V.muted, lineHeight:1.6, margin:0 }}>{desc as string}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PLATFORM / 3 VERTICALS ───────────────────────────────────────── */}
      <section id="platform" style={{ position:'relative', padding:'96px 24px', overflow:'hidden', background:V.bg2 }}>
        <div style={{ position:'absolute', inset:0, backgroundImage:'url(/features_void.jpg)', backgroundSize:'cover', backgroundPosition:'center', opacity:0.3 }}/>
        <div style={{ position:'absolute', inset:0, background:`linear-gradient(to bottom, ${V.bg2} 0%, transparent 15%, transparent 85%, ${V.bg2} 100%)` }}/>

        <div style={{ position:'relative', maxWidth:1200, margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:56 }}>
            <div style={{ fontSize:12, fontWeight:700, color:V.teal, letterSpacing:2, textTransform:'uppercase', marginBottom:12 }}>The Three Branches</div>
            <h2 style={{ fontSize:'clamp(28px,4vw,48px)', fontWeight:800, letterSpacing:-1, margin:'0 0 16px' }}>
              The Void Phoenix <span style={{ background:`linear-gradient(135deg,${V.lavender},${V.teal})`, WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>Tree of Control</span>
            </h2>
            <p style={{ fontSize:16, color:V.muted, maxWidth:560, margin:'0 auto' }}>Three verticals grow from one root — each sovereign, all unified under Galvon's ethereal canopy.</p>
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))', gap:24 }}>
            {[
              { Icon:Zap, color:V.lavender, name:'Ampris', tag:'Electrical SCADA', url:'https://ampris.vercel.app',
                desc:'Real-time power monitoring, protection relay management, and IEC 61850 substation control — forged in the void.',
                features:['Substation Automation','Protection Relay Monitoring','Power Quality Analysis','IEC 61850 Protocol'] },
              { Icon:Droplets, color:V.teal, name:'FlowNexus', tag:'Flow & Liquid Control', url:'https://flownexus.work',
                desc:'Pipeline telemetry, pump station management, and leak detection across water, oil, and gas networks.',
                features:['Pipeline SCADA','Pump Station Control','Flow Rate Analytics','Leak Detection Alerts'] },
              { Icon:Factory, color:V.mint, name:'NexaProc', tag:'Process Automation', url:'https://nexaproc.vercel.app',
                desc:'DCS integration, batch process control, and plant-wide OEE optimization rising from industrial complexity.',
                features:['DCS Integration','Batch Process Control','OEE Dashboard','Alarm Management'] },
            ].map(({ Icon, color, name, tag, url, desc, features }) => (
              <div key={name} style={{ ...glass, padding:'32px', display:'flex', flexDirection:'column', position:'relative', overflow:'hidden' }}>
                {/* Glow orb */}
                <div style={{ position:'absolute', top:-30, right:-30, width:120, height:120, borderRadius:'50%', background:`radial-gradient(${color}22, transparent 70%)`, filter:'blur(20px)', pointerEvents:'none' }}/>
                <div style={{ width:48, height:48, borderRadius:14, background:`${color}18`, border:`1px solid ${color}30`, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:20 }}>
                  <Icon size={22} color={color}/>
                </div>
                <div style={{ fontSize:11, fontWeight:700, color, letterSpacing:2, textTransform:'uppercase', marginBottom:6 }}>{tag}</div>
                <h3 style={{ fontSize:22, fontWeight:800, margin:'0 0 12px', color:V.white }}>{name}</h3>
                <p style={{ fontSize:13, color:V.muted, lineHeight:1.7, marginBottom:20, flex:1 }}>{desc}</p>
                <ul style={{ margin:'0 0 24px', padding:0, listStyle:'none', display:'flex', flexDirection:'column', gap:8 }}>
                  {features.map(f => (
                    <li key={f} style={{ display:'flex', alignItems:'center', gap:8, fontSize:13, color:V.muted }}>
                      <CheckCircle size={14} color={color}/>{f}
                    </li>
                  ))}
                </ul>
                <a href={url} target="_blank" rel="noopener"
                  style={{ padding:'10px 20px', borderRadius:8, background:`${color}18`, border:`1px solid ${color}40`, color, fontSize:13, fontWeight:700, textDecoration:'none', textAlign:'center', display:'flex', alignItems:'center', justifyContent:'center', gap:6 }}>
                  Explore {name} <ArrowRight size={14}/>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────────────────────── */}
      <section id="features" style={{ position:'relative', padding:'96px 24px', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, background:V.bg }}/>

        <div style={{ position:'relative', maxWidth:1200, margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:56 }}>
            <div style={{ fontSize:12, fontWeight:700, color:V.mint, letterSpacing:2, textTransform:'uppercase', marginBottom:12 }}>The Runes of Power</div>
            <h2 style={{ fontSize:'clamp(28px,4vw,48px)', fontWeight:800, letterSpacing:-1 }}>
              Ancient <span style={{ color:V.teal }}>Intelligence</span>, Modern Control
            </h2>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))', gap:16 }}>
            {[
              [Cpu, V.lavender, 'Unified Void Core', 'One control plane for all three verticals. Single sign-on, unified alarms, shared asset registry.'],
              [Activity, V.teal, 'Live Constellation Map', 'Real-time topology view of your entire industrial network — assets, flows, and alerts at a glance.'],
              [Shield, V.mint, 'Rune-Grade Security', 'Zero-trust OT security, encrypted SCADA tunnels, role-based access, and full audit trails.'],
              [Network, V.lavender, 'Universal Protocol Bridge', 'MODBUS, DNP3, IEC 61850, MQTT, OPC-UA — all unified under Galvon\'s protocol mesh.'],
              [Layers, V.teal, 'AI Anomaly Detection', 'Machine learning detects process deviations before they become failures — the phoenix senses all.'],
              [Globe, V.mint, 'Remote Void Access', 'Secure mobile and web dashboards for field engineers, managers, and executives — anywhere, anytime.'],
              [Waves, V.lavender, 'Predictive Analytics', 'Trend analysis, predictive maintenance forecasts, and energy optimization built-in.'],
              [Lock, V.teal, 'Compliance Ready', 'IEC 62443, NERC CIP, and ISO 27001 frameworks pre-mapped to your operational data.'],
            ].map(([Icon, color, title, desc]) => (
              <div key={title as string} style={{ ...glass, padding:'24px', transition:'all .2s' }}
                onMouseEnter={e=>{ e.currentTarget.style.transform='translateY(-3px)'; e.currentTarget.style.borderColor=`${color as string}40` }}
                onMouseLeave={e=>{ e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.borderColor=V.border }}>
                <div style={{ width:38, height:38, borderRadius:10, background:`${color as string}15`, border:`1px solid ${color as string}25`, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:14 }}>
                  <Icon size={16} color={color as string}/>
                </div>
                <h3 style={{ fontSize:14, fontWeight:700, margin:'0 0 8px', color:V.white }}>{title as string}</h3>
                <p style={{ fontSize:12, color:V.muted, lineHeight:1.6, margin:0 }}>{desc as string}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INDUSTRIES ───────────────────────────────────────────────────── */}
      <section id="industries" style={{ position:'relative', padding:'96px 24px', overflow:'hidden', background:V.bg2 }}>
        <div style={{ position:'absolute', inset:0, backgroundImage:'url(/industries_void.jpg)', backgroundSize:'cover', backgroundPosition:'center', opacity:0.35 }}/>
        <div style={{ position:'absolute', inset:0, background:`linear-gradient(to bottom, ${V.bg2} 0%, transparent 20%, transparent 80%, ${V.bg2} 100%)` }}/>

        <div style={{ position:'relative', maxWidth:1200, margin:'0 auto', textAlign:'center' }}>
          <div style={{ fontSize:12, fontWeight:700, color:V.lavender, letterSpacing:2, textTransform:'uppercase', marginBottom:12 }}>Constellation of Industries</div>
          <h2 style={{ fontSize:'clamp(28px,4vw,48px)', fontWeight:800, letterSpacing:-1, marginBottom:16 }}>
            Where the <span style={{ background:`linear-gradient(135deg,${V.lavender},${V.teal})`, WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>Phoenix Soars</span>
          </h2>
          <p style={{ fontSize:16, color:V.muted, maxWidth:520, margin:'0 auto 48px' }}>From power substations to water treatment, oil terminals to smart factories — Galvon rises in every sector.</p>
          <div style={{ display:'flex', flexWrap:'wrap', gap:16, justifyContent:'center' }}>
            {[
              [Zap,'Power Utilities'],[Droplets,'Water & Wastewater'],[Factory,'Oil & Gas'],
              [Activity,'Smart Manufacturing'],[Shield,'Critical Infrastructure'],[Globe,'Smart Cities'],
            ].map(([Icon, label]) => (
              <div key={label as string} style={{ ...glass, padding:'20px 28px', display:'flex', alignItems:'center', gap:12, transition:'all .2s' }}
                onMouseEnter={e=>{ e.currentTarget.style.borderColor=`${V.teal}50`; e.currentTarget.style.transform='translateY(-2px)' }}
                onMouseLeave={e=>{ e.currentTarget.style.borderColor=V.border; e.currentTarget.style.transform='translateY(0)' }}>
                <Icon size={18} color={V.teal}/>
                <span style={{ fontSize:14, fontWeight:600, color:V.white }}>{label as string}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section id="contact" style={{ position:'relative', padding:'120px 24px', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, backgroundImage:'url(/cta_void.jpg)', backgroundSize:'cover', backgroundPosition:'center', opacity:0.55 }}/>
        <div style={{ position:'absolute', inset:0, background:`linear-gradient(to bottom, ${V.bg} 0%, rgba(1,13,8,0.7) 40%, rgba(1,13,8,0.7) 60%, ${V.bg} 100%)` }}/>

        <div style={{ position:'relative', maxWidth:700, margin:'0 auto', textAlign:'center' }}>
          <div style={{ fontSize:12, fontWeight:700, color:V.lavender, letterSpacing:2, textTransform:'uppercase', marginBottom:16 }}>The Phoenix Awaits</div>
          <h2 style={{ fontSize:'clamp(32px,5vw,56px)', fontWeight:900, letterSpacing:-2, margin:'0 0 20px' }}>
            Rise With <span style={{ background:`linear-gradient(135deg,${V.lavender},${V.teal},${V.glow})`, WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>Galvon</span>
          </h2>
          <p style={{ fontSize:17, color:V.muted, lineHeight:1.7, marginBottom:40 }}>
            Let your industrial infrastructure ascend from the void. Unified control, ethereal intelligence, zero blind spots.
          </p>
          <div style={{ display:'flex', gap:16, justifyContent:'center', flexWrap:'wrap' }}>
            <a href="https://ampris.vercel.app" target="_blank" rel="noopener"
              style={{ padding:'16px 32px', borderRadius:12, background:`linear-gradient(135deg,${V.violet},${V.teal})`, color:'#fff', fontWeight:700, fontSize:16, textDecoration:'none', display:'flex', alignItems:'center', gap:8, boxShadow:`0 0 40px rgba(196,181,253,0.5)` }}>
              Enter Void Control <ArrowRight size={16}/>
            </a>
            <a href="mailto:hello@galvon.ai"
              style={{ padding:'16px 32px', borderRadius:12, background:'rgba(110,231,183,0.06)', border:`1px solid ${V.border}`, color:V.glow, fontWeight:600, fontSize:16, textDecoration:'none', display:'flex', alignItems:'center', gap:8 }}>
              <Phone size={16}/>Contact Us
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────────── */}
      <footer style={{ background:V.bg3, borderTop:`1px solid ${V.border}`, padding:'32px 24px', textAlign:'center' }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:10, marginBottom:12 }}>
          <div style={{ width:28, height:28, borderRadius:8, background:`linear-gradient(135deg,${V.violet},${V.teal})`, display:'flex', alignItems:'center', justifyContent:'center' }}>
            <Zap size={14} color="#fff"/>
          </div>
          <span style={{ fontSize:16, fontWeight:800, color:V.white }}>GALVON</span>
          <span style={{ color:V.dim, fontSize:12 }}>· Void Phoenix Industrial Suite</span>
        </div>
        <div style={{ display:'flex', gap:24, justifyContent:'center', flexWrap:'wrap', marginBottom:16 }}>
          {[['Ampris','https://ampris.vercel.app'],['FlowNexus','https://flownexus.work'],['NexaProc','https://nexaproc.vercel.app']].map(([n,u])=>(
            <a key={n} href={u} target="_blank" rel="noopener" style={{ fontSize:13, color:V.dim, textDecoration:'none' }}
              onMouseEnter={e=>e.currentTarget.style.color=V.teal} onMouseLeave={e=>e.currentTarget.style.color=V.dim}>{n}</a>
          ))}
        </div>
        <p style={{ fontSize:11, color:V.dimmer, margin:0 }}>
          drmhope.com | A Bettroi Product &nbsp;·&nbsp; v{VERSION} &nbsp;·&nbsp; {BUILD_DATE} &nbsp;·&nbsp; galvon
        </p>
      </footer>
    </div>
  )
}
