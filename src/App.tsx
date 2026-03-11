import { useState, useEffect } from 'react'
import {
  Zap, Droplets, Factory, LayoutDashboard, Activity, Shield, Globe,
  ChevronDown, ArrowRight, Building2, Flame, FlaskConical, Waves,
  CheckCircle, Menu, X
} from 'lucide-react'

const VERSION = '1.0'
const BUILD_DATE = 'March 2026'

const GEMINI_KEY = import.meta.env.VITE_GEMINI_API_KEY

async function fetchGeminiText(prompt: string, fallback: string): Promise<string> {
  if (!GEMINI_KEY) return fallback
  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
      }
    )
    const data = await res.json()
    return data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || fallback
  } catch { return fallback }
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [heroSub, setHeroSub] = useState('Three verticals. One platform. Complete industrial control.')

  useEffect(() => {
    fetchGeminiText(
      'Write a single punchy 10-word tagline for Galvon, an Industrial Intelligence SCADA platform. No quotes, no punctuation at end.',
      'Three verticals. One platform. Complete industrial control.'
    ).then(setHeroSub)
  }, [])

  const products = [
    { name: 'Ampris', desc: 'Power and Electrical SCADA for utilities, substations, and energy management.', icon: Zap, color: 'text-electric-400', border: 'border-electric-500/30', bg: 'bg-electric-500/10', glow: 'hover:shadow-electric-500/20' },
    { name: 'FlowNexus', desc: 'Flow and liquid monitoring for pipelines, water treatment, and fluid systems.', icon: Droplets, color: 'text-cyan-400', border: 'border-cyan-500/30', bg: 'bg-cyan-500/10', glow: 'hover:shadow-cyan-500/20' },
    { name: 'NexaProc', desc: 'Factory and process automation SCADA for manufacturing and industrial plants.', icon: Factory, color: 'text-amber-400', border: 'border-amber-500/30', bg: 'bg-amber-500/10', glow: 'hover:shadow-amber-500/20' },
  ]

  const features = [
    { icon: LayoutDashboard, title: 'Unified Dashboard', desc: 'View all three SCADA verticals in a single, unified control interface.' },
    { icon: Activity, title: 'Real-time Monitoring', desc: 'Live data streams from every connected device across all systems.' },
    { icon: Shield, title: 'Industrial Grade', desc: 'Built for harsh environments with 99.9% uptime SLA.' },
    { icon: Globe, title: 'India-Made, Global-Ready', desc: 'Engineered in India, deployed across industries worldwide.' },
  ]

  const industries = [
    { icon: Factory, label: 'Manufacturing' },
    { icon: Zap, label: 'Power Utilities' },
    { icon: Flame, label: 'Oil and Gas' },
    { icon: Waves, label: 'Water Treatment' },
    { icon: FlaskConical, label: 'Pharmaceuticals' },
    { icon: Building2, label: 'Food and Beverage' },
  ]

  const stats = [
    { value: '3', label: 'SCADA Verticals' },
    { value: '100+', label: 'Deployments' },
    { value: '99.9%', label: 'Uptime' },
    { value: '24/7', label: 'Support' },
  ]

  return (
    <div className="min-h-screen bg-navy-950">
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 bg-navy-950/90 backdrop-blur border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="text-2xl font-black tracking-widest text-white">GALVON</span>
          <div className="hidden md:flex items-center gap-8 text-sm text-gray-400">
            <a href="#products" className="hover:text-white transition-colors">Products</a>
            <a href="#features" className="hover:text-white transition-colors">Platform</a>
            <a href="#industries" className="hover:text-white transition-colors">Industries</a>
            <a href="#contact" className="bg-electric-500 text-white px-4 py-2 rounded-lg hover:bg-electric-400 transition-colors">Request Demo</a>
          </div>
          <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden px-6 pb-4 flex flex-col gap-4 text-sm text-gray-300 border-t border-white/5 pt-4">
            <a href="#products" onClick={() => setMenuOpen(false)}>Products</a>
            <a href="#features" onClick={() => setMenuOpen(false)}>Platform</a>
            <a href="#industries" onClick={() => setMenuOpen(false)}>Industries</a>
            <a href="#contact" className="bg-electric-500 text-white px-4 py-2 rounded-lg text-center" onClick={() => setMenuOpen(false)}>Request Demo</a>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center grid-bg pt-20">
        <div className="absolute inset-0 bg-gradient-to-b from-electric-500/5 via-transparent to-navy-950" />
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto animate-fade-in-up">
          <div className="inline-flex items-center gap-2 bg-electric-500/10 border border-electric-500/30 rounded-full px-4 py-1.5 text-electric-400 text-sm mb-8">
            <Zap size={14} />
            Industrial Intelligence Platform
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-widest text-white mb-6">
            GALVON
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-4 max-w-2xl mx-auto">{heroSub}</p>
          <p className="text-gray-500 mb-10">Powering Ampris, FlowNexus, and NexaProc</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#products" className="flex items-center justify-center gap-2 bg-electric-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-electric-400 transition-colors">
              Explore Products <ArrowRight size={18} />
            </a>
            <a href="#contact" className="flex items-center justify-center gap-2 border border-white/20 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/5 transition-colors">
              Request Demo
            </a>
          </div>
          <div className="mt-16 animate-bounce">
            <ChevronDown size={24} className="mx-auto text-gray-600" />
          </div>
        </div>
      </section>

      {/* Products */}
      <section id="products" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">The Galvon Suite</h2>
          <p className="text-gray-400 max-w-xl mx-auto">Three specialized SCADA platforms, unified under one industrial intelligence ecosystem.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((p) => (
            <div key={p.name} className={`${p.bg} ${p.border} border rounded-2xl p-8 hover:shadow-2xl ${p.glow} transition-all duration-300 group`}>
              <div className={`w-14 h-14 rounded-xl ${p.bg} ${p.border} border flex items-center justify-center mb-6`}>
                <p.icon className={`${p.color}`} size={28} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">{p.name}</h3>
              <p className="text-gray-400 mb-6 leading-relaxed">{p.desc}</p>
              <button className={`flex items-center gap-2 ${p.color} text-sm font-medium group-hover:gap-3 transition-all`}>
                Learn More <ArrowRight size={16} />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 border-y border-white/5 bg-navy-900/50">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="text-4xl font-black text-electric-400 mb-2">{s.value}</div>
              <div className="text-gray-500 text-sm">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Why Galvon</h2>
          <p className="text-gray-400 max-w-xl mx-auto">Built from the ground up for industrial environments where failure is not an option.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f) => (
            <div key={f.title} className="bg-navy-900/50 border border-white/5 rounded-2xl p-6 hover:border-electric-500/30 transition-colors">
              <div className="w-12 h-12 bg-electric-500/10 rounded-xl flex items-center justify-center mb-4">
                <f.icon className="text-electric-400" size={22} />
              </div>
              <h3 className="text-white font-semibold mb-2">{f.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Industries */}
      <section id="industries" className="py-24 px-6 bg-navy-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Industries We Serve</h2>
            <p className="text-gray-400">Galvon powers industrial operations across sectors.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {industries.map((ind) => (
              <div key={ind.label} className="flex flex-col items-center gap-3 bg-navy-900/50 border border-white/5 rounded-xl p-5 hover:border-electric-500/30 transition-colors">
                <ind.icon className="text-electric-400" size={28} />
                <span className="text-gray-300 text-sm text-center font-medium">{ind.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-gradient-to-br from-electric-500/10 to-amber-500/5 border border-electric-500/20 rounded-3xl p-12">
            <CheckCircle className="text-electric-400 mx-auto mb-6" size={40} />
            <h2 className="text-4xl font-bold text-white mb-4">Ready to digitize your plant?</h2>
            <p className="text-gray-400 mb-8">Talk to our industrial automation experts. Get a live demo tailored to your industry.</p>
            <a href="mailto:hello@galvon.com" className="inline-flex items-center gap-2 bg-electric-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-electric-400 transition-colors">
              Contact Us <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-10 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-xl font-black tracking-widest text-white">GALVON</span>
          <div className="flex gap-6 text-sm text-gray-500">
            <span>Ampris</span><span>FlowNexus</span><span>NexaProc</span>
          </div>
          <div className="text-center md:text-right">
            <div className="text-gray-400 text-sm">drmhope.com | A Bettroi Product</div>
            <div className="text-gray-600 text-xs mt-1">v{VERSION} | {BUILD_DATE} | galvon</div>
          </div>
        </div>
      </footer>
    </div>
  )
}
