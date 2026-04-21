[//]: # "This file is generated and should not be edited by hand!"

# Checkbox

<section class="odocs-hea">

The **Checkbox** input component uses [HTML's native checkbox input](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox).
It can display one or many options to a user and is a great way to allow users to select multiple items from a list.
The component supports single and multiple checkbox inputs.
The component supports the W3C ARIA APG [Checkbox Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/).
Use it with the [Field](/components/Field) component to access all the functionalities.

</section>

<section class="odocs-examples">

## Examples

<script setup>
import Base from "@/components/Checkbox/examples/base.vue";
import BaseCode from "@/components/Checkbox/examples/base.vue?raw";

import Variants from "@/components/Checkbox/examples/variants.vue";
import VariantsCode from "@/components/Checkbox/examples/variants.vue?raw";

import Interminate from "@/components/Checkbox/examples/interminate.vue";
import InterminateCode from "@/components/Checkbox/examples/interminate.vue?raw";

import Sizes from "@/components/Checkbox/examples/sizes.vue";
import SizesCode from "@/components/Checkbox/examples/sizes.vue?raw";

import Multiple from "@/components/Checkbox/examples/multiple.vue";
import MultipleCode from "@/components/Checkbox/examples/multiple.vue?raw";
</script>

### Base

By default the checkbox type will renders a single checkbox and uses `boolean` values. In order for a single checkbox to be checked the current value of the input must match the `modelValue` of that input (by default, a single checkbox uses true as the `modelValue`). The true and false value can be modified by using the `true-value` and `false-value` properties.

<ExampleViewer :component="Base" :code="BaseCode" />

### Multiple

To enable multiple checkboxes, set the `multiple` prop to `true`. This allows the component to accept an array for the `modelValue` prop. Then, if the box is checked, the value of the `native-value` property is added to the array.

<ExampleViewer :component="Multiple" :code="MultipleCode" />

### Variants

Different styles can be achieved with the `variant` prop.

<ExampleViewer :component="Variants" :code="VariantsCode" />

### Interminate

Checkboxes can only have two states: checked or unchecked. Visually, there are actually three states a checkbox can be in: checked, unchecked, or indeterminate. This third state can be achieved by setting the `indeterminate` prop.

<ExampleViewer :component="Interminate" :code="InterminateCode" />

### Sizes

The component can be displayed in different sizes using the `size` prop.

<ExampleViewer :component="Sizes" :code="SizesCode" />

</section>

<section class="odocs-specs">

## Checkbox Component

> Select a single or grouped options.

```html
<o-checkbox></o-checkbox>
```

### Props

| Prop name          | Description                                                                               | Type                                                                                                                                 | Values                                                                          | Default                                                                                                                                                |
| ------------------ | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| autocomplete       | Same as native autocomplete options to use in HTML5 validation                            | string                                                                                                                               | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>checkbox: {<br>&nbsp;&nbsp;autocomplete: "off"<br>}</code> |
| customValidity     | Custom HTML 5 validation error to set on the form control                                 | string \| ((currentValue: (IsMultiple extends true ? unknown[] : unknown) \| null , state: ValidityState) =&gt; string) \| undefined | -                                                                               | <code style='white-space: nowrap; padding: 0;'>""</code>                                                                                               |
| disabled           | Same as native disabled                                                                   | boolean                                                                                                                              | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                            |
| falseValue         | Overrides the returned value when it's not checked                                        | unknown                                                                                                                              | -                                                                               |                                                                                                                                                        |
| id                 | Same as native id. Also pass the id to a wrapping `o-field` component. Default is a uuid. | string                                                                                                                               | -                                                                               | <code style='white-space: nowrap; padding: 0;'>useId()</code>                                                                                          |
| indeterminate      | Same as native indeterminate                                                              | boolean                                                                                                                              | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                            |
| label              | Input label, unnecessary when default slot is used                                        | string                                                                                                                               | -                                                                               |                                                                                                                                                        |
| v-model            | The input value state, use v-model to make it two-way binding                             | (IsMultiple extends true ? unknown[] : unknown)                                                                                      | -                                                                               |                                                                                                                                                        |
| multiple           | Defines the v-model as array of values                                                    | IsMultiple                                                                                                                           | -                                                                               |                                                                                                                                                        |
| name               | Same as native name                                                                       | string                                                                                                                               | -                                                                               |                                                                                                                                                        |
| nativeValue        | Same as native value                                                                      | unknown                                                                                                                              | -                                                                               |                                                                                                                                                        |
| override           | Override existing theme classes completely                                                | boolean                                                                                                                              | -                                                                               |                                                                                                                                                        |
| required           | Same as native required                                                                   | boolean                                                                                                                              | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                            |
| size               | Size of the control                                                                       | string                                                                                                                               | `small`, `medium`, `large`                                                      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>checkbox: {<br>&nbsp;&nbsp;size: undefined<br>}</code>     |
| trueValue          | Overrides the returned value when it's checked                                            | unknown                                                                                                                              | -                                                                               |                                                                                                                                                        |
| useHtml5Validation | Enable HTML 5 native validation                                                           | boolean                                                                                                                              | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>{<br>&nbsp;&nbsp;useHtml5Validation: true<br>}</code>      |
| variant            | Color variant of the control                                                              | string                                                                                                                               | `primary`, `info`, `success`, `warning`, `danger`, `and any other custom color` | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>checkbox: {<br>&nbsp;&nbsp;variant: undefined<br>}</code>  |

### Events

| Event name         | Properties                                                                          | Description                     |
| ------------------ | ----------------------------------------------------------------------------------- | ------------------------------- |
| update:model-value | **value** `unknown \| unknown[]` - updated modelValue prop                          | modelValue prop two-way binding |
| input              | **value** `unknown \| unknown[]` - input value<br/>**event** `Event` - native event | on input change event           |
| focus              | **event** `Event` - native event                                                    | on input focus event            |
| blur               | **event** `Event` - native event                                                    | on input blur event             |
| invalid            | **event** `Event` - native event                                                    | on input invalid event          |

### Slots

| Name    | Description                               | Bindings |
| ------- | ----------------------------------------- | -------- |
| default | Override the label, default is label prop |          |

</section>

<section class="odocs-classes">

## Class Inspector

<inspector-checkbox-viewer />

</section>

<section class="odocs-style">

## Sass Variables

<div class="theme-oruga">

> Current theme ➜ _[Oruga](https://github.com/oruga-ui/theme-oruga)_

| SASS Variable                     | Default                                     |
| --------------------------------- | ------------------------------------------- |
| $checkbox-spacer                  | h.useVar("control-spacer")                  |
| $checkbox-height                  | 1.2em                                       |
| $checkbox-width                   | 1.2em                                       |
| $checkbox-color                   | h.useVar("font-color")                      |
| $checkbox-font-size               | h.useVar("font-size")                       |
| $checkbox-font-weight             | h.useVar("font-weight")                     |
| $checkbox-line-height             | h.useVar("line-height")                     |
| $checkbox-box-shadow              | h.useVar("control-box-shadow-inset")        |
| $checkbox-border-color            | h.useVar("primary")                         |
| $checkbox-border-width            | calc(2 \* h.useVar("control-border-width")) |
| $checkbox-border-style            | solid                                       |
| $checkbox-border-radius           | h.useVar("border-radius")                   |
| $checkbox-background-color        | h.useVar("primary")                         |
| $checkbox-active-background-color | h.useVar("primary")                         |
| $checkbox-checkmark-color         | vars.$primary-invert                        |
| $checkbox-disabled-opacity        | h.useVar("control-disabled-opacity")        |

See ➜ 📄 [SCSS file](https://github.com/oruga-ui/theme-oruga/tree/main/src/assets/scss/components/_checkbox.scss)

</div>
<div class="theme-bulma">

> Current theme ➜ _[Bulma](https://github.com/oruga-ui/theme-bulma)_

| SASS Variable                     | Default                                                               |
| --------------------------------- | --------------------------------------------------------------------- |
| $checkbox-size                    | 1.25em                                                                |
| $checkbox-background-color        | transparent                                                           |
| $checkbox-border-width            | 2px                                                                   |
| $checkbox-colors                  | dv.$colors                                                            |
| $checkbox-border-color            | css.getVar("grey")                                                    |
| $checkbox-border-radius           | css.getVar("radius")                                                  |
| $checkbox-checkmark-color         | css.getVar("primary-invert")                                          |
| $checkbox-focus-color             | hsl(from css.getVar("grey") h s l / 80%)                              |
| $checkbox-active-focus-color      | hsl( from css.getVar("checkbox-active-background-color") h s l / 80%) |
| $checkbox-active-background-color | css.getVar("primary")                                                 |
| $checkbox-shadow                  | css.getVar("shadow")                                                  |

See ➜ 📄 [SCSS file](https://github.com/oruga-ui/theme-bulma/tree/main/src/assets/scss/components/_checkbox.scss)

</div>
<div class="theme-bootstrap">

> Current theme ➜ _[Bootstrap](https://github.com/oruga-ui/theme-bootstrap)_

<p>The theme does not have any custom variables for this component.</p>
</div>

</section>
