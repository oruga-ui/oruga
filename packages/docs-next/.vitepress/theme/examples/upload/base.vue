<template>
  <o-field class="file">
    <o-upload v-model="file">
      <o-button tag="a" variant="primary">
        <o-icon icon="upload"></o-icon>
        <span>Click to upload</span>
      </o-button>
    </o-upload>
    <span class="file-name" v-if="file">
      {{ file.name }}
    </span>
  </o-field>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
    setup() {
        const file = ref(null)
        return { file }
    }
})
</script>
