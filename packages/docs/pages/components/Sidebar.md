[//]: # "This file is generated and should not be edited by hand!"

# Sidebar

<section class="odocs-head">

The **Sidebar** component can be toggled to appear from the left, right, top, or bottom edge of the viewport.
The component can be used to show an overlay for navigation, shopping carts, and more.

</section>

<section class="odocs-examples">

## Examples

<script setup>
import Base from "@/components/Sidebar/examples/base.vue";
import BaseCode from "@/components/Sidebar/examples/base.vue?raw";

import Inline from "@/components/Sidebar/examples/inline.vue";
import InlineCode from "@/components/Sidebar/examples/inline.vue?raw";

import Teleport from "@/components/Sidebar/examples/teleport.vue";
import TeleportCode from "@/components/Sidebar/examples/teleport.vue?raw";

import Component from "@/components/Sidebar/examples/component.vue";
import ComponentCode from "@/components/Sidebar/examples/component.vue?raw";

import Programmatically from "@/components/Sidebar/examples/programmatically.vue";
import ProgrammaticallyCode from "@/components/Sidebar/examples/programmatically.vue?raw";
</script>

### Base

The sidebar can be positioned go appear from each side of the viewport using the `position` prop. Using `fullwidth` or `fullheight`, the sidebar overlaps the entire viewport width or height.

<ExampleViewer :component="Base" :code="BaseCode" />

### Inline

When the property `inline` is set, the component will be rendered in place. The appearance can be triggered with the `active` prop as usual.

<ExampleViewer :component="Inline" :code="InlineCode" />

### Teleport

The `teleport` prop allows the sidebar to be "teleported" into any DOM node outside the DOM hierarchy of that component. By default, if only a boolean is passed, the sidebar will be teleported to the document body. In addition, any other destination can be passed as a value to the `teleport` prop.

<ExampleViewer :component="Teleport" :code="TeleportCode" />

### Dynamic Component

Instead of using the default slot, the `component` prop allows to pass any component that will be programmatically rendered inside the sidebar. Furthermore, an inline component created with a [render function](https://vuejs.org/guide/extras/render-function.html) can also be passed. Props and events can be passed to the component with `props` and `events` props too.

<ExampleViewer :component="Component" :code="ComponentCode" />

### Programmatically

This component provides a programmatic interface that can be accessed by the [`useOruga()`](/documentation/composables.html) composable. composable. The composable can be used from outside the Vue instance. For example, it can be used in Pinia or Vue Router with this syntax:

```js
import { useOruga } from "@oruga-ui/oruga-next";
const oruga = useOruga();
oruga.sidebar.open({...});
```

<ExampleViewer :component="Programmatically" :code="ProgrammaticallyCode" />

</section>

<section class="odocs-specs">

## Sidebar Component

> A sidebar to use as overlay.

```html
<o-sidebar></o-sidebar>
```

### Props

| Prop name        | Description                                                                                                                                                                                                     | Type                                                               | Values                                                     | Default                                                                                                                                                       |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ | ---------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| active           | Whether siedbar is active or not, use v-model:active to make it two-way binding                                                                                                                                 | boolean                                                            | -                                                          | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                   |
| animation        | Custom animation (transition name)                                                                                                                                                                              | string                                                             | -                                                          | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>sidebar: {<br>&nbsp;&nbsp;animation: undefined<br>}</code>        |
| clipScroll       | Set `true` to remove the body scrollbar.<br/>When `false`, a non-scrollable scrollbar will be kept to avoid moving the background,<br/>but will set the body to a fixed position, which may break some layouts. | boolean                                                            | -                                                          | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>sidebar: {<br>&nbsp;&nbsp;clipScroll: false<br>}</code>           |
| closeOnEscape    | Close when pressing escape key                                                                                                                                                                                  | boolean                                                            | -                                                          | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>sidebar: {<br>&nbsp;&nbsp;closeOnEscape: true<br>}</code>         |
| closeOnOutside   | Close when clicked outside of the panel                                                                                                                                                                         | boolean                                                            | -                                                          | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>sidebar: {<br>&nbsp;&nbsp;closeOnOutside: true<br>}</code>        |
| component        | Component to be injected.<br/>Close the component by emitting a 'close' event — `$emit('close')`                                                                                                                | C                                                                  | -                                                          |                                                                                                                                                               |
| events           | Events to be binded to the injected component                                                                                                                                                                   | EmitsToProps&lt;ComponentEmit&lt;C&gt;&gt;                         | -                                                          |                                                                                                                                                               |
| fullheight       | Show sidebar in fullheight                                                                                                                                                                                      | boolean                                                            | -                                                          | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>sidebar: {<br>&nbsp;&nbsp;fullheight: false<br>}</code>           |
| fullwidth        | Show sidebar in fullwidth                                                                                                                                                                                       | boolean                                                            | -                                                          | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>sidebar: {<br>&nbsp;&nbsp;fullwidth: false<br>}</code>            |
| inline           | Display the Sidebear inline                                                                                                                                                                                     | boolean                                                            | -                                                          | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                   |
| mobile           | Override layout for small screens                                                                                                                                                                               | "expanded" \| "fullheight" \| "fullwidth" \| "hidden" \| "reduced" | `expanded`, `reduced`, `fullwidth`, `fullheight`, `hidden` | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>sidebar: {<br>&nbsp;&nbsp;mobile: undefined<br>}</code>           |
| mobileBreakpoint | Mobile breakpoint as `max-width` value                                                                                                                                                                          | string                                                             | -                                                          | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>sidebar: {<br>&nbsp;&nbsp;mobileBreakpoint: undefined<br>}</code> |
| overlay          | Show an overlay background                                                                                                                                                                                      | boolean                                                            | -                                                          | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>sidebar: {<br>&nbsp;&nbsp;overlay: false<br>}</code>              |
| override         | Override existing theme classes completely                                                                                                                                                                      | boolean                                                            | -                                                          |                                                                                                                                                               |
| position         | Sidebar position                                                                                                                                                                                                | "bottom" \| "left" \| "right" \| "top"                             | `top`, `right`, `bottom`, `left`                           | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>sidebar: {<br>&nbsp;&nbsp;position: "left"<br>}</code>            |
| props            | Props to be binded to the injected component                                                                                                                                                                    | ComponentProps&lt;C&gt;                                            | -                                                          |                                                                                                                                                               |
| teleport         | Append the component to another part of the DOM.<br/>Set `true` to append the component to the body.<br/>In addition, any CSS selector string or an actual DOM node can be used.                                | boolean \| object \| string                                        | -                                                          | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>sidebar: {<br>&nbsp;&nbsp;teleport: false<br>}</code>             |
| trapFocus        | Trap focus inside the sidebar                                                                                                                                                                                   | boolean                                                            | -                                                          | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>sidebar: {<br>&nbsp;&nbsp;trapFocus: true<br>}</code>             |

### Events

| Event name    | Properties                                | Description                      |
| ------------- | ----------------------------------------- | -------------------------------- |
| update:active | **value** `boolean` - updated active prop | active prop two-way binding      |
| close         | **event** `Event` - native event          | on active state changes to false |

### Slots

| Name    | Description                                        | Bindings                                                                     |
| ------- | -------------------------------------------------- | ---------------------------------------------------------------------------- |
| default | Sidebar default content, default is component prop | **close** `(...args: [] \| [Event]): void` - function to close the component |

</section>

<section class="odocs-classes">

## Class Inspector

<inspector-sidebar-viewer />

</section>

<section class="odocs-style">

## Sass Variables

<div class="theme-oruga">

> Current theme ➜ _[Oruga](https://github.com/oruga-ui/theme-oruga)_

| SASS Variable                     | Default                               |
| --------------------------------- | ------------------------------------- |
| $sidebar-zindex                   | map.get(vars.$zindex, "fixed")        |
| $sidebar-overlay-background-color | h.useVar( "overlay-background-color") |
| $sidebar-overlay-zindex           | map.get(vars.$zindex, "overlay")      |
| $sidebar-content-zindex           | map.get(vars.$zindex, "sidebar")      |
| $sidebar-content-max-width        | 50vw                                  |
| $sidebar-content-max-height       | 50vh                                  |
| $sidebar-content-box-shadow       | h.useVar("overlay-box-shadow")        |
| $sidebar-content-background-color | h.useVar( "control-background-color") |
| $sidebar-content-border-radius    | h.useVar("border-radius")             |
| $sidebar-content-border-width     | h.useVar("control-border-width")      |
| $sidebar-content-border-style     | solid                                 |
| $sidebar-content-border-color     | h.useVar("control-border-color")      |

See ➜ 📄 [SCSS file](https://github.com/oruga-ui/theme-oruga/tree/main/src/assets/scss/components/_sidebar.scss)

</div>
<div class="theme-bulma">

> Current theme ➜ _[Bulma](https://github.com/oruga-ui/theme-bulma)_

| SASS Variable                        | Default                                                                                             |
| ------------------------------------ | --------------------------------------------------------------------------------------------------- |
| $sidebar-z                           | 40                                                                                                  |
| $sidebar-width                       | 260px                                                                                               |
| $sidebar-height                      | 260px                                                                                               |
| $sidebar-mobile-width                | 80px                                                                                                |
| $sidebar-colors                      | dv.$colors                                                                                          |
| $sidebar-background-background-color | hsla( #{css.getVar("scheme-h")}, #{css.getVar("scheme-s")}, #{css.getVar("scheme-invert-l")}, 0.86) |
| $sidebar-shadow                      | css.getVar("shadow")                                                                                |

See ➜ 📄 [SCSS file](https://github.com/oruga-ui/theme-bulma/tree/main/src/assets/scss/components/_sidebar.scss)

</div>
<div class="theme-bootstrap">

> Current theme ➜ _[Bootstrap](https://github.com/oruga-ui/theme-bootstrap)_

| SASS Variable           | Default |
| ----------------------- | ------- |
| $sidebar-reduced-width  | 10rem   |
| $sidebar-reduced-height | 10vh    |

See ➜ 📄 [SCSS file](https://github.com/oruga-ui/theme-bootstrap/tree/main/src/assets/scss/components/_sidebar.scss)

</div>

</section>
