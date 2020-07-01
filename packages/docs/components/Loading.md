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
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id
      fermentum quam. Proin sagittis, nibh id hendrerit imperdiet, elit sapien
      laoreet elit
      <o-loading
        :full-page="isFullPage"
        :active.sync="isLoading"
        :can-cancel="true"
      ></o-loading>
    </p>
  </section>
</template>

<script>
  export default {
    data() {
      return {
        isLoading: false,
        isFullPage: true
      };
    },
    methods: {
      openLoading() {
        this.isLoading = true;
        setTimeout(() => {
          this.isLoading = false;
        }, 10 * 1000);
      }
    }
  };
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
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id fermentum quam. Proin sagittis, nibh id hendrerit imperdiet, elit sapien laoreet elit
            <o-loading :full-page="isFullPage" :active.sync="isLoading" :can-cancel="true">
                <o-icon
                    pack="fas"
                    icon="sync-alt"
                    size="ilarge"
                    spin>
                </o-icon>
            </o-loading>
        </o-notification>
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
        <p ref="element">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id fermentum quam. Proin sagittis, nibh id hendrerit imperdiet, elit sapien laoreet elit
        </o-p>
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
                    container: this.isFullPage ? null : this.$refs.element.$el
                })
                setTimeout(() => loadingComponent.close(), 3 * 1000)
            }
        }
    }
</script>
```

:::

## Props

| Prop name       | Description | Type                      | Values | Default                                                                                                                                                                                                                     |
| --------------- | ----------- | ------------------------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| active          |             | boolean                   | -      |                                                                                                                                                                                                                             |
| programmatic    |             | boolean                   | -      |                                                                                                                                                                                                                             |
| container       |             | object\|func\|HTMLElement | -      |                                                                                                                                                                                                                             |
| fullPage        |             | boolean                   | -      | true                                                                                                                                                                                                                        |
| animation       |             | string                    | -      | 'fade'                                                                                                                                                                                                                      |
| canCancel       |             | boolean                   | -      | false                                                                                                                                                                                                                       |
| onCancel        |             | func                      | -      | () => {}                                                                                                                                                                                                                    |
| icon            |             | string                    | -      | 'spin'                                                                                                                                                                                                                      |
| iconSpin        |             | boolean                   | -      | true                                                                                                                                                                                                                        |
| rootClass       |             | string                    | -      | () => {<br> const override = getValueByPath(config, 'loading.override', false)<br> const clazz = getValueByPath(config, 'loading.rootClass', '')<br> return getCssClass(clazz, override, 'o-loading-overlay')<br>}          |
| backgroundClass |             | string                    | -      | () => {<br> const override = getValueByPath(config, 'loading.override', false)<br> const clazz = getValueByPath(config, 'loading.backgroundClass', '')<br> return getCssClass(clazz, override, 'o-loading-background')<br>} |
| iconClass       |             | string                    | -      | () => {<br> const override = getValueByPath(config, 'loading.override', false)<br> const clazz = getValueByPath(config, 'loading.iconClass', '')<br> return getCssClass(clazz, override, 'o-loading-icon')<br>}             |

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

| CSS Variable                        | SASS Variable                 | Default               |
| ----------------------------------- | ----------------------------- | --------------------- |
| --oruga-loading-background-legacy   | \$loading-background-legacy   | #7f7f7f               |
| --oruga-loading-background          | \$loading-background          | rgba(255,255,255,0.5) |
| --oruga-loading-full-page-icon-size | \$loading-full-page-icon-size | 5em                   |
| --oruga-loading-icon-size           | \$loading-icon-size           | 2.5em                 |
| --oruga-loading-zindex              | \$loading-zindex              | 999                   |
