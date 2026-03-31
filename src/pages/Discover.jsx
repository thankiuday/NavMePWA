import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AR_EXPERIENCES, CATEGORIES, CATEGORY_CONFIG } from '../data/mockARData'
import { filterByRadius } from '../utils/haversine'
import { useGeolocation } from '../hooks/useGeolocation'
import { useToast } from '../hooks/useToast'
import ARCard from '../components/ui/ARCard'
import LocationModal from '../components/ui/LocationModal'
import { GridSkeleton } from '../components/ui/SkeletonLoader'
import { BrandMark } from '../components/ui/BrandLogo'

const RADIUS_OPTIONS = [
  { value: 1,   label: '1 km'  },
  { value: 3,   label: '3 km'  },
  { value: 5,   label: '5 km'  },
  { value: 10,  label: '10 km' },
  { value: 999, label: 'Any'   },
]

// ── Sub-components ────────────────────────────────────────────────────────────

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
  )
}

function EmptyState({ search, category, radius, onResetRadius, hasLocation }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="col-span-full flex flex-col items-center justify-center py-20 text-center gap-5"
    >
      <div className="w-20 h-20 rounded-2xl bg-surface-card border border-surface-border flex items-center justify-center text-4xl">
        {search ? '🔍' : '📍'}
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-200 mb-2">No AR experiences found</h3>
        <p className="text-sm text-gray-400 max-w-xs leading-relaxed">
          {search
            ? `No results for "${search}". Try clearing the search.`
            : hasLocation && radius < 999
            ? `Nothing within ${radius} km of you. Try expanding your radius.`
            : category !== 'all'
            ? `No ${CATEGORY_CONFIG[category]?.label} experiences available right now.`
            : 'No experiences match your current filters.'}
        </p>
      </div>
      {hasLocation && radius < 999 && (
        <button
          onClick={onResetRadius}
          className="btn btn-secondary btn-sm"
        >
          Expand to Any Distance
        </button>
      )}
    </motion.div>
  )
}

/** Pulsing GPS animation shown while location is loading */
function GPSLoadingState() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="col-span-full flex flex-col items-center justify-center py-20 gap-6"
    >
      {/* Animated radar rings */}
      <div className="relative flex items-center justify-center w-24 h-24">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border border-brand-500/40"
            animate={{ scale: [1, 2.2], opacity: [0.6, 0] }}
            transition={{
              repeat: Infinity,
              duration: 2,
              delay: i * 0.6,
              ease: 'easeOut',
            }}
            style={{ width: 40, height: 40 }}
          />
        ))}
        <div className="w-10 h-10 rounded-full bg-brand-500/20 border border-brand-500/50 flex items-center justify-center z-10">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-400">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
          </svg>
        </div>
      </div>

      <div className="text-center">
        <p className="text-base font-semibold text-gray-200 mb-1">Detecting your location…</p>
        <p className="text-sm text-gray-500">Getting your GPS coordinates for precise results</p>
      </div>

      {/* Skeleton preview underneath */}
      <div className="w-full max-w-3xl mt-2">
        <GridSkeleton count={3} />
      </div>
    </motion.div>
  )
}

/** Location status bar shown at top of results */
function LocationStatusBar({ coords, error, loading, onRetry, onEnable }) {
  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3 px-4 py-3 rounded-xl bg-brand-500/8 border border-brand-500/20 text-sm"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
          className="w-4 h-4 border-2 border-brand-500/30 border-t-brand-400 rounded-full flex-shrink-0"
        />
        <span className="text-brand-300 font-medium">Getting your location…</span>
        <span className="text-gray-500 text-xs">This may take a few seconds</span>
      </motion.div>
    )
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center gap-3 px-4 py-3 rounded-xl bg-red-500/8 border border-red-500/20 text-sm"
      >
        <svg width="15" height="15" className="text-red-400 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
        <span className="text-red-300 flex-1">{error}</span>
        <button onClick={onRetry} className="btn btn-sm bg-red-500/15 text-red-300 border border-red-500/25 hover:bg-red-500/25 flex-shrink-0">
          Try Again
        </button>
      </motion.div>
    )
  }

  if (coords) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-emerald-500/8 border border-emerald-500/20 text-sm"
      >
        <span className="relative flex-shrink-0">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 block" />
          <motion.span
            animate={{ scale: [1, 1.8], opacity: [0.6, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeOut' }}
            className="absolute inset-0 rounded-full bg-emerald-400 block"
          />
        </span>
        <span className="text-emerald-400 font-semibold">Live Location Active</span>
        <span className="text-gray-500 font-mono text-xs hidden sm:inline">
          {coords.lat.toFixed(5)}°N, {coords.lng.toFixed(5)}°E
        </span>
        {coords.accuracy && (
          <span className="ml-auto text-gray-600 text-xs hidden sm:inline">
            ±{Math.round(coords.accuracy)} m accuracy
          </span>
        )}
      </motion.div>
    )
  }

  // No location, not loading, no error — show enable prompt inline
  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-wrap items-center gap-3 px-4 py-3 rounded-xl bg-surface-card border border-surface-border text-sm"
    >
      <svg width="15" height="15" className="text-gray-400 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
      </svg>
      <span className="text-gray-400 flex-1">Showing all experiences — enable location for distance-based discovery.</span>
      <button onClick={onEnable} className="btn btn-sm btn-primary flex-shrink-0">
        Enable GPS
      </button>
    </motion.div>
  )
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function Discover() {
  const { coords, error, loading, granted, requestLocation } = useGeolocation()
  const { success: toastSuccess, error: toastError, info: toastInfo } = useToast()

  const [showModal, setShowModal]       = useState(false)
  const [locationDismissed, setDismissed] = useState(false)
  const [search, setSearch]             = useState('')
  const [category, setCategory]         = useState('all')
  const [radius, setRadius]             = useState(5)
  const [sortBy, setSortBy]             = useState('distance')
  const hasMounted = useRef(false)

  // On mount: if permission already granted, request GPS immediately; else show modal after brief delay.
  useEffect(() => {
    if (hasMounted.current) return
    hasMounted.current = true

    let timeoutId
    let cancelled = false

    const openModalSoon = () => {
      timeoutId = window.setTimeout(() => {
        if (!cancelled) setShowModal(true)
      }, 350)
    }

    ;(async () => {
      if (!navigator.geolocation) return

      try {
        if (navigator.permissions?.query) {
          const status = await navigator.permissions.query({ name: 'geolocation' })
          if (cancelled) return
          if (status.state === 'granted') {
            requestLocation()
            return
          }
          if (status.state === 'denied') {
            setDismissed(true)
            return
          }
        }
      } catch {
        /* Safari / older browsers may not support permissions API */
      }

      if (!cancelled) openModalSoon()
    })()

    return () => {
      cancelled = true
      if (timeoutId) window.clearTimeout(timeoutId)
    }
  }, [requestLocation])

  // Toast feedback when location is granted
  useEffect(() => {
    if (granted && coords) {
      toastSuccess(
        `Showing AR experiences within ${radius} km of you`,
        '📍 Location detected',
      )
    }
  }, [granted]) // eslint-disable-line react-hooks/exhaustive-deps

  // Toast on location error
  useEffect(() => {
    if (error) toastError(error, 'Location error')
  }, [error]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleAllow = useCallback(() => {
    setShowModal(false)
    requestLocation()
  }, [requestLocation])

  const handleDismiss = useCallback(() => {
    setShowModal(false)
    setDismissed(true)
    toastInfo(
      'Showing all experiences without distance sorting.',
      'Location skipped',
    )
  }, [toastInfo])

  const handleEnableGPS = useCallback(() => {
    setShowModal(true)
  }, [])

  const handleRetry = useCallback(() => {
    requestLocation()
  }, [requestLocation])

  // ── Filtered + sorted results ─────────────────────────────────────────────
  const results = useMemo(() => {
    let base = coords
      ? filterByRadius(AR_EXPERIENCES, coords.lat, coords.lng, radius)
      : AR_EXPERIENCES.map(exp => ({ ...exp, distance: undefined, distanceLabel: undefined }))

    if (category !== 'all') {
      base = base.filter(exp => exp.category === category)
    }

    if (search.trim()) {
      const q = search.toLowerCase()
      base = base.filter(exp =>
        exp.title.toLowerCase().includes(q) ||
        exp.description.toLowerCase().includes(q) ||
        exp.location.landmark.toLowerCase().includes(q) ||
        exp.location.city.toLowerCase().includes(q) ||
        exp.location.area.toLowerCase().includes(q),
      )
    }

    if (sortBy === 'rating') {
      base = [...base].sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
    }

    return base
  }, [coords, radius, category, search, sortBy])

  const showGPSLoader = loading && !coords

  return (
    <main className="min-h-screen pt-[var(--nav-height)]">

      {/* ── Page Header ──────────────────────────────────────────────────── */}
      <div className="bg-surface-card/40 border-b border-surface-border backdrop-blur-sm">
        <div className="container-xl py-5 sm:py-6">
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex items-center gap-2 mb-1.5">
              <span className="badge-brand text-[10px] uppercase tracking-widest font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse flex-shrink-0" />
                Live Discovery
              </span>
              {!showGPSLoader && results.length > 0 && (
                <span className="text-xs text-gray-500">{results.length} found</span>
              )}
            </div>
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                <BrandMark size={40} className="flex-shrink-0" imgClassName="ring-1 ring-white/10" />
                <h1 className="text-xl sm:text-2xl font-display font-bold text-gray-100 min-w-0 leading-tight">
                  Discover AR <span className="text-gradient">Near You</span>
                </h1>
              </div>
              {/* Sort — compact on mobile */}
              <div className="flex rounded-lg overflow-hidden border border-surface-border bg-surface-card flex-shrink-0">
                {[
                  { v: 'distance', label: 'Nearest' },
                  { v: 'rating',   label: 'Top Rated' },
                ].map(({ v, label }) => (
                  <button
                    key={v}
                    onClick={() => setSortBy(v)}
                    disabled={v === 'distance' && !coords}
                    className={`px-2.5 sm:px-3 py-1.5 text-[11px] sm:text-xs font-medium transition-all whitespace-nowrap ${
                      sortBy === v
                        ? 'bg-brand-500 text-white'
                        : 'text-gray-400 hover:text-gray-200 disabled:opacity-40'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container-xl py-5 space-y-4">

        {/* ── Location status bar ──────────────────────────────────────────── */}
        <LocationStatusBar
          coords={coords}
          error={error}
          loading={loading}
          onRetry={handleRetry}
          onEnable={handleEnableGPS}
        />

        {/* ── Search bar ───────────────────────────────────────────────────── */}
        <div className="relative">
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
            <SearchIcon />
          </div>
          <input
            type="search"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by title, landmark, city, area…"
            className="input pl-10 pr-4"
            aria-label="Search AR experiences"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
              aria-label="Clear search"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          )}
        </div>

        {/* ── Filters row ──────────────────────────────────────────────────── */}
        <div className="flex flex-col gap-2.5">
          {/* Category pills — horizontal scroll on mobile */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none -mx-4 px-4 pb-0.5">
            {CATEGORIES.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => setCategory(id)}
                className={`flex-shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 ${
                  category === id
                    ? 'bg-brand-500 text-white shadow-glow-sm'
                    : 'bg-surface-card border border-surface-border text-gray-400 hover:border-brand-500/40 hover:text-gray-200'
                }`}
              >
                {id !== 'all' && <span className="text-base leading-none">{CATEGORY_CONFIG[id]?.icon}</span>}
                {label}
              </button>
            ))}
          </div>

          {/* Radius pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none -mx-4 px-4 pb-0.5">
            <span className="text-[11px] text-gray-500 whitespace-nowrap flex-shrink-0 mr-1">Within:</span>
            {RADIUS_OPTIONS.map(({ value, label }) => (
              <button
                key={value}
                onClick={() => setRadius(value)}
                disabled={!coords}
                className={`flex-shrink-0 px-2.5 py-1 rounded-lg text-[11px] sm:text-xs font-medium border transition-all duration-200 ${
                  radius === value
                    ? coords
                      ? 'bg-brand-500/20 text-brand-300 border-brand-500/40'
                      : 'bg-surface-card text-gray-500 border-surface-border'
                    : 'bg-transparent text-gray-500 border-surface-border hover:text-gray-300 hover:border-gray-500 disabled:opacity-35 disabled:cursor-not-allowed'
                }`}
                title={!coords ? 'Enable location first' : `Show within ${label}`}
              >
                {label}
              </button>
            ))}
            {!coords && (
              <span className="text-[10px] text-gray-600 whitespace-nowrap flex-shrink-0">
                enable location first
              </span>
            )}
          </div>
        </div>

        {/* ── Results ──────────────────────────────────────────────────────── */}
        <AnimatePresence mode="wait">
          {showGPSLoader ? (
            <motion.div
              key="gps-loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              <GPSLoadingState />
            </motion.div>
          ) : (
            <motion.div
              key={`results-${category}-${radius}-${search}-${sortBy}-${!!coords}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {results.length === 0 ? (
                <EmptyState
                  search={search}
                  category={category}
                  radius={radius}
                  hasLocation={!!coords}
                  onResetRadius={() => setRadius(999)}
                />
              ) : (
                results.map((exp, i) => (
                  <ARCard key={exp.id} experience={exp} index={i} />
                ))
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Footer count ─────────────────────────────────────────────────── */}
        {!showGPSLoader && results.length > 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-xs text-gray-600 pt-2 pb-4"
          >
            Showing {results.length} of {AR_EXPERIENCES.length} AR experiences
            {coords && radius < 999 && ` within ${radius} km`}
            {coords && radius === 999 && ' — all distances'}
          </motion.p>
        )}
      </div>

      {/* ── Location permission modal ────────────────────────────────────── */}
      <LocationModal
        open={showModal}
        onAllow={handleAllow}
        onDismiss={handleDismiss}
        loading={loading}
        error={null}
      />
    </main>
  )
}
