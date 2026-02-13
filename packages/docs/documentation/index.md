# Introduction

Oruga is a lightweight UI component library for [Vue.js](https://vuejs.org/) **without any dependency** and doesn't depend on any specific style or CSS framework (such as Bootstrap, Bulma, Tailwind, etc).
Therefore, it **doesn't provide a grid system or CSS utilities**; however, you can easily integrate any CSS framework you like (see the [demo](#examples)).

Oruga provides you with a set of functional and easily customisable components, where you can define classes globally and override them locally when necessary. So you can **focus only on the UI/UX aspects** of your application and can be entirely flexible for future changes without having to touch a line of JavaScript.

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

In order to use Oruga components, you have to register an `Oruga` instance to your Vue app.
This instance manages the global components and configurations, as well as the current Vue app connection.

A new instance can be created by the `createOruga` composable.

```js
import { createOruga } from "@oruga-ui/oruga-next";
const Oruga = createOruga();
```

However, the package also comes with a main `Oruga` instance as the default package export.
An `Oruga` instance is also a Vue plugin, so you must use the `app.use()` function to pass it to your current Vue app.

To extend the default global configuration, pass either a custom configuration object when creating a new Oruga instance, or pass it as the second argument when installing the instance to the Vue app.  
See [configuration](/documentation/configuration) for further details and available configuration options.

```js
import { createApp } from "vue";
import Oruga from "@oruga-ui/oruga-next";

const app = createApp(App);

app.use(Oruga, {
    // here goes the global config
});
```

To take advantage of bundler’s [tree-shaking](https://en.wikipedia.org/wiki/Tree_shaking) optimisations, no components are registered globally by default.
If you want to register a component globally, extend the main Oruga instance with the relevant component plugin.
This makes the respective component and its subcomponents, as well as any related programmatic components, globally available.

> Note: before v0.13 the main Oruga Vue plugin registered all components globally by default.

```js
import { createApp } from "vue";
import Oruga, { Autocomplete, Sidebar } from "@oruga-ui/oruga-next";

Oruga.use(Autocomplete);
Oruga.use(Sidebar);

const app = createApp(App);

app.use(Oruga, {
    // here goes the global config
});
```

Once installed, you can use all your registered global components in an [SFC](https://vuejs.org/guide/scaling-up/sfc) like this:

```html
<template>
    <o-button>oruga-ui</o-button>
</template>
```

However, if you just want to import a single component separately, without any additional programmatic functionalities, you can import the individual components as follows:

```vue
<script setup>
import { OButton } from "@oruga-ui/oruga-next";
</script>

<template>
    <o-button>oruga-ui</o-button>
</template>
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

### VSC support

If you are using Visual Studio Code (VSC), you can specify global component types by configuring `compilerOptions.types` in your `tsconfig.json`:

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

## Accessibility

Our goal is to provide components that are as accessible as possible and implement accessibility standards by default.
The [ARIA Authoring Practices Guide (APG)](https://www.w3.org/WAI/ARIA/apg/) provides a set of accessibility patterns, which describes how to apply accessibility semantics to common design patterns and widget.
Where possible, our components implement or support these W3C ARIA APG patterns.
The patterns supported by each component can be seen at the top of its documentation page.

If you notice any accessibility issues regarding Oruga components, we encourage you to raise awareness and open an issue!

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
