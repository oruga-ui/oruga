<script setup>
import Base from "./base.vue";
import BaseCode from "./base.vue?raw";

import Links from "./links.vue";
import LinksCode from "./links.vue?raw";

import Options from "./options.vue";
import OptionsCode from "./options.vue?raw";
</script>

### Base

<ExampleViewer :component="Base" :code="BaseCode" />

### Links

Instead of using the HTML `button` tag, the HTML tag can be customised using the `tag` prop.

<ExampleViewer :component="Links" :code="LinksCode" />

### Options

Instead of using the `<o-menu-item>` component directly inside the default slot, an `options` prop can be set, which can be used to define the options programmatically. It accepts several different value formats:

- An array of primitives `['A', 'B', 'C']`
- An object literal with key-value pairs `{ a: 'A', b: 'B', c: 'C' }`
- An array of objects with `label` and `value` properties
- Grouped options by adding additional `options` to the option object.

::: info Note
The `options` prop works the same as the [**Select**](/components/select.html) input component `options` prop.
:::

<ExampleViewer :component="Options" :code="OptionsCode" />
