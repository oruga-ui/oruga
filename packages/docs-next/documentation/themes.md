


# Themes

Because Oruga doesn't come with any CSS by default, we would like to provide you with a variety of ready-to-use <b>Themes</b>.

The default FormKit theme (called "genesis") can be added by installing the @formkit/themes package.

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



- [Bulma CSS Theme](https://github.com/oruga-ui/theme-bulma)




## Oruga Theme

Oruga comes with a default stylesheet containing only the essential rules for Oruga components such as display, position, z-index and other basic attributes. You can use the default Oruga stylesheet in this documentation turning on the switch in the navbar. 

<video class="oruga-doc-video" controls autoplay muted loop>
  <source src="/defaultswitch.mp4" type="video/mp4">
</video>

If you use the default stylesheet to browse documentation some examples won't work as you expect because sizes, variants and adornments are not included in the Oruga default stylesheet. For more info read ["Differences between default and full css"](#differences-between-default-and-full-css) or go to ["Customization section"](#customization) if you want to know more about components customization.


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



### Deal with specificity

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


## Bulma Theme

Bulma Theme

## Bootstrap Theme

Bootstrap theme 

## Global Theme Variables

:::info 
Change the active theme in the navigation bar to see other theme-specific global variables.
:::

<div class="theme-bootstrap">

> Current theme ➜ _[Bootstrap](https://github.com/oruga-ui/theme-bootstrap)_ 

<<< @/themes/variables-theme-bootstrap.scss{scss}

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-bootstrap/tree/main/src/assets/scss/utils/_variables.scss)
</div>

<div class="theme-bulma">

> Current theme ➜ _[Bulma](https://github.com/oruga-ui/theme-bulma)_ 

<<< @/themes/variables-theme-bulma.scss{scss}

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-bulma/tree/master/src/assets/scss/components/utils/_variables.scss)
</div>


<div class="theme-orugabase">

> Current theme ➜ _[Oruga Base](https://github.com/oruga-ui/theme-oruga)_ 

<<< @/themes/variables-theme-orugabase.scss{scss}

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-oruga/tree/main/src/assets/scss/utils/_variables.scss)
</div>

<div class="theme-orugafull">

> Current theme ➜ _[Oruga Full](https://github.com/oruga-ui/theme-oruga)_ 

<<< @/themes/variables-theme-orugafull.scss{scss}

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-oruga/tree/main/src/assets/scss/utils/_variables.scss)
</div>