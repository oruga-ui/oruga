# Introduction

Oruga is a <b>lightweight library of UI components for [Vue.js](https://vuejs.org/) without CSS framework dependency.</b><br>
It <b>doesn't depend on any specific style or CSS framework</b> (like Bootstrap, Bulma, TailwindCSS, etc) and it <b>doesn't provide any grid system or CSS utility</b>, it just offer a <b>set of components easy to customize only modifying your stylesheets</b> or <b>integrating it with a CSS framework</b> (see the [demo](#examples)).<br>
Oruga wants you to <b>focus only on UI/UX aspects</b> of your application and <b>be totally flexible to future changes</b> without having to touch a line of JavaScript. 

If you need a component library and want to easily apply your custom styles, Oruga is the library for you! 🐛

<Carbon />

### Availability

🐛 Oruga is available for [Vue.js](https://vuejs.org/) **version 3.x** and has been tested in all major browsers

![Chrome](https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png) | ![Firefox](https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png) | ![Opera](https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png) | ![Safari](https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png) | ![Edge](https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png)
--- | --- | --- | --- | --- |
Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ |

💅 For more info about components customization, go to the ["Customization section"](#customization).

🕹 To see Oruga in action, go to the ["Examples" section](#examples).

## Setup

::: code-group

```bash [Yarn]
yarn add @oruga-ui/oruga-next
```


```bash [Npm]
npm install @oruga-ui/oruga-next --save
```

```html [Cdn]
<link rel="stylesheet" href="https://unpkg.com/@oruga-ui/oruga-next/dist/oruga.min.css" />
<script src="https://unpkg.com/@oruga-ui/oruga-next/dist/oruga.min.js"></script>
```

:::

#### Full bundle

```js
import { createApp } from 'vue';
import Oruga from '@oruga-ui/oruga-next';

createApp(...).use(Oruga);
```

#### Individual components (tree shaking)

```js
import { createApp } from 'vue';
import { OAutocomplete, OSidebar } from '@oruga-ui/oruga-next';

createApp(...)
  .component(OAutocomplete)
  .component(OSidebar);
```

## Nuxt module

Oruga doesn't provide a [Nuxt.js](https://nuxtjs.org) module at the moment.

You can use Nuxt.js plugins system adding a file (e.g. `oruga.js`) in your `plugins` folder containing

```js
import Oruga from '@oruga-ui/oruga-next';
import '@oruga-ui/oruga-next/dist/oruga.css';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Oruga);
});
```

To make this plugin available in your app, add this file to the `plugins` array in your `nuxt.config.js`

```js
plugins: [{ src: '~plugins/oruga.js' }]
```

To understand how the plugins work with Nuxt.js, take a look at the [NuxtJS plugin documentation](https://v3.nuxtjs.org/guide/directory-structure/plugins/).


## Examples

### TailwindCSS, Bootstrap 5, Bulma and Material demo 🧶

- [Online demo](https://oruga-multiframework-demo.netlify.app)
- [Source code](https://github.com/oruga-ui/demo-multiframework)

<iframe frameborder="0" style="margin-top: 1rem; width: 100%; height: 80vh;"
    src="https://oruga-multiframework-demo.netlify.app/Tailwind">
</iframe>

### TailwindCSS 2 Recipe Demo 🍝🍔🍟

This simple demo shows a simple recipe website. Oruga components like Input, Radio, Loading, Switch, Collapse etc are customized using [TailwindCSS 2](https://tailwindcss.com/)!

- [Online demo](https://oruga-tailwindcss-demo.netlify.app)
- [Source code](https://github.com/oruga-ui/demo-tailwindcss)

## Articles

- [Oruga UI Components without CSS Framework Dependency - Article by Walter Tommasi](https://dev.to/jtommy/oruga-ui-components-library-without-css-framework-dependency-4m3m)
- [Oruga, the new kid on the block - Article by Andrea Stagi](https://dev.to/astagi/oruga-the-new-kid-on-the-block-1n55)
 