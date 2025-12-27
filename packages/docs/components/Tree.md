---
sidebarDepth: 2
---

# Tree

<section class="odocs-head">

The **Tree** component presents a hierarchical list. Any item in the hierarchy may have child items, and items that have children may be expanded or collapsed to show or hide the children. Items with children can be cexpanded or collapsed and child items can be selected.
The component implements the W3C ARIA APG [Tree View Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/treeview/).

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

| Prop name      | Description                                                                         | Type                                 | Values                                            | Default                                                                                                                                              |
| -------------- | ----------------------------------------------------------------------------------- | ------------------------------------ | ------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| animation      | Custom animation (transition name)                                                  | string                               | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>tree: {<br>&nbsp;&nbsp;animation: "slide"<br>}</code>    |
| ariaLabel      | Defines a string value that labels an interactive element.                          | string                               | -                                                 |                                                                                                                                                      |
| ariaLabelledby | Identifier of the underlying input element.                                         | string                               | -                                                 |                                                                                                                                                      |
| checkable      | Enable a checkbox on the item element                                               | boolean                              | -                                                 | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                          |
| collapsable    | If sub tree items are shown as a accordion                                          | boolean                              | -                                                 | <code style='white-space: nowrap; padding: 0;'>true</code>                                                                                           |
| disabled       | Tree will be disabled                                                               | boolean                              | -                                                 | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                          |
| emptyLabel     | A label which is displayed when no options are visible                              | string                               | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>tree: {<br>&nbsp;&nbsp;emptyLabel: undefined<br>}</code> |
| icon           | Icon to be shown                                                                    | string                               | -                                                 |                                                                                                                                                      |
| iconPack       | Icon pack to use                                                                    | string                               | `mdi`, `fa`, `fas and any other custom icon pack` | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>tree: {<br>&nbsp;&nbsp;iconPack: undefined<br>}</code>   |
| iconSize       | Icon size                                                                           | string                               | `small`, `medium`, `large`                        | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>tree: {<br>&nbsp;&nbsp;iconSize: undefined<br>}</code>   |
| id             | Same as native id. Also set the for label for o-field wrapper - default is an uuid. | string                               | -                                                 | <code style='white-space: nowrap; padding: 0;'>useId()</code>                                                                                        |
| v-model        | The selected item value, use v-model to make it two-way binding                     | unknown                              | -                                                 |                                                                                                                                                      |
| multiple       | Allows multiple selections - converts the `modelValue` into an array                | false                                | -                                                 | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                          |
| options        | Tree items, unnecessary when default slot is used                                   | OptionsPropWithGroups&lt;unknown&gt; | -                                                 |                                                                                                                                                      |
| override       | Override existing theme classes completely                                          | boolean                              | -                                                 |                                                                                                                                                      |
| scrollHeight   | Height of the tree, a scrollbar is defined if height of list exceeds this value     | number \| string                     | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>tree: {<br>&nbsp;&nbsp;scrollHeight: "225"<br>}</code>   |
| selectable     | Enables item selection                                                              | boolean                              | -                                                 | <code style='white-space: nowrap; padding: 0;'>true</code>                                                                                           |

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
| options        | Subtree items, unnecessary when default slot is used                                      | OptionsProp&lt;unknown&gt; | -                                                 |                                                                                                                                                    |
| override       | Override existing theme classes completely                                                | boolean                    | -                                                 |                                                                                                                                                    |
| subtreeId      | HTML element Id of the sub tree ol list element                                           | string                     | -                                                 | <code style='white-space: nowrap; padding: 0;'>useId()</code>                                                                                      |
| value          | Item value (it will be used as the v-model of the wrapper component) - default is an uuid | unknown                    | -                                                 | <code style='white-space: nowrap; padding: 0;'>useId()</code>                                                                                      |

### Events

| Event name    | Properties                                                                 | Description                 |
| ------------- | -------------------------------------------------------------------------- | --------------------------- |
| update:active | **value** `boolean` - updated active prop                                  | active prop two-way binding |
| click         | **value** `unknown` - value prop data<br/>**event** `event` - native event | onclick event               |

### Slots

| Name    | Description                               | Bindings                                                                                                                              |
| ------- | ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| label   | Override the label, default is label prop | **expanded** `boolean` - item is expanded<br/>**selected** `boolean` - item is selected<br/>**disabled** `boolean` - item is disabled |
| default | Define subtree items here                 |                                                                                                                                       |

</section>

<section class="odocs-classes">

## Class Inspector

<inspector-tree-viewer />

</section>

<section class="odocs-style">

## Sass Variables

<div class="theme-oruga">

> Current theme ➜ _[Oruga](https://github.com/oruga-ui/theme-oruga)_

<p>The theme does not have any custom variables for this component.</p>
</div>
<div class="theme-bulma">

> Current theme ➜ _[Bulma](https://github.com/oruga-ui/theme-bulma)_

<p>The theme does not have any custom variables for this component.</p>
</div>
<div class="theme-bootstrap">

> Current theme ➜ _[Bootstrap](https://github.com/oruga-ui/theme-bootstrap)_

<p>The theme does not have any custom variables for this component.</p>
</div>

</section>
