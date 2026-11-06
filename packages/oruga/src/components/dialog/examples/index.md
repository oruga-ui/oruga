<script setup>
import Base from "./base.vue";
import BaseCode from "./base.vue?raw";

import Closing from "./closing.vue";
import ClosingCode from "./closing.vue?raw";

import Animation from "./animation.vue";
import AnimationCode from "./animation.vue?raw";

import Size from "./size.vue";
import SizeCode from "./size.vue?raw";

import Loading from "./loading.vue";
import LoadingCode from "./loading.vue?raw";

import Modal from "./modal.vue";
import ModalCode from "./modal.vue?raw";

import Alert from "./alert.vue";
import AlertCode from "./alert.vue?raw";

import Draggable from "./draggable.vue";
import DraggableCode from "./draggable.vue?raw";

import Form from "./form.vue";
import FormCode from "./form.vue?raw";

import Fullscreen from "./fullscreen.vue";
import FullscreenCode from "./fullscreen.vue?raw";

import Image from "./image.vue";
import ImageCode from "./image.vue?raw";

import Position from "./position.vue";
import PositionCode from "./position.vue?raw";

import Templates from "./templates.vue";
import TemplatesCode from "./templates.vue?raw";

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

As dialogs are generally placed as an overlay on top of the rest of the page content, every dialog needs a mechanism that allows users to close it. The most reliable way is to include an explicit button for this purpose, such as a _Confirm_, _Cancel_ or _Close_ button. The component itself can handle different types of user actions that can be used to close the dialog box.

The main `closeable` property will add a close button to the dialog header. The `closeOnBackdrop` property adds a light dismiss user action, which closes the dialog box when the user clicks or taps outside of it (this requires a browser which supports the `closedby` attribute of the dialog element). The `closeOnEscape` property allows platform-specific user actions, such as pressing the <kbd>ESC</kbd> key on desktop platforms, or performing a "back" or "dismiss" gesture on mobile platforms, to close the dialog box. Furthermore, by setting the `cancelButton` or `confirmButton` properties, associated buttons will be rendered in the footer section. With `closeOnConfirm`, the confirm button can also be used to close the dialog.

::: info Accessibility Note:
A dialog needs an accessible name. The `title` labels the dialog through `aria-labelledby`. Without a title, set the `ariaLabel` property. Use `ariaDescribedby` to reference an element, which describes the dialog.
The label of the close button can be set with `ariaCloseLabel` (default `"Close"`), e.g. for a translation.
:::

<ExampleViewer :component="Base" :code="BaseCode" />

### Modal

A simple _modal_ dialog box is created by setting the `backdrop` property, which inert the background. By default, attempting to interact with the backdrop closes the dialog box.

::: info Accessibility Note:
A modal dialog is opened with the native `showModal()` function: the page behind is inert, the focus stays inside the dialog and returns to the previously focused element when the dialog is closed.
A dialog without a `backdrop` is non-modal. The page stays interactive and the focus is not trapped.
:::

Setting the `blockScroll` property removes the body scrollbar. However, the body retains a non-scrollable scrollbar to prevent the background from shifting. This will set the body to `position="fixed"`, which may cause some layouts to break.

<ExampleViewer :component="Modal" :code="ModalCode" />

### Alert

An _alert_ dialog box is a type of modal dialog that interrupts the user's workflow in order to communicate an important message and to acquire a response. It is defined by setting the `alert` property. Examples include action confirmation prompts and error message confirmations. The dialog will have the [ARIA: alertdialog role](http://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/alertdialog_role), enabling assistive technologies and browsers to distinguish it from other dialogs and giving them the option to treat it specially, e.g. by playing a system alert sound.

::: info Accessibility Note:
Link the message of an alert dialog with the `ariaDescribedby` property, so assistive technologies read it out when the dialog opens. The initial focus is set on the first button in the footer, therefore put the least destructive action, usually _Cancel_, first.
:::

<ExampleViewer :component="Alert" :code="AlertCode" />

### Closing

By default the dialog closes when the user presses the escape key or, for a modal dialog, clicks outside of the panel. This can be turned off with `closeOnEscape` and `closeOnBackdrop`. The `closeable` property adds a close button to the header.

The `cancel` event is emitted when the user wishes to dismiss the dialog, e.g. with the escape key. The `close` event is emitted when the dialog has been closed. It carries the optional return value of the `close` function, `"cancel"` for the cancel button or `"confirm"` for `closeOnConfirm`.

::: info Accessibility Note:
Do not remove all ways to close a dialog. Keep at least one visible control, such as a close or cancel button, because not every user knows the escape key or is able to click on the backdrop.
:::

<ExampleViewer :component="Closing" :code="ClosingCode" />

### Animation

The dialog is animated when it opens and closes. The `animation` property selects one of the built-in presets, or disables the animation with `false`. Alternatively, a fully custom transition can be implemented using a `@starting-style` CSS at-rule, with no JS needed.

::: info Accessibility Note:
The animation is skipped when the user prefers reduced motion (`prefers-reduced-motion`).
:::

<ExampleViewer :component="Animation" :code="AnimationCode" />

### Position

You can quickly change the alignment of all the text in the dialog box using the `textPosition` property. Additionally, you can align the footer buttons independently using the `buttonPosition` property.

<ExampleViewer :component="Position" :code="PositionCode" />

### Size

The `size` property selects a predefined size of the dialog, which is defined by the theme. The `maxWidth` and `maxHeight` properties limit the size of the dialog, the content of the body is scrollable when it does not fit anymore.

<ExampleViewer :component="Size" :code="SizeCode" />

### Fullscreen

Using the `fullscreen` property, the dialog will cover the entire user viewport.

<ExampleViewer :component="Fullscreen" :code="FullscreenCode" />

### Loading

The `loading` property shows a loading spinner over the dialog, with an optional `loadingLabel`, and sets the confirm button to its loading state. Disable the other ways to close the dialog while the dialog is busy.

::: info Accessibility Note:
The loading overlay is announced as a status (`role="status"`, `aria-live="polite"`). Set a `loadingLabel`, so users of assistive technologies get a message too.
:::

<ExampleViewer :component="Loading" :code="LoadingCode" />

### Draggable

Enabling the `draggable` property lets the user reposition the Dialog by dragging it from its header.

::: info Accessibility Note:
Dragging is a pointer-only enhancement. Never rely on the position of the dialog, and make sure that all of its content and actions stay reachable without moving it.
:::

<ExampleViewer :component="Draggable" :code="DraggableCode" />

### Form

One useful purpose of a dialog is to display forms within it. Each slot provides the `close()` and `confirm()`functions, which can be called from inside the slot content to trigger component events. Using the [`autofocus`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/autofocus) attribute to explicitly indicate the initial focus placement will help ensure the focus is initially set on the focusable element deemed to be the best initial focus placement for any particular dialog.

Trigger the `confirm()` function from the `submit` event of the form instead of a button click, so the browser validates the required fields first. Add the matching `autocomplete` attribute to the fields.

<ExampleViewer :component="Form" :code="FormCode" />

### Image

The component provides a separate image section in the _body_ where an image can be placed using the `imageSrc` property. For accessibility reasons, don't forget to add an `imageAlt` property too.
A dialog with only an image has no title, so also set an `ariaLabel`.

<ExampleViewer :component="Image" :code="ImageCode" />

### Templates

The dialog container is seperated into a _header_, _body_ and _footer_ section, which can be defined separately either through properties or template slots. Therefore, the component provides a `header`, `title`, `subtitle`, `content`, `footer` as well as `confirmButton` and `cancelButton` named template slots, which can be used to customise HTML content.

::: info Accessibility Note:
The content of the `cancelButton` and `confirmButton` slots is rendered inside a button. Do not place other interactive elements, such as links, in these slots to avoid [nested-interactive](https://accessibilityinsights.io/info-examples/web/nested-interactive/) accessibility problems.
:::

<ExampleViewer :component="Templates" :code="TemplatesCode" />

### Dynamic Component

Rather than using the default slot, the `component` prop allows to pass any component that will be programmatically rendered inside the dialog component. Furthermore, an inline component created with a [render function](https://vuejs.org/guide/extras/render-function.html) can also be passed. Props and events can be passed to the component with `props` and `events` properties too.

<ExampleViewer :component="Component" :code="ComponentCode" />

### Teleport

The `teleport` prop allows the dialog to be "teleported" into any DOM node outside the DOM hierarchy of the component placed in. By default, if only a boolean is passed, the diaog will be teleported to the document body. In addition, any other destination could be passed as _string_ or the DOM Node element.

<ExampleViewer :component="Teleport" :code="TeleportCode" />

### Programmatically

This component provides a programmatic interface that can be accessed by the [`useOruga()`](/documentation/composables.html) composable. The composable can be used from outside of the Vue instance. For example, it can be used in Pinia or Vue Router with this syntax:

```js
import { useOruga } from "@oruga-ui/oruga-next";
const oruga = useOruga();
oruga.dialog.open({...});
```

::: info Accessibility Note:
Also set an `ariaLabel` or a `title` for a dialog which is opened programmatically.
:::

A component which is rendered inside the dialog can close it by emitting a `close` event with an optional return value, which is passed to the `close` event of the dialog.

<ExampleViewer :component="Programmatically" :code="ProgrammaticallyCode" />

A programmatic instance returns a promise to await for. The promise gets resolved when the dialog gets closed, with the arguments of the `close` event.

<ExampleViewer
    :component="ProgrammaticallyAsync"
    :code="ProgrammaticallyAsyncCode" />
