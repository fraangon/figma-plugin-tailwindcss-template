/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,tsx}", "./src/*.{html,js,tsx}"],
  theme: {
    fontFamily: {
      mono: `'JetBrains Mono', JetBrains Mono, monospace`,
    },
    extend: {
      colors: {
        "basement-orange": "#ff4d00",
        gray: {
          50: "#f6f6f6",
          100: "#e7e7e7",
          200: "#d1d1d1",
          300: "#b0b0b0",
          400: "#888888",
          500: "#6d6d6d",
          600: "#5d5d5d",
          700: "#4f4f4f",
          800: "#454545",
          900: "#3d3d3d",
          950: "#121212",
        },
      },
    },
  },
  plugins: [],
};
