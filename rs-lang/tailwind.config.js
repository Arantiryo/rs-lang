// const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Roboto", "Arial", "sans-serif"],
    },
    screens: {
      sm: "475px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
      // ...defaultTheme.screens,
    },
    extend: {},
  },
  plugins: [],
};
