/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        display: ['Syne', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        brand: { primary: '#7c3aed', secondary: '#06b6d4', accent: '#a855f7' },
        surface: { DEFAULT: '#080810', 2: '#0e0e1a', 3: '#141428' },
      },
      backgroundImage: {
        'gradient-accent': 'linear-gradient(90deg,#7c3aed,#06b6d4)',
        'gradient-purple-cyan': 'linear-gradient(135deg,#7c3aed 0%,#06b6d4 100%)',
        'gradient-hero-dark': 'linear-gradient(135deg,#080810 0%,#12042a 55%,#040e20 100%)',
      },
      boxShadow: {
        glow: '0 0 40px rgba(124,58,237,0.4),0 0 80px rgba(6,182,212,0.15)',
        'glow-sm': '0 0 20px rgba(124,58,237,0.3)',
        'glow-purple': '0 0 30px rgba(124,58,237,0.55)',
        card: '0 4px 30px rgba(124,58,237,0.1),0 1px 4px rgba(0,0,0,0.4)',
        'card-hover': '0 10px 50px rgba(124,58,237,0.28),0 2px 10px rgba(0,0,0,0.5)',
      },
    },
  },
  plugins: [],
}
