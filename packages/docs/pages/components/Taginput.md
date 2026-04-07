[//]: # "This file is generated and should not be edited by hand!"

# Taginput

<section class="odocs-head">

The **Taginput** input component allows users to search through a list of options and apply any number of tags.
The component is based on the [Autocomplete](/components/Autocomplete) component and implements the W3C ARIA APG [Combobox Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/).
Use it with the [Field](/components/Field) component to access all functionalities.

</section>

<section class="odocs-examples">

## Examples

<script setup>
import Base from "@/components/Taginput/examples/base.vue";
import BaseCode from "@/components/Taginput/examples/base.vue?raw";

import Autocomplete from "@/components/Taginput/examples/autocomplete.vue";
import AutocompleteCode from "@/components/Taginput/examples/autocomplete.vue?raw";

import Templates from "@/components/Taginput/examples/templates.vue";
import TemplatesCode from "@/components/Taginput/examples/templates.vue?raw";

import Limits from "@/components/Taginput/examples/limits.vue";
import LimitsCode from "@/components/Taginput/examples/limits.vue?raw";

import Disabled from "@/components/Taginput/examples/disabled.vue";
import DisabledCode from "@/components/Taginput/examples/disabled.vue?raw";

import Variants from "@/components/Taginput/examples/variants.vue";
import VariantsCode from "@/components/Taginput/examples/variants.vue?raw";

import Sizes from "@/components/Taginput/examples/sizes.vue";
import SizesCode from "@/components/Taginput/examples/sizes.vue?raw";
</script>

### Base

<ExampleViewer :component="Base" :code="BaseCode" />

### Autocomplete

Unlike the dropdown or autocomplete components, the taginput component allows you to enter an arbitrary value (a value that is not in the list of options). This is useful for creating new tags on the fly. To enable this feature, set the `allow-new` prop to true.

The `options` prop can accept several different formats of values. They are similiar to the options definition of the [**Dropdown**](/components/dropdown.html) component:

- An array of primitives `['A', 'B', 'C']`
- An object literal with key-value pairs `{ a: 'A', b: 'B', c: 'C' }`
- An array of objects where each object represent an item
- An array of grouped items where each group object has its own `options` property
- Using the `<o-dropdown-item>` component directly inside the default template slot

::: info TypeScript
The options property type is defined by the `TaginputOptions` type.
:::

<ExampleViewer :component="Autocomplete" :code="AutocompleteCode" />

### Templates

Different parts of the component can be customised using template slots, e.g. the a custom header and footer can be added and the selected items can be customised.

<ExampleViewer :component="Templates" :code="TemplatesCode" />

### Limits

The number of entered items can be limited either by the character length of the item using the `maxlength` prop and by the number of times using the `maxitems` prop.

<ExampleViewer :component="Limits" :code="LimitsCode" />

### Disabled

Prevent inputs with the `disabled` prop.

<ExampleViewer :component="Disabled" :code="DisabledCode" />

### Variants

Different styles can be achieved with the `variant` prop.

<ExampleViewer :component="Variants" :code="VariantsCode" />

### Sizes

The component can be displayed in different sizes using the `size` prop.

<ExampleViewer :component="Sizes" :code="SizesCode" />

</section>

<section class="odocs-specs">

## Taginput Component

> A simple tag input field that can have autocomplete functionality.

```html
<o-taginput></o-taginput>
```

### Props

| Prop name          | Description                                                                                                                                                                      | Type                                                                                           | Values                                                                          | Default                                                                                                                                                     |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| allowDuplicates    | Allows adding the same item multiple time                                                                                                                                        | boolean                                                                                        | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>taginput: {<br>&nbsp;&nbsp;allowDuplicates: false<br>}</code>   |
| allowNew           | Allows adding new items                                                                                                                                                          | boolean                                                                                        | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>taginput: {<br>&nbsp;&nbsp;allowNew: false<br>}</code>          |
| ariaCloseLabel     | Accessibility label for the close button                                                                                                                                         | string                                                                                         | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>taginput: {<br>&nbsp;&nbsp;ariaCloseLabel: "Remove"<br>}</code> |
| autocomplete       | Native options to use in HTML5 validation                                                                                                                                        | string                                                                                         | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>taginput: {<br>&nbsp;&nbsp;autocomplete: "off"<br>}</code>      |
| closeIcon          | Icon name of close icon on selected item                                                                                                                                         | string                                                                                         | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>taginput: {<br>&nbsp;&nbsp;closeIcon: "close"<br>}</code>       |
| closeable          | Add close button to close the item                                                                                                                                               | boolean                                                                                        | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>taginput: {<br>&nbsp;&nbsp;closeable: true<br>}</code>          |
| counter            | Show counter when maxlength or maxtags props are passed                                                                                                                          | boolean                                                                                        | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>taginput: {<br>&nbsp;&nbsp;counter: true<br>}</code>            |
| createItem         | Function to create a new item to push into v-model (items)                                                                                                                       | ((value: string \| unknown) =&gt; unknown)                                                     | -                                                                               | <code style='white-space: nowrap; padding: 0;'>item as T</code>                                                                                             |
| customValidity     | Custom HTML 5 validation error to set on the form control                                                                                                                        | string \| ((currentValue: unknown[] \| null , state: ValidityState) =&gt; string) \| undefined | -                                                                               |                                                                                                                                                             |
| disabled           | Same as native input disabled                                                                                                                                                    | boolean                                                                                        | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                 |
| expanded           | Makes input full width when inside a grouped or addon field                                                                                                                      | boolean                                                                                        | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                 |
| filter             | Function to filter the options based on the input value - default is label string comparison                                                                                     | ((options: unknown, value: string) =&gt; boolean)                                              | -                                                                               |                                                                                                                                                             |
| icon               | Icon to be shown                                                                                                                                                                 | string                                                                                         | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>taginput: {<br>&nbsp;&nbsp;icon: undefined<br>}</code>          |
| iconPack           | Icon pack to use                                                                                                                                                                 | string                                                                                         | `mdi`, `fa`, `fas and any other custom icon pack`                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>taginput: {<br>&nbsp;&nbsp;iconPack: undefined<br>}</code>      |
| input              | The value of the inner input, use v-model:input to make it two-way binding                                                                                                       | string                                                                                         | -                                                                               | <code style='white-space: nowrap; padding: 0;'>""</code>                                                                                                    |
| keepFirst          | The first option will always be pre-selected (easier to just hit enter or tab)                                                                                                   | boolean                                                                                        | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>taginput: {<br>&nbsp;&nbsp;keepFirst: false<br>}</code>         |
| keepOpen           | Keep open dropdown list after select                                                                                                                                             | boolean                                                                                        | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>taginput: {<br>&nbsp;&nbsp;keepOpen: false<br>}</code>          |
| maxitems           | Limits the number of items, plus item counter                                                                                                                                    | Numberish                                                                                      | -                                                                               |                                                                                                                                                             |
| maxlength          | Same as native maxlength, plus character counter                                                                                                                                 | Numberish                                                                                      | -                                                                               |                                                                                                                                                             |
| v-model            | The selected items, use v-model to make it two-way binding binding                                                                                                               | unknown[]                                                                                      | -                                                                               |                                                                                                                                                             |
| openOnFocus        | Opens a dropdown with choices when the input field is focused                                                                                                                    | boolean                                                                                        | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>taginput: {<br>&nbsp;&nbsp;openOnFocus: true<br>}</code>        |
| options            | Taginput options                                                                                                                                                                 | TaginputOptions&lt;unknown&gt;                                                                 | -                                                                               |                                                                                                                                                             |
| override           | Override existing theme classes completely                                                                                                                                       | boolean                                                                                        | -                                                                               |                                                                                                                                                             |
| placeholder        | Input placeholder                                                                                                                                                                | string                                                                                         | -                                                                               |                                                                                                                                                             |
| size               | Vertical size of the input control                                                                                                                                               | string                                                                                         | `small`, `medium`, `large`                                                      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>taginput: {<br>&nbsp;&nbsp;size: undefined<br>}</code>          |
| teleport           | Append the component to another part of the DOM.<br/>Set `true` to append the component to the body.<br/>In addition, any CSS selector string or an actual DOM node can be used. | boolean \| object \| string                                                                    | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>taginput: {<br>&nbsp;&nbsp;teleport: false<br>}</code>          |
| useHtml5Validation | Enable HTML 5 native validation                                                                                                                                                  | boolean                                                                                        | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>{<br>&nbsp;&nbsp;useHtml5Validation: true<br>}</code>           |
| validateItem       | Function to validate the value of a new item before it got added                                                                                                                 | ((value: string \| unknown) =&gt; boolean)                                                     | -                                                                               | <code style='white-space: nowrap; padding: 0;'>true</code>                                                                                                  |
| variant            | Color of the each item                                                                                                                                                           | string                                                                                         | `primary`, `info`, `success`, `warning`, `danger`, `and any other custom color` | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>taginput: {<br>&nbsp;&nbsp;variant: undefined<br>}</code>       |

### Events

| Event name         | Properties                                                            | Description                                    |
| ------------------ | --------------------------------------------------------------------- | ---------------------------------------------- |
| scroll-start       |                                                                       | the list inside the dropdown reached the start |
| scroll-end         |                                                                       | the list inside the dropdown reached it's end  |
| icon-click         | **event** `Event` - native event                                      | on icon click event                            |
| icon-right-click   | **event** `Event` - native event                                      | on icon right click event                      |
| update:model-value | **value** `unknown[]` - updated modelValue prop                       | modelValue prop two-way binding                |
| update:input       | **value** `string` - updated input prop                               | input prop two-way binding                     |
| input              | **value** `string` - input value<br/>**event** `Event` - native event | on input change event                          |
| add                | **value** `unknown` - added item                                      | new item got added                             |
| remove             | **value** `unknown` - removed item                                    | item got removed                               |
| focus              | **event** `Event` - native event                                      | on input focus event                           |
| blur               | **event** `Event` - native event                                      | on input blur event                            |
| invalid            | **event** `Event` - native event                                      | on input invalid event                         |

### Slots

| Name     | Description                                     | Bindings                                                                                                                                                       |
| -------- | ----------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| selected | Override the selected items                     | **items** `(string, object)[]` - selected items<br/>**options** `object[]` - selected options<br/>**removeItem** `(index, event): void` - remove item function |
| header   | Define an additional header                     | **toggle** `(): void` - toggle dropdown active state                                                                                                           |
| default  | Define the taginput items here                  | **toggle** `(): void` - toggle dropdown active state                                                                                                           |
| option   | Define a selected option here                   | **option** `object` - option object                                                                                                                            |
| empty    | Define the content to show if the list is empty | **toggle** `(): void` - toggle dropdown active state                                                                                                           |
| footer   | Define an additional footer                     | **toggle** `(): void` - toggle dropdown active state                                                                                                           |
| counter  | Override the counter                            | **items** `number` - items count<br/>**total** `number` - total count                                                                                          |

</section>

<section class="odocs-classes">

## Class Inspector

<inspector-taginput-viewer />

</section>

<section class="odocs-style">

## Sass Variables

<div class="theme-oruga">

> Current theme ➜ _[Oruga](https://github.com/oruga-ui/theme-oruga)_

| SASS Variable               | Default                    |
| --------------------------- | -------------------------- |
| $taginput-counter-font-size | 0.85rem                    |
| $taginput-counter-spacer    | h.useVar("control-spacer") |
| $taginput-item-spacer       | h.useVar("control-spacer") |

See ➜ 📄 [SCSS file](https://github.com/oruga-ui/theme-oruga/tree/main/src/assets/scss/components/_taginput.scss)

</div>
<div class="theme-bulma">

> Current theme ➜ _[Bulma](https://github.com/oruga-ui/theme-bulma)_

| SASS Variable      | Default |
| ------------------ | ------- |
| $taginput-height   | 100%    |
| $taginput-tag-size | 1em     |

See ➜ 📄 [SCSS file](https://github.com/oruga-ui/theme-bulma/tree/main/src/assets/scss/components/_taginput.scss)

</div>
<div class="theme-bootstrap">

> Current theme ➜ _[Bootstrap](https://github.com/oruga-ui/theme-bootstrap)_

| SASS Variable               | Default            |
| --------------------------- | ------------------ |
| $taginput-badge-margin      | 0.25em             |
| $taginput-counter-margin    | 0.25rem 0 0 0.5rem |
| $taginput-counter-font-size | 0.75rem            |

See ➜ 📄 [SCSS file](https://github.com/oruga-ui/theme-bootstrap/tree/main/src/assets/scss/components/_taginput.scss)

</div>

</section>
