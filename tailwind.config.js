/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        unifraktur: ['"UnifrakturCook"', "cursive"],
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        pink: {
          500: "#ff007f",
          700: "#b00055",
        },
      },
    },
  },
  plugins: [],
};
