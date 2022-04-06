---
title: Loading
---

# Loading

> A simple loading overlay

> <CarbonAds />

---

<a href="https://github.com/oruga-ui/oruga/edit/develop/packages/docs/../oruga-next/src/components/loading/examples/Loading.md" class="docgen-edit-link">edit on github</a>

## Examples

### Base

::: demo
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

:::

### Slot

::: demo
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

:::

### Programmatically

::: demo
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

:::

## Class props

📄 [Full scss file](https://github.com/oruga-ui/oruga/blob/master/packages/oruga/src/scss/components/_loading.scss)

<br />

<br />
<br />

## Props

| Prop name    | Description                                                                                                             | Type                      | Values | Default                                                                                                                                  |
| ------------ | ----------------------------------------------------------------------------------------------------------------------- | ------------------------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| active       | Whether modal is active or not, use the .sync modifier (Vue 2.x) or v-model:active (Vue 3.x) to make it two-way binding | boolean                   | -      |                                                                                                                                          |
| animation    |                                                                                                                         | string                    | -      | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> loading: {<br>&nbsp;&nbsp;animation: 'fade'<br>}</code> |
| canCancel    | Can close Loading by pressing escape or clicking outside                                                                | boolean                   | -      | false                                                                                                                                    |
| container    |                                                                                                                         | object\|func\|HTMLElement | -      |                                                                                                                                          |
| fullPage     | Loader will overlay the full page                                                                                       | boolean                   | -      | true                                                                                                                                     |
| icon         | Icon name                                                                                                               | string                    | -      | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> loading: {<br>&nbsp;&nbsp;icon: 'loading'<br>}</code>   |
| iconSize     |                                                                                                                         | string                    | -      | 'medium'                                                                                                                                 |
| iconSpin     | Enable spin effect on icon                                                                                              | boolean                   | -      | true                                                                                                                                     |
| onCancel     | Callback function to call after user canceled (pressed escape / clicked outside)                                        | func                      | -      | Default function (see source code)                                                                                                       |
| override     |                                                                                                                         | boolean                   | -      |                                                                                                                                          |
| programmatic |                                                                                                                         | boolean                   | -      |                                                                                                                                          |

## Events

| Event name       | Properties | Description |
| ---------------- | ---------- | ----------- |
| update:active    |            |
| close            |            |
| update:full-page |            |

## Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| default |             |          |

## Style

| CSS Variable                    | SASS Variable             | Default               |
| ------------------------------- | ------------------------- | --------------------- |
| --oruga-loading-overlay-legacy  | \$loading-overlay-legacy  | #7f7f7f               |
| --oruga-loading-overlay         | \$loading-overlay         | rgba(255,255,255,0.5) |
| --oruga-loading-zindex          | \$loading-zindex          | 29                    |
| --oruga-loading-fullpage-zindex | \$loading-fullpage-zindex | 999                   |
