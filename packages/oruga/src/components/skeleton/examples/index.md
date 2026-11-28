<script setup>
import Base from "./base.vue";
import BaseCode from "./base.vue?raw";

import Circle from "./circle.vue";
import CircleCode from "./circle.vue?raw";

import Sizes from "./sizes.vue";
import SizesCode from "./sizes.vue?raw";

import Position from "./position.vue";
import PositionCode from "./position.vue?raw";
</script>

### Base

The width of the skeleton can be defined using the `width` prop.

<ExampleViewer :component="Base" :code="BaseCode" />

### Circle

Make it round using the `circle` prop.

<ExampleViewer :component="Circle" :code="CircleCode" />

### Sizes

The component can be displayed in different sizes using the `size` prop.

<ExampleViewer :component="Sizes" :code="SizesCode" />

### Position

Use the `position` prop to define the horizontal alignment (`left`, `centered` or `right`).

<ExampleViewer :component="Position" :code="PositionCode" />
