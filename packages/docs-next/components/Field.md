---
title: Field
---

# Field

<div class="vp-doc">

> Fields are used to add functionality to controls and to attach/group components and elements together

<Carbon />
</div>

<div class="vp-example">

## Examples

<example-field />

</div>
<div class="vp-example">

## Class props

<inspector-Field-viewer />

</div>

<div class="vp-doc">

## Field component

> Fields are used to add functionality to controls and to attach/group components and elements together

```html
<o-field></o-field>
```

### Props

| Prop name        | Description                                                                                                         | Type    | Values                                                                          | Default                                                                                                                                                     |
| ---------------- | ------------------------------------------------------------------------------------------------------------------- | ------- | ------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| addons           | Field automatically attach controls together                                                                        | boolean | -                                                                               | <code style='white-space: nowrap; padding: 0;'>true</code>                                                                                                  |
| groupMultiline   | Allow controls to fill up multiple lines, making it responsive                                                      | boolean | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                 |
| grouped          | Direct child components/elements of Field will be grouped horizontally<br/>(see which ones at the top of the page). | boolean | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                 |
| horizontal       | Group label and control on the same line for horizontal forms                                                       | boolean | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                 |
| label            | Field label                                                                                                         | string  | -                                                                               |                                                                                                                                                             |
| labelFor         | Same as native for set on the label                                                                                 | string  | -                                                                               |                                                                                                                                                             |
| labelSize        | Vertical size of input                                                                                              | string  | `small`, `medium`, `large`                                                      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>field: {<br>&nbsp;&nbsp;labelsize: undefined<br>}</code>        |
| message          | Help message text                                                                                                   | string  | -                                                                               |                                                                                                                                                             |
| mobileBreakpoint | Mobile breakpoint as max-width value                                                                                | string  | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>field: {<br>&nbsp;&nbsp;mobileBreakpoint: undefined<br>}</code> |
| variant          | Color of the field and help message, also adds a matching icon.<br/>Used by Input, Select and Autocomplete.         | string  | `primary`, `info`, `success`, `warning`, `danger`, `and any other custom color` |                                                                                                                                                             |

### Slots

| Name    | Description          | Bindings |
| ------- | -------------------- | -------- |
| label   | Override the label   |          |
| default | Default content      |          |
| message | Override the message |          |

</div>

<div class="vp-doc">

## Sass variables

<div class="theme-orugabase">

> Current theme ➜ _[Oruga Base](https://github.com/oruga-ui/theme-oruga)_

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

</div><div class="theme-orugafull">

> Current theme ➜ _[Oruga Full](https://github.com/oruga-ui/theme-oruga)_

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

</div><div class="theme-bulma">

> Current theme ➜ _[Bulma](https://github.com/oruga-ui/theme-bulma)_

<p>The theme does not have any custom variables for this component.</p>
</div><div class="theme-bootstrap">

> Current theme ➜ _[Bootstrap](https://github.com/oruga-ui/theme-bootstrap)_

| SASS Variable                 | Default             |
| ----------------------------- | ------------------- |
| $input-field-grouped-spacer   | 0.5rem              |
| $input-field-margin-bottom    | $spacer             |
| $input-field-btn-border-color | $input-border-color |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-bootstrap/tree/main/src/assets/scss/components/_field.scss)

</div>

</div>
