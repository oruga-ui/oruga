import { defineUserConfig } from 'vuepress'
import type { DefaultThemeOptions } from 'vuepress'

import path from 'path'
import fs from 'fs'

const componentsFolder = path.join(__dirname, '../components/')
const components = fs.readdirSync(componentsFolder).map(c => c.replace('.md', ''))
const sidebarComponents = components.map(c => `/components/${c}`)

export default defineUserConfig<DefaultThemeOptions>({
  theme: '@vuepress/theme-default',
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
 // plugins: ['demo-code'],
  themeConfig: {
    logo: '/logo.png',
    repo: 'oruga-ui/oruga',
    editLinks: true,
    docsDir: 'packages/docs-next',
    docsBranch: 'develop',
    navbar: [
        { text: 'Home', link: '/' },
        { text: 'Documentation', link: '/documentation/' },
        { text: 'Expo', link: '/expo/' },
        { text: 'Donate ☕️', children: [
            { text:'Ko-fi', link: 'https://ko-fi.com/orugaui' },
            { text:'Liberapay', link: 'https://liberapay.com/oruga-ui' }
        ]
      },
      // { text: '🎃 Hacktoberfest', link: '/hacktoberfest/' },
      { text: 'Discord', link: 'https://discord.gg/RuKuBYN' },
      { text: 'Twitter', link: 'https://twitter.com/oruga_ui' },
    ],
    sidebar: [
        {
            text: 'Get started',
            collapsible: false,
            link: '/documentation/'
        },
        {
            text: 'Components',
            collapsible: false,
            children: sidebarComponents
        }
    ]
  }
})
