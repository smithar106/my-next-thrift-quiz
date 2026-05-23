/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'accent-green': '#00AB4E',
        'bright-green': '#00DD00',
        'bg-dark': '#0A0A0A',
      },
      animation: {
        'pulse-cta': 'pulse-cta 2s ease-in-out infinite',
        'fade-in': 'fade-in 0.4s ease-out forwards',
        'slide-up': 'slide-up 0.4s ease-out forwards',
      },
      keyframes: {
        'pulse-cta': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(0, 171, 78, 0.4)' },
          '50%': { boxShadow: '0 0 0 12px rgba(0, 171, 78, 0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
