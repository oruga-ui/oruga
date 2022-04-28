<template>
  <section>
    <o-field>
      <o-switch>Default</o-switch>
    </o-field>
    <o-field>
      <o-switch v-model="isSwitched">
        {{ isSwitched }}
      </o-switch>
    </o-field>
    <o-field>
      <o-switch v-model="isSwitchedCustom" true-value="Yes" false-value="No">
        {{ isSwitchedCustom }}
      </o-switch>
    </o-field>
    <o-field>
      <o-switch disabled>Disabled</o-switch>
    </o-field>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const isSwitched = ref(false)
    const isSwitchedCustom = ref('Yes')

    return {
      isSwitched,
      isSwitchedCustom
    }
  }
})
</script>
