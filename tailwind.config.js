/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",  // if using src folder
    "./pages/**/*.{js,ts,jsx,tsx}", // if using Next.js
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
