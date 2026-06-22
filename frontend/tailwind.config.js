/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#fdf6ec',
          100: '#f5e8d0',
          200: '#e8ccaa',
          300: '#d4a870',
          400: '#c4813a',
          500: '#a0621e',
          600: '#7a4511',
          700: '#5c320d',
          800: '#3d1f08',
          900: '#251208',
          950: '#140900',
        },
        rust: {
          300: '#e8927a',
          400: '#d96b4a',
          500: '#c4501a',
          600: '#a33d14',
          700: '#7a2c0d',
        },
        wood: {
          50:  '#fdf6ec',
          100: '#f0dfc0',
          200: '#dfc19a',
          300: '#c9a070',
          400: '#b07d45',
          500: '#8b5e2a',
          600: '#6b4420',
          700: '#4e3018',
          800: '#2d1b0e',
          900: '#1a0e06',
          950: '#0e0703',
        },
        parchment: {
          50:  '#fefcf7',
          100: '#fdf6e8',
          200: '#f8ebcc',
          300: '#f0d9a0',
          400: '#e4c170',
          500: '#d4a840',
        },
        surface: {
          50:  '#fdf6ec',
          100: '#f0dfc0',
          900: '#1a0e06',
        },
      },
      fontFamily: {
        sans: ['Playfair Display', 'Georgia', 'serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
        body: ['Lato', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 4px 12px -2px rgb(0 0 0 / 0.4), 0 2px 6px -2px rgb(0 0 0 / 0.3)',
        'card-hover': '0 16px 32px -4px rgb(0 0 0 / 0.5), 0 4px 8px -4px rgb(160 98 30 / 0.3)',
        glow: '0 0 30px -6px rgb(196 129 58 / 0.6)',
        modal: '0 25px 60px -8px rgb(0 0 0 / 0.6)',
        wood: '0 4px 20px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'fade-in-down': 'fadeInDown 0.5s ease-out forwards',
        'scale-in': 'scaleIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-in-right': 'slideInRight 0.4s ease-out forwards',
        float: 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 2s infinite',
        shimmer: 'shimmer 2s linear infinite',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
        'spin-slow': 'spin 3s linear infinite',
        'flame': 'flame 1.5s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(16px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        flame: {
          '0%': { transform: 'scaleY(1) scaleX(1)' },
          '100%': { transform: 'scaleY(1.08) scaleX(0.96)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-pattern': 'linear-gradient(160deg, #1a0e06 0%, #2d1b0e 40%, #3d2512 70%, #251208 100%)',
        'wood-grain': 'repeating-linear-gradient(92deg, transparent, transparent 2px, rgba(0,0,0,0.04) 2px, rgba(0,0,0,0.04) 4px)',
        'navbar-gradient': 'linear-gradient(180deg, rgba(20,9,0,0.97) 0%, rgba(26,14,6,0.95) 100%)',
        'card-wood': 'linear-gradient(145deg, #3d2512 0%, #2d1b0e 100%)',
      },
    },
  },
  plugins: [],
}
