/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      "primary-blue": "#3334CC",
      "secondary-blue": "#4C4DDC",
      "primary-grey": "#878787",
      "secondary-grey": "#D6D6D6",
      "text-black": "#101010",
    },
    extend: {
      fontFamily: { jakarta: ["Plus Jakarta Sans", "sans-serif"] },
    },
  },
  plugins: [],
};
