/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      'play' : ['Play', 'sans-serif'],
      'gloria' : ["Gloria Hallelujah", 'cursive'],
      'indie' : [ "Indie Flower", 'cursive'],
    }
  },
  plugins: [],
}

