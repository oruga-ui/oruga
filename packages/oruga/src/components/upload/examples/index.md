<script setup>
import Base from "./base.vue";
import BaseCode from "./base.vue?raw";

import DragDrop from "./drag-drop.vue";
import DragDropCode from "./drag-drop.vue?raw";

import Disabled from "./disabled.vue";
import DisabledCode from "./disabled.vue?raw";

import Variants from "./variants.vue";
import VariantsCode from "./variants.vue?raw";
</script>

### Base

<ExampleViewer :component="Base" :code="BaseCode" />

### Drag&Drop

Enable drag and drop using the `drag-drop` prop. To allow multiple files to be uploaded, set the `multiple` prop.

<ExampleViewer :component="DragDrop" :code="DragDropCode" />

### Disabled

Prevent inputs with the `disabled` prop.

<ExampleViewer :component="Disabled" :code="DisabledCode" />

### Variants

Different styles can be achieved with the `variant` prop.

<ExampleViewer :component="Variants" :code="VariantsCode" />
