/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
  ],
theme: {
    extend: {
      colors: {
        dark: {
          100: '##1e1e1e',
        },
         light: {
        100: 'inset 0 2px 4px rgba(255, 255, 255, 0.1)', 
      }
      },
    },
  },
  plugins: [],
}

