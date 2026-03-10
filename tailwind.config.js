/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,js}'],
  theme: {
    extend: {
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(14px)' }
        }
      },
      animation: {
        float: 'float 7s ease-in-out infinite'
      }
    }
  },
  plugins: []
};
