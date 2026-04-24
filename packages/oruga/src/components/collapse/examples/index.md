<script setup>
import Base from "./base.vue";
import BaseCode from "./base.vue?raw";

import Position from "./position.vue";
import PositionCode from "./position.vue?raw";

import Accordion from "./accordion.vue";
import AccordionCode from "./accordion.vue?raw";
</script>

### Base

A custom trigger can be passed in the `trigger` slot oder by the `label` property.
When the controlled content is hidden, the trigger is often styled as a typical push button with a right-pointing arrow or triangle, to indicate that activating the trigger will display the hidden content.
When the content is visible, the arrow or triangle usually points down.

::: info Accessibility Note:
The trigger container is already an interactive element with the `role="button"` attribute. For accessibility reasons, prevent adding other interactive elements such as buttons in the `trigger` slot to avoid [nested-interactive](https://accessibilityinsights.io/info-examples/web/nested-interactive/) accessibility problems.
:::

<ExampleViewer :component="Base" :code="BaseCode" />

### Position

The collapse can be configured by the `position` property to open to top instead of bottom.

<ExampleViewer :component="Position" :code="PositionCode" />

### Accordion

Using the [`name`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/details#name) property multiple collapse components can be connected to create an accordion behaviour, with only one content open at a time.

<ExampleViewer :component="Accordion" :code="AccordionCode" />
