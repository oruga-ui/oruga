const path = require('path');
const fs = require('fs');

const componentsFolder = path.join(__dirname, '../components/');
const components = fs.readdirSync(componentsFolder).filter(c => c !== 'README.md').map(c => c.replace('.md', ''));

module.exports = {
  title: 'Oruga',
  description: 'UI components for Vue.js and CSS framework agnostic',
  head: [
    ['link', { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    ['meta', { charset: 'utf-8' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1' }],
    ['meta', { name: 'title', content: 'Oruga UI - Vue.js' }],
    ['meta', { name: 'og:locale', content: 'en_US' }],
    ['meta', { name: 'og:type', content: 'website' }],
    ['meta', { name: 'og:url', content: 'https://oruga.io' }],
    ['meta', { name: 'og:title', content: 'UI components for Vue.js and CSS framework agnostic' }],
    ['meta', { name: 'og:site_name', content: 'Oruga' }],
    ['meta', { name: 'og:description', content: 'Oruga UI is like a caterpillar, minimal and yet functional. It\'s in your hands turning it into a butterfly' }],
    ['meta', { name: 'og:image', content: 'https://oruga.io/logo-banner.png' }],
    ['meta', { name: 'og:image:type', content: 'image/png' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:site', content: '@walter_tommasi' }],
    ['meta', { name: 'twitter:title', content: 'UI components for Vue.js and CSS framework agnostic' }],
    ['meta', { name: 'twitter:description', content: 'Oruga UI is like a caterpillar, minimal and yet functional. It\'s in your hands turning it into a butterfly' }],
    ['meta', { name: 'twitter:image', content: 'https://oruga.io/logo-banner.png' }]
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
          jsfiddle: false,
          codepen: false
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