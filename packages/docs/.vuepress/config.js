const path = require('path');
const fs = require('fs');

const componentsFolder = path.join(__dirname, '../components/');
const components = fs.readdirSync(componentsFolder).filter(c => c !== 'README.md').map(c => c.replace('.md', ''));

module.exports = {
  title: 'Oruga',
  description: 'Documentations and API for Oruga',
  head: [
    ['link', { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  ],
  plugins: [
    [
      '@vuepress/google-analytics',
      {
        ga: 'UA-171490794-1',
      }
    ],
    [
      'demo-block',
      {
        settings: {
          jsLib: ['https://unpkg.com/@oruga-ui/oruga/dist/oruga.min.js'],
          cssLib: ['https://unpkg.com/@oruga-ui/oruga/dist/oruga.min.css'],
          vue: 'https://cdn.jsdelivr.net/npm/vue',
          jsfiddle: false
        }
      }
    ]
  ],
  configureWebpack: {
    resolve: {
      alias: {
        vue: 'vue/dist/vue.common.js',
      }
    }
  },
  markdown: {
    config: md => {
      // use more markdown-it plugins!
      md.use(require('markdown-it-include'))
    }
  },
  themeConfig: {
    home: true,
    logo: "/logo.png",
    repo: "oruga-ui/oruga",
    editLinks: true,
    docsDir: 'packages/docs',
    docsBranch: 'develop',
    sidebar: {
      '/components/': [{
        title: 'Components',
        collapsable: false,
        children: [...components]
      }]
    },
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
      { text: 'Components', link: '/components/' },
      { text: 'Examples', link: '/examples/' }
    ]
  }
};