const autoprefixer = require('autoprefixer');
const tailwindcss = require('tailwindcss')('./tailwind.config.js');

module.exports = {
  plugins: [
    tailwindcss,
    autoprefixer,
  ]
};
