module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1080px',
    },
    extend: {
      backgroundImage: {
        'gradient-summer': 'linear-gradient(to right, #FF7369, #FFD48E)',
        'gradient-gray': 'linear-gradient(to bottom, #282828, #616161)'
      },
      colors: {
        'dark': '#121212',
        'dark-gray': '#666666',
        'border-gray': '#252525',
        'custom-red': '#FF7369',
        'custom-orange' : '#FF9D77',
        'custom-yellow': '#FFD48E',
      },
    },
  },
  plugins: [],
}