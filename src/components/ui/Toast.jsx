import { AnimatePresence, motion } from 'framer-motion'
import { useToastContext } from '../../context/ToastContext'

const ICONS = {
  success: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-400">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
    </svg>
  ),
  error: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-red-400">
      <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
    </svg>
  ),
  warning: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-amber-400">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
      <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>
  ),
  info: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-brand-400">
      <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
    </svg>
  ),
}

const ACCENT = {
  success: 'border-l-emerald-500',
  error:   'border-l-red-500',
  warning: 'border-l-amber-500',
  info:    'border-l-brand-500',
}

function ToastItem({ id, type = 'info', title, message, exiting }) {
  const { dismiss } = useToastContext()

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={exiting
        ? { opacity: 0, x: 80, scale: 0.9 }
        : { opacity: 1, y: 0, scale: 1 }
      }
      transition={{ type: 'spring', bounce: 0.3, duration: 0.4 }}
      className={`relative flex gap-3 items-start p-4 rounded-xl
        glass border-l-2 ${ACCENT[type]}
        shadow-card-dark max-w-sm w-full pointer-events-auto`}
    >
      <div className="flex-shrink-0 mt-0.5">{ICONS[type]}</div>

      <div className="flex-1 min-w-0">
        {title && (
          <p className="text-sm font-semibold text-gray-100 mb-0.5">{title}</p>
        )}
        {message && (
          <p className="text-xs text-gray-400 leading-relaxed">{message}</p>
        )}
      </div>

      <button
        onClick={() => dismiss(id)}
        aria-label="Dismiss notification"
        className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-md text-gray-500 hover:text-gray-300 hover:bg-white/8 transition-colors -mt-0.5"
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>
    </motion.div>
  )
}

export default function ToastContainer() {
  const { toasts } = useToastContext()

  return (
    <div
      aria-live="polite"
      aria-atomic="false"
      className="fixed bottom-6 right-4 sm:right-6 z-[200] flex flex-col gap-3 pointer-events-none"
    >
      <AnimatePresence mode="popLayout">
        {toasts.map(toast => (
          <ToastItem key={toast.id} {...toast} />
        ))}
      </AnimatePresence>
    </div>
  )
}
