<script setup>
import Base from "./base.vue";
import BaseCode from "./base.vue?raw";

import Sizes from "./sizes.vue";
import SizesCode from "./sizes.vue?raw";

import Variants from "./variants.vue";
import VariantsCode from "./variants.vue?raw";

import Customise from "./customise.vue";
import CustomiseCode from "./customise.vue?raw";

import TickAndLabel from "./tick-and-label.vue";
import TickAndLabelCode from "./tick-and-label.vue?raw";

import Range from "./range.vue";
import RangeCode from "./range.vue?raw";
</script>

### Base

<ExampleViewer :component="Base" :code="BaseCode" />

### Sizes

The component can be displayed in different sizes using the `size` prop.

<ExampleViewer :component="Sizes" :code="SizesCode" />

### Variants

Different styles can be achieved with the `variant` prop.

<ExampleViewer :component="Variants" :code="VariantsCode" />

### Customise

<ExampleViewer :component="Customise" :code="CustomiseCode" />

### Tick and label

Customise the labels using slots.

<ExampleViewer :component="TickAndLabel" :code="TickAndLabelCode" />

### Range

When the `range` prop is set, the `modelValue` property will be an array of two values instead of a single value.

<ExampleViewer :component="Range" :code="RangeCode" />
