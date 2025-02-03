/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        loblackitalic: ["Lorimer-BlackItalic", "sans-serif"],
        loblack: ["Lorimer-Black", "sans-serif"],
        lobolditalic: ["Lorimer-BoldItalic", "sans-serif"],
        lobold: ["Lorimer-Bold", "sans-serif"],
        lolightitalic: ["Lorimer-Light-Italic", "sans-serif"],
        lolight: ["Lorimer-Light", "sans-serif"],
        lomediumitalic: ["Lorimer-MediumItalic", "sans-serif"],
        lomedium: ["Lorimer-Medium", "sans-serif"],
        losemibolditalic: ["Lorimer-SemiboldItalic", "sans-serif"],
        losemibold: ["Lorimer-Semibold", "sans-serif"],
      },
    },
  },
  plugins: [],
}

