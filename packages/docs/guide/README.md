---
sidebar: auto
---

# Guide

## Installation

### Npm

```bash
npm install @oruga-uioruga --save
```

### Yarn

```bash
yarn add @oruga-uioruga
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
import Oruga from '@oruga-uioruga';
import '@oruga-uioruga/dist/oruga.css';

Vue.use(Oruga);
```

### Individual components

```js
import Vue from 'vue';
import { Autocomplete, Sidebar } from '@oruga-uioruga';
import '@oruga-uioruga/dist/oruga.css';

Vue.use(Autocomplete);
Vue.use(Sidebar);
```

### Nuxt

Work in progress [nuxt-oruga](https://github.com/oruga-ui/nuxt-oruga)

But it can be manually done by adding a plugin let's say `oruga.js` in your `plugin` folder

```js
import Vue from 'vue';
import Oruga from '@oruga-uioruga';
import '@oruga-uioruga/dist/oruga.css';

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

In order to use css variables you have to import `@oruga-uioruga/dist/oruga-vars.css`

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

...

@import "~@oruga-uioruga/src/scss/oruga";
```

### Adding new classes

Adding new classes is really easy and you can do it importing the library/component (global); in this case all component intances are using the same custom classes.
Otherwise the library allows to add new classes on a single component instance (local).

#### Global

```js
import Vue from 'vue';
import Oruga from '@oruga-uioruga';
import '@oruga-uioruga/dist/oruga.css';

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
For a complete customization you can import `@oruga-uioruga/dist/oruga-lite.css`. It's a light stylesheet thant doesn't provide all attributes that you would customize by CSS or SASS/SCSS variables.
:::

### Overriding classes

In case you want to overwrite Oruga style completely, the way is the same of above but you have to specify the field `override`.

```js
import Vue from 'vue';
import Oruga from '@oruga-uioruga';

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
import { Autocomplete, Sidebar, Config } from '@oruga-uioruga';

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

