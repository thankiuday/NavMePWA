import { useCallback, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const DISMISS_KEY = 'navme-install-banner-dismissed'

function isStandalone() {
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    window.matchMedia('(display-mode: fullscreen)').matches ||
    window.navigator.standalone === true
  )
}

function isIOS() {
  return /iPad|iPhone|iPod/i.test(navigator.userAgent)
}

/**
 * Surfaces PWA install on supported Chromium browsers; iOS “Add to Home Screen” hint on Safari.
 * Hidden when already running as installed app or after user dismisses.
 */
export default function InstallAppPrompt() {
  const [deferred, setDeferred] = useState(null)
  const [showIos, setShowIos] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (isStandalone()) return
    try {
      if (localStorage.getItem(DISMISS_KEY) === '1') return
    } catch {
      /* private mode */
    }

    if (isIOS()) {
      setShowIos(true)
      setVisible(true)
      return
    }

    const onBip = (e) => {
      e.preventDefault()
      setDeferred(e)
      setVisible(true)
    }
    window.addEventListener('beforeinstallprompt', onBip)
    return () => window.removeEventListener('beforeinstallprompt', onBip)
  }, [])

  const dismiss = useCallback(() => {
    setVisible(false)
    setDeferred(null)
    try {
      localStorage.setItem(DISMISS_KEY, '1')
    } catch { /* ignore */ }
  }, [])

  const onInstallClick = useCallback(async () => {
    if (!deferred) return
    try {
      await deferred.prompt()
      await deferred.userChoice
    } catch {
      /* user dismissed native prompt */
    }
    setDeferred(null)
    setVisible(false)
  }, [deferred])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ type: 'spring', bounce: 0.35, duration: 0.5 }}
          className="fixed z-[130] left-3 right-3 md:left-auto md:right-4 md:w-full md:max-w-md pointer-events-auto safe-bottom bottom-24 md:bottom-6"
          role="region"
          aria-label="Install app"
        >
          <div className="pointer-events-auto glass rounded-2xl border border-white/12 shadow-xl p-4 flex flex-col sm:flex-row sm:items-center gap-3">
            <p className="text-sm text-gray-200 leading-snug flex-1">
              {showIos ? (
                <>
                  <span className="font-semibold text-white">Install NavMe:</span>{' '}
                  tap <span className="text-brand-300 font-medium">Share</span>, then{' '}
                  <span className="text-brand-300 font-medium">Add to Home Screen</span> for full-screen
                  access and location-based AR discovery.
                </>
              ) : (
                <>
                  <span className="font-semibold text-white">Install NavMe</span> on your device for
                  one-tap access, offline-ready caching, and the best location experience.
                </>
              )}
            </p>
            <div className="flex items-center gap-2 flex-shrink-0">
              {!showIos && deferred && (
                <button type="button" onClick={onInstallClick} className="btn btn-primary text-sm py-2 px-4 whitespace-nowrap">
                  Install
                </button>
              )}
              <button
                type="button"
                onClick={dismiss}
                className="btn btn-ghost text-sm py-2 px-3 text-gray-500"
              >
                Not now
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
