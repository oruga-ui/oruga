## Examples

### Base

::: demo
```html
<template>
    <section>
        <o-sidebar
            variant="primary"
            :fullheight="fullheight"
            :fullwidth="fullwidth"
            :overlay="overlay"
            :right="right"
            :open.sync="open"
            >
            <div class="p-1">
                <img
                src="https://github.com/oruga-ui/oruga/raw/master/packages/docs/.vuepress/public/logo.pn"
                alt="Lightweight UI components for Vue.js"
                />
                Sidebar
            </div>
        </o-sidebar>
        <div class="block">
            <o-field grouped group-multiline>
                <o-switch v-model="overlay">Overlay</o-switch>
                <o-switch v-model="fullheight">Fullheight</o-switch>
                <o-switch v-model="fullwidth">Fullwidth</o-switch>
                <o-switch v-model="right">Right</o-switch>
            </o-field>
        </div>
        <o-button @click="open = true">Show</o-button>
    </section>
</template>

<script>
export default {
  data() {
    return {
      open: false,
      overlay: true,
      fullheight: true,
      fullwidth: false,
      right: false
    }
  }
}
</script>
```
:::

### Static

::: demo
```html
<template>
    <div class="sidebar-page">
        <section class="sidebar-layout">
             <o-sidebar
                position="static"
                :mobile="mobile"
                :expand-on-hover="expandOnHover"
                :reduce="reduce"
                variant="primary"
                open
            >
                <div class="p-1">
                    <img
                        src="https://github.com/oruga-ui/oruga/raw/master/packages/docs/.vuepress/public/logo.pn"
                        alt="Lightweight UI components for Vue.js"
                    />
                    Sidebar
                </div>
            </o-sidebar>

            <div class="p-1">
                <o-field>
                    <o-switch v-model="reduce">Reduced</o-switch>
                </o-field>
                <o-field>
                    <o-switch v-model="expandOnHover">Expand on hover</o-switch>
                </o-field>
                <o-field label="Mobile Layout">
                    <o-select v-model="mobile">
                        <option :value="null"></option>
                        <option value="reduce">Reduced</option>
                        <option value="hide">Hidden</option>
                        <option value="fullwidth">Fullwidth</option>
                    </o-select>
                </o-field>
            </div>
        </section>
    </div>
</template>

<script>
export default {
  data() {
    return {
      expandOnHover: false,
      mobile: "reduce",
      reduce: false
    }
  }
}
</script>

<style lang="scss" scoped>
.p-1 {
  padding: 1em;
}
.sidebar-page {
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 100%;
    // min-height: 100vh;
    .sidebar-layout {
        display: flex;
        flex-direction: row;
        min-height: 100%;
        // min-height: 100vh;
    }
}
</style>
```
:::