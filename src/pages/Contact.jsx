import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useToast } from '../hooks/useToast'
import { BrandMark } from '../components/ui/BrandLogo'
import { submitContactForm } from '../services/supabase'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] } },
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
}

const SOCIALS = [
  {
    label: 'Twitter / X',
    href:  'https://twitter.com/navmespace',
    handle: '@navmespace',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.734l7.736-8.844L2.02 2.25H8.02l4.261 5.636L18.244 2.25Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z"/>
      </svg>
    ),
    color: 'hover:border-sky-500/40 hover:bg-sky-500/5 hover:text-sky-400',
  },
  {
    label: 'GitHub',
    href:  'https://github.com/navmespace',
    handle: 'github.com/navmespace',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2Z"/>
      </svg>
    ),
    color: 'hover:border-gray-400/40 hover:bg-gray-400/5 hover:text-gray-300',
  },
  {
    label: 'LinkedIn',
    href:  'https://linkedin.com/company/navmespace',
    handle: 'NavMe Space',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
    color: 'hover:border-blue-500/40 hover:bg-blue-500/5 hover:text-blue-400',
  },
]

const FAQ = [
  {
    q: 'Is NavMe free to use?',
    a: 'Yes, NavMe is free to explore. Creator tools and enterprise features are coming soon.',
  },
  {
    q: 'Does NavMe store my location?',
    a: 'Never. Your GPS coordinates are processed entirely in your browser and never sent to our servers.',
  },
  {
    q: 'How do I publish my own AR experience?',
    a: 'Creator tools are in development. Join our waitlist via the contact form and we\'ll notify you first.',
  },
  {
    q: 'Which browsers are supported?',
    a: 'NavMe works on all modern browsers — Chrome, Safari, Firefox, and Edge on mobile and desktop.',
  },
]

function FAQItem({ q, a, index }) {
  const [open, setOpen] = useState(false)
  return (
    <motion.div
      variants={fadeUp}
      className="border border-surface-border rounded-xl overflow-hidden"
    >
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-white/3 transition-colors"
        aria-expanded={open}
      >
        <span className="text-sm font-medium text-gray-200">{q}</span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0 text-gray-500"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
        </motion.span>
      </button>
      <motion.div
        initial={false}
        animate={open ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{ duration: 0.25, ease: 'easeInOut' }}
        className="overflow-hidden"
      >
        <p className="px-5 pb-4 text-sm text-gray-400 leading-relaxed border-t border-surface-border pt-3">
          {a}
        </p>
      </motion.div>
    </motion.div>
  )
}

export default function Contact() {
  const { success, error: toastError } = useToast()
  const formRef = useRef(null)
  const inView  = useInView(formRef, { once: true, margin: '-60px' })

  const [form, setForm]       = useState({ name: '', email: '', message: '' })
  const [sending, setSending] = useState(false)
  const [sent, setSent]       = useState(false)
  const [errors, setErrors]   = useState({})

  const validate = () => {
    const errs = {}
    if (!form.name.trim())    errs.name    = 'Name is required'
    if (!form.email.trim())   errs.email   = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Enter a valid email'
    if (!form.message.trim()) errs.message = 'Message is required'
    return errs
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: undefined }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) {
      setErrors(errs)
      return
    }

    setSending(true)
    try {
      await submitContactForm(form)
      setSent(true)
      success('We\'ll get back to you within 24 hours.', 'Message sent!')
      setForm({ name: '', email: '', message: '' })
    } catch (err) {
      toastError('Failed to send message. Please try again.', 'Error')
      console.error(err)
    } finally {
      setSending(false)
    }
  }

  return (
    <main className="min-h-screen pt-[var(--nav-height)] overflow-x-hidden">
      {/* ── Page hero ─────────────────────────────────────────────────────── */}
      <section className="relative section-sm border-b border-surface-border overflow-hidden">
        <div className="absolute inset-0 bg-mesh-gradient pointer-events-none" />
        <div className="container-xl relative z-10 text-center">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="flex flex-col items-center gap-4"
          >
            <motion.div variants={fadeUp}>
              <BrandMark size="lg" imgClassName="shadow-glow-sm ring-1 ring-white/12" />
            </motion.div>
            <motion.span variants={fadeUp} className="badge-brand text-[11px] uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-400 flex-shrink-0" />
              Get In Touch
            </motion.span>
            <motion.h1 variants={fadeUp} className="text-[1.85rem] sm:text-4xl font-display font-bold text-gray-100 text-balance leading-[1.1]">
              Let's build the{' '}
              <span className="text-gradient">AR future together</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-sm sm:text-base text-gray-400 max-w-lg text-pretty">
              Have a question, partnership idea, or want to publish your own AR experience
              on NavMe? We'd love to hear from you.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <div className="container-xl section">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-14">

          {/* ── Contact Form ──────────────────────────────────────────────── */}
          <motion.div
            ref={formRef}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
            variants={stagger}
            className="lg:col-span-3"
          >
            <motion.h2 variants={fadeUp} className="text-xl font-semibold text-gray-100 mb-6">
              Send a message
            </motion.h2>

            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="card p-10 text-center flex flex-col items-center gap-4"
              >
                <div className="w-16 h-16 rounded-2xl bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center text-3xl">
                  ✅
                </div>
                <div>
                  <h3 className="font-semibold text-gray-100 mb-1">Message received!</h3>
                  <p className="text-sm text-gray-400">We'll reply within 24 hours.</p>
                </div>
                <button onClick={() => setSent(false)} className="btn btn-secondary btn-sm mt-2">
                  Send another
                </button>
              </motion.div>
            ) : (
              <motion.form
                onSubmit={handleSubmit}
                variants={stagger}
                noValidate
                className="space-y-5"
              >
                {/* Name */}
                <motion.div variants={fadeUp}>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5" htmlFor="name">
                    Full name <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Uday Thanki"
                    className={`input ${errors.name ? 'border-red-500/60 focus:border-red-500 focus:ring-red-500/20' : ''}`}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                  />
                  {errors.name && (
                    <p id="name-error" className="mt-1.5 text-xs text-red-400">{errors.name}</p>
                  )}
                </motion.div>

                {/* Email */}
                <motion.div variants={fadeUp}>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5" htmlFor="email">
                    Email address <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className={`input ${errors.email ? 'border-red-500/60 focus:border-red-500 focus:ring-red-500/20' : ''}`}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                  />
                  {errors.email && (
                    <p id="email-error" className="mt-1.5 text-xs text-red-400">{errors.email}</p>
                  )}
                </motion.div>

                {/* Message */}
                <motion.div variants={fadeUp}>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5" htmlFor="message">
                    Message <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project, question, or partnership idea…"
                    className={`input resize-none leading-relaxed ${errors.message ? 'border-red-500/60 focus:border-red-500 focus:ring-red-500/20' : ''}`}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                  />
                  {errors.message && (
                    <p id="message-error" className="mt-1.5 text-xs text-red-400">{errors.message}</p>
                  )}
                </motion.div>

                <motion.button
                  variants={fadeUp}
                  type="submit"
                  disabled={sending}
                  className="btn btn-primary w-full justify-center py-3 text-sm"
                  whileTap={{ scale: 0.98 }}
                >
                  {sending ? (
                    <>
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 0.9, ease: 'linear' }}
                        className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                      />
                      Sending…
                    </>
                  ) : (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                      </svg>
                      Send Message
                    </>
                  )}
                </motion.button>
              </motion.form>
            )}
          </motion.div>

          {/* ── Right panel ───────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Connect */}
            <div>
              <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-widest mb-4">
                Connect with us
              </h3>
              <div className="space-y-3">
                {SOCIALS.map(({ label, href, handle, icon, color }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-3.5 p-4 rounded-xl card transition-all duration-200 ${color}`}
                  >
                    <span className="text-gray-400">{icon}</span>
                    <div>
                      <p className="text-sm font-medium text-gray-200">{label}</p>
                      <p className="text-xs text-gray-500">{handle}</p>
                    </div>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="ml-auto text-gray-600">
                      <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            {/* Email */}
            <div className="card p-5">
              <div className="flex items-center gap-2.5 mb-3">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-400">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                </svg>
                <span className="text-sm font-medium text-gray-300">Email us directly</span>
              </div>
              <a href="mailto:hello@navme.space" className="text-sm text-brand-400 hover:text-brand-300 transition-colors font-mono">
                hello@navme.space
              </a>
            </div>

            {/* Response time */}
            <div className="flex items-center gap-2.5 text-xs text-gray-500 px-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              Typical response time: under 24 hours
            </div>
          </motion.div>
        </div>

        {/* ── FAQ ─────────────────────────────────────────────────────────── */}
        <div className="mt-12 sm:mt-16 pt-10 sm:pt-14 border-t border-surface-border">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-7 sm:mb-10"
          >
            <h2 className="text-xl sm:text-2xl font-display font-bold text-gray-100 mb-2">
              Frequently asked questions
            </h2>
            <p className="text-gray-400 max-w-md mx-auto text-sm">
              Quick answers to the most common questions.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
            className="max-w-2xl mx-auto space-y-3"
          >
            {FAQ.map((item, i) => (
              <FAQItem key={i} {...item} index={i} />
            ))}
          </motion.div>
        </div>
      </div>
    </main>
  )
}
