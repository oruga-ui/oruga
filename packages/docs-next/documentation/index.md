# Introduction

Oruga is a <b>lightweight UI components library</b> for [Vue.js](https://vuejs.org/)<b> without any dependency.</b><br>
It offers a <b>set of easily customisable components </b> and <b>doesn't depend on any specific style or CSS framework</b> (like Bootstrap, Bulma, TailwindCSS, etc).
Therefore, it <b>doesn't provide a grid system or CSS utilities</b>, but you can <b>integrate any CSS framework</b> you like (see the [demo](#examples)).<br>
Oruga provides you with a set of functional components, so you can <b>focus only on the UI/UX aspects</b> of your application 
and can be entirely flexible for future changes without having to touch a line of JavaScript.

If you need a component library and want to easily apply your custom styles, Oruga is the library for you! 🐛

<Carbon />

## Availability

🐛 Oruga is available for [Vue.js](https://vuejs.org/) **version 3.x** and has been tested in all major browsers.

![Chrome](https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png) | ![Firefox](https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png) | ![Opera](https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png) | ![Safari](https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png) | ![Edge](https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png)
--- | --- | --- | --- | --- |
Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ |

💅 For more info about components customization, go to [#customization](/documentation/customization).

🕹 To see Oruga in action, go to [#examples](#examples).

## Setup

::: code-group

```bash [Npm]
npm install @oruga-ui/oruga-next
```

```bash [Yarn]
yarn add @oruga-ui/oruga-next
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

### Styling

Oruga comes without any styling by default, but you can add styles by simply adding an additional theme package.
For more details and a list of existing themes, see [#themes](/documentation/themes).

The Oruga <i>default theme</i> can be added by:

::: code-group

```bash [Npm]
npm install @oruga-ui/theme-oruga
```

```bash [Yarn]
yarn add @oruga-ui/theme-oruga
```

```html [Cdn]
<link rel="stylesheet" href="https://unpkg.com/@oruga-ui/theme-oruga/dist/oruga.min.css" />
<script src="https://unpkg.com/@oruga-ui/theme-oruga/dist/oruga.min.js"></script>
```
:::

```js
import '@oruga-ui/theme-oruga/dist/scss/oruga-full.scss';
```

## Nuxt module

Oruga doesn't provide a [Nuxt.js](https://nuxtjs.org) module at the moment.

You can use Nuxt.js plugins system adding a file (e.g. `oruga.js`) in your `plugins` folder containing:

```js
import Oruga from '@oruga-ui/oruga-next';
import '@oruga-ui/oruga-next/dist/oruga.css';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Oruga);
});
```

To make this plugin available in your app, add this file to the `plugins` array in your `nuxt.config.js`:

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
 