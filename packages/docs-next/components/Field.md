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

<inspector-field-viewer />

</div>

<div class="vp-doc">

## Field Component

### Props

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

### Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| label   |             |          |
| default |             |          |
| message |             |          |

</div>

<div class="vp-doc">

## Theme Styles

<div class="theme-orugabase">
 
| SASS Variable  | Default |
| -------------- | ------- |
| $field-label-color | #363636 !default |
| $field-label-font-weight | 600 !default |
| $field-margin-bottom | .75rem !default |
| $field-message-font-size | .75rem !default |
| $field-message-margin-top | .25rem !default |
| $field-margin-right | .37rem !default |
| $field-horizontal-label-margin | 0 1.5rem 0 0 !default |

📄 [Full scss file](https://github.com/oruga-ui/oruga/blob/master/packages/oruga/src/scss/components/_field.scss)

</div>

<div class="theme-orugafull">
 
| SASS Variable  | Default |
| -------------- | ------- |
| $field-label-color | #363636 !default |
| $field-label-font-weight | 600 !default |
| $field-margin-bottom | .75rem !default |
| $field-message-font-size | .75rem !default |
| $field-message-margin-top | .25rem !default |
| $field-margin-right | .37rem !default |
| $field-horizontal-label-margin | 0 1.5rem 0 0 !default |

📄 [Full scss file](https://github.com/oruga-ui/oruga/blob/master/packages/oruga/src/scss/components/_field.scss)

</div>

<div class="theme-bulma">

<p> This component does not have any Oruga style overrides for the Bulma Theme. </p>
      
</div>

<div class="theme-bootstrap">
 
| SASS Variable  | Default |
| -------------- | ------- |
| $input-field-grouped-spacer | 0.5rem !default |
| $input-field-margin-bottom | $spacer !default |
| $input-field-btn-border-color | $input-border-color !default |

📄 [Full scss file](https://github.com/oruga-ui/theme-bootstrap/tree/main/src/assets/scss/components/_field.scss)

</div>

</div>
