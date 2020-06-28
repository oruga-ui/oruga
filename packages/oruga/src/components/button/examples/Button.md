## Examples

### Base

::: demo
```html
<template>
    <section>
        <o-button @click="clickMe">Click Me</o-button>
    </section>
</template>

<script>
    export default {
        methods: {
            clickMe() {
                alert('Clicked!')
            }
        }
    }
</script>
```
:::

### States and Styles

::: demo
```html
<template>
    <section>

        <div class="buttons">
            <o-button variant="primary">Primary</o-button>
            <o-button variant="success">Success</o-button>
            <o-button variant="danger">Danger</o-button>
            <o-button variant="warning">Warning</o-button>
            <o-button variant="info">Info</o-button>
        </div>

        <div class="buttons">
            <o-button>Normal</o-button>
            <o-button disabled>Disabled</o-button>
            <o-button rounded>Rounded</o-button>
        </div>

        <div class="buttons">
            <o-button variant="primary" outlined>Outlined</o-button>
            <o-button variant="primary" inverted>Inverted</o-button>
        </div>

    </section>
</template>

<script>
    export default {
    }
</script>
```
:::

### Icons

::: demo
```html
<template>
    <section>
        <div class="buttons">
            <o-button size="small"
                icon-left="plus">
                Add
            </o-button>

            <o-button icon-left="plus">
                Add
            </o-button>

            <o-button size="medium"
                icon-left="plus">
                Add
            </o-button>

            <o-button size="large"
                icon-left="plus">
                Add
            </o-button>
        </div>

        <div class="buttons">
            <o-button variant="danger"
                icon-left="trash">
                Delete
            </o-button>

            <o-button variant="danger"
                icon-right="trash">
                Delete
            </o-button>

            <o-button variant="danger"
                icon-right="trash" />
        </div>

    </section>
</template>

<script>
    export default {
    }
</script>
```
:::

### Tags

::: demo
```html
<template>
    <section>
        <div class="buttons">
            <o-button>Button</o-button>

            <o-button tag="a"
                href="https://oruga.io"
                target="_blank">
                Anchor
            </o-button>

            <o-button tag="input"
                native-type="submit"
                value="Submit input" />

            <o-button tag="router-link"
                to="/home"
                variant="info">
                Docs
            </o-button>
        </div>
    </section>
</template>

<script>
    export default {
    }
</script>
```
:::
