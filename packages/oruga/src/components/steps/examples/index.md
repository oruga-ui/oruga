<script setup>
import Base from "./base.vue";
import BaseCode from "./base.vue?raw";

import Customise from "./customise.vue";
import CustomiseCode from "./customise.vue?raw";

import Variants from "./variants.vue";
import VariantsCode from "./variants.vue?raw";

import Sizes from "./sizes.vue";
import SizesCode from "./sizes.vue?raw";

import Vertical from "./vertical.vue";
import VerticalCode from "./vertical.vue?raw";
</script>

### Base

<ExampleViewer :component="Base" :code="BaseCode" />

### Variants

Different styles can be achieved with the `variant` prop. The `variant` prop can be set on the `Steps` as well as on the `StepItem` component.

<ExampleViewer :component="Variants" :code="VariantsCode" />

### Sizes

The component can be displayed in different sizes using the `size` prop.

<ExampleViewer :component="Sizes" :code="SizesCode" />

### Customise

<ExampleViewer :component="Customise" :code="CustomiseCode" />

### Vertical

Adding the `vertical` prop displays the component vertically instead of horizontally.

<ExampleViewer :component="Vertical" :code="VerticalCode" />
