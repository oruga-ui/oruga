const path = require('path')
const fs = require('fs')

const componentsFolder = path.join(__dirname, '../components/')
const components = fs.readdirSync(componentsFolder).map(c => c.replace('.md', ''))
const sidebarComponents = components.map(c => `/components/${c}`)

module.exports = {
  title: `Oruga`,
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
    ['meta', { name: 'og:description', content: "Oruga UI is like a caterpillar, minimal and yet functional. It's in your hands turning it into a butterfly" }],
    ['meta', { name: 'og:image', content: 'https://oruga.io/logo-banner.png?v=3' }],
    ['meta', { name: 'og:image:type', content: 'image/png' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:site', content: '@oruga_ui' }],
    ['meta', { name: 'twitter:title', content: 'UI components for Vue.js and CSS framework agnostic' }],
    ['meta', { name: 'twitter:description', content: "Oruga UI is like a caterpillar, minimal and yet functional. It's in your hands turning it into a butterfly" }],
    ['meta', { name: 'twitter:image', content: 'https://oruga.io/logo-banner.png?v=3' }]
  ],
  plugins: [
    [
      'demo-block',
      {
        settings: {
            jsLib: ['https://oruga-documentation-preview.netlify.app/cdn/oruga.min.js'],
            cssLib: [
                'https://oruga-documentation-preview.netlify.app/cdn/oruga.min.css',
                'https://cdn.jsdelivr.net/npm/@mdi/font@5.8.55/css/materialdesignicons.min.css'
            ],
            vue: 'https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.min.js',
            jsfiddle: false,
            codepen: true
        }
      }
    ]
  ],
  configureWebpack: {
    resolve: {
      alias: {
        vue: 'vue/dist/vue.common.js',
        'process.env.NODE_ENV': process.env.NODE_ENV
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
    logo: '/logo.png',
    repo: 'oruga-ui/oruga',
    editLinks: true,
    docsDir: 'packages/docs',
    docsBranch: 'develop',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Documentation', link: '/documentation/' },
      { text: 'Expo', link: '/expo/' },
      { text: 'Donate ☕️', items: [
          {text:'Ko-fi', link: 'https://ko-fi.com/orugaui' }
        ]
      },
      // { text: '🎃 Hacktoberfest', link: '/hacktoberfest/' },
      { text: 'Discord', link: 'https://discord.gg/RuKuBYN' },
      { text: 'Twitter', link: 'https://twitter.com/oruga_ui' },
    ],
    sidebar: [
      {
        title: 'Get started',
        collapsable: true,
        path: '/documentation/',
        sidebarDepth: 2
      },
      {
        title: 'Components',
        collapsable: false,
        children: sidebarComponents
      }
    ]
  }
}
