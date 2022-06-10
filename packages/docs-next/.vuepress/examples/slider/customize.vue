<template>
  <section>
    <o-field label="Tooltip type">
      <o-slider v-model="sliderValue" :tooltip-variant="sliderType"></o-slider>
    </o-field>

    <o-field label="Hide tooltip">
      <o-slider :tooltip="false"></o-slider>
    </o-field>

    <o-field label="Custom tooltip label">
      <o-slider :custom-formatter="(val) => val + '%'"></o-slider>
    </o-field>

    <o-field label="Rounded thumb">
      <o-slider rounded></o-slider>
    </o-field>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'

export default defineComponent({
  setup() {
    const sliderValue = ref(0)

    const sliderType = computed(() => {
      if (sliderValue.value > 25 && sliderValue.value < 75) {
        return 'warning'
      } else if (sliderValue.value >= 75) {
        return 'success'
      }
      return 'danger'
    })

    return {
      sliderValue,
      sliderType
    }
  }
})
</script>
