<script setup>
import Base from "./base.vue";
import BaseCode from "./base.vue?raw";

import Options from "./options.vue";
import OptionsCode from "./options.vue?raw";

import Separators from "./separators.vue";
import SeparatorsCode from "./separators.vue?raw";

import Icons from "./icons.vue";
import IconsCode from "./icons.vue?raw";

import Sizes from "./sizes.vue";
import SizesCode from "./sizes.vue?raw";

import Variants from "./variants.vue";
import VariantsCode from "./variants.vue?raw";

import Positions from "./positions.vue";
import PositionsCode from "./positions.vue?raw";

import Tags from "./tags.vue";
import TagsCode from "./tags.vue?raw";
</script>

### Base

Since breadcrumbs provide a navigation, it's a good idea to add a meaningful label such as `aria-label="breadcrumb"` to describe the type of navigation provided in the `nav` element. To determine the current page, set the `active` prop. This applies an `aria-current="page"` to the item to indicate that it represents the current page. Individual items can also be disabled using the `disabled` prop.

<ExampleViewer :component="Base" :code="BaseCode" />

### Separators

Dividers are automatically added in CSS by the theme. In addition, the component allows you to customise the sperator using the `seperator` prop.
The `seperator` slot can be used if further customisation is needed.

<ExampleViewer :component="Separators" :code="SeparatorsCode" />

### Options

Instead of using the `<o-breadcrumb-item>` component directly inside the default template slot, an `options` prop can be set, which allows the options to be set programmatically.
It accepts several different value formats:

- An array of primitives `['A', 'B', 'C']`
- An object literal with key-value pairs `{ a: 'A', b: 'B', c: 'C' }`
- An array of objects where each object represent an item

<ExampleViewer :component="Options" :code="OptionsCode" />

### Variants

Different styles can be achieved with the `variant` prop.

<ExampleViewer :component="Variants" :code="VariantsCode" />

### Sizes

The component can be displayed in different sizes using the `size` prop.

<ExampleViewer :component="Sizes" :code="SizesCode" />

### Positions

For alternative alignments, the breadcrumb can be positioned by the `position` prop.

<ExampleViewer :component="Positions" :code="PositionsCode" />

### Icons

You can add an icon to the item to explain its function more visually.

<ExampleViewer :component="Icons" :code="IconsCode" />

### Tags

By default the breadcrumb items are represented as HTML `a` tag elements.
The HTML tag can be customised using the `tag` prop for an item, for example to define links using [vue-router](https://router.vuejs.org/) and `router-link` tag.

<ExampleViewer :component="Tags" :code="TagsCode" />
