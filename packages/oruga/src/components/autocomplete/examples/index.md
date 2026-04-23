<script setup>
import Base from "./base.vue";
import BaseCode from "./base.vue?raw";

import OptionsArray from "./options-array.vue";
import OptionsArrayCode from "./options-array.vue?raw";

import OptionsGrouped from "./options-grouped.vue";
import OptionsGroupedCode from "./options-grouped.vue?raw";

import Templates from "./templates.vue";
import TemplatesCode from "./templates.vue?raw";

import Selection from "./selection.vue";
import SelectionCode from "./selection.vue?raw";

import Scroll from "./scroll.vue";
import ScrollCode from "./scroll.vue?raw";
</script>

### Base

<ExampleViewer :component="Base" :code="BaseCode" />

### Selection

The autocomplete input can only contain one item at a time.
For the multiple selection version, see the [Taginput](/components/Taginput.html) component.

<ExampleViewer :component="Selection" :code="SelectionCode" />

### Options

There are several ways to define options for the component.
They are similiar to the options definition of the [Dropdown](/components/Dropdown.html) component:

- An array of primitives `['A', 'B', 'C']`
- An object literal with key-value pairs `{ a: 'A', b: 'B', c: 'C' }`
- An array of objects where each object represent an item
- An array of grouped items where each group object has its own `options` property
- Using the `<o-dropdown-item>` component directly inside the default template slot

::: info TypeScript
The options property type is defined by the <code>AutocompleteOptions</code> type.
:::

#### Array of objects

The most flexible way to define options is to provide an array of objects.
The object has the same properties as the `<o-dropdown-item>` component.

<ExampleViewer :component="OptionsArray" :code="OptionsArrayCode" />

#### Grouped options

You can also use the array of objects syntax to create grouped options,
wrapping each group of options in an object with a `label` and an `options` property.
The object has the same properties as the `<o-dropdown-item>` component.

<ExampleViewer :component="OptionsGrouped" :code="OptionsGroupedCode" />

### Templates

Instead of using the `options` prop the options can also be defined by using the `o-dropdown-item` component in the `default` template slot. Additionally a header and a footer can be added to the options list by using the `header` and `footer` template slots. The header and footer can be made clickable by adding the `selectable-header` and `selectable-footer` props. Clicking them will clear the input.

::: info Known limitations
Due to the way the Vue reactivity system works, it is not possible to define a JavaScript object for the `value` property of the `o-dropdown-item` component directly in the template block. This will result in a recursive rendering error. In order to use an object as a value, the object must be defined as variable in the script block. (See [Issue #1531](https://github.com/oruga-ui/oruga/issues/1531))
:::

<ExampleViewer :component="Templates" :code="TemplatesCode" />

### Infinite Scroll & Async Data

When `check-scroll` prop is set, the component will emits the `scroll-start` and `scroll-end` events. These events can be used to load more options as needed. Consider adding `backend-filtering` when manually updating options on input values changes.

::: info Note
The autocomplete component does not have a default slot for defining options. The default slot is used to override the option element template.
:::

<ExampleViewer :component="Scroll" :code="ScrollCode" />
