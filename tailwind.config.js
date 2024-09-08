/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', '-apple-system', 'Helvetica', 'Arial', 'sans-serif'],
      },
      colors: {
        customGray: 'rgb(240, 240, 240)',
      },
      fontSize: {
        '14px': ['14px', '20px'], 
      },
      animation: {
        'gradient-x': 'gradient-x 15s ease infinite',
        'shimmer-continuous': 'shimmer-continuous 1.5s linear infinite',
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center',
          },
        },
        'shimmer-continuous': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
    },
  },
  plugins: [],
}

