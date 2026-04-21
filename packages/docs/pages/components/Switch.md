[//]: # "This file is generated and should not be edited by hand!"

# Switch

<section class="odocs-hea">

The **Switch** input component — sometimes called "toggle" — offers a choice between one of two values;
it's a great option when you want the user to toggle a feature on or off.
This component implements the W3C ARIA APG [Switch Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/switch/).
Use it with the [Field](/components/Field) component to access all the functionalities.

</section>

<section class="odocs-examples">

## Examples

<script setup>
import Base from "@/components/Switch/examples/base.vue";
import BaseCode from "@/components/Switch/examples/base.vue?raw";

import Variants from "@/components/Switch/examples/variants.vue";
import VariantsCode from "@/components/Switch/examples/variants.vue?raw";

import Sizes from "@/components/Switch/examples/sizes.vue";
import SizesCode from "@/components/Switch/examples/sizes.vue?raw";

import Customise from "@/components/Switch/examples/customise.vue";
import CustomiseCode from "@/components/Switch/examples/customise.vue?raw";
</script>

### Base

The default value of a checkbox is `false` when unchecked and `true` wenn checked. Use the `true-value` and `false-value` properties to specify different value that will be used as the `modelValue` property when the specific radio is checked and unchecked

<ExampleViewer :component="Base" :code="BaseCode" />

### Variants

Different styles can be achieved with the `variant` prop.

<ExampleViewer :component="Variants" :code="VariantsCode" />

### Sizes

The component can be displayed in different sizes using the `size` prop.

<ExampleViewer :component="Sizes" :code="SizesCode" />

### Customise

By default, the component supports a label which is displayed to the right of the toggle unless the `position` prop is set to "left".

<ExampleViewer :component="Customise" :code="CustomiseCode" />

</section>

<section class="odocs-specs">

## Switch Component

> Switch between two opposing states.

```html
<o-switch></o-switch>
```

### Props

| Prop name          | Description                                                                               | Type                                                                                         | Values                                                                          | Default                                                                                                                                                    |
| ------------------ | ----------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| autocomplete       | Same as native autocomplete options to use in HTML5 validation                            | string                                                                                       | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>switch: {<br>&nbsp;&nbsp;autocomplete: "off"<br>}</code>       |
| customValidity     | Custom HTML 5 validation error to set on the form control                                 | string \| ((currentValue: unknown \| null , state: ValidityState) =&gt; string) \| undefined | -                                                                               |                                                                                                                                                            |
| disabled           | Same as native disabled                                                                   | boolean                                                                                      | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                |
| falseValue         | Overrides the returned value when it's not checked                                        | unknown                                                                                      | -                                                                               |                                                                                                                                                            |
| id                 | Same as native id. Also pass the id to a wrapping `o-field` component. Default is a uuid. | string                                                                                       | -                                                                               | <code style='white-space: nowrap; padding: 0;'>useId()</code>                                                                                              |
| label              | Input label, unnecessary when default slot is used                                        | string                                                                                       | -                                                                               |                                                                                                                                                            |
| v-model            | The input value state, use v-model to make it two-way binding                             | unknown                                                                                      | -                                                                               |                                                                                                                                                            |
| name               | Name attribute on native checkbox                                                         | string                                                                                       | -                                                                               |                                                                                                                                                            |
| nativeValue        | Same as native value                                                                      | unknown                                                                                      | -                                                                               |                                                                                                                                                            |
| override           | Override existing theme classes completely                                                | boolean                                                                                      | -                                                                               |                                                                                                                                                            |
| passiveVariant     | Color of the switch when is passive                                                       | string                                                                                       | `primary`, `info`, `success`, `warning`, `danger`, `and any other custom color` | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>switch: {<br>&nbsp;&nbsp;passiveVariant: undefined<br>}</code> |
| position           | Label position                                                                            | string                                                                                       | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>switch: {<br>&nbsp;&nbsp;right: "position"<br>}</code>         |
| required           | Same as native required                                                                   | boolean                                                                                      | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                |
| rounded            | Rounded style                                                                             | boolean                                                                                      | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>switch: {<br>&nbsp;&nbsp;rounded: true<br>}</code>             |
| size               | Size of the control                                                                       | string                                                                                       | `small`, `medium`, `large`                                                      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>switch: {<br>&nbsp;&nbsp;size: undefined<br>}</code>           |
| trueValue          | Overrides the returned value when it's checked                                            | unknown                                                                                      | -                                                                               |                                                                                                                                                            |
| useHtml5Validation | Enable html 5 native validation                                                           | boolean                                                                                      | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>{<br>&nbsp;&nbsp;useHtml5Validation: true<br>}</code>          |
| variant            | Color variant of the control                                                              | string                                                                                       | `primary`, `info`, `success`, `warning`, `danger`, `and any other custom color` | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>switch: {<br>&nbsp;&nbsp;variant: undefined<br>}</code>        |

### Events

| Event name         | Properties                                                             | Description                     |
| ------------------ | ---------------------------------------------------------------------- | ------------------------------- |
| update:model-value | **value** `unknown` - updated modelValue prop                          | modelValue prop two-way binding |
| input              | **value** `unknown` - input value<br/>**event** `Event` - native event | on input change event           |
| focus              | **event** `Event` - native event                                       | on input focus event            |
| blur               | **event** `Event` - native event                                       | on input blur event             |
| invalid            | **event** `Event` - native event                                       | on input invalid event          |

### Slots

| Name    | Description                               | Bindings |
| ------- | ----------------------------------------- | -------- |
| default | Override the label, default is label prop |          |

</section>

<section class="odocs-classes">

## Class Inspector

<inspector-switch-viewer />

</section>

<section class="odocs-style">

## Sass Variables

<div class="theme-oruga">

> Current theme ➜ _[Oruga](https://github.com/oruga-ui/theme-oruga)_

| SASS Variable                    | Default                              |
| -------------------------------- | ------------------------------------ |
| $switch-spacer                   | h.useVar("control-spacer")           |
| $switch-width                    | 2.75em                               |
| $switch-height                   | 1.5em                                |
| $switch-color                    | h.useVar("font-color")               |
| $switch-font-size                | h.useVar("font-size")                |
| $switch-font-weight              | h.useVar("font-weight")              |
| $switch-line-height              | h.useVar("line-height")              |
| $switch-box-shadow               | h.useVar("control-box-shadow-inset") |
| $switch-border-color             | h.useVar("grey-lighter")             |
| $switch-border-style             | solid                                |
| $switch-border-width             | h.useVar("control-border-width")     |
| $switch-border-radius            | h.useVar("border-radius")            |
| $switch-border-radius-rounded    | h.useVar("border-radius-rounded")    |
| $switch-background-color         | h.useVar("grey-light")               |
| $switch-toggle-background-color  | vars.$control-background-color       |
| $switch-checked-background-color | h.useVar("primary")                  |
| $switch-checked-border-color     | h.useVar("primary")                  |
| $switch-disabled-opacity         | h.useVar("control-disabled-opacity") |

See ➜ 📄 [SCSS file](https://github.com/oruga-ui/theme-oruga/tree/main/src/assets/scss/components/_switch.scss)

</div>
<div class="theme-bulma">

> Current theme ➜ _[Bulma](https://github.com/oruga-ui/theme-bulma)_

| SASS Variable                   | Default                  |
| ------------------------------- | ------------------------ |
| $switch-width                   | 2.75em                   |
| $switch-padding                 | 0.2em                    |
| $switch-colors                  | dv.$colors               |
| $switch-background-color        | css.getVar("grey-light") |
| $switch-active-background-color | css.getVar("primary")    |
| $switch-shadow                  | css.getVar("shadow")     |

See ➜ 📄 [SCSS file](https://github.com/oruga-ui/theme-bulma/tree/main/src/assets/scss/components/_switch.scss)

</div>
<div class="theme-bootstrap">

> Current theme ➜ _[Bootstrap](https://github.com/oruga-ui/theme-bootstrap)_

| SASS Variable  | Default |
| -------------- | ------- |
| $switch-spacer | 0.5rem  |

See ➜ 📄 [SCSS file](https://github.com/oruga-ui/theme-bootstrap/tree/main/src/assets/scss/components/_switch.scss)

</div>

</section>
