## Examples

### Base

::: demo
<template>
    <section>
        <o-sidebar
            :fullheight="fullheight"
            :fullwidth="fullwidth"
            :overlay="overlay"
            :right="right"
            :open.sync="open"
            >
            <o-button v-if="fullwidth" icon-left="times" label="Close" @click="open = false" />
            <img
                width="128"
                src="https://avatars2.githubusercontent.com/u/66300512?s=200&v=4"
                alt="Lightweight UI components for Vue.js"
            />
            <h3>Example</h3>
           
        </o-sidebar>
        <div class="block">
            <o-field grouped group-multiline>
                <o-switch v-model="overlay">Overlay</o-switch>
                <o-switch v-model="fullheight">Fullheight</o-switch>
                <o-switch v-model="fullwidth">Fullwidth</o-switch>
                <o-switch v-model="right">Right</o-switch>
            </o-field>
        </div>

        <br>

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
:::

### Static

::: demo
<template>
    <div class="sidebar-page">
        <section class="sidebar-layout">
             <o-sidebar
                position="static"
                :mobile="mobile"
                :expand-on-hover="expandOnHover"
                :reduce="reduce"
                open
            >
                 <img
                    width="128"
                    src="https://avatars2.githubusercontent.com/u/66300512?s=200&v=4"
                    alt="Lightweight UI components for Vue.js"
                />
                <section style="padding: 1em">
                  <h5>Example 1</h5>
                  <h5>Example 2</h5>
                  <h5>Example 3</h5>
                  <h5>Example 4</h5>
                  <h5>Example 5</h5>
                </section>
            </o-sidebar>

            <div style="padding: 1em">
                <o-field>
                    <o-switch v-model="reduce">Reduced</o-switch>
                </o-field>
                <o-field>
                    <o-switch v-model="expandOnHover">Expand on hover</o-switch>
                </o-field>
                <br>
                <o-field label="Mobile Layout">
                    <o-select v-model="mobile">
                        <option :value="null"></option>
                        <option value="reduced">Reduced</option>
                        <option value="hidden">Hidden</option>
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
      mobile: "reduced",
      reduce: false
    }
  }
}
</script>

<style>
.sidebar-page {
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 100%;
}
.sidebar-layout {
    display: flex;
    flex-direction: row;
    min-height: 100%;
}
</style>
:::
