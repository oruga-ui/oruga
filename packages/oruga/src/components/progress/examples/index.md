<script setup>
import Base from "./base.vue";
import BaseCode from "./base.vue?raw";

import Variants from "./variants.vue";
import VariantsCode from "./variants.vue?raw";

import Sizes from "./sizes.vue";
import SizesCode from "./sizes.vue?raw";

import Indeterminate from "./indeterminate.vue";
import IndeterminateCode from "./indeterminate.vue?raw";

import Value from "./value.vue";
import ValueCode from "./value.vue?raw";

import Page from "./page.vue";
import PageCode from "./page.vue?raw";

import Templates from "./templates.vue";
import TemplatesCode from "./templates.vue?raw";
</script>

### Base

The `value` prop sets the current progress. By default it is a number between `0` and `100`; the range can be changed with the `min` and `max` props. Values outside the range are clamped to it.

::: info Accessibility Note

- **Name**: Give each progress an accessible name with `aria-label` or `aria-labelledby`, which are passed to the native `progress` element together with all other attributes.

:::

<ExampleViewer :component="Base" :code="BaseCode" />

### Variants

Different styles can be achieved with the `variant` prop. The available values are defined by your theme. Do not rely on colour alone to convey meaning; add text or an icon as well.

<ExampleViewer :component="Variants" :code="VariantsCode" />

### Sizes

The component can be displayed in different sizes using the `size` prop. The available values are defined by your theme.

<ExampleViewer :component="Sizes" :code="SizesCode" />

### Indeterminate

When the duration of a task is unknown, leave the `value` prop undefined. The progress is then displayed in an indeterminate state and no current value is announced to assistive technologies.

<ExampleViewer :component="Indeterminate" :code="IndeterminateCode" />

### Value Label

Use the `show-value` prop to display the current value as a label. The `format` prop displays it either as the `raw` number or as a `percent` of the range, formatted for the given `locale`. For any other format, pass a function to the `formatter` prop; its result is also used as the `aria-valuetext` of the progress.

<ExampleViewer :component="Value" :code="ValueCode" />

### Page Progress

A global progress bar for page loads or route changes can be built by teleporting the component to the document body and fixing it to the top of the viewport.

<ExampleViewer :component="Page" :code="PageCode" />

### Templates

The label can be customised with the default slot. It receives the current `value` and the formatted `label` as slot props, and is rendered even if `show-value` is not set.

<ExampleViewer :component="Templates" :code="TemplatesCode" />
