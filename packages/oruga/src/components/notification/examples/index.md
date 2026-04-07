<script setup>
import Base from "./base.vue";
import BaseCode from "./base.vue?raw";

import Variants from "./variants.vue";
import VariantsCode from "./variants.vue?raw";

import UseTypes from "./use-types.vue";
import UseTypesCode from "./use-types.vue?raw";

import AddCustomButtons from "./add-custom-buttons.vue";
import AddCustomButtonsCode from "./add-custom-buttons.vue?raw";

import ProgrammaticallyDefault from "./programmatically-default.vue";
import ProgrammaticallyDefaultCode from "./programmatically-default.vue?raw";

import ProgrammaticallyToast from "./programmatically-toast.vue";
import ProgrammaticallyToastCode from "./programmatically-toast.vue?raw";

import ProgrammaticallyCustom from "./programmatically-custom.vue";
import ProgrammaticallyCustomCode from "./programmatically-custom.vue?raw";
</script>

### Base

When a dialogue box seems a bit overkill for the task, notifications are a good way to display a simple message to inform the user.

<ExampleViewer :component="Base" :code="BaseCode" />

### Variants

Different styles can be achieved with the `variant` prop.

<ExampleViewer :component="Variants" :code="VariantsCode" />

### Use types

The `type` prop in combination with the `variant` prop adds specific icons to the notification.

<ExampleViewer :component="UseTypes" :code="UseTypesCode" />

### Add custom buttons

<ExampleViewer :component="AddCustomButtons" :code="AddCustomButtonsCode" />

### Programmatically

This component provides a programmatic interface that can be accessed by the [`useOruga()`](/documentation/composables.html) composable. The composable can be used from outside the Vue instance. For example, it can be used in Pinia or Vue Router with this syntax:

```js
import { useOruga } from "@oruga-ui/oruga-next";
const oruga = useOruga();
oruga.notification.open("Notify!");
```

<ExampleViewer
    :component="ProgrammaticallyDefault"
    :code="ProgrammaticallyDefaultCode" />

Toasts are lightweight notifications designed to resemble the push notifications popularised by mobile and desktop operating systems. They should consist of simple text only and be queued so as not to overwhelm the user.

<ExampleViewer
    :component="ProgrammaticallyToast"
    :code="ProgrammaticallyToastCode" />

For a more advanced experience, you can also pass any custom component via the `component` prop.

<ExampleViewer
    :component="ProgrammaticallyCustom"
    :code="ProgrammaticallyCustomCode" />
