<p align="center">
    <a href="https://oruga.io">
        <img height="128px" src="https://github.com/oruga-ui/oruga/raw/master/packages/docs/.vuepress/public/logo.png" />
    </a>
    <a href="https://www.npmjs.com/package/oruga"><img src="https://img.shields.io/npm/v/oruga.svg" /></a>
    <a href="https://www.npmjs.com/package/oruga"><img src="https://img.shields.io/npm/dt/oruga.svg" /></a>
    <a href="https://github.com/oruga-ui/oruga/blob/master/LICENSE"><img src="https://img.shields.io/npm/l/oruga.svg" /></a>
</p>

> Oruga is a lightweight library of UI components for [Vue.js](https://vuejs.org/)

## Features

* Highly customizable components: all components are fully customizable in different ways
* Components with steroids: most of the components aren't a simple wrapper of native elements but they add new and custom features
* Lightweight: no other internal dependency

## Documentation

The documentation is in the docs directory, it serves as the demo as well.

Browse [online documentation here](https://oruga.io/).

## Quick start

You need [Vue.js](https://vuejs.org/) **version 2.5+**.

### 1 Install via npm

```bash
npm install @oruga/oruga
```

### 2 Import and use Oruga

Bundle
```javascript
import Vue from 'vue';
import Oruga from 'oruga';
import '@oruga/oruga/dist/oruga.css';

Vue.use(Oruga);

```
or Individual Components
```javascript

import Vue from 'vue'
import { Field, Input } from 'oruga'
import '@oruga/oruga/dist/oruga.css'

Vue.use(Field)
Vue.use(Input)

```

### 3 Customization

Browse [customization section on the documentation](https://oruga.io/quickstart).

## Browser support

Recent versions of Firefox, Chrome, Edge, Opera and Safari. IE11+ is only partially supported.

## Contributing

Please see the [contributing guidelines](./.github/CONTRIBUTING.md)

## Versioning

While it's still in beta, version will follow **v0.Y.Z**, where:

* **Y**: Major (breaking changes)
* **Z**: Minor or patch

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

## License

Code released under [MIT](https://github.com/oruga-ui/oruga/blob/master/LICENSE) license.