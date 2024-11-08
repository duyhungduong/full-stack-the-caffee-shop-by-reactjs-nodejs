/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        "pastel-pink": "#FFD1DC",
        "pastel-yellow": "#FFFACD",
        "pastel-purple": "#DCC6E0",
        "pastel-teal": "#A7D8DE",
        "pastel-blue": "#B3E5FC",
        "pastel-blue-dark": "#81D4FA",
        "coffee-background": "#f6f4f3",
        "coffee-beige": "#f5f5dc", // màu be nhẹ
        "coffee-brown": "#8b4513", // màu nâu cà phê
        "coffee-dark": "#5d4037", // màu nâu đậm
        "coffee-green": "#6b8e23",
        
        'coffee-light': '#f3e5d5', // màu xanh lá nhạt
      },
      fontFamily: {
        serif: ['Merriweather', 'serif'],
        sans: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
