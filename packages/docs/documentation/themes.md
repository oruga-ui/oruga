# Themes

Because Oruga doesn't come with any CSS by default, we would like to provide you with a variety of ready-to-use **themes**.
A theme provide the **CSS styling for the components**. They can build on existing CSS frameworks/libraries or be completely lightweight and dependency free.
A theme comes as a **separate package**, which you can install and change completely at will. 
Themes that build on top of an existing CSS framework usually come with a theme-specific global Oruga Config object.

These themes are currently available:
- [Oruga Theme](https://github.com/oruga-ui/theme-oruga) (default Oruga style - without any dependecy)
- [Bulma Theme](https://github.com/oruga-ui/theme-bulma) (based on [Bulma](https://bulma.io/) CSS framework)
- [Bootstrap Theme](https://github.com/oruga-ui/theme-bootstrap) (based on [Bootstrap](https://getbootstrap.com/) styling)

::: tip Theme Preview
You can change the active theme for this documentation site using the dropdown menu in the navigation bar.
:::

<!-- 
<video class="oruga-doc-video" controls autoplay muted loop>
  <source src="/defaultswitch.mp4" type="video/mp4">
</video> -->



## Using Variables

You can easily customise each theme at global and component level using CSS or SASS variables.
Each theme has its own global and component variables, mostly of them with default values defined.
The theme-specific global variables can be found on this page under [Global Theme Variables](#global-theme-variables). 
For component-specific customisation, see a component's `Sass Variables` section, where you'll find a complete list of all the SASS variables (with their respective default values) that you can redefine for each component (an example can be found in the [Button Sass variables](/components/Button.html#sass-variables)).
Change the active theme in the navigation bar to see the theme-specific variables.

To use *SASS/SCSS variables*, you must use the .scss version of a theme from the package's distribution folder. 
For example, the Oruga theme:

```js
import '@oruga-ui/theme-oruga/dist/scss/oruga.scss';
```

::: warning
In order to work with SASS/SCSS you might also have to install `sass` and `sass-loader` depending on your environment.
:::


You can also use CSS variables. In most cases, any theme-specific SASS variable is converted to a CSS variable before being used.


For example to change global variable you can do:

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

The [Oruga Theme](https://github.com/oruga-ui/theme-oruga) provides a ready-to-use and completely dependency-free styling. 

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

This theme uses the component's default class configuration and only provides a `oruga.css` or `oruga.scss` file.
The stylesheet contains a full custom Oruga style for each component (the default style for this documentation). 


```js
import '@oruga-ui/theme-oruga/dist/oruga.css'
```


This can also be the best starting point for creating your own theme if you want to do a full customisation.
For example to style a dropdown using override mode with _oruga_ default stylesheet using [TailwindCSS](https://tailwindcss.com/)


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

Take a look at the [official TailwindCSS + Oruga example](https://github.com/oruga-ui/demo-tailwindcss).



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

import Oruga from '@oruga-ui/oruga-next';

import { bulmaConfig } from '@oruga-ui/theme-bulma';

import '@oruga-ui/theme-bulma/dist/bulma.css';

createApp(...)
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

import Oruga from '@oruga-ui/oruga-next';

import { bootstrapConfig } from '@oruga-ui/theme-bootstrap';

import '@oruga-ui/theme-bootstrap/dist/bootstrap.css';

createApp(...)
    .use(Oruga, bootstrapConfig)
    .mount('#app')
```

See the [theme repository](https://github.com/oruga-ui/theme-bootstrap) and the [Bootstrap documentation](https://getbootstrap.com/docs/) for a detailed documentation.



## Global Theme Variables

:::info
You can change the active theme in the navigation bar to see the specific global variables for another theme.
:::

<!--@include: ./../themes/theme-oruga.md-->

<!--@include: ./../themes/theme-bulma.md-->

<!--@include: ./../themes/theme-bootstrap.md-->
