<script setup>
import Base from "./base.vue";
import BaseCode from "./base.vue?raw";

import Autocomplete from "./autocomplete.vue";
import AutocompleteCode from "./autocomplete.vue?raw";

import Templates from "./templates.vue";
import TemplatesCode from "./templates.vue?raw";

import Limits from "./limits.vue";
import LimitsCode from "./limits.vue?raw";

import Disabled from "./disabled.vue";
import DisabledCode from "./disabled.vue?raw";

import Variants from "./variants.vue";
import VariantsCode from "./variants.vue?raw";

import Sizes from "./sizes.vue";
import SizesCode from "./sizes.vue?raw";
</script>

### Base

<ExampleViewer :component="Base" :code="BaseCode" />

### Autocomplete

Unlike the dropdown or autocomplete components, the taginput component allows you to enter an arbitrary value (a value that is not in the list of options). This is useful for creating new tags on the fly. To enable this feature, set the `allow-new` prop to true.

The `options` prop can accept several different formats of values. They are similiar to the options definition of the [**Dropdown**](/components/dropdown.html) component:

- An array of primitives `['A', 'B', 'C']`
- An object literal with key-value pairs `{ a: 'A', b: 'B', c: 'C' }`
- An array of objects where each object represent an item
- An array of grouped items where each group object has its own `options` property
- Using the `<o-dropdown-item>` component directly inside the default template slot

::: info TypeScript
The options property type is defined by the `TaginputOptions` type.
:::

<ExampleViewer :component="Autocomplete" :code="AutocompleteCode" />

### Templates

Different parts of the component can be customised using template slots, e.g. the a custom header and footer can be added and the selected items can be customised.

<ExampleViewer :component="Templates" :code="TemplatesCode" />

### Limits

The number of entered items can be limited either by the character length of the item using the `maxlength` prop and by the number of times using the `maxitems` prop.

<ExampleViewer :component="Limits" :code="LimitsCode" />

### Disabled

Prevent inputs with the `disabled` prop.

<ExampleViewer :component="Disabled" :code="DisabledCode" />

### Variants

Different styles can be achieved with the `variant` prop.

<ExampleViewer :component="Variants" :code="VariantsCode" />

### Sizes

The component can be displayed in different sizes using the `size` prop.

<ExampleViewer :component="Sizes" :code="SizesCode" />
