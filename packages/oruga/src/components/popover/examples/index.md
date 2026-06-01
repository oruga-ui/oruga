<script setup>
import Base from "./base.vue";
import BaseCode from "./base.vue?raw";

import Position from "./position.vue";
import PositionCode from "./position.vue?raw";

import Delay from "./delay.vue";
import DelayCode from "./delay.vue?raw";

import Backdrop from "./backdrop.vue";
import BackdropCode from "./backdrop.vue?raw";

import Modal from "./modal.vue";
import ModalCode from "./modal.vue?raw";
</script>

### Base

Usually the trigger element for a popover is a `<button>` element.
However, you can also use any other HTML element. By default, opening a
popover will close any other open popovers and it can be closed by
clicking outside the content. The behavior can be changed with the
`behavior` property.

::: info Accessibility Note:
If your trigger does not have a visible label, provide an accessible or
visually hidden label and communicates the popover's state to assistive
technologies.
:::

::: info Accessibility Note:
Use the `aria-haspopup` attribute on the trigger to indicate
the type of interactive popup that this element triggers, usually
`dialog` or `menu´; this should match the role of
the popover content. You can see all possible values [here](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-haspopup).
:::

<ExampleViewer :component="Base" :code="BaseCode" />

### Position

The direction in which the popover opens can be explicity defined using
the `position` property. By default, the direction is automatically
calculated based on the distance to the edge of the window.

Additionally, adding the `teleport` property will move the content to
the referenced DOM location instead of the current one.

<ExampleViewer :component="Position" :code="PositionCode" />

### Delay

The appearance of the content can be delayed using the `delay` property.

<ExampleViewer :component="Delay" :code="DelayCode" />

### Backdrop

The the `backdrop` property allows a full-page overlay to be added to the top-layer of the page. By default, attempting to interact with the backdrop will close the popover.

<ExampleViewer :component="Backdrop" :code="BackdropCode" />

### Modal

When the `modal` property is added, the popover appears in the middle of the screen as a modal-style overlay with a full-page backdrop. The `position` property is ignored when the `modal` property is used.

::: info Accessibility Note:
The popover modal style is mainly useful for improving the mobile experience. If you want to create a true modal, the [ODialog](/components/Dialog.html) element is the way to go.
:::
<ExampleViewer :component="Modal" :code="ModalCode" />
