/**
 * NavMe brand mark — file lives in /public/logo.png (copied to dist root on build).
 * Use import.meta.env.BASE_URL so deploys under a subpath still resolve the asset.
 */
export function brandLogoSrc() {
  const base = import.meta.env.BASE_URL || '/'
  const normalized = base.endsWith('/') ? base : `${base}/`
  return `${normalized}logo.png`
}

const SIZE_PX = {
  xs: 24,
  sm: 32,
  md: 36,
  lg: 44,
  xl: 56,
  '2xl': 72,
  '3xl': 88,
}

/**
 * @param {'xs'|'sm'|'md'|'lg'|'xl'|'2xl'|'3xl'|number} size
 * @param {boolean} [showWordmark]
 * @param {string} [className] wrapper flex classes
 * @param {string} [imgClassName] image-only classes (e.g. shadow)
 */
export default function BrandLogo({
  size = 'md',
  showWordmark = true,
  className = '',
  imgClassName = '',
}) {
  const px = typeof size === 'number' ? size : SIZE_PX[size] ?? SIZE_PX.md
  const src = brandLogoSrc()

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <img
        src={src}
        width={px}
        height={px}
        alt="NavMe"
        decoding="async"
        className={`rounded-full object-cover shrink-0 ring-1 ring-white/15 dark:ring-white/10 bg-surface-card ${imgClassName}`}
        draggable={false}
      />
      {showWordmark && (
        <span className="font-display font-bold text-xl tracking-tight text-white">
          Nav<span className="text-gradient">Me</span>
        </span>
      )}
    </span>
  )
}

/** Icon-only mark (no wordmark), for tight spaces */
export function BrandMark({ size = 'md', className = '', imgClassName = '' }) {
  return <BrandLogo size={size} showWordmark={false} className={className} imgClassName={imgClassName} />
}
