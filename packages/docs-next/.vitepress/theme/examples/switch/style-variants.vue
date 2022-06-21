<template>
  <section>
    <o-field grouped>
      <o-switch v-model="isRounded">Rounded</o-switch>
      <o-switch v-model="position" true-value="left" false-value="right"
        >Label on left</o-switch
      >
    </o-field>
    <o-field label="Variant">
      <o-select expanded v-model="variant" placeholder="Variant">
        <option value="null">Default</option>
        <option value="primary">Primary</option>
        <option value="success">Success</option>
        <option value="warning">Warning</option>
        <option value="danger">Danger</option>
      </o-select>
    </o-field>
    <o-field label="Passive Variant">
      <o-select expanded v-model="passive" placeholder="Passive Variant">
        <option value="null">Default</option>
        <option value="primary">Primary</option>
        <option value="success">Success</option>
        <option value="warning">Warning</option>
        <option value="danger">Danger</option>
      </o-select>
    </o-field>
    <o-field label="Size">
      <o-select expanded v-model="size">
        <option value="">Default</option>
        <option value="small">small</option>
        <option value="medium">medium</option>
        <option value="large">large</option>
      </o-select>
    </o-field>
    <o-switch
      :rounded="isRounded"
      :position="position"
      :size="size"
      :variant="variant"
      :passive-variant="passive"
      >Sample</o-switch
    >
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const size = ref('')
    const variant = ref(null)
    const passive = ref(null)
    const isRounded = ref(false)
    const position = ref('right')

    return {
      size,
      variant,
      passive,
      isRounded,
      position
    }
  }
})
</script>
