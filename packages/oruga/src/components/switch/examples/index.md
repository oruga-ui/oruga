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

The default value of a switch is `false` when it is off and `true` when it is on. Use the `true-value` and `false-value` props to specify different values that will be used as the `model-value` when the switch is on and off.

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
