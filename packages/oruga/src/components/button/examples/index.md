<script setup>
import Base from "./base.vue";
import BaseCode from "./base.vue?raw";

import Variants from "./variants.vue";
import VariantsCode from "./variants.vue?raw";

import States from "./states.vue";
import StatesCode from "./states.vue?raw";

import Outlined from "./outlined.vue";
import OutlinedCode from "./outlined.vue?raw";

import Inverted from "./inverted.vue";
import InvertedCode from "./inverted.vue?raw";

import Sizes from "./sizes.vue";
import SizesCode from "./sizes.vue?raw";

import Icons from "./icons.vue";
import IconsCode from "./icons.vue?raw";

import Tags from "./tags.vue";
import TagsCode from "./tags.vue?raw";
</script>

### Base

<ExampleViewer :component="Base" :code="BaseCode" />

### States

<ExampleViewer :component="States" :code="StatesCode" />

### Variants

Different styles can be achieved with the `variant` prop.

<ExampleViewer :component="Variants" :code="VariantsCode" />

### Outlined

Use the `outlined` prop in combination with the `variant` prop for a lightweight look.

<ExampleViewer :component="Outlined" :code="OutlinedCode" />

### Inverted

Use the `inverted` prop in combination with the `variant` prop for a clickable label look.

<ExampleViewer :component="Inverted" :code="InvertedCode" />

### Sizes

The component can be displayed in different sizes using the `size` prop.

<ExampleViewer :component="Sizes" :code="SizesCode" />

### Icons

<p>Add an icon to the button to explain its function more visually.</p>
<ExampleViewer :component="Icons" :code="IconsCode" />

### Tags

Instead of using the HTML `button` tag, the HTML tag can be customised using the `tag` prop, for example to define links using [vue-router](https://router.vuejs.org/) and `router-link` tag.

<ExampleViewer :component="Tags" :code="TagsCode" />
