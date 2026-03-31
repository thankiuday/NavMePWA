import { lazy, Suspense, useState, useEffect } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ThemeProvider } from './context/ThemeContext'
import { ToastProvider } from './context/ToastContext'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import BottomNav from './components/layout/BottomNav'
import ToastContainer from './components/ui/Toast'
import OnboardingModal from './components/ui/OnboardingModal'
import { useOnboarding } from './hooks/useOnboarding'

// Lazy-loaded pages
const Home     = lazy(() => import('./pages/Home'))
const Discover = lazy(() => import('./pages/Discover'))
const About    = lazy(() => import('./pages/About'))
const Contact  = lazy(() => import('./pages/Contact'))
const NotFound = lazy(() => import('./pages/NotFound'))

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center pt-[var(--nav-height)]">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center gap-4"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
          className="w-10 h-10 rounded-full border-2 border-surface-border border-t-brand-500"
        />
        <span className="text-sm text-gray-500">Loading…</span>
      </motion.div>
    </div>
  )
}

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <Suspense fallback={<PageLoader />}>
          <Routes location={location}>
            <Route path="/"         element={<Home />}     />
            <Route path="/discover" element={<Discover />} />
            <Route path="/about"    element={<About />}    />
            <Route path="/contact"  element={<Contact />}  />
            <Route path="*"         element={<NotFound />} />
          </Routes>
        </Suspense>
      </motion.div>
    </AnimatePresence>
  )
}

function OnboardingGate() {
  const { shouldShow, recordVisit, getCurrentVisit, MAX_VISITS } = useOnboarding()
  const [open, setOpen] = useState(() => shouldShow())
  const currentVisit = getCurrentVisit()

  useEffect(() => {
    if (open) recordVisit()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <OnboardingModal
      open={open}
      onClose={() => setOpen(false)}
      currentVisit={currentVisit}
      maxVisits={MAX_VISITS}
    />
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <BrowserRouter>
          <div className="flex flex-col min-h-screen bg-surface-dark text-gray-100">
            <Navbar />

            {/* Main content — extra bottom padding on mobile for BottomNav */}
            <div className="flex-1 pb-16 md:pb-0">
              <AnimatedRoutes />
            </div>

            {/* Footer — hidden on mobile, shown md+ */}
            <div className="hidden md:block">
              <Footer />
            </div>

            {/* Bottom navigation — mobile only */}
            <BottomNav />
          </div>
          <ToastContainer />
          {/* Onboarding tour — renders for first 5 app visits */}
          <OnboardingGate />
        </BrowserRouter>
      </ToastProvider>
    </ThemeProvider>
  )
}
