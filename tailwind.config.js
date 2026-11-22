/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#18211f",
        muted: "#68736f",
        paper: "#f7f7f3",
        accent: "#a77b50",
        line: "#e5e7e2"
      },
      fontFamily: { sans: ["Arial", "Helvetica", "sans-serif"] }
    }
  },
  plugins: []
};
