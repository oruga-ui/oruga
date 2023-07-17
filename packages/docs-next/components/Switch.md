---
title: Switch
---

# Switch

<div class="vp-doc">

> Switch between two opposing states

<Carbon />
</div>

<div class="vp-doc">

## Examples

  <example-switch />
  
</div>
<div class="vp-doc">

## Class props

<inspector-switch-viewer />

</div>

<div class="vp-doc">

## Switch Component

### Props

| Prop name      | Description                                                                         | Type                    | Values                                                                          | Default |
| -------------- | ----------------------------------------------------------------------------------- | ----------------------- | ------------------------------------------------------------------------------- | ------- |
| ariaLabelledby | Accessibility label to establish relationship between the switch and control label' | string                  | -                                                                               |         |
| disabled       |                                                                                     | boolean                 | -                                                                               |         |
| falseValue     | Overrides the returned value when it's not checked                                  | string\|number\|boolean | -                                                                               | false   |
| name           | Name attribute on native checkbox                                                   | string                  | -                                                                               |         |
| nativeValue    | Same as native value                                                                | string\|number\|boolean | -                                                                               |         |
| override       |                                                                                     | boolean                 | -                                                                               |         |
| passiveVariant | Color of the switch when is passive, optional                                       | string                  | `primary`, `info`, `success`, `warning`, `danger`, `and any other custom color` |         |
| position       | Label position                                                                      | string                  | -                                                                               | 'right' |
| required       |                                                                                     | boolean                 | -                                                                               |         |
| rounded        | Rounded style                                                                       | boolean                 | -                                                                               | true    |
| size           | Vertical size of switch, optional                                                   | string                  | `small`, `medium`, `large`                                                      |         |
| trueValue      | Overrides the returned value when it's checked                                      | string\|number\|boolean | -                                                                               | true    |
| v-model        |                                                                                     | string\|number\|boolean | -                                                                               |         |
| variant        | Color of the switch, optional                                                       | string                  | `primary`, `info`, `success`, `warning`, `danger`, `and any other custom color` |         |

## Events

| Event name        | Properties | Description |
| ----------------- | ---------- | ----------- |
| update:modelValue |            |

## Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| default |             |          |

</div>
<div class="vp-doc">

## Theme Styles

<div class="theme-orugabase">
 
| SASS Variable  | Default |
| -------------- | ------- |
| $switch-active-background-color | $primary !default |
| $switch-action-background | #f5f5f5 !default |
| $switch-background | $grey-light !default |
| $switch-border-radius | $base-border-radius !default |
| $switch-box-shadow | 0 3px 1px 0 rgba(0, 0, 0, 0.05), 0 2px 2px 0 rgba(0, 0, 0, 0.1), 0 3px 3px 0 rgba(0, 0, 0, 0.05) !default |
| $switch-disabled-opacity | $base-disabled-opacity !default |
| $switch-margin-label | .5em !default |
| $switch-padding | 0.2em !default |
| $switch-rounded-border-radius | $base-rounded-border-radius !default |
| $switch-width | 2.75 * 1em !default |

📄 [Full scss file](https://github.com/oruga-ui/oruga/blob/master/packages/oruga/src/scss/components/_switch.scss)

</div>

<div class="theme-orugafull">
 
| SASS Variable  | Default |
| -------------- | ------- |
| $switch-active-background-color | $primary !default |
| $switch-action-background | #f5f5f5 !default |
| $switch-background | $grey-light !default |
| $switch-border-radius | $base-border-radius !default |
| $switch-box-shadow | 0 3px 1px 0 rgba(0, 0, 0, 0.05), 0 2px 2px 0 rgba(0, 0, 0, 0.1), 0 3px 3px 0 rgba(0, 0, 0, 0.05) !default |
| $switch-disabled-opacity | $base-disabled-opacity !default |
| $switch-margin-label | .5em !default |
| $switch-padding | 0.2em !default |
| $switch-rounded-border-radius | $base-rounded-border-radius !default |
| $switch-width | 2.75 * 1em !default |

📄 [Full scss file](https://github.com/oruga-ui/oruga/blob/master/packages/oruga/src/scss/components/_switch.scss)

</div>

<div class="theme-bulma">

<p> This component does not have any Oruga style overrides for the Bulma Theme. </p>
      
</div>

<div class="theme-bootstrap">
 
| SASS Variable  | Default |
| -------------- | ------- |
| $switch-spacer | 0.5rem !default |

📄 [Full scss file](https://github.com/oruga-ui/theme-bootstrap/tree/main/src/assets/scss/components/_switch.scss)

</div>

</div>
