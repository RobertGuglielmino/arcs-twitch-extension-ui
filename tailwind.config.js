/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/video_index.html",
    "./src/config.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'header': ['FMBolyarPro-700', 'sans-serif'],
        'body': ['NeueKabelW01-Book', 'sans-serif'],
      },
      colors: {
        yellow: 'rgb(239, 203, 27)',
        red: 'rgb(223, 60, 45)',
        blue: 'rgb(8, 149, 167)',
        white: 'rgb(219, 218, 216)',
        free: 'rgb(161, 152, 135)',

        empire: 'rgb(127, 72, 113)',
        outlaw: 'rgb(100, 45, 38)',
        commonwealth: 'rgb(174, 146, 69)',
        commonwealthmember: 'rgb(158, 125, 47)',
        lord: 'rgb(221, 136, 108)',
        judge: 'rgb(57, 89, 87)',

        gold: 'rgb(217, 135, 35)',
        silver: 'rgb(79, 132, 144)',
      },
    },

  },
  plugins: [
    require('tailwindcss-text-fill-stroke'), // no options to configure
  ],
}