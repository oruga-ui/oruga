<script setup>
import Base from "./base.vue";
import BaseCode from "./base.vue?raw";

import Closeable from "./closeable.vue";
import CloseableCode from "./closeable.vue?raw";

import Badge from "./badge.vue";
import BadgeCode from "./badge.vue?raw";

import Variants from "./variants.vue";
import VariantsCode from "./variants.vue?raw";

import Sizes from "./sizes.vue";
import SizesCode from "./sizes.vue?raw";
</script>

### Base

<ExampleViewer :component="Base" :code="BaseCode" />

### Closeable

Closeable tags have a button that can be focused, it emits a `close` event when clicked. The button can be overriden by the `close` slot.

<ExampleViewer :component="Closeable" :code="CloseableCode" />

### Badge

Using the badge style with the `badge` prop can highlight information to a user or draw their attention to a specific element. Badges typically display numbers or icons.

<ExampleViewer :component="Badge" :code="BadgeCode" />

### Variants

Like with buttons, different styles can be achieved with the `variant` prop.

<ExampleViewer :component="Variants" :code="VariantsCode" />

### Sizes

The component can also be displayed in different sizes using the `size` prop.

<ExampleViewer :component="Sizes" :code="SizesCode" />
