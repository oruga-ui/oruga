---
sidebarDepth: 2
---

# Dropdown

<div class="vp-doc">

> Dropdowns are very versatile, can used as a quick menu or even like a select for discoverable content

</div>

<div class="vp-example">

## Examples

<example-dropdown />

</div>
<div class="vp-example">

## Class props

<inspector-dropdown-viewer />

</div>

<div class="vp-doc">

## Dropdown component

> Dropdowns are very versatile, can used as a quick menu or even like a select for discoverable content

```html
<o-dropdown></o-dropdown>
```

### Props

| Prop name        | Description | Type | Values | Default                                                                                                                                                                      |
| ---------------- | ----------- | ---- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| active           |             |      | -      | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                                  |
| animation        |             |      | -      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>dropdown: {<br>&nbsp;&nbsp;animation: "fade"<br>}</code>                         |
| ariaRole         |             |      | -      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>dropdown: {<br>&nbsp;&nbsp;ariaRole: "list"<br>}</code>                          |
| checkScroll      |             |      | -      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>dropdown: {<br>&nbsp;&nbsp;checkScroll: false<br>}</code>                        |
| closeable        |             |      | -      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>dropdown: {<br>&nbsp;&nbsp;closeable: ["escape","outside","content"]<br>}</code> |
| delay            |             |      | -      |                                                                                                                                                                              |
| disabled         |             |      | -      | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                                  |
| expanded         |             |      | -      | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                                  |
| inline           |             |      | -      | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                                  |
| label            |             |      | -      |                                                                                                                                                                              |
| maxHeight        |             |      | -      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>dropdown: {<br>&nbsp;&nbsp;maxHeight: 200<br>}</code>                            |
| menuId           |             |      | -      | <code style='white-space: nowrap; padding: 0;'>null</code>                                                                                                                   |
| menuTabindex     |             |      | -      | <code style='white-space: nowrap; padding: 0;'>null</code>                                                                                                                   |
| menuTag          |             |      | -      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>dropdown: {<br>&nbsp;&nbsp;menuTag: "div"<br>}</code>                            |
| mobileBreakpoint |             |      | -      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>dropdown: {<br>&nbsp;&nbsp;mobileBreakpoint: undefined<br>}</code>               |
| mobileModal      |             |      | -      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>dropdown: {<br>&nbsp;&nbsp;mobileModal: true<br>}</code>                         |
| v-model          |             |      | -      |                                                                                                                                                                              |
| override         |             |      | -      |                                                                                                                                                                              |
| position         |             |      | -      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>dropdown: {<br>&nbsp;&nbsp;position: "bottom-left"<br>}</code>                   |
| scrollable       |             |      | -      | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                                  |
| tabindex         |             |      | -      | <code style='white-space: nowrap; padding: 0;'>0</code>                                                                                                                      |
| teleport         |             |      | -      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>dropdown: {<br>&nbsp;&nbsp;teleport: false<br>}</code>                           |
| trapFocus        |             |      | -      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>dropdown: {<br>&nbsp;&nbsp;trapFocus: true<br>}</code>                           |
| triggerTag       |             |      | -      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>dropdown: {<br>&nbsp;&nbsp;triggerTag: "div"<br>}</code>                         |
| triggers         |             |      | -      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>dropdown: {<br>&nbsp;&nbsp;triggers: ["click"]<br>}</code>                       |

### Events

| Event name        | Properties                                                                | Description                                     |
| ----------------- | ------------------------------------------------------------------------- | ----------------------------------------------- |
| update:modelValue | **value** `string \| number \| object \| array` - updated modelValue prop | modelValue prop two-way binding                 |
| update:active     | **value** `boolean` - updated active prop                                 | active prop two-way binding                     |
| change            | **value** `string \| number \| object \| array` - selected value          | on change event - fired after update:modelValue |
| close             | **method** `string` - close method                                        | on close event                                  |
| scroll-start      |                                                                           | the list inside the dropdown reached the start  |
| scroll-end        |                                                                           | the list inside the dropdown reached it's end   |

### Slots

| Name    | Description                                         | Bindings                                                                                             |
| ------- | --------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| trigger | Override the trigger element, default is label prop | **active** `boolean` - dropdown active state                                                         |
| default | Place dropdown items here                           | **active** `boolean` - dropdown active state<br/>**toggle** `boolean` - toggle active state function |

</div>

<div class="vp-doc">

## DropdownItem component

```html
<o-dropdown-item></o-dropdown-item>
```

### Props

| Prop name | Description                                                                                                                                                     | Type                   | Values                           | Default                                                                                                                                                     |
| --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- | -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ariaRole  | Role attribute to be passed to the list item for better accessibility.<br/>Use menuitem only in situations where your dropdown is related to a navigation menu. | string                 | `listitem`, `menuitem`, `button` | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>dropdown: {<br>&nbsp;&nbsp;itemAriaRole: "listitem"<br>}</code> |
| clickable | Item is clickable and emit an event                                                                                                                             | boolean                | -                                | <code style='white-space: nowrap; padding: 0;'>true</code>                                                                                                  |
| disabled  | Item is disabled                                                                                                                                                | boolean                | -                                | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                 |
| label     | Item label, unnecessary when default slot is used                                                                                                               | string                 | -                                |                                                                                                                                                             |
| tabindex  | Set the tabindex attribute on the dropdown item div (-1 to prevent selection via tab key)                                                                       | number\|string         | -                                | <code style='white-space: nowrap; padding: 0;'>0</code>                                                                                                     |
| tag       | Dropdown item tag name                                                                                                                                          | DynamicComponent       | -                                | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>dropdown: {<br>&nbsp;&nbsp;itemTag: "div"<br>}</code>           |
| value     | Item value (it will be used as v-model of wrapper component) - default is an uuid                                                                               | string\|number\|object | -                                | Default function (see source code)                                                                                                                          |

### Events

| Event name | Properties                                                                                    | Description   |
| ---------- | --------------------------------------------------------------------------------------------- | ------------- |
| click      | **value** `string \| number \| object` - value prop data<br/>**event** `event` - Native Event | onclick event |

### Slots

| Name    | Description                               | Bindings |
| ------- | ----------------------------------------- | -------- |
| default | Override the label, default is label prop |          |

</div>

<div class="vp-doc">

</div>
<div class="vp-doc">

## Sass variables

<div class="theme-oruga">

> Current theme ➜ _[Oruga](https://github.com/oruga-ui/theme-oruga)_

| SASS Variable                          | Default                                                                      |
| -------------------------------------- | ---------------------------------------------------------------------------- |
| $dropdown-disabled-opacity             | var(--#{$prefix}base-disabled-opacity)                                       |
| $dropdown-item-active-background-color | var(--#{$prefix}primary)                                                     |
| $dropdown-item-active-color            | var(--#{$prefix}primary-invert)                                              |
| $dropdown-item-color                   | #000000                                                                      |
| $dropdown-item-disabled-opacity        | var( --#{$prefix}base-disabled-opacity)                                      |
| $dropdown-item-font-size               | var(--#{$prefix}base-font-size)                                              |
| $dropdown-item-hover-background-color  | #f5f5f5                                                                      |
| $dropdown-item-hover-color             | #000000                                                                      |
| $dropdown-item-line-height             | var(--#{$prefix}base-line-height)                                            |
| $dropdown-item-padding                 | 0.375rem 1rem                                                                |
| $dropdown-item-font-weight             | 400                                                                          |
| $dropdown-menu-background              | #ffffff                                                                      |
| $dropdown-menu-border-radius           | var(--#{$prefix}base-border-radius)                                          |
| $dropdown-menu-box-shadow              | 0 0.5em 1em -0.125em rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.02) |
| $dropdown-menu-spacer                  | 0px                                                                          |
| $dropdown-menu-margin                  | 0                                                                            |
| $dropdown-menu-padding                 | 0.5rem 0 0.5rem 0                                                            |
| $dropdown-menu-width                   | 12rem                                                                        |
| $dropdown-menu-zindex                  | 50                                                                           |
| $dropdown-mobile-max-height            | calc(100vh - 120px)                                                          |
| $dropdown-mobile-max-width             | 460px                                                                        |
| $dropdown-mobile-overlay-color         | rgba(#000000, 0.86)                                                          |
| $dropdown-mobile-overlay-zindex        | 55                                                                           |
| $dropdown-mobile-width                 | calc(100vw - 40px)                                                           |
| $dropdown-mobile-zindex                | 60                                                                           |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-oruga/tree/main/src/assets/scss/components/_dropdown.scss)

</div><div class="theme-bulma">

> Current theme ➜ _[Bulma](https://github.com/oruga-ui/theme-bulma)_

| SASS Variable                         | Default                                                                                             |
| ------------------------------------- | --------------------------------------------------------------------------------------------------- |
| $dropdown-mobile-breakpoint           | vars.$desktop                                                                                       |
| $dropdown-background-background-color | hsla( #{css.getVar("scheme-h")}, #{css.getVar("scheme-s")}, #{css.getVar("scheme-invert-l")}, 0.86) |
| $dropdown-disabled-opacity            | 0.5                                                                                                 |
| $dropdown-gap                         | 0px                                                                                                 |
| $dropdown-z                           | 40                                                                                                  |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-bulma/tree/main/src/assets/scss/components/_dropdown.scss)

</div><div class="theme-bootstrap">

> Current theme ➜ _[Bootstrap](https://github.com/oruga-ui/theme-bootstrap)_

| SASS Variable                   | Default                |
| ------------------------------- | ---------------------- |
| $dropdown-modal-menu-zindex     | $zindex-modal          |
| $dropdown-modal-backdrop-zindex | $zindex-modal-backdrop |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-bootstrap/tree/main/src/assets/scss/components/_dropdown.scss)

</div>

</div>
