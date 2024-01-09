/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        animateArrow: 'animateArrow 0.7s ease infinite',
      },
      keyframes: {
        animateArrow: {
          '50%': {
            right: '-40px',
          },
        },
      },
    },
  },
  plugins: [],
};
