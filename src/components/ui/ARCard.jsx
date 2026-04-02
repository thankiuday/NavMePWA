import { motion } from 'framer-motion'
import { CATEGORY_CONFIG } from '../../constants/categories'

const DIRECTION_COLORS = {
  N: 'text-blue-400', NE: 'text-cyan-400', E: 'text-emerald-400',
  SE: 'text-green-400', S: 'text-yellow-400', SW: 'text-amber-400',
  W: 'text-orange-400', NW: 'text-purple-400',
}

function ExternalLinkIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
      <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
    </svg>
  )
}

function LocationPinIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
    </svg>
  )
}

function StarIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" className="text-amber-400">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  )
}

export default function ARCard({ experience, index = 0 }) {
  const { title, description, url, category, rating, views, location, distanceLabel, distance } = experience
  const config = CATEGORY_CONFIG[category] ?? { label: category, badge: 'badge-brand', icon: '📍' }

  const isNear = distance !== undefined && distance < 1
  const isMid  = distance !== undefined && distance >= 1 && distance < 3

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className="card-hover p-5 flex flex-col gap-4 group relative overflow-hidden"
    >
      {/* Subtle gradient hover layer */}
      <div className="absolute inset-0 bg-card-glow opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl" />

      {/* Top row: category badge + distance */}
      <div className="flex items-start justify-between gap-3 relative z-10">
        <span className={config.badge}>
          <span>{config.icon}</span>
          {config.label}
        </span>

        {distanceLabel && (
          <span className={`badge flex-shrink-0 font-mono text-xs ${
            isNear ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/20'
            : isMid  ? 'bg-blue-500/15 text-blue-300 border border-blue-500/20'
            : 'bg-gray-500/15 text-gray-400 border border-gray-500/20'
          }`}>
            {isNear && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />}
            {distanceLabel}
          </span>
        )}
      </div>

      {/* Title */}
      <div className="relative z-10">
        <h3 className="font-semibold text-gray-100 text-base leading-snug group-hover:text-white transition-colors line-clamp-2">
          {title}
        </h3>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-400 leading-relaxed line-clamp-2 relative z-10">
        {description}
      </p>

      {/* Location */}
      <div className="flex items-center gap-1.5 text-xs text-gray-500 relative z-10">
        <LocationPinIcon />
        <span className="truncate">{location.landmark}</span>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between gap-2 pt-3 border-t border-surface-border relative z-10">
        <div className="flex items-center gap-2 min-w-0">
          {/* Rating */}
          {rating && (
            <div className="flex items-center gap-1 flex-shrink-0">
              <StarIcon />
              <span className="text-xs text-gray-400">{rating}</span>
            </div>
          )}
          {/* Views — hidden on very small cards to prevent overflow */}
          {views && (
            <span className="text-xs text-gray-500 hidden sm:inline truncate">
              {views.toLocaleString()} views
            </span>
          )}
        </div>

        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="btn btn-primary btn-sm gap-1 text-xs flex-shrink-0"
          aria-label={`Open AR experience: ${title}`}
        >
          Open AR
          <ExternalLinkIcon />
        </a>
      </div>
    </motion.article>
  )
}
