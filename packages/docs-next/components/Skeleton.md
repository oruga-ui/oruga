---
title: Skeleton
---

# Skeleton

<div class="vp-doc">

> A placeholder for content to load

<Carbon />
</div>

<div class="vp-example">

## Examples

<example-skeleton />

</div>
<div class="vp-example">

## Class props

<inspector-skeleton-viewer />

</div>

<div class="vp-doc">

## Skeleton component

```html
<o-skeleton></o-skeleton>
```

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

## Sass variables

<div class="theme-orugabase">

> Current theme ➜ _[Oruga Base](https://github.com/oruga-ui/oruga)_

| SASS Variable           | Default                                                                                    |
| ----------------------- | ------------------------------------------------------------------------------------------ |
| $skeleton-background    | linear-gradient(90deg, $grey-lighter 25%, rgba($grey-lighter, 0.5) 50%, $grey-lighter 75%) |
| $skeleton-border-radius | $base-border-radius                                                                        |
| $skeleton-duration      | 1.5s                                                                                       |
| $skeleton-margin        | .5rem 0 0 0                                                                                |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-oruga/tree/main/src/assets/scss/components/_skeleton.scss)

</div><div class="theme-orugafull">

> Current theme ➜ _[Oruga Full](https://github.com/oruga-ui/oruga)_

| SASS Variable           | Default                                                                                    |
| ----------------------- | ------------------------------------------------------------------------------------------ |
| $skeleton-background    | linear-gradient(90deg, $grey-lighter 25%, rgba($grey-lighter, 0.5) 50%, $grey-lighter 75%) |
| $skeleton-border-radius | $base-border-radius                                                                        |
| $skeleton-duration      | 1.5s                                                                                       |
| $skeleton-margin        | .5rem 0 0 0                                                                                |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-oruga/tree/main/src/assets/scss/components/_skeleton.scss)

</div><div class="theme-bulma">

> Current theme ➜ _[Bulma](https://github.com/oruga-ui/theme-bulma)_

<p> The theme does not have any custom variables for this component. </p>
</div><div class="theme-bootstrap">

> Current theme ➜ _[Bootstrap](https://github.com/oruga-ui/theme-bootstrap)_

| SASS Variable      | Default                                                                                                     |
| ------------------ | ----------------------------------------------------------------------------------------------------------- |
| $skeleton-bg-color | $dark-bg-subtle                                                                                             |
| $skeleton-bg       | linear-gradient( 90deg, $skeleton-bg-color 25%,  rgba($skeleton-bg-color, 0.5) 50%, $skeleton-bg-color 75%) |
| $skeleton-duration | 1.5s                                                                                                        |
| $skeleton-margin   | 0.5rem 0 0 0                                                                                                |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-bootstrap/tree/main/src/assets/scss/components/_skeleton.scss)

</div>

</div>
