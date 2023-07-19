---
title: Dropdown
---

# Dropdown

<div class="vp-doc">

> Dropdowns are very versatile, can used as a quick menu or even like a select for discoverable content

<Carbon />
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

```html
<o-dropdown></o-dropdown>
```

### Props

| Prop name              | Description                                                                                                                                            | Type                                   | Values                                   | Default                                                                                                                                               |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------- | ---------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| animation              | Custom animation (transition name)                                                                                                                     | string                                 | -                                        | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'> dropdown: {<br>&nbsp;&nbsp;animation: 'fade'<br>}</code> |
| appendToBody           | Append dropdown content to body                                                                                                                        | boolean                                | -                                        |                                                                                                                                                       |
| appendToBodyCopyParent |                                                                                                                                                        | boolean                                | -                                        |                                                                                                                                                       |
| ariaRole               | Role attribute to be passed to list container for better accessibility. Use menu only in situations where your dropdown is related to navigation menus | string                                 | `list`, `menu`, `dialog`                 | null                                                                                                                                                  |
| canClose               | Can close dropdown by pressing escape or by clicking outside                                                                                           | array\|boolean                         | `escape`, `outside`                      | true                                                                                                                                                  |
| closeOnClick           | Close dropdown when content is clicked                                                                                                                 | boolean                                | -                                        | true                                                                                                                                                  |
| disabled               | Dropdown disabled                                                                                                                                      | boolean                                | -                                        |                                                                                                                                                       |
| expanded               | Dropdown will be expanded (full-width)                                                                                                                 | boolean                                | -                                        |                                                                                                                                                       |
| inline                 | Dropdown content (items) are shown inline, trigger is removed                                                                                          | boolean                                | -                                        |                                                                                                                                                       |
| maxHeight              | Max height of dropdown content                                                                                                                         | string\|number                         | -                                        | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'> dropdown: {<br>&nbsp;&nbsp;maxHeight: 200<br>}</code>    |
| menuTag                | Dropdown menu tag name                                                                                                                                 | string \| Component                    | -                                        | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'> dropdown: {<br>&nbsp;&nbsp;menuTag: 'div'<br>}</code>    |
| mobileBreakpoint       | Mobile breakpoint as max-width value                                                                                                                   | string                                 | -                                        |                                                                                                                                                       |
| mobileModal            | Dropdown content (items) are shown into a modal on mobile                                                                                              | boolean                                | -                                        | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'> dropdown: {<br>&nbsp;&nbsp;mobileModal: true<br>}</code> |
| multiple               | Allows multiple selections                                                                                                                             | boolean                                | -                                        |                                                                                                                                                       |
| override               |                                                                                                                                                        | boolean                                | -                                        |                                                                                                                                                       |
| position               | Optional, position of the dropdown relative to the trigger                                                                                             | string                                 | `top-right`, `top-left`, `bottom-left`   |                                                                                                                                                       |
| scrollable             | Dropdown content will be scrollable                                                                                                                    | boolean                                | -                                        |                                                                                                                                                       |
| trapFocus              | Trap focus inside the dropdown.                                                                                                                        | boolean                                | -                                        | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'> dropdown: {<br>&nbsp;&nbsp;trapFocus: true<br>}</code>   |
| triggerTabindex        | Set the tabindex attribute on the dropdown trigger div (-1 to prevent selection via tab key)                                                           | number                                 | -                                        | 0                                                                                                                                                     |
| triggers               | Dropdown will be triggered by any events                                                                                                               | array                                  | `click`, `hover`, `contextmenu`, `focus` | ['click']                                                                                                                                             |
| v-model                |                                                                                                                                                        | string\|number\|boolean\|object\|array | -                                        | null                                                                                                                                                  |

### Events

| Event name        | Properties | Description |
| ----------------- | ---------- | ----------- |
| update:modelValue |            |
| active-change     |            |
| change            |            |

### Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| trigger |             |          |
| default |             |          |

</div>

<div class="vp-doc">

## DropdownItem component

```html
<o-dropdown-item></o-dropdown-item>
```

### Props

| Prop name | Description                                           | Type                                   | Values | Default                                                                                                                                            |
| --------- | ----------------------------------------------------- | -------------------------------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| ariaRole  |                                                       | string                                 | -      | ''                                                                                                                                                 |
| clickable | Item is clickable and emit an event                   | boolean                                | -      | true                                                                                                                                               |
| disabled  | Item is disabled                                      | boolean                                | -      |                                                                                                                                                    |
| override  |                                                       | boolean                                | -      |                                                                                                                                                    |
| tabindex  |                                                       | number\|string                         | -      | 0                                                                                                                                                  |
| tag       | Dropdown item tag name                                | string \| Component                    | -      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'> dropdown: {<br>&nbsp;&nbsp;itemTag: 'div'<br>}</code> |
| value     | The value that will be returned on events and v-model | string\|number\|boolean\|object\|array | -      |                                                                                                                                                    |

### Events

| Event name | Properties | Description |
| ---------- | ---------- | ----------- |
| click      |            |

### Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| default |             |          |

</div>

<div class="vp-doc">

</div>
<div class="vp-doc">

## Sass variables

<div class="theme-orugabase">

> Current theme ➜ _[Oruga Base](https://github.com/oruga-ui/oruga)_

| SASS Variable                          | Default                                                              |
| -------------------------------------- | -------------------------------------------------------------------- |
| $dropdown-disabled-opacity             | $base-disabled-opacity                                               |
| $dropdown-item-active-background-color | $primary                                                             |
| $dropdown-item-active-color            | $primary-invert                                                      |
| $dropdown-item-color                   | #000000                                                              |
| $dropdown-item-disabled-opacity        | $base-disabled-opacity                                               |
| $dropdown-item-font-size               | $base-font-size                                                      |
| $dropdown-item-hover-background-color  | #f5f5f5                                                              |
| $dropdown-item-hover-color             | #000000                                                              |
| $dropdown-item-line-height             | $base-line-height                                                    |
| $dropdown-item-padding                 | .375rem 1rem                                                         |
| $dropdown-item-font-weight             | 400                                                                  |
| $dropdown-menu-background              | #ffffff                                                              |
| $dropdown-menu-border-radius           | $base-border-radius                                                  |
| $dropdown-menu-box-shadow              | 0 0.5em 1em -0.125em rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.02) |
| $dropdown-menu-margin                  | 0                                                                    |
| $dropdown-menu-padding                 | .5rem 0 .5rem 0                                                      |
| $dropdown-menu-width                   | 12rem                                                                |
| $dropdown-menu-zindex                  | 20                                                                   |
| $dropdown-mobile-max-height            | calc(100vh - 120px)                                                  |
| $dropdown-mobile-max-width             | 460px                                                                |
| $dropdown-mobile-overlay-color         | rgba(#000000, 0.86)                                                  |
| $dropdown-mobile-overlay-zindex        | 40                                                                   |
| $dropdown-mobile-width                 | calc(100vw - 40px)                                                   |
| $dropdown-mobile-zindex                | 50                                                                   |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-oruga/tree/main/src/assets/scss/components/_dropdown.scss)

</div><div class="theme-orugafull">

> Current theme ➜ _[Oruga Full](https://github.com/oruga-ui/oruga)_

| SASS Variable                          | Default                                                              |
| -------------------------------------- | -------------------------------------------------------------------- |
| $dropdown-disabled-opacity             | $base-disabled-opacity                                               |
| $dropdown-item-active-background-color | $primary                                                             |
| $dropdown-item-active-color            | $primary-invert                                                      |
| $dropdown-item-color                   | #000000                                                              |
| $dropdown-item-disabled-opacity        | $base-disabled-opacity                                               |
| $dropdown-item-font-size               | $base-font-size                                                      |
| $dropdown-item-hover-background-color  | #f5f5f5                                                              |
| $dropdown-item-hover-color             | #000000                                                              |
| $dropdown-item-line-height             | $base-line-height                                                    |
| $dropdown-item-padding                 | .375rem 1rem                                                         |
| $dropdown-item-font-weight             | 400                                                                  |
| $dropdown-menu-background              | #ffffff                                                              |
| $dropdown-menu-border-radius           | $base-border-radius                                                  |
| $dropdown-menu-box-shadow              | 0 0.5em 1em -0.125em rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.02) |
| $dropdown-menu-margin                  | 0                                                                    |
| $dropdown-menu-padding                 | .5rem 0 .5rem 0                                                      |
| $dropdown-menu-width                   | 12rem                                                                |
| $dropdown-menu-zindex                  | 20                                                                   |
| $dropdown-mobile-max-height            | calc(100vh - 120px)                                                  |
| $dropdown-mobile-max-width             | 460px                                                                |
| $dropdown-mobile-overlay-color         | rgba(#000000, 0.86)                                                  |
| $dropdown-mobile-overlay-zindex        | 40                                                                   |
| $dropdown-mobile-width                 | calc(100vw - 40px)                                                   |
| $dropdown-mobile-zindex                | 50                                                                   |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-oruga/tree/main/src/assets/scss/components/_dropdown.scss)

</div><div class="theme-bulma">

> Current theme ➜ _[Bulma](https://github.com/oruga-ui/theme-bulma)_

<p> The theme does not have any custom variables for this component. </p>
</div><div class="theme-bootstrap">

> Current theme ➜ _[Bootstrap](https://github.com/oruga-ui/theme-bootstrap)_

| SASS Variable         | Default       |
| --------------------- | ------------- |
| $dropdown-menu-zindex | $zindex-modal |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-bootstrap/tree/main/src/assets/scss/components/_dropdown.scss)

</div>

</div>
