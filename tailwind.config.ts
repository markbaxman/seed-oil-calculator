import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.{md,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        orange: {
          primary: '#ea580c',
          dark: '#c2410c',
          light: '#fff7ed',
        },
        stone: {
          bg: '#fafaf9',
          card: '#ffffff',
          primary: '#1c1917',
          secondary: '#57534e',
          muted: '#a8a29e',
          border: '#e7e5e4',
        },
        risk: {
          optimal: '#16a34a',
          moderate: '#ca8a04',
          high: '#ea580c',
          veryHigh: '#dc2626',
        },
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          'Oxygen',
          'Ubuntu',
          'Cantarell',
          '"Fira Sans"',
          '"Droid Sans"',
          '"Helvetica Neue"',
          'sans-serif',
        ],
      },
      fontSize: {
        'display': ['2.5rem', { fontWeight: '700', lineHeight: '1.2' }],
        'h2': ['1.75rem', { fontWeight: '600', lineHeight: '1.3' }],
      },
      maxWidth: {
        'content': '680px',
      },
    },
  },
  plugins: [],
}

export default config
