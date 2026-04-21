[//]: # "This file is generated and should not be edited by hand!"

# Field

<section class="odocs-hea">

The **Field** component is used to add functionality to controls and to attach/group components and elements together.

</section>

<section class="odocs-examples">

## Examples

<script setup >
import Base from "@/components/Field/examples/base.vue";
import BaseCode from "@/components/Field/examples/base.vue?raw";

import Addons from "@/components/Field/examples/addons.vue";
import AddonsCode from "@/components/Field/examples/addons.vue?raw";

import Grouped from "@/components/Field/examples/grouped.vue";
import GroupedCode from "@/components/Field/examples/grouped.vue?raw";

import Horizontal from "@/components/Field/examples/horizontal.vue";
import HorizontalCode from "@/components/Field/examples/horizontal.vue?raw";

import Templates from "@/components/Field/examples/templates.vue";
import TemplatesCode from "@/components/Field/examples/templates.vue?raw";
</script>

### Base

<ExampleViewer :component="Base" :code="BaseCode" />

### Addons

Use the `addons` prop to attach multiple controls together.

<ExampleViewer :component="Addons" :code="AddonsCode" />

### Grouped

Use the `grouped` prop to group several controls that belong together.

<ExampleViewer :component="Grouped" :code="GroupedCode" />

### Horizontal

When the `horizontal` prop is set, the component will align horizontally.

<ExampleViewer :component="Horizontal" :code="HorizontalCode" />

### Templates

The `label` and the `message` can be customised using template slots if needed.

<ExampleViewer :component="Templates" :code="TemplatesCode" />

</section>

<section class="odocs-specs">

## Field Component

> Fields are used to add functionality to controls and to attach/group components and elements together.

```html
<o-field></o-field>
```

### Props

| Prop name        | Description                                                                                                         | Type               | Values                                                                          | Default                                                                                                                                                     |
| ---------------- | ------------------------------------------------------------------------------------------------------------------- | ------------------ | ------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| addons           | Field automatically attach controls together                                                                        | boolean            | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                 |
| grouped          | Direct child components/elements of Field will be grouped horizontally<br/>(see which ones at the top of the page). | boolean            | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                 |
| horizontal       | Group label and control on the same line for horizontal forms                                                       | boolean            | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                 |
| label            | Field label                                                                                                         | string             | -                                                                               |                                                                                                                                                             |
| labelFor         | Same as native `for` set on the label                                                                               | string             | -                                                                               |                                                                                                                                                             |
| labelId          | A unique HTML id for the field label to associate an input with                                                     | string             | -                                                                               | <code style='white-space: nowrap; padding: 0;'>useId()</code>                                                                                               |
| labelSize        | Size of the field label                                                                                             | string             | `small`, `medium`, `large`                                                      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>field: {<br>&nbsp;&nbsp;labelSize: undefined<br>}</code>        |
| message          | Help message text                                                                                                   | string \| string[] | -                                                                               |                                                                                                                                                             |
| messageId        | A unique HTML id for the field message to associate an input with                                                   | string             | -                                                                               | <code style='white-space: nowrap; padding: 0;'>useId()</code>                                                                                               |
| messageSize      | Size of the field message                                                                                           | string             | `small`, `medium`, `large`                                                      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>field: {<br>&nbsp;&nbsp;messageSize: undefined<br>}</code>      |
| messageTag       | Message element tag name                                                                                            | DynamicComponent   | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>field: {<br>&nbsp;&nbsp;messageTag: "p"<br>}</code>             |
| mobileBreakpoint | Mobile breakpoint as `max-width` value                                                                              | string             | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>field: {<br>&nbsp;&nbsp;mobileBreakpoint: undefined<br>}</code> |
| multiline        | Allow controls to fill up multiple lines, making it responsive                                                      | boolean            | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                 |
| override         | Override existing theme classes completely                                                                          | boolean            | -                                                                               |                                                                                                                                                             |
| variant          | Color of the field and help message, also adds a matching icon.<br/>Used by Input, Select and Autocomplete.         | string             | `primary`, `info`, `success`, `warning`, `danger`, `and any other custom color` |                                                                                                                                                             |

### Slots

| Name    | Description          | Bindings                                                         |
| ------- | -------------------- | ---------------------------------------------------------------- |
| label   | Override the label   |                                                                  |
| message | Override the message | **message** `string \| string[] \| undefined` - message property |
| default | Default content      |                                                                  |

</section>

<section class="odocs-classes">

## Class Inspector

<inspector-field-viewer />

</section>

<section class="odocs-style">

## Sass Variables

<div class="theme-oruga">

> Current theme ➜ _[Oruga](https://github.com/oruga-ui/theme-oruga)_

| SASS Variable              | Default                    |
| -------------------------- | -------------------------- |
| $field-spacer              | h.useVar("control-spacer") |
| $field-margin-bottom       | calc(1.5 \* $field-spacer) |
| $field-label-color         | h.useVar("font-color")     |
| $field-label-font-size     | h.useVar("font-size")      |
| $field-label-font-weight   | 600                        |
| $field-label-line-height   | h.useVar("line-height")    |
| $field-message-spacer      | calc(0.5 \* $field-spacer) |
| $field-message-color       | h.useVar("secondary")      |
| $field-message-font-size   | 0.75em                     |
| $field-message-font-weight | h.useVar("font-weight")    |
| $field-message-line-height | h.useVar("line-height")    |

See ➜ 📄 [SCSS file](https://github.com/oruga-ui/theme-oruga/tree/main/src/assets/scss/components/_field.scss)

</div>
<div class="theme-bulma">

> Current theme ➜ _[Bulma](https://github.com/oruga-ui/theme-bulma)_

| SASS Variable       | Default |
| ------------------- | ------- |
| $floating-in-height | 3.25em  |

See ➜ 📄 [SCSS file](https://github.com/oruga-ui/theme-bulma/tree/main/src/assets/scss/components/_field.scss)

</div>
<div class="theme-bootstrap">

> Current theme ➜ _[Bootstrap](https://github.com/oruga-ui/theme-bootstrap)_

| SASS Variable               | Default           |
| --------------------------- | ----------------- |
| $input-field-margin-bottom  | $spacer           |
| $input-field-grouped-spacer | calc($spacer / 2) |

See ➜ 📄 [SCSS file](https://github.com/oruga-ui/theme-bootstrap/tree/main/src/assets/scss/components/_field.scss)

</div>

</section>
