<script setup >
import Base from "./base.vue";
import BaseCode from "./base.vue?raw";

import Addons from "./addons.vue";
import AddonsCode from "./addons.vue?raw";

import Grouped from "./grouped.vue";
import GroupedCode from "./grouped.vue?raw";

import Horizontal from "./horizontal.vue";
import HorizontalCode from "./horizontal.vue?raw";

import Templates from "./templates.vue";
import TemplatesCode from "./templates.vue?raw";
</script>

### Base

<ExampleViewer :component="Base" :code="BaseCode" />

### Addons

Use the `addons` prop to attach multiple controls together.

<ExampleViewer :component="Addons" :code="AddonsCode" />

### Grouped

Use the `grouped` prop to group several controls that belong together.

<ExampleViewer :component="Grouped" :code="GroupedCode" />

### Horizontal

When the `horizontal` prop is set, the component will align horizontally.

<ExampleViewer :component="Horizontal" :code="HorizontalCode" />

### Templates

The `label` and the `message` can be customised using template slots if needed.

<ExampleViewer :component="Templates" :code="TemplatesCode" />
