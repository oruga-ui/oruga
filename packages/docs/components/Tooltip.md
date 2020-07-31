---
title: Tooltip
---

# Tooltip

> Display a brief helper text to your user

---

<a href="https://github.com/oruga-ui/oruga/edit/develop/packages/docs/..\oruga\src\components\tooltip\examples\Tooltip.md" class="docgen-edit-link">edit on github</a>

## Examples

### Base

::: demo

```html
<template>
  <section>
    <o-tooltip label="Tooltip right" position="right">
      <o-button>
        Right
      </o-button>
    </o-tooltip>

    <o-tooltip label="Tooltip top">
      <o-button>
        Top (default)
      </o-button>
    </o-tooltip>

    <o-tooltip label="Tooltip bottom" position="bottom">
      <o-button>
        Bottom
      </o-button>
    </o-tooltip>

    <o-tooltip label="Tooltip left" position="left">
      <o-button>
        Left
      </o-button>
    </o-tooltip>

    <o-tooltip label="delayed by 1000ms" :delay="1000">
      <o-button variant="warning">
        Delayed
      </o-button>
    </o-tooltip>
  </section>
</template>

<script>
  export default {}
</script>
```

:::

### Multiline

::: demo

```html
<template>
  <section>
    <o-tooltip label="Tooltip multiline, probably because it's too long for a casual tooltip" multiline>
      <o-button>
        Multiline (default)
      </o-button>
    </o-tooltip>

    <o-tooltip label="It's not brief, but it's also not long" size="small" multiline>
      <o-button>
        Multiline (small)
      </o-button>
    </o-tooltip>

    <o-tooltip
      label="Tooltip large multiline, because it's too long to be on a medium size. Did I tell you it's really long? Yes, it is — I assure you!"
      position="bottom"
      size="large"
      multiline
    >
      <o-button>
        Multiline (large)
      </o-button>
    </o-tooltip>
  </section>
</template>

<script>
  export default {}
</script>
```

:::

### Slot

::: demo

```html
<template>
  <section>
    <o-tooltip position="bottom" multiline>
      <o-button>Html Content</o-button>
      <template v-slot:content> <b>Lorem ipsum dolor sit amet</b>, consectetur warning elit. <i>Fusce id fermentum quam</i>. </template>
    </o-tooltip>

    <o-tooltip variant="primary" :triggers="['click']" :auto-close="['outside', 'escape']">
      <template v-slot:content>
        <o-icon icon="heart" variant="danger"></o-icon>
        <o-icon icon="thumbs-up" variant="info"></o-icon>
        <o-icon icon="thumbs-down" variant="warning"></o-icon>
        <o-icon icon="smile-beam"></o-icon>
      </template>
      <o-button>Action</o-button>
    </o-tooltip>
  </section>
</template>

<script>
  export default {}
</script>
```

:::

### Toggle

::: demo

```html
<template>
  <section>
    <o-button @click="active = !active">
      Toggle
    </o-button>

    <hr />

    <o-tooltip label="I'm never closing" :active="active" always>
      <o-button>
        Always
      </o-button>
    </o-tooltip>

    <o-tooltip label="Tooltip right" position="right" :active="active">
      <o-button>
        Right
      </o-button>
    </o-tooltip>
  </section>
</template>

<script>
  export default {
    data() {
      return {
        active: true
      }
    }
  }
</script>
```

:::

## Props

| Prop name      | Description                                    | Type           | Values                                                                          | Default                                               |
| -------------- | ---------------------------------------------- | -------------- | ------------------------------------------------------------------------------- | ----------------------------------------------------- |
| active         | Whether tooltip is active or not               | boolean        | -                                                                               | true                                                  |
| label          | Tooltip text                                   | string         | -                                                                               |                                                       |
| delay          | Tooltip delay before it appears (number in ms) | number         | -                                                                               |                                                       |
| position       | Tooltip position in relation to the element    | string         | `top`, `bottom`, `left`, `right`                                                | Config -> <code> 'tooltip.position': 'top'</code>     |
| triggers       | Tooltip trigger events                         | array          | `hover`, `click`, `focus`                                                       | Config -> <code> 'tooltip.triggers': ['hover']</code> |
| always         | Tooltip will be always active                  | boolean        | -                                                                               |                                                       |
| animated       | Tooltip will have an animation                 | boolean        | -                                                                               | true                                                  |
| animation      | Tooltip default animation                      | string         | -                                                                               | Config -> <code> 'tooltip.animation': 'fade'</code>   |
| autoClose      | Tooltip auto close options                     | array\|boolean | `true`, `false`, `'inside'`, `'outside'`                                        | true                                                  |
| multiline      | Tooltip will be multilined                     | boolean        | -                                                                               |                                                       |
| appendToBody   | Append tooltip content to body                 | boolean        | -                                                                               |                                                       |
| variant        | Color of the tooltip                           | string         | `primary`, `info`, `success`, `warning`, `danger`, `and any other custom color` |                                                       |
| rootClass      |                                                | string         | -                                                                               |                                                       |
| contentClass   |                                                | string         | -                                                                               |                                                       |
| triggerClass   |                                                | string         | -                                                                               |                                                       |
| multilineClass |                                                | string         | -                                                                               |                                                       |
| alwaysClass    |                                                | string         | -                                                                               |                                                       |
| variantClass   |                                                | string         | -                                                                               |                                                       |

## Slots

| Name    | Description | Bindings                             |
| ------- | ----------- | ------------------------------------ |
| content |             |                                      |
| default |             | [<br> {<br> "name": "ref"<br> }<br>] |

## Style

| CSS Variable                            | SASS Variable                     | Default                            |
| --------------------------------------- | --------------------------------- | ---------------------------------- |
| --oruga-tooltip-arrow-margin            | \$tooltip-arrow-margin            | 2px                                |
| --oruga-tooltip-arrow-size              | \$tooltip-arrow-size              | 5px                                |
| --oruga-tooltip-background-color        | \$tooltip-background-color        | \$primary                          |
| --oruga-tooltip-color                   | \$tooltip-color                   | \$primary-invert                   |
| --oruga-tooltip-content-box-shadow      | \$tooltip-content-box-shadow      | 0px 1px 2px 1px rgba(0, 1, 0, 0.2) |
| --oruga-tooltip-content-font-size       | \$tooltip-content-font-size       | 0.85rem                            |
| --oruga-tooltip-content-max-width       | \$tooltip-content-max-width       | 300px                              |
| --oruga-tooltip-content-multiline-width | \$tooltip-content-multiline-width | 300px                              |
| --oruga-tooltip-content-padding         | \$tooltip-content-padding         | 0.35rem 0.75rem                    |
| --oruga-tooltip-content-radius-large    | \$tooltip-content-radius-large    | 6px                                |
| --oruga-tooltip-content-weight-normal   | \$tooltip-content-weight-normal   | 400                                |
| --oruga-tooltip-content-zindex          | \$tooltip-content-zindex          | 38                                 |
