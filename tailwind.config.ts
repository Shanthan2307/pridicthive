import type { Config } from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Monad Brand Colors
        monad: {
          purple: '#6E54FF',
          'light-purple': '#DDD7FE',
          'dark-bg': '#0E091C',
          black: '#000000',
          white: '#FFFFFF',
          cyan: '#85E6FF',
          'light-cyan': '#B9E3F9',
          pink: '#FF8EE4',
          orange: '#FFAE45',
        },
        background: '#0E091C',
        foreground: '#FFFFFF',
        sidebar: {
          DEFAULT: '#000000',
          foreground: '#FFFFFF',
          primary: '#6E54FF',
          'primary-foreground': '#FFFFFF',
          accent: '#1a1a1a',
          'accent-foreground': '#DDD7FE',
          border: '#2a2a2a',
          ring: '#6E54FF',
          active: '#85E6FF',
        },
      },
      borderRadius: {
        lg: '1rem',
        md: '0.75rem',
        sm: '0.5rem',
      },
      boxShadow: {
        'monad-glow': '0 0 20px rgba(110, 84, 255, 0.3), 0 0 40px rgba(110, 84, 255, 0.15)',
        'monad-cyan-glow': '0 0 20px rgba(133, 230, 255, 0.4), 0 0 40px rgba(133, 230, 255, 0.2)',
        'monad-strong': '0 0 30px rgba(110, 84, 255, 0.5), 0 0 60px rgba(110, 84, 255, 0.3)',
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': {
            boxShadow: '0 0 20px rgba(110, 84, 255, 0.3), 0 0 40px rgba(110, 84, 255, 0.15)',
          },
          '50%': {
            boxShadow: '0 0 30px rgba(110, 84, 255, 0.5), 0 0 60px rgba(110, 84, 255, 0.3)',
          },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;
