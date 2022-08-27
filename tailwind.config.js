/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: ['./src/**/*.{js,ts,jsx,tsx,html,css}'],
  theme: {
    extend: {
      colors: {
        'desaturatedDarkCyan': 'hsl(180, 29%, 50%)',
        'LightGrayishCyan': 'hsl(180, 52%, 96%)',
        'darkGrayishYan': 'hsl(180, 8%, 52%)',
        'veryDarkGraishCyan': 'hsl(180, 14%, 20%)',
      },
      fontFamily: {
        'league-spartan': ['"League Spartan"', 'sans-serif']
      },
      boxShadow: {
        'pattern': '0px 8px 18px 12px rgba(0,0,0,0.16)',
      }
    },
  },
  plugins: [],
};

