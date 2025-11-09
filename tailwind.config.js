
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{html,ts}",
    "./projects/**/*.{html,ts}", // all 3 Angular apps
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#6366f1', // indigo-500
          dark: '#4f46e5',
        },
        gray: {
          950: '#0a0a0a'
        },
        accent: {
          DEFAULT: "#e91e63", // Material Pink
        },
      },
      boxShadow: {
        soft: '0 4px 12px rgba(0,0,0,0.08)',
      },
      transitionTimingFunction: {
        'in-expo': 'cubic-bezier(0.95, 0.05, 0.795, 0.035)',
        'out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
      }
    },
  },
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')],
};

