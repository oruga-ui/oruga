const { defineConfig } = require('vite');
const path = require('path');

module.exports = defineConfig({
  resolve: {
    alias: {
      './Nav.vue': path.resolve(__dirname, '.vitepress/theme/layout/Nav.vue'),
      './NavBar.vue': path.resolve(__dirname, '.vitepress/theme/layout/NavBar.vue'),
    }
  }
});
