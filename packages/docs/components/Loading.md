---
title: Loading
---

# Loading

> A simple loading overlay

---

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
        <o-icon pack="fas" icon="sync-alt" size="ilarge" spin> </o-icon>
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
        isFullPage: true
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

## Props

| Prop name       | Description                                                                       | Type                      | Values | Default                     |
| --------------- | --------------------------------------------------------------------------------- | ------------------------- | ------ | --------------------------- |
| active          | Whether modal is active or not, use the .sync modifier to make it two-way binding | boolean                   | -      |                             |
| programmatic    |                                                                                   | boolean                   | -      |                             |
| container       |                                                                                   | object\|func\|HTMLElement | -      |                             |
| fullPage        | Loader will overlay the full page                                                 | boolean                   | -      | true                        |
| animation       |                                                                                   | string                    | -      | 'loading.animation': 'fade' |
| canCancel       | Can close Loading by pressing escape or clicking outside                          | boolean                   | -      | false                       |
| onCancel        | Callback function to call after user canceled (pressed escape / clicked outside)  | func                      | -      | () => {}                    |
| icon            | Icon name                                                                         | string                    | -      | 'loading.icom': 'spin'      |
| iconSpin        | Enable spin effect on icon                                                        | boolean                   | -      | true                        |
| rootClass       |                                                                                   | string                    | -      |                             |
| backgroundClass |                                                                                   | string                    | -      |                             |
| iconClass       |                                                                                   | string                    | -      |                             |

## Events

| Event name       | Type      | Description |
| ---------------- | --------- | ----------- |
| close            |           |
| update:active    | undefined |
| update:full-page | undefined |

## Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| default |             |          |

## Style

| CSS Variable                       | SASS Variable                | Default               |
| ---------------------------------- | ---------------------------- | --------------------- |
| --oruga-loading-background-legacy  | \$loading-background-legacy  | #7f7f7f               |
| --oruga-loading-background         | \$loading-background         | rgba(255,255,255,0.5) |
| --oruga-loading-fullpage-icon-size | \$loading-fullpage-icon-size | 5em                   |
| --oruga-loading-icon-size          | \$loading-icon-size          | 2.5em                 |
| --oruga-loading-zindex             | \$loading-zindex             | 999                   |
