/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4A2B83',
        'primary-dark': '#3A1F73',
        'vista-dark': {
          900: '#121212',
          800: '#1E1E1E',
          700: '#2D2D2D',
          600: '#404040',
        },
      },
    },
  },
  plugins: [],
}