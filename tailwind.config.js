/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customOrange:'#F5821F',
        customBlue:"#1a396"
      },
    },
  },
  plugins: [],
}