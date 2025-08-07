/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        cosmic: {
          50: '#f0f0ff',
          100: '#e5e7ff',
          200: '#d0d4ff',
          300: '#b4b8ff',
          400: '#9491ff',
          500: '#7c6aff',
          600: '#6d47ff',
          700: '#5d2fff',
          800: '#4d1fd9',
          900: '#3e19a3',
          950: '#1e0a4a'
        },
        purple: {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7',
          600: '#9333ea',
          700: '#7c2d12',
          800: '#6b21a8',
          900: '#581c87',
          950: '#3b0764'
        }
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(124, 58, 237, 0.5)' },
          '100%': { boxShadow: '0 0 40px rgba(124, 58, 237, 0.8)' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' }
        }
      },
      backgroundImage: {
        'cosmic-gradient': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'cosmic-radial': 'radial-gradient(ellipse at center, #7c3aed 0%, #3730a3 50%, #1e1b4b 100%)'
      }
    },
  },
  plugins: [],
}