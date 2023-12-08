---
title: Menu
---

# Menu

<div class="vp-doc">

> A simple menu

<Carbon />
</div>

<div class="vp-example">
</div>
<div class="vp-example">

## Class props

inspector-Menu-viewer /
Menu

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

| Prop name | Description                                                                       | Type             | Values                                            | Default                                                                                                                                                 |
| --------- | --------------------------------------------------------------------------------- | ---------------- | ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| active    | The active state of the menu item, use v-model:active to make it two-way binding. | boolean          | -                                                 | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                             |
| animation | Transition name to apply on menu list                                             | string           | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>menu: {<br>&nbsp;&nbsp;animation: "slide"<br>}</code>       |
| ariaRole  | Role attribute to be passed to the list item for better accessibility.            | string           | `listitem`, `menuitem`                            | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>menu: {<br>&nbsp;&nbsp;itemAriaRole: "menuitem"<br>}</code> |
| disabled  | Menu item will be disabled                                                        | boolean          | -                                                 | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                             |
| expanded  | Menu item will be expanded                                                        | boolean          | -                                                 | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                             |
| icon      | Icon to be shown                                                                  | string           | -                                                 |                                                                                                                                                         |
| iconPack  | Icon pack to use                                                                  | string           | `mdi`, `fa`, `fas and any other custom icon pack` | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>menu: {<br>&nbsp;&nbsp;iconPack: undefined<br>}</code>      |
| iconSize  | Icon size                                                                         | string           | `small`, `medium`, `large`                        | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>menu: {<br>&nbsp;&nbsp;iconSize: undefined<br>}</code>      |
| label     | Menu item label                                                                   | string           | -                                                 |                                                                                                                                                         |
| tag       | Menu item tag name                                                                | DynamicComponent | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>menu: {<br>&nbsp;&nbsp;menuTag: "a"<br>}</code>             |

### Events

| Event name        | Properties                                    | Description                     |
| ----------------- | --------------------------------------------- | ------------------------------- |
| update:modelValue | **value** `boolean` - updated modelValue prop | modelValue prop two-way binding |
| update:expanded   | **value** `boolean` - updated expanded prop   | expanded prop two-way binding   |

### Slots

| Name    | Description           | Bindings                                                                                  |
| ------- | --------------------- | ----------------------------------------------------------------------------------------- |
| label   | Override label        | **expanded** `boolean` - item expanded state<br/>**active** `boolean` - item active state |
| default | Place menu items here |                                                                                           |

</div>

<div class="vp-doc">
</div>
<div class="vp-doc">
</div>
