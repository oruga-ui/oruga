<script setup>
import Base from "./base.vue";
import BaseCode from "./base.vue?raw";

import Types from "./types.vue";
import TypesCode from "./types.vue?raw";

import Positions from "./positions.vue";
import PositionsCode from "./positions.vue?raw";

import Expanded from "./expanded.vue";
import ExpandedCode from "./expanded.vue?raw";

import Variants from "./variants.vue";
import VariantsCode from "./variants.vue?raw";

import Sizes from "./sizes.vue";
import SizesCode from "./sizes.vue?raw";

import CustomHeader from "./custom-header.vue";
import CustomHeaderCode from "./custom-header.vue?raw";

import LongHeader from "./long-header.vue";
import LongHeaderCode from "./long-header.vue?raw";

import Vertical from "./vertical.vue";
import VerticalCode from "./vertical.vue?raw";
</script>

### Base

Each item component can have a `value` prop. The active tab is represented by the value of the item as the `modelValue` prop of the tabs component.

<ExampleViewer :component="Base" :code="BaseCode" />

### Types

The tabs header can be displayed in different styles using the `type` prop.

<ExampleViewer :component="Types" :code="TypesCode" />

### Positions

The tabs header can be positioned by the `position` prop.

<ExampleViewer :component="Positions" :code="PositionsCode" />

### Expanded

When the `expanded` prop is set, the tabs header will be occupy the full with it can have.

<ExampleViewer :component="Expanded" :code="ExpandedCode" />

### Variants

Different styles can be achieved with the `variant` prop. The `variant` prop can be set for the whole `Tabs` component as well as for each `TabItem`.

<ExampleViewer :component="Variants" :code="VariantsCode" />

### Sizes

The component can be displayed in different sizes using the `size` prop.

<ExampleViewer :component="Sizes" :code="SizesCode" />

### Vertical

Adding the `vertical` prop displays the component vertically instead of horizontally.

<ExampleViewer :component="Vertical" :code="VerticalCode" />

### Custom header

The individual tab label can be customised using the `header` slot.

<ExampleViewer :component="CustomHeader" :code="CustomHeaderCode" />

### Long header

The `multiple` prop allows to break the tab header to be broken into multiple lines if there are too many tabs for one line.

<ExampleViewer :component="LongHeader" :code="LongHeaderCode" />
