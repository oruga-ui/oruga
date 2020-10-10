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

<p align="center">
    <a href="https://www.npmjs.com/package/@oruga-ui/oruga"><img src="https://img.shields.io/npm/v/@oruga-ui/oruga.svg?logo=npm" /></a>
    <a href="https://www.npmjs.com/package/@oruga-ui/oruga"><img src="https://img.shields.io/npm/dt/@oruga-ui/oruga.svg" /></a>
    <a href="https://circleci.com/gh/oruga-ui/oruga"><img src="https://img.shields.io/circleci/project/github/oruga-ui/oruga.svg?style=flat-square" /><a>
    <a href="https://codecov.io/gh/oruga-ui/oruga"><img src="https://img.shields.io/codecov/c/github/oruga-ui/oruga.svg?style=flat-square" /></a>
    <a href="https://discord.gg/TP3FBY"><img src="https://img.shields.io/badge/chat-on%20discord-7289DA.svg?logo=discord" /></a>
</p>

> Oruga is a lightweight library of UI components for [Vue.js](https://vuejs.org/) without CSS framework dependency

## Features

* **CSS framework agnostic**: No dependency on a specific CSS framework/library but you can easily integrate the components with one of them because they are fully customizable in different ways
* **Components with steroids**: most of the components aren't a simple wrapper of native elements but they add new and custom features
* **Lightweight**: no other internal dependency and import only components that you need

## Documentation

The documentation is in the docs directory, it serves as the demo as well.

Browse [online documentation here](https://oruga.io/).

## Quick start

You need [Vue.js](https://vuejs.org/) **version 2.6+** or **version 3.x**.

### 1 Install via npm

#### Vue 2

```bash
npm install @oruga-ui/oruga
```

#### Vue 3

```bash
npm install @oruga-ui/oruga-next
```

### 2 Import and use Oruga

#### Vue 2

Bundle
```javascript
import Vue from 'vue';
import Oruga from '@oruga-ui/oruga';
import '@oruga-ui/oruga/dist/oruga.css';

Vue.use(Oruga);
```
or Individual Components (tree shaking)
```javascript

import Vue from 'vue';
import { Field, Input } from '@oruga-ui/oruga';
import '@oruga-ui/oruga/dist/oruga.css';

Vue.use(Field);
Vue.use(Input);
```

#### Vue 3

 Bundle
```javascript
import { createApp } from 'vue'
import Oruga from '@oruga-ui/oruga-next';
import '@oruga-ui/oruga-next/dist/oruga.css';

createApp(...).use(Oruga);
```
or Individual Components (tree shaking)
```javascript

import Vue from 'vue'
import { Field, Input } from '@oruga-ui/oruga'
import '@oruga-ui/oruga/dist/oruga.css'

createApp(...)
  .use(Field)
  .use(Input)
```

### 3 Customization

Browse [customization section on the documentation](https://oruga.io/documentation).

## Browser support

Recent versions of Firefox, Chrome, Edge, Opera, Safari and IE11.

## Contributing

Please see the [contributing guidelines](./.github/CONTRIBUTING.md)

## Versioning

While it's still in beta, version will follow **v0.Y.Z**, where:

* **Y**: Major (breaking changes)
* **Z**: Minor or patch

## Roadmap

* [v1](https://github.com/oruga-ui/oruga/projects/1)

## Core Team

<table>
  <tr>
    <td align="center"><a href="https://twitter.com/walter_tommasi"><img src="https://avatars0.githubusercontent.com/u/8029488?v=4" width="80px;" alt=""/><br /><sub><b>Walter Tommasi</b></sub></a><br /></td>
  </tr>
</table>

## Supporting through Patreon

Oruga is an open source MIT project if you are interested in supporting this project, please consider becoming a patron.
<p align="center">
  <a href="https://www.patreon.com/jtommy">
    <img src="https://c5.patreon.com/external/logo/become_a_patron_button.png" alt="Become a Patron" />
  </a>
</p>

## Credits

Oruga logo designed by [Matteo Guadagnini](mailto:matteoguadagnini67@gmail.com)

## License <a href="https://github.com/oruga-ui/oruga/blob/master/LICENSE"><img src="https://img.shields.io/npm/l/@oruga-ui/oruga.svg?logo=github" /></a>

Code released under [MIT](https://github.com/oruga-ui/oruga/blob/master/LICENSE) license.
