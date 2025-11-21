/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'deep-brown': '#4A3424',
        'warm-sand': '#C9A66B',
        'soft-beige': '#E6D8C3',
        'muted-brown': '#8C6E54',
      },
      fontFamily: {
        heading: ['var(--heading-font)', 'serif'],
        body: ['var(--body-font)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

