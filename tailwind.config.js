/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-dm-sans)'],
        serif: ['var(--font-cormorant)'],
      },
      colors: {
        background: '#F5F2EE',
        foreground: '#1A1A1A',
        accent: '#C9A84C',
      },
    },
  },
  plugins: [],
}