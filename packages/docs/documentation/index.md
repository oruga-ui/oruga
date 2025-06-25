# Introduction

Oruga is a lightweight UI component library for [Vue.js](https://vuejs.org/) **without any dependency** and doesn't depend on any specific style or CSS framework (such as Bootstrap, Bulma, Tailwind, etc).
Therefore, it **doesn't provide a grid system or CSS utilities**; however, you can easily integrate any CSS framework you like (see the [demo](#examples)).

Oruga provides you with a set of functional and easily customisable components, where you can define classes globally and override them locally when necessary. So you can **focus only on the UI/UX aspects** of your application
and can be entirely flexible for future changes without having to touch a line of JavaScript.

If you need a component library and want to easily apply your [custom styles](/documentation/configuration), Oruga is the library for you! 🐛  
In addition, if you don't want to style everything yourself, we've created several [themes](/documentation/themes) to provide you with a variety of ready-to-use styles. 🦋

---

🐛 Oruga is available for [Vue.js](https://vuejs.org/) **version 3.x**.

💅 For more information about customising components, go to [configuration](/documentation/configuration).

🦋 For a list of all available custom styles, go to [themes](/documentation/themes).

🕹 To see Oruga in action, go to [examples](#examples).

::: warning _Oruga for Vue 2.x deprecated_  
Due to [EOL for Vue 2.x](https://v2.vuejs.org/lts/) at the end of the year 2023, from now on Oruga for Vue 2 ([`@oruga-ui/oruga`](https://www.npmjs.com/package/@oruga-ui/oruga)) is deprecated.
Further enhancements will only be developed for [`@oruga-ui/oruga-next`](https://www.npmjs.com/package/@oruga-ui/oruga-next).
:::

## Setup

Install Oruga with your favorite package manager:

::: code-group

```bash [Npm]
npm install @oruga-ui/oruga-next
```

```bash [Yarn]
yarn add @oruga-ui/oruga-next
```

```html [Cdn]
<script src="https://unpkg.com/@oruga-ui/oruga-next/dist/oruga.js"></script>
```

:::

### Oruga Plugin

To import all Oruga components you can use the default `Oruga` export in your main entry point.
To specify some global configuration, a configuration object can be passed as second argument of `app.use` when installing it.  
See [configuration](/documentation/configuration) for details of the available configuration options.

```js
import { createApp } from "vue";
import Oruga from "@oruga-ui/oruga-next";

const app = createApp(App);

app.use(Oruga, {
    // here goes the global config
});
```

After the installation, you can use all the components in an [SFC](https://vuejs.org/guide/scaling-up/sfc) like this:

```html
<template>
    <o-button>oruga-ui</o-button>
</template>
```

### Individual Components (tree shaking)

To take advantage of bundler’s [tree-shaking](https://en.wikipedia.org/wiki/Tree_shaking) optimizations, each component can also be added individually using its own plugin. Doing so allows you to globally add only the components you need, including their sub- and programmatic components:

```js
import { createApp } from 'vue';
import { Autocomplete, Sidebar } from '@oruga-ui/oruga-next';

createApp(...)
  .use(Autocomplete)
  .use(Sidebar);
```

When only using individual components, no global configuration is initialised by default.
To add some global configuration we provide an additional `OrugaConfig` plugin:

```js
import { OrugaConfig } from '@oruga-ui/oruga-next';

const options: OrugaOptions = { ... }

createApp(...)
  .use(OrugaConfig, options);
```

However, if you just need to import a single component separately, without any additional programmatic functionalities, you can import individual components like this:

```js
import { createApp } from 'vue';
import { OAutocomplete, OSidebar } from '@oruga-ui/oruga-next';

createApp(...)
  .component(OAutocomplete)
  .component(OSidebar);
```

### Styling

Oruga comes without any styling by default, but you can easily add your own custom styles or an additional theme package.
For more details and a list of available themes, see [configuration](/documentation/configuration) and [themes](/documentation/themes).

The default **Oruga theme** can be added like this:

::: code-group

```bash [Npm]
npm install @oruga-ui/theme-oruga
```

```bash [Yarn]
yarn add @oruga-ui/theme-oruga
```

```html [Cdn]
<link
    rel="stylesheet"
    href="https://unpkg.com/@oruga-ui/theme-oruga/dist/oruga.min.css" />
```

:::

```scss
@import "@oruga-ui/theme-oruga/dist/scss/oruga.scss";
```

### Volar support

If you are using Volar, you can specify global component types by configuring `compilerOptions.types` in `tsconfig.json`.

```js
// tsconfig.json
{
  "compilerOptions": {
    // ...
    "types": ["@oruga-ui/oruga-next/volar"]
  }
}
```

### Nuxt module

Oruga doesn't provide a [Nuxt.js](https://nuxtjs.org) module at the moment.

But you can use Nuxt.js plugins system adding a file (e.g. `oruga.js`) in your `plugins` folder containing:

```js
import Oruga from "@oruga-ui/oruga-next";

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(Oruga);
});
```

To make this plugin available in your app, add this file to the `plugins` array in your `nuxt.config.js`:

```js
plugins: [{ src: "~plugins/oruga.js" }];
```

To understand how the plugins work with Nuxt.js, take a look at the [NuxtJS plugin documentation](https://v3.nuxtjs.org/guide/directory-structure/plugins/).

## Community

Community involvement and contribution is one of the most important aspects of an open source project.
We invite you to contribute to this project!
There are many ways to help — from creating pull requests to our open source code bases, to filing issues so we can improve Oruga for everyone.

If you need generalized help or want to make connections within the community, consider joining the official Discord.

[➜ Join the Oruga Discord server](https://discord.gg/RuKuBYN)

**Open issues on GitHub (bugs and features)** -
[GitHub issues](https://github.com/oruga-ui/oruga/issues/new/choose) are for feature requests and bug reports.
If you've found a bug, please create a GitHub issue!
Feature requests are always welcome. If you have an idea for improvements, let us know!

**Create a theme to share** -
We have created some [themes](themes) for you.
However, if you have created a nice theme for Oruga? Let us know! We will be happy to include links to and share high quality content in our docs.

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
