<script setup>
import Base from "./base.vue";
import BaseCode from "./base.vue?raw";

import Multiple from "./multiple.vue";
import MultipleCode from "./multiple.vue?raw";

import OptionsPrimitives from "./options-primitives.vue";
import OptionsPrimitivesCode from "./options-primitives.vue?raw";

import OptionsObject from "./options-object.vue";
import OptionsObjectCode from "./options-object.vue?raw";

import OptionsArray from "./options-array.vue";
import OptionsArrayCode from "./options-array.vue?raw";

import OptionsGrouped from "./options-grouped.vue";
import OptionsGroupedCode from "./options-grouped.vue?raw";

import Filterable from "./filterable.vue";
import FilterableCode from "./filterable.vue?raw";

import Templates from "./templates.vue";
import TemplatesCode from "./templates.vue?raw";

import Scroll from "./scroll.vue";
import ScrollCode from "./scroll.vue?raw";
</script>

### Base

Listboxes are great and accessible select menus for your app, complete with robust support for keyboard navigation and, unlike HTML `<select>` elements, may contain images. The `v-model` can be used to bind the selected value. By default the component allows a single option to be chosen.

::: info Accessibility Note:
When assistive technologies present a listbox, the name of an option is calculated by the browser as a flat string. Therefore, the content of an option should not contain any semantic information, such as a heading. In addition, assistive technologies does not provide an accessible way to present a list of interactive elements for the listbox role, such as links, buttons, or checkboxes.
:::

<ExampleViewer :component="Base" :code="BaseCode" />

### Multiple

When the `multiple` prop is used, the component become a multi-select listbox that allows multiple options to be selected. The `v-model` now contains a list of all selected items.

<ExampleViewer :component="Multiple" :code="MultipleCode" />

### Options

Instead of using the `<o-list-item>` component directly inside the default template slot, an `options` prop can be defined, which can be used to specify the options programmatically. It accepts several different value formats:

- An array of primitives `['A', 'B', 'C']`
- An object literal with key-value pairs `{ a: 'A', b: 'B', c: 'C' }`
- An array of objects where each object represent an item
- An array of grouped items where each group object has its own `options` property

::: info TypeScript
The options property type is defined by the `ListboxOptions` type.
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

#### Grouped options

You can also use the array of objects syntax to create grouped options, wrapping each group of options in an object with a `label` and an `options` property. The object has the same properties as the `<o-list-item>` component.

<ExampleViewer :component="OptionsGrouped" :code="OptionsGroupedCode" />

### Filterable

The component provides a built-in filtering feature, which can be enabled by adding the `filterable` property. A custom filter function can be defined using the `filter` property. By default, a lowercased label string comparison is performed.

<ExampleViewer :component="Filterable" :code="FilterableCode" />

### Templates

A custom header and footer can be added before and after the options list by using the `header` and `footer` template slots. You can also display content, when no options are visible, either because there are no options or because they are hidden through filtering, using the `empty` template slot.

<ExampleViewer :component="Templates" :code="TemplatesCode" />

### Infinite Scroll & Async Data

<p>
    When having to many options, consider adding a max height using the
    <code>scrollHeight</code> property, which allows to cap the list at a
    fixed <code>max-height</code>. This will render a long list of options
    with a scrollbar. The component will emit a <code>scroll-start</code> or
    <code>scroll-end</code> event, when the top or bottom of the list is
    reached. These events can be used to load more options as needed.
    Consider adding <code>backend-filtering</code> when updating options
    manually in response to changes in the filter value.
</p>
<ExampleViewer :component="Scroll" :code="ScrollCode" />
