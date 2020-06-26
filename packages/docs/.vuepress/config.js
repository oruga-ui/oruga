const path = require('path');
const fs = require('fs');

const componentsFolder = path.join(__dirname, '../components/');
const components = fs.readdirSync(componentsFolder).filter(c => c !== 'README.md');

module.exports = {
  title: 'Oruga',
  description: 'Documentations and API for Oruga',
  head: [
    ['link', { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  ],
  plugins: [
    [ "live" ]
  ],
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
    docsBranch: 'master',
    sidebar: {
      '/components/': components
    },
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Quickstart', link: '/quickstart/' },
      { text: 'Components', link: '/components/' }
    ],
  }
};