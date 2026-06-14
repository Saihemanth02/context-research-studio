/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBg: '#050510',
        darkPanel: '#09091f',
        accentCyan: '#00f5d4',
        accentViolet: '#7b61ff',
        glassBg: 'rgba(255, 255, 255, 0.06)',
        glassBorder: 'rgba(255, 255, 255, 0.12)',
      },
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
      },
      backgroundImage: {
        'radial-gradient': 'radial-gradient(circle at 50% 50%, var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [],
}
