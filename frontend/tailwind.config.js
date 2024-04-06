/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/*.{js,jsx,ts,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        primary: '#F7BD33', // Saffron yellow
        secondary: '#E03997', // Magenta pink
        tertiary: '#4D79A8', // Teal blue
        accent: '#FFFFFF', // White

      },
    },
  },
  plugins: [],
}

