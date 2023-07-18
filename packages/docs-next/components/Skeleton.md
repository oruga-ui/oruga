---
title: Skeleton
---

# Skeleton

<div class="vp-doc">

> A placeholder for content to load

<Carbon />
</div>

<div class="vp-doc">

## Examples

<example-skeleton />

</div>
<div class="vp-doc">

## Class props

<inspector-skeleton-viewer />

</div>

<div class="vp-doc">

## Skeleton Component

### Props

| Prop name | Description                                  | Type           | Values                      | Default |
| --------- | -------------------------------------------- | -------------- | --------------------------- | ------- |
| active    | Show or hide loader                          | boolean        | -                           | true    |
| animated  | Show a loading animation                     | boolean        | -                           | true    |
| circle    | Show a circle shape                          | boolean        | -                           |         |
| count     | Number of shapes to display                  | number         | -                           | 1       |
| height    | Custom height                                | number\|string | -                           |         |
| override  |                                              | boolean        | -                           |         |
| position  | Skeleton position in relation to the element | string         | `left`, `centered`, `right` | 'left'  |
| rounded   | Rounded style                                | boolean        | -                           | true    |
| size      | Size of skeleton                             | string         | `small`, `medium`, `large`  |         |
| width     | Custom width                                 | number\|string | -                           |         |

</div>
<div class="vp-doc">

## Theme Styles

<div class="theme-orugabase">
 
| SASS Variable  | Default |
| -------------- | ------- |
| $skeleton-background | linear-gradient(90deg, $grey-lighter 25%, rgba($grey-lighter, 0.5) 50%, $grey-lighter 75%) !default |
| $skeleton-border-radius | $base-border-radius !default |
| $skeleton-duration | 1.5s !default |
| $skeleton-margin | .5rem 0 0 0 !default |

📄 [Full scss file](https://github.com/oruga-ui/oruga/blob/master/packages/oruga/src/scss/components/_skeleton.scss)

</div>

<div class="theme-orugafull">
 
| SASS Variable  | Default |
| -------------- | ------- |
| $skeleton-background | linear-gradient(90deg, $grey-lighter 25%, rgba($grey-lighter, 0.5) 50%, $grey-lighter 75%) !default |
| $skeleton-border-radius | $base-border-radius !default |
| $skeleton-duration | 1.5s !default |
| $skeleton-margin | .5rem 0 0 0 !default |

📄 [Full scss file](https://github.com/oruga-ui/oruga/blob/master/packages/oruga/src/scss/components/_skeleton.scss)

</div>

<div class="theme-bulma">

<p> This component does not have any Oruga style overrides for the Bulma Theme. </p>
      
</div>

<div class="theme-bootstrap">
 
| SASS Variable  | Default |
| -------------- | ------- |
| $skeleton-bg-color | $dark-bg-subtle !default |
| $skeleton-bg | linear-gradient(  90deg,  $skeleton-bg-color 25%,  rgba($skeleton-bg-color, 0.5) 50%,  $skeleton-bg-color 75%) !default |
| $skeleton-duration | 1.5s !default |
| $skeleton-margin | 0.5rem 0 0 0 !default |

📄 [Full scss file](https://github.com/oruga-ui/theme-bootstrap/tree/main/src/assets/scss/components/_skeleton.scss)

</div>

</div>
