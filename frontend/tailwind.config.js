const theme = require('tailwindcss/defaultTheme');
const systemBackup =
  'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"';

module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      body: ['Montserrat', systemBackup, 'sans-serif'],
    },
    colors: theme.colors,
    extend: {},
  },
  variants: {
    extend: {
      backgroundColor: ['active'],
      borderColor: ['active', 'focus-within'],
      ringWidth: ['focus-within'],
      ringColor: ['focus-within'],
      textColor: ['active'],
    },
  },
  plugins: [],
};
