<p align="center">
    <a href="https://oruga.io">
        <img width="240" src="https://github.com/oruga-ui/oruga/raw/master/packages/docs/.vuepress/public/logo.png" />
    </a>
</p>

<p align="center">
  <i>Oruga UI is like a caterpillar, minimal and yet functional. It's in your hands turning it into a butterfly</i>
</p>

<p align="center">
(🐛) => 🦋
</p>

> Oruga is a lightweight library of UI components for [Vue.js](https://vuejs.org/) without CSS framework dependency

<p align="center">
    <a href="https://www.npmjs.com/package/@oruga-ui/oruga"><img src="https://img.shields.io/npm/v/@oruga-ui/oruga.svg?logo=npm" /></a>
    <a href="https://www.npmjs.com/package/@oruga-ui/oruga"><img src="https://img.shields.io/npm/dt/@oruga-ui/oruga.svg" /></a>
    <a href="https://circleci.com/gh/oruga-ui/oruga"><img src="https://img.shields.io/circleci/project/github/oruga-ui/oruga.svg?style=flat-square" /><a>
    <a href="https://codecov.io/gh/oruga-ui/oruga"><img src="https://img.shields.io/codecov/c/github/oruga-ui/oruga.svg?style=flat-square" /></a>
    <a href="https://discord.gg/RuKuBYN"><img src="https://img.shields.io/badge/chat-on%20discord-7289DA.svg?logo=discord" /></a>
</p>

*Oruga Next version for Vue 3.x*

<p align="center">
    <a href="https://www.npmjs.com/package/@oruga-ui/oruga-next"><img src="https://img.shields.io/npm/v/@oruga-ui/oruga-next.svg?logo=npm" /></a>
    <a href="https://www.npmjs.com/package/@oruga-ui/oruga-next"><img src="https://img.shields.io/npm/dt/@oruga-ui/oruga-next.svg" /></a>
</p>

## Features

* **CSS framework agnostic**: No dependency on a specific CSS framework/library but you can easily integrate the components with one of them because they are fully customizable in different ways
* **Components with steroids**: most of the components aren't a simple wrapper of native elements but they add new and custom features
* **Lightweight**: no other internal dependency and import only components that you need

Oruga doesn't depend on any specific style or CSS framework (like Bootstrap, Bulma, TailwindCSS etc...) and it doesn't provide any grid system or CSS utility, it just offer a set of components easy to customize. Oruga wants you to focus only on UI/UX aspects of your application and be totally flexible to future changes without having to touch a line of JavaScript.

## Documentation

Browse [online documentation here](https://oruga.io/documentation/).

💅 For more info about components customization, [read carefully the "customization" section](https://oruga.io/documentation/#customization) in the documentation.

🕹 To see Oruga in action, go to the [Example section](https://oruga.io/documentation/#examples) in the documentation.

Note: the documentation source code is in the `docs` directory, it serves as the demo as well.

## Browser support

🌎 Oruga has been tested in all major browsers

![Chrome](https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png) | ![Firefox](https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png) | ![IE](https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png) | ![Opera](https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png) | ![Safari](https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png) | ![Internet Explorer](https://raw.githubusercontent.com/alrra/browser-logos/master/src/archive/internet-explorer_9-11/internet-explorer_9-11_48x48.png)
--- | --- | --- | --- | --- | --- |
Latest ✔ | Latest ✔ | 10+ ✔ | Latest ✔ | 6.1+ ✔ | IE 11  ✔ |

## Quick start

🐛 Oruga is available for [Vue.js](https://vuejs.org/) **version 2.6+** or **version 3.x** 

### Setup Oruga

#### Vue 2

Install Oruga

```bash
npm install @oruga-ui/oruga
```

Then import the full bundle

```js
import Vue from 'vue';
import Oruga from '@oruga-ui/oruga';
import '@oruga-ui/oruga/dist/oruga.css';

Vue.use(Oruga);
```
or individual components (tree shaking)

```js
import Vue from 'vue';
import { Field, Input } from '@oruga-ui/oruga';
import '@oruga-ui/oruga/dist/oruga.css';

Vue.use(Field);
Vue.use(Input);
```

#### Vue 3

Install Oruga

```bash
npm install @oruga-ui/oruga-next
```

Then import the full bundle

```js
import { createApp } from 'vue'
import Oruga from '@oruga-ui/oruga-next';
import '@oruga-ui/oruga-next/dist/oruga.css';

createApp(...).use(Oruga);
```
or individual components (tree shaking)

```js
import Vue from 'vue'
import { Field, Input } from '@oruga-ui/oruga'
import '@oruga-ui/oruga/dist/oruga.css'

createApp(...)
  .use(Field)
  .use(Input)
```

### Customization

Please [read carefully the "customization" section](https://oruga.io/documentation/#customization) in Oruga documentation.

If you want to see an example with a fully customized registration form using `Tailwind`, `Bulma`, `Bootstrap` or `Material` CSS framework have a look at the official [Oruga multiframework example](https://oruga-multiframework-demo.netlify.app/tailwind)(source code available [here](https://github.com/oruga-ui/demo-multiframework)) or if you're more familiar with TailwindCSS 2 give our official [TailwindCSS Demo](https://oruga-tailwindcss-demo.netlify.app/) a try (source code [here](https://github.com/oruga-ui/demo-tailwindcss))

### Using Oruga with Nuxt

Oruga provides a [Nuxt.js](https://nuxtjs.org) module to easily integrate the library in your Nuxt.js app.

Add `@oruga-ui/oruga/nuxt` to `modules` section of your `nuxt.config.js` file.

```js
module.exports = {
  modules: ['@oruga-ui/oruga/nuxt']
}
```

You can also extend and/or override classes in this section (see how to [add new classes](#adding-new-classes) or [override existing classes](#overriding-classes) in Oruga)

```js
module.exports = {
  modules: [
    [
      '@oruga-ui/oruga/nuxt',
      {
        button: {
          override: true
        }
      }
    ]
  ]
}
```

Alternatively you can use Nuxt.js plugins system adding a file (e.g. `oruga.js`) in your `plugins` folder containing

```js
import Vue from 'vue'
import Oruga from '@oruga-ui/oruga'
import '@oruga-ui/oruga/dist/oruga.css'

Vue.use(Oruga)
```

To make this plugin available in your app, add this file to the `plugins` array in your `nuxt.config.js`

```js
plugins: [{ src: '~plugins/oruga.js' }]
```

To understand how the plugins work with Nuxt.js, take a look at the [NuxtJS plugin documentation](https://nuxtjs.org/guides/configuration-glossary/configuration-plugins).

Take a look at the [official NuxtJS + Oruga example](https://github.com/oruga-ui/demo-nuxtjs).

## Contributing

Please see the [contributing guidelines](./.github/CONTRIBUTING.md).

## Versioning

Oruga uses [Semantic Versioning 2.0.0](https://semver.org/spec/v2.0.0.html) for package versions.

While it's still in beta, versions will follow this pattern: **v0.Y.Z**, where:

* **Y**: Major (breaking changes)
* **Z**: Minor or patch

## Roadmap

* [v1](https://github.com/oruga-ui/oruga/projects/1)

## Core Team

<table>
  <tr>
    <td align="center"><a href="https://twitter.com/walter_tommasi"><img src="https://avatars0.githubusercontent.com/u/8029488?v=4" width="80px;" alt=""/><br /><sub><b>Walter Tommasi</b></sub></a><br /></td>
    <td align="center"><a href="https://twitter.com/4stagi"><img src="https://avatars0.githubusercontent.com/u/537363?v=4" width="80px;" alt=""/><br /><sub><b>Andrea Stagi</b></sub></a><br /></td>
  </tr>
</table>

## Contributors
Thank you to everyone involved for improving this project, day by day 💚

<a href="https://github.com/oruga-ui/oruga">
  <img
  src="https://contrib.rocks/image?repo=oruga-ui/oruga"
  />
</a>

## Credits

Oruga logo designed by [Matteo Guadagnini](mailto:matteoguadagnini67@gmail.com)

Oruga svg images for Checkbox and Radio components and Holidays assets created by [Fabrizio Masini](https://github.com/Nemesis19)

## License <a href="https://github.com/oruga-ui/oruga/blob/master/LICENSE"><img src="https://img.shields.io/npm/l/@oruga-ui/oruga.svg?logo=github" /></a>

Code released under [MIT](https://github.com/oruga-ui/oruga/blob/master/LICENSE) license.
