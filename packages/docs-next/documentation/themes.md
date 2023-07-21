


# Themes


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




## Overrides

### Adding classes

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



### Oruga default stylesheet

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


## Global Props

| Field              | Description                                                                                                                                                                                  | Default |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| statusIcon         | Show status icon using field and variant prop                                                                                                                                                | true    |
| statusVariantIcon  | Default mapping of variant and icon name                                                                                                                                                     | <code style='white-space: nowrap; padding: 0;'>{<br>&nbsp;&nbsp;'success': 'check',<br>&nbsp;&nbsp;'danger': 'alert-circle',<br>&nbsp;&nbsp;'info':'information', <br>&nbsp;&nbsp;'warning': 'alert'<br>} </code> |
| useHtml5Validation | Default form components use-html5-validation attribute                                                                                                                                       | true    |
| iconPack           | Icon pack used internally and on the Icon component attribute                                                                                                                                | 'mdi'   |
| reportInvalidInput | Callback function that allows for custom behavior when HTML constraint validation would visually report that a field is invalid. Takes the input and its parent field (if any) as arguments. | <code style='white-space: nowrap; padding: 0;'>null</code> |

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
