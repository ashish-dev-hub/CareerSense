/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#0c0a09',
          primary: '#292524',
          active: '#0c0a09',
        },
        body: {
          DEFAULT: '#4e4e4e',
          strong: '#292524',
        },
        muted: {
          DEFAULT: '#777169',
          soft: '#a8a29e',
        },
        hairline: {
          DEFAULT: '#e7e5e4',
          soft: '#f0efed',
          strong: '#d6d3d1',
        },
        canvas: {
          DEFAULT: '#f5f5f5',
          soft: '#fafafa',
          deep: '#0c0a09',
        },
        surface: {
          card: '#ffffff',
          strong: '#f0efed',
          dark: '#0c0a09',
          'dark-elevated': '#1c1917',
        },
        gradient: {
          mint: '#a7e5d3',
          peach: '#f4c5a8',
          lavender: '#c8b8e0',
          sky: '#a8c8e8',
          rose: '#e8b8c4',
        },
        semantic: {
          success: '#16a34a',
          error: '#dc2626',
        }
      },
      fontFamily: {
        display: ["'EB Garamond'", "'Waldenburg'", "Georgia", "serif"],
        sans: ["'Inter'", "system-ui", "-apple-system", "sans-serif"],
      },
      letterSpacing: {
        'display-mega': '-1.92px',
        'display-xl': '-0.96px',
        'display-lg': '-0.36px',
        'display-md': '-0.32px',
        'body-editorial': '0.16px',
        'caption-upper': '0.96px',
      },
      borderRadius: {
        'xxl': '24px',
        'pill': '9999px',
      },
      boxShadow: {
        'soft-drop': '0 4px 16px rgba(0, 0, 0, 0.04)',
        'elevated': '0 12px 32px rgba(0, 0, 0, 0.06)',
      },
      spacing: {
        'section': '96px',
      },
    },
  },
  plugins: [],
}
