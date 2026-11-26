/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Hanken Grotesk"', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          primary: '#1F1F1F',
          secondary: '#000000',
          tertiary: '#FFFFFF',
          muted: '#A3A3A3',
        },
      }
    },
  },
  plugins: [],
}
