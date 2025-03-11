# Field

<section class="odocs-head">

The **Field** component is used to add functionality to controls and to attach/group components and elements together.

</section>

<section class="odocs-examples">

## Examples

<example-field />

</section>

<section class="odocs-specs">

## Field component

> Fields are used to add functionality to controls and to attach/group components and elements together.

```html
<o-field></o-field>
```

### Props

| Prop name        | Description                                                                                                         | Type             | Values                                                                          | Default                                                                                                                                                     |
| ---------------- | ------------------------------------------------------------------------------------------------------------------- | ---------------- | ------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| addons           | Field automatically attach controls together                                                                        | boolean          | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                 |
| grouped          | Direct child components/elements of Field will be grouped horizontally<br/>(see which ones at the top of the page). | boolean          | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                 |
| horizontal       | Group label and control on the same line for horizontal forms                                                       | boolean          | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                 |
| label            | Field label                                                                                                         | string           | -                                                                               |                                                                                                                                                             |
| labelFor         | Same as native `for` set on the label                                                                               | string           | -                                                                               |                                                                                                                                                             |
| labelId          | A unique HTML id for the field label to associate an input with                                                     | string           | -                                                                               | <code style='white-space: nowrap; padding: 0;'>useId()</code>                                                                                               |
| labelSize        | Vertical size of input                                                                                              | string           | `small`, `medium`, `large`                                                      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>field: {<br>&nbsp;&nbsp;labelsize: undefined<br>}</code>        |
| message          | Help message text                                                                                                   | string           | -                                                                               |                                                                                                                                                             |
| messageId        | A unique HTML id for the field message to associate an input with                                                   | string           | -                                                                               | <code style='white-space: nowrap; padding: 0;'>useId()</code>                                                                                               |
| messageTag       | Message element tag name                                                                                            | DynamicComponent | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>field: {<br>&nbsp;&nbsp;messageTag: "p"<br>}</code>             |
| mobileBreakpoint | Mobile breakpoint as `max-width` value                                                                              | string           | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>field: {<br>&nbsp;&nbsp;mobileBreakpoint: undefined<br>}</code> |
| override         | Override existing theme classes completely                                                                          | boolean          | -                                                                               |                                                                                                                                                             |
| variant          | Color of the field and help message, also adds a matching icon.<br/>Used by Input, Select and Autocomplete.         | string           | `primary`, `info`, `success`, `warning`, `danger`, `and any other custom color` |                                                                                                                                                             |

### Slots

| Name    | Description          | Bindings                             |
| ------- | -------------------- | ------------------------------------ |
| label   | Override the label   | **label** `string` - label property  |
| message | Override the message | **message** `string` - field message |
| default | Default content      |                                      |

</section>

<section class="odocs-classes">

## Class Inspector

<inspector-field-viewer />

</section>

<section class="odocs-style">

## Sass variables

<div class="theme-oruga">

> Current theme ➜ _[Oruga](https://github.com/oruga-ui/theme-oruga)_

| SASS Variable                  | Default      |
| ------------------------------ | ------------ |
| $field-label-color             | #363636      |
| $field-label-font-weight       | 600          |
| $field-margin-bottom           | 0.75rem      |
| $field-message-font-size       | 0.75rem      |
| $field-message-margin-top      | 0.25rem      |
| $field-margin-right            | 0.37rem      |
| $field-horizontal-label-margin | 0 1.5rem 0 0 |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-oruga/tree/main/src/assets/scss/components/_field.scss)

</div>
<div class="theme-bulma">

> Current theme ➜ _[Bulma](https://github.com/oruga-ui/theme-bulma)_

| SASS Variable       | Default |
| ------------------- | ------- |
| $floating-in-height | 3.25em  |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-bulma/tree/main/src/assets/scss/components/_field.scss)

</div>
<div class="theme-bootstrap">

> Current theme ➜ _[Bootstrap](https://github.com/oruga-ui/theme-bootstrap)_

| SASS Variable                 | Default             |
| ----------------------------- | ------------------- |
| $input-field-grouped-spacer   | 0.5rem              |
| $input-field-margin-bottom    | $spacer             |
| $input-field-btn-border-color | $input-border-color |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-bootstrap/tree/main/src/assets/scss/components/_field.scss)

</div>

</section>
