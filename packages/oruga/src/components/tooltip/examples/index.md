<script setup>
import Base from "./base.vue";
import BaseCode from "./base.vue?raw";

import Triggers from "./triggers.vue";
import TriggersCode from "./triggers.vue?raw";

import Variants from "./variants.vue";
import VariantsCode from "./variants.vue?raw";

import Position from "./position.vue";
import PositionCode from "./position.vue?raw";

import Templates from "./templates.vue";
import TemplatesCode from "./templates.vue?raw";
</script>

### Base

While a tooltip can be placed on any content, they generally are tips for tools or controls, such as providing additional content for icons that have brief labels. An example of a native browser tooltip is the way some browsers display an element's `title` attribute on long mouse hover. However, this feature cannot be activated through either keyboard focus or touch interaction, making this feature inaccessible. If the information is important enough to include as a tooltip or title, consider including it in visible text.

<ExampleViewer :component="Base" :code="BaseCode" />

### Triggers

The tooltip opens on hover and focus by default, providing accessible hover text for any trigger element. The `always` prop keeps it permanently visible, and the `active` prop allows external control via `v-model:active`. For click-triggered overlays, use the [`OPopover`](/components/Popover) component instead.

<ExampleViewer :component="Triggers" :code="TriggersCode" />

### Position

The direction in which the tooltip opens can be defined by the `position` prop. By default, the direction is automatically calculated from the distance to the edge of the window. Adding the `teleport` prop additionally will move the tooltip to the referenced DOM location instead.

<ExampleViewer :component="Position" :code="PositionCode" />

### Variants

Different styles can be achieved with the `variant` prop.

<ExampleViewer :component="Variants" :code="VariantsCode" />

### Templates

The tooltip label can be customised using the `content` template slot.

::: info Accessibility Note:
In terms of accessibility, tooltips provide additional information, generally with no direct interaction on the tooltip itself. Therefore, they should not contain any interactive elements, like links, inputs, or buttons; and it will never receive active focus itself. A tooltip is not considered to be a popup in this context.
:::

<ExampleViewer :component="Templates" :code="TemplatesCode" />
