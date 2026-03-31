import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { BrandMark } from '../components/ui/BrandLogo'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] } },
}
const stagger = (delay = 0.1) => ({
  hidden: {},
  show:   { transition: { staggerChildren: delay } },
})

function Section({ children, className = '', id }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.section ref={ref} id={id} initial="hidden" animate={inView ? 'show' : 'hidden'} className={className}>
      {children}
    </motion.section>
  )
}

const FEATURES = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/>
      </svg>
    ),
    title: 'Zero Install',
    desc:  'Access AR instantly through your browser. No downloads, no friction.',
    color: 'from-brand-500 to-brand-600',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
      </svg>
    ),
    title: 'Location Discovery',
    desc:  'Hyper-local AR relevance powered by your real GPS coordinates.',
    color: 'from-accent-500 to-accent-600',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    title: 'Real-Time Distance',
    desc:  'Haversine engine tells you exactly how far each AR experience is.',
    color: 'from-emerald-500 to-emerald-600',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
    title: 'AR Integration',
    desc:  'One tap opens immersive augmented reality right in your browser.',
    color: 'from-amber-500 to-orange-500',
  },
]

const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'Allow Location',
    desc:  'Grant one-time permission. NavMe reads your GPS locally — nothing leaves your device.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
      </svg>
    ),
  },
  {
    step: '02',
    title: 'Discover Nearby AR',
    desc:  'See AR experiences within your radius — sorted by distance, filtered by category.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
      </svg>
    ),
  },
  {
    step: '03',
    title: 'Click & Experience',
    desc:  'Tap any card to launch AR in your browser. No additional apps. No barriers.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="5 3 19 12 5 21 5 3"/>
      </svg>
    ),
  },
]

const CAPABILITIES = [
  'Live GPS detection with high accuracy',
  'Haversine formula for distance calculation',
  'Dynamic radius filtering (1 km → 10 km)',
  'Category-based smart filtering',
  'Offline-ready PWA with service worker',
  'Instant AR link launch — zero loading',
  'Privacy-first: coordinates stay on device',
  'Lighthouse-optimized performance',
]

const INDUSTRIES = [
  {
    icon: '🎓',
    title: 'Campus',
    desc: 'Guide students through university buildings and departments with AR overlays.',
    stat: '3× faster orientation',
    color: 'border-blue-500/30 hover:border-blue-500/60',
    badge: 'bg-blue-500/10 text-blue-400',
  },
  {
    icon: '🎪',
    title: 'Events',
    desc: 'Enhance concerts and conferences with AR stage maps and interactive experiences.',
    stat: '40% higher engagement',
    color: 'border-accent-500/30 hover:border-accent-500/60',
    badge: 'bg-accent-500/10 text-accent-400',
  },
  {
    icon: '🗺️',
    title: 'Tourism',
    desc: 'Bring monuments and museums alive with historical AR overlays and storytelling.',
    stat: '5M+ heritage sites ready',
    color: 'border-emerald-500/30 hover:border-emerald-500/60',
    badge: 'bg-emerald-500/10 text-emerald-400',
  },
  {
    icon: '🛍️',
    title: 'Retail',
    desc: 'Let shoppers virtually try products and navigate stores with AR precision.',
    stat: '28% conversion uplift',
    color: 'border-amber-500/30 hover:border-amber-500/60',
    badge: 'bg-amber-500/10 text-amber-400',
  },
]

// ── Hero ──────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="relative min-h-[100svh] flex flex-col items-center justify-center text-center overflow-hidden pt-[var(--nav-height)]">
      <div className="absolute inset-0 bg-mesh-gradient pointer-events-none" />
      <div className="absolute inset-0 bg-hero-glow pointer-events-none" />

      {/* Orbs — constrained so they don't cause horizontal scroll */}
      <div className="absolute top-1/4 -left-20 w-64 h-64 sm:w-80 sm:h-80 bg-brand-500/8 rounded-full blur-3xl animate-float pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-72 h-72 sm:w-96 sm:h-96 bg-accent-500/6 rounded-full blur-3xl animate-float pointer-events-none" style={{ animationDelay: '2s' }} />

      <div className="container-xl relative z-10 py-10 sm:py-16 w-full">
        <motion.div variants={stagger(0.1)} initial="hidden" animate="show" className="flex flex-col items-center gap-5">
          <motion.div variants={fadeUp} className="flex justify-center">
            <BrandMark size="2xl" imgClassName="shadow-glow-md ring-2 ring-white/10" />
          </motion.div>
          {/* Badge */}
          <motion.div variants={fadeUp}>
            <span className="badge-brand text-[11px] font-medium px-3 py-1.5 tracking-wide uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse flex-shrink-0" />
              Location-Based AR Navigation
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            className="text-[2.15rem] sm:text-5xl lg:text-7xl font-display font-black tracking-tight text-balance leading-[1.08] max-w-3xl w-full"
          >
            Smart Navigation{' '}
            <span className="text-gradient">Made Simple</span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            variants={fadeUp}
            className="text-sm sm:text-base lg:text-lg text-gray-400 max-w-xl text-pretty leading-relaxed px-2"
          >
            Discover AR experiences around you — no install required. NavMe detects
            your real-world location and surfaces nearby augmented reality links
            instantly, in your browser.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="flex flex-col xs:flex-row gap-3 w-full max-w-xs sm:max-w-none sm:w-auto mt-1">
            <Link to="/discover" className="btn btn-primary btn-lg w-full sm:w-auto justify-center">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              Explore Experiences
            </Link>
            <Link to="/about" className="btn btn-secondary btn-lg w-full sm:w-auto justify-center">
              Get Started
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </Link>
          </motion.div>

          {/* Social proof */}
          <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-2 text-sm text-gray-500">
            {[
              { value: '22+', label: 'AR Experiences' },
              { value: '4',   label: 'Industries' },
              { value: '0',   label: 'App Installs' },
            ].map(({ value, label }) => (
              <div key={label} className="flex items-center gap-1.5">
                <span className="font-bold text-gray-200 text-base">{value}</span>
                <span className="text-xs sm:text-sm">{label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Hero mock card */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mt-10 sm:mt-14 flex justify-center px-2"
        >
          <div className="relative w-full max-w-[340px] sm:max-w-md">
            <div className="glass rounded-2xl p-4 sm:p-5 border border-white/10 shadow-2xl animate-float">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
                  <span className="text-[11px] sm:text-xs text-gray-400 font-mono truncate">3 AR experiences near you</span>
                </div>
                <span className="badge-brand text-[11px] flex-shrink-0 ml-2">Live</span>
              </div>
              <div className="space-y-2.5">
                {[
                  { title: 'Campus Tour AR',   dist: '0.3 km', cat: '🎓', color: 'text-blue-400'   },
                  { title: 'Heritage Walk AR', dist: '1.2 km', cat: '🗺️', color: 'text-emerald-400' },
                  { title: 'TechFest AR Stage',dist: '2.8 km', cat: '🎪', color: 'text-purple-400'  },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-2.5 sm:p-3 rounded-xl bg-white/4 border border-white/6 gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-base flex-shrink-0">{item.cat}</span>
                      <div className="min-w-0">
                        <p className="text-xs sm:text-sm font-medium text-gray-200 truncate">{item.title}</p>
                        <p className={`text-[11px] ${item.color} font-mono`}>{item.dist} away</p>
                      </div>
                    </div>
                    <span className="text-xs text-brand-400 font-medium flex-shrink-0">Open →</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating GPS badge */}
            <motion.div
              animate={{ y: [-3, 3, -3] }}
              transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
              className="absolute -top-3 -right-2 sm:-top-4 sm:-right-4 glass rounded-xl px-2.5 py-1.5 border border-brand-500/30 shadow-glow-sm"
            >
              <div className="flex items-center gap-1.5 text-[11px]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                <span className="text-gray-300 font-medium whitespace-nowrap">GPS Active</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ── Features ──────────────────────────────────────────────────────────────────
function FeaturesSection() {
  return (
    <Section className="section bg-surface-card/30 border-y border-surface-border">
      <div className="container-xl">
        <motion.div variants={stagger(0.1)} className="text-center mb-8 sm:mb-12">
          <motion.p variants={fadeUp} className="text-xs font-semibold uppercase tracking-widest text-brand-400 mb-3">
            Core Features
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-gray-100 text-balance">
            Everything you need to{' '}
            <span className="text-gradient">navigate AR</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-3 text-sm sm:text-base text-gray-400 max-w-lg mx-auto">
            NavMe is engineered for the browser — no native app, no friction.
          </motion.p>
        </motion.div>

        <motion.div variants={stagger(0.08)} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {FEATURES.map(({ icon, title, desc, color }) => (
            <motion.div
              key={title}
              variants={fadeUp}
              className="card p-5 sm:p-6 group cursor-default hover:-translate-y-1 transition-all duration-300"
            >
              <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-white mb-4 transition-transform group-hover:scale-110`}>
                {icon}
              </div>
              <h3 className="font-semibold text-gray-100 mb-1.5 text-sm sm:text-base">{title}</h3>
              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Section>
  )
}

// ── How It Works ──────────────────────────────────────────────────────────────
function HowItWorksSection() {
  return (
    <Section id="how-it-works" className="section">
      <div className="container-xl">
        <motion.div variants={stagger(0.1)} className="text-center mb-8 sm:mb-12">
          <motion.p variants={fadeUp} className="text-xs font-semibold uppercase tracking-widest text-accent-400 mb-3">
            How It Works
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-gray-100 text-balance">
            Three steps to{' '}
            <span className="text-gradient">AR exploration</span>
          </motion.h2>
        </motion.div>

        <motion.div variants={stagger(0.12)} className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
          {HOW_IT_WORKS.map(({ step, title, desc, icon }, i) => (
            <motion.div
              key={step}
              variants={fadeUp}
              className="flex sm:flex-col items-start sm:items-center gap-4 sm:gap-5 sm:text-center group"
            >
              {/* Step icon */}
              <div className="relative flex-shrink-0">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-brand-500/20 to-accent-500/20 border border-brand-500/30 flex items-center justify-center text-brand-400 group-hover:border-brand-500/60 transition-colors">
                  {icon}
                </div>
                <div className="absolute -top-2 -right-2 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-surface-card border border-surface-border flex items-center justify-center">
                  <span className="text-[9px] sm:text-[10px] font-bold text-brand-400">{i + 1}</span>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-100 mb-1.5 text-base">{title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Section>
  )
}

// ── Capabilities ──────────────────────────────────────────────────────────────
function CapabilitiesSection() {
  return (
    <Section className="section bg-surface-card/20 border-y border-surface-border">
      <div className="container-xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">
          {/* Left */}
          <motion.div variants={stagger(0.08)}>
            <motion.p variants={fadeUp} className="text-xs font-semibold uppercase tracking-widest text-brand-400 mb-3">
              Capabilities
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-2xl sm:text-3xl font-display font-bold text-gray-100 mb-4 text-balance">
              Precision-built for{' '}
              <span className="text-gradient">the real world</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-sm text-gray-400 mb-6 leading-relaxed">
              Every feature works reliably across devices, networks, and conditions.
            </motion.p>
            <motion.ul variants={stagger(0.05)} className="grid grid-cols-1 xs:grid-cols-2 gap-2.5">
              {CAPABILITIES.map((cap) => (
                <motion.li
                  key={cap}
                  variants={fadeUp}
                  className="flex items-start gap-2 text-xs sm:text-sm text-gray-300"
                >
                  <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-md bg-brand-500/15 border border-brand-500/25 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-brand-400">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </span>
                  <span>{cap}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Right: stat cards */}
          <motion.div variants={fadeUp} className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-500/10 to-accent-500/8 rounded-3xl blur-2xl" />
            <div className="relative grid grid-cols-2 gap-3 sm:gap-4">
              {[
                { value: '< 50ms', label: 'Location detect', icon: '⚡' },
                { value: '± 3m',   label: 'GPS accuracy',    icon: '🎯' },
                { value: '5km',    label: 'Default radius',  icon: '📡' },
                { value: '100%',   label: 'Browser native',  icon: '🌐' },
              ].map(({ value, label, icon }) => (
                <div key={label} className="card p-4 sm:p-5 text-center">
                  <div className="text-xl sm:text-2xl mb-1.5">{icon}</div>
                  <div className="text-base sm:text-xl font-bold text-gradient mb-0.5">{value}</div>
                  <div className="text-[11px] sm:text-xs text-gray-500">{label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  )
}

// ── Industries ────────────────────────────────────────────────────────────────
function IndustriesSection() {
  return (
    <Section id="industries" className="section">
      <div className="container-xl">
        <motion.div variants={stagger(0.1)} className="text-center mb-8 sm:mb-12">
          <motion.p variants={fadeUp} className="text-xs font-semibold uppercase tracking-widest text-accent-400 mb-3">
            Industries
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-gray-100 text-balance">
            Built for every{' '}
            <span className="text-gradient">real-world space</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-3 text-sm sm:text-base text-gray-400 max-w-lg mx-auto">
            NavMe adapts to the context — campus hallway or festival ground, AR is always within reach.
          </motion.p>
        </motion.div>

        <motion.div variants={stagger(0.08)} className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          {INDUSTRIES.map(({ icon, title, desc, stat, color, badge }) => (
            <motion.div
              key={title}
              variants={fadeUp}
              className={`card p-4 sm:p-6 group hover:-translate-y-1 transition-all duration-300 border ${color}`}
            >
              <div className="text-3xl sm:text-4xl mb-3 sm:mb-4 group-hover:scale-110 transition-transform origin-left">
                {icon}
              </div>
              <h3 className="font-semibold text-gray-100 mb-1.5 text-sm sm:text-base">{title}</h3>
              <p className="text-xs text-gray-400 leading-relaxed mb-3 hidden sm:block">{desc}</p>
              <div className={`inline-flex items-center gap-1 text-[10px] sm:text-xs font-medium px-2 py-1 rounded-full ${badge}`}>
                <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
                </svg>
                <span className="truncate">{stat}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Section>
  )
}

// ── CTA ───────────────────────────────────────────────────────────────────────
function CTASection() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  return (
    <section ref={ref} className="section-sm">
      <div className="container-xl">
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative rounded-2xl sm:rounded-3xl overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-brand-600 via-brand-700 to-accent-700" />
          <div className="absolute inset-0 bg-mesh-gradient opacity-30" />
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.1) 1px,transparent 1px)`,
              backgroundSize: '40px 40px',
            }}
          />
          <div className="relative z-10 px-5 sm:px-10 py-10 sm:py-14 flex flex-col items-center text-center gap-6 lg:flex-row lg:text-left lg:justify-between">
            <div className="max-w-md">
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mb-3 text-balance">
                Start Exploring AR Near You
              </h2>
              <p className="text-white/70 text-sm sm:text-base">
                Allow location access and discover what's around you — right now.
              </p>
            </div>
            <div className="flex flex-col xs:flex-row gap-3 w-full sm:w-auto flex-shrink-0">
              <Link to="/discover" className="btn bg-white text-brand-700 hover:bg-white/90 active:scale-95 shadow-lg px-6 py-3 text-sm font-semibold rounded-xl transition-all justify-center">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
                Explore Now
              </Link>
              <Link to="/about" className="btn border border-white/30 text-white hover:bg-white/10 px-6 py-3 text-sm font-semibold rounded-xl transition-all justify-center">
                Learn More
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <Hero />
      <FeaturesSection />
      <HowItWorksSection />
      <CapabilitiesSection />
      <IndustriesSection />
      <CTASection />
    </main>
  )
}
