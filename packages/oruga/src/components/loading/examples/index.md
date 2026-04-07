<script setup>
import Base from "./base.vue";
import BaseCode from "./base.vue?raw";

import Templates from "./templates.vue";
import TemplatesCode from "./templates.vue?raw";

import Programmatically from "./programmatically.vue";
import ProgrammaticallyCode from "./programmatically.vue?raw";
</script>

### Base

The loading state is displayed across the entire page if the `full-page` prop is added. Otherwise, the overlay will be aligned to the next wrapper element with `style="position: relative"`.

<ExampleViewer :component="Base" :code="BaseCode" />

### Templates

You can override the loading icon by defining custom HTML in the `default` template slot.

<ExampleViewer :component="Templates" :code="TemplatesCode" />

### Programmatically

This component provides a programmatic interface that can be accessed by the [`useOruga()`](/documentation/composables.html) composable. The composable can be used from outside the Vue instance. For example, it can be used in Pinia or Vue Router with this syntax:

```js
import { useOruga } from "@oruga-ui/oruga-next";
const oruga = useOruga();
oruga.loading.open({...});
```

<ExampleViewer :component="Programmatically" :code="ProgrammaticallyCode" />
