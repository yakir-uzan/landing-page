/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // פלטת Clay — שנהב חם, פחם עמוק, כתום שרוף
        ink: '#0e0d0b',
        'ink-soft': '#1a1815',
        cream: '#f3ede1',
        'cream-2': '#e9e0cf',
        clay: '#d94f2a',
        'clay-deep': '#b23c1c',
        sand: '#c9b79a',
        moss: '#3f5a45',
      },
      fontFamily: {
        display: ['Rubik', 'Heebo', 'system-ui', 'sans-serif'],
        body: ['Heebo', 'system-ui', 'sans-serif'],
      },
      fontWeight: {
        400: '400',
        500: '500',
        600: '600',
        700: '700',
        800: '800',
        900: '900',
      },
      transitionDuration: {
        400: '400ms',
      },
      fontSize: {
        mega: ['clamp(3rem, 11vw, 11rem)', { lineHeight: '0.92', letterSpacing: '-0.02em' }],
        giant: ['clamp(2.4rem, 7vw, 6rem)', { lineHeight: '1.0', letterSpacing: '-0.015em' }],
      },
      maxWidth: {
        wide: '1440px',
      },
      transitionTimingFunction: {
        clay: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};
