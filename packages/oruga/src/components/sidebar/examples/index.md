<script setup>
import Base from "./base.vue";
import BaseCode from "./base.vue?raw";

import Inline from "./inline.vue";
import InlineCode from "./inline.vue?raw";

import Teleport from "./teleport.vue";
import TeleportCode from "./teleport.vue?raw";

import Component from "./component.vue";
import ComponentCode from "./component.vue?raw";

import Programmatically from "./programmatically.vue";
import ProgrammaticallyCode from "./programmatically.vue?raw";
</script>

### Base

The sidebar can be positioned go appear from each side of the viewport using the `position` prop. Using `fullwidth` or `fullheight`, the sidebar overlaps the entire viewport width or height.

<ExampleViewer :component="Base" :code="BaseCode" />

### Inline

When the property `inline` is set, the component will be rendered in place. The appearance can be triggered with the `active` prop as usual.

<ExampleViewer :component="Inline" :code="InlineCode" />

### Teleport

The `teleport` prop allows the sidebar to be "teleported" into any DOM node outside the DOM hierarchy of that component. By default, if only a boolean is passed, the sidebar will be teleported to the document body. In addition, any other destination can be passed as a value to the `teleport` prop.

<ExampleViewer :component="Teleport" :code="TeleportCode" />

### Dynamic Component

Instead of using the default slot, the `component` prop allows to pass any component that will be programmatically rendered inside the sidebar. Furthermore, an inline component created with a [render function](https://vuejs.org/guide/extras/render-function.html) can also be passed. Props and events can be passed to the component with `props` and `events` props too.

<ExampleViewer :component="Component" :code="ComponentCode" />

### Programmatically

This component provides a programmatic interface that can be accessed by the [`useOruga()`](/documentation/composables.html) composable. composable. The composable can be used from outside the Vue instance. For example, it can be used in Pinia or Vue Router with this syntax:

```js
import { useOruga } from "@oruga-ui/oruga-next";
const oruga = useOruga();
oruga.sidebar.open({...});
```

<ExampleViewer :component="Programmatically" :code="ProgrammaticallyCode" />
