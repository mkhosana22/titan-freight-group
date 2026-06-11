/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./App.tsx",
    "./index.tsx",
    "./constants.tsx",
  ],
  theme: {
    extend: {
      colors: {
        navy: '#0B2A4A',
        steelBlue: '#1F5FA8',
        logisticsOrange: '#F37021',
        industrialGrey: '#E6EBF1',
        charcoalGrey: '#2E2E2E',
        deepNavy: '#081F36',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
