---
title: Steps
---

# Steps

<div class="vp-doc">

> Responsive horizontal process steps

</div>
<example-steps />

## Class props

<br />

<inspector-steps-viewer />

<br />
<br />

<div class="vp-doc">

## Props

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

## Style

📄 [Full scss file](https://github.com/oruga-ui/oruga/blob/master/packages/oruga/src/scss/components/__steps.scss.scss)

| CSS Variable                               | SASS Variable                        | Default                      |
| ------------------------------------------ | ------------------------------------ | ---------------------------- |
| --oruga-steps-details-background-color     | \$steps-details-background-color     | hsl(0, 0%, 100%)             |
| --oruga-steps-details-padding              | \$steps-details-padding              | .2em                         |
| --oruga-steps-marker-background            | \$steps-marker-background            | \$grey-light                 |
| --oruga-steps-marker-color                 | \$steps-marker-color                 | \$primary-invert             |
| --oruga-steps-marker-border                | \$steps-marker-border                | .2em solid #fff              |
| --oruga-steps-marker-font-weight           | \$steps-marker-font-weight           | 700                          |
| --oruga-steps-marker-rounded-border-radius | \$steps-marker-rounded-border-radius | \$base-rounded-border-radius |
| --oruga-steps-color                        | \$steps-color                        | \$grey-lighter               |
| --oruga-steps-previous-color               | \$steps-previous-color               | \$primary                    |
| --oruga-steps-active-color                 | \$steps-active-color                 | \$primary                    |
| --oruga-steps-divider-height               | \$steps-divider-height               | .2em                         |
| --oruga-steps-vertical-padding             | \$steps-vertical-padding             | 1em 0                        |
| --oruga-steps-item-line-height             | \$steps-item-line-height             | \$base-line-height           |
| --oruga-steps-link-color                   | \$steps-link-color                   | hsl(0, 0%, 29%)              |
| --oruga-steps-content-padding              | \$steps-content-padding              | 1rem                         |
| --oruga-steps-font-size                    | \$steps-font-size                    | \$base-font-size             |
| --oruga-steps-details-title-font-weight    | \$steps-details-title-font-weight    | 600                          |

</div>
