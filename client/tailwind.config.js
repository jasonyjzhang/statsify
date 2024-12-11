module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1280px',
    },
    extend: {
      backgroundImage: {
        'gradient-summer': 'linear-gradient(to right, #FF7369, #FFD48E)',
        'gradient-gray': 'linear-gradient(to bottom, #282828, #616161)'
      },
      colors: {
        'dark': '#121212',
        'gray': '#EDEDED',
        'dark-gray': '#666666',
      },
    },
  },
  plugins: [],
}