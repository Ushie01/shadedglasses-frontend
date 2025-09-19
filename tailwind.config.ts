module.exports = {
  theme: {
    extend: {
      colors: {
        primary: "#92B917",
        black: "#000000",
        white: "#ffffff",
        gray: {
          300: "rgb(209 213 219)", // instead of lab()
        },
      },
    },
  },
  corePlugins: {
    preflight: true,
  },
  future: {
    disableColorOpacityUtilitiesByDefault: true,
  },
};
