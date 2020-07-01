
## Examples

### Base

::: demo
```html
<template>
    <section>
        <o-tooltip label="Tooltip right"
            position="right">
            <o-button variant="primary">
                Right
            </o-button>
        </o-tooltip>

        <o-tooltip label="Tooltip top">
            <o-button variant="primary">
                Top (default)
            </o-button>
        </o-tooltip>

        <o-tooltip label="Tooltip bottom"
            position="bottom">
            <o-button variant="primary">
                Bottom
            </o-button>
        </o-tooltip>

        <o-tooltip label="Tooltip left"
            position="left">
            <o-button variant="primary">
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
```
:::

### Multiline

::: demo
```html
<template>
    <section>
        <b-tooltip
            label="Tooltip multilined, probably because it's too long for a casual tooltip"
            multilined>
            <o-button variant="primary">
                Multiline (default)
            </o-button>
        </b-tooltip>

        <b-tooltip
            label="It's not brief, but it's also not long"
            size="small"
            multilined>
            <o-button variant="primary">
                Multiline (small)
            </o-button>
        </b-tooltip>

        <b-tooltip
            label="Tooltip large multilined, because it's too long to be on a medium size. Did I tell you it's really long? Yes, it is — I assure you!"
            position="bottom"
            size="large"
            multilined>
            <o-button variant="primary">
                Multiline (large)
            </o-button>
        </b-tooltip>
    </section>
</template>

<script>
    export default {
    }
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