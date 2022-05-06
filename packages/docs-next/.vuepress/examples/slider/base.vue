<template>
  <section>
    <o-field label="Simple">
      <o-slider v-model="value"></o-slider>
    </o-field>

    <o-field label="Warning">
      <o-slider v-model="value" variant="warning"></o-slider>
    </o-field>

    <o-field label="Large">
      <o-slider v-model="value" size="large"></o-slider>
    </o-field>

    <o-field label="Disabled">
      <o-slider :value="30" disabled></o-slider>
    </o-field>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const value = ref(5)

    return {
      value
    }
  }
})
</script>
