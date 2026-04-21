---
title: Modal
---

[//]: # "This file is generated and should not be edited by hand!"

# ~~Modal~~

<section class="odocs-hea">

> **Deprecated** Since v0.13.0 - use the `ODialog` component instead

The **Modal** component is a classic modal overlay in which you can include any content you like.
The content under the overlay is inert, meaning users cannot interact with content outside the active modal window.
By default, modal overlays contain their own tab sequence so that users cannot navigate outside the component.
The component supports the W3C ARIA APG [Dialog (Modal) Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/) as well as the W3C ARIA APG [Alert and Message Dialogs Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/alertdialog/).

</section>

<section class="odocs-examples">

## Examples

<script setup>
import Base from "@/components/Modal/examples/base.vue";
import BaseCode from "@/components/Modal/examples/base.vue?raw";

import Alert from "@/components/Modal/examples/alert.vue";
import AlertCode from "@/components/Modal/examples/alert.vue?raw";

import Component from "@/components/Modal/examples/component.vue";
import ComponentCode from "@/components/Modal/examples/component.vue?raw";

import Teleport from "@/components/Modal/examples/teleport.vue";
import TeleportCode from "@/components/Modal/examples/teleport.vue?raw";

import Programmatically from "@/components/Modal/examples/programmatically.vue";
import ProgrammaticallyCode from "@/components/Modal/examples/programmatically.vue?raw";

import ProgrammaticallyAsync from "@/components/Modal/examples/programmatically-async.vue";
import ProgrammaticallyAsyncCode from "@/components/Modal/examples/programmatically-async.vue?raw";
</script>

### Base

Setting the `clipScroll` prop removes the body scrollbar. By default, the body retains a non scrollable scrollbar to prevent the background from shifting. However, this will set the body to `position="fixed"`, which may cause some layouts to break.

<ExampleViewer :component="Base" :code="BaseCode" />

### Alert

An alert modal interrupt the user's workflow to communicate an important messages and acquire an explicit response, for example confirmation prompts and error message confirmations. By setting `alert` prop the `alertdialog` aria role enables assistive technologies and browsers to distinguish alert dialogs from other dialogs so they have the option of giving alert dialogs special treatment, such as playing a system alert sound.

<ExampleViewer :component="Alert" :code="AlertCode" />

### Teleport

The `teleport` prop allows the modal to be "teleported" into any DOM node outside the DOM hierarchy of that component. By default, if only a boolean is passed, the modal will be teleported to the document body. In addition, any other destination can be passed as a value to the `teleport` prop.

<ExampleViewer :component="Teleport" :code="TeleportCode" />

### Dynamic Component

Instead of using the default slot, the `component` prop allows to pass any component that will be programmatically rendered inside the modal. Furthermore, an inline component created with a [render function](https://vuejs.org/guide/extras/render-function.html) can also be passed. Props and events can be passed to the component with `props` and `events` props too.

<ExampleViewer :component="Component" :code="ComponentCode" />

### Programmatically

This component provides a programmatic interface that can be accessed by the [`useOruga()`](/documentation/composables.html) composable. The composable can be used from outside of the Vue instance. For example, it can be used in Pinia or Vue Router with this syntax:

```js
import { useOruga } from "@oruga-ui/oruga-next";
const oruga = useOruga();
oruga.modal.open({...});
```

<ExampleViewer :component="Programmatically" :code="ProgrammaticallyCode" />

A programmatic instance returns a promise to await for. The promise gets resolved when the modal gets closed.

<ExampleViewer
    :component="ProgrammaticallyAsync"
    :code="ProgrammaticallyAsyncCode" />

</section>

<section class="odocs-specs">

## Modal Component

> Classic modal overlay to include any content you may need.

```html
<o-modal></o-modal>
```

### Props

| Prop name        | Description                                                                                                                                                                                                                                            | Type                                       | Values                                            | Default                                                                                                                                                     |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------ | ------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| active           | Whether modal is active or not, use v-model:active to make it two-way binding                                                                                                                                                                          | boolean                                    | -                                                 | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                 |
| alert            | This enables the `alertdialog` role, allowing assistive technologies and browsers to distinguish alert modals from other modals.<br/>Alert modals interrupt the user's workflow to communicate an important messages and acquire an explicit response. | boolean                                    | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>modal: {<br>&nbsp;&nbsp;alert: false<br>}</code>                |
| animation        | Custom animation (transition name)                                                                                                                                                                                                                     | string                                     | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>modal: {<br>&nbsp;&nbsp;animation: "zoom-out"<br>}</code>       |
| ariaCloseLabel   | Accessibility label for the close button                                                                                                                                                                                                               | string                                     | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>modal: {<br>&nbsp;&nbsp;ariaCloseLabel: "Close"<br>}</code>     |
| ariaLabel        | Accessibility aria-label to be passed to the div wrapper element                                                                                                                                                                                       | string                                     | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>modal: {<br>&nbsp;&nbsp;ariaLabel: undefined<br>}</code>        |
| autoFocus        | Automatically focus modal when active                                                                                                                                                                                                                  | boolean                                    | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>modal: {<br>&nbsp;&nbsp;autoFocus: true<br>}</code>             |
| clipScroll       | Set `true` to remove the body scrollbar.<br/>When `false`, a non-scrollable scrollbar will be kept to avoid moving the background,<br/>but will set the body to a fixed position, which may break some layouts.                                        | boolean                                    | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>modal: {<br>&nbsp;&nbsp;clipScroll: false<br>}</code>           |
| closeIcon        | Close icon name                                                                                                                                                                                                                                        | string                                     | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>modal: {<br>&nbsp;&nbsp;closeIcon: "close"<br>}</code>          |
| closeIconSize    | Size of close icon                                                                                                                                                                                                                                     | string                                     | `small`, `medium`, `large`                        | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>modal: {<br>&nbsp;&nbsp;closeIconSize: "medium"<br>}</code>     |
| closeOnEscape    | Close when pressing escape key                                                                                                                                                                                                                         | boolean                                    | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>modal: {<br>&nbsp;&nbsp;closeOnEscape: true<br>}</code>         |
| closeOnOutside   | Close when clicked outside of the panel                                                                                                                                                                                                                | boolean                                    | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>modal: {<br>&nbsp;&nbsp;closeOnOutside: true<br>}</code>        |
| closeable        | Adds close button to the header                                                                                                                                                                                                                        | boolean                                    | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>modal: {<br>&nbsp;&nbsp;closeable: true<br>}</code>             |
| component        | Component to be injected.<br/>Close the component by emitting a 'close' event — `$emit('close')`                                                                                                                                                       | C                                          | -                                                 |                                                                                                                                                             |
| content          | Text content, unnecessary when default slot is used                                                                                                                                                                                                    | string                                     | -                                                 |                                                                                                                                                             |
| events           | Events to be binded to the injected component                                                                                                                                                                                                          | EmitsToProps&lt;ComponentEmit&lt;C&gt;&gt; | -                                                 |                                                                                                                                                             |
| fullScreen       | Display modal as full screen                                                                                                                                                                                                                           | boolean                                    | -                                                 | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                 |
| iconPack         | Icon pack to use                                                                                                                                                                                                                                       | string                                     | `mdi`, `fa`, `fas and any other custom icon pack` | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>modal: {<br>&nbsp;&nbsp;iconPack: undefined<br>}</code>         |
| mobileBreakpoint | Mobile breakpoint as `max-width` value                                                                                                                                                                                                                 | string                                     | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>modal: {<br>&nbsp;&nbsp;mobileBreakpoint: undefined<br>}</code> |
| overlay          | Show an overlay background                                                                                                                                                                                                                             | boolean                                    | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>modal: {<br>&nbsp;&nbsp;overlay: true<br>}</code>               |
| override         | Override existing theme classes completely                                                                                                                                                                                                             | boolean                                    | -                                                 |                                                                                                                                                             |
| props            | Props to be binded to the injected component                                                                                                                                                                                                           | ComponentProps&lt;C&gt;                    | -                                                 |                                                                                                                                                             |
| teleport         | Append the component to another part of the DOM.<br/>Set `true` to append the component to the body.<br/>In addition, any CSS selector string or an actual DOM node can be used.                                                                       | boolean \| object \| string                | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>modal: {<br>&nbsp;&nbsp;teleport: false<br>}</code>             |
| trapFocus        | Trap focus inside the modal                                                                                                                                                                                                                            | boolean                                    | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>modal: {<br>&nbsp;&nbsp;trapFocus: true<br>}</code>             |
| width            | Width of the Modal                                                                                                                                                                                                                                     | Numberish                                  | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>modal: {<br>&nbsp;&nbsp;width: 960<br>}</code>                  |

### Events

| Event name    | Properties                                | Description                      |
| ------------- | ----------------------------------------- | -------------------------------- |
| update:active | **value** `boolean` - updated active prop | active prop two-way binding      |
| close         | **event** `Event` - native event          | on active state changes to false |

### Slots

| Name    | Description                                    | Bindings                                                      |
| ------- | ---------------------------------------------- | ------------------------------------------------------------- |
| default | Modal default content, default is content prop | **clsoe** `(...args): void` - function to close the component |
| close   | Define a custom close icon                     |                                                               |

</section>

<section class="odocs-classes">

## Class Inspector

<inspector-modal-viewer />

</section>

<section class="odocs-style">

## Sass Variables

<div class="theme-oruga">

> Current theme ➜ _[Oruga](https://github.com/oruga-ui/theme-oruga)_

| SASS Variable                   | Default                              |
| ------------------------------- | ------------------------------------ |
| $modal-zindex                   | map.get(vars.$zindex, "fixed")       |
| $modal-overlay-background-color | h.useVar("overlay-background-color") |
| $modal-overlay-zindex           | map.get(vars.$zindex, "overlay")     |
| $modal-content-zindex           | map.get(vars.$zindex, "modal")       |
| $modal-content-max-height       | calc(100vh - 160px)                  |
| $modal-content-max-width        | calc(100vw - 160px)                  |
| $modal-content-box-shadow       | h.useVar("overlay-box-shadow")       |
| $modal-content-border-radius    | h.useVar("border-radius")            |
| $modal-content-background-color | h.useVar("control-background-color") |
| $modal-close-top                | 20px                                 |
| $modal-close-right              | 20px                                 |
| $modal-close-color              | h.useVar("white")                    |
| $modal-close-size               | 2rem                                 |
| $modal-close-border-radius      | h.useVar("border-radius-rounded")    |
| $modal-close-background-color   | h.useVar("control-shadow-color")     |

See ➜ 📄 [SCSS file](https://github.com/oruga-ui/theme-oruga/tree/main/src/assets/scss/components/_modal.scss)

</div>
<div class="theme-bulma">

> Current theme ➜ _[Bulma](https://github.com/oruga-ui/theme-bulma)_

<p>The theme does not have any custom variables for this component.</p>
</div>
<div class="theme-bootstrap">

> Current theme ➜ _[Bootstrap](https://github.com/oruga-ui/theme-bootstrap)_

<p>The theme does not have any custom variables for this component.</p>
</div>

</section>
