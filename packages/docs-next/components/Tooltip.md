---
title: Tooltip
---

# Tooltip

> Display a brief helper text to your user

> <CarbonAds />

---

<a href="https://github.com/oruga-ui/oruga/edit/develop/packages/docs/../oruga-next/src/components/tooltip/examples/Tooltip.md" class="docgen-edit-link">edit on github</a>

## Examples

### Base

::: demo
<template>
<section>
<o-tooltip label="Tooltip right"
            position="right">
<o-button>
Right
</o-button>
</o-tooltip>

        <o-tooltip label="Tooltip top">
            <o-button>
                Top (default)
            </o-button>
        </o-tooltip>

        <o-tooltip label="Tooltip bottom"
            position="bottom">
            <o-button>
                Bottom
            </o-button>
        </o-tooltip>

        <o-tooltip label="Tooltip left"
            position="left">
            <o-button>
                Left
            </o-button>
        </o-tooltip>

        <o-tooltip label="delayed by 1000ms"
            :delay="1000">
            <o-button variant="warning">
                Delayed
            </o-button>
        </o-tooltip>
    </section>

</template>

<script>
    export default {
    }
</script>

:::

### Multiline

::: demo
<template>
<section>
<o-tooltip
            label="Tooltip multiline, probably because it's too long for a casual tooltip"
            multiline>
<o-button>
Multiline (default)
</o-button>
</o-tooltip>

        <o-tooltip
            label="It's not brief, but it's also not long"
            size="small"
            multiline>
            <o-button>
                Multiline (small)
            </o-button>
        </o-tooltip>

        <o-tooltip
            label="Tooltip large multiline, because it's too long to be on a medium size. Did I tell you it's really long? Yes, it is — I assure you!"
            position="bottom"
            size="large"
            multiline>
            <o-button>
                Multiline (large)
            </o-button>
        </o-tooltip>
    </section>

</template>

<script>
    export default {
    }
</script>

:::

### Slot

::: demo
<template>
<section>
<o-tooltip position="bottom" multiline>
<o-button>Html Content</o-button>
<template v-slot:content>
<b>Lorem ipsum dolor sit amet</b>, consectetur warning elit. <i>Fusce id fermentum quam</i>.
</template>
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
    export default {
    }
</script>

:::

### Toggle

::: demo
::: demote>
<section>
<o-button
@click="active = !active">
Toggle
</o-button>

        <hr>

        <o-tooltip label="I'm never closing"
            :active="active"
            always>
            <o-button>
                Always
            </o-button>
        </o-tooltip>

        <o-tooltip label="Tooltip right"
            position="right"
            :active="active">
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

:::

## Class props

📄 [Full scss file](https://github.com/oruga-ui/oruga/blob/master/packages/oruga/src/scss/components/_tooltip.scss)

<br />

<br />
<br />

## Props

| Prop name    | Description                                                                                                               | Type                | Values                                                                          | Default                                                                                                                                    |
| ------------ | ------------------------------------------------------------------------------------------------------------------------- | ------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| active       | Whether tooltip is active or not, use the .sync modifier (Vue 2.x) or v-model:active (Vue 3.x) to make it two-way binding | boolean             | -                                                                               | true                                                                                                                                       |
| always       | Tooltip will be always active                                                                                             | boolean             | -                                                                               |                                                                                                                                            |
| animated     | Tooltip will have an animation                                                                                            | boolean             | -                                                                               | true                                                                                                                                       |
| animation    | Tooltip default animation                                                                                                 | string              | -                                                                               | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> tooltip: {<br>&nbsp;&nbsp;animation: 'fade'<br>}</code>   |
| appendToBody | Append tooltip content to body                                                                                            | boolean             | -                                                                               |                                                                                                                                            |
| autoClose    | Tooltip auto close options                                                                                                | array\|boolean      | `true`, `false`, `'inside'`, `'outside'`                                        | true                                                                                                                                       |
| delay        | Tooltip delay before it appears (number in ms)                                                                            | number              | -                                                                               |                                                                                                                                            |
| label        | Tooltip text                                                                                                              | string              | -                                                                               |                                                                                                                                            |
| multiline    | Tooltip will be multilined                                                                                                | boolean             | -                                                                               |                                                                                                                                            |
| override     |                                                                                                                           | boolean             | -                                                                               |                                                                                                                                            |
| position     | Tooltip position in relation to the element                                                                               | string              | `top`, `bottom`, `left`, `right`                                                | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> tooltip: {<br>&nbsp;&nbsp;position: 'top'<br>}</code>     |
| triggers     | Tooltip trigger events                                                                                                    | array               | `hover`, `click`, `focus`, `contextmenu`                                        | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> tooltip: {<br>&nbsp;&nbsp;triggers: ['hover']<br>}</code> |
| variant      | Color of the tooltip                                                                                                      | string\|func\|array | `primary`, `info`, `success`, `warning`, `danger`, `and any other custom color` |                                                                                                                                            |

## Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| content |             |          |
| default |             |          |

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
