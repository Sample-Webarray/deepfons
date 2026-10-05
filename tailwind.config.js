/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Hanken Grotesk', 'sans-serif'],
      },
      colors: {
        black: '#0A0A0A',
        ink: {
          DEFAULT: '#141414',
          2: '#1B1B1B'
        },
        line: {
          DEFAULT: 'rgba(255,255,255,0.10)',
          soft: 'rgba(255,255,255,0.055)',
          faint: 'rgba(255,255,255,0.03)'
        },
        muted: {
          DEFAULT: 'rgba(255,255,255,0.58)',
          2: 'rgba(255,255,255,0.38)',
          3: 'rgba(255,255,255,0.22)'
        }
      }
    },
  },
  plugins: [],
}
