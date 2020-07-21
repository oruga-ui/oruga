---
sidebar: auto
---

# Guide

Oruga is a lightweight library of UI components for [Vue.js](https://vuejs.org/) without CSS framework dependency

## Quick start

You need [Vue.js](https://vuejs.org/) **version 2.6+**.

## Installation

### Npm

```bash
npm install @oruga-ui/oruga --save
```

### Yarn

```bash
yarn add @oruga-ui/oruga
```

### CDN

```html
<link rel="stylesheet" href="//unpkg.com/oruga/dist/oruga.css" />
<script src="//unpkg.com/oruga/dist/oruga.js"></script>
```

## Usage

### Full bundle

```js
import Vue from 'vue';
import Oruga from '@oruga-ui/oruga';
import '@oruga-ui/oruga/dist/oruga.css';

Vue.use(Oruga);
```

### Individual components (tree shaking)

```js
import Vue from 'vue';
import { Autocomplete, Sidebar } from '@oruga-ui/oruga';
import '@oruga-ui/oruga/dist/oruga.css';

Vue.use(Autocomplete);
Vue.use(Sidebar);
```

### Nuxt

Oruga provides a Nuxt.js module for easily importing the library into your Nuxt.js app.

Add @oruga-ui/oruga/nuxt to modules section of your nuxt.config.js file.

```js
module.exports = {
  modules: ['@oruga-ui/oruga/nuxt']
}
```

But it can be manually done by adding a plugin let's say `oruga.js` in your `plugin` folder

```js
import Vue from 'vue';
import Oruga from '@oruga-ui/oruga';
import '@oruga-ui/oruga/dist/oruga.css';

Vue.use(Oruga);
```

And then in your nuxt.config.js edit the plugin array with:

```js
plugins: [{ src: '~plugins/oruga.js', ssr: false }];
```

## Customization

Oruga allows to customize a component in 4 different ways:

* using CSS variables
* using SASS/SCSS variables
* adding new classes
* overriding all classes

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
    "primary": ($primary, $primary-invert),
    "info": ($info, $info-invert),
    "success": ($success, $success-invert),
    "warning": ($warning, $warning-invert),
    "danger": ($danger, $danger-invert)
);

@import "~@oruga-ui/oruga/src/scss/oruga";
```

Take a look at [components page](/components/#base-style) to know all global variables; you should be able to create a custom theme setting your values (global and components) or/and remove a few css class attributes and enable css var.

### Adding new classes

This way allows to append a one or more classes to already existsing classes.
It is really easy and you can do it importing the library/component (global) and in this case all component intances are using the same custom classes, otherwise the library allows to add new classes on a single component instance (local).

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
<o-autocomplete
    root-class="myautocomplete-root"
    menu-class="myautocomplete-menu"
    item-class="myautocomplete-item" />
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
Before to use override mode you should evaluate to use *oruge-lite* stylesheet in order to avoid to define the css structure of Oruga components (display, position, z-index and other base attributes).
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
.dropdown { }
.dropdown-menu {
    min-width: 12em;
    @apply bg-white m-0 px-2 shadow-lg rounded-sm z-10;
}
.dropdown-item {
    @apply no-underline px-1 py-2 cursor-pointer;
}
```

