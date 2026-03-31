import { motion } from 'framer-motion'

function Shimmer({ className = '' }) {
  return (
    <div
      className={`skeleton rounded-lg ${className}`}
      aria-hidden="true"
    />
  )
}

export function ARCardSkeleton() {
  return (
    <div className="card p-5 flex flex-col gap-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-2 flex-1">
          <Shimmer className="h-4 w-16 rounded-full" />
          <Shimmer className="h-5 w-3/4" />
        </div>
        <Shimmer className="h-7 w-14 rounded-full flex-shrink-0" />
      </div>
      <Shimmer className="h-3.5 w-full" />
      <Shimmer className="h-3.5 w-4/5" />
      <div className="flex items-center gap-2 pt-1">
        <Shimmer className="h-3 w-3 rounded-full" />
        <Shimmer className="h-3 w-2/5" />
      </div>
      <div className="flex items-center justify-between pt-2 border-t border-surface-border">
        <Shimmer className="h-3 w-1/4" />
        <Shimmer className="h-8 w-24 rounded-lg" />
      </div>
    </div>
  )
}

export function StatsSkeleton() {
  return (
    <div className="flex flex-col gap-2">
      <Shimmer className="h-8 w-20" />
      <Shimmer className="h-3.5 w-32" />
    </div>
  )
}

export function TextSkeleton({ lines = 3, className = '' }) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <Shimmer
          key={i}
          className={`h-3.5 ${i === lines - 1 ? 'w-3/5' : 'w-full'}`}
        />
      ))}
    </div>
  )
}

export function GridSkeleton({ count = 6 }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
    >
      {Array.from({ length: count }).map((_, i) => (
        <ARCardSkeleton key={i} />
      ))}
    </motion.div>
  )
}

export default Shimmer
