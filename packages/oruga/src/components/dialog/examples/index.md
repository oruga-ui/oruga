<script setup>
import Base from "./base.vue";
import BaseCode from "./base.vue?raw";

import Modal from "./modal.vue";
import ModalCode from "./modal.vue?raw";

import Alert from "./alert.vue";
import AlertCode from "./alert.vue?raw";

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

The main `closeable` property will add a close button to the dialog header. The `closeOnBackdrop` property adds a a light dismiss user action, which closes the dialog box when the user clicks or taps outside of it. The `closeOnEscape` property allows platform-specific user actions, such as pressing the <kbd>ESC</kbd> key on desktop platforms, or performing a "back" or "dismiss" gesture on mobile platforms, to close the dialog box. Furthermore, by setting the `cancelButton` or `confirmButton` properties, associated buttons will be rendered in the footer section. With `closeOnConfirm`, the confirm button can also be used to close the dialog.

<ExampleViewer :component="Base" :code="BaseCode" />

### Modal

A simple _modal_ dialog box is created by setting the `backdrop` property, which inert the background. By default, attempting to interact with the backdrop closes the dialog box.

Setting the `blockScroll` property removes the body scrollbar. However, the body retains a non-scrollable scrollbar to prevent the background from shifting. This will set the body to `position="fixed"`, which may cause some layouts to break.

<ExampleViewer :component="Modal" :code="ModalCode" />

### Alert

An _alert_ dialog box is a type of modal dialog that interrupts the user's workflow in order to communicate an important message and to acquire a response. It is defined by setting the `alert` property. Examples include action confirmation prompts and error message confirmations. The dialog will have the [ARIA: alertdialog role](http://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/alertdialog_role), enabling assistive technologies and browsers to distinguish it from other dialogs and giving them the option to treat it specially, e.g. by playing a system alert sound.

<ExampleViewer :component="Alert" :code="AlertCode" />

### Form

One useful purpose of a dialog is to display forms within it. Each slot provides the `close()` and `confirm()`functions, which can be called from inside the slot content to trigger component events. Using the [`autofocus`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/autofocus) attribute to explicitly indicate the initial focus placement will help ensure the focus is initially set on the focusable element deemed to be the best initial focus placement for any particular dialog.

<ExampleViewer :component="Form" :code="FormCode" />

### Fullscreen

Using the `fullscreen` property, the dialog will cover the entire user viewport.

<ExampleViewer :component="Fullscreen" :code="FullscreenCode" />

### Image

The component provides a separate image section in the _body_ where an image can be placed using the `imageSrc` property. For accessibility reasons, don't forget to add an `imageAlt` property too.

<ExampleViewer :component="Image" :code="ImageCode" />

### Position

You can quickly change the alignment of all the text in the dialog box using the `textPosition` property. Additionally, you can align the footer buttons independently using the `buttonPosition` property.

<ExampleViewer :component="Position" :code="PositionCode" />

### Templates

The dialog container is seperated into a _header_, _body_ and _footer_ section, which can be defined separately either through properties or template slots. Therefore, the component provides a `header`, `title`, `subtitle`, `content`, `footer` as well as `confirmButton` and `cancelButton` named template slots, which can be used to customise HTML content.

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

<ExampleViewer :component="Programmatically" :code="ProgrammaticallyCode" />

A programmatic instance returns a promise to await for. The promise gets resolved when the dialog gets closed.

<ExampleViewer
    :component="ProgrammaticallyAsync"
    :code="ProgrammaticallyAsyncCode" />
