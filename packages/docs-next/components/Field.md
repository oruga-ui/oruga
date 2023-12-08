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

inspector-Field-viewer /
Field

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
</div>
