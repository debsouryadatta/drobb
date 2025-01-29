/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        Roboto: ['Roboto', 'sans-serif'],
        Luckiest: ['Luckiest Guy', 'sans-serif'],
        Ubuntu: ['Ubuntu', 'sans-serif'],
        Outfit: ['Outfit', 'sans-serif'],
        Itim: ['Itim', 'sans-serif'],
        SpaceMono: ['Space Mono', 'monospace'],
      }
    },
  },
  plugins: [],
}