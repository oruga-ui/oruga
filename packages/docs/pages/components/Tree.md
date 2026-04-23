---
sidebarDepth: 2
---

[//]: # "This file is generated and should not be edited by hand!"

# Tree

<section class="odocs-head">

The **Tree** component presents a hierarchical list of items. Any item in the hierarchy can have children. Items with children may be expanded or collapsed to show or hide the children.
The component uses the [ARIA tree role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/tree_role) and implements the W3C ARIA APG [Tree View Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/treeview/).
Combine it with the [Field](/components/Field) component to access all functionalities.

</section>

<section class="odocs-examples">

## Examples

<example-tree />

</section>

<section class="odocs-specs">

## Tree Component

> A simple tree view, for any type of hierarchical list.

```html
<o-tree></o-tree>
```

### Props

| Prop name      | Description                                                                         | Type                                 | Values                                            | Default                                                                                                                                                    |
| -------------- | ----------------------------------------------------------------------------------- | ------------------------------------ | ------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| animation      | Custom animation (transition name)                                                  | string                               | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>tree: {<br>&nbsp;&nbsp;animation: "slide"<br>}</code>          |
| ariaLabel      | Defines a string value that labels an interactive element.                          | string                               | -                                                 |                                                                                                                                                            |
| ariaLabelledby | Identifier of the underlying input element.                                         | string                               | -                                                 |                                                                                                                                                            |
| checkable      | Enable a checkbox on the item element                                               | boolean                              | -                                                 | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                |
| collapsable    | If sub tree items are shown as a accordion                                          | boolean                              | -                                                 | <code style='white-space: nowrap; padding: 0;'>true</code>                                                                                                 |
| disabled       | Tree will be disabled                                                               | boolean                              | -                                                 | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                |
| emptyLabel     | A label which is displayed when no options are visible                              | string                               | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>tree: {<br>&nbsp;&nbsp;emptyLabel: undefined<br>}</code>       |
| iconPack       | Icon pack to use                                                                    | string                               | `mdi`, `fa`, `fas and any other custom icon pack` | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>tree: {<br>&nbsp;&nbsp;iconPack: undefined<br>}</code>         |
| iconSize       | Icon size                                                                           | string                               | `small`, `medium`, `large`                        | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>tree: {<br>&nbsp;&nbsp;iconSize: undefined<br>}</code>         |
| id             | Same as native id. Also set the for label for o-field wrapper - default is an uuid. | string                               | -                                                 | <code style='white-space: nowrap; padding: 0;'>useId()</code>                                                                                              |
| v-model        | The selected item value, use v-model to make it two-way binding                     | ValueType&lt;unknown, IsMultiple&gt; | -                                                 |                                                                                                                                                            |
| multiple       | Allows multiple selections - converts the `modelValue` into an array                | IsMultiple                           | -                                                 |                                                                                                                                                            |
| options        | Tree items, unnecessary when default slot is used                                   | TreeOptions&lt;unknown&gt;           | -                                                 |                                                                                                                                                            |
| override       | Override existing theme classes completely                                          | boolean                              | -                                                 |                                                                                                                                                            |
| scrollHeight   | Height of the tree, a scrollbar is defined if height of list exceeds this value     | number \| string                     | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>tree: {<br>&nbsp;&nbsp;scrollHeight: undefined<br>}</code>     |
| selectable     | Enables item selection                                                              | boolean                              | -                                                 | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                |
| toggleIcon     | The chevron icon to for the toggle element before each item                         | string                               | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>tree: {<br>&nbsp;&nbsp;toggleIcon: "chevron-right"<br>}</code> |

### Events

| Event name         | Properties                                    | Description                                      |
| ------------------ | --------------------------------------------- | ------------------------------------------------ |
| update:model-value | **value** `unknown` - updated modelValue prop | modelValue prop two-way binding                  |
| select             | **value** `unknown` - selected value          | on select event - fired before update:modelValue |
| focus              | **event** `Event` - native event              | on tree focus event                              |
| blur               | **event** `Event` - native event              | on tree blur event                               |
| scroll-start       |                                               | scrolling inside the tree reached the start      |
| scroll-end         |                                               | scrolling inside the tree reached the end        |

### Slots

| Name    | Description                                     | Bindings |
| ------- | ----------------------------------------------- | -------- |
| header  | Define an additional header                     |          |
| default | Define the tree items here                      |          |
| empty   | Define the content to show if the list is empty |          |
| footer  | Define an additional footer                     |          |

</section>

[//]: # "This file is generated and should not be edited by hand!"

<section class="odocs-specs">

## TreeItem Component

> A tree list item.

```html
<o-tree-item></o-tree-item>
```

### Props

| Prop name      | Description                                                                               | Type                       | Values                                            | Default                                                                                                                                            |
| -------------- | ----------------------------------------------------------------------------------------- | -------------------------- | ------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| animation      | Transition name to apply on tree list                                                     | string                     | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>tree: {<br>&nbsp;&nbsp;animation: "slide"<br>}</code>  |
| ariaLabel      | Defines a string value that labels an interactive element.                                | string                     | -                                                 |                                                                                                                                                    |
| ariaLabelledby | Identifier of the underlying input element.                                               | string                     | -                                                 |                                                                                                                                                    |
| disabled       | Tree item will be disabled                                                                | boolean                    | -                                                 | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                        |
| expanded       | Tree item will be expanded                                                                | boolean                    | -                                                 | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                        |
| hidden         | Define whether the item is visible or not                                                 | boolean                    | -                                                 | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                        |
| icon           | Icon to be shown                                                                          | string                     | -                                                 |                                                                                                                                                    |
| iconPack       | Icon pack to use                                                                          | string                     | `mdi`, `fa`, `fas and any other custom icon pack` | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>tree: {<br>&nbsp;&nbsp;iconPack: undefined<br>}</code> |
| iconSize       | Icon size                                                                                 | string                     | `small`, `medium`, `large`                        | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>tree: {<br>&nbsp;&nbsp;iconSize: undefined<br>}</code> |
| label          | Tree item label                                                                           | string                     | -                                                 |                                                                                                                                                    |
| options        | Subtree items, unnecessary when default slot is used                                      | TreeOptions&lt;unknown&gt; | -                                                 |                                                                                                                                                    |
| override       | Override existing theme classes completely                                                | boolean                    | -                                                 |                                                                                                                                                    |
| selectable     | Override item selectable state                                                            | boolean                    | -                                                 |                                                                                                                                                    |
| subtreeId      | HTML element Id of the sub tree ol list element                                           | string                     | -                                                 | <code style='white-space: nowrap; padding: 0;'>useId()</code>                                                                                      |
| value          | Item value (it will be used as the v-model of the wrapper component) - default is an uuid | unknown                    | -                                                 | <code style='white-space: nowrap; padding: 0;'>useId()</code>                                                                                      |

### Events

| Event name | Properties                                                                 | Description        |
| ---------- | -------------------------------------------------------------------------- | ------------------ |
| click      | **value** `unknown` - value prop data<br/>**event** `event` - native event | onclick event      |
| open       |                                                                            | on sub tree opened |
| close      |                                                                            | on sub tree closed |

### Slots

| Name    | Description                               | Bindings                                                                                                                              |
| ------- | ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| label   | Override the label, default is label prop | **expanded** `boolean` - item is expanded<br/>**selected** `boolean` - item is selected<br/>**disabled** `boolean` - item is disabled |
| default | Define subtree items here                 |                                                                                                                                       |

</section>

<section class="odocs-classes">

## Class Inspector

<inspector-tree />

</section>

<section class="odocs-style">

## Sass Variables

<div class="theme-oruga">

> Current theme ➜ _[Oruga](https://github.com/oruga-ui/theme-oruga)_

| SASS Variable                      | Default                              |
| ---------------------------------- | ------------------------------------ |
| $tree-spacer                       | 0.25rem                              |
| $tree-border                       | 1px solid h.useVar("secondary")      |
| $tree-disabled-opacity             | h.useVar("control-disabled-opacity") |
| $tree-item-padding                 | 0.5em 0.75em                         |
| $tree-item-color                   | h.useVar("font-color")               |
| $tree-item-font-size               | h.useVar("font-size")                |
| $tree-item-font-weight             | h.useVar("font-weight")              |
| $tree-item-line-heigth             | h.useVar("line-height")              |
| $tree-item-border                  | unset                                |
| $tree-item-border-radius           | h.useVar("border-radius")            |
| $tree-item-background-color        | transparent                          |
| $tree-item-hover-color             | h.useVar("black")                    |
| $tree-item-hover-background-color  | h.useVar("grey-lightest")            |
| $tree-item-active-color            | h.useVar("primary-invert")           |
| $tree-item-active-background-color | h.useVar("primary")                  |

See ➜ 📄 [SCSS file](https://github.com/oruga-ui/theme-oruga/tree/main/src/assets/scss/components/_tree.scss)

</div>
<div class="theme-bulma">

> Current theme ➜ _[Bulma](https://github.com/oruga-ui/theme-bulma)_

<p>The theme does not have any custom variables for this component.</p>
</div>
<div class="theme-bootstrap">

> Current theme ➜ _[Bootstrap](https://github.com/oruga-ui/theme-bootstrap)_

| SASS Variable             | Default                        |
| ------------------------- | ------------------------------ |
| $tree-list-line-height    | 1.25em                         |
| $tree-item-padding        | 0.5em 0.75em                   |
| $tree-item-margin         | 0.2em 0                        |
| $tree-item-bg             | transparent                    |
| $tree-item-border-radius  | var(--#{$prefix}border-radius) |
| $tree-item-color          | var(--#{$prefix}body-color)    |
| $tree-item-active-bg      | var(--#{$prefix}primary)       |
| $tree-item-active-color   | var(--#{$prefix}white)         |
| $tree-item-disabled-bg    | transparent                    |
| $tree-item-disabled-color | var(--#{$prefix}secondary)     |
| $tree-item-hover-bg       | var(--#{$prefix}tertiary-bg)   |
| $tree-item-hover-color    | var(--#{$prefix}body-color)    |
| $tree-icon-spacer         | 0.25rem                        |
| $tree-subtree-border-left | 1px solid #445e00              |
| $tree-subtree-padding     | 0 0.5em                        |
| $tree-subtree-margin      | 0.5em 1.3em                    |

See ➜ 📄 [SCSS file](https://github.com/oruga-ui/theme-bootstrap/tree/main/src/assets/scss/components/_tree.scss)

</div>

</section>
