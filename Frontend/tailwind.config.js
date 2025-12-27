/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sand: {
          50: '#fff8ed',
          100: '#fdeed6',
          200: '#fae0b6',
          300: '#f4cc8a',
          400: '#ecb25b',
          500: '#e39a3d',
          600: '#c77a2d',
          700: '#9f5a25',
          800: '#7e4622',
          900: '#683a20',
        },
      }
    },
  },
  plugins: [],
}

