---
title: Tabs
---

# Tabs

<div class="vp-doc">

> Responsive horizontal navigation tabs, switch between contents with ease

</div>

<div class="vp-example">

## Examples

<example-tabs />

</div>
<div class="vp-example">

## Class props

<inspector-tabs-viewer />

</div>

<div class="vp-doc">

## Tabs component

> Responsive horizontal navigation tabs, switch between contents with ease

```html
<o-tabs></o-tabs>
```

### Props

| Prop name | Description                                     | Type           | Values                                                                          | Default                                                                                                                                           |
| --------- | ----------------------------------------------- | -------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| animated  | Tab will have an animation                      | boolean        | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>tabs: {<br>&nbsp;&nbsp;animated: true<br>}</code>     |
| expanded  | Tabs will be expanded (full-width)              | boolean        | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                       |
| multiline | Show tab items multiline when there is no space | boolean        | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                       |
| position  | Position of the tabs                            | string         | `left`, `centered`, `right`                                                     |                                                                                                                                                   |
| size      | Tab size                                        | string         | `small`, `medium`, `large`                                                      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>tabs: {<br>&nbsp;&nbsp;size: undefined<br>}</code>    |
| type      | Tab type                                        | string         | `boxed`, `toggle`                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>tabs: {<br>&nbsp;&nbsp;type: "default"<br>}</code>    |
| v-model   |                                                 | string\|number | -                                                                               | <code style='white-space: nowrap; padding: 0;'>0</code>                                                                                           |
| variant   | Color of the control                            | string         | `primary`, `info`, `success`, `warning`, `danger`, `and any other custom color` | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>tabs: {<br>&nbsp;&nbsp;variant: undefined<br>}</code> |
| vertical  | Show tab in vertical layout                     | boolean        | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>tabs: {<br>&nbsp;&nbsp;vertical: false<br>}</code>    |

### Events

| Event name        | Properties                                                                                    | Description                     |
| ----------------- | --------------------------------------------------------------------------------------------- | ------------------------------- |
| update:modelValue | **value** `string \| number` - updated modelValue prop                                        | modelValue prop two-way binding |
| change            | **value** `string \| number` - new tab value<br/>**value** `string \| number` - old tab value | on tab change event             |

### Slots

| Name    | Description                 | Bindings |
| ------- | --------------------------- | -------- |
| start   | Additional slot before tabs |          |
| end     | Additional slot after tabs  |          |
| default | Place tab items here        |          |

</div>

<div class="vp-doc">

## TabItem component

```html
<o-tab-item></o-tab-item>
```

### Props

| Prop name | Description                                                              | Type             | Values | Default                                                                                                                                            |
| --------- | ------------------------------------------------------------------------ | ---------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| disabled  | Item will be disabled                                                    | boolean          | -      | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                        |
| icon      | Icon on the left                                                         | string           | -      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>tabs: {<br>&nbsp;&nbsp;icon: undefined<br>}</code>     |
| iconPack  | Icon pack                                                                | string           | -      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>tabs: {<br>&nbsp;&nbsp;iconPack: undefined<br>}</code> |
| label     | Item label                                                               | string           | -      |                                                                                                                                                    |
| role      | Role attribute to be passed to the div wrapper for better accessibility. | string           | -      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>tabs: {<br>&nbsp;&nbsp;ariaRole: "tab"<br>}</code>     |
| tag       | Tabs item tag name                                                       | DynamicComponent | -      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>tabs: {<br>&nbsp;&nbsp;itemTag: "button"<br>}</code>   |
| value     | Item value (it will be used as v-model of wrapper component)             | string\|number   | -      | Default function (see source code)                                                                                                                 |
| visible   | Show/hide item                                                           | boolean          | -      | <code style='white-space: nowrap; padding: 0;'>true</code>                                                                                         |

### Events

| Event name | Properties | Description                  |
| ---------- | ---------- | ---------------------------- |
| activate   |            | on tab item activate event   |
| deactivate |            | on tab item deactivate event |

### Slots

| Name    | Description      | Bindings |
| ------- | ---------------- | -------- |
| default | Tab item content |          |

</div>

<div class="vp-doc">

</div>
<div class="vp-doc">

## Sass variables

<div class="theme-orugabase">

> Current theme ➜ _[Oruga Base](https://github.com/oruga-ui/theme-oruga)_

| SASS Variable                               | Default                |
| ------------------------------------------- | ---------------------- |
| $tabs-disabled-opacity                      | $base-disabled-opacity |
| $tabs-font-size                             | $base-font-size        |
| $tabs-icon-margin                           | 0.5em                  |
| $tabs-content-padding                       | 1rem                   |
| $tabs-margin-bottom                         | 1.5rem                 |
| $tabs-border-bottom-color                   | $grey-lighter          |
| $tabs-border-bottom-style                   | solid                  |
| $tabs-border-bottom-width                   | 1px                    |
| $tabs-link-color                            | hsl(0, 0%, 29%)        |
| $tabs-link-active-border-bottom-color       | $primary               |
| $tabs-link-active-color                     | $primary               |
| $tabs-link-line-height                      | $base-line-height      |
| $tabs-link-padding                          | 0.5em 1em              |
| $tabs-boxed-link-radius                     | $base-border-radius    |
| $tabs-boxed-link-hover-background-color     | hsl(0, 0%, 96%)        |
| $tabs-boxed-link-hover-border-bottom-color  | hsl(0, 0%, 86%)        |
| $tabs-boxed-link-active-background-color    | hsl(0, 0%, 100%)       |
| $tabs-boxed-link-active-border-color        | hsl(0, 0%, 86%)        |
| $tabs-boxed-link-active-border-bottom-color | transparent            |
| $tabs-toggle-link-border-color              | hsl(0, 0%, 86%)        |
| $tabs-toggle-link-border-style              | solid                  |
| $tabs-toggle-link-border-width              | 1px                    |
| $tabs-toggle-link-hover-background-color    | hsl(0, 0%, 96%)        |
| $tabs-toggle-link-hover-border-color        | hsl(0, 0%, 71%)        |
| $tabs-toggle-link-radius                    | $base-border-radius    |
| $tabs-toggle-link-active-background-color   | $primary               |
| $tabs-toggle-link-active-border-color       | $primary               |
| $tabs-toggle-link-active-color              | $primary-invert        |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-oruga/tree/main/src/assets/scss/components/_tabs.scss)

</div><div class="theme-orugafull">

> Current theme ➜ _[Oruga Full](https://github.com/oruga-ui/theme-oruga)_

| SASS Variable                               | Default                |
| ------------------------------------------- | ---------------------- |
| $tabs-disabled-opacity                      | $base-disabled-opacity |
| $tabs-font-size                             | $base-font-size        |
| $tabs-icon-margin                           | 0.5em                  |
| $tabs-content-padding                       | 1rem                   |
| $tabs-margin-bottom                         | 1.5rem                 |
| $tabs-border-bottom-color                   | $grey-lighter          |
| $tabs-border-bottom-style                   | solid                  |
| $tabs-border-bottom-width                   | 1px                    |
| $tabs-link-color                            | hsl(0, 0%, 29%)        |
| $tabs-link-active-border-bottom-color       | $primary               |
| $tabs-link-active-color                     | $primary               |
| $tabs-link-line-height                      | $base-line-height      |
| $tabs-link-padding                          | 0.5em 1em              |
| $tabs-boxed-link-radius                     | $base-border-radius    |
| $tabs-boxed-link-hover-background-color     | hsl(0, 0%, 96%)        |
| $tabs-boxed-link-hover-border-bottom-color  | hsl(0, 0%, 86%)        |
| $tabs-boxed-link-active-background-color    | hsl(0, 0%, 100%)       |
| $tabs-boxed-link-active-border-color        | hsl(0, 0%, 86%)        |
| $tabs-boxed-link-active-border-bottom-color | transparent            |
| $tabs-toggle-link-border-color              | hsl(0, 0%, 86%)        |
| $tabs-toggle-link-border-style              | solid                  |
| $tabs-toggle-link-border-width              | 1px                    |
| $tabs-toggle-link-hover-background-color    | hsl(0, 0%, 96%)        |
| $tabs-toggle-link-hover-border-color        | hsl(0, 0%, 71%)        |
| $tabs-toggle-link-radius                    | $base-border-radius    |
| $tabs-toggle-link-active-background-color   | $primary               |
| $tabs-toggle-link-active-border-color       | $primary               |
| $tabs-toggle-link-active-color              | $primary-invert        |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-oruga/tree/main/src/assets/scss/components/_tabs.scss)

</div><div class="theme-bulma">

> Current theme ➜ _[Bulma](https://github.com/oruga-ui/theme-bulma)_

<p>The theme does not have any custom variables for this component.</p>
</div><div class="theme-bootstrap">

> Current theme ➜ _[Bootstrap](https://github.com/oruga-ui/theme-bootstrap)_

| SASS Variable                           | Default                     |
| --------------------------------------- | --------------------------- |
| $nav-tabs-color                         | var(--#{$prefix}body-color) |
| $nav-tabs-spacer                        | $spacer                     |
| $nav-tabs-disabled-opacity              | 0.5                         |
| $nav-underline-link-active-bg           | $nav-tabs-link-active-bg    |
| $nav-underline-link-active-border-color | currentcolor                |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-bootstrap/tree/main/src/assets/scss/components/_tabs.scss)

</div>

</div>
