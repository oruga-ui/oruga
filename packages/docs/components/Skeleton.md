---
title: Skeleton
---

# Skeleton

> A placeholder for content to load

---

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

    <o-skeleton
      :animated="animated"
      circle
      width="64px"
      height="64px"
    ></o-skeleton>

    <o-skeleton :animated="animated" size="large" :count="2"></o-skeleton>
  </section>
</template>

<script>
  export default {
    data() {
      return {
        animated: true
      };
    }
  };
</script>
```

:::

## Props

| Prop name        | Description | Type           | Values              | Default |
| ---------------- | ----------- | -------------- | ------------------- | ------- |
| active           |             | boolean        | -                   | true    |
| animated         |             | boolean        | -                   | true    |
| width            |             | number\|string | -                   |         |
| height           |             | number\|string | -                   |         |
| circle           |             | boolean        | -                   |         |
| rounded          |             | boolean        | -                   | true    |
| count            |             | number         | -                   | 1       |
| position         |             | string         | `centered`, `right` | ''      |
| size             |             | string         | -                   |         |
| rootClass        |             | string         | -                   |         |
| animationClass   |             | string         | -                   |         |
| positionClass    |             | string         | -                   |         |
| itemClass        |             | string         | -                   |         |
| itemRoundedClass |             | string         | -                   |         |
| sizeClass        |             | string         | -                   |         |

## Style

| CSS Variable                   | SASS Variable            | Default                                                                                     |
| ------------------------------ | ------------------------ | ------------------------------------------------------------------------------------------- |
| --oruga-skeleton-background    | \$skeleton-background    | linear-gradient(90deg, $grey-lighter 25%, rgba($grey-lighter, 0.5) 50%, \$grey-lighter 75%) |
| --oruga-skeleton-border-radius | \$skeleton-border-radius | \$base-border-radius                                                                        |
| --oruga-skeleton-duration      | \$skeleton-duration      | 1.5s                                                                                        |
| --oruga-skeleton-margin        | \$skeleton-margin        | .5rem 0 0 0                                                                                 |
