/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#003366',
          dark: '#002244',
          light: '#004488',
        },
        accent: {
          blue: '#0052A5',
          light: '#E6F0FA',
        },
        banking: {
          bg: '#F5F7FA',
          card: '#FFFFFF',
          border: '#E2E8F0',
        },
        status: {
          good: '#22c55e',
          warning: '#f59e0b',
          risk: '#ef4444',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        'premium': '0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.05)',
        'card': '0 4px 20px -2px rgba(0, 51, 102, 0.08)',
      }
    },
  },
  plugins: [],
}
