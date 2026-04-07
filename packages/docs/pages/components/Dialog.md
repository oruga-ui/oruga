[//]: # "This file is generated and should not be edited by hand!"

# Dialog

<section class="odocs-head">

The **Dialog** component is a flexible and extensible content container overlay on either the primary window or another dialog. It is based on the [HTML \<dialog\> element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog) and can be used to create both modal and non-modal dialog boxes.
Modal dialog boxes interrupt interaction with the rest of the page being inert,
while non-modal dialog boxes allow interaction with the rest of the page.
Inert content outside an active dialog box is usually visually obscured or dimmed, making it difficult to discern.
By default, modal overlays contain their own tab sequence, preventing users from navigating outside the component.
The component implements the W3C ARIA APG [Dialog (Modal) Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/) as well as the W3C ARIA APG [Alert and Message Dialogs Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/alertdialog/).

</section>

<section class="odocs-examples">

## Examples

<script setup>
import Base from "@/components/Dialog/examples/base.vue";
import BaseCode from "@/components/Dialog/examples/base.vue?raw";

import Modal from "@/components/Dialog/examples/modal.vue";
import ModalCode from "@/components/Dialog/examples/modal.vue?raw";

import Alert from "@/components/Dialog/examples/alert.vue";
import AlertCode from "@/components/Dialog/examples/alert.vue?raw";

import Form from "@/components/Dialog/examples/form.vue";
import FormCode from "@/components/Dialog/examples/form.vue?raw";

import Fullscreen from "@/components/Dialog/examples/fullscreen.vue";
import FullscreenCode from "@/components/Dialog/examples/fullscreen.vue?raw";

import Image from "@/components/Dialog/examples/image.vue";
import ImageCode from "@/components/Dialog/examples/image.vue?raw";

import Position from "@/components/Dialog/examples/position.vue";
import PositionCode from "@/components/Dialog/examples/position.vue?raw";

import Templates from "@/components/Dialog/examples/templates.vue";
import TemplatesCode from "@/components/Dialog/examples/templates.vue?raw";

import Component from "@/components/Dialog/examples/component.vue";
import ComponentCode from "@/components/Dialog/examples/component.vue?raw";

import Teleport from "@/components/Dialog/examples/teleport.vue";
import TeleportCode from "@/components/Dialog/examples/teleport.vue?raw";

import Programmatically from "@/components/Dialog/examples/programmatically.vue";
import ProgrammaticallyCode from "@/components/Dialog/examples/programmatically.vue?raw";

import ProgrammaticallyAsync from "@/components/Dialog/examples/programmatically-async.vue";
import ProgrammaticallyAsyncCode from "@/components/Dialog/examples/programmatically-async.vue?raw";
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

</section>

<section class="odocs-specs">

## Dialog Component

> Dialog is a container to display content in an overlay window.

```html
<o-dialog></o-dialog>
```

### Props

| Prop name        | Description                                                                                                                                                                                                                                                                                                                                                    | Type                                       | Values                                                                          | Default                                                                                                                                                      |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| active           | Whether dialog is active or not, use v-model:active to make it two-way binding                                                                                                                                                                                                                                                                                 | boolean                                    | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                  |
| alert            | This enables the `alertdialog` role, allowing assistive technologies and browsers to distinguish alert dialogs from other dialogs.<br/>Alert dialogs interrupt the user's workflow to communicate an important messages and acquire an explicit response.<br/>Examples include error messages that require confirmation and other action confirmation prompts. | boolean                                    | -                                                                               |                                                                                                                                                              |
| animation        | Custom animation (transition name)                                                                                                                                                                                                                                                                                                                             | string                                     | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>dialog: {<br>&nbsp;&nbsp;animation: "zoom-out"<br>}</code>       |
| ariaCloseLabel   | Accessibility label for the close button                                                                                                                                                                                                                                                                                                                       | string                                     | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>dialog: {<br>&nbsp;&nbsp;ariaCloseLabel: "Close"<br>}</code>     |
| ariaDescribedby  | Accessibility aria-describedby to be passed to the div root element - if a title is set, it is linked to the title                                                                                                                                                                                                                                             | string                                     | -                                                                               |                                                                                                                                                              |
| ariaLabel        | Accessibility aria-label to be passed to the div root element                                                                                                                                                                                                                                                                                                  | string                                     | -                                                                               |                                                                                                                                                              |
| backdrop         | Show an backdrop overlay background; make it a modal dialog                                                                                                                                                                                                                                                                                                    | boolean                                    | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>dialog: {<br>&nbsp;&nbsp;backdrop: true<br>}</code>              |
| blockScroll      | Whether background scrollbar should be blocked/removed when dialog is visible                                                                                                                                                                                                                                                                                  | boolean                                    | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>dialog: {<br>&nbsp;&nbsp;blockScroll: true<br>}</code>           |
| buttonPosition   | Position of the footer buttons                                                                                                                                                                                                                                                                                                                                 | "center" \| "left" \| "right"              | -                                                                               |                                                                                                                                                              |
| cancelButton     | Render a cancel button and set text text as label                                                                                                                                                                                                                                                                                                              | string                                     | -                                                                               |                                                                                                                                                              |
| cancelVariant    | Color variant of the cancel button                                                                                                                                                                                                                                                                                                                             | string                                     | `primary`, `info`, `success`, `warning`, `danger`, `and any other custom color` |                                                                                                                                                              |
| closeIcon        | Close icon name                                                                                                                                                                                                                                                                                                                                                | string                                     | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>dialog: {<br>&nbsp;&nbsp;closeIcon: "close"<br>}</code>          |
| closeIconSize    | Close icon size                                                                                                                                                                                                                                                                                                                                                | string                                     | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>dialog: {<br>&nbsp;&nbsp;closeIconSize: undefined<br>}</code>    |
| closeOnBackdrop  | Close the dialog when clicked outside of the panel                                                                                                                                                                                                                                                                                                             | boolean                                    | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>dialog: {<br>&nbsp;&nbsp;closeOnBackdrop: true<br>}</code>       |
| closeOnConfirm   | Close the dialog when the confirm button is preset                                                                                                                                                                                                                                                                                                             | boolean                                    | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>dialog: {<br>&nbsp;&nbsp;closeOnConfirm: false<br>}</code>       |
| closeOnEscape    | Close the dialog when pressing escape key                                                                                                                                                                                                                                                                                                                      | boolean                                    | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>dialog: {<br>&nbsp;&nbsp;closeOnEscape: true<br>}</code>         |
| closeable        | Adds close button to the header to hide the dialog                                                                                                                                                                                                                                                                                                             | boolean                                    | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>dialog: {<br>&nbsp;&nbsp;closeable: false<br>}</code>            |
| component        | Component to be injected.<br/>Close the component by emitting a 'close' event — `$emit('close')`                                                                                                                                                                                                                                                               | C                                          | -                                                                               |                                                                                                                                                              |
| confirmButton    | Render a confirm button and set text as label                                                                                                                                                                                                                                                                                                                  | string                                     | -                                                                               |                                                                                                                                                              |
| confirmVariant   | Color variant of the confirm button                                                                                                                                                                                                                                                                                                                            | string                                     | `primary`, `info`, `success`, `warning`, `danger`, `and any other custom color` |                                                                                                                                                              |
| content          | Dialog body content, unnecessary when content slot is used                                                                                                                                                                                                                                                                                                     | string                                     | -                                                                               |                                                                                                                                                              |
| disableCancel    | Disable the cancel button                                                                                                                                                                                                                                                                                                                                      | boolean                                    | -                                                                               |                                                                                                                                                              |
| disableConfirm   | Disable the confirm button                                                                                                                                                                                                                                                                                                                                     | boolean                                    | -                                                                               |                                                                                                                                                              |
| events           | Events to be binded to the injected component                                                                                                                                                                                                                                                                                                                  | EmitsToProps&lt;ComponentEmit&lt;C&gt;&gt; | -                                                                               |                                                                                                                                                              |
| fullscreen       | Display dialog as full screen                                                                                                                                                                                                                                                                                                                                  | boolean                                    | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                  |
| iconPack         | Icon pack to use for the close icon                                                                                                                                                                                                                                                                                                                            | string                                     | `mdi`, `fa`, `fas and any other custom icon pack`                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>dialog: {<br>&nbsp;&nbsp;iconPack: undefined<br>}</code>         |
| imageAlt         | Dialog image alt, unnecessary when image slot is used                                                                                                                                                                                                                                                                                                          | string                                     | -                                                                               |                                                                                                                                                              |
| imageSrc         | Dialog image src, unnecessary when image slot is used                                                                                                                                                                                                                                                                                                          | string                                     | -                                                                               |                                                                                                                                                              |
| loading          | Show a loading spinner in the dialog                                                                                                                                                                                                                                                                                                                           | boolean                                    | -                                                                               |                                                                                                                                                              |
| loadingLabel     | Show label beside the loading icon                                                                                                                                                                                                                                                                                                                             | string                                     | -                                                                               |                                                                                                                                                              |
| maxHeight        | Max height of the dialog                                                                                                                                                                                                                                                                                                                                       | Numberish                                  | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>dialog: {<br>&nbsp;&nbsp;maxHeight: "80vh"<br>}</code>           |
| maxWidth         | Max width of the dialog                                                                                                                                                                                                                                                                                                                                        | Numberish                                  | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>dialog: {<br>&nbsp;&nbsp;maxWidth: "80vw"<br>}</code>            |
| mobileBreakpoint | Mobile breakpoint as `max-width` value                                                                                                                                                                                                                                                                                                                         | string                                     | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>dialog: {<br>&nbsp;&nbsp;mobileBreakpoint: undefined<br>}</code> |
| override         | Override existing theme classes completely                                                                                                                                                                                                                                                                                                                     | boolean                                    | -                                                                               |                                                                                                                                                              |
| props            | Props to be binded to the injected component                                                                                                                                                                                                                                                                                                                   | ComponentProps&lt;C&gt;                    | -                                                                               |                                                                                                                                                              |
| subtitle         | Dialog header subtitle, unnecessary when subtitle slot is used                                                                                                                                                                                                                                                                                                 | string                                     | -                                                                               |                                                                                                                                                              |
| teleport         | Append the component to another part of the DOM.<br/>Set `true` to append the component to the body.<br/>In addition, any CSS selector string or an actual DOM node can be used.                                                                                                                                                                               | boolean \| object \| string                | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>dialog: {<br>&nbsp;&nbsp;teleport: false<br>}</code>             |
| textPosition     | Text alignment in its entirely                                                                                                                                                                                                                                                                                                                                 | "center" \| "left" \| "right"              | -                                                                               |                                                                                                                                                              |
| title            | Dialog header title, unnecessary when title slot is used                                                                                                                                                                                                                                                                                                       | string                                     | -                                                                               |                                                                                                                                                              |

### Events

| Event name    | Properties                                | Description                                                              |
| ------------- | ----------------------------------------- | ------------------------------------------------------------------------ |
| update:active | **value** `boolean` - updated active prop | active prop two-way binding                                              |
| close         | **event** `Event` - native event          | the event is fired when the dialog has been closed                       |
| cancel        | **event** `Event` - native event          | the event is fired when the user wish to dismiss the current open dialog |
| confirm       | **event** `Event` - native event          | the event is fired when the confirm button get clicked                   |

### Slots

| Name          | Description                                            | Bindings                                                                                                                                        |
| ------------- | ------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| header        | Override the header                                    | **close** `(event: Event): void` - function to emit a `close` event                                                                             |
| title         | Override the header title, default is title prop       |                                                                                                                                                 |
| subtitle      | Override the header subtitle, default is subtitle prop |                                                                                                                                                 |
| close         | Define a custom close icon                             |                                                                                                                                                 |
| image         | Override the image element                             |                                                                                                                                                 |
| default       | Override the default dialog body                       | **close** `(event: Event): void` - function to emit a `close` event<br/>**confirm** `(event: Event): void` - function to emit a `confirm` event |
| content       | Override the body content, default is content prop     | **close** `(event: Event): void` - function to emit a `close` event<br/>**confirm** `(event: Event): void` - function to emit a `confirm` event |
| footer        | Override the footer                                    | **close** `(event: Event): void` - function to emit a `close` event<br/>**confirm** `(event: Event): void` - function to emit a `confirm` event |
| cancelButton  | Define the cancel button label                         |                                                                                                                                                 |
| confirmButton | Define the confirm button label                        |                                                                                                                                                 |

</section>

<section class="odocs-classes">

## Class Inspector

<inspector-dialog-viewer />

</section>

<section class="odocs-style">

## Sass Variables

<div class="theme-oruga">

> Current theme ➜ _[Oruga](https://github.com/oruga-ui/theme-oruga)_

| SASS Variable                     | Default                               |
| --------------------------------- | ------------------------------------- |
| $dialog-spacer                    | calc(2 \* h.useVar("control-spacer")) |
| $dialog-zindex                    | map.get(vars.$zindex, "fixed")        |
| $dialog-box-shadow                | h.useVar("overlay-box-shadow")        |
| $dialog-background-color          | h.useVar("control-background-color")  |
| $dialog-border-width              | h.useVar("control-border-width")      |
| $dialog-border-style              | solid                                 |
| $dialog-border-color              | h.useVar("control-border-color")      |
| $dialog-border-radius             | h.useVar("border-radius")             |
| $dialog-backdrop-background-color | h.useVar( "overlay-background-color") |
| $dialog-header-padding            | $dialog-spacer                        |
| $dialog-header-background-color   | inherit                               |
| $dialog-body-padding              | $dialog-spacer                        |
| $dialog-body-background-color     | inherit                               |
| $dialog-footer-padding            | $dialog-spacer                        |
| $dialog-footer-background-color   | inherit                               |
| $dialog-title-color               | h.useVar("font-color")                |
| $dialog-title-font-size           | 2em                                   |
| $dialog-title-font-weight         | bold                                  |
| $dialog-subtitle-color            | h.useVar("font-color")                |
| $dialog-subtitle-font-size        | 1.5em                                 |
| $dialog-subtitle-font-weight      | normal                                |
| $dialog-content-color             | h.useVar("font-color")                |
| $dialog-content-font-size         | h.useVar("font-size")                 |
| $dialog-content-font-weight       | h.useVar("font-weight")               |
| $dialog-close-top                 | $dialog-spacer                        |
| $dialog-close-right               | $dialog-spacer                        |
| $dialog-close-color               | h.useVar("black")                     |
| $dialog-close-size                | 2rem                                  |
| $dialog-close-border-radius       | h.useVar("border-radius-rounded")     |
| $dialog-close-background-color    | inherit                               |

See ➜ 📄 [SCSS file](https://github.com/oruga-ui/theme-oruga/tree/main/src/assets/scss/components/_dialog.scss)

</div>
<div class="theme-bulma">

> Current theme ➜ _[Bulma](https://github.com/oruga-ui/theme-bulma)_

<p>The theme does not have any custom variables for this component.</p>
</div>
<div class="theme-bootstrap">

> Current theme ➜ _[Bootstrap](https://github.com/oruga-ui/theme-bootstrap)_

| SASS Variable | Default |
| ------------- | ------- |

See ➜ 📄 [SCSS file](https://github.com/oruga-ui/theme-bootstrap/tree/main/src/assets/scss/components/_dialog.scss)

</div>

</section>
