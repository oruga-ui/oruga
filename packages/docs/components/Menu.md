---
sidebarDepth: 2
---

# Menu

<section class="odocs-head">

The **Menu** component displays a hierarchical list for any type of vertical navigation, where the items can be expanded or collapsed.
The component implements the W3C ARIA APG [Tree View Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/treeview/).

</section>

<section class="odocs-examples">

## Examples

<example-menu />

</section>

<section class="odocs-specs">

## Menu Component

> A simple menu, for any type of vertical navigation.

```html
<o-menu></o-menu>
```

### Props

| Prop name | Description                                                                                                                                                      | Type                                 | Values                                            | Default                                                                                                                                            |
| --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ | ------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| accordion | If sub menu items are collapsible                                                                                                                                | boolean                              | -                                                 | <code style='white-space: nowrap; padding: 0;'>true</code>                                                                                         |
| disabled  | Menu will be disabled                                                                                                                                            | boolean                              | -                                                 | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                        |
| icon      | Icon to be shown                                                                                                                                                 | string                               | -                                                 |                                                                                                                                                    |
| iconPack  | Icon pack to use                                                                                                                                                 | string                               | `mdi`, `fa`, `fas and any other custom icon pack` | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>menu: {<br>&nbsp;&nbsp;iconPack: undefined<br>}</code> |
| iconSize  | Icon size                                                                                                                                                        | string                               | `small`, `medium`, `large`                        | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>menu: {<br>&nbsp;&nbsp;iconSize: undefined<br>}</code> |
| label     | Menu label                                                                                                                                                       | string                               | -                                                 |                                                                                                                                                    |
| labelId   | HTML element Id of the label element                                                                                                                             | string                               | -                                                 | <code style='white-space: nowrap; padding: 0;'>useId()</code>                                                                                      |
| menuId    | HTML element Id of the ol list element                                                                                                                           | string                               | -                                                 | <code style='white-space: nowrap; padding: 0;'>useId()</code>                                                                                      |
| v-model   | The selected item value, use v-model to make it two-way binding                                                                                                  | unknown                              | -                                                 |                                                                                                                                                    |
| options   | Menu items, unnecessary when default slot is used                                                                                                                | OptionsPropWithGroups&lt;unknown&gt; | -                                                 |                                                                                                                                                    |
| override  | Override existing theme classes completely                                                                                                                       | boolean                              | -                                                 |                                                                                                                                                    |
| role      | Role attribute to be passed to the list container for better accessibility.<br/>Use menu only in situations where your dropdown is related to a navigation menu. | "menu" \| "tree"                     | `menu`, `tree`                                    | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>menu: {<br>&nbsp;&nbsp;role: "tree"<br>}</code>        |

### Events

| Event name         | Properties                                    | Description                     |
| ------------------ | --------------------------------------------- | ------------------------------- |
| update:model-value | **value** `unknown` - updated modelValue prop | modelValue prop two-way binding |

### Slots

| Name    | Description             | Bindings                                                                                                                                                                                                                                                                      |
| ------- | ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| label   | Override icon and label | **focused** `unknown \| undefined` - the focused item value<br/>**focusedIndex** `number \| undefined` - index of the focused item<br/>**selected** `unknown \| undefined` - the selected item value<br/>**selectedIndex** `number \| undefined` - index of the selected item |
| default | Define menu items here  | **focused** `unknown \| undefined` - the focused item value<br/>**focusedIndex** `number \| undefined` - index of the focused item<br/>**selected** `unknown \| undefined` - the selected item value<br/>**selectedIndex** `number \| undefined` - index of the selected item |

</section>

<section class="odocs-specs">

## MenuItem Component

> A menu list item.

```html
<o-menu-item></o-menu-item>
```

### Props

| Prop name | Description                                                                               | Type                       | Values                                            | Default                                                                                                                                             |
| --------- | ----------------------------------------------------------------------------------------- | -------------------------- | ------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| active    | The active state of the menu item, use v-model:active to make it two-way binding          | boolean                    | -                                                 | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                         |
| animation | Transition name to apply on menu list                                                     | string                     | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>menu: {<br>&nbsp;&nbsp;animation: "slide"<br>}</code>   |
| disabled  | Menu item will be disabled                                                                | boolean                    | -                                                 | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                         |
| expanded  | Menu item will be expanded                                                                | boolean                    | -                                                 | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                         |
| hidden    | Define whether the item is visible or not                                                 | boolean                    | -                                                 | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                         |
| icon      | Icon to be shown                                                                          | string                     | -                                                 |                                                                                                                                                     |
| iconPack  | Icon pack to use                                                                          | string                     | `mdi`, `fa`, `fas and any other custom icon pack` | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>menu: {<br>&nbsp;&nbsp;iconPack: undefined<br>}</code>  |
| iconSize  | Icon size                                                                                 | string                     | `small`, `medium`, `large`                        | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>menu: {<br>&nbsp;&nbsp;iconSize: undefined<br>}</code>  |
| label     | Menu item label                                                                           | string                     | -                                                 |                                                                                                                                                     |
| options   | Submenu items, unnecessary when default slot is used                                      | OptionsProp&lt;unknown&gt; | -                                                 |                                                                                                                                                     |
| override  | Override existing theme classes completely                                                | boolean                    | -                                                 |                                                                                                                                                     |
| submenuId | HTML element Id of the sub menu ol list element                                           | string                     | -                                                 | <code style='white-space: nowrap; padding: 0;'>useId()</code>                                                                                       |
| tag       | Menu item tag name                                                                        | DynamicComponent           | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>menu: {<br>&nbsp;&nbsp;itemTag: PlainButton<br>}</code> |
| value     | Item value (it will be used as the v-model of the wrapper component) - default is an uuid | unknown                    | -                                                 |                                                                                                                                                     |

### Events

| Event name    | Properties                                                                 | Description                 |
| ------------- | -------------------------------------------------------------------------- | --------------------------- |
| update:active | **value** `boolean` - updated active prop                                  | active prop two-way binding |
| click         | **value** `unknown` - value prop data<br/>**event** `event` - native event | onclick event               |

### Slots

| Name    | Description                               | Bindings                                                                                  |
| ------- | ----------------------------------------- | ----------------------------------------------------------------------------------------- |
| label   | Override the label, default is label prop | **expanded** `boolean` - item expanded state<br/>**active** `boolean` - item active state |
| default | Define submenu items here                 |                                                                                           |

</section>

<section class="odocs-classes">

## Class Inspector

<inspector-menu-viewer />

</section>

<section class="odocs-style">

## Sass Variables

<div class="theme-oruga">

> Current theme ➜ _[Oruga](https://github.com/oruga-ui/theme-oruga)_

| SASS Variable                      | Default                              |
| ---------------------------------- | ------------------------------------ |
| $menu-spacer                       | 0.5rem                               |
| $menu-border                       | 1px solid h.useVar("primary")        |
| $menu-disabled-opacity             | h.useVar("control-disabled-opacity") |
| $menu-label-color                  | h.useVar("font-color")               |
| $menu-label-font-size              | calc(h.useVar("font-size") \* 0.75)  |
| $menu-label-font-weight            | h.useVar("font-weight")              |
| $menu-label-line-heigth            | h.useVar("line-heigth")              |
| $menu-item-padding                 | 0.5em 0.75em                         |
| $menu-item-color                   | h.useVar("font-color")               |
| $menu-item-font-size               | h.useVar("font-size")                |
| $menu-item-font-weight             | h.useVar("font-weight")              |
| $menu-item-line-heigth             | h.useVar("line-heigth")              |
| $menu-item-border                  | unset                                |
| $menu-item-border-radius           | h.useVar("border-radius")            |
| $menu-item-background-color        | transparent                          |
| $menu-item-hover-color             | h.useVar("white")                    |
| $menu-item-hover-background-color  | h.useVar("secondary")                |
| $menu-item-active-color            | h.useVar("primary-invert")           |
| $menu-item-active-background-color | h.useVar("primary")                  |

See ➜ 📄 [SCSS file](https://github.com/oruga-ui/theme-oruga/tree/main/src/assets/scss/components/_menu.scss)

</div>
<div class="theme-bulma">

> Current theme ➜ _[Bulma](https://github.com/oruga-ui/theme-bulma)_

<p>The theme does not have any custom variables for this component.</p>
</div>
<div class="theme-bootstrap">

> Current theme ➜ _[Bootstrap](https://github.com/oruga-ui/theme-bootstrap)_

| SASS Variable             | Default                        |
| ------------------------- | ------------------------------ |
| $menu-label-bg            | transparent                    |
| $menu-label-color         | var(--#{$prefix}body-color)    |
| $menu-label-font-size     | 0.75em                         |
| $menu-list-line-height    | 1.25em                         |
| $menu-item-padding        | 0.5em 0.75em                   |
| $menu-item-bg             | transparent                    |
| $menu-item-color          | var(--#{$prefix}body-color)    |
| $menu-item-active-bg      | var(--#{$prefix}primary)       |
| $menu-item-active-color   | var(--#{$prefix}white)         |
| $menu-item-disabled-bg    | transparent                    |
| $menu-item-disabled-color | var(--#{$prefix}secondary)     |
| $menu-item-border-radius  | var(--#{$prefix}border-radius) |
| $menu-item-hover-bg       | var(--#{$prefix}tertiary-bg)   |
| $menu-item-hover-color    | var(--#{$prefix}body-color)    |
| $menu-icon-spacer         | 0.5rem                         |
| $menu-submenu-border-left | 1px solid #445e00              |
| $menu-submenu-padding     | 0 0.75em                       |
| $menu-submenu-margin      | 0.75em 1.25em                  |

See ➜ 📄 [SCSS file](https://github.com/oruga-ui/theme-bootstrap/tree/main/src/assets/scss/components/_menu.scss)

</div>

</section>
