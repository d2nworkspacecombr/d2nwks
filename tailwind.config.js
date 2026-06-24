/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        teal: { DEFAULT: "#1ec8c8", dark: "#0fa8a8", light: "#e0faf5" },
        navy: { DEFAULT: "#1a3560", dark: "#0f2240", mid: "#1e4080" },
        ink: { DEFAULT: "#0f1a2e", soft: "#4a5568", faint: "#a0aec0" },
        paper: "#f7f9fc",
        surface: "#eef2f7",
        line: "#e2e8f0",
      },
      fontFamily: {
        display: ["Barlow Condensed", "sans-serif"],
        sans: ["Barlow", "sans-serif"],
      },
      backgroundImage: {
        "d2n-grad": "linear-gradient(135deg, #1ec8c8 0%, #1a3560 100%)",
      },
    },
  },
  plugins: [],
};
