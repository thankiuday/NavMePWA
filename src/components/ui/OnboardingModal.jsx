import { createPortal } from 'react-dom'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { BrandMark } from './BrandLogo'

// ── Step visuals ──────────────────────────────────────────────────────────────

function VisualPin() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="relative flex items-center justify-center">
        {/* Outer glow rings */}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border border-brand-500/30"
            style={{ width: 80 + i * 44, height: 80 + i * 44 }}
            animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.15, 0.5] }}
            transition={{ duration: 2.4, delay: i * 0.4, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
          className="relative z-10 flex flex-col items-center"
        >
          <BrandMark
            size={80}
            imgClassName="shadow-glow-md ring-2 ring-brand-500/35"
          />
          <motion.div
            animate={{ scaleX: [1, 0.8, 1], opacity: [0.3, 0.15, 0.3] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
            className="mt-2 w-10 h-2 rounded-full bg-brand-500/30 blur-sm"
          />
        </motion.div>
      </div>
    </div>
  )
}

function VisualGPS() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="relative flex items-center justify-center">
        {/* Pulse rings */}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border-2 border-emerald-400"
            style={{ width: 40, height: 40 }}
            animate={{ scale: [1, 3.5 - i * 0.4], opacity: [0.8, 0] }}
            transition={{
              duration: 2,
              delay: i * 0.55,
              repeat: Infinity,
              ease: 'easeOut',
            }}
          />
        ))}
        {/* Center dot */}
        <div className="relative z-10 w-12 h-12 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center shadow-[0_0_20px_rgba(52,211,153,0.5)]">
          <motion.div
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-4 h-4 rounded-full bg-emerald-400"
          />
        </div>
        {/* Coordinates badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="absolute -bottom-10 glass rounded-xl px-3 py-1.5 border border-emerald-500/30"
        >
          <span className="text-[11px] text-emerald-400 font-mono">13.0053°N, 77.7068°E</span>
        </motion.div>
      </div>
    </div>
  )
}

function VisualDiscover() {
  const cards = [
    { title: 'Campus Tour AR', dist: '0.3 km', cat: '🎓', color: 'text-blue-400' },
    { title: 'Heritage Walk AR', dist: '1.2 km', cat: '🗺️', color: 'text-emerald-400' },
  ]
  return (
    <div className="flex flex-col items-center justify-center h-full gap-3 px-2">
      {/* Distance badge */}
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', bounce: 0.4, duration: 0.6 }}
        className="badge bg-brand-500/20 text-brand-300 border border-brand-500/30 text-xs font-mono mb-1"
      >
        Within 5 km radius
      </motion.div>
      {/* Mini AR cards */}
      {cards.map((card, i) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 + i * 0.18, duration: 0.45 }}
          className="w-full max-w-[260px] flex items-center gap-3 p-3 rounded-xl bg-surface-card border border-surface-border"
        >
          <span className="text-xl flex-shrink-0">{card.cat}</span>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-gray-200 truncate">{card.title}</p>
            <p className={`text-[11px] ${card.color} font-mono`}>{card.dist} away</p>
          </div>
          <span className="text-[11px] text-brand-400 font-semibold flex-shrink-0">Open →</span>
        </motion.div>
      ))}
    </div>
  )
}

function VisualCategories() {
  const cats = [
    { label: 'Campus',  icon: '🎓', color: 'border-blue-500/40 bg-blue-500/10 text-blue-300'    },
    { label: 'Events',  icon: '🎪', color: 'border-accent-500/40 bg-accent-500/10 text-accent-300' },
    { label: 'Tourism', icon: '🗺️', color: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300' },
    { label: 'Retail',  icon: '🛍️', color: 'border-amber-500/40 bg-amber-500/10 text-amber-300'  },
  ]
  return (
    <div className="flex items-center justify-center h-full">
      <div className="grid grid-cols-2 gap-3">
        {cats.map((cat, i) => (
          <motion.div
            key={cat.label}
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: i * 0.12, type: 'spring', bounce: 0.5, duration: 0.5 }}
            className={`flex flex-col items-center justify-center gap-2 w-[110px] h-[80px] rounded-2xl border ${cat.color}`}
          >
            <span className="text-2xl">{cat.icon}</span>
            <span className="text-xs font-semibold">{cat.label}</span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function VisualReady() {
  const DOT_COLORS = [
    '#6366f1', '#8b5cf6', '#34d399', '#fbbf24',
    '#60a5fa', '#f472b6', '#a78bfa', '#fb923c',
  ]
  return (
    <div className="flex items-center justify-center h-full relative">
      {/* Burst dots */}
      {DOT_COLORS.map((color, i) => {
        const angle = (i / DOT_COLORS.length) * 360
        const rad = (angle * Math.PI) / 180
        const tx = Math.cos(rad) * 72
        const ty = Math.sin(rad) * 72
        return (
          <motion.div
            key={i}
            className="absolute w-3 h-3 rounded-full"
            style={{ backgroundColor: color }}
            initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
            animate={{
              x: [0, tx * 0.6, tx],
              y: [0, ty * 0.6, ty],
              scale: [0, 1.3, 1],
              opacity: [0, 1, 0.85],
            }}
            transition={{
              delay: 0.15 + i * 0.06,
              duration: 0.7,
              ease: 'easeOut',
            }}
          />
        )
      })}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, type: 'spring', bounce: 0.45 }}
        className="relative z-10"
      >
        <motion.div
          animate={{ rotate: [0, 6, -6, 0] }}
          transition={{ duration: 1.2, delay: 0.9, repeat: Infinity, repeatDelay: 2 }}
        >
          <BrandMark size={80} imgClassName="shadow-glow-lg ring-2 ring-white/20" />
        </motion.div>
      </motion.div>
    </div>
  )
}

// ── Step definitions ──────────────────────────────────────────────────────────

const STEPS = [
  {
    visual: <VisualPin />,
    headline: 'Welcome to NavMe',
    body: 'Discover augmented reality experiences around you — zero install, zero friction. Just open, allow location, and explore AR in the real world.',
    accent: 'text-brand-400',
  },
  {
    visual: <VisualGPS />,
    headline: 'Allow Your Location',
    body: 'NavMe reads your GPS coordinates locally to surface nearby AR. Your location is never stored or shared — it stays on your device, always.',
    accent: 'text-emerald-400',
  },
  {
    visual: <VisualDiscover />,
    headline: 'Discover AR Near You',
    body: 'Our Haversine engine instantly calculates the distance to every AR experience and shows you the nearest ones first. Adjust the radius from 1 km to anywhere.',
    accent: 'text-blue-400',
  },
  {
    visual: <VisualCategories />,
    headline: 'Filter by Category',
    body: 'Browse AR experiences by Campus, Events, Tourism, or Retail. Tap a category chip on the Discover page to narrow results to what matters most to you.',
    accent: 'text-accent-400',
  },
  {
    visual: <VisualReady />,
    headline: "You're Ready to Explore",
    body: "That's everything you need to know. Head to Discover, allow location access, and find AR experiences right around you — right now.",
    accent: 'text-amber-400',
    isFinal: true,
  },
]

// ── Main component ────────────────────────────────────────────────────────────

export default function OnboardingModal({ open, onClose, currentVisit, maxVisits }) {
  const [step, setStep] = useState(0)
  const [direction, setDirection] = useState(1)
  const total = STEPS.length

  const goNext = () => {
    if (step < total - 1) {
      setDirection(1)
      setStep(s => s + 1)
    } else {
      onClose()
    }
  }

  const goPrev = () => {
    if (step > 0) {
      setDirection(-1)
      setStep(s => s - 1)
    }
  }

  const handleSkip = () => {
    onClose()
  }

  const current = STEPS[step]

  const variants = {
    enter:  (dir) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit:   (dir) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
  }

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
          />

          {/* Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: 'spring', bounce: 0.28, duration: 0.5 }}
            className="relative w-full max-w-sm sm:max-w-md z-10 glass rounded-3xl overflow-hidden shadow-2xl border border-white/10"
            role="dialog"
            aria-modal="true"
            aria-label="NavMe onboarding tour"
          >
            {/* Visit counter + skip row */}
            <div className="flex items-center justify-between px-5 pt-4">
              <span className="text-[11px] text-gray-500 font-medium">
                Visit {currentVisit} of {maxVisits}
              </span>
              {!current.isFinal && (
                <button
                  onClick={handleSkip}
                  className="text-[11px] text-gray-500 hover:text-gray-300 transition-colors font-medium px-2 py-1 rounded-lg hover:bg-white/8"
                >
                  Skip tour
                </button>
              )}
            </div>

            {/* Visual area */}
            <div className="relative h-48 overflow-hidden mt-2">
              <AnimatePresence custom={direction} mode="wait">
                <motion.div
                  key={step}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.32, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="absolute inset-0"
                >
                  {current.visual}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Text content */}
            <div className="px-6 pb-2 min-h-[110px]">
              <AnimatePresence custom={direction} mode="wait">
                <motion.div
                  key={`text-${step}`}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <h2 className={`text-xl font-display font-bold mb-2 ${current.accent}`}>
                    {current.headline}
                  </h2>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {current.body}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Progress dots */}
            <div className="flex items-center justify-center gap-2 py-3">
              {STEPS.map((_, i) => (
                <motion.button
                  key={i}
                  onClick={() => {
                    setDirection(i > step ? 1 : -1)
                    setStep(i)
                  }}
                  aria-label={`Go to step ${i + 1}`}
                  animate={{
                    width: i === step ? 24 : 7,
                    backgroundColor: i === step ? '#6366f1' : 'rgba(255,255,255,0.2)',
                  }}
                  transition={{ type: 'spring', bounce: 0.3, duration: 0.4 }}
                  className="h-1.5 rounded-full flex-shrink-0 focus:outline-none"
                />
              ))}
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-3 px-5 pb-5">
              {step > 0 && (
                <button
                  onClick={goPrev}
                  className="btn btn-ghost text-sm px-4 py-2.5 flex-shrink-0"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
                  </svg>
                  Back
                </button>
              )}

              {current.isFinal ? (
                <Link
                  to="/discover"
                  onClick={onClose}
                  className="btn btn-primary flex-1 justify-center py-2.5 text-sm"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                  </svg>
                  Start Discovering
                </Link>
              ) : (
                <button
                  onClick={goNext}
                  className="btn btn-primary flex-1 justify-center py-2.5 text-sm"
                >
                  Next
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                  </svg>
                </button>
              )}
            </div>

            {/* Step counter */}
            <div className="text-center pb-4">
              <span className="text-[11px] text-gray-600">
                {step + 1} / {total}
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
