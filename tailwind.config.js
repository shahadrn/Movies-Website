module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      paddingvw: "5vw",
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
  
    
    require('tailwind-scroll-behavior')(),
    
  ],
}
