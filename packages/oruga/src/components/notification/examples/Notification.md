## Examples

### Programmatically opening

Go to [Notification Notice](#notification-notice) section to see all the available options.

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
            <hr/>
            <o-button
                label="Launch toast"
                size="medium"
                @click="toast" />
            <o-button
                label="Launch toast (queued)"
                variant="success"
                size="medium"
                @click="queueToast" />
            <hr/>
            <o-button
                label="Launch notification (custom)"
                variant="danger"
                size="medium"
                @click="danger" />
            <o-button
                label="Launch notification (component)"
                variant="warning"
                size="medium"
                @click="component" />
            <hr/>
            <o-button 
                label="Launch with promise"
                size="medium"
                @click="promise" />
            <o-button
                label="Launch indefinite"
                size="medium"
                @click="indefinite" />
            <o-button
                label="Close all open"
                size="medium"
                @click="closeAll" />
        </div>
    </section>
</template>

<script>
    const NotificationForm = {
        props: ['email', 'password'],
        template: `
                <form action="">
                    <div class="modal-card" style="width: auto">
                        <header class="modal-card-head">
                            <p class="modal-card-title">Login</p>
                        </header>
                        <section class="modal-card-body">
                            <o-field label="Email">
                                <o-input
                                    type="email"
                                    :value="email"
                                    placeholder="Your email"
                                    required>
                                </o-input>
                            </o-field>

                            <o-field label="Password">
                                <o-input
                                    type="password"
                                    :value="password"
                                    password-reveal
                                    placeholder="Your password"
                                    required>
                                </o-input>
                            </o-field>

                            <o-field>
                                <o-checkbox>Remember me</o-checkbox>
                            </o-field>
                        </section>
                        <footer class="modal-card-foot">
                            <o-button type="button" @click="$emit('close')">Close</o-button>
                            <o-button variant="primary">Login</o-button>
                        </footer>
                    </div>
                </form>
            `
    }
    export default {
        methods: {
            simple() {
                this.$oruga.notification.open('Something happened')
            },
            success() {
                this.$oruga.notification.open({
                    message: 'Something happened correctly!',
                    variant: 'success',
                    closable: true
                })
            },
            toast() {
                this.$oruga.notification.open({
                    message: 'Something happened correctly!',
                    rootClass: 'toast-notification',
                    position: 'top'
                })
            },
            queueToast() {
                this.$oruga.notification.open({
                    message: 'Something happened correctly!',
                    rootClass: 'toast-notification',
                    position: 'top',
                    queue: true
                })
            },
            danger() {
                const notif = this.$oruga.notification.open({
                    duration: 5000,
                    message: `Something's not good, also I'm on <b>bottom</b>`,
                    position: 'bottom-right',
                    variant: 'danger',
                    closable: true,
                    onClose: () => {
                        this.$oruga.notification.open('Custom notification closed!')
                    }
                })
            },
            component() {
                this.$oruga.notification.open({
                    // parent is only for Vue2. in Vue 3 omit this option
                    parent: this,
                    component: NotificationForm,
                    position: 'bottom-right',
                    variant: 'warning',
                    indefinite: true
                })
            },
            async promise() {
                const instance = this.$oruga.notification.open({
                    message: 'Notification with promise response. The promise returns how the notification was closed. (value from $emit(\'close\', value)',
                    position: 'top',
                    variant: 'info',
                    duration: 5000,
                    closable: true
                })

                // Note utilizing the promise requires Promise be supported by the browser
                // If you are running Vue 2 on IE 11 this will not be the case unless you 
                // add a polyfill in your build.
                const ret = await instance.promise;

                this.$oruga.notification.open({
                    message: 'Notification was resolved with ' + JSON.stringify(ret),
                    position: 'top',
                    variant: 'success',
                    duration: 2000,
                })
            },
            indefinite() {
                this.$oruga.notification.open({
                    message: 'Indefinite sticky notification',
                    closable: true,
                    indefinite: true
                })
            },
            closeAll() {
                // any parameter here is passed to the onClose handler and resolved to the promise
                // for each open notification
                this.$oruga.notification.closeAll({action: 'closeAll'});
            }
        }
    }
</script>
<style>
.toast-notification {
    margin: .5em 0;
    text-align: center;
    box-shadow: 0 1px 4px rgb(0 0 0 / 12%), 0 0 6px rgb(0 0 0 / 4%);
    border-radius: 2em;
    padding: .75em 1.5em;
    pointer-events: auto;
    color: rgba(0,0,0,.7);
    background: #ffdd57;
}
</style>
```
:::

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

### Use types

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

### Add custom buttons

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
