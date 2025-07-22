/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      xs: { min: "320px", max: "639px" },
      sm: { min: "640px", max: "767px" },
      md: { min: "768px", max: "1023px" },
      lg: { min: "1024px", max: "1279px" },
      xl: { min: "1280px" },
    },
    extend: {
      boxShadow: {
        custom: "0 0 10px rgba(0, 0, 0, 0.2)", // all sides
      },
    },
    colors: {
      primary: "#FFFFFF",
      secondary: "#00000",
      red: "#FF0000",
      green: "#008000",
      blue: "#0000FF",
      linkBlue: "#6487e1",
      grey: "#808080",
      darkGray: "#A9A9A9",
      disableGrey: "#DCDCDC",
      hotPink: "#FF69B4",
      orange: "#FFA500",
      gold: "#FFD700",
      magenta: "#FF00FF",
      darkViolet: "#9400D3",
      slateBlue: "#6A5ACD",
    },
  },
  plugins: [],
};
// pick color code from below website and put in color code if not avialable
// https://htmlcolorcodes.com/color-names/
