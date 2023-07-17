---
title: Steps
---

# Steps

<div class="vp-doc">

> Responsive horizontal process steps

<Carbon />
</div>

<div class="vp-doc">

## Examples

  <example-steps />
  
</div>
<div class="vp-doc">

## Class props

<inspector-steps-viewer />

</div>

<div class="vp-doc">

## Steps Component

### Props

| Prop name         | Description                                                                                                                   | Type    | Values                                            | Default                                                                                                                                        |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------- | ------- | ------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| animated          | Step navigation is animated                                                                                                   | boolean | -                                                 | true                                                                                                                                           |
| ariaNextLabel     |                                                                                                                               | string  | -                                                 |                                                                                                                                                |
| ariaPreviousLabel |                                                                                                                               | string  | -                                                 |                                                                                                                                                |
| hasNavigation     | Next and previous buttons below the component. You can use this property if you want to use your own custom navigation items. | boolean | -                                                 | true                                                                                                                                           |
| iconNext          | Icon to use for navigation button                                                                                             | string  | -                                                 | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> steps: {<br>&nbsp;&nbsp;iconNext: 'chevron-right'<br>}</code> |
| iconPack          | Icon pack to use for the navigation                                                                                           | string  | `mdi`, `fa`, `fas and any other custom icon pack` |                                                                                                                                                |
| iconPrev          | Icon to use for navigation button                                                                                             | string  | -                                                 | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> steps: {<br>&nbsp;&nbsp;iconPrev: 'chevron-left'<br>}</code>  |
| labelPosition     | Position of the marker label, optional                                                                                        | string  | `bottom`, `right`, `left`                         | 'bottom'                                                                                                                                       |
| mobileBreakpoint  | Mobile breakpoint as max-width value                                                                                          | string  | -                                                 |                                                                                                                                                |
| override          |                                                                                                                               | boolean | -                                                 |                                                                                                                                                |
| rounded           | Rounded step markers                                                                                                          | boolean | -                                                 | true                                                                                                                                           |

### Slots

| Name       | Description | Bindings |
| ---------- | ----------- | -------- |
| default    |             |          |
| navigation |             | <br/>    |

---

# Step Item

<div class="vp-doc">

## StepItem Component

### Props

| Prop name | Description                                                                                                                         | Type           | Values | Default   |
| --------- | ----------------------------------------------------------------------------------------------------------------------------------- | -------------- | ------ | --------- |
| clickable | Item can be used directly to navigate. If undefined, previous steps are clickable while the others are not                          | boolean        | -      | undefined |
| override  |                                                                                                                                     | boolean        | -      |           |
| step      | Step marker content (when there is no icon)                                                                                         | string\|number | -      |           |
| variant   | Default style for the step, optional This will override parent type. Could be used to set a completed step to "success" for example | string\|object | -      |           |

</div>
<div class="vp-doc">

</div>
</div>
<div class="vp-doc">

## Theme Styles

<div class="theme-orugabase">
 
| SASS Variable  | Default |
| -------------- | ------- |
| $steps-details-background-color | hsl(0, 0%, 100%) !default |
| $steps-details-padding | .2em !default |
| $steps-marker-background | $grey-light !default |
| $steps-marker-color | $primary-invert !default |
| $steps-marker-border | .2em solid #fff !default |
| $steps-marker-font-weight | 700 !default |
| $steps-marker-rounded-border-radius | $base-rounded-border-radius !default |
| $steps-color | $grey-lighter !default |
| $steps-previous-color | $primary !default |
| $steps-active-color | $primary !default |
| $steps-divider-height | .2em !default |
| $steps-vertical-padding | 1em 0 !default |
| $steps-item-line-height | $base-line-height !default |
| $steps-link-color | hsl(0, 0%, 29%) !default |
| $steps-content-padding | 1rem !default |
| $steps-font-size | $base-font-size !default |
| $steps-details-title-font-weight | 600 !default |

📄 [Full scss file](https://github.com/oruga-ui/oruga/blob/master/packages/oruga/src/scss/components/_steps.scss)

</div>

<div class="theme-orugafull">
 
| SASS Variable  | Default |
| -------------- | ------- |
| $steps-details-background-color | hsl(0, 0%, 100%) !default |
| $steps-details-padding | .2em !default |
| $steps-marker-background | $grey-light !default |
| $steps-marker-color | $primary-invert !default |
| $steps-marker-border | .2em solid #fff !default |
| $steps-marker-font-weight | 700 !default |
| $steps-marker-rounded-border-radius | $base-rounded-border-radius !default |
| $steps-color | $grey-lighter !default |
| $steps-previous-color | $primary !default |
| $steps-active-color | $primary !default |
| $steps-divider-height | .2em !default |
| $steps-vertical-padding | 1em 0 !default |
| $steps-item-line-height | $base-line-height !default |
| $steps-link-color | hsl(0, 0%, 29%) !default |
| $steps-content-padding | 1rem !default |
| $steps-font-size | $base-font-size !default |
| $steps-details-title-font-weight | 600 !default |

📄 [Full scss file](https://github.com/oruga-ui/oruga/blob/master/packages/oruga/src/scss/components/_steps.scss)

</div>

<div class="theme-bulma">

<p> This component does not have any Oruga style overrides for the Bulma Theme. </p>
      
</div>

<div class="theme-bootstrap">
 
| SASS Variable  | Default |
| -------------- | ------- |
| $steps-marker-bg | var(--#{$prefix}gray-light) !default |
| $steps-marker-border | var(--#{$prefix}white) !default |
| $steps-marker-color | var(--#{$prefix}white) |
| $steps-color-active | var(--#{$prefix}primary) |
| $steps-title-color | var(--#{$prefix}dark) |
| $steps-title-bg | var(--#{$prefix}white) !default |
| $steps-divider-height | 0.2em !default |
| $steps-content-spacer | 1rem !default |
| $steps-content-padding | 1rem !default |
| $steps-vertical-padding | 1em 0 !default |

📄 [Full scss file](https://github.com/oruga-ui/theme-bootstrap/tree/main/src/assets/scss/components/_steps.scss)

</div>

</div>
