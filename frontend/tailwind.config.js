/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/*.{js,jsx,ts,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        base: '#F5EBE0',
        highlight: '#E3D5CA',
        shade: '#D5BDAF',
        mutedAccent: '#D6CCC2',
        neutralAccent: '#EDEDE9'
    },
    },
  },
  plugins: [],
}

