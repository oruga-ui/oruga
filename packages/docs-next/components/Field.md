---
title: Field
---

# Field

<div class="vp-doc">

> Fields are used to add functionality to controls and to attach/group components and elements together

</div>
<example-field />

## Class props

<br />

<inspector-field-viewer />

<br />
<br />

<div class="vp-doc">

## Props

| Prop name        | Description                                                                                                      | Type    | Values                                                                          | Default |
| ---------------- | ---------------------------------------------------------------------------------------------------------------- | ------- | ------------------------------------------------------------------------------- | ------- |
| addons           | Field automatically attach controls together                                                                     | boolean | -                                                                               | true    |
| groupMultiline   | Allow controls to fill up multiple lines, making it responsive                                                   | boolean | -                                                                               |         |
| grouped          | Direct child components/elements of Field will be grouped horizontally (see which ones at the top of the page)   | boolean | -                                                                               |         |
| horizontal       | Group label and control on the same line for horizontal forms                                                    | boolean | -                                                                               |         |
| label            | Field label                                                                                                      | string  | -                                                                               |         |
| labelFor         | Same as native for set on the label                                                                              | string  | -                                                                               |         |
| labelSize        | Vertical size of input, optional                                                                                 | string  | `small`, `medium`, `large`                                                      |         |
| message          | Help message text                                                                                                | string  | -                                                                               |         |
| mobileBreakpoint | Mobile breakpoint as max-width value                                                                             | string  | -                                                                               |         |
| override         |                                                                                                                  | boolean | -                                                                               |         |
| variant          | Color of the field and help message, also adds a matching icon, optional. Used by Input, Select and Autocomplete | string  | `primary`, `info`, `success`, `warning`, `danger`, `and any other custom color` |         |

## Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| label   |             |          |
| default |             |          |
| message |             |          |

## Style

📄 [Full scss file](https://github.com/oruga-ui/oruga/blob/master/packages/oruga/src/scss/components/__field.scss.scss)

| CSS Variable                          | SASS Variable                   | Default      |
| ------------------------------------- | ------------------------------- | ------------ |
| --oruga-field-label-color             | \$field-label-color             | #363636      |
| --oruga-field-label-font-weight       | \$field-label-font-weight       | 600          |
| --oruga-field-margin-bottom           | \$field-margin-bottom           | .75rem       |
| --oruga-field-message-font-size       | \$field-message-font-size       | .75rem       |
| --oruga-field-message-margin-top      | \$field-message-margin-top      | .25rem       |
| --oruga-field-margin-right            | \$field-margin-right            | .37rem       |
| --oruga-field-horizontal-label-margin | \$field-horizontal-label-margin | 0 1.5rem 0 0 |

</div>
