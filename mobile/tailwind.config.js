/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './app/**/*.{tsx}'],
  theme: {
    extend: {
      fontFamily: {
        title: 'Roboto_700Bold',
        body: 'Roboto_400Regular',
        alt: 'BaiJamjuree_700Bold',
      },
      colors: {
        gray: {
          50: '#eaeaea',
          100: ' #bebebf',
          200: '#9e9ea0',
          300: ' #727275',
          400: ' #56565a',
          500: '#2c2c31',
          600: ' #1f1f23',
          700: ' #18181b',
          800: ' #121215',
        },
        purpule: {
          50: '#f3eefc',
          100: ' #d8cbf7',
          200: '#c6b2f3',
          300: ' #ab8eee',
          400: '#9b79ea',
          500: '#8257e5',
          600: '#764fd0',
          700: '#5c3ea3',
          800: '#48307e',
          900: '#372560 ',
        },
        green: {
          50: ' #b1f1ce',
          100: ' #8cebb6',
          200: '#57e295',
          300: ' #36dc81',
          400: '#04d361',
          500: '#04c058',
          600: '#039645',
          700: '#027435',
          800: '#025929',
          900: '#e6fbef ',
        },
      },
    },
  },
  plugins: [],
}
