/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
          950: '#1e1b4b',
        },
        accent: {
          50:  '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
          950: '#2e1065',
        },
        surface: {
          light:  '#fafafa',
          dark:   '#0f0f13',
          card:   '#18181f',
          border: '#27272f',
        },
        muted: {
          DEFAULT: '#6b7280',
          light:   '#9ca3af',
          dark:    '#374151',
        },
      },
      fontFamily: {
        sans:    ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Cal Sans"', 'Inter', 'system-ui', 'sans-serif'],
        mono:    ['"JetBrains Mono"', 'monospace'],
      },
      backgroundImage: {
        'mesh-gradient': `
          radial-gradient(at 27% 37%, hsla(215, 98%, 61%, 0.15) 0px, transparent 50%),
          radial-gradient(at 97% 21%, hsla(262, 95%, 70%, 0.15) 0px, transparent 50%),
          radial-gradient(at 52% 99%, hsla(262, 95%, 70%, 0.08) 0px, transparent 50%),
          radial-gradient(at 10% 29%, hsla(256, 96%, 67%, 0.12) 0px, transparent 50%),
          radial-gradient(at 97% 96%, hsla(38, 60%, 74%, 0.05) 0px, transparent 50%),
          radial-gradient(at 33% 50%, hsla(222, 67%, 73%, 0.07) 0px, transparent 50%)
        `,
        'hero-glow': `
          radial-gradient(ellipse 80% 50% at 50% -20%, rgba(99,102,241,0.25) 0%, transparent 100%)
        `,
        'card-glow': `
          radial-gradient(ellipse at center, rgba(99,102,241,0.08) 0%, transparent 70%)
        `,
      },
      animation: {
        'float':        'float 6s ease-in-out infinite',
        'pulse-slow':   'pulse 4s cubic-bezier(0.4,0,0.6,1) infinite',
        'glow':         'glow 2s ease-in-out infinite alternate',
        'gradient':     'gradient 8s ease infinite',
        'slide-up':     'slideUp 0.5s ease-out',
        'fade-in':      'fadeIn 0.6s ease-out',
        'spin-slow':    'spin 8s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-12px)' },
        },
        glow: {
          from: { boxShadow: '0 0 10px rgba(99,102,241,0.3)' },
          to:   { boxShadow: '0 0 25px rgba(99,102,241,0.7), 0 0 50px rgba(99,102,241,0.3)' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%':      { backgroundPosition: '100% 50%' },
        },
        slideUp: {
          from: { opacity: 0, transform: 'translateY(20px)' },
          to:   { opacity: 1, transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: 0 },
          to:   { opacity: 1 },
        },
      },
      boxShadow: {
        'glow-sm':  '0 0 15px rgba(99,102,241,0.3)',
        'glow-md':  '0 0 30px rgba(99,102,241,0.4)',
        'glow-lg':  '0 0 60px rgba(99,102,241,0.35)',
        'card':     '0 1px 3px rgba(0,0,0,0.08), 0 4px 20px rgba(0,0,0,0.06)',
        'card-dark':'0 1px 3px rgba(0,0,0,0.4), 0 4px 20px rgba(0,0,0,0.3)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
}
