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

> Dropdowns are very versatile, can used as a quick menu or even like a select for discoverable content

```html
<o-dropdown></o-dropdown>
```

### Props

| Prop name    | Description                                                                                                                                                      | Type                                   | Values                                                 | Default                                                                                                                                                    |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- | ------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| active       | The active state of the dropdown                                                                                                                                 | boolean                                | -                                                      | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                |
| animation    | Custom animation (transition name)                                                                                                                               | string                                 | -                                                      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>dropdown: {<br>&nbsp;&nbsp;animation: "fade"<br>}</code>       |
| appendToBody | Append dropdown content to body                                                                                                                                  | boolean                                | -                                                      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>autocomplete: {<br>&nbsp;&nbsp;appendToBody: false<br>}</code> |
| ariaRole     | Role attribute to be passed to the list container for better accessibility.<br/>Use menu only in situations where your dropdown is related to a navigation menu. | string                                 | `list`, `menu`, `dialog`                               | <code style='white-space: nowrap; padding: 0;'>"list"</code>                                                                                               |
| canClose     | Can close dropdown by pressing escape or by clicking outside                                                                                                     | array\|boolean                         | `escape`, `outside`                                    | <code style='white-space: nowrap; padding: 0;'>true</code>                                                                                                 |
| closeOnClick | Close dropdown when content is clicked                                                                                                                           | boolean                                | -                                                      | <code style='white-space: nowrap; padding: 0;'>true</code>                                                                                                 |
| disabled     | Dropdown is disabled                                                                                                                                             | boolean                                | -                                                      | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                |
| expanded     | Dropdown will be expanded (full-width)                                                                                                                           | boolean                                | -                                                      | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                |
| inline       | Dropdown content (items) are shown inline, trigger is removed                                                                                                    | boolean                                | -                                                      | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                |
| label        | Trigger label, unnecessary when trgger slot is used                                                                                                              | string                                 | -                                                      |                                                                                                                                                            |
| maxHeight    | Max height of dropdown content                                                                                                                                   | number                                 | -                                                      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>dropdown: {<br>&nbsp;&nbsp;maxHeight: 200<br>}</code>          |
| menuTag      | Dropdown menu tag name                                                                                                                                           | string \| Component                    | -                                                      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>dropdown: {<br>&nbsp;&nbsp;menuTag: "div"<br>}</code>          |
| mobileModal  | Dropdown content (items) are shown into a modal on mobile                                                                                                        | boolean                                | -                                                      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>dropdown: {<br>&nbsp;&nbsp;mobileModal: true<br>}</code>       |
| multiple     | Allows multiple selections                                                                                                                                       | boolean                                | -                                                      | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                |
| position     | Optional, position of the dropdown relative to the trigger                                                                                                       | string                                 | `top-right`, `top-left`, `bottom-left`, `bottom-right` |                                                                                                                                                            |
| scrollable   | Dropdown content will be scrollable                                                                                                                              | boolean                                | -                                                      | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                |
| tabindex     | Set the tabindex attribute on the dropdown trigger div (-1 to prevent selection via tab key)                                                                     | number                                 | -                                                      | <code style='white-space: nowrap; padding: 0;'>0</code>                                                                                                    |
| trapFocus    | Trap focus inside the dropdown.                                                                                                                                  | boolean                                | -                                                      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>dropdown: {<br>&nbsp;&nbsp;trapFocus: true<br>}</code>         |
| triggerTag   | Dropdown trigger tag name                                                                                                                                        | string \| Component                    | -                                                      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>dropdown: {<br>&nbsp;&nbsp;triggerTag: "div"<br>}</code>       |
| triggers     | Dropdown will be triggered by any events                                                                                                                         | string[]                               | `click`, `hover`, `contextmenu`, `focus`               | Default function (see source code)                                                                                                                         |
| v-model      |                                                                                                                                                                  | string\|number\|boolean\|object\|array | -                                                      |                                                                                                                                                            |

### Events

| Event name        | Properties                                                                     | Description                     |
| ----------------- | ------------------------------------------------------------------------------ | ------------------------------- |
| update:modelValue | **value** `[String, Number, Boolean, Object, Array]` - updated modelValue prop | modelValue prop two-way binding |
| update:active     | **value** `boolean` - updated active prop                                      | active prop two-way binding     |
| change            | **value** `any` - selected value                                               | change event                    |

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

| Prop name | Description                                                                                                                                                          | Type                | Values                 | Default                                                                                                                                           |
| --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| ariaRole  | Role attribute to be passed to the item container for better accessibility.<br/>Use menuitem only in situations where your dropdown is related to a navigation menu. | string              | `listitem`, `menuitem` | <code style='white-space: nowrap; padding: 0;'>"listitem"</code>                                                                                  |
| clickable | Item is clickable and emit an event                                                                                                                                  | boolean             | -                      | <code style='white-space: nowrap; padding: 0;'>true</code>                                                                                        |
| disabled  | Item is disabled                                                                                                                                                     | boolean             | -                      | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                       |
| label     | Item label, unnecessary when default slot is used                                                                                                                    | string              | -                      |                                                                                                                                                   |
| tabindex  | Set the tabindex attribute on the dropdown item div (-1 to prevent selection via tab key)                                                                            | number\|string      | -                      | <code style='white-space: nowrap; padding: 0;'>0</code>                                                                                           |
| tag       | Dropdown item tag name                                                                                                                                               | string \| Component | -                      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>dropdown: {<br>&nbsp;&nbsp;itemTag: "div"<br>}</code> |
| value     | The value that will be returned on events and v-model                                                                                                                | T                   | -                      | Default function (see source code)                                                                                                                |

### Events

| Event name | Properties                                                                                                  | Description   |
| ---------- | ----------------------------------------------------------------------------------------------------------- | ------------- |
| click      | **value** `[String, Number, Boolean, Object, Array]` - value prop data<br/>**event** `event` - Native Event | onclick event |

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

> Current theme ➜ _[Oruga Base](https://github.com/oruga-ui/theme-oruga)_

| SASS Variable                          | Default                                                                      |
| -------------------------------------- | ---------------------------------------------------------------------------- |
| $dropdown-disabled-opacity             | $base-disabled-opacity                                                       |
| $dropdown-item-active-background-color | $primary                                                                     |
| $dropdown-item-active-color            | $primary-invert                                                              |
| $dropdown-item-color                   | #000000                                                                      |
| $dropdown-item-disabled-opacity        | $base-disabled-opacity                                                       |
| $dropdown-item-font-size               | $base-font-size                                                              |
| $dropdown-item-hover-background-color  | #f5f5f5                                                                      |
| $dropdown-item-hover-color             | #000000                                                                      |
| $dropdown-item-line-height             | $base-line-height                                                            |
| $dropdown-item-padding                 | 0.375rem 1rem                                                                |
| $dropdown-item-font-weight             | 400                                                                          |
| $dropdown-menu-background              | #ffffff                                                                      |
| $dropdown-menu-border-radius           | $base-border-radius                                                          |
| $dropdown-menu-box-shadow              | 0 0.5em 1em -0.125em rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.02) |
| $dropdown-menu-margin                  | 0                                                                            |
| $dropdown-menu-padding                 | 0.5rem 0 0.5rem 0                                                            |
| $dropdown-menu-width                   | 12rem                                                                        |
| $dropdown-menu-zindex                  | 20                                                                           |
| $dropdown-mobile-max-height            | calc(100vh - 120px)                                                          |
| $dropdown-mobile-max-width             | 460px                                                                        |
| $dropdown-mobile-overlay-color         | rgba(#000000, 0.86)                                                          |
| $dropdown-mobile-overlay-zindex        | 40                                                                           |
| $dropdown-mobile-width                 | calc(100vw - 40px)                                                           |
| $dropdown-mobile-zindex                | 50                                                                           |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-oruga/tree/main/src/assets/scss/components/_dropdown.scss)

</div><div class="theme-orugafull">

> Current theme ➜ _[Oruga Full](https://github.com/oruga-ui/theme-oruga)_

| SASS Variable                          | Default                                                                      |
| -------------------------------------- | ---------------------------------------------------------------------------- |
| $dropdown-disabled-opacity             | $base-disabled-opacity                                                       |
| $dropdown-item-active-background-color | $primary                                                                     |
| $dropdown-item-active-color            | $primary-invert                                                              |
| $dropdown-item-color                   | #000000                                                                      |
| $dropdown-item-disabled-opacity        | $base-disabled-opacity                                                       |
| $dropdown-item-font-size               | $base-font-size                                                              |
| $dropdown-item-hover-background-color  | #f5f5f5                                                                      |
| $dropdown-item-hover-color             | #000000                                                                      |
| $dropdown-item-line-height             | $base-line-height                                                            |
| $dropdown-item-padding                 | 0.375rem 1rem                                                                |
| $dropdown-item-font-weight             | 400                                                                          |
| $dropdown-menu-background              | #ffffff                                                                      |
| $dropdown-menu-border-radius           | $base-border-radius                                                          |
| $dropdown-menu-box-shadow              | 0 0.5em 1em -0.125em rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.02) |
| $dropdown-menu-margin                  | 0                                                                            |
| $dropdown-menu-padding                 | 0.5rem 0 0.5rem 0                                                            |
| $dropdown-menu-width                   | 12rem                                                                        |
| $dropdown-menu-zindex                  | 20                                                                           |
| $dropdown-mobile-max-height            | calc(100vh - 120px)                                                          |
| $dropdown-mobile-max-width             | 460px                                                                        |
| $dropdown-mobile-overlay-color         | rgba(#000000, 0.86)                                                          |
| $dropdown-mobile-overlay-zindex        | 40                                                                           |
| $dropdown-mobile-width                 | calc(100vw - 40px)                                                           |
| $dropdown-mobile-zindex                | 50                                                                           |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-oruga/tree/main/src/assets/scss/components/_dropdown.scss)

</div><div class="theme-bulma">

> Current theme ➜ _[Bulma](https://github.com/oruga-ui/theme-bulma)_

<p>The theme does not have any custom variables for this component.</p>
</div><div class="theme-bootstrap">

> Current theme ➜ _[Bootstrap](https://github.com/oruga-ui/theme-bootstrap)_

| SASS Variable         | Default       |
| --------------------- | ------------- |
| $dropdown-menu-zindex | $zindex-modal |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-bootstrap/tree/main/src/assets/scss/components/_dropdown.scss)

</div>

</div>
