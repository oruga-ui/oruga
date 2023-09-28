---
title: Steps
---

# Steps

<div class="vp-doc">

> Responsive horizontal process steps

<Carbon />
</div>

<div class="vp-example">

## Examples

<example-steps />

</div>
<div class="vp-example">

## Class props

<inspector-steps-viewer />

</div>

<div class="vp-doc">

## Steps component

```html
<o-steps></o-steps>
```

### Props

| Prop name         | Description                                                                                                                   | Type    | Values                                            | Default                                                                                                                                                     |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------- | ------- | ------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| animated          | Step navigation is animated                                                                                                   | boolean | -                                                 | true                                                                                                                                                        |
| ariaNextLabel     |                                                                                                                               | string  | -                                                 |                                                                                                                                                             |
| ariaPreviousLabel |                                                                                                                               | string  | -                                                 |                                                                                                                                                             |
| hasNavigation     | Next and previous buttons below the component. You can use this property if you want to use your own custom navigation items. | boolean | -                                                 | true                                                                                                                                                        |
| iconNext          | Icon to use for navigation button                                                                                             | string  | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>steps: {<br>&nbsp;&nbsp;iconNext: "chevron-right", <br>}</code> |
| iconPack          | Icon pack to use for the navigation                                                                                           | string  | `mdi`, `fa`, `fas and any other custom icon pack` |                                                                                                                                                             |
| iconPrev          | Icon to use for navigation button                                                                                             | string  | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>steps: {<br>&nbsp;&nbsp;iconPrev: "chevron-left", <br>}</code>  |
| labelPosition     | Position of the marker label, optional                                                                                        | string  | `bottom`, `right`, `left`                         | "bottom"                                                                                                                                                    |
| mobileBreakpoint  | Mobile breakpoint as max-width value                                                                                          | string  | -                                                 |                                                                                                                                                             |
| override          |                                                                                                                               | boolean | -                                                 |                                                                                                                                                             |
| rounded           | Rounded step markers                                                                                                          | boolean | -                                                 | true                                                                                                                                                        |

### Slots

| Name       | Description | Bindings |
| ---------- | ----------- | -------- |
| default    |             |          |
| navigation |             | <br/>    |

</div>

<div class="vp-doc">

## StepItem component

```html
<o-step-item></o-step-item>
```

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
<div class="vp-doc">

## Sass variables

<div class="theme-orugabase">

> Current theme ➜ _[Oruga Base](https://github.com/oruga-ui/theme-oruga)_

| SASS Variable                       | Default                     |
| ----------------------------------- | --------------------------- |
| $steps-details-background-color     | hsl(0, 0%, 100%)            |
| $steps-details-padding              | 0.2em                       |
| $steps-marker-background            | $grey-light                 |
| $steps-marker-color                 | $primary-invert             |
| $steps-marker-border                | 0.2em solid #fff            |
| $steps-marker-font-weight           | 700                         |
| $steps-marker-rounded-border-radius | $base-rounded-border-radius |
| $steps-color                        | $grey-lighter               |
| $steps-previous-color               | $primary                    |
| $steps-active-color                 | $primary                    |
| $steps-divider-height               | 0.2em                       |
| $steps-vertical-padding             | 1em 0                       |
| $steps-item-line-height             | $base-line-height           |
| $steps-link-color                   | hsl(0, 0%, 29%)             |
| $steps-content-padding              | 1rem                        |
| $steps-font-size                    | $base-font-size             |
| $steps-details-title-font-weight    | 600                         |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-oruga/tree/main/src/assets/scss/components/_steps.scss)

</div><div class="theme-orugafull">

> Current theme ➜ _[Oruga Full](https://github.com/oruga-ui/theme-oruga)_

| SASS Variable                       | Default                     |
| ----------------------------------- | --------------------------- |
| $steps-details-background-color     | hsl(0, 0%, 100%)            |
| $steps-details-padding              | 0.2em                       |
| $steps-marker-background            | $grey-light                 |
| $steps-marker-color                 | $primary-invert             |
| $steps-marker-border                | 0.2em solid #fff            |
| $steps-marker-font-weight           | 700                         |
| $steps-marker-rounded-border-radius | $base-rounded-border-radius |
| $steps-color                        | $grey-lighter               |
| $steps-previous-color               | $primary                    |
| $steps-active-color                 | $primary                    |
| $steps-divider-height               | 0.2em                       |
| $steps-vertical-padding             | 1em 0                       |
| $steps-item-line-height             | $base-line-height           |
| $steps-link-color                   | hsl(0, 0%, 29%)             |
| $steps-content-padding              | 1rem                        |
| $steps-font-size                    | $base-font-size             |
| $steps-details-title-font-weight    | 600                         |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-oruga/tree/main/src/assets/scss/components/_steps.scss)

</div><div class="theme-bulma">

> Current theme ➜ _[Bulma](https://github.com/oruga-ui/theme-bulma)_

<p>The theme does not have any custom variables for this component.</p>
</div><div class="theme-bootstrap">

> Current theme ➜ _[Bootstrap](https://github.com/oruga-ui/theme-bootstrap)_

| SASS Variable           | Default                     |
| ----------------------- | --------------------------- |
| $steps-marker-bg        | var(--#{$prefix}gray-light) |
| $steps-marker-border    | var(--#{$prefix}white)      |
| $steps-marker-color     | var(--#{$prefix}white)      |
| $steps-color-active     | var(--#{$prefix}primary)    |
| $steps-title-color      | var(--#{$prefix}dark)       |
| $steps-title-bg         | var(--#{$prefix}white)      |
| $steps-divider-height   | 0.2em                       |
| $steps-content-spacer   | 1rem                        |
| $steps-content-padding  | 1rem                        |
| $steps-vertical-padding | 1em 0                       |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-bootstrap/tree/main/src/assets/scss/components/_steps.scss)

</div>

</div>
