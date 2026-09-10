<script setup>
import Base from "./base.vue";
import BaseCode from "./base.vue?raw";

import Variants from "./variants.vue";
import VariantsCode from "./variants.vue?raw";

import Sizes from "./sizes.vue";
import SizesCode from "./sizes.vue?raw";

import Customise from "./customise.vue";
import CustomiseCode from "./customise.vue?raw";
</script>

### Base

The default value of a checkbox is `false` when unchecked and `true` wenn checked. Use the `true-value` and `false-value` properties to specify different value that will be used as the `modelValue` property when the specific radio is checked and unchecked

<ExampleViewer :component="Base" :code="BaseCode" />

### Variants

Different styles can be achieved with the `variant` prop.

<ExampleViewer :component="Variants" :code="VariantsCode" />

### Sizes

The component can be displayed in different sizes using the `size` prop.

<ExampleViewer :component="Sizes" :code="SizesCode" />

### Customise

By default, the component supports a label which is displayed to the right of the toggle unless the `position` prop is set to "left".

<ExampleViewer :component="Customise" :code="CustomiseCode" />
