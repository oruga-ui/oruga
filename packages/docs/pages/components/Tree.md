---
sidebarDepth: 2
---

[//]: # "This file is generated and should not be edited by hand!"

# Tree

<section class="odocs-hea">

The **Tree** component presents a hierarchical list of items. Any item in the hierarchy can have children. Items with children may be expanded or collapsed to show or hide the children.
The component uses the [ARIA tree role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/tree_role) and implements the W3C ARIA APG [Tree View Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/treeview/).
Combine it with the [Field](/components/Field) component to access all functionalities.

</section>

<section class="odocs-examples">

## Examples

<script setup>
import Base from "@/components/Tree/examples/base.vue";
import BaseCode from "@/components/Tree/examples/base.vue?raw";

import OptionsPrimitives from "@/components/Tree/examples/options-primitives.vue";
import OptionsPrimitivesCode from "@/components/Tree/examples/options-primitives.vue?raw";

import OptionsObject from "@/components/Tree/examples/options-object.vue";
import OptionsObjectCode from "@/components/Tree/examples/options-object.vue?raw";

import OptionsArray from "@/components/Tree/examples/options-array.vue";
import OptionsArrayCode from "@/components/Tree/examples/options-array.vue?raw";

import Selection from "@/components/Tree/examples/selection.vue";
import SelectionCode from "@/components/Tree/examples/selection.vue?raw";

import Multiple from "@/components/Tree/examples/multiple.vue";
import MultipleCode from "@/components/Tree/examples/multiple.vue?raw";

import Scrollable from "@/components/Tree/examples/scrollable.vue";
import ScrollableCode from "@/components/Tree/examples/scrollable.vue?raw";

import Templates from "@/components/Tree/examples/templates.vue";
import TemplatesCode from "@/components/Tree/examples/templates.vue?raw";
</script>

### Base

The component allows the user to select one or more items from a hierarchically organized collection. For example, a file system navigator that uses a tree view, each item displays a folder or file. Folder items can be expanded to reveal the contents of the folder, which may be files, folders, or both.

::: info Accessibility Note:
A tree view is primarily navigated with _arrow_ keys on the keyboard instead of the _tab_ key. This form of navigation is more similar to native applications than to web applications. For this reason, consider alternative options to address the functionality you need before using a tree component. A tree component is at the most times not needed for typical site navigation that is styled to look like a tree with expandable sections.
:::

<ExampleViewer :component="Base" :code="BaseCode" />

### Options

Instead of using the `<o-tree-item>` component directly inside the default template slot, an `options` prop can be set, which can be used to define the options programmatically. It accepts several different value formats:

- An array of primitives `['A', 'B', 'C']`
- An object literal with key-value pairs `{ a: 'A', b: 'B', c: 'C' }`
- An array of objects where each object represent an item

::: info TypeScript
The options property type is defined by the `TreeOptions` type.
:::

#### Array of primitives

The simplest way to provide options is an array of primitives like strings or numbers, where the primitive will be used for both the string casted `label` representation and the `value` of the option.

<ExampleViewer
    :component="OptionsPrimitives"
    :code="OptionsPrimitivesCode" />

#### Key-Value pair object

You may also provide the `options` prop where the keys are values and the values of each property are the labels.

<ExampleViewer :component="OptionsObject" :code="OptionsObjectCode" />

#### Array of objects

The most flexible way to define options is to provide an array of objects. The object has the same properties as the `<o-list-item>` component.

<ExampleViewer :component="OptionsArray" :code="OptionsArrayCode" />

### Selection

When setting the `selectable` property, users can select any item. The current selected item value is available in the `modelValue` property. In "multi-select" trees users are able to select more than one item.

#### Single

When a single-select tree receives focus, if none of the tree items are selected before the tree receives focus, focus is set on the first node. If a tree item is selected before the tree receives focus, focus is set on the selected tree item.

<ExampleViewer :component="Selection" :code="SelectionCode" />

#### Multiple

You can enable multi-select with the `multiple` property. In multi-select trees, the selected state is always independent of the focus. For example, in a typical file system navigator, the user can move focus to select any number of files for an action, such as copy or move. The visual design should make it clear which items are selected and which item has focus. When a multi-select tree receives focus, if none of the tree items are selected before the tree receives focus, focus is set on the first tree item. If one or more tree items are selected before the tree receives focus, focus is set on the first selected node.

<ExampleViewer :component="Multiple" :code="MultipleCode" />

<!-- #### Checkbox -->

### Scrollable

When having to many options, consider adding a max height using the `scrollHeight` property, which allows to cap the tree at a fixed `max-height`. This will render a long tree of options with a scrollbar. The component will emit a `scroll-start` or `scroll-end` event, when the top or bottom of the tree is reached.

<ExampleViewer :component="Scrollable" :code="ScrollableCode" />

### Templates

The item label can be customised using the `label` template slot.

<ExampleViewer :component="Templates" :code="TemplatesCode" />

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

<inspector-tree-viewer />

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
