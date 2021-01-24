## Examples

### Base

::: demo
```html
<template>
    <section>
        <div class="block">
            <o-radio v-model="radio"
                name="name"
                native-value="Flint">
                Flint
            </o-radio>
            <o-radio v-model="radio"
                name="name"
                native-value="Silver">
                Silver
            </o-radio>
            <o-radio v-model="radio"
                name="name"
                native-value="Jack">
                Jack
            </o-radio>
            <o-radio v-model="radio"
                name="name"
                native-value="Vane"
                disabled>
                Vane
            </o-radio>
        </div>
        <p class="content">
            <b>Selection:</b>
            {{ radio }}
        </p>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                radio: 'Jack'
            }
        }
    }
</script>
```
:::

### Variants

::: demo
```html
<template>
    <section>
        <div class="field">
            <o-radio v-model="radio"
                native-value="default">
                Default
            </o-radio>
        </div>
        <div class="field">
            <o-radio v-model="radio"
                native-value="info"
                variant="info">
                Info
            </o-radio>
        </div>
        <div class="field">
            <o-radio v-model="radio"
                native-value="success"
                variant="success">
                Success
            </o-radio>
        </div>
        <div class="field">
            <o-radio v-model="radio"
                native-value="danger"
                variant="danger">
                Danger
            </o-radio>
        </div>
        <div class="field">
            <o-radio v-model="radio"
                native-value="warning"
                variant="warning">
                Warning
            </o-radio>
        </div>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                radio: 'default'
            }
        }
    }
</script>
```
:::
