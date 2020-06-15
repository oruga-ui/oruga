---
title: Sidebar
---

# Sidebar

> Base component, contains and wrap all the other components.

---

## Demo

::: demo
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
        Test
      </div>
    </o-sidebar>
    <div class="block">
      <o-field grouped group-multiline>
        <div class="control">
          <o-switch v-model="overlay">Overlay</o-switch>
        </div>
        <div class="control">
          <o-switch v-model="fullheight">Fullheight</o-switch>
        </div>
        <div class="control">
          <o-switch v-model="fullwidth">Fullwidth</o-switch>
        </div>
        <div class="control">
          <o-switch v-model="right">Right</o-switch>
        </div>
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

