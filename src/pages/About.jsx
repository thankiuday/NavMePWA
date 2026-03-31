import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { BrandMark } from '../components/ui/BrandLogo'

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
}

const stagger = (delay = 0.1) => ({
  hidden: {},
  show: { transition: { staggerChildren: delay } },
})

function Section({ children, className = '', id }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.section
      ref={ref}
      id={id}
      initial="hidden"
      animate={inView ? 'show' : 'hidden'}
      className={className}
    >
      {children}
    </motion.section>
  )
}

const STATS = [
  { value: '15+',  label: 'AR Experiences' },
  { value: '4',    label: 'Industries' },
  { value: '100%', label: 'Browser Native' },
  { value: '0',    label: 'App Installs Required' },
]

const TECH_STACK = [
  { name: 'WebAR',            desc: 'Browser-native augmented reality',      icon: '🥽', color: 'border-brand-500/30 bg-brand-500/5'  },
  { name: 'GPS / Geolocation',desc: 'High-accuracy real-world positioning',  icon: '📡', color: 'border-accent-500/30 bg-accent-500/5' },
  { name: 'PWA Technology',   desc: 'Installable, offline-ready web apps',   icon: '⚡', color: 'border-emerald-500/30 bg-emerald-500/5' },
  { name: 'Haversine Engine', desc: 'Precise spherical distance calculation', icon: '🧮', color: 'border-amber-500/30 bg-amber-500/5' },
  { name: 'React 18',         desc: 'Modern concurrent UI rendering',        icon: '⚛️', color: 'border-blue-500/30 bg-blue-500/5'   },
  { name: 'Supabase (soon)',  desc: 'Real-time backend & auth layer',        icon: '🗄️', color: 'border-gray-500/30 bg-gray-500/5'   },
]

const TIMELINE = [
  {
    year: '2024',
    title: 'Concept & Research',
    desc: 'Identified the gap: AR experiences exist but are impossible to discover by proximity.',
  },
  {
    year: 'Q1 2025',
    title: 'MVP Launch',
    desc: 'Launched NavMe with core location detection, Haversine filtering, and AR link routing.',
  },
  {
    year: 'Q2 2025',
    title: 'Industry Expansion',
    desc: 'Onboarded campus, events, tourism and retail AR partners across Rajkot.',
  },
  {
    year: 'Today',
    title: 'Scale & Supabase',
    desc: 'Building real-time backend, user accounts, and creator tools for AR experience publishing.',
  },
]

export default function About() {
  return (
    <main className="min-h-screen pt-[var(--nav-height)] overflow-x-hidden">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative section overflow-hidden">
        <div className="absolute inset-0 bg-mesh-gradient pointer-events-none" />
        <div className="absolute inset-0 bg-hero-glow pointer-events-none" />

        <div className="container-xl relative z-10">
          <motion.div
            variants={stagger(0.1)}
            initial="hidden"
            animate="show"
            className="text-center mb-8 sm:mb-12"
          >
            <motion.div variants={fadeUp} className="flex justify-center mb-5">
              <BrandMark size="xl" imgClassName="shadow-glow-sm ring-1 ring-white/15" />
            </motion.div>
            <motion.span variants={fadeUp} className="badge-brand text-[11px] uppercase tracking-widest inline-flex mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-400 flex-shrink-0" />
              About NavMe
            </motion.span>
            <motion.h1 variants={fadeUp} className="text-[1.9rem] sm:text-4xl lg:text-5xl font-display font-black tracking-tight text-gray-100 text-balance mb-4 leading-[1.1]">
              Bridging the gap between{' '}
              <span className="text-gradient">the physical and digital</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-sm sm:text-base text-gray-400 max-w-xl mx-auto text-pretty leading-relaxed">
              NavMe is a location-based AR discovery platform that makes immersive
              augmented reality experiences as easy to find as a Google Maps pin.
            </motion.p>
          </motion.div>

          {/* Stats row */}
          <motion.div
            variants={stagger(0.08)}
            initial="hidden"
            animate="show"
            className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4"
          >
            {STATS.map(({ value, label }) => (
              <motion.div
                key={label}
                variants={fadeUp}
                className="card p-4 sm:p-6 text-center hover:-translate-y-1 transition-transform"
              >
                <div className="text-2xl sm:text-3xl font-bold text-gradient mb-1">{value}</div>
                <div className="text-xs sm:text-sm text-gray-400">{label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Problem / Solution ───────────────────────────────────────────── */}
      <Section className="section bg-surface-card/30 border-y border-surface-border">
        <div className="container-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Problem */}
            <motion.div variants={stagger(0.1)}>
              <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-xs font-semibold text-red-400 mb-5 uppercase tracking-widest">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/></svg>
                The Problem
              </motion.div>
              <motion.h2 variants={fadeUp} className="text-2xl sm:text-3xl font-display font-bold text-gray-100 mb-4">
                AR exists — but nobody can find it
              </motion.h2>
              <motion.div variants={stagger(0.08)} className="space-y-4">
                {[
                  {
                    title: 'GPS fails indoors',
                    desc: 'Traditional navigation breaks down the moment you step inside a building — exactly where AR navigation matters most.',
                  },
                  {
                    title: 'AR is hard to access',
                    desc: 'Users don\'t know what AR experiences exist near them. Discovery is fragmented across apps, QR codes, and scattered links.',
                  },
                  {
                    title: 'Context is missing',
                    desc: 'Even when AR exists, there\'s no unified layer connecting your physical location to relevant digital experiences.',
                  },
                ].map(({ title, desc }) => (
                  <motion.div
                    key={title}
                    variants={fadeUp}
                    className="flex gap-4 p-4 rounded-xl bg-red-500/5 border border-red-500/10"
                  >
                    <div className="w-1 rounded-full bg-red-500/50 flex-shrink-0 self-stretch" />
                    <div>
                      <h4 className="font-medium text-gray-200 mb-1">{title}</h4>
                      <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Solution */}
            <motion.div variants={stagger(0.1)}>
              <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-400 mb-5 uppercase tracking-widest">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/></svg>
                The Solution
              </motion.div>
              <motion.h2 variants={fadeUp} className="text-2xl sm:text-3xl font-display font-bold text-gray-100 mb-4">
                A unified AR discovery layer
              </motion.h2>
              <motion.div variants={stagger(0.08)} className="space-y-4">
                {[
                  {
                    title: 'Location-first discovery',
                    desc: 'NavMe detects your GPS coordinates in real-time and instantly surfaces the most relevant AR experiences within your radius.',
                  },
                  {
                    title: 'Zero install, instant access',
                    desc: 'No app store. No QR code hunting. Open NavMe in any browser, allow location, and explore AR within seconds.',
                  },
                  {
                    title: 'Intelligent distance filtering',
                    desc: 'Haversine-powered engine calculates precise distances and lets you set your own discovery radius from 1 km to anywhere.',
                  },
                ].map(({ title, desc }) => (
                  <motion.div
                    key={title}
                    variants={fadeUp}
                    className="flex gap-4 p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10"
                  >
                    <div className="w-1 rounded-full bg-emerald-500/50 flex-shrink-0 self-stretch" />
                    <div>
                      <h4 className="font-medium text-gray-200 mb-1">{title}</h4>
                      <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* ── Vision & Mission ─────────────────────────────────────────────── */}
      <Section className="section">
        <div className="container-xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <motion.div variants={fadeUp} className="card p-5 sm:p-7 group hover:-translate-y-1 transition-transform">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-brand-500/20 to-accent-500/20 border border-brand-500/30 flex items-center justify-center text-xl mb-4">
                🔭
              </div>
              <h3 className="text-lg sm:text-xl font-display font-bold text-gray-100 mb-2">Our Vision</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                A world where digital and physical layers are seamlessly connected — where every
                street and landmark has a discoverable AR dimension accessible to anyone with a browser.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="card p-5 sm:p-7 group hover:-translate-y-1 transition-transform">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-accent-500/20 to-brand-500/20 border border-accent-500/30 flex items-center justify-center text-xl mb-4">
                🎯
              </div>
              <h3 className="text-lg sm:text-xl font-display font-bold text-gray-100 mb-2">Our Mission</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                To democratize AR discovery by building the most privacy-first, zero-install
                platform for publishing and finding location-based AR experiences on the open web.
              </p>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* ── Technology ───────────────────────────────────────────────────── */}
      <Section className="section bg-surface-card/20 border-y border-surface-border">
        <div className="container-xl">
          <motion.div variants={stagger(0.1)} className="text-center mb-8 sm:mb-12">
            <motion.p variants={fadeUp} className="text-xs font-semibold uppercase tracking-widest text-brand-400 mb-3">
              Technology
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-2xl sm:text-3xl font-display font-bold text-gray-100 text-balance">
              Built on{' '}
              <span className="text-gradient">open web standards</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-4 text-gray-400 max-w-lg mx-auto">
              NavMe leverages the best of modern web APIs — no proprietary SDKs,
              no walled gardens, no lock-in.
            </motion.p>
          </motion.div>

          <motion.div
            variants={stagger(0.07)}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {TECH_STACK.map(({ name, desc, icon, color }) => (
              <motion.div
                key={name}
                variants={fadeUp}
                className={`flex items-start gap-4 p-5 rounded-2xl border ${color} hover:-translate-y-0.5 transition-all duration-200`}
              >
                <div className="text-2xl flex-shrink-0">{icon}</div>
                <div>
                  <h4 className="font-semibold text-gray-200 mb-1">{name}</h4>
                  <p className="text-xs text-gray-500">{desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Section>

      {/* ── Timeline ─────────────────────────────────────────────────────── */}
      <Section className="section">
        <div className="container-xl">
          <motion.div variants={stagger(0.1)} className="text-center mb-8 sm:mb-12">
            <motion.p variants={fadeUp} className="text-xs font-semibold uppercase tracking-widest text-accent-400 mb-3">
              Journey
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-2xl sm:text-3xl font-display font-bold text-gray-100">
              How we got here
            </motion.h2>
          </motion.div>

          <motion.div variants={stagger(0.12)} className="relative max-w-2xl mx-auto">
            {/* Vertical line */}
            <div className="absolute left-[22px] top-4 bottom-4 w-px bg-gradient-to-b from-brand-500/60 via-accent-500/40 to-transparent hidden sm:block" />

            {TIMELINE.map(({ year, title, desc }) => (
              <motion.div
                key={year}
                variants={fadeUp}
                className="flex gap-5 mb-8 last:mb-0"
              >
                <div className="flex-shrink-0 w-11 h-11 rounded-full bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center text-white text-xs font-bold shadow-glow-sm relative z-10">
                  {year.includes('Q') ? year.slice(0, 2) : year.slice(2)}
                </div>
                <div className="pb-8 last:pb-0">
                  <div className="text-xs text-brand-400 font-medium mb-1">{year}</div>
                  <h4 className="font-semibold text-gray-100 mb-1">{title}</h4>
                  <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="section-sm border-t border-surface-border">
        <div className="container-xl text-center">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-display font-bold text-gray-100 mb-3">
            Ready to experience AR near you?
          </h2>
          <p className="text-sm sm:text-base text-gray-400 mb-6 max-w-md mx-auto">
            Jump into the Discover page and find AR experiences within your radius — right now.
          </p>
          <Link to="/discover" className="btn btn-primary btn-lg">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            Start Exploring
          </Link>
        </div>
      </section>
    </main>
  )
}
