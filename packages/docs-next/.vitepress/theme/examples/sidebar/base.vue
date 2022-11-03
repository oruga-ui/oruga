<template>
  <section>
    <o-sidebar
      :fullheight="fullheight"
      :fullwidth="fullwidth"
      :overlay="overlay"
      :right="right"
      v-model:open="open"
    >
      <o-button
        v-if="fullwidth"
        icon-left="times"
        label="Close"
        @click="open = false"
      />
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

    <br />

    <o-button @click="open = true">Show</o-button>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const open = ref(false)
    const overlay = ref(true)
    const fullheight = ref(true)
    const fullwidth = ref(false)
    const right = ref(false)

    return {
      open,
      overlay,
      fullheight,
      fullwidth,
      right
    }
  }
})
</script>
