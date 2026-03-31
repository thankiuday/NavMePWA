import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'

const NAV_ITEMS = [
  {
    to: '/',
    label: 'Home',
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={active ? '0' : '1.8'} strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22" fill="none" stroke="currentColor" strokeWidth="1.8"/>
      </svg>
    ),
  },
  {
    to: '/discover',
    label: 'Discover',
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" fill={active ? 'currentColor' : 'none'}/>
      </svg>
    ),
    badge: true,
  },
  {
    to: '/about',
    label: 'About',
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" fill={active ? 'currentColor' : 'none'} fillOpacity={active ? '0.15' : '0'}/>
        <line x1="12" y1="16" x2="12" y2="12"/>
        <line x1="12" y1="8" x2="12.01" y2="8"/>
      </svg>
    ),
  },
  {
    to: '/contact',
    label: 'Contact',
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" fill={active ? 'currentColor' : 'none'} fillOpacity={active ? '0.15' : '0'}/>
      </svg>
    ),
  },
]

export default function BottomNav() {
  return (
    // Only visible on mobile — hidden md and above
    <nav
      className="fixed bottom-0 inset-x-0 z-50 md:hidden safe-bottom"
      aria-label="Mobile navigation"
    >
      {/* Glass backdrop */}
      <div className="glass border-t border-white/10 shadow-[0_-4px_24px_rgba(0,0,0,0.4)]">
        <div className="flex items-stretch h-16 px-2" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
          {NAV_ITEMS.map(({ to, label, icon, badge }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className="flex-1"
            >
              {({ isActive }) => (
                <div className="flex flex-col items-center justify-center gap-1 h-full w-full relative">
                  {/* Active pill indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="bottom-nav-pill"
                      className="absolute inset-x-2 top-1.5 h-0.5 rounded-full bg-brand-500"
                      transition={{ type: 'spring', bounce: 0.25, duration: 0.4 }}
                    />
                  )}

                  {/* Icon */}
                  <motion.div
                    animate={{ scale: isActive ? 1.1 : 1, y: isActive ? -1 : 0 }}
                    transition={{ type: 'spring', bounce: 0.4, duration: 0.3 }}
                    className={`relative transition-colors ${
                      isActive ? 'text-brand-400' : 'text-gray-500'
                    }`}
                  >
                    {icon(isActive)}

                    {/* Discover pulse dot */}
                    {badge && (
                      <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-brand-500 border-2 border-white dark:border-[#0f0f13]" />
                    )}
                  </motion.div>

                  {/* Label */}
                  <span
                    className={`text-[10px] font-medium leading-none tracking-wide transition-colors ${
                      isActive ? 'text-brand-400' : 'text-gray-600'
                    }`}
                  >
                    {label}
                  </span>
                </div>
              )}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  )
}
