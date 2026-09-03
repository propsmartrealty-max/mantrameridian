/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        obsidian: {
          DEFAULT: '#0A0A0A',
          deep: '#050505',
          card: '#121212',
          surface: '#181818',
          border: '#242424',
        },
        architectural: {
          white: '#F5F3EE',
          muted: '#E6E3DB',
          subtle: '#D1CDC2',
        },
        concrete: {
          DEFAULT: '#B8B4AA',
          dark: '#1F1E1B',
          border: '#2E2D29',
          light: '#CECAC1',
        },
        landscape: {
          DEFAULT: '#2A3827',
          dark: '#192417',
          emerald: '#384B34',
          subtle: '#4A6245',
        },
        champagne: {
          DEFAULT: '#C8B89F',
          light: '#E6DCBA',
          dark: '#938166',
          hairline: 'rgba(200, 184, 159, 0.25)',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Cinzel', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      letterSpacing: {
        architectural: '0.25em',
        editorial: '0.15em',
        luxury: '0.35em',
      },
      boxShadow: {
        luxury: '0 20px 50px rgba(0, 0, 0, 0.8)',
        glow: '0 0 40px rgba(200, 184, 159, 0.15)',
        card: '0 10px 30px -10px rgba(0, 0, 0, 0.5)',
      },
    },
  },
  plugins: [],
};
