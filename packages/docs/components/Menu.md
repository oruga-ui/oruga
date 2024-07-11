# Menu

<div class="vp-doc">

> A simple menu

</div>

<div class="vp-example">

## Examples

<example-menu />

</div>
<div class="vp-example">

## Class props

<inspector-menu-viewer />

</div>

<div class="vp-doc">

## Menu component

> A simple menu

```html
<o-menu></o-menu>
```

### Props

| Prop name | Description                                                                                                                                                      | Type    | Values                                            | Default                                                                                                                                            |
| --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | ------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| accordion | If sub menu items are collapsible                                                                                                                                | boolean | -                                                 | <code style='white-space: nowrap; padding: 0;'>true</code>                                                                                         |
| activable | If the menu items are clickable                                                                                                                                  | boolean | -                                                 | <code style='white-space: nowrap; padding: 0;'>true</code>                                                                                         |
| ariaRole  | Role attribute to be passed to the list container for better accessibility.<br/>Use menu only in situations where your dropdown is related to a navigation menu. | string  | `list`, `menu`, `dialog`                          | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>menu: {<br>&nbsp;&nbsp;ariaRole: "menu"<br>}</code>    |
| icon      | Icon to be shown                                                                                                                                                 | string  | -                                                 |                                                                                                                                                    |
| iconPack  | Icon pack to use                                                                                                                                                 | string  | `mdi`, `fa`, `fas and any other custom icon pack` | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>menu: {<br>&nbsp;&nbsp;iconPack: undefined<br>}</code> |
| iconSize  | Icon size                                                                                                                                                        | string  | `small`, `medium`, `large`                        | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>menu: {<br>&nbsp;&nbsp;iconSize: undefined<br>}</code> |
| label     | Menu label                                                                                                                                                       | string  | -                                                 |                                                                                                                                                    |
| override  | Override existing theme classes completely                                                                                                                       | boolean | -                                                 |                                                                                                                                                    |

### Slots

| Name    | Description             | Bindings |
| ------- | ----------------------- | -------- |
| label   | Override icon and label |          |
| default | Place menu items here   |          |

</div>

<div class="vp-doc">

## MenuItem component

> A menu list item

```html
<o-menu-item></o-menu-item>
```

### Props

| Prop name | Description                                                                      | Type             | Values                                            | Default                                                                                                                                                 |
| --------- | -------------------------------------------------------------------------------- | ---------------- | ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| active    | The active state of the menu item, use v-model:active to make it two-way binding | boolean          | -                                                 | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                             |
| animation | Transition name to apply on menu list                                            | string           | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>menu: {<br>&nbsp;&nbsp;animation: "slide"<br>}</code>       |
| ariaRole  | Role attribute to be passed to the list item for better accessibility.           | string           | `listitem`, `menuitem`                            | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>menu: {<br>&nbsp;&nbsp;itemAriaRole: "menuitem"<br>}</code> |
| disabled  | Menu item will be disabled                                                       | boolean          | -                                                 | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                             |
| expanded  | Menu item will be expanded                                                       | boolean          | -                                                 | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                             |
| icon      | Icon to be shown                                                                 | string           | -                                                 |                                                                                                                                                         |
| iconPack  | Icon pack to use                                                                 | string           | `mdi`, `fa`, `fas and any other custom icon pack` | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>menu: {<br>&nbsp;&nbsp;iconPack: undefined<br>}</code>      |
| iconSize  | Icon size                                                                        | string           | `small`, `medium`, `large`                        | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>menu: {<br>&nbsp;&nbsp;iconSize: undefined<br>}</code>      |
| label     | Menu item label                                                                  | string           | -                                                 |                                                                                                                                                         |
| override  | Override existing theme classes completely                                       | boolean          | -                                                 |                                                                                                                                                         |
| tag       | Menu item tag name                                                               | DynamicComponent | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>menu: {<br>&nbsp;&nbsp;menuTag: "button"<br>}</code>        |

### Events

| Event name      | Properties                                  | Description                   |
| --------------- | ------------------------------------------- | ----------------------------- |
| update:active   | **value** `boolean` - updated active prop   | active prop two-way binding   |
| update:expanded | **value** `boolean` - updated expanded prop | expanded prop two-way binding |

### Slots

| Name    | Description           | Bindings                                                                                  |
| ------- | --------------------- | ----------------------------------------------------------------------------------------- |
| label   | Override label        | **expanded** `boolean` - item expanded state<br/>**active** `boolean` - item active state |
| default | Place menu items here |                                                                                           |

</div>

<div class="vp-doc">

</div>
<div class="vp-doc">

## Sass variables

<div class="theme-oruga">

> Current theme ➜ _[Oruga](https://github.com/oruga-ui/theme-oruga)_

| SASS Variable                      | Default            |
| ---------------------------------- | ------------------ |
| $menu-item-color                   | $grey-dark         |
| $menu-item-hover-color             | $black             |
| $menu-item-hover-background-color  | $grey-light        |
| $menu-item-active-color            | $primary-invert    |
| $menu-item-active-background-color | $primary           |
| $menu-item-disabled-color          | $grey-light        |
| $menu-list-border-left             | 1px solid $primary |
| $menu-list-line-height             | 1.25em             |
| $menu-item-padding                 | 0.5em 0.75em       |
| $menu-nested-list-margin           | 0.75em             |
| $menu-nested-list-padding-left     | 0.75em             |
| $menu-label-color                  | $grey              |
| $menu-label-font-size              | 0.75em             |
| $menu-label-spacing                | 1em                |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-oruga/tree/main/src/assets/scss/components/_menu.scss)

</div><div class="theme-bulma">

> Current theme ➜ _[Bulma](https://github.com/oruga-ui/theme-bulma)_

<p>The theme does not have any custom variables for this component.</p>
</div><div class="theme-bootstrap">

> Current theme ➜ _[Bootstrap](https://github.com/oruga-ui/theme-bootstrap)_

| SASS Variable              | Default                     |
| -------------------------- | --------------------------- |
| $menu-label-bg             | transparent                 |
| $menu-label-color          | var(--#{$prefix}body-color) |
| $menu-label-font-size      | 0.75em                      |
| $menu-list-line-height     | 1.25em                      |
| $menu-item-padding         | 0.5em 0.75em                |
| $menu-item-bg              | transparent                 |
| $menu-item-color           | var(--#{$prefix}body-color) |
| $menu-item-active-bg       | var(--#{$prefix}primary)    |
| $menu-item-active-color    | var(--#{$prefix}white)      |
| $menu-item-disabled-bg     | transparent                 |
| $menu-item-disabled-color  | var(--#{$prefix}secondary)  |
| $menu-icon-spacer          | 0.5rem                      |
| $menu-submenu-border-left  | 1px solid #445e00           |
| $menu-submenu-padding-left | 0.75em                      |
| $menu-submenu-margin       | 0.75em                      |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-bootstrap/tree/main/src/assets/scss/components/_menu.scss)

</div>

</div>
