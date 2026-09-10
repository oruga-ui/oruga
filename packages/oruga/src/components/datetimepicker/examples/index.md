<script setup>
import Base from "./base.vue";
import BaseCode from "./base.vue?raw";

import FooterSlot from "./footer-slot.vue";
import FooterSlotCode from "./footer-slot.vue?raw";

import Inline from "./inline.vue";
import InlineCode from "./inline.vue?raw";

import MinMax from "./min-max.vue";
import MinMaxCode from "./min-max.vue?raw";
</script>

### Base

<ExampleViewer :component="Base" :code="BaseCode" />

### Inline

To render the component inline instead of a dropdown/modal use the `inline` prop.

<ExampleViewer :component="Inline" :code="InlineCode" />

### Footer slot

The component has an additional `footer` slot for customization.

<ExampleViewer :component="FooterSlot" :code="FooterSlotCode" />

### Min/Max Datetime

Use the `min-datetime` and `max-datetime` props to define a limited date range for the user to choose from.

<ExampleViewer :component="MinMax" :code="MinMaxCode" />
