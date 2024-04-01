/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      "primary-blue": "#3334CC",
      "secondary-blue": "#4C4DDC",
      "primary-surface": "#DFE0F3",
      "secondary-surface": "#F5F5FF",
    },
    extend: {
      fontFamily: { jakarta: ["Plus Jakarta Sans", "sans-serif"] },
    },
  },
  plugins: [],
};
