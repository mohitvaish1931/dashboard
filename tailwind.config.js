/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        pink: {
          400: '#FF4D8D',
          500: '#FF4D8D',
          600: '#E53E7D',
        },
        mint: {
          400: '#29F19C',
          500: '#29F19C',
          600: '#22C285',
        },
        yellow: {
          400: '#FFD93D',
          500: '#FFD93D',
          600: '#E5C133',
        },
      },
      animation: {
        'pulse-glow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      backdropBlur: {
        'xs': '2px',
      },
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [],
};