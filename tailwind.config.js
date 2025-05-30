/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  daisyui: {
    themes: ["light", "dark", "cupcake", "cmyk"],
  },
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
};
