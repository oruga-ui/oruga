---
title: Skeleton
---

# Skeleton

> A placeholder for content to load

> <CarbonAds />

---

<a href="https://github.com/oruga-ui/oruga/edit/develop/packages/docs/../oruga-next/src/components/skeleton/examples/Skeleton.md" class="docgen-edit-link">edit on github</a>

## Examples

### Base

<ExampleViewer example="skeleton/base" />

## Class props

📄 [Full scss file](https://github.com/oruga-ui/oruga/blob/master/packages/oruga/src/scss/components/_skeleton.scss)

<br />

<br />
<br />

## Props

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

## Style

| CSS Variable                   | SASS Variable            | Default                                                                                     |
| ------------------------------ | ------------------------ | ------------------------------------------------------------------------------------------- |
| --oruga-skeleton-background    | \$skeleton-background    | linear-gradient(90deg, $grey-lighter 25%, rgba($grey-lighter, 0.5) 50%, \$grey-lighter 75%) |
| --oruga-skeleton-border-radius | \$skeleton-border-radius | \$base-border-radius                                                                        |
| --oruga-skeleton-duration      | \$skeleton-duration      | 1.5s                                                                                        |
| --oruga-skeleton-margin        | \$skeleton-margin        | .5rem 0 0 0                                                                                 |
