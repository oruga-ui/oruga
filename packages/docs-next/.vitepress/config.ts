import { defineConfig } from "vitepress";

import path from "path";
import fs from "fs";

import { version } from "../../oruga-next/package.json";

const componentsFolder = path.join(__dirname, "../components/");
const components = fs
    .readdirSync(componentsFolder)
    .map((c) => c.replace(".md", ""));

const componentsItems = components
    .map((c) => `/components/${c}`)
    .map((c) => {
        const name = c.split("/")[2];
        return {
            text: name,
            link: c,
        };
    });

const getStartedItems = [
    {
        text: "Introduction",
        link: "/documentation/#introduction",
    },
    {
        text: "Customisation",
        link: "/documentation/customisation",
    },
    {
        text: "Themes",
        link: "/documentation/themes",
    },
];

export default defineConfig({
    title: `Oruga`,
    description: "UI components for Vue.js and CSS framework agnostic",
    // prettier-ignore
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
      ['meta', { name: 'og:description', content: "Oruga UI is like a caterpillar, minimal and yet functional. It's in your hands turning it into a butterfly." }],
      ['meta', { name: 'og:image', content: 'https://oruga.io/logo-banner.png?v=3' }],
      ['meta', { name: 'og:image:type', content: 'image/png' }],
      ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
      ['meta', { name: 'twitter:site', content: '@oruga_ui' }],
      ['meta', { name: 'twitter:title', content: 'UI components for Vue.js and CSS framework agnostic' }],
      ['meta', { name: 'twitter:description', content: "Oruga UI is like a caterpillar, minimal and yet functional. It's in your hands turning it into a butterfly." }],
      ['meta', { name: 'twitter:image', content: 'https://oruga.io/logo-banner.png?v=3' }],
    ],
    appearance: false,
    themeConfig: {
        logo: "/logo.png",
        outline: [2, 3],
        search: {
            provider: "local",
        },
        socialLinks: [
            { icon: "discord", link: "https://discord.gg/RuKuBYN" },
            { icon: "twitter", link: "https://twitter.com/oruga_ui" },
            { icon: "github", link: "https://github.com/oruga-ui/oruga" },
        ],
        nav: [
            { text: "Home", link: "/" },
            { text: "Documentation", link: "/documentation/" },
            { text: "Expo", link: "/expo/" },
            {
                text: "Support",
                items: [{ text: "Ko-fi", link: "https://ko-fi.com/orugaui" }],
            },
            {
                text: `v${version}`,
                items: [
                    {
                        text: "Changelog",
                        link: "https://github.com/oruga-ui/oruga/releases",
                    },
                    {
                        text: "Vue 2 version",
                        link: "https://vue2.oruga.io",
                    },
                ],
            },
        ],
        sidebar: {
            "/documentation/": [
                {
                    text: "Get Started",
                    collapsed: false,
                    items: getStartedItems,
                },
                {
                    text: "Components",
                    collapsed: false,
                    items: componentsItems,
                },
            ],
            "/components/": [
                {
                    text: "Get Started",
                    collapsed: false,
                    items: getStartedItems,
                },
                {
                    text: "Components",
                    collapsed: false,
                    items: componentsItems,
                },
            ],
        },
        footer: {
            message: "Released under the MIT License.",
            copyright: `Copyright © 2020-${new Date().getFullYear()} Walter Tommasi`,
        },
        /*carbonAds: {
        code: 'CESI42JW',
        placement: 'orugaio'
      }*/
    },
});
