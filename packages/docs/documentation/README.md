# Introduction

Oruga is a lightweight library of UI components for [Vue.js](https://vuejs.org/) without CSS framework dependency

## Quick start

You need [Vue.js](https://vuejs.org/) **version 2.6+** or **version 3.x**.

## Installation

### Vue 2

### Npm

```bash
npm install @oruga-ui/oruga --save
```

### Yarn

```bash
yarn add @oruga-ui/oruga
```

### Vue 3

### Npm

```bash
npm install @oruga-ui/oruga-next --save
```

### Yarn

```bash
yarn add @oruga-ui/oruga-next
```

### Vue 2

### CDN

```html
<link rel="stylesheet" href="//unpkg.com/oruga/dist/oruga.css" />
<script src="//unpkg.com/oruga/dist/oruga.js"></script>
```

### Vue 3

### CDN

```html
<link rel="stylesheet" href="//unpkg.com/oruga-next/dist/oruga.css" />
<script src="//unpkg.com/oruga-next/dist/oruga.js"></script>
```

## Usage

### Vue 2

### Full bundle

```js
import Vue from 'vue'
import Oruga from '@oruga-ui/oruga'
import '@oruga-ui/oruga/dist/oruga.css'

Vue.use(Oruga)
```

### Individual components (tree shaking)

```js
import Vue from 'vue'
import { Autocomplete, Sidebar } from '@oruga-ui/oruga'
import '@oruga-ui/oruga/dist/oruga.css'

Vue.use(Autocomplete)
Vue.use(Sidebar)
```

### Vue 3

### Full bundle

```js
import { createApp } from 'vue'
import Oruga from '@oruga-ui/oruga-next'
import '@oruga-ui/oruga-next/dist/oruga.css'

createApp(...).use(Oruga);
```

### Individual components (tree shaking)

```js
import { createApp } from 'vue'
import { Autocomplete, Sidebar } from '@oruga-ui/oruga-next'
import '@oruga-ui/oruga-next/dist/oruga.css'

createApp(...)
  .use(Autocomplete)
  .use(Sidebar)
```

### Nuxt

Oruga provides a [Nuxt.js](https://nuxtjs.org) module for easily importing the library into your Nuxt.js app.

Add `@oruga-ui/oruga/nuxt` to `modules` section of your `nuxt.config.js` file.

```js
module.exports = {
  modules: ['@oruga-ui/oruga/nuxt']
}
```

You can also customize components in this section

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

Alternatively you can add a plugin file (let's say `oruga.js`) in your `plugins` folder containing

```js
import Vue from 'vue'
import Oruga from '@oruga-ui/oruga'
import '@oruga-ui/oruga/dist/oruga.css'

Vue.use(Oruga)
```

And then add this file to the `plugins` array in your `nuxt.config.js`

```js
plugins: [{ src: '~plugins/oruga.js' }]
```

To understand how the plugins work with Nuxt.js, take a look at the [plugin documentation](https://nuxtjs.org/guides/configuration-glossary/configuration-plugins).

## Customization

Oruga allows to customize a component in 4 different ways:

- using CSS variables
- using SASS/SCSS variables
- adding new classes
- overriding all classes

but you can mix them, for example adding new classes and using css variables!

### CSS Variables

In order to use css variables you have to import `@oruga-ui/oruga/dist/oruga-vars.css`

Each component is well documented with all css variables (the default value is the relative SASS/SCSS variable) that you have to add in your project, for example:

```css
:root {
  --oruga-color-primary: green;
  --oruga-color-danger: red;
}
```

### SASS/SCSS Variables

::: warning
You might also have to install `node-sass` or `sass` and `sass-loader` depending on your environment.
:::

```scss
$colors: (
  'primary': (
    $primary,
    $primary-invert
  ),
  'info': (
    $info,
    $info-invert
  ),
  'success': (
    $success,
    $success-invert
  ),
  'warning': (
    $warning,
    $warning-invert
  ),
  'danger': (
    $danger,
    $danger-invert
  )
);

@import '~@oruga-ui/oruga/src/scss/oruga';
```

Take a look at [components page](/components/#base-style) to know all global variables; you should be able to create a custom theme setting your values (global and components) or/and remove a few css class attributes and enable css var.

### Adding new classes

This way allows to append one or more classes to already existing classes.
It is really easy and you can do it importing the library/component (global) and in this case all component instances are using the same custom classes, otherwise the library allows to add new classes on a single component instance (local).

#### Global

```js
import Vue from 'vue';
import Oruga from '@oruga-ui/oruga';
import '@oruga-ui/oruga/dist/oruga.css';

Vue.use(Oruga, {
    autocomplete: {
        rootClass: 'myautocomplete-root',
        menuClass: 'myautocomplete-menu',
        itemClass: 'myautocomplete-item',
        ...
    }
});
```

#### Local

```vue
<o-autocomplete root-class="myautocomplete-root" menu-class="myautocomplete-menu" item-class="myautocomplete-item" />
```

::: tip
For a complete customization you can import `@oruga-ui/oruga/dist/oruga-lite.css`. It's a light stylesheet that doesn't provide all attributes that you would customize by CSS or SASS/SCSS variables.
:::

### Overriding classes

In case you want to overwrite Oruga style completely, the way is the same of above but you have to specify the field `override`.

```js
import Vue from 'vue';
import Oruga from '@oruga-ui/oruga';

Vue.use(Oruga, {
    autocomplete: {
        override: true,
        rootClass: 'myautocomplete-root',
        menuClass: 'myautocomplete-menu',
        itemClass: 'myautocomplete-item',
        ...
    }
});
```

Using individual imports you can customize components by `Config` plugin.

```js
import Vue from 'vue';
import { Autocomplete, Sidebar, Config } from '@oruga-ui/oruga';

Vue.use(Autocomplete);
Vue.use(Sidebar);
Vue.use(Config, {
    autocomplete: {
        override: true,
        rootClass: 'myautocomplete-root',
        menuClass: 'myautocomplete-menu',
        itemClass: 'myautocomplete-item',
        ...
    }
})
```

:::tip
Before to use override mode you should evaluate to use _oruge-lite_ stylesheet in order to avoid to define the css structure of Oruga components (display, position, z-index and other base attributes).
:::

For example:

**Override mode**

```css
.dropdown {
  @apply inline-flex relative;
}
.dropdown-menu {
  top: 100%;
  min-width: 12em;
  @apply absolute bg-white left-0 m-0 px-2 shadow-lg rounded-sm z-10;
}
.dropdown-item {
  @apply relative block no-underline px-1 py-2 cursor-pointer;
}
```

**Oruga lite mode**

```css
.dropdown {
}
.dropdown-menu {
  min-width: 12em;
  @apply bg-white m-0 px-2 shadow-lg rounded-sm z-10;
}
.dropdown-item {
  @apply no-underline px-1 py-2 cursor-pointer;
}
```

## Config

Oruga allows to customize each components using config constructor or programmatically using `this.$oruga.config`.

```js
{
    globalfield: string|boolean|number|function|....,
    componentname: {
        override: boolean,
        customfieldX: string|boolean|number|function|....
    }
}

```

For example:

```js
{
    button: {
        override: true,
        rootClass: 'btn',
        roundedClass: 'btn-rounded',
        ...
    }
}

```

### Global

| Field              | Description                                                   | Default |
| ------------------ | ------------------------------------------------------------- | ------- |
| statusIcon         | Show status icon using field and variant prop                 | true    |
| useHtml5Validation | Default form components use-html5-validation attribute        | true    |
| iconPack           | Icon pack used internally and on the Icon component attribute | 'mdi'   |

Take a look at each component docs to know all customizable fields/props by config.

## Base Style

| SASS Variable                | Default                                                                                                                                                                                                          |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| \$base-border-radius         | 4px                                                                                                                                                                                                              |
| \$base-font-size             | 1rem                                                                                                                                                                                                             |
| \$base-rounded-border-radius | 9999px                                                                                                                                                                                                           |
| \$base-line-height           | 1.5                                                                                                                                                                                                              |
| \$base-disabled-opacity      | 0.5                                                                                                                                                                                                              |
| \$speed                      | 300ms                                                                                                                                                                                                            |
| \$speed-slow                 | 150ms                                                                                                                                                                                                            |
| \$speed-slower               | 250ms                                                                                                                                                                                                            |
| \$easing                     | ease-out                                                                                                                                                                                                         |
| \$control-border-width       | 1px                                                                                                                                                                                                              |
| \$control-height             | 2.25em                                                                                                                                                                                                           |
| \$white                      | #ffffff                                                                                                                                                                                                          |
| \$black                      | #000000                                                                                                                                                                                                          |
| \$grey                       | #7a7a7a                                                                                                                                                                                                          |
| \$grey-light                 | #b5b5b5                                                                                                                                                                                                          |
| \$grey-lighter               | #dbdbdb                                                                                                                                                                                                          |
| \$primary                    | #445e00                                                                                                                                                                                                          |
| \$primary-invert             | \$white                                                                                                                                                                                                          |
| \$danger                     | #b60000                                                                                                                                                                                                          |
| \$danger-invert              | \$white                                                                                                                                                                                                          |
| \$warning                    | #f4c300                                                                                                                                                                                                          |
| \$warning-invert             | \$black                                                                                                                                                                                                          |
| \$success                    | #006724                                                                                                                                                                                                          |
| \$success-invert             | \$white                                                                                                                                                                                                          |
| \$info                       | #005C98                                                                                                                                                                                                          |
| \$info-invert                | \$white                                                                                                                                                                                                          |
| \$whitelist                  | ()                                                                                                                                                                                                               |
| \$sass-vars:                 | true                                                                                                                                                                                                             |
| \$css-vars:                  | true                                                                                                                                                                                                             |
| \$variable-prefix:           | '--oruga-'                                                                                                                                                                                                       |
| \$sizes:                     | (<br>"small": .75rem,<br>"medium": 1.25rem,<br>"large": 1.5rem<br>)                                                                                                                                              |
| \$colors:                    | (<br>"primary": ($primary, $primary-invert),<br>"danger": ($danger, $danger-invert),<br>"warning": ($warning, $warning-invert),<br>"success": ($success, $success-invert),<br>"info": ($info, $info-invert)<br>) |
