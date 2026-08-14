/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        slate: {
          850: '#111827',
          950: '#070b14',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow-blue': 'glowBlue 3s ease-in-out infinite alternate',
      },
      keyframes: {
        glowBlue: {
          '0%': { boxShadow: '0 0 15px rgba(59, 130, 246, 0.2)' },
          '100%': { boxShadow: '0 0 30px rgba(139, 92, 246, 0.5)' },
        }
      }
    },
  },
  plugins: [],
}
