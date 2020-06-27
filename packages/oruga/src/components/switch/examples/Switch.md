## Examples

### Base

::: demo
```html
<template>
    <section>
        <o-field>
            <o-switch>Default</o-switch>
        </o-field>
        <o-field>
            <o-switch v-model="isSwitched">
                {{ isSwitched }}
            </o-switch>
        </o-field>
        <o-field>
            <o-switch v-model="isSwitchedCustom"
                true-value="Yes"
                false-value="No">
                {{ isSwitchedCustom }}
            </o-switch>
        </o-field>
        <o-field>
            <o-switch disabled>Disabled</o-switch>
        </o-field>
    </section>
</template>

<script>
export default {
    data() {
        return {
            isSwitched: false,
            isSwitchedCustom: 'Yes'
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
        <o-field>
            <o-switch :value="true">
                Default
            </o-switch>
        </o-field>
        <o-field>
            <o-switch :value="true"
            variant="info">
                Info
            </o-switch>
        </o-field>
        <o-field>
            <o-switch :value="true"
            variant="success">
                Success
            </o-switch>
        </o-field>
        <o-field>
            <o-switch :value="true"
            variant="danger">
                Danger
            </o-switch>
        </o-field>
        <o-field>
            <o-switch :value="true"
            variant="warning">
                Warning
            </o-switch>
        </o-field>
    </section>
</template>

<script>
export default {
}
</script>
```
:::

### Sizes

::: demo
```html
<template>
    <section>
        <o-field>
            <o-switch size="small">Small</o-switch>
        </o-field>
        <o-field>
            <o-switch>Default</o-switch>
        </o-field>
        <o-field>
            <o-switch size="medium">Medium</o-switch>
        </o-field>
        <o-field>
            <o-switch size="large">Large</o-switch>
        </o-field>
    </section>
</template>

<script>
export default {
}
</script>
```
:::

### Style variants

::: demo
```html
<template>
    <section>
        <o-field grouped>
            <o-switch v-model="isRounded">Rounded</o-switch>
            <o-switch v-model="isOutlined">Outlined</o-switch>
        </o-field>
        <o-field label="Variant">
            <o-select expanded v-model="variant" placeholder="Variant">
                <option value="null">Default</option>
                <option value="primary">Primary</option>
                <option value="success">Success</option>
                <option value="warning">Warning</option>
                <option value="danger">Danger</option>
            </o-select>
        </o-field>
        <o-field label="Passive Variant">
            <o-select expanded v-model="passive" placeholder="Passive Variant">
                <option value="null">Default</option>
                <option value="primary">Primary</option>
                <option value="success">Success</option>
                <option value="warning">Warning</option>
                <option value="danger">Danger</option>
            </o-select>
        </o-field>
        <o-field label="Size">
            <o-select expanded v-model="size">
                <option value="">Default</option>
                <option value="small">small</option>
                <option value="medium">medium</option>
                <option value="large">large</option>
            </o-select>
        </o-field>
        <o-switch
            :rounded="isRounded"
            :outlined="isOutlined"
            :size="size"
            :variant="variant"
            :passive-variant="passive">Sample</o-switch>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                size: '',
                variant: null,
                passive: null,
                isRounded: false,
                isOutlined: false,
            }
        }
    }
</script>
```
:::