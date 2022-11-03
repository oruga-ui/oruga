## Introduction

Oruga is a <b>lightweight library of UI components for [Vue.js](https://vuejs.org/) without CSS framework dependency.</b><br>
It <b>doesn't depend on any specific style or CSS framework</b> (like Bootstrap, Bulma, TailwindCSS, etc) and it <b>doesn't provide any grid system or CSS utility</b>, it just offer a <b>set of components easy to customize only modifying your stylesheets</b> or <b>integrating it with a CSS framework</b> (see the [demo](#examples)).<br>
Oruga wants you to <b>focus only on UI/UX aspects</b> of your application and <b>be totally flexible to future changes</b> without having to touch a line of JavaScript. 

If you need a component library and want to easily apply your custom styles, Oruga is the library for you! 🐛

### Oruga default stylesheet

Oruga comes with a default stylesheet containing only the essential rules for Oruga components such as display, position, z-index and other basic attributes. You can use the default Oruga stylesheet in this documentation turning on the switch in the navbar. 

<video class="oruga-doc-video" controls autoplay muted loop>
  <source src="/defaultswitch.mp4" type="video/mp4">
</video>

If you use the default stylesheet to browse documentation some examples won't work as you expect because sizes, variants and adornments are not included in the Oruga default stylesheet. For more info read ["Differences between default and full css"](#differences-between-default-and-full-css) or go to ["Customization section"](#customization) if you want to know more about components customization.

### Availability

🐛 Oruga is available for [Vue.js](https://vuejs.org/) **version 3.x** and has been tested in all major browsers

![Chrome](https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png) | ![Firefox](https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png) | ![Opera](https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png) | ![Safari](https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png) | ![Edge](https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png)
--- | --- | --- | --- | --- |
Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ |

💅 For more info about components customization, go to the ["Customization section"](#customization).

🕹 To see Oruga in action, go to the ["Examples" section](#examples).

## Setup

<o-tabs contentClass="installation-tabs-content" navTabsClass="installation-tabs-nav-buttons" rootClass="installation-tabs">
<o-tab-item override label="Yarn" itemHeaderTypeClass="installation-tabs-nav-button-" itemHeaderActiveClass="installation-tabs-nav-button-active-">

```bash
yarn add @oruga-ui/oruga-next
```

</o-tab-item>
<o-tab-item override label="Npm" itemHeaderTypeClass="installation-tabs-nav-button-" itemHeaderActiveClass="installation-tabs-nav-button-active-">

```bash
npm install @oruga-ui/oruga-next --save
```

</o-tab-item>
<o-tab-item override label="Cdn" itemHeaderTypeClass="installation-tabs-nav-button-" itemHeaderActiveClass="installation-tabs-nav-button-active-">

```html
<link rel="stylesheet" href="//unpkg.com/oruga-next/dist/oruga.css" />
<script src="//unpkg.com/oruga-next/dist/oruga.js"></script>
```

</o-tab-item>
</o-tabs>

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
import { OAutocomplete, OSidebar } from '@oruga-ui/oruga-next'
import '@oruga-ui/oruga-next/dist/oruga.css'

createApp(...)
  .component(OAutocomplete)
  .component(OSidebar)
```

## Nuxt module

Oruga doesn't provide a [Nuxt.js](https://nuxtjs.org) module at the moment.

You can use Nuxt.js plugins system adding a file (e.g. `oruga.js`) in your `plugins` folder containing

```js
import Oruga from '@oruga-ui/oruga-next'
import '@oruga-ui/oruga-next/dist/oruga.css'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Oruga)
})
```

To make this plugin available in your app, add this file to the `plugins` array in your `nuxt.config.js`

```js
plugins: [{ src: '~plugins/oruga.js' }]
```

To understand how the plugins work with Nuxt.js, take a look at the [NuxtJS plugin documentation](https://v3.nuxtjs.org/guide/directory-structure/plugins/).

## Customization

Oruga allows you to customize components in 3 different ways:

- [Adding new classes](#adding-classes)
- [Overriding existing classes](#overriding-classes)
- [Using CSS or SASS/SCSS variables](#using-css-or-sass-scss-variables)

You can mix them, for example adding new classes and using CSS variables!

Oruga provides `oruga.css`, a lightweight stylesheet containing only minimal CSS rules (position, display, z-index ...). Include it if you want to perform a complete customization. 

Oruga provides other 2 different stylesheets:

- `oruga-full.css`: a stylesheet containing the complete Oruga style (the default style used for documentation).
- `oruga-full-vars.css`: a stylesheet containing the complete Oruga style with css vars you can redefine in your application. For more information [click here](#using-css-or-sass-scss-variables).

For more info read ["Differences between default and full css"](#differences-between-default-and-full-css).


### Adding new classes or override existing ones

With Oruga you can easily override existing components style appending one or more classes. Each component has a `Class prop` section (for example see [Dropdown Class props](/components/Dropdown.html#class-props)) where you can inspect elements each class property affects using the `Class prop inspector`.

<video class="oruga-doc-video" controls autoplay muted loop>
  <source src="/inspectormov.mp4" type="video/mp4">
</video>

### Adding classes

You can add classes to a component using class properties (see [Autocomplete class props](/components/Autocomplete.html#class-props) for example)

```vue
<o-autocomplete root-class="myautocomplete-root" menu-class="myautocomplete-menu" item-class="myautocomplete-item" />
```

Or globally 

```js
import { createApp } from 'vue'
import Oruga from '@oruga-ui/oruga-next'
import '@oruga-ui/oruga-next/dist/oruga.css'

createApp(...)
    .use(Oruga, {
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
import { createApp } from 'vue'
import { OAutocomplete, OSidebar, Config } from '@oruga-ui/oruga-next';

createApp(...)
    .component(OAutocomplete)
    .component(OSidebar)
    .use(Config, {
        autocomplete: {
            rootClass: 'myautocomplete-root',
            menuClass: 'myautocomplete-menu',
            itemClass: 'myautocomplete-item',
            ...
        }
    });
```

You can also use an `array` to specify more than one class or a `function` to extend or override classes in a component. In case you use a function, a suffix is provided by the component and it can be used inside the function. For example, `menuPositionClass` in Autocomplete provides a suffix to specify menu position (top, bottom), in this case you may define a function and append the suffix to the base class name

```js
createApp(...)
    .use(Config, {
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

For a better customization experience this function accepts the component's `context` containing its read-only attributes (`props`, `data` and `computed`) as second parameter. For example using [Bootstrap](https://getbootstrap.com/) you may want to apply variants to buttons only when the element is not outlined

```js
createApp(...)
    .use(Config, {
        input: {
            rootClass: (_, context) => {
                if (context.computed.hasIconRight) {
                    return 'has-icons-right')
                }
            },
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
createApp(...)
    .use(Oruga, {
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

and in your configuration

```js
createApp(...)
    .use(Oruga, {
        steps: {
            verticalClass: 'steps-vertical',
            stepDividerClass: 'step-divider'
        }
    });
```

In Oruga documentation you'll find a special note (🔍) in the `Class prop inspector` for classes with a higher specificity. 

### Overriding classes

In case you want to override Oruga existing classes completely, you can act as above and set the field `override` to true.

```js
import { createApp } from 'vue'
import Oruga from '@oruga-ui/oruga-next'
import '@oruga-ui/oruga-next/dist/oruga.css'

createApp(...)
    .use(Oruga, {
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

::: warning
In this case `override` property replaces Oruga existing classes completely, ignoring your configuration.
:::

You can also specify the override behaviour for each class

```js
createApp(...)
    .use(Config, {
        autocomplete: {
            rootClass: {
                class: 'myautocomplete-root',
                override: true
            },
            menuClass: 'myautocomplete-menu',
            itemClass: 'myautocomplete-item',
            ...
        }
    });
```

### Transform classes

In case you want to transform applied classes' names you can use `transformClasses` function directly in your configuration.

```js
createApp(...)
    .use(Config, {
        button: {
            transformClasses: (appliedClasses) => {
                return appliedClasses.replace(/-/g, '--')
            }
        }
        ...
    })
```

You can also use `transformClasses` globally if you need to transform classes for any component.

```js
createApp(...)
    .use(Config, {
        transformClasses: (appliedClasses) => {
            return appliedClasses.replace(/-/g, '--')
        }
        ...
    })
```

### Using CSS or SASS/SCSS variables

You can easily customize Oruga using CSS or SASS/SCSS variables. Each component has its own variables, mostly of them with default values defined in the [base style](#base-style) (see [utilities/_variables.scss](https://github.com/oruga-ui/oruga/blob/master/packages/oruga/src/scss/utilities/_variables.scss)).

To use *CSS variables* you have to import `oruga-full-vars.css` stylesheet

```js
import '@oruga-ui/oruga-next/dist/oruga-full-vars.css'
```

and redefine the variables you want to change. 

For example to change variants globally using CSS variables you can do

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

To use *SASS/SCSS variables* you have to use .scss files placed in the Oruga package

```js
import '@oruga-ui/oruga-next/src/scss/oruga-full-vars';
```

::: warning
In order to work with SASS/SCSS you might also have to install `sass` and `sass-loader` depending on your environment.
:::

An example can be found in the [Button style section](/components/Button.html#style): here you'll find the complete list of all the CSS and SASS/SCSS variables (with their respective default values) you can redefine for each component.

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

### Differences between default and full css

The default stylesheet contains only the essantial rules for Oruga components such as display, position, z-index and other basic attributes. 

For example to style a dropdown using override mode with _oruga_ default stylesheet using [TailwindCSS](https://tailwindcss.com/)

```js
import '@oruga-ui/oruga-next/dist/oruga.css'
```

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

And here's how to style a dropdown using _oruga-full_ stylesheet

```js
import '@oruga-ui/oruga-next/dist/oruga-full.css'
```

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

## Global Props

| Field              | Description                                                   | Default |
| ------------------ | ------------------------------------------------------------- | ------- |
| statusIcon         | Show status icon using field and variant prop                 | true    |
| statusVariantIcon  | Default mapping of variant and icon name                      | <code style='white-space: nowrap; padding: 0;'>{<br>&nbsp;&nbsp;'success': 'check',<br>&nbsp;&nbsp;'danger': 'alert-circle',<br>&nbsp;&nbsp;'info':'information', <br>&nbsp;&nbsp;'warning': 'alert'<br>} </code>  |
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

## Themes

- [Bulma CSS Theme](https://github.com/oruga-ui/theme-bulma)

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
 

