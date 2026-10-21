<script setup>
import Base from "./base.vue";
import BaseCode from "./base.vue?raw";

import Structure from "./structure.vue";
import StructureCode from "./structure.vue?raw";

import Slots from "./slots.vue";
import SlotsCode from "./slots.vue?raw";

import Loading from "./loading.vue";
import LoadingCode from "./loading.vue?raw";

import Closing from "./closing.vue";
import ClosingCode from "./closing.vue?raw";

import Animation from "./animation.vue";
import AnimationCode from "./animation.vue?raw";

import Resizable from "./resizable.vue";
import ResizableCode from "./resizable.vue?raw";

import Teleport from "./teleport.vue";
import TeleportCode from "./teleport.vue?raw";

import Component from "./component.vue";
import ComponentCode from "./component.vue?raw";

import Programmatically from "./programmatically.vue";
import ProgrammaticallyCode from "./programmatically.vue?raw";
</script>

### Base

The drawer can be positioned to appear from each side of the viewport using the `position` property. Using the `fullscreen` property, the drawer covers the entire viewport.

::: info Accessibility Note:
The drawer is based on the native [`<dialog>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog) element and is only exposed to assistive technologies while it is open.
A drawer needs an accessible name. A `title` labels the drawer automatically, otherwise set the `ariaLabel` prop.
:::

<ExampleViewer :component="Base" :code="BaseCode" />

### Header, body and footer

Like the [Dialog](/components/Dialog.html), the drawer offers an optional header, a body and an optional footer.
The header is rendered when a `title`, `subtitle` or the `closeable` prop is used, and the footer when a `confirmButton` or `cancelButton` is set.
Each part can be replaced with the template slots `header`, `title`, `subtitle`, `default`, `content` and `footer`.

::: info Accessibility Note:
The `title` labels the drawer through `aria-labelledby`. Use `ariaDescribedby` to reference an element which describes the drawer.
The label of the close button can be set with `ariaCloseLabel` (default `"Close"`), e.g. for a translation.
:::

<ExampleViewer :component="Structure" :code="StructureCode" />

### Slots

Every part of the drawer can be replaced with a template slot. The slots `header`, `default`, `content` and `footer` receive the `close` and `confirm` functions. `close` accepts an optional string, which is passed as value to the `close` event. The template slot `close` replaces the icon of the close button.

<ExampleViewer :component="Slots" :code="SlotsCode" />

### Loading

The `loading` prop shows a loading spinner over the drawer, with an optional `loadingLabel`, and sets the confirm button to its loading state.

::: info Accessibility Note:
The loading overlay is announced as a status (`role="status"`, `aria-live="polite"`). Set a `loadingLabel`, so users of assistive technologies get a message too.
:::

<ExampleViewer :component="Loading" :code="LoadingCode" />

### Closing

By default the drawer closes when the user presses the escape key or clicks outside of the panel, which can be turned off with `closeOnEscape` and `closeOnBackdrop`. With `backdrop` the drawer is opened as modal dialog and the rest of the page becomes inert. In that case the `blockScroll` property controls how the page scrolling is blocked.

The `cancel` event is emitted when the user wishes to dismiss the drawer, and the `close` event when it has been closed. A `close` event carries the optional return value of the `close` function, `"cancel"` for the cancel button or `"confirm"` for `closeOnConfirm`.

::: info Accessibility Note:
With a `backdrop` the drawer is opened as modal dialog: the page behind is inert, the focus stays inside the drawer and returns to the previously focused element when the drawer is closed.
Without a `backdrop` the drawer is non-modal. The page stays interactive and the focus is not trapped.
:::

<ExampleViewer :component="Closing" :code="ClosingCode" />

### Animation

The drawer slides in from the edge defined by `position`. The `animation` prop selects another built-in preset, or disables the animation with `false`.
Alternatively, a fully custom transition can be implemented using a `@starting-style` CSS at-rule, with no JS needed.

::: info Accessibility Note:
The animation is skipped when the user prefers reduced motion (`prefers-reduced-motion`).
:::

<ExampleViewer :component="Animation" :code="AnimationCode" />

### Resizable

With the `resizable` prop, a handle on the inner edge of the drawer lets the user resize it by dragging or with the arrow keys (`Shift` for larger steps, `Home` and `End` for the limits).
The drawer is resized in width for the positions `left` and `right`, otherwise in height. The size is limited by the CSS `min-width` / `max-width` (`min-height` / `max-height`) of the drawer and the viewport, and the `resize` event reports the new size.

::: info Accessibility Note:
The resize handle is a keyboard accessible separator (`role="separator"`) with `aria-valuenow`, `aria-valuemin` and `aria-valuemax`. The label can be set with `ariaResizeLabel` (default `"Resize"`), e.g. for a translation.
:::

<ExampleViewer :component="Resizable" :code="ResizableCode" />

### Teleport

The `teleport` prop allows the drawer to be "teleported" into any DOM node outside the DOM hierarchy of that component. By default, if only a boolean is passed, the drawer will be teleported to the document body. In addition, any other destination can be passed as a value to the `teleport` prop.

<ExampleViewer :component="Teleport" :code="TeleportCode" />

### Dynamic Component

Instead of using the default slot, the `component` prop allows to pass any component that will be programmatically rendered inside the drawer. Furthermore, an inline component created with a [render function](https://vuejs.org/guide/extras/render-function.html) can also be passed. Props and events can be passed to the component with `props` and `events` props too.

<ExampleViewer :component="Component" :code="ComponentCode" />

### Programmatically

This component provides a programmatic interface that can be accessed by the [`useOruga()`](/documentation/composables.html) composable. The composable can be used from outside the Vue instance. For example, it can be used in Pinia or Vue Router with this syntax:

```js
import { useOruga } from "@oruga-ui/oruga-next";
const oruga = useOruga();
oruga.drawer.open({...});
```

::: info Accessibility Note:
Also set an `ariaLabel` or a `title` for a drawer which is opened programmatically.
:::

<ExampleViewer :component="Programmatically" :code="ProgrammaticallyCode" />
