import { motion } from 'framer-motion'
import Modal from './Modal'
import { BrandMark } from './BrandLogo'

export default function LocationModal({ open, onAllow, onDismiss, loading, error }) {
  return (
    <Modal open={open} size="md">
      <div className="flex flex-col items-center text-center gap-5">
        {/* Animated pin icon */}
        <div className="relative">
          <motion.div
            animate={{ scale: [1, 1.06, 1] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
            className="flex items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500/15 to-accent-500/15 border border-brand-500/25 p-2"
          >
            <BrandMark size={72} imgClassName="ring-2 ring-brand-500/25" />
          </motion.div>

          {/* Pulse rings */}
          <motion.div
            animate={{ scale: [1, 1.6], opacity: [0.4, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeOut' }}
            className="absolute inset-0 rounded-2xl border border-brand-500/40"
          />
          <motion.div
            animate={{ scale: [1, 1.9], opacity: [0.25, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeOut', delay: 0.4 }}
            className="absolute inset-0 rounded-2xl border border-brand-500/20"
          />
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-gray-100">
            Allow Location Access
          </h2>
          <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
            NavMe uses your real-time location to discover AR experiences within your radius. No data is stored or shared.
          </p>
        </div>

        {/* Error state */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-400 text-left"
          >
            {error}
          </motion.div>
        )}

        {/* Privacy note */}
        <div className="flex items-center gap-2 text-xs text-gray-500 bg-surface-card border border-surface-border rounded-lg px-3 py-2 w-full">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 text-emerald-400">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
          <span>Your location stays on your device. Zero data collection.</span>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2.5 w-full">
          <button
            onClick={onAllow}
            disabled={loading}
            className="btn btn-primary w-full justify-center py-3"
          >
            {loading ? (
              <>
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
                  className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                />
                Detecting location…
              </>
            ) : (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
                Allow Location Access
              </>
            )}
          </button>

          <button
            onClick={onDismiss}
            disabled={loading}
            className="btn btn-ghost w-full justify-center text-gray-500 hover:text-gray-300"
          >
            Maybe later
          </button>
        </div>
      </div>
    </Modal>
  )
}
