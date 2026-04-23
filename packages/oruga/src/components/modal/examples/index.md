<script setup>
import Base from "./base.vue";
import BaseCode from "./base.vue?raw";

import Alert from "./alert.vue";
import AlertCode from "./alert.vue?raw";

import Component from "./component.vue";
import ComponentCode from "./component.vue?raw";

import Teleport from "./teleport.vue";
import TeleportCode from "./teleport.vue?raw";

import Programmatically from "./programmatically.vue";
import ProgrammaticallyCode from "./programmatically.vue?raw";

import ProgrammaticallyAsync from "./programmatically-async.vue";
import ProgrammaticallyAsyncCode from "./programmatically-async.vue?raw";
</script>

### Base

Setting the `clipScroll` prop removes the body scrollbar. By default, the body retains a non scrollable scrollbar to prevent the background from shifting. However, this will set the body to `position="fixed"`, which may cause some layouts to break.

<ExampleViewer :component="Base" :code="BaseCode" />

### Alert

An alert modal interrupt the user's workflow to communicate an important messages and acquire an explicit response, for example confirmation prompts and error message confirmations. By setting `alert` prop the `alertdialog` aria role enables assistive technologies and browsers to distinguish alert dialogs from other dialogs so they have the option of giving alert dialogs special treatment, such as playing a system alert sound.

<ExampleViewer :component="Alert" :code="AlertCode" />

### Teleport

The `teleport` prop allows the modal to be "teleported" into any DOM node outside the DOM hierarchy of that component. By default, if only a boolean is passed, the modal will be teleported to the document body. In addition, any other destination can be passed as a value to the `teleport` prop.

<ExampleViewer :component="Teleport" :code="TeleportCode" />

### Dynamic Component

Instead of using the default slot, the `component` prop allows to pass any component that will be programmatically rendered inside the modal. Furthermore, an inline component created with a [render function](https://vuejs.org/guide/extras/render-function.html) can also be passed. Props and events can be passed to the component with `props` and `events` props too.

<ExampleViewer :component="Component" :code="ComponentCode" />

### Programmatically

This component provides a programmatic interface that can be accessed by the [`useOruga()`](/documentation/composables.html) composable. The composable can be used from outside of the Vue instance. For example, it can be used in Pinia or Vue Router with this syntax:

```js
import { useOruga } from "@oruga-ui/oruga-next";
const oruga = useOruga();
oruga.modal.open({...});
```

<ExampleViewer :component="Programmatically" :code="ProgrammaticallyCode" />

A programmatic instance returns a promise to await for. The promise gets resolved when the modal gets closed.

<ExampleViewer
    :component="ProgrammaticallyAsync"
    :code="ProgrammaticallyAsyncCode" />
