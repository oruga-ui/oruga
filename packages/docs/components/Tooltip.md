---
title: Tooltip
---

# Tooltip

> Display a brief helper text to your user

---

## Examples

### Base

::: demo

```html
<template>
  <section>
    <o-tooltip label="Tooltip right" position="right">
      <o-button variant="primary">
        Right
      </o-button>
    </o-tooltip>

    <o-tooltip label="Tooltip top">
      <o-button variant="primary">
        Top (default)
      </o-button>
    </o-tooltip>

    <o-tooltip label="Tooltip bottom" position="bottom">
      <o-button variant="primary">
        Bottom
      </o-button>
    </o-tooltip>

    <o-tooltip label="Tooltip left" position="left">
      <o-button variant="primary">
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
  export default {};
</script>
```

:::

### Multiline

::: demo

```html
<template>
  <section>
    <b-tooltip
      label="Tooltip multilined, probably because it's too long for a casual tooltip"
      multilined
    >
      <o-button variant="primary">
        Multiline (default)
      </o-button>
    </b-tooltip>

    <b-tooltip
      label="It's not brief, but it's also not long"
      size="small"
      multilined
    >
      <o-button variant="primary">
        Multiline (small)
      </o-button>
    </b-tooltip>

    <b-tooltip
      label="Tooltip large multilined, because it's too long to be on a medium size. Did I tell you it's really long? Yes, it is — I assure you!"
      position="bottom"
      size="large"
      multilined
    >
      <o-button variant="primary">
        Multiline (large)
      </o-button>
    </b-tooltip>
  </section>
</template>

<script>
  export default {};
</script>
```

:::

### Slot

::: demo

```html
<template>
    <section>
        <b-tooltip position="bottom" multilined>
            <o-o-button variant="primary">Html Content</o-button>
            <template v-slot:content>
                <b>Lorem ipsum dolor sit amet</b>, consectetur warning elit. <i>Fusce id fermentum quam</i>.
            </template>
        </b-tooltip>

        <b-tooltip variant="primary" :triggers="['click']" :auto-close="['outside', 'escape']">
            <template v-slot:content>
                <o-icon icon="heart" variant="danger"></o-icon>
                <o-icon icon="thumb-up" variant="info"></o-icon>
                <o-icon icon="thumb-down" variant="warning"></o-icon>
                <o-icon icon="emoticon-cool"></o-icon>
            </template>
            <o-o-button variant="primary">Action</o-button>
        </b-tooltip>
    </section>
</template>

<script>
    export default {
    }
</script>
```

:::

### Toggle

::: demo

```html
<template>
    <section>
        <o-button variant="primary"
            @click="active = !active">
            Toggle
        </o-button>

        <hr>

        <b-tooltip label="I'm never closing"
            :active="active"
            always>
            <o-butto>
                Always
            </o-button>
        </b-tooltip>

        <b-tooltip label="Tooltip right"
            position="right"
            :active="active">
            <o-button variant="primary">
                Right
            </o-button>
        </b-tooltip>
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

| Prop name      | Description | Type           | Values                           | Default                                                                                                                                                                                                                   |
| -------------- | ----------- | -------------- | -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| active         |             | boolean        | -                                | true                                                                                                                                                                                                                      |
| label          |             | string         | -                                |                                                                                                                                                                                                                           |
| delay          |             | number         | -                                |                                                                                                                                                                                                                           |
| position       |             | string         | `top`, `bottom`, `left`, `right` | 'top'                                                                                                                                                                                                                     |
| triggers       |             | array          | -                                | ['hover']                                                                                                                                                                                                                 |
| always         |             | boolean        | -                                |                                                                                                                                                                                                                           |
| animated       |             | boolean        | -                                | true                                                                                                                                                                                                                      |
| animation      |             | string         | -                                | 'fade'                                                                                                                                                                                                                    |
| autoClose      |             | array\|boolean | -                                | true                                                                                                                                                                                                                      |
| multiline      |             | boolean        | -                                |                                                                                                                                                                                                                           |
| appendToBody   |             | boolean        | -                                |                                                                                                                                                                                                                           |
| variant        |             | string         | -                                |                                                                                                                                                                                                                           |
| rootClass      |             | string         | -                                | () => {<br> const override = getValueByPath(config, 'tooltip.override', false)<br> const clazz = getValueByPath(config, 'tooltip.rootClass', '')<br> return getCssClass(clazz, override, 'o-tooltip')<br>}                |
| contentClass   |             | string         | -                                | () => {<br> const override = getValueByPath(config, 'tooltip.override', false)<br> const clazz = getValueByPath(config, 'tooltip.contentClass', '')<br> return getCssClass(clazz, override, 'o-tooltip-content')<br>}     |
| triggerClass   |             | string         | -                                | () => {<br> const override = getValueByPath(config, 'tooltip.override', false)<br> const clazz = getValueByPath(config, 'tooltip.triggerClass', '')<br> return getCssClass(clazz, override, 'o-tooltip-trigger')<br>}     |
| multilineClass |             | string         | -                                | () => {<br> const override = getValueByPath(config, 'tooltip.override', false)<br> const clazz = getValueByPath(config, 'tooltip.multilineClass', '')<br> return getCssClass(clazz, override, 'o-tooltip-multiline')<br>} |
| alwaysClass    |             | string         | -                                | () => {<br> const override = getValueByPath(config, 'tooltip.override', false)<br> const clazz = getValueByPath(config, 'tooltip.alwaysClass', '')<br> return getCssClass(clazz, override, 'o-tooltip-always')<br>}       |

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
| --oruga-tooltip-background-color        | \$tooltip-background-color        | #000000                            |
| --oruga-tooltip-color                   | \$tooltip-color                   | #ffffff                            |
| --oruga-tooltip-content-box-shadow      | \$tooltip-content-box-shadow      | 0px 1px 2px 1px rgba(0, 1, 0, 0.2) |
| --oruga-tooltip-content-font-size       | \$tooltip-content-font-size       | 0.85rem                            |
| --oruga-tooltip-content-max-width       | \$tooltip-content-max-width       | 300px                              |
| --oruga-tooltip-content-multiline-width | \$tooltip-content-multiline-width | 300px                              |
| --oruga-tooltip-content-padding         | \$tooltip-content-padding         | 0.35rem 0.75rem                    |
| --oruga-tooltip-content-radius-large    | \$tooltip-content-radius-large    | 6px                                |
| --oruga-tooltip-content-weight-normal   | \$tooltip-content-weight-normal   | 400                                |
| --oruga-tooltip-content-zindex          | \$tooltip-content-zindex          | 38                                 |
