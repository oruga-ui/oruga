---
title: Dropdown
---

# Dropdown

<div class="vp-doc">

> Dropdowns are very versatile, can used as a quick menu or even like a select for discoverable content

</div>
<example-dropdown />

## Class props

<br />

<inspector-dropdown-viewer />

<br />
<br />

<div class="vp-doc">

## Props

| Prop name              | Description                                                                                                                                            | Type                                   | Values                                   | Default                                                                                                                                   |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------- | ---------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| animation              | Custom animation (transition name)                                                                                                                     | string                                 | -                                        | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> dropdown: {<br>&nbsp;&nbsp;animation: 'fade'<br>}</code> |
| appendToBody           | Append dropdown content to body                                                                                                                        | boolean                                | -                                        |                                                                                                                                           |
| appendToBodyCopyParent |                                                                                                                                                        | boolean                                | -                                        |                                                                                                                                           |
| ariaRole               | Role attribute to be passed to list container for better accessibility. Use menu only in situations where your dropdown is related to navigation menus | string                                 | `list`, `menu`, `dialog`                 | null                                                                                                                                      |
| canClose               | Can close dropdown by pressing escape or by clicking outside                                                                                           | array\|boolean                         | `escape`, `outside`                      | true                                                                                                                                      |
| closeOnClick           | Close dropdown when content is clicked                                                                                                                 | boolean                                | -                                        | true                                                                                                                                      |
| disabled               | Dropdown disabled                                                                                                                                      | boolean                                | -                                        |                                                                                                                                           |
| expanded               | Dropdown will be expanded (full-width)                                                                                                                 | boolean                                | -                                        |                                                                                                                                           |
| inline                 | Dropdown content (items) are shown inline, trigger is removed                                                                                          | boolean                                | -                                        |                                                                                                                                           |
| maxHeight              | Max height of dropdown content                                                                                                                         | string\|number                         | -                                        | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> dropdown: {<br>&nbsp;&nbsp;maxHeight: 200<br>}</code>    |
| menuTag                | Dropdown menu tag name                                                                                                                                 | string                                 | -                                        | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> dropdown: {<br>&nbsp;&nbsp;menuTag: 'div'<br>}</code>    |
| mobileBreakpoint       | Mobile breakpoint as max-width value                                                                                                                   | string                                 | -                                        |                                                                                                                                           |
| mobileModal            | Dropdown content (items) are shown into a modal on mobile                                                                                              | boolean                                | -                                        | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> dropdown: {<br>&nbsp;&nbsp;mobileModal: true<br>}</code> |
| multiple               | Allows multiple selections                                                                                                                             | boolean                                | -                                        |                                                                                                                                           |
| override               |                                                                                                                                                        | boolean                                | -                                        |                                                                                                                                           |
| position               | Optional, position of the dropdown relative to the trigger                                                                                             | string                                 | `top-right`, `top-left`, `bottom-left`   |                                                                                                                                           |
| scrollable             | Dropdown content will be scrollable                                                                                                                    | boolean                                | -                                        |                                                                                                                                           |
| trapFocus              | Trap focus inside the dropdown.                                                                                                                        | boolean                                | -                                        | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> dropdown: {<br>&nbsp;&nbsp;trapFocus: true<br>}</code>   |
| triggerTabindex        | Set the tabindex attribute on the dropdown trigger div (-1 to prevent selection via tab key)                                                           | number                                 | -                                        | 0                                                                                                                                         |
| triggers               | Dropdown will be triggered by any events                                                                                                               | array                                  | `click`, `hover`, `contextmenu`, `focus` | ['click']                                                                                                                                 |
| v-model                |                                                                                                                                                        | string\|number\|boolean\|object\|array | -                                        | null                                                                                                                                      |

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

---

## Style

📄 [Full scss file](https://github.com/oruga-ui/oruga/blob/master/packages/oruga/src/scss/components/_dropdown.scss)

| CSS Variable                                  | SASS Variable                           | Default                                                              |
| --------------------------------------------- | --------------------------------------- | -------------------------------------------------------------------- |
| --oruga-dropdown-disabled-opacity             | \$dropdown-disabled-opacity             | \$base-disabled-opacity                                              |
| --oruga-dropdown-item-active-background-color | \$dropdown-item-active-background-color | \$primary                                                            |
| --oruga-dropdown-item-active-color            | \$dropdown-item-active-color            | \$primary-invert                                                     |
| --oruga-dropdown-item-color                   | \$dropdown-item-color                   | #000000                                                              |
| --oruga-dropdown-item-disabled-opacity        | \$dropdown-item-disabled-opacity        | \$base-disabled-opacity                                              |
| --oruga-dropdown-item-font-size               | \$dropdown-item-font-size               | \$base-font-size                                                     |
| --oruga-dropdown-item-hover-background-color  | \$dropdown-item-hover-background-color  | #f5f5f5                                                              |
| --oruga-dropdown-item-hover-color             | \$dropdown-item-hover-color             | #000000                                                              |
| --oruga-dropdown-item-line-height             | \$dropdown-item-line-height             | \$base-line-height                                                   |
| --oruga-dropdown-item-padding                 | \$dropdown-item-padding                 | .375rem 1rem                                                         |
| --oruga-dropdown-item-font-weight             | \$dropdown-item-font-weight             | 400                                                                  |
| --oruga-dropdown-menu-background              | \$dropdown-menu-background              | #ffffff                                                              |
| --oruga-dropdown-menu-border-radius           | \$dropdown-menu-border-radius           | \$base-border-radius                                                 |
| --oruga-dropdown-menu-box-shadow              | \$dropdown-menu-box-shadow              | 0 0.5em 1em -0.125em rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.02) |
| --oruga-dropdown-menu-margin                  | \$dropdown-menu-margin                  | 0                                                                    |
| --oruga-dropdown-menu-padding                 | \$dropdown-menu-padding                 | .5rem 0 .5rem 0                                                      |
| --oruga-dropdown-menu-width                   | \$dropdown-menu-width                   | 12rem                                                                |
| --oruga-dropdown-menu-zindex                  | \$dropdown-menu-zindex                  | 20                                                                   |
| --oruga-dropdown-mobile-max-height            | \$dropdown-mobile-max-height            | calc(100vh - 120px)                                                  |
| --oruga-dropdown-mobile-max-width             | \$dropdown-mobile-max-width             | 460px                                                                |
| --oruga-dropdown-mobile-overlay-color         | \$dropdown-mobile-overlay-color         | rgba(#000000, 0.86)                                                  |
| --oruga-dropdown-mobile-overlay-zindex        | \$dropdown-mobile-overlay-zindex        | 40                                                                   |
| --oruga-dropdown-mobile-width                 | \$dropdown-mobile-width                 | calc(100vw - 40px)                                                   |
| --oruga-dropdown-mobile-zindex                | \$dropdown-mobile-zindex                | 50                                                                   |

</div>
