import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { BrandMark } from '../components/ui/BrandLogo'

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center pt-[var(--nav-height)]">
      <div className="absolute inset-0 bg-mesh-gradient pointer-events-none" />
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 text-center px-4"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.05, duration: 0.45 }}
          className="flex justify-center mb-5"
        >
          <BrandMark size={88} imgClassName="shadow-glow-md" />
        </motion.div>
        <div className="text-8xl font-display font-black text-gradient mb-4">404</div>

        <h1 className="text-2xl font-semibold text-gray-200 mb-3">Page not found</h1>
        <p className="text-gray-400 mb-8 max-w-sm mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/" className="btn btn-primary">
            Go home
          </Link>
          <Link to="/discover" className="btn btn-secondary">
            Explore AR
          </Link>
        </div>
      </motion.div>
    </main>
  )
}
