## Examples

### Base

::: demo
```html
<template>
    <section>
        <div class="field">
            <o-checkbox>Basic</o-checkbox>
        </div>
        <div class="field">
            <o-checkbox v-model="checkbox">
                {{ checkbox }}
            </o-checkbox>
        </div>
        <div class="field">
            <o-checkbox v-model="checkboxCustom"
                true-value="Yes"
                false-value="No">
                {{ checkboxCustom }}
            </o-checkbox>
        </div>
        <div class="field">
            <o-checkbox :indeterminate="true">
                Indeterminate
            </o-checkbox>
        </div>
        <div class="field">
            <o-checkbox disabled>Disabled</o-checkbox>
        </div>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                checkbox: false,
                checkboxCustom: 'Yes'
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
            <o-checkbox :value="true">
                Default
            </o-checkbox>
        </div>
        <div class="field">
            <o-checkbox :value="true"
            variant="primary">
                Primary
            </o-checkbox>
        </div>
        <div class="field">
            <o-checkbox :value="true"
            variant="info">
                Info
            </o-checkbox>
        </div>
        <div class="field">
            <o-checkbox :value="true"
            variant="success">
                Success
            </o-checkbox>
        </div>
        <div class="field">
            <o-checkbox :value="true"
            variant="danger">
                Danger
            </o-checkbox>
        </div>
        <div class="field">
            <o-checkbox :value="true"
            variant="warning">
                Warning
            </o-checkbox>
        </div>
    </section>
</template>

<script>
    export default {
    }
</script>
```
:::

### Array

::: demo
```html
<template>
    <section>
        <div class="block">
            <o-checkbox v-model="checkboxGroup"
                native-value="Silver">
                Silver
            </o-checkbox>
            <o-checkbox v-model="checkboxGroup"
                native-value="Flint">
                Flint
            </o-checkbox>
            <o-checkbox v-model="checkboxGroup"
                native-value="Vane">
                Vane
            </o-checkbox>
            <o-checkbox v-model="checkboxGroup"
                native-value="Billy" disabled>
                Billy
            </o-checkbox>
        </div>
        <p class="content">
            <b>Selection:</b>
            {{ checkboxGroup }}
        </p>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                checkboxGroup: ['Flint']
            }
        }
    }
</script>
```
:::
