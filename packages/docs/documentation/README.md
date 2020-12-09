Oruga is a lightweight library of UI components for [Vue.js](https://vuejs.org/) without CSS framework dependency.

## Installation

To install Oruga you need [Vue.js](https://vuejs.org/) **version 2.6+** or **version 3.x**.

### Using Vue 2

#### Npm

```bash
npm install @oruga-ui/oruga --save
```

#### Yarn

```bash
yarn add @oruga-ui/oruga
```

#### CDN

```html
<link rel="stylesheet" href="//unpkg.com/oruga/dist/oruga.css" />
<script src="//unpkg.com/oruga/dist/oruga.js"></script>
```

### Using Vue 3

#### Npm

```bash
npm install @oruga-ui/oruga-next --save
```

#### Yarn

```bash
yarn add @oruga-ui/oruga-next
```

#### CDN

```html
<link rel="stylesheet" href="//unpkg.com/oruga-next/dist/oruga.css" />
<script src="//unpkg.com/oruga-next/dist/oruga.js"></script>
```

## Usage

### With Vue 2

#### Full bundle

```js
import Vue from 'vue'
import Oruga from '@oruga-ui/oruga'
import '@oruga-ui/oruga/dist/oruga.css'

Vue.use(Oruga)
```

#### Individual components (tree shaking)

```js
import Vue from 'vue'
import { Autocomplete, Sidebar } from '@oruga-ui/oruga'
import '@oruga-ui/oruga/dist/oruga.css'

Vue.use(Autocomplete)
Vue.use(Sidebar)
```

### With Vue 3

#### Full bundle

```js
import { createApp } from 'vue'
import Oruga from '@oruga-ui/oruga-next'
import '@oruga-ui/oruga-next/dist/oruga.css'

createApp(...).use(Oruga);
```

#### Individual components (tree shaking)

```js
import { createApp } from 'vue'
import { Autocomplete, Sidebar } from '@oruga-ui/oruga-next'
import '@oruga-ui/oruga-next/dist/oruga.css'

createApp(...)
  .use(Autocomplete)
  .use(Sidebar)
```

### With Nuxt

Oruga provides a [Nuxt.js](https://nuxtjs.org) module to easily use the library in your Nuxt.js app.

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

To understand how the plugins work with Nuxt.js, take a look at the [NuxtJS plugin documentation](https://nuxtjs.org/guides/configuration-glossary/configuration-plugins).

Take a look at the [official NuxtJS + Oruga example](https://github.com/oruga-ui/demo-nuxtjs).

## Customization

Oruga allows you to customize components in 4 different ways:

- using CSS variables
- using SASS/SCSS variables
- adding new classes
- overriding existing classes

You can mix them, for example adding new classes and using css variables!

### Using variables

Take a look at the [Base Style section](documentation/#base-style) to know all the global variables available. You should be able to create a custom theme setting your values (global and components) and/or remove a few css class attributes and enable css var. As you can see in the [Autocomplete component style section](components/Autocomplete.html#style) you have the complete list of all the css variables you can redefine for a component (the default value is the relative SASS/SCSS variable) that you can redefine in your project, for example:

### CSS Variables

To use css variables you have to import `oruga-vars.css` stylesheet

```js
import '@oruga-ui/oruga/dist/oruga-vars.css'
```

and then redefine the variables you want to change

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

To use SASS/SCSS variables

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

### Adding new classes

This way allows to append one or more classes to already existing classes.
It's really easy and you can do it importing the library/component (global) and in this case all component instances are using the same custom classes, otherwise the library allows to add new classes on a single component instance (local).

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

In case you want to overwrite Oruga existing classes, you can act as above and set the field `override` to true.

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

If you use individual imports you can customize each compoment using `Config` plugin.

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

#### Overriding single classes

You can also specify the override beahviour for each class

```js
Vue.use(Config, {
    autocomplete: {
        rootClass: {
          class: 'myautocomplete-root',
          override: true
        },
        menuClass: 'myautocomplete-menu',
        itemClass: 'myautocomplete-item',
        ...
    }
})
```

#### Adding or overriding classes using a function

You can use a function to extend or override classes in a component. If a suffix is provided by the component it can be used inside the function. For example, `menuPositionClass` in Autocomplete provides a suffix to specify menu position (top, bottom), in this case you may define a function and append the suffix to the base class name

```js
Vue.use(Config, {
    autocomplete: {
        rootClass: 'myautocomplete-root',
        menuClass: 'myautocomplete-menu',
        menuPositionClass: {
            class: (suffix) => {
                return `myautocomplete-menu-${suffix}`
            }
        },
        itemClass: 'myautocomplete-item',
    }
})
```
#### Usage of _oruga-lite_ stylesheet

Before using the override mode you should evaluate to use _oruga-lite_ stylesheet to avoid to define structural rules in your css for Oruga components (display, position, z-index and other base attributes).

```js
import '@oruga-ui/oruga/dist/oruga-lite.css'
```

For example here's how to style a dropdown using override mode without _oruga-lite_ stylesheet using [TailwindCSS](https://tailwindcss.com/)

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

And here's how to style a dropdown using _oruga-lite_ stylesheet

```css
.dropdown {}
.dropdown-menu {
  min-width: 12em;
  @apply bg-white m-0 px-2 shadow-lg rounded-sm z-10;
}
.dropdown-item {
  @apply no-underline px-1 py-2 cursor-pointer;
}
```

Take a look at the [official TailwindCSS + Oruga example](https://github.com/oruga-ui/demo-tailwindcss).

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

| CSS Variable                          | SASS Variable                | Default                                                                                                                                                                                                          |
| ------------------------------------- | -----------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CSS Variable                          | \$base-border-radius         | 4px                                                                                                                                                                                                              |
| CSS Variable                          | \$base-font-size             | 1rem                                                                                                                                                                                                             |
| CSS Variable                          | \$base-rounded-border-radius | 9999px                                                                                                                                                                                                           |
| CSS Variable                          | \$base-line-height           | 1.5                                                                                                                                                                                                              |
| CSS Variable                          | \$base-disabled-opacity      | 0.5                                                                                                                                                                                                              |
| CSS Variable                          | \$speed                      | 300ms                                                                                                                                                                                                            |
| CSS Variable                          | \$speed-slow                 | 150ms                                                                                                                                                                                                            |
| CSS Variable                          | \$speed-slower               | 250ms                                                                                                                                                                                                            |
| CSS Variable                          | \$easing                     | ease-out                                                                                                                                                                                                         |
| CSS Variable                          | \$control-border-width       | 1px                                                                                                                                                                                                              |
| CSS Variable                          | \$control-height             | 2.25em                                                                                                                                                                                                           |
| CSS Variable                          | \$white                      | #ffffff                                                                                                                                                                                                          |
| CSS Variable                          | \$black                      | #000000                                                                                                                                                                                                          |
| CSS Variable                          | \$grey                       | #7a7a7a                                                                                                                                                                                                          |
| CSS Variable                          | \$grey-light                 | #b5b5b5                                                                                                                                                                                                          |
| CSS Variable                          | \$grey-lighter               | #dbdbdb                                                                                                                                                                                                          |
| CSS Variable                          | \$primary                    | #445e00                                                                                                                                                                                                          |
| CSS Variable                          | \$primary-invert             | \$white                                                                                                                                                                                                          |
| CSS Variable                          | \$danger                     | #b60000                                                                                                                                                                                                          |
| CSS Variable                          | \$danger-invert              | \$white                                                                                                                                                                                                          |
| CSS Variable                          | \$warning                    | #f4c300                                                                                                                                                                                                          |
| CSS Variable                          | \$warning-invert             | \$black                                                                                                                                                                                                          |
| CSS Variable                          | \$success                    | #006724                                                                                                                                                                                                          |
| CSS Variable                          | \$success-invert             | \$white                                                                                                                                                                                                          |
| CSS Variable                          | \$info                       | #005C98                                                                                                                                                                                                          |
| CSS Variable                          | \$info-invert                | \$white                                                                                                                                                                                                          |
| CSS Variable                          | \$whitelist                  | ()                                                                                                                                                                                                               |
| CSS Variable                          | \$sass-vars                  | true                                                                                                                                                                                                             |
| CSS Variable                          | \$css-vars                   | true                                                                                                                                                                                                             |
| CSS Variable                          | \$variable-prefix            | '--oruga-'                                                                                                                                                                                                       |
| CSS Variable                          | \$sizes                      | (<br>"small": .75rem,<br>"medium": 1.25rem,<br>"large": 1.5rem<br>)                                                                                                                                              |
| CSS Variable                          | \$colors                     | (<br>"primary": ($primary, $primary-invert),<br>"danger": ($danger, $danger-invert),<br>"warning": ($warning, $warning-invert),<br>"success": ($success, $success-invert),<br>"info": ($info, $info-invert)<br>) |
