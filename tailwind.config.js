/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Rexton', 'sans-serif'],
      },
      colors: {
        obsidian: '#000000', // Absolute Black
        gold: {
          DEFAULT: '#daa520', // Ouro Puro
        },
        silver: '#C0C0C0', // Prata
        'neon-purple': '#8A2BE2',
        'neon-red': '#FF0000',
        'emerald': '#10B981',
      },
      boxShadow: {
        'laser': '0 0 15px rgba(218, 165, 32, 0.5)',
        'obsidian-glow': '0 0 40px rgba(0, 0, 0, 0.9)',
      },
      animation: {
        marquee: 'marquee 25s linear infinite',
        'fade-in': 'fadeIn 0.5s ease-out',
        'bounce-subtle': 'bounceSubtle 3s ease-in-out infinite',
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
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
