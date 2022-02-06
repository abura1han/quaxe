module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      'mobile': '400px',
      'tablet': '640px',
      'laptop': '1024px',
      'desktop': '1280px',
    },
    extend: {
      colors: {
        "qx-deep": "#262626",
        "qx-light": "#2D2C2C",
        "qx-s-light": "#363636",
        "qx-icon": "#B6B6B6",
        "qx-sky": "#00A4EA",
        "qx-line": "#4F4F4F",
      }
    },
  },
  plugins: [],
}