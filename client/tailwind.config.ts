import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#FDF2F2',
          100: '#FBE0E0',
          200: '#F5B8B8',
          300: '#ED8A8A',
          400: '#D94F4F',
          500: '#B52727',
          600: '#8B1A1A',
          700: '#6E1414',
          800: '#521010',
          900: '#3A0B0B',
          950: '#250707',
          DEFAULT: '#8B1A1A',
        },
        secondary: {
          50: '#FAF5F0',
          100: '#F0E4D6',
          200: '#E0C9AD',
          300: '#CCA97F',
          400: '#B08550',
          500: '#8A6234',
          600: '#5C3317',
          700: '#4A2912',
          800: '#3A200E',
          900: '#2A170A',
          950: '#1A0E06',
          DEFAULT: '#5C3317',
        },
        accent: {
          50: '#FDF9EF',
          100: '#FAEFD4',
          200: '#F3DCA3',
          300: '#EBC86E',
          400: '#D9AD42',
          500: '#C4922A',
          600: '#A57520',
          700: '#845C1A',
          800: '#634514',
          900: '#422E0D',
          950: '#2B1E08',
          DEFAULT: '#C4922A',
        },
        cream: '#FFF8F0',
        bone: '#F5E6D3',
        charcoal: '#2D2D2D',
      },
      fontFamily: {
        heading: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'sm': '0.25rem',
        'DEFAULT': '0.5rem',
        'md': '0.5rem',
        'lg': '0.75rem',
        'xl': '1rem',
        '2xl': '1.5rem',
      },
      boxShadow: {
        'soft': '0 2px 8px rgba(0, 0, 0, 0.06)',
        'medium': '0 4px 16px rgba(0, 0, 0, 0.08)',
        'strong': '0 8px 32px rgba(0, 0, 0, 0.12)',
        'elevated': '0 12px 48px rgba(0, 0, 0, 0.16)',
        'inner-soft': 'inset 0 2px 4px rgba(0, 0, 0, 0.04)',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
