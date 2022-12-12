/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      spacing: {
        '80vh': '80vh',
      },
      gridTemplateRows: {
        'catalog': 'repeat(4, minmax(0, 8rem))',
        'catalog-md': 'repeat(3, minmax(0, 4rem))',
      },
    },
  },
  plugins: [],
}
