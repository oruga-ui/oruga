<script setup>
import Base from "./base.vue";
import BaseCode from "./base.vue?raw";

import Triggers from "./triggers.vue";
import TriggersCode from "./triggers.vue?raw";

import OptionsPrimitives from "./options-primitives.vue";
import OptionsPrimitivesCode from "./options-primitives.vue?raw";

import OptionsObject from "./options-object.vue";
import OptionsObjectCode from "./options-object.vue?raw";

import OptionsArray from "./options-array.vue";
import OptionsArrayCode from "./options-array.vue?raw";

import OptionsGrouped from "./options-grouped.vue";
import OptionsGroupedCode from "./options-grouped.vue?raw";

import Modal from "./modal.vue";
import ModalCode from "./modal.vue?raw";

import Selectable from "./selectable.vue";
import SelectableCode from "./selectable.vue?raw";

import Scrollable from "./scrollable.vue";
import ScrollableCode from "./scrollable.vue?raw";

import Position from "./position.vue";
import PositionCode from "./position.vue?raw";
</script>

### Base (Menu)

By default the dropdown will be a simple unselectable menu using the [ARIA: menu role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/menu_role). A menu generally represents a list of actions or functions that the user can invoke.

When a user clicks an option in a menu that has been opened, the menu usually closes. This can be changed with the `keepOpen` property. When a menu opens, keyboard focus can be placed on the first menu item using the `keepFirst` property.

<ExampleViewer :component="Base" :code="BaseCode" />

### Triggers

The trigger can be defined by placing any element in the `trigger` template slot. To open the dropdown, the component can detect several different interaction variants, such as `openOnHover` or `openOnContextmenu` to only open on right click instead of left click. By default, only `openOnClick` is set.

The action that close the component can also be customised using the `closeOnOutside` and `closeOnScroll` properties.

Adding the `teleport` prop will move the dropdown menu to the referenced DOM location instead.

<ExampleViewer :component="Triggers" :code="TriggersCode" />

### Options

Instead of using the `<o-dropdown-item>` component directly inside the default template slot, an `options` prop can be defined, which can be used to specify the options programmatically. It accepts several different value formats:

- An array of primitives `['A', 'B', 'C']`
- An object literal with key-value pairs `{ a: 'A', b: 'B', c: 'C' }`
- An array of objects where each object represent an item
- An array of grouped items where each group object has its own `options` property

::: info TypeScript
The options property type is defined by the `DropdownOptions` type.
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

The most flexible way to define options is to provide an array of objects. The object has the same properties as the `<o-dropdown-item>` component.

<ExampleViewer :component="OptionsArray" :code="OptionsArrayCode" />

#### Grouped options

You can also use the array of objects syntax to create grouped options, wrapping each group of options in an object with a `label` and an `options` property. The object has the same properties as the `<o-dropdown-item>` component.

<ExampleViewer :component="OptionsGrouped" :code="OptionsGroupedCode" />

### Selectable (Combobox)

The component can be configured to have the options as a selectable list by adding the `selectable` property. This applies the [ARIA: combobox role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/combobox_role) to the root element and changes the menu to an [ARIA: listbox role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/listbox_role). The combobox role identifies an element as either an input or a button that controls another element, that can dynamically pop up to help the user set a value.

By default only one option can be selected and the selected option will be refereced by the `modelValue` property. Adding the `multiple` property will change the `modelValue` to an array of selected options.

<ExampleViewer :component="Selectable" :code="SelectableCode" />

### Scrollable

When having to many options, consider adding the `scrollable` property, which allows the options container to remain at a fixed height. The `max-height` property can be used to define the max container height.

<ExampleViewer :component="Scrollable" :code="ScrollableCode" />

### Modal

The content can be opened in a _modal_ mode either for mobile or desktop only, or for both, by adding the `mobile-modal` and `desktop-modal` properties.

<ExampleViewer :component="Modal" :code="ModalCode" />

### Position

The direction in which the dropdown menu opens can be changed by the `position` property. By default, the direction is automatically calculated from the distance to the edges of the window. Adding the `teleport` prop additionally will move the dropdown menu to the referenced DOM location instead.

<ExampleViewer :component="Position" :code="PositionCode" />
