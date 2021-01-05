---
title: Skeleton
---

# Skeleton

> A placeholder for content to load

---

<a href="https://github.com/oruga-ui/oruga/edit/develop/packages/docs/../oruga/src/components/skeleton/examples/Skeleton.md" class="docgen-edit-link">edit on github</a>

## Examples

### Base

::: demo

```html
<template>
  <section>
    <o-field grouped group-multiline>
      <o-switch v-model="animated">Animated</o-switch>
    </o-field>

    <o-skeleton width="20%" :animated="animated"></o-skeleton>

    <o-skeleton width="40%" :animated="animated"></o-skeleton>

    <o-skeleton width="80%" :animated="animated"></o-skeleton>

    <o-skeleton :animated="animated"></o-skeleton>

    <o-skeleton :animated="animated" circle width="64px" height="64px"></o-skeleton>

    <o-skeleton :animated="animated" size="large" :count="2"></o-skeleton>
  </section>
</template>

<script>
  export default {
    data() {
      return {
        animated: true
      }
    }
  }
</script>
```

:::

## Props

| Prop name | Description                                  | Type           | Values                      | Default |
| --------- | -------------------------------------------- | -------------- | --------------------------- | ------- |
| active    | Show or hide loader                          | boolean        | -                           | true    |
| animated  | Show a loading animation                     | boolean        | -                           | true    |
| circle    | Show a circle shape                          | boolean        | -                           |         |
| count     | Number of shapes to display                  | number         | -                           | 1       |
| height    | Custom height                                | number\|string | -                           |         |
| position  | Skeleton position in relation to the element | string         | `left`, `centered`, `right` | ''      |
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
