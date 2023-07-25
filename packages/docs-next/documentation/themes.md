


# Themes

Because Oruga doesn't come with any CSS by default, we would like to provide you with a variety of ready-to-use <b>Themes</b>.
A theme provide the <b>CSS styling for the components</b>. They can build on existing CSS frameworks/libraries or be completely lightweight and dependency free.
A theme comes as a <b>separate package</b>, which you can install and change completely at will. 
Themes that build on top of an existing CSS framework usually come with a theme-specific global Oruga Config object.

These themes are currently available:
- [Oruga Theme](https://github.com/oruga-ui/theme-oruga) (default Oruga style - without any dependecy)
- [Bulma Theme](https://github.com/oruga-ui/theme-bulma) (based on [Bulma](https://bulma.io/) CSS framework)
- [Bootstrap Theme](https://github.com/oruga-ui/theme-bootstrap) (based on [Bootstrap](https://getbootstrap.com/) styling)

::: tip Theme Preview
You can change the active theme for this documentation site using the drop down menu in the navigation bar.
:::


<video class="oruga-doc-video" controls autoplay muted loop>
  <source src="/defaultswitch.mp4" type="video/mp4">
</video>



## Using Variables

You can easily customise each theme at global and component level using CSS or SASS variables.
Each theme has its own global and component variables, mostly of them with default values defined.
The theme-specific global variables can be found on this page under [Global Theme Variables](#global-theme-variables). 
For component-specific customisation, see a component's `Sass Variables` section, where you'll find a complete list of all the SASS variables (with their respective default values) that you can redefine for each component (an example can be found in the [Button Sass variables](/components/Button.html#sass-variables)).
Change the active theme to the theme-specific variables.

To use *SASS/SCSS variables*, you must use the .scss version of a theme from the package's distribution folder. 
For example, the Oruga theme:

```js
import '@oruga-ui/theme-oruga/dist/scss/oruga-full.scss';
```

::: warning
In order to work with SASS/SCSS you might also have to install `sass` and `sass-loader` depending on your environment.
:::


You can also use CSS variables. In most cases, any theme-specific SASS variable is converted to a CSS variable before being used.

::: info
For the Oruga Theme, you have to import the `oruga-full.css` stylesheet to use CSS variables.
::: 


For example to change global variable you can do

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

## Oruga Theme

The default [Oruga Theme](https://github.com/oruga-ui/theme-oruga) provides some ready-to-use and completely dependency-free styling and comes with two different versions, `oruga.css` and `oruga-full.css`. This theme uses the default class configuration.

::: code-group

```bash [Npm]
npm install @oruga-ui/theme-oruga
```

```bash [Yarn]
yarn add @oruga-ui/theme-oruga
```

```html [Cdn]
<link rel="stylesheet" href="https://unpkg.com/@oruga-ui/theme-oruga/dist/oruga.css" />
```

:::

* The minimal `oruga.css` provides a lightweight stylesheet that contains only minimal and essential CSS rules for Oruga components such as display, position, z-index and other basic attributes. 
This could be the best starting point for creating your own theme if you want to do a full customisation.

* The `oruga-full.css` stylesheet provides the full custom Oruga style for each component (the default style for this documentation).

For more info read ["Differences between default and full css"](#differences-between-default-and-full-css) or go to ["Customisation"](/documentation/customisation) if you want to know more about components customisation.

::: info
If you use the base stylesheet to browse the documentation, some examples won't work as you expect because sizes, variants and decorations are not included in the minimal Oruga stylesheet. 
::: 



### Differences between default and full css

The default stylesheet contains only the essantial rules for Oruga components such as display, position, z-index and other basic attributes. 

For example to style a dropdown using override mode with _oruga_ default stylesheet using [TailwindCSS](https://tailwindcss.com/)

```js
import '@oruga-ui/theme-oruga/dist/oruga.css'
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
import '@oruga-ui/theme-oruga/dist/oruga-full.css'
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



### Deal with specificity

Oruga CSS comes with the lowest possible [specifity](https://www.w3schools.com/css/css_specificity.asp), so you can easily override existing classes by defining new ones in the global configuration or using attributes. However, there are some cases where the specificity is higher than you might expect, for example in the [Steps](/components/Steps.html) component the `nav item` contains a `marker` and a `divider` whose colors change whether the nav item is active or not.

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

If you want to change the color you can use `!important` or change the values of the variables. Otherwise, you can easily increase the specificity in your stylesheet

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

Sometimes components change the way elements are positioned (horizontally, vertically...), this is another case of higher specificity. In the [Steps](/components/Steps.html) component the `vertical` attribute disposes the steps vertically changing the `height` of the steps `divider`.

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

If you want to set the height to 50% while keeping the other attributes unchanged, you can't just define a new class (unless you want to use `!important`), because of the higher specificity. In this case, we suggest you define your new class like this:

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

In the Oruga documentation you'll find a special note (🔍) in the `Class Prop Inspector` for classes with a higher specificity.


## Bulma Theme

The [Bulma Theme](https://github.com/oruga-ui/theme-bulma) provides a customisation of the Oruga components with the [Bulma CSS framework](https://bulma.io/).

::: code-group

```bash [Npm]
npm install @oruga-ui/theme-bulma
```

```bash [Yarn]
yarn add @oruga-ui/theme-bulma
```

```html [Cdn]
<link rel="stylesheet" href="https://unpkg.com/@oruga-ui/theme-bulma/dist/bulma.css" />
```

:::
The theme comes with its own Bulma-based class mapping configuration and some additional component styling that you have to import:

```js
import { createApp } from 'vue'
import App from './App.vue'

import Oruga from '@oruga-ui/oruga-next';

import { bulmaConfig } from '@oruga-ui/theme-bulma';

import '@oruga-ui/theme-bulma/dist/bulma.css';

createApp(App)
    .use(Oruga, bulmaConfig)
    .mount('#app')
```

See the [theme repository](https://github.com/oruga-ui/theme-bulma) and the [Bulma documenation](https://bulma.io/documentation/) for a detailed documentation.

## Bootstrap Theme

The [Bootstrap Theme](https://github.com/oruga-ui/theme-bootstrap) provides a customisation of the Oruga components with [Bootstrap](https://getbootstrap.com/).

::: code-group

```bash [Npm]
npm install @oruga-ui/theme-bootstrap
```

```bash [Yarn]
yarn add @oruga-ui/theme-bootstrap
```

```html [Cdn]
<link rel="stylesheet" href="https://unpkg.com/@oruga-ui/theme-bootstrap/dist/bootstrap.css" />
```

:::


The theme comes with its own Bootstrap-based class mapping configuration and some additional component styling that you have to import:

```js
import { createApp } from 'vue'
import App from './App.vue'

import Oruga from '@oruga-ui/oruga-next';

import { bootstrapConfig } from '@oruga-ui/theme-bootstrap';

import '@oruga-ui/theme-bootstrap/dist/bootstrap.css';

createApp(App)
    .use(Oruga, bootstrapConfig)
    .mount('#app')
```

See the [theme repository](https://github.com/oruga-ui/theme-bootstrap) and the [Bootstrap documentation](https://getbootstrap.com/docs/) for a detailed documentation.

## Global Theme Variables

:::info 
Change the active theme in the navigation bar to see other theme-specific global variables.
:::

<!--@include: ./../themes/theme-orugabase.md-->

<!--@include: ./../themes/theme-orugafull.md-->

<!--@include: ./../themes/theme-bulma.md-->

<!--@include: ./../themes/theme-bootstrap.md-->
