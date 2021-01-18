## Introduction

Oruga is a lightweight library of UI components for [Vue.js](https://vuejs.org/) without CSS framework dependency.
Using Oruga you will not be tied to any CSS library and therefore you can change your UI without having to rewrite Vue components or change library, but only modifying your stylesheets. We know that UI/UX is a fundamental part of any web application and Oruga wants you to focus only on that and be totally flexible to future changes without having to touch a line of Javascript. 

Most of the components aren't a simple wrapper of native elements but they add custom features. Oruga doesn't depend on any specific style or CSS framework (like Bootstrap, Bulma, TailwindCSS etc...) and it doesn't provide any grid system or CSS utility, it just offer a set of components easy to customize. If you need a component library and want to easily apply your custom style, Oruga is the library for you!

🐛 Oruga is available for [Vue.js](https://vuejs.org/) **version 2.6+** or **version 3.x** and has been tested in all major browsers

![Chrome](https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png) | ![Firefox](https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png) | ![IE](https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png) | ![Opera](https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png) | ![Safari](https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png) | ![Internet Explorer](https://upload.wikimedia.org/wikipedia/commons/a/aa/Internet_Explorer_logo_6.png)
--- | --- | --- | --- | --- | --- |
Latest ✔ | Latest ✔ | 10+ ✔ | Latest ✔ | 6.1+ ✔ | IE 11  ✔ |

💅 For more info about components customization, go to the ["Customization section"](#customization).

🕹 To see Oruga in action, go to the ["Examples section"](#examples).

## Installation

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
<link rel="stylesheet" href="//unpkg.com/oruga/dist/oruga.min.css" />
<script src="//unpkg.com/oruga/dist/oruga.min.js"></script>
```

You can use other stylesheets, as you can see in ["customization" section](#customization).

#### Build from "develop" branch

```html
<link rel="stylesheet" href="https://preview.oruga.io/cdn/oruga.min.css" />
<script src="https://preview.oruga.io/cdn/oruga.min.js"></script>
```

You can use other stylesheets, as you can see in ["customization" section](#customization).

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

You can use other stylesheets, as you can see in ["customization" section](#customization).

## Setup

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

## Nuxt module

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

## Customization

Oruga allows you to customize components in 3 different ways:

- [Adding new classes](#adding-classes)
- [Overriding existing classes](#overriding-classes)
- [Using CSS or SASS/SCSS variables](#using-css-or-sass-scss-variables)

You can mix them, for example adding new classes and using CSS variables!

Oruga provides 3 different stylesheets:

- `oruga.css`: a stylesheet containing the complete Oruga style.
- `oruga-lite.css`: a lightweight stylesheet containing only minimal CSS rules (position, , display, z-index ...). Include it if you want a complete customization. For more information [click here](#usage-of-oruga-lite-stylesheet).
- `oruga-vars.css`: a stylesheet containing variables you can redefine in your application. For more information [click here](#using-css-or-sass-scss-variables).

### Adding new classes or override existing ones

With Oruga you can easily override existing components style appending one or more classes.

::: tip
Remember that for a complete customization you can import `@oruga-ui/oruga/dist/oruga-lite.css`. It's a light stylesheet that doesn't provide all attributes that you would customize by CSS or SASS/SCSS variables. [Click here](#usage-of-oruga-lite-stylesheet) for more information.
:::

### Adding classes

You can add classes to a component using class properties (see [Autocomplete class props](/components/Autocomplete.html#class-props) for example)

```vue
<o-autocomplete root-class="myautocomplete-root" menu-class="myautocomplete-menu" item-class="myautocomplete-item" />
```

Or globally 

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

If you use individual imports you can customize each compoment using `Config` plugin.

```js
import Vue from 'vue';
import { Autocomplete, Sidebar, Config } from '@oruga-ui/oruga';

Vue.use(Autocomplete);
Vue.use(Sidebar);
Vue.use(Config, {
    autocomplete: {
        rootClass: 'myautocomplete-root',
        menuClass: 'myautocomplete-menu',
        itemClass: 'myautocomplete-item',
        ...
    }
})
```

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

For a better customization experience this function accepts the `context` of the component containing its `props` as second parameter. For example using [Bootstrap](https://getbootstrap.com/) you may want to apply variants to buttons only when the element is not outlined

```js
Vue.use(Config, {
    button: {
        variantClass: (variant, context) => {
            if (!context.props.outlined) {
                return `btn-${variant}`
            }
        }
    },
    ...
}
```

#### Deal with specificity

Oruga CSS comes with the lowest [specifity](https://www.w3schools.com/css/css_specificity.asp) possible, that's why you can easily override existing classes by defining new ones in the global configuration or using attributes. However there are some cases where specificty is higher than you expect, for example in the [Steps](/components/Steps.html) component the `nav item` contains a `marker` and a `divider` which colors change whether the nav item is active or not.

```scss
.o-steps {
    ...
    &__nav-item-active {
        .o-steps__link {
            cursor: default;
        }

        .o-steps__marker {
            @include avariable('background-color', 'steps-maker-default-color', $steps-maker-default-color);
            @include avariable('border-color', 'steps-active-color', $steps-active-color);
            @include avariable('color', 'steps-active-color', $steps-active-color);
        }

        .o-steps__divider {
            background-position: left bottom;
        }
    }

    &__nav-item-previous {
        .o-steps__marker {
            @include avariable('color', 'steps-maker-default-color', $steps-maker-default-color);
            @include avariable('background-color', 'steps-previous-color', $steps-previous-color);
        }

        .o-steps__divider {
            background-position: left bottom;
        }
    }
    ...
}
```

If you want to change the color you can use `!important` or change variables values. Otherwise you can easily increase the specificity in your stylesheet

```css
.steps-nav-item-active .step-marker {
  color: blue;
  border-color: blue;
}

.steps-nav-item-active .step-divider {
  background-color: blue;
}

.steps-nav-item-previous .step-marker {
  background-color: blue;
}

.steps-nav-item-previous .step-divider {
  background-color: blue;
}
```

and then configure Oruga to use your custom classes

```js
Vue.use(Oruga, {
  steps: {
    itemActiveClass: 'steps-nav-item-active',
    itemPreviousClass: 'steps-nav-item-previous',
    stepMarkerClass: 'step-marker',
    stepDividerClass: 'step-divider',
  }
});
```

You can see this code in action in [Oruga multiframework example](https://oruga-multiframework-demo.netlify.app/tailwind)(code [here](https://github.com/oruga-ui/demo-multiframework/blob/master/src/assets/oruga-tailwindcss.css#L64))

Sometimes components change how elements are positioned (horizontally, vertically...), this is another case of higher specificity. In the [Steps](/components/Steps.html) component the `vertical` attribute disposes the steps vertically changing the `height` of the steps `divider`.

```scss
.o-steps {
    &__wrapper-vertical {
        display: flex;
        flex-direction: row;

        .o-steps__divider {
            height: 100%;
            @include avariable('width', 'steps-divider-height', $steps-divider-height);
            top: -50%;
            left: calc(50% - #{$steps-divider-height / 2});
        }

        ...
    }
    ...
}
```

If you want to set height to 50% keeping the other attributes unchanged you can't just define a new class (unless you want to use `!important`), because of a higher specificity. In that case, we suggest to define your new class in this way

```css
.steps-vertical .step-divider {
  height: 50%;
}
```

and in your configurtion

```js
Vue.use(Oruga, {
    steps: {
      verticalClass: 'steps-vertical',
      stepDividerClass: 'step-divider'
    }
});
```

In Oruga documentation you'll find a special note for classes with a higher specificity. 

### Overriding classes

In case you want to override Oruga existing classes completely, you can act as above and set the field `override` to true.

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

or directly in your component 

```html
<o-autocomplete
    override
    rootClass="myautocomplete-root">
```

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

### Usage of _oruga-lite_ stylesheet

Before using the override mode you should evaluate to use _oruga-lite_ stylesheet containing only the essantial rules for Oruga components such as display, position, z-index and other basic attributes.

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
.dropdown-menu {
    min-width: 12em;
    @apply bg-white m-0 px-2 shadow-lg rounded-sm z-10;
}
.dropdown-item {
    @apply no-underline px-1 py-2 cursor-pointer;
}
```

Take a look at the [official TailwindCSS + Oruga example](https://github.com/oruga-ui/demo-tailwindcss).

### Using CSS or SASS/SCSS variables

You can easily customize Oruga using CSS or SASS/SCSS variables. Each component has its own variables, mostly of them with default values defined in the [base style](documentation/#base-style) (see [utilities/_variables.scss](https://github.com/oruga-ui/oruga/blob/master/packages/oruga/src/scss/utilities/_variables.scss)).

::: warning
In order to work with SASS/SCSS you might also have to install `node-sass` or `sass` and `sass-loader` depending on your environment.
:::

To use CSS variables you have to import `oruga-vars.css` stylesheet

```js
import '@oruga-ui/oruga/dist/oruga-vars.css'
```

and redefine the variables you want to change. For example you can change variants globally

```css
:root {
  --oruga-variant-primary: green;
  --oruga-variant-danger: red;
}
```

or a specific component variable, such as button icon width

```css
:root {
  --oruga-button-icon-width: 2.5em;
}
```

For example, look at the [Button style section](components/Button.html#style): here you'll find the complete list of all the CSS and SASS/SCSS variables (with their respective default values) you can redefine for each component.

## Configuration

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
|------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
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
| \$sass-vars                  | true                                                                                                                                                                                                             |
| \$css-vars                   | true                                                                                                                                                                                                             |
| \$variable-prefix            | '--oruga-'                                                                                                                                                                                                       |
| \$sizes                      | (<br>&nbsp;&nbsp;"small": .75rem,<br>&nbsp;&nbsp;"medium": 1.25rem,<br>&nbsp;&nbsp;"large": 1.5rem<br>)                                                                                                                                              |
| \$colors                     | (<br>&nbsp;&nbsp;"primary": ($primary, $primary-invert),<br>&nbsp;&nbsp;"danger": ($danger, $danger-invert),<br>&nbsp;&nbsp;"warning": ($warning, $warning-invert),<br>&nbsp;&nbsp;"success": ($success, $success-invert),<br>&nbsp;&nbsp;"info": ($info, $info-invert)<br>) |

## Examples

### TailwindCSS, Bootstrap 5, Bulma and Material demo 🧶

- [Online demo](https://oruga-multiframework-demo.netlify.app)
- [Source code](https://github.com/oruga-ui/demo-multiframework)

<iframe frameborder="0" style="margin-top: 1rem; width: 100%; height: 105vh;"
    src="https://oruga-multiframework-demo.netlify.app/Tailwind">
</iframe>

### TailwindCSS 2 Recipe Demo 🍝🍔🍟

This simple demo shows a simple recipe website. Oruga components like Input, Radio, Loading, Switch, Collapse etc are customized using [TailwindCSS 2](https://tailwindcss.com/)!

- [Online demo](https://oruga-tailwindcss-demo.netlify.app)
- [Source code](https://github.com/oruga-ui/demo-tailwindcss)

### NuxtJS Demo 🏔

Currently WIP

