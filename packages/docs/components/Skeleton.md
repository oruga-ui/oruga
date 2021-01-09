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

## Class props

<br />
<template>
  <div class="field">
    <doc-wrapper>
      <template v-slot:default="s">
        <o-skeleton v-bind="s" width="264px" :count="2"></o-skeleton>
      </template>
    </doc-wrapper>
    <inspector :inspectData="inspectData"></inspector>
  </div>
</template>

<script>

export default {
  data() {
    return {
      inspectData: [
        {
          class: 'rootClass',
          description : 'Class of the root element'
        },
        {
          class: 'animationClass',
          description : 'Class of the skeleton animation',

          action: (cmp) => {
            cmp.data.animated = true;
          }
        },
        {
          class: 'positionClass',
          description : 'Class of the skeleton position',
          properties: ['position'],
          suffixes: ['left', 'centered', 'right'],
          action: (cmp) => {
            cmp.data.position = 'centered';
          }
        },
        {
          class: 'itemClass',
          description : 'Class of the skeleton item'
        },
        {
          class: 'itemRoundedClass',
          description : 'Class of the skeleton item rounded',
          properties: ['rounded'],
          action: (cmp) => {
            cmp.data.rounded = true;
          }
        },
        {
          class: 'sizeClass',
          description : 'Class of the skeleton size',
          properties: ['size'],
          suffixes: ['small', 'medium', 'large'],
          action: (cmp) => {
            cmp.data.size = 'large';
          }
        }
      ]
    }
  }
}
</script>

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
