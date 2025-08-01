# Loading

<section class="odocs-head">

The **Loading** component allows you to display a loading state for use on a global state or a specific element.

</section>

<section class="odocs-examples">

## Examples

<example-loading />

</section>

<section class="odocs-specs">

## Loading component

> A simple loading overlay.

```html
<o-loading></o-loading>
```

### Props

| Prop name  | Description                                                                                                                                                                                                     | Type    | Values                     | Default                                                                                                                                              |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| active     | Whether loading is active or not, use v-model:active to make it two-way binding                                                                                                                                 | boolean | -                          | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                          |
| animation  | Custom animation (transition name)                                                                                                                                                                              | string  | -                          | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>loading: {<br>&nbsp;&nbsp;animation: "fade"<br>}</code>  |
| cancelable | Is Loading cancable by pressing escape or clicking outside.                                                                                                                                                     | boolean | -                          | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                          |
| clipScroll | Set `true` to remove the body scrollbar.<br/>When `false`, a non-scrollable scrollbar will be kept to avoid moving the background,<br/>but will set the body to a fixed position, which may break some layouts. | boolean | -                          | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>loading: {<br>&nbsp;&nbsp;clipScroll: false<br>}</code>  |
| fullPage   | Loader will overlay the full page.                                                                                                                                                                              | boolean | -                          | <code style='white-space: nowrap; padding: 0;'>true</code>                                                                                           |
| icon       | Icon name to show, unnecessary when default slot is used.                                                                                                                                                       | string  | -                          | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>loading: {<br>&nbsp;&nbsp;icon: "loading"<br>}</code>    |
| iconSize   | Icon size                                                                                                                                                                                                       | string  | `small`, `medium`, `large` | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>loading: {<br>&nbsp;&nbsp;iconSize: "medium"<br>}</code> |
| iconSpin   | Enable spin effect on icon                                                                                                                                                                                      | boolean | -                          | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>loading: {<br>&nbsp;&nbsp;iconSpin: true<br>}</code>     |
| label      | Notification label, unnecessary when default slot is used.                                                                                                                                                      | string  | -                          |                                                                                                                                                      |
| override   | Override existing theme classes completely                                                                                                                                                                      | boolean | -                          |                                                                                                                                                      |

### Events

| Event name      | Properties                                  | Description                   |
| --------------- | ------------------------------------------- | ----------------------------- |
| update:active   | **value** `boolean` - updated active prop   | active prop two-way binding   |
| update:fullPage | **value** `boolean` - updated fullPage prop | fullPage prop two-way binding |
| close           | **value** `string` - close event method     | on component close event      |

### Slots

| Name    | Description             | Bindings                                            |
| ------- | ----------------------- | --------------------------------------------------- |
| default | Override icon and label | **close** `close` - function to close the component |

</section>

<section class="odocs-classes">

## Class Inspector

<inspector-loading-viewer />

</section>

<section class="odocs-style">

## Sass variables

<div class="theme-oruga">

> Current theme ➜ _[Oruga](https://github.com/oruga-ui/theme-oruga)_

| SASS Variable            | Default                  |
| ------------------------ | ------------------------ |
| $loading-overlay-legacy  | #7f7f7f                  |
| $loading-overlay         | rgba(255, 255, 255, 0.5) |
| $loading-zindex          | 29                       |
| $loading-fullpage-zindex | 999                      |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-oruga/tree/main/src/assets/scss/components/_loading.scss)

</div>
<div class="theme-bulma">

> Current theme ➜ _[Bulma](https://github.com/oruga-ui/theme-bulma)_

| SASS Variable                | Default                  |
| ---------------------------- | ------------------------ |
| $loading-background-color    | rgba(255, 255, 255, 0.5) |
| $loading-icon-size           | 3em                      |
| $loading-icon-size-full-page | 5em                      |
| $loading-z                   | 29                       |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-bulma/tree/main/src/assets/scss/components/_loading.scss)

</div>
<div class="theme-bootstrap">

> Current theme ➜ _[Bootstrap](https://github.com/oruga-ui/theme-bootstrap)_

| SASS Variable            | Default                  |
| ------------------------ | ------------------------ |
| $loading-zindex          | $zindex-sticky           |
| $loading-zindex-fullpage | $zindex-fixed            |
| $loading-overlay         | rgba(255, 255, 255, 0.5) |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-bootstrap/tree/main/src/assets/scss/components/_loading.scss)

</div>

</section>
