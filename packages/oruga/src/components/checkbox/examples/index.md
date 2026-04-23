<script setup>
import Base from "./base.vue";
import BaseCode from "./base.vue?raw";

import Variants from "./variants.vue";
import VariantsCode from "./variants.vue?raw";

import Interminate from "./interminate.vue";
import InterminateCode from "./interminate.vue?raw";

import Sizes from "./sizes.vue";
import SizesCode from "./sizes.vue?raw";

import Multiple from "./multiple.vue";
import MultipleCode from "./multiple.vue?raw";
</script>

### Base

By default the checkbox type will renders a single checkbox and uses `boolean` values. In order for a single checkbox to be checked the current value of the input must match the `modelValue` of that input (by default, a single checkbox uses true as the `modelValue`). The true and false value can be modified by using the `true-value` and `false-value` properties.

<ExampleViewer :component="Base" :code="BaseCode" />

### Multiple

To enable multiple checkboxes, set the `multiple` prop to `true`. This allows the component to accept an array for the `modelValue` prop. Then, if the box is checked, the value of the `native-value` property is added to the array.

<ExampleViewer :component="Multiple" :code="MultipleCode" />

### Variants

Different styles can be achieved with the `variant` prop.

<ExampleViewer :component="Variants" :code="VariantsCode" />

### Interminate

Checkboxes can only have two states: checked or unchecked. Visually, there are actually three states a checkbox can be in: checked, unchecked, or indeterminate. This third state can be achieved by setting the `indeterminate` prop.

<ExampleViewer :component="Interminate" :code="InterminateCode" />

### Sizes

The component can be displayed in different sizes using the `size` prop.

<ExampleViewer :component="Sizes" :code="SizesCode" />
