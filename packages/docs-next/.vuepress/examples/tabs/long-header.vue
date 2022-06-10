<template>
  <o-tabs type="boxed">
    <o-tab-item
      v-for="(item, index) in new Array(45)"
      :key="`longitem-${index}`"
    >
      <template #header>
        <span>Head {{ index }}</span>
      </template>
    </o-tab-item>
  </o-tabs>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
    setup() {
        const expanded = ref(false)
        const atRight = ref(false)
        const size = ref(null)
        const type = ref('default')
        return { expanded, atRight, size, type }
    }
})
</script>

