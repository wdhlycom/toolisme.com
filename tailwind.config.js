import typography from '@tailwindcss/typography'

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './src/content/**/*.md',
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          50: '#f7f7f8',
          100: '#eeeef0',
          200: '#d8d8dd',
          300: '#b4b4bd',
          400: '#85858f',
          500: '#5f5f6b',
          600: '#474752',
          700: '#36363f',
          800: '#26262d',
          900: '#1a1a1f',
          950: '#0f0f13',
        },
        accent: {
          50: '#f0f7ff',
          100: '#e0effe',
          200: '#bae0fd',
          300: '#7cc8fb',
          400: '#36abf8',
          500: '#0c8eef',
          600: '#0070cd',
          700: '#0259a8',
          800: '#064c88',
          900: '#0a4070',
          950: '#072849',
        },
        sage: {
          50: '#f4f7f4',
          100: '#e4ece5',
          200: '#c9d9cc',
          300: '#a3bba8',
          400: '#7a9a82',
          500: '#5b7e64',
          600: '#46634f',
          700: '#384f40',
          800: '#2e4034',
          900: '#26352c',
          950: '#141e18',
        },
        sand: {
          50: '#faf8f5',
          100: '#f3eee5',
          200: '#e6dccd',
          300: '#d4c3a8',
          400: '#bda07a',
          500: '#a8855c',
          600: '#8e6b48',
          700: '#73543c',
          800: '#5e4633',
          900: '#4d3a2c',
          950: '#2c2017',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Fraunces', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      letterSpacing: {
        widest: '0.15em',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'fade-up': 'fadeUp 0.7s cubic-bezier(0.25, 0.8, 0.25, 1)',
        'pulse-soft': 'pulseSoft 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'gradient-x': 'gradientX 8s ease infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        gradientX: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
    },
  },
  plugins: [typography],
}
