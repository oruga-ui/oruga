<p align="center">
    <a href="https://oruga-ui.com">
        <img width="240" src="https://github.com/oruga-ui/oruga/raw/master/packages/docs/public/logo.png" />
    </a>
</p>

<p align="center">
    <a href="https://www.npmjs.com/package/@oruga-ui/oruga-next"><img src="https://img.shields.io/npm/v/@oruga-ui/oruga-next.svg?logo=npm" /></a>
    <a href="https://www.npmjs.com/package/@oruga-ui/oruga-next"><img src="https://img.shields.io/npm/dt/@oruga-ui/oruga-next.svg" /></a>
    <a href="https://github.com/oruga-ui/oruga/actions"><img src="https://github.com/oruga-ui/oruga/actions/workflows/build.yml/badge.svg" /><a>
    <a href="https://discord.gg/RuKuBYN"><img src="https://img.shields.io/badge/chat-on%20discord-7289DA.svg?logo=discord" /></a>
    <a href="https://ko-fi.com/mlmoravek"><img src="https://img.shields.io/badge/ko--fi-donate-%23FF5E5B?style=flat&logo=ko-fi&logoColor=white" /></a>
</p>

<p align="center">
  <i>Oruga UI is like a caterpillar, minimal and yet functional. It's in your hands turning it into a butterfly</i>
</p>

<p align="center">
(🐛) => 🦋
</p>


## Features

Oruga is a lightweight UI components library for [Vue.js](https://vuejs.org/) without any dependency.
It offers a set of easily customisable components and doesn't depend on any specific style or CSS framework (like Bootstrap, Bulma, TailwindCSS, etc...). Therefore, it doesn't provide a grid system or CSS utilities, but you can integrate any CSS framework you like.
Oruga provides you with a set of functional components, so you can focus only on the UI/UX aspects of your application and can be entirely flexible for future changes without having to touch a line of JavaScript.

* **CSS framework agnostic**: No dependency on a specific CSS framework/library but you can easily integrate the components with one of them because they are fully customizable in different ways
* **Components with steroids**: most of the components aren't a simple wrapper of native elements but they add new and custom features
* **Lightweight**: no other internal dependency and import only components that you need

If you need a component library and want to easily apply your custom styles, Oruga is the library for you! 🐛

In addition, if you don't want to style everything yourself, we've created several [themes](https://oruga-ui.com/documentation/themes.html) to provide you with a variety of ready-to-use styles. 🦋

## Documentation

Browse [online documentation here](https://oruga-ui.com/documentation/).

💅 For more info about components customization, read carefully the ["customization" section](https://oruga-ui.com/documentation/customisation.html) in the documentation.

🕹 To see Oruga in action, go to the ["example" section](https://oruga-ui.com/documentation/#examples) in the documentation.

> Note: the source code of the documentation examples can be found in the `examples` directories for each component, it serves as the demo as well.

## Quick start

🐛 Oruga is available for [Vue.js](https://vuejs.org/) **version 3.x** 

### Setup Oruga

1. Install Oruga.

```bash
npm install @oruga-ui/oruga-next
```

2. Import the components:

- To get started quickly, use `Oruga` to register all components:

    ```js
    import { createApp } from 'vue'
    import Oruga from '@oruga-ui/oruga-next';
    
    createApp(...).use(Oruga);
    ```

 - To use tree shaking, either register component manually:

    ```js
    import { createApp } from 'vue'
    import { OField, OInput } from '@oruga-ui/oruga'
    
    createApp(...)
      .use(OField)
      .use(OInput)
    ```
    
 - or [import them in your SFC](https://vuejs.org/guide/components/registration.html#local-registration).

### Customization

Oruga's superpower is its configurability and its CSS framework agnostic approach.
Each component can be individually customised and configured by defining specific classes using a class-mapping approach. Therefore, Oruga comes without any styling by default. However, there are several official predefined configurations called themes, which you can include and extend to give your application a individual look and feel. And all components came with predefined classes by default.

Please read the ["customization" section](https://oruga-ui.com/documentation/customisation.html) in Oruga documentation.

If you want to see an example with a fully customized registration form using `Tailwind`, `Bulma`, `Bootstrap`, `Material` or any other CSS framework have a look at the official [Oruga multiframework example](https://oruga-multiframework-demo.netlify.app/tailwind) (source code available [here](https://github.com/oruga-ui/demo-multiframework)) or if you're more familiar with TailwindCSS 2 give our official [TailwindCSS Demo](https://oruga-tailwindcss-demo.netlify.app/) a try (source code [here](https://github.com/oruga-ui/demo-tailwindcss))

### Using Oruga with Nuxt

Oruga doesn't provide a [Nuxt.js](https://nuxtjs.org) module at the moment.

You can use Nuxt.js plugins system adding a file (e.g. `oruga.js`) in your `plugins` folder containing:

```js
import Oruga from '@oruga-ui/oruga-next';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Oruga);
});
```

To make this plugin available in your app, add this file to the `plugins` array in your `nuxt.config.js`

```js
plugins: [{ src: '~plugins/oruga.js' }]
```

To understand how the plugins work with Nuxt.js, take a look at the [NuxtJS plugin documentation](https://nuxtjs.org/guides/configuration-glossary/configuration-plugins).

Take a look at the [official NuxtJS + Oruga example](https://github.com/oruga-ui/demo-nuxtjs).

## Contributing

Please see the [contributing guidelines](./.github/CONTRIBUTING.md).


### Contact us 👾

→ Join the [Oruga Discord server](https://discord.gg/RuKuBYN).


## Versioning

Oruga uses [Semantic Versioning 2.0.0](https://semver.org/spec/v2.0.0.html) for package versions.

While it's still in beta, versions will follow this pattern: **v0.Y.Z**, where:

* **Y**: Major (breaking changes)
* **Z**: Minor or patch

## Core Team

<table>
  <tr>
    <td align="center"><a href="https://twitter.com/walter_tommasi"><img src="https://avatars0.githubusercontent.com/u/8029488?v=4" width="80px;" alt=""/><br /><sub><b>Walter Tommasi</b></sub></a><br /></td>
    <td align="center"><a href="https://twitter.com/4stagi"><img src="https://avatars0.githubusercontent.com/u/537363?v=4" width="80px;" alt=""/><br /><sub><b>Andrea Stagi</b></sub></a><br /></td>
    <td align="center"><a href="https://github.com/mlmoravek"><img src="https://avatars0.githubusercontent.com/u/25961416?v=4" width="80px;" alt=""/><br /><sub><b>Marcel Moravek</b></sub></a><br /></td>
  </tr>
</table>

## Contributors
Thank you to everyone involved for improving this project, day by day 💚

<a href="https://github.com/oruga-ui/oruga">
  <img src="https://contrib.rocks/image?repo=oruga-ui/oruga"/>
</a>

[Complete list](CONTRIBUTORS.md).

## Credits

Oruga logo designed by [Matteo Guadagnini](mailto:matteoguadagnini67@gmail.com)

Oruga svg images for Checkbox and Radio components and Holidays assets created by [Fabrizio Masini](https://github.com/Nemesis19)

## License <a href="https://github.com/oruga-ui/oruga/blob/master/LICENSE"><img src="https://img.shields.io/npm/l/@oruga-ui/oruga.svg?logo=github" /></a>

Code released under [MIT](https://github.com/oruga-ui/oruga/blob/master/LICENSE) license.
