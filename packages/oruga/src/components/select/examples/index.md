<script setup>
import Base from "./base.vue";
import BaseCode from "./base.vue?raw";

import OptionsPrimitives from "./options-primitives.vue";
import OptionsPrimitivesCode from "./options-primitives.vue?raw";

import OptionsObject from "./options-object.vue";
import OptionsObjectCode from "./options-object.vue?raw";

import OptionsArray from "./options-array.vue";
import OptionsArrayCode from "./options-array.vue?raw";

import OptionsGrouped from "./options-grouped.vue";
import OptionsGroupedCode from "./options-grouped.vue?raw";

import OptionsNative from "./options-native.vue";
import OptionsNativeCode from "./options-native.vue?raw";

import Multiple from "./multiple.vue";
import MultipleCode from "./multiple.vue?raw";

import Sizes from "./sizes.vue";
import SizesCode from "./sizes.vue?raw";

import Variants from "./variants.vue";
import VariantsCode from "./variants.vue?raw";

import WithIcons from "./icons.vue";
import WithIconsCode from "./icons.vue?raw";
</script>

### Base

<ExampleViewer :component="Base" :code="BaseCode" />

### Options

There are several ways to provide options for a select input:

- An array of primitives `['A', 'B', 'C']`
- An object literal with key-value pairs `{ a: 'A', b: 'B', c: 'C' }`
- An array of objects with `label` and `value` properties
- Using the native `<option>` tags directly inside the default template slot.

::: info TypeScript
The options property type is defined by the `SelectOptions` type.
:::

#### Array of primitives

The simplest way to provide options is an array of primitives like strings or numbers, where the primitive will be used for both the string casted `label` representation and the `value` of the option.

<ExampleViewer
    :component="OptionsPrimitives"
    :code="OptionsPrimitivesCode" />

#### Key-Value pair object

You may also provide the `options` prop where the keys are values and the values of each property are labels.

<ExampleViewer :component="OptionsObject" :code="OptionsObjectCode" />

#### Array of objects

The most flexible way to define options is to provide an array of objects. The object is defined as:  
`{ value: any, label: string }`  
The `value` attribute is the real value which will be used by the `v-model` property and other events. The `label` attribute is the visible representation of the option. The object can be extended by additional attribute, which will be applied to the option item tag.

<ExampleViewer :component="OptionsArray" :code="OptionsArrayCode" />

#### Grouped options

Using the array of objects syntax you can also create grouped options (`<optgroup>` in HTML) by adding an `options` property to the object option.

<ExampleViewer :component="OptionsGrouped" :code="OptionsGroupedCode" />

#### Default Slot

Sometimes it may be desirable to manually output the contents of a select list in order to create specialized structures. This can be done by using the `default` slot to explicitly output your options like the native HTML select element.

<ExampleViewer :component="OptionsNative" :code="OptionsNativeCode" />

### Multiple

The input also supports a `multiple` attribute that allows multi-selection. When used the `v-model` attribute will be an array of values.

::: info Accessibility Notes
Select inputs with the `multiple` attribute can be challenging for some users because they require holding-down the control or command keys to perform multiple selections. Depending on your audience, you may want to consider using a [**checkbox input**](/components/Checkbox.html#array) instead.
:::

<ExampleViewer :component="Multiple" :code="MultipleCode" />

### Sizes

The component can be displayed in different sizes using the `size` prop.

<ExampleViewer :component="Sizes" :code="SizesCode" />

### Variants

Different styles can be achieved with the `variant` prop.

<ExampleViewer :component="Variants" :code="VariantsCode" />

### With Icons

Add an icon to the component to explain its function more visually.

<ExampleViewer :component="WithIcons" :code="WithIconsCode" />
