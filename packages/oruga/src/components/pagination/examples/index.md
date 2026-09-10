<script setup>
import Base from "./base.vue";
import BaseCode from "./base.vue?raw";

import Simple from "./simple.vue";
import SimpleCode from "./simple.vue?raw";

import Positions from "./positions.vue";
import PositionsCode from "./positions.vue?raw";

import Sizes from "./sizes.vue";
import SizesCode from "./sizes.vue?raw";

import Disabled from "./disabled.vue";
import DisabledCode from "./disabled.vue?raw";

import Customise from "./customise.vue";
import CustomiseCode from "./customise.vue?raw";

import Templates from "./templates.vue";
import TemplatesCode from "./templates.vue?raw";
</script>

### Base

The component uses three main properties: the `current` prop, which is two-way bindable and shows the active page; the `total` prop, which defines the total number of pages; and the `per-page` prop, which is used to define the number of elements per page. The current page is marked with `aria-current` set to "page" as well. In addition, since pages likely have more than one navigation section, it is advisable to provide a descriptive `aria-label` for the `nav` element to reflect its purpose.

<ExampleViewer :component="Base" :code="BaseCode" />

### Simple

The component can be displayed in a simplified state by using the `simple` prop. This simplified representation uses `aria-live="polite"` to notify the screen reader of changes to the pagination state.

<ExampleViewer :component="Simple" :code="SimpleCode" />

### Positions

The compoponent can be positioned by the `position` prop.

<ExampleViewer :component="Positions" :code="PositionsCode" />

### Sizes

The component can be displayed in different sizes using the `size` prop.

<ExampleViewer :component="Sizes" :code="SizesCode" />

### Disabled

Use the `disabled` prop to prevent buttons from being clicked.

<ExampleViewer :component="Disabled" :code="DisabledCode" />

### Customise

<ExampleViewer :component="Customise" :code="CustomiseCode" />

### Templates

The component can be further customised by using template slots to override specific buttons.

<ExampleViewer :component="Templates" :code="TemplatesCode" />
