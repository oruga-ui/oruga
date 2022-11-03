## Examples

### Base

::: demo
```html
<template>
    <section>
        <o-field>
            <o-button size="medium" variant="primary" @click="openLoading">
                Launch loading
            </o-button>
        </o-field>
        <o-field>
            <o-switch v-model="isFullPage">Display loader over full page</o-switch>
        </o-field>
        <p style="position: relative">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id fermentum quam. Proin sagittis, nibh id hendrerit imperdiet, elit sapien laoreet elit
            <o-loading :full-page="isFullPage" :active.sync="isLoading" :can-cancel="true"></o-loading>
        </p>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                isLoading: false,
                isFullPage: true
            }
        },
        methods: {
            openLoading() {
                this.isLoading = true
                setTimeout(() => {
                    this.isLoading = false
                }, 10 * 1000)
            }
        }
    }
</script>
```
:::

### Slot

::: demo
```html
<template>
    <section>
        <o-field>
            <o-button size="medium" variant="primary" @click="openLoading">
                Launch loading
            </o-button>
        </o-field>
        <o-field>
            <o-switch v-model="isFullPage">Display loader over full page</o-switch>
        </o-field>
        <p style="position: relative">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id fermentum quam. Proin sagittis, nibh id hendrerit imperdiet, elit sapien laoreet elit
            <o-loading :full-page="isFullPage" :active.sync="isLoading" :can-cancel="true">
                <o-icon
                    pack="fas"
                    icon="sync-alt"
                    size="large"
                    spin>
                </o-icon>
            </o-loading>
        </p>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                isLoading: false,
                isFullPage: true
            }
        },
        methods: {
            openLoading() {
                this.isLoading = true
                setTimeout(() => {
                    this.isLoading = false
                }, 10 * 1000)
            }
        }
    }
</script>
```
:::

### Programmatically

::: demo
```html
<template>
    <div>
        <o-field>
            <o-button size="medium" variant="primary" @click="openLoading">
                Launch loading
            </o-button>
        </o-field>
        <o-field>
            <o-switch v-model="isFullPage">Display loader over full page</o-switch>
        </o-field>
        <p style="position: relative" ref="element">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id fermentum quam. Proin sagittis, nibh id hendrerit imperdiet, elit sapien laoreet elit
        </p>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                isFullPage: true,
            }
        },
        methods: {
            openLoading() {
                const loadingComponent = this.$oruga.loading.open({
                    fullPage: this.isFullPage,
                    container: this.isFullPage ? null : this.$refs.element
                })
                setTimeout(() => loadingComponent.close(), 3 * 1000)
            }
        }
    }
</script>
```
:::

### Programmatically (with promise)

::: demo
```html
<template>
    <div>
        <o-field>
            <div class="buttons">
                <o-button size="medium" variant="primary" @click="openLoading">
                    Launch loading
                </o-button>
                <o-button size="medium" variant="primary" @click="openLoadingCloseAll">
                    Launch loading (closeAll)
                </o-button>
            </div>
        </o-field>
        <o-field>
            <o-switch v-model="isFullPage">Display loader over full page</o-switch>
        </o-field>
        <p style="position: relative" ref="element">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id fermentum quam. Proin sagittis, nibh id hendrerit imperdiet, elit sapien laoreet elit
        </p>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                isFullPage: true,
            }
        },
        methods: {
            async openLoading() {
                const loadingComponent = this.$oruga.loading.open({
                    fullPage: this.isFullPage,
                    container: this.isFullPage ? null : this.$refs.element,
                    canCancel: true,
                })
                setTimeout(() => loadingComponent.close({action:'cancel', method: 'timeout'}), 3 * 1000)
                // Note utilizing the promise requires Promise be supported by the browser
                // If you are running Vue 2 on IE 11 this will not be the case unless you 
                // add a polyfill in your build.
                const ret = await loadingComponent.promise
                this.$oruga.notification.open({
                    duration: 2000,
                    message: 'Loading returned ' + JSON.stringify(ret),
                    variant: 'info',
                    position: 'top',
                })
            },
            async openLoadingCloseAll() {
                const loadingComponent = this.$oruga.loading.open({
                    fullPage: this.isFullPage,
                    container: this.isFullPage ? null : this.$refs.element,
                    canCancel: true,
                })
                setTimeout(() => this.$oruga.loading.closeAll({action:'cancel', method: 'closeAll'}), 3 * 1000)
                // Note utilizing the promise requires Promise be supported by the browser
                // If you are running Vue 2 on IE 11 this will not be the case unless you 
                // add a polyfill in your build.
                const ret = await loadingComponent.promise
                this.$oruga.notification.open({
                    duration: 2000,
                    message: 'Loading returned ' + JSON.stringify(ret),
                    variant: 'info',
                    position: 'top',
                })
            },
        }
    }
</script>
```
:::
