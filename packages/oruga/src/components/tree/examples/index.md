<script setup>
import Base from "./base.vue";
import BaseCode from "./base.vue?raw";

import OptionsPrimitives from "./options-primitives.vue";
import OptionsPrimitivesCode from "./options-primitives.vue?raw";

import OptionsObject from "./options-object.vue";
import OptionsObjectCode from "./options-object.vue?raw";

import OptionsArray from "./options-array.vue";
import OptionsArrayCode from "./options-array.vue?raw";

import Selection from "./selection.vue";
import SelectionCode from "./selection.vue?raw";

import Multiple from "./multiple.vue";
import MultipleCode from "./multiple.vue?raw";

import Scrollable from "./scrollable.vue";
import ScrollableCode from "./scrollable.vue?raw";

import Templates from "./templates.vue";
import TemplatesCode from "./templates.vue?raw";
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
