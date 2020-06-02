const path = require('path');
const fs = require('fs');

module.exports = {
  title: 'Oruga',
  description: 'Documentations, API, and FAQ for Oruga',
  head: [['link', { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]],
  markdown: {
    extendMarkdown: md => {
      md.use(require('markdown-it-include'), {
        root: './docs/',
        includeRe: /<\[include\]\((.+)\)/i,
      });
    },
  },
  configureWebpack: {
    resolve: {
      alias: {
        vue: 'vue/dist/vue.common.js',
      },
    },
  },
  themeConfig: {
  }
};