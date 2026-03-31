import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useScrolled } from '../../hooks/useScrolled'
import ThemeToggle from '../ui/ThemeToggle'
import BrandLogo from '../ui/BrandLogo'

const NAV_LINKS = [
  { to: '/',         label: 'Home'     },
  { to: '/discover', label: 'Discover' },
  { to: '/about',    label: 'About'    },
  { to: '/contact',  label: 'Contact'  },
]

export default function Navbar() {
  const scrolled    = useScrolled(20)
  const [open, setOpen] = useState(false)
  const location    = useLocation()
  const menuRef     = useRef(null)

  // Close mobile menu on route change
  useEffect(() => { setOpen(false) }, [location.pathname])

  // Close on outside click
  useEffect(() => {
    if (!open) return
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'glass border-b border-white/8 shadow-lg'
          : 'bg-transparent'
      }`}
      style={{ height: 'var(--nav-height)' }}
    >
      <div className="container-xl h-full flex items-center justify-between">
        {/* ── Logo ─────────────────────────────────────────────────── */}
        <Link
          to="/"
          className="group flex items-center min-w-0"
          aria-label="NavMe home"
        >
          <BrandLogo
            size="md"
            className="min-w-0"
            imgClassName="transition-all duration-300 group-hover:shadow-[0_0_22px_rgba(99,102,241,0.4)] group-hover:scale-[1.03]"
          />
        </Link>

        {/* ── Desktop Nav ───────────────────────────────────────────── */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `relative px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                  isActive
                    ? 'text-white'
                    : 'text-gray-400 hover:text-gray-100 hover:bg-white/5'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {label}
                  {isActive && (
                    <motion.span
                      layoutId="navbar-indicator"
                      className="absolute inset-0 rounded-lg bg-white/8 border border-white/10"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* ── Right Controls ─────────────────────────────────────────── */}
        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />

          <Link
            to="/discover"
            className="hidden md:flex btn-primary btn text-sm"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            Explore AR
          </Link>

          {/* Hamburger — only on tablet (md breakpoint), not on mobile which uses BottomNav */}
          <button
            onClick={() => setOpen(v => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="hidden sm:flex md:hidden w-10 h-10 flex-col items-center justify-center gap-1.5 rounded-xl hover:bg-white/8 transition-colors"
          >
            <motion.span
              animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              className="block w-5 h-px bg-gray-300 origin-center transition-colors"
            />
            <motion.span
              animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              className="block w-5 h-px bg-gray-300"
            />
            <motion.span
              animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              className="block w-5 h-px bg-gray-300 origin-center"
            />
          </button>
        </div>
      </div>

      {/* ── Mobile Menu ────────────────────────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 top-[72px] bg-black/60 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              ref={menuRef}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ type: 'spring', bounce: 0.1, duration: 0.35 }}
              className="absolute top-full left-0 right-0 glass border-b border-white/8 z-50 md:hidden"
            >
              <nav className="container-xl py-4 flex flex-col gap-1">
                {NAV_LINKS.map(({ to, label }) => (
                  <NavLink
                    key={to}
                    to={to}
                    end={to === '/'}
                    className={({ isActive }) =>
                      `px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-brand-500/15 text-brand-300 border border-brand-500/20'
                          : 'text-gray-300 hover:bg-white/5 hover:text-white'
                      }`
                    }
                  >
                    {label}
                  </NavLink>
                ))}
                <div className="mt-2 pt-3 border-t border-white/8">
                  <Link to="/discover" className="btn-primary btn w-full justify-center">
                    Explore AR Experiences
                  </Link>
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}
