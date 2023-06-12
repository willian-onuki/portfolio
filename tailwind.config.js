/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: { 
        primary: {
          100: '#33658A',
          200: '#2E5C7D',
          300: '#2A5472',
          400: '#264C68',
          500: '#23455F',
        },
        shape: {
          500: '#FFFFF2'
        }
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar')
  ],
}
