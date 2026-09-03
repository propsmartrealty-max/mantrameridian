/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        obsidian: {
          DEFAULT: '#121317',
          deep: '#0C0D10',
          card: '#191B22',
          surface: '#20232D',
          border: '#2C303E',
          lighter: '#282C39',
        },
        architectural: {
          white: '#FFFFFF',
          pearl: '#F8F7F4',
          muted: '#E6E3DB',
          subtle: '#D4CFBE',
        },
        concrete: {
          DEFAULT: '#C8C4B8',
          light: '#DDD9CF',
          dark: '#22252F',
          border: '#353A49',
          muted: '#9E9A8E',
        },
        landscape: {
          DEFAULT: '#253B25',
          dark: '#162316',
          emerald: '#355435',
          subtle: '#4B734B',
          glow: 'rgba(53, 84, 53, 0.3)',
        },
        champagne: {
          DEFAULT: '#DFB75A',
          light: '#F7E7B4',
          soft: '#DAC59F',
          dark: '#B58E32',
          glow: 'rgba(223, 183, 90, 0.3)',
          hairline: 'rgba(223, 183, 90, 0.35)',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Cinzel', 'Georgia', 'serif'],
        display: ['Cinzel', '"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      backgroundImage: {
        'radial-dusk': 'radial-gradient(circle at 50% 0%, rgba(212, 175, 55, 0.08) 0%, rgba(14, 14, 16, 0) 70%)',
        'radial-river': 'radial-gradient(circle at 100% 50%, rgba(45, 68, 44, 0.12) 0%, rgba(8, 8, 8, 0) 60%)',
        'gold-metallic': 'linear-gradient(135deg, #FFFFFF 0%, #EED99E 40%, #D4AF37 75%, #AA7C11 100%)',
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(212, 175, 55, 0.03) 50%, rgba(0, 0, 0, 0.4) 100%)',
      },
      animation: {
        'pulse-slow': 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'glass-sheen': 'sheen 5s ease-in-out infinite',
        'shimmer-gold': 'shimmer 3s ease-in-out infinite',
        'border-pulse': 'borderPulse 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        sheen: {
          '0%': { transform: 'translateX(-100%) rotate(45deg)' },
          '100%': { transform: 'translateX(200%) rotate(45deg)' },
        },
        shimmer: {
          '0%, 100%': { opacity: '0.85' },
          '50%': { opacity: '1', filter: 'brightness(1.15)' },
        },
        borderPulse: {
          '0%, 100%': { borderColor: 'rgba(212, 175, 55, 0.18)' },
          '50%': { borderColor: 'rgba(212, 175, 55, 0.45)' },
        },
      },
      letterSpacing: {
        architectural: '0.25em',
        editorial: '0.15em',
        luxury: '0.35em',
      },
      boxShadow: {
        luxury: '0 25px 60px -15px rgba(0, 0, 0, 0.9)',
        'luxury-gold': '0 20px 50px -10px rgba(212, 175, 55, 0.15)',
        'glass-inner': 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.12)',
        glow: '0 0 45px rgba(212, 175, 55, 0.18)',
        'glow-emerald': '0 0 45px rgba(45, 68, 44, 0.25)',
        card: '0 10px 30px -10px rgba(0, 0, 0, 0.5)',
      },
    },
  },
  plugins: [],
};
