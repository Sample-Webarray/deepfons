
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Work Sans"', '"Hanken Grotesk"', 'system-ui', 'sans-serif'],
      },
      colors: {
        stone: {
          bg: '#dfdedb',
          surface: '#d3d2ce',
          ink: '#26251e',
          muted: '#5a5850',
        },
        blueprint: '#2456d6',
      }
    },
  },
  plugins: [],
}
