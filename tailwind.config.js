/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        manrope: ["Manrope", "sans-serif"],
      },
      backgroundImage: {
        pilihjurusan: "url('/images/bg.png')",
      },
    },
  },
  plugins: [],
};
