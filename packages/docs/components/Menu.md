---
sidebarDepth: 2
---

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

| Prop name | Description                                                                                                                                                      | Type                       | Values                                            | Default                                                                                                                                            |
| --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- | ------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| accordion | If sub menu items are collapsible                                                                                                                                | boolean                    | -                                                 | <code style='white-space: nowrap; padding: 0;'>true</code>                                                                                         |
| disabled  | Menu will be disabled                                                                                                                                            | boolean                    | -                                                 | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                        |
| icon      | Icon to be shown                                                                                                                                                 | string                     | -                                                 |                                                                                                                                                    |
| iconPack  | Icon pack to use                                                                                                                                                 | string                     | `mdi`, `fa`, `fas and any other custom icon pack` | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>menu: {<br>&nbsp;&nbsp;iconPack: undefined<br>}</code> |
| iconSize  | Icon size                                                                                                                                                        | string                     | `small`, `medium`, `large`                        | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>menu: {<br>&nbsp;&nbsp;iconSize: undefined<br>}</code> |
| label     | Menu label                                                                                                                                                       | string                     | -                                                 |                                                                                                                                                    |
| labelId   | HTML element Id of the label element                                                                                                                             | string                     | -                                                 | <code style='white-space: nowrap; padding: 0;'>useId()</code>                                                                                      |
| menuId    | HTML element Id of the ol list element                                                                                                                           | string                     | -                                                 | <code style='white-space: nowrap; padding: 0;'>useId()</code>                                                                                      |
| v-model   | The selected item value, use v-model to make it two-way binding                                                                                                  | unknown                    | -                                                 |                                                                                                                                                    |
| options   | Menu items, unnecessary when default slot is used                                                                                                                | OptionsProp&lt;unknown&gt; | -                                                 |                                                                                                                                                    |
| override  | Override existing theme classes completely                                                                                                                       | boolean                    | -                                                 |                                                                                                                                                    |
| role      | Role attribute to be passed to the list container for better accessibility.<br/>Use menu only in situations where your dropdown is related to a navigation menu. | "menu" \| "tree"           | `menu`, `tree`                                    | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>menu: {<br>&nbsp;&nbsp;ariaRole: "tree"<br>}</code>    |

### Events

| Event name         | Properties                              | Description                     |
| ------------------ | --------------------------------------- | ------------------------------- |
| update:model-value | **value** `T` - updated modelValue prop | modelValue prop two-way binding |

### Slots

| Name    | Description             | Bindings                                                                                          |
| ------- | ----------------------- | ------------------------------------------------------------------------------------------------- |
| label   | Override icon and label | **focused** `T` - the focused item value<br/><br/>**selected** `T` - the selected item value<br/> |
| default | Place menu items here   | **focused** `T` - the focused item value<br/><br/>**selected** `T` - the selected item value<br/> |

</div>

<div class="vp-doc">

## MenuItem component

> A menu list item

```html
<o-menu-item></o-menu-item>
```

### Props

| Prop name | Description                                                                       | Type                       | Values                                            | Default                                                                                                                                            |
| --------- | --------------------------------------------------------------------------------- | -------------------------- | ------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| active    | The active state of the menu item, use v-model:active to make it two-way binding  | boolean                    | -                                                 | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                        |
| animation | Transition name to apply on menu list                                             | string                     | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>menu: {<br>&nbsp;&nbsp;animation: "slide"<br>}</code>  |
| disabled  | Menu item will be disabled                                                        | boolean                    | -                                                 | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                        |
| expanded  | Menu item will be expanded                                                        | boolean                    | -                                                 | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                        |
| hidden    | Define whether the item is visible or not                                         | boolean                    | -                                                 | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                        |
| icon      | Icon to be shown                                                                  | string                     | -                                                 |                                                                                                                                                    |
| iconPack  | Icon pack to use                                                                  | string                     | `mdi`, `fa`, `fas and any other custom icon pack` | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>menu: {<br>&nbsp;&nbsp;iconPack: undefined<br>}</code> |
| iconSize  | Icon size                                                                         | string                     | `small`, `medium`, `large`                        | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>menu: {<br>&nbsp;&nbsp;iconSize: undefined<br>}</code> |
| label     | Menu item label                                                                   | string                     | -                                                 |                                                                                                                                                    |
| options   | Submenu items, unnecessary when default slot is used                              | OptionsProp&lt;unknown&gt; | -                                                 |                                                                                                                                                    |
| override  | Override existing theme classes completely                                        | boolean                    | -                                                 |                                                                                                                                                    |
| submenuId | HTML element Id of the sub menu ol list element                                   | string                     | -                                                 | <code style='white-space: nowrap; padding: 0;'>useId()</code>                                                                                      |
| tag       | Menu item tag name                                                                | DynamicComponent           | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>menu: {<br>&nbsp;&nbsp;itemTag: "button"<br>}</code>   |
| value     | Item value (it will be used as v-model of wrapper component) - default is an uuid | unknown                    | -                                                 | <code style='white-space: nowrap; padding: 0;'></code>                                                                                             |

### Events

| Event name    | Properties                                                                                    | Description                 |
| ------------- | --------------------------------------------------------------------------------------------- | --------------------------- |
| update:active | **value** `boolean` - updated active prop                                                     | active prop two-way binding |
| click         | **value** `string \| number \| object` - value prop data<br/>**event** `event` - Native Event | onclick event               |

### Slots

| Name    | Description           | Bindings                                                                                  |
| ------- | --------------------- | ----------------------------------------------------------------------------------------- |
| label   | Override label        | **expanded** `boolean` - item expanded state<br/>**active** `boolean` - item active state |
| default | Place menu items here |                                                                                           |

</div>

<div class="vp-doc">

## Sass variables

<div class="theme-oruga">

> Current theme ➜ _[Oruga](https://github.com/oruga-ui/theme-oruga)_

| SASS Variable                      | Default                             |
| ---------------------------------- | ----------------------------------- |
| $menu-item-color                   | var(--#{$prefix}grey-dark)          |
| $menu-item-hover-color             | var(--#{$prefix}black)              |
| $menu-item-hover-background-color  | var(--#{$prefix}grey-light)         |
| $menu-item-active-color            | var(--#{$prefix}primary-invert)     |
| $menu-item-active-background-color | var(--#{$prefix}primary)            |
| $menu-item-disabled-color          | var(--#{$prefix}grey-light)         |
| $menu-list-border-left             | 1px solid var(--#{$prefix}primary)  |
| $menu-list-border-radius           | var(--#{$prefix}base-border-radius) |
| $menu-list-line-height             | 1.25em                              |
| $menu-item-padding                 | 0.5em 0.75em                        |
| $menu-nested-list-margin           | 0.75em                              |
| $menu-nested-list-padding-left     | 0.75em                              |
| $menu-label-color                  | $grey                               |
| $menu-label-font-size              | 0.75em                              |
| $menu-label-spacing                | 1em                                 |
| $menu-icon-spacer                  | 0.5rem                              |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-oruga/tree/main/src/assets/scss/components/_menu.scss)

</div>
<div class="theme-bulma">

> Current theme ➜ _[Bulma](https://github.com/oruga-ui/theme-bulma)_

<p>The theme does not have any custom variables for this component.</p>
</div>
<div class="theme-bootstrap">

> Current theme ➜ _[Bootstrap](https://github.com/oruga-ui/theme-bootstrap)_

| SASS Variable              | Default                        |
| -------------------------- | ------------------------------ |
| $menu-label-bg             | transparent                    |
| $menu-label-color          | var(--#{$prefix}body-color)    |
| $menu-label-font-size      | 0.75em                         |
| $menu-list-line-height     | 1.25em                         |
| $menu-item-padding         | 0.5em 0.75em                   |
| $menu-item-bg              | transparent                    |
| $menu-item-color           | var(--#{$prefix}body-color)    |
| $menu-item-active-bg       | var(--#{$prefix}primary)       |
| $menu-item-active-color    | var(--#{$prefix}white)         |
| $menu-item-disabled-bg     | transparent                    |
| $menu-item-disabled-color  | var(--#{$prefix}secondary)     |
| $menu-item-border-radius   | var(--#{$prefix}border-radius) |
| $menu-icon-spacer          | 0.5rem                         |
| $menu-submenu-border-left  | 1px solid #445e00              |
| $menu-submenu-padding-left | 0.75em                         |
| $menu-submenu-margin       | 0.75em                         |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-bootstrap/tree/main/src/assets/scss/components/_menu.scss)

</div>

</div>
