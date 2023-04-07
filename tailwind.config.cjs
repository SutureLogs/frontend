const config = {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    extend: {
      colors: {
        primary: "#4669C1",
      },
    },
  },

  plugins: [require("daisyui")],
};

module.exports = config;
