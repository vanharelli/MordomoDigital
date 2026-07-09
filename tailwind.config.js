/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Archivo', 'Rexton', 'sans-serif'],
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
      },
      colors: {
        obsidian: '#000000', // Absolute Black
        gold: {
          DEFAULT: '#daa520', // Ouro Puro
          soft: '#e8c76a',
          deep: '#8a6a14',
        },
        champagne: '#f3e5c0',
        silver: '#C0C0C0', // Prata
        'neon-purple': '#8A2BE2',
        'neon-red': '#FF0000',
        'emerald': '#10B981',
      },
      boxShadow: {
        'laser': '0 0 15px rgba(218, 165, 32, 0.5)',
        'laser-soft': '0 0 30px rgba(218, 165, 32, 0.18)',
        'obsidian-glow': '0 0 40px rgba(0, 0, 0, 0.9)',
      },
      animation: {
        marquee: 'marquee 25s linear infinite',
        'fade-in': 'fadeIn 0.5s ease-out',
        'fade-up': 'fadeUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) both',
        'bounce-subtle': 'bounceSubtle 3s ease-in-out infinite',
        'shimmer': 'shimmer 2.8s linear infinite',
        'glow-pulse': 'glowPulse 3.5s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(100vw)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(18px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 12px rgba(218, 165, 32, 0.25)' },
          '50%': { boxShadow: '0 0 28px rgba(218, 165, 32, 0.5)' },
        },
      }
    },
  },
  plugins: [],
}
