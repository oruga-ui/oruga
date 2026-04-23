<script setup>
import Base from "./base.vue";
import BaseCode from "./base.vue?raw";

import Accordion from "./accordion.vue";
import AccordionCode from "./accordion.vue?raw";
</script>

### Base

A custom trigger can be passed in the `trigger` slot.

::: info Accessibility Note:
The trigger container is already an interactive element with the `role="button"` attribute. For accessibility reasons, prevent adding other interactive elements such as buttons to avoid [nested-interactive](https://accessibilityinsights.io/info-examples/web/nested-interactive/) accessibility problems.
:::

<ExampleViewer :component="Base" :code="BaseCode" />

### Accordion

Combine multiple collapse components to create an accordion behaviour.

<ExampleViewer :component="Accordion" :code="AccordionCode" />
