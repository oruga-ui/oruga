---
sidebarDepth: 2
---

# Dropdown

<div class="vp-doc">

The **Dropdown** component is very versatile and can be used as contextual overlays for displaying lists as a quick menu or even toggleable to allow users to select a value from a list of content options.
Unlike native select elements, the dropdown input allows you to customize both its appearance and behavior.
The component implements the W3C ARIA APG [Combobox Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/).

</div>

<div class="vp-example">

## Examples

<example-dropdown />

</div>

<div class="vp-doc">

## Dropdown component

> Dropdowns are very versatile, can used as a quick menu or even like a select for discoverable content.

```html
<o-dropdown></o-dropdown>
```

### Props

| Prop name        | Description                                                                                                                                                                      | Type                                                                                                             | Values                                                                                           | Default                                                                                                                                                        |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| active           | The active state of the dropdown, use v-model:active to make it two-way binding                                                                                                  | boolean                                                                                                          | -                                                                                                | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                    |
| animation        | Custom animation (transition name)                                                                                                                                               | string                                                                                                           | -                                                                                                | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>dropdown: {<br>&nbsp;&nbsp;animation: "fade"<br>}</code>           |
| ariaLabel        | Accessibility aria-label to be passed to the trigger element - usefull if selectable                                                                                             | string                                                                                                           | -                                                                                                | <code style='white-space: nowrap; padding: 0;'></code>                                                                                                         |
| checkScroll      | Makes the component check if menu reached scroll start or end and emit scroll events.                                                                                            | boolean                                                                                                          | -                                                                                                | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>dropdown: {<br>&nbsp;&nbsp;checkScroll: false<br>}</code>          |
| closeOnOutside   | Close Dropdown when clicked outside                                                                                                                                              | boolean                                                                                                          | -                                                                                                | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>dropdown: {<br>&nbsp;&nbsp;closeOnOutside: true<br>}</code>        |
| closeOnScroll    | Close Dropdown when page get scrolled                                                                                                                                            | boolean                                                                                                          | -                                                                                                | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>dropdown: {<br>&nbsp;&nbsp;closeOnScroll: false<br>}</code>        |
| delay            | Dropdown delay before it appears (number in ms)                                                                                                                                  | number                                                                                                           | -                                                                                                |                                                                                                                                                                |
| desktopModal     | Dropdown content (items) are shown into a modal on desktop                                                                                                                       | boolean                                                                                                          | -                                                                                                | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>dropdown: {<br>&nbsp;&nbsp;desktopModal: false<br>}</code>         |
| disabled         | Dropdown is disabled                                                                                                                                                             | boolean                                                                                                          | -                                                                                                | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                    |
| expanded         | Dropdown will be expanded (full-width)                                                                                                                                           | boolean                                                                                                          | -                                                                                                | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                    |
| inline           | Dropdown content (items) are shown inline, trigger is removed                                                                                                                    | boolean                                                                                                          | -                                                                                                | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                    |
| keepFirst        | The first option will always be pre-selected (easier to just hit enter or tab)                                                                                                   | boolean                                                                                                          | -                                                                                                | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>dropdown: {<br>&nbsp;&nbsp;keepFirst: false<br>}</code>            |
| keepOpen         | Keep dropdown list open when item get selected                                                                                                                                   | boolean                                                                                                          | -                                                                                                | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>dropdown: {<br>&nbsp;&nbsp;keepOpen: false<br>}</code>             |
| label            | Trigger label, unnecessary when trgger slot is used                                                                                                                              | string                                                                                                           | -                                                                                                |                                                                                                                                                                |
| labelledby       | Ensures that each input has an accessible name.                                                                                                                                  | string                                                                                                           | -                                                                                                | <code style='white-space: nowrap; padding: 0;'></code>                                                                                                         |
| maxHeight        | Max height of dropdown content                                                                                                                                                   | number \| string                                                                                                 | -                                                                                                | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>dropdown: {<br>&nbsp;&nbsp;maxHeight: 200<br>}</code>              |
| menuId           | HTML element Id of the dropdown menu element                                                                                                                                     | string                                                                                                           | -                                                                                                | <code style='white-space: nowrap; padding: 0;'>useId()</code>                                                                                                  |
| menuTag          | Dropdown menu tag name                                                                                                                                                           | DynamicComponent                                                                                                 | -                                                                                                | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>dropdown: {<br>&nbsp;&nbsp;menuTag: "div"<br>}</code>              |
| mobileBreakpoint | Mobile breakpoint as `max-width` value                                                                                                                                           | string                                                                                                           | -                                                                                                | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>dropdown: {<br>&nbsp;&nbsp;mobileBreakpoint: undefined<br>}</code> |
| mobileModal      | Dropdown content (items) are shown into a modal on mobile                                                                                                                        | boolean                                                                                                          | -                                                                                                | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>dropdown: {<br>&nbsp;&nbsp;mobileModal: true<br>}</code>           |
| v-model          | The selected option value                                                                                                                                                        | unknown                                                                                                          | -                                                                                                |                                                                                                                                                                |
| multiple         | Allows multiple selections - converts the `modelValue` into an array                                                                                                             | boolean                                                                                                          | -                                                                                                | <code style='white-space: nowrap; padding: 0;'></code>                                                                                                         |
| options          | Dropdown options, unnecessary when default slot is used                                                                                                                          | OptionsPropWithGroups&lt;unknown&gt;                                                                             | -                                                                                                |                                                                                                                                                                |
| override         | Override existing theme classes completely                                                                                                                                       | boolean                                                                                                          | -                                                                                                |                                                                                                                                                                |
| position         | Position of the dropdown relative to the trigger                                                                                                                                 | "auto" \| "bottom-left" \| "bottom-right" \| "bottom" \| "left" \| "right" \| "top-left" \| "top-right" \| "top" | `auto`, `top`, `bottom`, `left`, `right`, `top-right`, `top-left`, `bottom-left`, `bottom-right` | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>dropdown: {<br>&nbsp;&nbsp;position: "bottom-left"<br>}</code>     |
| scrollable       | Dropdown content will be scrollable                                                                                                                                              | boolean                                                                                                          | -                                                                                                | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                    |
| selectOnClose    | Select current focused item when closed                                                                                                                                          | boolean                                                                                                          | -                                                                                                | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>dropdown: {<br>&nbsp;&nbsp;selectOnClose: false<br>}</code>        |
| selectOnFocus    | Select current focused item when focused                                                                                                                                         | boolean                                                                                                          | -                                                                                                | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>dropdown: {<br>&nbsp;&nbsp;selectOnFocus: false<br>}</code>        |
| selectable       | Enables item selection                                                                                                                                                           | boolean                                                                                                          | -                                                                                                | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                    |
| teleport         | Append the component to another part of the DOM.<br/>Set `true` to append the component to the body.<br/>In addition, any CSS selector string or an actual DOM node can be used. | boolean \| object \| string                                                                                      | -                                                                                                | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>dropdown: {<br>&nbsp;&nbsp;teleport: false<br>}</code>             |
| triggerTag       | Dropdown trigger tag name                                                                                                                                                        | DynamicComponent                                                                                                 | -                                                                                                | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>dropdown: {<br>&nbsp;&nbsp;triggerTag: "div"<br>}</code>           |
| triggers         | Dropdown will be triggered by any events                                                                                                                                         | ("click" \| "contextmenu" \| "focus" \| "keydown" \| "hover")[]                                                  | `click`, `hover`, `contextmenu`, `focus`                                                         | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>dropdown: {<br>&nbsp;&nbsp;triggers: ["click"]<br>}</code>         |

### Events

| Event name         | Properties                                                              | Description                                      |
| ------------------ | ----------------------------------------------------------------------- | ------------------------------------------------ |
| update:model-value | **value** `T \| T[]` - updated modelValue prop                          | modelValue prop two-way binding                  |
| update:active      | **value** `boolean` - updated active prop                               | active prop two-way binding                      |
| select             | **value** `T` - selected value                                          | on select event - fired before update:modelValue |
| change             | **value** `T \| T[]` - selected value                                   |
| open               | **method** `string` - open method<br/>**event** `Event` - native event  | on open event                                    |
| close              | **method** `string` - close method<br/>**event** `Event` - native event | on close event                                   |
| scroll-start       |                                                                         | the list inside the dropdown reached the start   |
| scroll-end         |                                                                         | the list inside the dropdown reached it's end    |

### Slots

| Name    | Description                                                                                  | Bindings                                                                                                                                                 |
| ------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| trigger | Override the trigger element, default is label prop                                          | **active** `boolean` - dropdown active state<br/>**value** `T \| T[]` - the selected value<br/>**toggle** `() =&gt; void` - toggle dropdown active state |
| default | Place dropdown items here                                                                    | **active** `boolean` - dropdown active state<br/><br/>**toggle** `() =&gt; void` - toggle dropdown active state                                          |
| before  | Place extra `o-dropdown-item` components here, even if you have some options defined by prop |                                                                                                                                                          |
| group   | Override the option group                                                                    | **group** `object` - options group<br/>**index** `number` - option index                                                                                 |
| after   | Place extra `o-dropdown-item` components here, even if you have some options defined by prop |                                                                                                                                                          |

</div>

<div class="vp-doc">

## DropdownItem component

> An option item used by the dropdown component.

```html
<o-dropdown-item></o-dropdown-item>
```

### Props

| Prop name | Description                                                                       | Type                   | Values | Default                                                                                                                                           |
| --------- | --------------------------------------------------------------------------------- | ---------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| clickable | Item is clickable and emit an event                                               | boolean                | -      | <code style='white-space: nowrap; padding: 0;'>true</code>                                                                                        |
| disabled  | Item is disabled                                                                  | boolean                | -      | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                       |
| hidden    | Define whether the item is visible or not                                         | boolean                | -      | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                       |
| label     | Item label, unnecessary when default slot is used                                 | string                 | -      |                                                                                                                                                   |
| override  | Override existing theme classes completely                                        | boolean                | -      |                                                                                                                                                   |
| tag       | Dropdown item tag name                                                            | DynamicComponent       | -      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>dropdown: {<br>&nbsp;&nbsp;itemTag: "div"<br>}</code> |
| value     | Item value (it will be used as v-model of wrapper component) - default is an uuid | string\|number\|object | -      |                                                                                                                                                   |

### Events

| Event name | Properties                                                                                    | Description   |
| ---------- | --------------------------------------------------------------------------------------------- | ------------- |
| click      | **value** `string \| number \| object` - value prop data<br/>**event** `event` - Native Event | onclick event |

### Slots

| Name    | Description                               | Bindings |
| ------- | ----------------------------------------- | -------- |
| default | Override the label, default is label prop |          |

</div>

<div class="vp-example">

## Class Inspector

<inspector-dropdownitem-viewer />

</div>

<div class="vp-example">

## Class Inspector

<inspector-dropdown-viewer />

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

</div>
<div class="theme-bulma">

> Current theme ➜ _[Bulma](https://github.com/oruga-ui/theme-bulma)_

| SASS Variable                         | Default                                                                                             |
| ------------------------------------- | --------------------------------------------------------------------------------------------------- |
| $dropdown-mobile-breakpoint           | vars.$desktop                                                                                       |
| $dropdown-background-background-color | hsla( #{css.getVar("scheme-h")}, #{css.getVar("scheme-s")}, #{css.getVar("scheme-invert-l")}, 0.86) |
| $dropdown-disabled-opacity            | 0.5                                                                                                 |
| $dropdown-gap                         | 0px                                                                                                 |
| $dropdown-z                           | 40                                                                                                  |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-bulma/tree/main/src/assets/scss/components/_dropdown.scss)

</div>
<div class="theme-bootstrap">

> Current theme ➜ _[Bootstrap](https://github.com/oruga-ui/theme-bootstrap)_

| SASS Variable                   | Default                |
| ------------------------------- | ---------------------- |
| $dropdown-modal-menu-zindex     | $zindex-modal          |
| $dropdown-modal-backdrop-zindex | $zindex-modal-backdrop |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-bootstrap/tree/main/src/assets/scss/components/_dropdown.scss)

</div>

</div>
