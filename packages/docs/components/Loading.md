# Loading

<section class="odocs-head">

The **Loading** component allows you to display a loading state for use on a global state or a specific element.

</section>

<section class="odocs-examples">

## Examples

<example-loading />

</section>

<section class="odocs-specs">

## Loading Component

> A simple loading overlay.

```html
<o-loading></o-loading>
```

### Props

| Prop name         | Description                                                                                                                                                                                                                     | Type    | Values                                            | Default                                                                                                                                               |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | ------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| active            | Whether loading is active or not, use v-model:active to make it two-way binding                                                                                                                                                 | boolean | -                                                 | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                           |
| animation         | Custom animation (transition name)                                                                                                                                                                                              | string  | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>loading: {<br>&nbsp;&nbsp;animation: "fade"<br>}</code>   |
| <s>cancelable</s> | <div><b>deprecated</b> - use `closeOnOutside` and `closeOnEscape`</div><div><s>Is Loading cancelable by pressing escape or clicking outside</s></div>                                                                           | boolean | -                                                 |                                                                                                                                                       |
| clipScroll        | Set `true` to remove the body scrollbar when `fullPage`.<br/>When `false`, a non-scrollable scrollbar will be kept to avoid moving the background,<br/>but will set the body to a fixed position, which may break some layouts. | boolean | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>loading: {<br>&nbsp;&nbsp;clipScroll: false<br>}</code>   |
| closeOnEscape     | Close when pressing escape key                                                                                                                                                                                                  | boolean | -                                                 | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                           |
| closeOnOutside    | Close when clicked outside of the panel                                                                                                                                                                                         | boolean | -                                                 | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                           |
| fullPage          | Loader will overlay the full page                                                                                                                                                                                               | boolean | -                                                 | <code style='white-space: nowrap; padding: 0;'>true</code>                                                                                            |
| icon              | Icon name to show, unnecessary when default slot is used                                                                                                                                                                        | string  | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>loading: {<br>&nbsp;&nbsp;icon: "loading"<br>}</code>     |
| iconPack          | Icon pack to use for the close icon                                                                                                                                                                                             | string  | `mdi`, `fa`, `fas and any other custom icon pack` | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>loading: {<br>&nbsp;&nbsp;iconPack: undefined<br>}</code> |
| iconSize          | Icon size                                                                                                                                                                                                                       | string  | `small`, `medium`, `large`                        | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>loading: {<br>&nbsp;&nbsp;iconSize: "medium"<br>}</code>  |
| iconSpin          | Enable spin effect on icon                                                                                                                                                                                                      | boolean | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>loading: {<br>&nbsp;&nbsp;iconSpin: true<br>}</code>      |
| label             | Show a label beside the icon, unnecessary when default slot is used                                                                                                                                                             | string  | -                                                 |                                                                                                                                                       |
| override          | Override existing theme classes completely                                                                                                                                                                                      | boolean | -                                                 |                                                                                                                                                       |

### Events

| Event name      | Properties                                  | Description                      |
| --------------- | ------------------------------------------- | -------------------------------- |
| update:active   | **value** `boolean` - updated active prop   | active prop two-way binding      |
| update:fullPage | **value** `boolean` - updated fullPage prop | fullPage prop two-way binding    |
| close           | **event** `Event` - native event            | on active state changes to false |

### Slots

| Name    | Description                                                               | Bindings                                                           |
| ------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| default | Define the content while loading, default is icon and optional label prop | **close** `(event: Event): void` - function to close the component |

</section>

<section class="odocs-classes">

## Class Inspector

<inspector-loading-viewer />

</section>

<section class="odocs-style">

## Sass Variables

<div class="theme-oruga">

> Current theme ➜ _[Oruga](https://github.com/oruga-ui/theme-oruga)_

| SASS Variable                     | Default                         |
| --------------------------------- | ------------------------------- |
| $loading-spacer                   | h.useVar("control-spacer")      |
| $loading-color                    | h.useVar("font-color")          |
| $loading-font-size                | h.useVar("font-size")           |
| $loading-font-weight              | h.useVar("font-weight")         |
| $loading-zindex                   | map.get(vars.$zindex, "sticky") |
| $loading-fullpage-zindex          | map.get(vars.$zindex, "fixed")  |
| $loading-overlay-background-color | rgba(255, 255, 255, 0.5)        |

See ➜ 📄 [SCSS file](https://github.com/oruga-ui/theme-oruga/tree/main/src/assets/scss/components/_loading.scss)

</div>
<div class="theme-bulma">

> Current theme ➜ _[Bulma](https://github.com/oruga-ui/theme-bulma)_

| SASS Variable                | Default                  |
| ---------------------------- | ------------------------ |
| $loading-background-color    | rgba(255, 255, 255, 0.5) |
| $loading-icon-size           | 3em                      |
| $loading-icon-size-full-page | 5em                      |
| $loading-z                   | 29                       |

See ➜ 📄 [SCSS file](https://github.com/oruga-ui/theme-bulma/tree/main/src/assets/scss/components/_loading.scss)

</div>
<div class="theme-bootstrap">

> Current theme ➜ _[Bootstrap](https://github.com/oruga-ui/theme-bootstrap)_

| SASS Variable            | Default                  |
| ------------------------ | ------------------------ |
| $loading-zindex          | $zindex-sticky           |
| $loading-zindex-fullpage | $zindex-fixed            |
| $loading-overlay         | rgba(255, 255, 255, 0.5) |

See ➜ 📄 [SCSS file](https://github.com/oruga-ui/theme-bootstrap/tree/main/src/assets/scss/components/_loading.scss)

</div>

</section>
