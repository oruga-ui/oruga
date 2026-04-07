[//]: # "This file is generated and should not be edited by hand!"

# Tooltip

<section class="odocs-head">

The **Tooltip** component displays a short contextual information text bubble when the user hovers over an element, or when that owning element receives focus, but is otherwise not visible on the page.
The component implements the W3C ARIA APG [Tooltip Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/).

</section>

<section class="odocs-examples">

## Examples

<script setup>
import Base from "@/components/Tooltip/examples/base.vue";
import BaseCode from "@/components/Tooltip/examples/base.vue?raw";

import Variants from "@/components/Tooltip/examples/variants.vue";
import VariantsCode from "@/components/Tooltip/examples/variants.vue?raw";

import Position from "@/components/Tooltip/examples/position.vue";
import PositionCode from "@/components/Tooltip/examples/position.vue?raw";

import Multiline from "@/components/Tooltip/examples/multiline.vue";
import MultilineCode from "@/components/Tooltip/examples/multiline.vue?raw";

import Templates from "@/components/Tooltip/examples/templates.vue";
import TemplatesCode from "@/components/Tooltip/examples/templates.vue?raw";

import Triggers from "@/components/Tooltip/examples/triggers.vue";
import TriggersCode from "@/components/Tooltip/examples/triggers.vue?raw";
</script>

### Base

While a tooltip can be placed on any content, they generally are tips for tools or controls, such as providing additional content for icons that have brief labels. An example of a native browser tooltip is the way some browsers display an element's `title` attribute on long mouse hover. However, this feature cannot be activated through either keyboard focus or touch interaction, making this feature inaccessible. If the information is important enough to include as a tooltip or title, consider including it in visible text.

<ExampleViewer :component="Base" :code="BaseCode" />

### Position

The direction in which the tooltip opens can be defined by the `position` prop. By default, the direction is automatically calculated from the distance to the edge of the window. Adding the `teleport` prop additionally will move the tooltip to the referenced DOM location instead.

<ExampleViewer :component="Position" :code="PositionCode" />

### Triggers

The component accepts several different trigger variants, such as `openOnClick` or `openOnContextmenu` to only open on right click instead of left click. By default, only `openOnHover` is set. The action that close the component can also be customized using the `closeable`, `closeOnOutside` and `closeOnEscape` props.

<ExampleViewer :component="Triggers" :code="TriggersCode" />

### Variants

Different styles can be achieved with the `variant` prop.

<ExampleViewer :component="Variants" :code="VariantsCode" />

### Multiline

Sometimes the tooltip label can be very long. Consider setting the `multiline` prop to force a line break.

<ExampleViewer :component="Multiline" :code="MultilineCode" />

### Templates

The tooltip label can be customised using the `content` template slot.

::: info Accessibility Note:
In terms of accessibility, tooltips provide additional information, generally with no direct interaction on the tooltip itself. Therefore, they should not contain any interactive elements, like links, inputs, or buttons; and it will never receive active focus itself. A tooltip is not considered to be a popup in this context.
:::

<ExampleViewer :component="Templates" :code="TemplatesCode" />

</section>

<section class="odocs-specs">

## Tooltip Component

> Display a brief helper text to your user.

```html
<o-tooltip></o-tooltip>
```

### Props

| Prop name         | Description                                                                                                                                                                      | Type                                                                                                             | Values                                                                                           | Default                                                                                                                                                    |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| active            | Whether tooltip is active or not, use v-model:active to make it two-way binding                                                                                                  | boolean                                                                                                          | -                                                                                                | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                |
| always            | Tooltip will be always active                                                                                                                                                    | boolean                                                                                                          | -                                                                                                | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                |
| animation         | Tooltip default animation                                                                                                                                                        | string                                                                                                           | -                                                                                                | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>tooltip: {<br>&nbsp;&nbsp;animation: "fade"<br>}</code>        |
| closeOnEscape     | Close when pressing escape key                                                                                                                                                   | boolean                                                                                                          | -                                                                                                | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>tooltip: {<br>&nbsp;&nbsp;closeOnEscape: false<br>}</code>     |
| closeOnOutside    | Close when clicked outside of the panel                                                                                                                                          | boolean                                                                                                          | -                                                                                                | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>tooltip: {<br>&nbsp;&nbsp;closeOnOutside: false<br>}</code>    |
| closeable         | Close on hover out of the content                                                                                                                                                | boolean                                                                                                          | -                                                                                                | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>tooltip: {<br>&nbsp;&nbsp;closeable: true<br>}</code>          |
| delay             | Tooltip delay before it appears (number in ms)                                                                                                                                   | number                                                                                                           | -                                                                                                |                                                                                                                                                            |
| disabled          | Tooltip will be disabled                                                                                                                                                         | boolean                                                                                                          | -                                                                                                | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                |
| id                | A unique HTML id for the tooltip element                                                                                                                                         | string                                                                                                           | -                                                                                                | <code style='white-space: nowrap; padding: 0;'>useId()</code>                                                                                              |
| label             | Tooltip text, unnecessary when content slot is used                                                                                                                              | string                                                                                                           | -                                                                                                |                                                                                                                                                            |
| maxWidth          | Limit the tooltip content width                                                                                                                                                  | string                                                                                                           | -                                                                                                | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>tooltip: {<br>&nbsp;&nbsp;maxWidth: undefined<br>}</code>      |
| <s>multiline</s>  | <div><b>deprecated</b> - use `maxWidth` instead</div><div><s>Tooltip will be multilined</s></div>                                                                                | boolean                                                                                                          | -                                                                                                | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                |
| openOnClick       | Show when clicked on the trigger                                                                                                                                                 | boolean                                                                                                          | -                                                                                                | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>tooltip: {<br>&nbsp;&nbsp;openOnClick: false<br>}</code>       |
| openOnContextmenu | Show when right clicked on the trigger                                                                                                                                           | boolean                                                                                                          | -                                                                                                | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>tooltip: {<br>&nbsp;&nbsp;openOnContextmenu: false<br>}</code> |
| openOnFocus       | Show when trigger get focused                                                                                                                                                    | boolean                                                                                                          | -                                                                                                | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>tooltip: {<br>&nbsp;&nbsp;openOnFocus: false<br>}</code>       |
| openOnHover       | Show when hover over the trigger                                                                                                                                                 | boolean                                                                                                          | -                                                                                                | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>tooltip: {<br>&nbsp;&nbsp;openOnHover: true<br>}</code>        |
| override          | Override existing theme classes completely                                                                                                                                       | boolean                                                                                                          | -                                                                                                |                                                                                                                                                            |
| position          | Position of the Tooltip relative to the trigger                                                                                                                                  | "auto" \| "bottom-left" \| "bottom-right" \| "bottom" \| "left" \| "right" \| "top-left" \| "top-right" \| "top" | `auto`, `top`, `bottom`, `left`, `right`, `top-right`, `top-left`, `bottom-left`, `bottom-right` | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>tooltip: {<br>&nbsp;&nbsp;position: "auto"<br>}</code>         |
| teleport          | Append the component to another part of the DOM.<br/>Set `true` to append the component to the body.<br/>In addition, any CSS selector string or an actual DOM node can be used. | boolean \| object \| string                                                                                      | -                                                                                                | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>dropdown: {<br>&nbsp;&nbsp;teleport: false<br>}</code>         |
| triggerTag        | Tooltip trigger tag name                                                                                                                                                         | DynamicComponent                                                                                                 | -                                                                                                | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>tooltip: {<br>&nbsp;&nbsp;triggerTag: "div"<br>}</code>        |
| variant           | Color of the tooltip                                                                                                                                                             | string                                                                                                           | `primary`, `info`, `success`, `warning`, `danger`, `and any other custom color`                  | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>tooltip: {<br>&nbsp;&nbsp;variant: undefined<br>}</code>       |

### Events

| Event name    | Properties                                | Description                      |
| ------------- | ----------------------------------------- | -------------------------------- |
| update:active | **value** `boolean` - updated active prop | active prop two-way binding      |
| close         | **event** `Event` - native event          | on active state changes to false |
| open          | **event** `Event` - native event          | on active state changes to true  |

### Slots

| Name    | Description                                         | Bindings                                    |
| ------- | --------------------------------------------------- | ------------------------------------------- |
| default | Tooltip trigger slot                                | **active** `boolean` - tooltip active state |
| content | Override the Tooltip content, default is label prop |                                             |

</section>

<section class="odocs-classes">

## Class Inspector

<inspector-tooltip-viewer />

</section>

<section class="odocs-style">

## Sass Variables

<div class="theme-oruga">

> Current theme ➜ _[Oruga](https://github.com/oruga-ui/theme-oruga)_

| SASS Variable                     | Default                          |
| --------------------------------- | -------------------------------- |
| $tooltip-zindex                   | map.get(vars.$zindex, "tooltip") |
| $tooltip-content-font-size        | 0.85rem                          |
| $tooltip-content-color            | h.useVar("white")                |
| $tooltip-content-font-weight      | h.useVar("font-weight")          |
| $tooltip-content-line-height      | h.useVar("line-height")          |
| $tooltip-content-padding          | 0.35em 0.75em                    |
| $tooltip-content-multiline-width  | 300px                            |
| $tooltip-content-box-shadow       | h.useVar("overlay-box-shadow")   |
| $tooltip-content-background-color | h.useVar("grey-darkest")         |
| $tooltip-content-border-radius    | h.useVar("border-radius")        |
| $tooltip-arrow-margin             | 2px                              |
| $tooltip-arrow-size               | 5px                              |

See ➜ 📄 [SCSS file](https://github.com/oruga-ui/theme-oruga/tree/main/src/assets/scss/components/_tooltip.scss)

</div>
<div class="theme-bulma">

> Current theme ➜ _[Bulma](https://github.com/oruga-ui/theme-bulma)_

| SASS Variable                    | Default                          |
| -------------------------------- | -------------------------------- |
| $tooltip-arrow-size              | 5px                              |
| $tooltip-arrow-margin            | 2px                              |
| $tooltip-content-multiline-width | 300px                            |
| $tooltip-shadow                  | 0 1px 2px 1px rgba(0, 1, 0, 0.2) |
| $tooltip-z                       | 38                               |
| $tooltip-colors                  | dv.$colors                       |
| $tooltip-border-radius           | css.getVar("radius")             |
| $tooltip-bg                      | css.getVar("scheme-main-bis")    |
| $tooltip-color                   | css.getVar("text-body")          |

See ➜ 📄 [SCSS file](https://github.com/oruga-ui/theme-bulma/tree/main/src/assets/scss/components/_tooltip.scss)

</div>
<div class="theme-bootstrap">

> Current theme ➜ _[Bootstrap](https://github.com/oruga-ui/theme-bootstrap)_

| SASS Variable                    | Default         |
| -------------------------------- | --------------- |
| $tooltip-arrow-spacer            | 2px             |
| $tooltip-content-multiline-width | 50vw            |
| $tooltip-shadow                  | $box-shadow-sm  |
| $tooltip-zindex                  | $zindex-tooltip |

See ➜ 📄 [SCSS file](https://github.com/oruga-ui/theme-bootstrap/tree/main/src/assets/scss/components/_tooltip.scss)

</div>

</section>
