[//]: # "This file is generated and should not be edited by hand!"

# Button

<section class="odocs-hea">

The **Button** component uses [HTML's native button element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button) by default.
The `label` prop is used to populate the text of the button — or alternatively you can use the default slot.
The button can be have different colors, sizes, and states.
The component implements the W3C ARIA APG [Button Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/button/).

</section>

<section class="odocs-examples">

## Examples

<script setup>
import Base from "@/components/Button/examples/base.vue";
import BaseCode from "@/components/Button/examples/base.vue?raw";

import Variants from "@/components/Button/examples/variants.vue";
import VariantsCode from "@/components/Button/examples/variants.vue?raw";

import States from "@/components/Button/examples/states.vue";
import StatesCode from "@/components/Button/examples/states.vue?raw";

import Outlined from "@/components/Button/examples/outlined.vue";
import OutlinedCode from "@/components/Button/examples/outlined.vue?raw";

import Inverted from "@/components/Button/examples/inverted.vue";
import InvertedCode from "@/components/Button/examples/inverted.vue?raw";

import Sizes from "@/components/Button/examples/sizes.vue";
import SizesCode from "@/components/Button/examples/sizes.vue?raw";

import Icons from "@/components/Button/examples/icons.vue";
import IconsCode from "@/components/Button/examples/icons.vue?raw";

import Tags from "@/components/Button/examples/tags.vue";
import TagsCode from "@/components/Button/examples/tags.vue?raw";
</script>

### Base

<ExampleViewer :component="Base" :code="BaseCode" />

### States

<ExampleViewer :component="States" :code="StatesCode" />

### Variants

Different styles can be achieved with the `variant` prop.

<ExampleViewer :component="Variants" :code="VariantsCode" />

### Outlined

Use the `outlined` prop in combination with the `variant` prop for a lightweight look.

<ExampleViewer :component="Outlined" :code="OutlinedCode" />

### Inverted

Use the `inverted` prop in combination with the `variant` prop for a clickable label look.

<ExampleViewer :component="Inverted" :code="InvertedCode" />

### Sizes

The component can be displayed in different sizes using the `size` prop.

<ExampleViewer :component="Sizes" :code="SizesCode" />

### Icons

<p>Add an icon to the button to explain its function more visually.</p>
<ExampleViewer :component="Icons" :code="IconsCode" />

### Tags

Instead of using the HTML `button` tag, the HTML tag can be customised using the `tag` prop, for example to define links using [vue-router](https://router.vuejs.org/) and `router-link` tag.

<ExampleViewer :component="Tags" :code="TagsCode" />

</section>

<section class="odocs-specs">

## Button Component

> The classic button, in different colors, sizes, and states.

```html
<o-button></o-button>
```

### Props

| Prop name | Description                                         | Type                            | Values                                                                          | Default                                                                                                                                              |
| --------- | --------------------------------------------------- | ------------------------------- | ------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| disabled  | Button will be disabled                             | boolean                         | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                          |
| expanded  | Button will be expanded (full-width)                | boolean                         | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                          |
| iconLeft  | Icon name to show on the left                       | string                          | -                                                                               |                                                                                                                                                      |
| iconPack  | Icon pack to use                                    | string                          | `mdi`, `fa`, `fas and any other custom icon pack`                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>button: {<br>&nbsp;&nbsp;iconPack: undefined<br>}</code> |
| iconRight | Icon name to show on the right                      | string                          | -                                                                               |                                                                                                                                                      |
| inverted  | Enable inverted style                               | boolean                         | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                          |
| label     | Button label, unnecessary when default slot is used | string                          | -                                                                               |                                                                                                                                                      |
| loading   | Enable loading style                                | boolean                         | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                          |
| outlined  | Enable outlined style                               | boolean                         | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                          |
| override  | Override existing theme classes completely          | boolean                         | -                                                                               |                                                                                                                                                      |
| rounded   | Enable rounded style                                | boolean                         | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>button: {<br>&nbsp;&nbsp;rounded: false<br>}</code>      |
| size      | Size of the control                                 | string                          | `small`, `medium`, `large`                                                      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>button: {<br>&nbsp;&nbsp;size: undefined<br>}</code>     |
| tag       | Button tag name                                     | DynamicComponent                | `button`, `a`, `input`, `router-link`, `nuxt-link (or other nuxt alias)`        | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>button: {<br>&nbsp;&nbsp;tag: "button"<br>}</code>       |
| type      | Button type, like native                            | "button" \| "reset" \| "submit" | `button`, `submit`, `reset`                                                     | <code style='white-space: nowrap; padding: 0;'>"button"</code>                                                                                       |
| variant   | Color variant of the control                        | string                          | `primary`, `info`, `success`, `warning`, `danger`, `and any other custom color` | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>button: {<br>&nbsp;&nbsp;variant: undefined<br>}</code>  |

### Events

| Event name | Properties                       | Description        |
| ---------- | -------------------------------- | ------------------ |
| click      | **event** `Event` - native event | button click event |

### Slots

| Name    | Description                               | Bindings |
| ------- | ----------------------------------------- | -------- |
| default | Override the label, default is label prop |          |

</section>

<section class="odocs-classes">

## Class Inspector

<inspector-button-viewer />

</section>

<section class="odocs-style">

## Sass Variables

<div class="theme-oruga">

> Current theme ➜ _[Oruga](https://github.com/oruga-ui/theme-oruga)_

| SASS Variable                      | Default                                                                     |
| ---------------------------------- | --------------------------------------------------------------------------- |
| $button-spacer                     | h.useVar("control-spacer")                                                  |
| $button-height                     | h.useVar("control-height")                                                  |
| $button-padding                    | h.useVar("control-padding-vertical") h.useVar("control-padding-horizontal") |
| $button-loading-animation-duration | h.useVar("animation-speed-slow")                                            |
| $button-disabled-opacity           | h.useVar("control-disabled-opacity")                                        |
| $button-color                      | h.useVar("font-color")                                                      |
| $button-font-size                  | h.useVar("font-size")                                                       |
| $button-font-weight                | h.useVar("font-weight")                                                     |
| $button-line-height                | h.useVar("line-height")                                                     |
| $button-box-shadow                 | none                                                                        |
| $button-border-width               | h.useVar("control-border-width")                                            |
| $button-border-style               | solid                                                                       |
| $button-border-color               | h.useVar("control-border-color")                                            |
| $button-border-radius              | h.useVar("border-radius")                                                   |
| $button-background-color           | h.useVar("control-background-color")                                        |
| $button-hover-color                | $button-color                                                               |
| $button-hover-background-color     | $button-background-color                                                    |
| $button-hover-border-color         | h.useVar("grey-light")                                                      |
| $button-outlined-background-color  | transparent                                                                 |
| $button-outlined-border-color      | h.useVar("grey-light")                                                      |

See ➜ 📄 [SCSS file](https://github.com/oruga-ui/theme-oruga/tree/main/src/assets/scss/components/_button.scss)

</div>
<div class="theme-bulma">

> Current theme ➜ _[Bulma](https://github.com/oruga-ui/theme-bulma)_

<p>The theme does not have any custom variables for this component.</p>
</div>
<div class="theme-bootstrap">

> Current theme ➜ _[Bootstrap](https://github.com/oruga-ui/theme-bootstrap)_

| SASS Variable           | Default                       |
| ----------------------- | ----------------------------- |
| $btn-spacer             | 0.5rem                        |
| $btn-height             | 2.35em                        |
| $btn-border-color       | var(--#{$prefix}border-color) |
| $btn-hover-border-color | var(--#{$prefix}border-color) |
| $btn-hover-box-shadow   | $box-shadow-sm                |

See ➜ 📄 [SCSS file](https://github.com/oruga-ui/theme-bootstrap/tree/main/src/assets/scss/components/_button.scss)

</div>

</section>
