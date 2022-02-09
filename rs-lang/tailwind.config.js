module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Roboto", "Arial", "sans-serif"],
    },
    screens: {
      xs: "475px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      xxl: "1440px",
      mw: { max: "767px" },
    },
    extend: {
      backgroundImage: {
        audiocall: "url('./assets/images/bg_main_audiocall.png')",
      },
      colors: {
        "black-rgba": "rgba(17, 24, 39, 0.7)",
      },
    },
  },
  plugins: [],
};
