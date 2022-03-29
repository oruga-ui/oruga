import path from 'path'
import fs from 'fs'
import { defineConfigWithTheme } from 'vitepress'
import type { Config as ThemeConfig } from '@vue/theme'
import baseConfig from '@vue/theme/config'

const componentsFolder = path.join(__dirname, '../src/components/')
const components = fs.readdirSync(componentsFolder).map(c => c.replace('.md', ''))
const sidebarComponents = components.map(c => `/components/${c}`)

export default defineConfigWithTheme<ThemeConfig>({
  extends: baseConfig,
  lang: 'en-US',
  title: 'Oruga',
  description: 'UI components for Vue.js and CSS framework agnostic',
  srcDir: 'src',
  scrollOffset: 'header',
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
  markdown: {
    config: md => {
      // use more markdown-it plugins!
      md.use(require('markdown-it-include'))
    }
  },
  themeConfig: {
    editLink: {
        repo: 'oruga-ui/oruga/docs-next',
        text: 'Edit this page on GitHub'
    },
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Documentation', link: '/documentation/' },
      { text: 'Expo', link: '/expo/' },
      { text: 'Donate ☕️', items: [
          {text:'Ko-fi', link: 'https://ko-fi.com/orugaui' },
          {text:'Liberapay', link: 'https://liberapay.com/oruga-ui' }
        ]
      }
    ],
    sidebar: [
      /* {
        title: 'Get started',
        collapsable: true,
        path: '/documentation/',
        sidebarDepth: 2
      }
      */
    ],
    socialLinks: [
        { icon: 'github', link: 'https://github.com/oruga-ui/oruga' },
        { icon: 'twitter', link: 'https://twitter.com/oruga_ui' },
        { icon: 'discord', link: 'https://discord.gg/RuKuBYN' }
    ],
    footer: {
        license: {
            text: 'MIT License',
            link: 'https://opensource.org/licenses/MIT'
        },
        copyright: `Copyright © 2020-${new Date().getFullYear()} Walter Tommasi`
    }
  },
  vite: {
    define: {
      __VUE_OPTIONS_API__: false
    },
    optimizeDeps: {
      include: ['gsap', 'dynamics.js'],
      exclude: ['@vue/repl']
    },
    // @ts-ignore
    ssr: {
      external: ['@vue/repl']
    },
    server: {
      host: true,
      fs: {
        // for when developing with locally linked theme
        allow: ['../..']
      }
    },
    build: {
      minify: 'terser',
      chunkSizeWarningLimit: Infinity
    },
    json: {
      stringify: true
    }
  },

  vue: {
    reactivityTransform: true
  }
})
