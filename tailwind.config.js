/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      "boxShadow": {
        "custom": "5px 0px 18px 0px rgba(0, 0, 0, 0.03)",
        "vertical": "0px 5px 18px 0px rgba(0, 0, 0, 0.1)",
        "all": "0px 0px 17px 2px rgba(0, 0, 0, 0.1)"
      }
    },
  },
  plugins: [],
}

