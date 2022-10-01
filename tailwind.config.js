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
        'league-spartan': ['"League Spartan"', 'sans-serif'],
        'heebo': ['Heebo', 'sans-serif']
      },
      boxShadow: {
        'pattern': '0px 8px 18px 12px rgba(0,0,0,0.16)',
        'isadora': '0px 4px 13px -1px rgba(0,0,0,0.59)',
      },
      keyframes: {
        openEffect: {
          '0%': { opacity: 0 },
          '25%': { opacity: 0.25 },
          '50%': { opacity: 0.5 },
          '75%': { opacity: 0.75 },
          '100%': { opacity: 1 },
        },
        movePhotoUp: {
          '0%': {opacity : 0 },
          '25%': { opacity: 0.25 },
          '50%': { opacity: 0.5 },
          '75%': { opacity: 0.75 },
          '100%': { opacity: 1 },
        },
        closeEffect: {
          '0%': { opacity: 1 },
          '25%': { opacity: 0.75 },
          '50%': { opacity: 0.5 },
          '75%': { opacity: 0.25 },
          '100%': { opacity: 0 },
        },
        },
        animation: {
        'openEditProfile': 'openEffect 1s linear',
        'openMenu': 'openEffect .5s linear',
        'closeMenu': 'closeEffect .5s linear',
        'closeErroAuth': 'closeEffect 2s linear',
        }, 
    },
  },
  plugins: [],
};

