---
sidebarDepth: 2
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

| Prop name        | Description                                     | Type                   | Values                                                                          | Default                                                                                                                                                                                            |
| ---------------- | ----------------------------------------------- | ---------------------- | ------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| animateInitially | Apply animation on the initial render           | boolean                | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>tabs: {<br>&nbsp;&nbsp;animateInitially: false<br>}</code>                                             |
| animated         | Tab will have an animation                      | boolean                | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>tabs: {<br>&nbsp;&nbsp;animated: true<br>}</code>                                                      |
| animation        | Transition animation name                       | string[]               | `[next`, `prev]`, `[right`, `left`, `down`, `up]`                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>tabs: {<br>&nbsp;&nbsp;animation: [ "slide-next", "slide-prev", "slide-down", "slide-up",]<br>}</code> |
| destroyOnHide    | Destroy tabItem on hide                         | boolean                | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                                                        |
| expanded         | Tabs will be expanded (full-width)              | boolean                | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                                                        |
| v-model          | The selected item value                         | string\|number\|object | -                                                                               | <code style='white-space: nowrap; padding: 0;'>0</code>                                                                                                                                            |
| multiline        | Show tab items multiline when there is no space | boolean                | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                                                        |
| override         | Override existing theme classes completely      | boolean                | -                                                                               |                                                                                                                                                                                                    |
| position         | Position of the tabs                            | string                 | `left`, `centered`, `right`                                                     |                                                                                                                                                                                                    |
| size             | Tab size                                        | string                 | `small`, `medium`, `large`                                                      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>tabs: {<br>&nbsp;&nbsp;size: undefined<br>}</code>                                                     |
| type             | Tab type                                        | string                 | `default`, `boxed`, `toggle`, `pills`                                           | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>tabs: {<br>&nbsp;&nbsp;type: "default"<br>}</code>                                                     |
| variant          | Color of the control                            | string                 | `primary`, `info`, `success`, `warning`, `danger`, `and any other custom color` | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>tabs: {<br>&nbsp;&nbsp;variant: undefined<br>}</code>                                                  |
| vertical         | Show tab in vertical layout                     | boolean                | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>tabs: {<br>&nbsp;&nbsp;vertical: false<br>}</code>                                                     |

### Events

| Event name        | Properties                                                                                                        | Description                     |
| ----------------- | ----------------------------------------------------------------------------------------------------------------- | ------------------------------- |
| update:modelValue | **value** `string \| number \| object` - updated modelValue prop                                                  | modelValue prop two-way binding |
| change            | **value** `string \| number \| object` - new tab value<br/>**value** `string \| number \| object` - old tab value | on tab change event             |

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

| Prop name | Description                                                                       | Type                   | Values | Default                                                                                                                                            |
| --------- | --------------------------------------------------------------------------------- | ---------------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| ariaRole  | Role attribute to be passed to the div wrapper for better accessibility.          | string                 | -      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>tabs: {<br>&nbsp;&nbsp;ariaRole: "tab"<br>}</code>     |
| disabled  | Item will be disabled                                                             | boolean                | -      | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                        |
| icon      | Icon on the left                                                                  | string                 | -      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>tabs: {<br>&nbsp;&nbsp;icon: undefined<br>}</code>     |
| iconPack  | Icon pack                                                                         | string                 | -      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>tabs: {<br>&nbsp;&nbsp;iconPack: undefined<br>}</code> |
| label     | Item label                                                                        | string                 | -      |                                                                                                                                                    |
| override  | Override existing theme classes completely                                        | boolean                | -      |                                                                                                                                                    |
| tag       | Tabs item tag name                                                                | DynamicComponent       | -      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>tabs: {<br>&nbsp;&nbsp;itemTag: "button"<br>}</code>   |
| value     | Item value (it will be used as v-model of wrapper component) - default is an uuid | string\|number\|object | -      | Default function (see source code)                                                                                                                 |
| visible   | Show/hide item                                                                    | boolean                | -      | <code style='white-space: nowrap; padding: 0;'>true</code>                                                                                         |

### Events

| Event name | Properties | Description                  |
| ---------- | ---------- | ---------------------------- |
| activate   |            | on tab item activate event   |
| deactivate |            | on tab item deactivate event |

### Slots

| Name    | Description           | Bindings |
| ------- | --------------------- | -------- |
| default | Tab item content      |          |
| header  | Override header label |          |

</div>

<div class="vp-doc">

</div>
<div class="vp-doc">

## Sass variables

<div class="theme-oruga">

> Current theme ➜ _[Oruga](https://github.com/oruga-ui/theme-oruga)_

| SASS Variable                               | Default                                |
| ------------------------------------------- | -------------------------------------- |
| $tabs-disabled-opacity                      | var(--#{$prefix}base-disabled-opacity) |
| $tabs-font-size                             | var(--#{$prefix}base-font-size)        |
| $tabs-icon-margin                           | 0.5em                                  |
| $tabs-content-padding                       | 1rem                                   |
| $tabs-margin-bottom                         | 1.5rem                                 |
| $tabs-border-bottom-color                   | var(--#{$prefix}grey-lighter)          |
| $tabs-border-bottom-style                   | solid                                  |
| $tabs-border-bottom-width                   | 1px                                    |
| $tabs-link-color                            | hsl(0, 0%, 29%)                        |
| $tabs-link-active-border-bottom-color       | var(--#{$prefix}primary)               |
| $tabs-link-active-color                     | var(--#{$prefix}primary)               |
| $tabs-link-line-height                      | var(--#{$prefix}base-line-height)      |
| $tabs-link-padding                          | 0.5em 1em                              |
| $tabs-boxed-link-radius                     | var(--#{$prefix}base-border-radius)    |
| $tabs-boxed-link-hover-background-color     | hsl(0, 0%, 96%)                        |
| $tabs-boxed-link-hover-border-bottom-color  | hsl(0, 0%, 86%)                        |
| $tabs-boxed-link-active-background-color    | hsl(0, 0%, 100%)                       |
| $tabs-boxed-link-active-border-color        | hsl(0, 0%, 86%)                        |
| $tabs-boxed-link-active-border-bottom-color | transparent                            |
| $tabs-toggle-link-border-color              | hsl(0, 0%, 86%)                        |
| $tabs-toggle-link-border-style              | solid                                  |
| $tabs-toggle-link-border-width              | 1px                                    |
| $tabs-toggle-link-hover-background-color    | hsl(0, 0%, 96%)                        |
| $tabs-toggle-link-hover-border-color        | hsl(0, 0%, 71%)                        |
| $tabs-toggle-link-active-background-color   | var(--#{$prefix}primary)               |
| $tabs-toggle-link-active-border-color       | var(--#{$prefix}primary)               |
| $tabs-toggle-link-active-color              | var(--#{$prefix}primary-invert)        |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-oruga/tree/main/src/assets/scss/components/_tabs.scss)

</div><div class="theme-bulma">

> Current theme ➜ _[Bulma](https://github.com/oruga-ui/theme-bulma)_

| SASS Variable                                     | Default                                                   |
| ------------------------------------------------- | --------------------------------------------------------- |
| $tabs-focused-outline                             | none                                                      |
| $tabs-link-focus-border-bottom-color              | css.getVar( "tabs-link-hover-border-bottom-color")        |
| $tabs-link-focus-active-border-bottom-color       | css.getVar( "tabs-link-active-border-bottom-color")       |
| $tabs-boxed-link-focus-active-background-color    | css.getVar( "tabs-boxed-link-active-background-color")    |
| $tabs-boxed-link-focus-background-color           | css.getVar( "tabs-boxed-link-hover-background-color")     |
| $tabs-boxed-link-focus-active-border-bottom-color | css.getVar( "tabs-boxed-link-active-border-bottom-color") |
| $tabs-boxed-link-focus-border-bottom-color        | css.getVar( "tabs-boxed-link-hover-border-bottom-color")  |
| $tabs-toggle-link-focus-active-background-color   | css.getVar( "tabs-toggle-link-active-background-color")   |
| $tabs-toggle-link-focus-background-color          | css.getVar( "tabs-toggle-link-hover-background-color")    |
| $tabs-toggle-link-focus-active-border-color       | css.getVar( "tabs-toggle-link-active-border-color")       |
| $tabs-toggle-link-focus-border-color              | css.getVar( "tabs-toggle-link-hover-border-color")        |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-bulma/tree/main/src/assets/scss/components/_tabs.scss)

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
