[//]: # "This file is generated and should not be edited by hand!"

# Select

<section class="odocs-hea">

The **Select** input component uses [HTML's native select input](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select).
Select inputs can be single value selections, or multi-value selections by using the `multiple` attribute.
Use it with the [Field](/components/Field.html) component to access all the functionalities.

</section>

<section class="odocs-examples">

## Examples

<script setup>
import Base from "@/components/Select/examples/base.vue";
import BaseCode from "@/components/Select/examples/base.vue?raw";

import OptionsPrimitives from "@/components/Select/examples/options-primitives.vue";
import OptionsPrimitivesCode from "@/components/Select/examples/options-primitives.vue?raw";

import OptionsObject from "@/components/Select/examples/options-object.vue";
import OptionsObjectCode from "@/components/Select/examples/options-object.vue?raw";

import OptionsArray from "@/components/Select/examples/options-array.vue";
import OptionsArrayCode from "@/components/Select/examples/options-array.vue?raw";

import OptionsGrouped from "@/components/Select/examples/options-grouped.vue";
import OptionsGroupedCode from "@/components/Select/examples/options-grouped.vue?raw";

import OptionsNative from "@/components/Select/examples/options-native.vue";
import OptionsNativeCode from "@/components/Select/examples/options-native.vue?raw";

import Multiple from "@/components/Select/examples/multiple.vue";
import MultipleCode from "@/components/Select/examples/multiple.vue?raw";

import Sizes from "@/components/Select/examples/sizes.vue";
import SizesCode from "@/components/Select/examples/sizes.vue?raw";

import Variants from "@/components/Select/examples/variants.vue";
import VariantsCode from "@/components/Select/examples/variants.vue?raw";

import WithIcons from "@/components/Select/examples/icons.vue";
import WithIconsCode from "@/components/Select/examples/icons.vue?raw";
</script>

### Base

<ExampleViewer :component="Base" :code="BaseCode" />

### Options

There are several ways to provide options for a select input:

- An array of primitives `['A', 'B', 'C']`
- An object literal with key-value pairs `{ a: 'A', b: 'B', c: 'C' }`
- An array of objects with `label` and `value` properties
- Using the native `<option>` tags directly inside the default template slot.

::: info TypeScript
The options property type is defined by the `SelectOptions` type.
:::

#### Array of primitives

The simplest way to provide options is an array of primitives like strings or numbers, where the primitive will be used for both the string casted `label` representation and the `value` of the option.

<ExampleViewer
    :component="OptionsPrimitives"
    :code="OptionsPrimitivesCode" />

#### Key-Value pair object

You may also provide the `options` prop where the keys are values and the values of each property are labels.

<ExampleViewer :component="OptionsObject" :code="OptionsObjectCode" />

#### Array of objects

The most flexible way to define options is to provide an array of objects. The object is defined as:  
`{ value: any, label: string }`  
The `value` attribute is the real value which will be used by the `v-model` property and other events. The `label` attribute is the visible representation of the option. The object can be extended by additional attribute, which will be applied to the option item tag.

<ExampleViewer :component="OptionsArray" :code="OptionsArrayCode" />

#### Grouped options

Using the array of objects syntax you can also create grouped options (`<optgroup>` in HTML) by adding an `options` property to the object option.

<ExampleViewer :component="OptionsGrouped" :code="OptionsGroupedCode" />

#### Default Slot

Sometimes it may be desirable to manually output the contents of a select list in order to create specialized structures. This can be done by using the `default` slot to explicitly output your options like the native HTML select element.

<ExampleViewer :component="OptionsNative" :code="OptionsNativeCode" />

### Multiple

The input also supports a `multiple` attribute that allows multi-selection. When used the `v-model` attribute will be an array of values.

::: info Accessibility Notes
Select inputs with the `multiple` attribute can be challenging for some users because they require holding-down the control or command keys to perform multiple selections. Depending on your audience, you may want to consider using a [**checkbox input**](/components/Checkbox.html#array) instead.
:::

<ExampleViewer :component="Multiple" :code="MultipleCode" />

### Sizes

The component can be displayed in different sizes using the `size` prop.

<ExampleViewer :component="Sizes" :code="SizesCode" />

### Variants

Different styles can be achieved with the `variant` prop.

<ExampleViewer :component="Variants" :code="VariantsCode" />

### With Icons

Add an icon to the component to explain its function more visually.

<ExampleViewer :component="WithIcons" :code="WithIconsCode" />

</section>

<section class="odocs-specs">

## Select Component

> Select an item in a list. Use with Field to access all functionalities.

```html
<o-select></o-select>
```

### Props

| Prop name          | Description                                                                           | Type                                                                                                                      | Values                                                                          | Default                                                                                                                                               |
| ------------------ | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| autocomplete       | Same as native autocomplete options to use in HTML5 validation                        | string                                                                                                                    | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>select: {<br>&nbsp;&nbsp;autocomplete: "off"<br>}</code>  |
| customValidity     | Custom HTML 5 validation error to set on the form control                             | string \| ((currentValue: ValueType&lt;unknown, IsMultiple&gt; \| null , state: ValidityState) =&gt; string) \| undefined | -                                                                               |                                                                                                                                                       |
| disabled           | Disable the input - same as native disabled                                           | boolean                                                                                                                   | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                           |
| expanded           | Makes input full width when inside a grouped or addon field                           | boolean                                                                                                                   | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>select: {<br>&nbsp;&nbsp;expanded: false<br>}</code>      |
| icon               | Icon to be shown                                                                      | string                                                                                                                    | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>select: {<br>&nbsp;&nbsp;icon: undefined<br>}</code>      |
| iconClickable      | Makes the icon clickable                                                              | boolean                                                                                                                   | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                           |
| iconPack           | Icon pack to use                                                                      | string                                                                                                                    | `mdi`, `fa`, `fas and any other custom icon pack`                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>select: {<br>&nbsp;&nbsp;iconPack: undefined<br>}</code>  |
| iconRight          | Icon to be added on the right side                                                    | string                                                                                                                    | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>select: {<br>&nbsp;&nbsp;iconRight: undefined<br>}</code> |
| iconRightClickable | Make the icon right clickable                                                         | boolean                                                                                                                   | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                           |
| iconRightVariant   | Variant of right icon                                                                 | string                                                                                                                    | -                                                                               |                                                                                                                                                       |
| id                 | Same as native id. Also set the `for` label for o-field wrapper - default is an uuid. | string                                                                                                                    | -                                                                               | <code style='white-space: nowrap; padding: 0;'>useId()</code>                                                                                         |
| v-model            | The input value state                                                                 | ValueType&lt;unknown, IsMultiple&gt;                                                                                      | -                                                                               |                                                                                                                                                       |
| multiple           | Allow multiple selection - converts the `modelValue` into an array                    | IsMultiple                                                                                                                | -                                                                               |                                                                                                                                                       |
| nativeSize         | Same as native size                                                                   | Numberish                                                                                                                 | -                                                                               |                                                                                                                                                       |
| options            | Select options, unnecessary when default slot is used                                 | SelectOptions&lt;unknown&gt;                                                                                              | -                                                                               |                                                                                                                                                       |
| override           | Override existing theme classes completely                                            | boolean                                                                                                                   | -                                                                               |                                                                                                                                                       |
| placeholder        | Text when nothing is selected                                                         | string                                                                                                                    | -                                                                               |                                                                                                                                                       |
| required           | Same as native required                                                               | boolean                                                                                                                   | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                           |
| rounded            | Makes the element rounded                                                             | boolean                                                                                                                   | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                           |
| size               | Vertical size of input                                                                | string                                                                                                                    | `small`, `medium`, `large`                                                      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>select: {<br>&nbsp;&nbsp;size: undefined<br>}</code>      |
| statusIcon         | Show status icon using field and variant prop                                         | boolean                                                                                                                   | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>{<br>&nbsp;&nbsp;statusIcon: true<br>}</code>             |
| useHtml5Validation | Enable HTML 5 native validation                                                       | boolean                                                                                                                   | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>{<br>&nbsp;&nbsp;useHtml5Validation: true<br>}</code>     |
| variant            | Color variant of the control                                                          | string                                                                                                                    | `primary`, `info`, `success`, `warning`, `danger`, `and any other custom color` | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>select: {<br>&nbsp;&nbsp;variant: undefined<br>}</code>   |

### Events

| Event name         | Properties                                                 | Description                     |
| ------------------ | ---------------------------------------------------------- | ------------------------------- |
| update:model-value | **value** `unknown \| unknown[]` - updated modelValue prop | modelValue prop two-way binding |
| focus              | **event** `Event` - native event                           | on input focus event            |
| blur               | **event** `Event` - native event                           | on input blur event             |
| invalid            | **event** `Event` - native event                           | on input invalid event          |
| icon-click         | **event** `Event` - native event                           | on icon click event             |
| icon-right-click   | **event** `Event` - native event                           | on icon right click event       |

### Slots

| Name        | Description                                             | Bindings |
| ----------- | ------------------------------------------------------- | -------- |
| placeholder | Override the placeholder                                |          |
| default     | Define the select options here, default is options prop |          |

</section>

<section class="odocs-classes">

## Class Inspector

<inspector-select-viewer />

</section>

<section class="odocs-style">

## Sass Variables

<div class="theme-oruga">

> Current theme ➜ _[Oruga](https://github.com/oruga-ui/theme-oruga)_

| SASS Variable                 | Default                                                                     |
| ----------------------------- | --------------------------------------------------------------------------- |
| $select-height                | h.useVar("control-height")                                                  |
| $select-padding               | h.useVar("control-padding-vertical") h.useVar("control-padding-horizontal") |
| $select-disabled-opacity      | h.useVar("control-disabled-opacity")                                        |
| $select-color                 | h.useVar("font-color")                                                      |
| $select-font-size             | h.useVar("font-size")                                                       |
| $select-font-weight           | h.useVar("font-weight")                                                     |
| $select-line-height           | h.useVar("line-height")                                                     |
| $select-box-shadow            | h.useVar("control-box-shadow-inset")                                        |
| $select-background-color      | h.useVar("control-background-color")                                        |
| $select-border-color          | h.useVar("control-border-color")                                            |
| $select-border-style          | solid                                                                       |
| $select-border-width          | h.useVar("control-border-width")                                            |
| $select-border-radius         | h.useVar("border-radius")                                                   |
| $select-border-radius-rounded | h.useVar("border-radius-rounded")                                           |
| $select-multiple-padding      | h.useVar("control-spacer")                                                  |
| $select-arrow-color           | vars.$font-color                                                            |
| $select-arrow-size            | 1em                                                                         |

See ➜ 📄 [SCSS file](https://github.com/oruga-ui/theme-oruga/tree/main/src/assets/scss/components/_select.scss)

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
