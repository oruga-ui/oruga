## Examples

### Base

::: demo
```html
<template>
    <section>
        <o-notification closable aria-close-label="Close notification">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id fermentum quam. Proin sagittis, nibh id hendrerit imperdiet, elit sapien laoreet elit
        </o-notification>
        <o-notification closable variant="info" aria-close-label="Close notification">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id fermentum quam. Proin sagittis, nibh id hendrerit imperdiet, elit sapien laoreet elit
        </o-notification>
        <o-notification closable variant="success" aria-close-label="Close notification">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id fermentum quam. Proin sagittis, nibh id hendrerit imperdiet, elit sapien laoreet elit
        </o-notification>
        <o-notification
            closable
            variant="warning"
            aria-close-label="Close notification"
            role="alert">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id fermentum quam. Proin sagittis, nibh id hendrerit imperdiet, elit sapien laoreet elit
        </o-notification>
        <o-notification
            closable
            variant="danger"
            aria-close-label="Close notification"
            role="alert">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id fermentum quam. Proin sagittis, nibh id hendrerit imperdiet, elit sapien laoreet elit
        </o-notification>
    </section>
</template>
<script>
    export default {
    }
</script>
```
:::

### Use icons

::: demo
```html
<template>
    <section>
        <o-notification
            closable
            type="info"
            variant="info"
            aria-close-label="Close notification">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id fermentum quam. Proin sagittis, nibh id hendrerit imperdiet, elit sapien laoreet elit
        </o-notification>
    </section>
</template>
<script>
    export default {
    }
</script>
```
:::

### Use buttons

::: demo
```html
<template>
    <section>
        <o-notification aria-close-label="Close notification" v-slot="{closeNotification}">
            <div class="notification-content">
                <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id fermentum quam. Proin sagittis, nibh id hendrerit imperdiet, elit sapien laoreet elit</span>
                <o-button
                    label="Cancel"
                    size="small"
                    @click="closeNotification"/>
            </div>
        </o-notification>
    </section>
</template>
<script>
    export default {
    }
</script>
<style>
    .notification-content {
        display: flex;
    }
</style>
```
:::

### Programmatically opening

::: demo
```html
<template>
    <section>
        <div class="buttons">
            <o-button
                label="Launch notification (default)"
                size="medium"
                @click="simple" />
            <o-button
                label="Launch notification (custom)"
                variant="success"
                size="medium"
                @click="success" />
            <o-button
                label="Launch notification (custom)"
                variant="danger"
                size="medium"
                @click="danger" />
        </div>
    </section>
</template>

<script>
    export default {
        methods: {
            simple() {
                this.$oruga.notification.open('Something happened')
            },
            success() {
                this.$oruga.notification.open({
                    message: 'Something happened correctly!',
                    type: 'is-success',
                    variant: 'success',
                    closable: true
                })
            },
            danger() {
                const notif = this.$oruga.notification.open({
                    duration: 5000,
                    message: `Something's not good, also I'm on <b>bottom</b>`,
                    position: 'bottom-right',
                    type: "danger",
                    variant: 'danger',
                    closable: true
                })
                notif.$on('close', () => {
                    this.$oruga.notification.open('Custom notification closed!')
                })
            }
        }
    }
</script>
```
:::
