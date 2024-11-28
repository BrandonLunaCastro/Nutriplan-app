/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "bold-green" : "#2d4a3a",
        "soft-green":"#3b7354",
        "soft-gray":"#dee0df",
        "soft-yellow":"#e5cca3"
      }
    },
  },
  plugins: [],
}

