<template>
  <section>
    <o-field>
      <o-button size="medium" variant="primary" @click="openLoading">
        Launch loading
      </o-button>
    </o-field>
    <o-field>
      <o-switch v-model="isFullPage">Display loader over full page</o-switch>
    </o-field>
    <p style="position: relative">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id
      fermentum quam. Proin sagittis, nibh id hendrerit imperdiet, elit sapien
      laoreet elit
      <o-loading
        :full-page="isFullPage"
        :active.sync="isLoading"
        :can-cancel="true"
      >
        <o-icon pack="fas" icon="sync-alt" size="large" spin> </o-icon>
      </o-loading>
    </p>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const isLoading = ref(false)
    const isFullPage = ref(true)

    function openLoading() {
      isLoading.value = true
      setTimeout(() => {
        isLoading.value = false
      }, 10 * 1000)
    }

    return {
      isLoading,
      isFullPage,
      openLoading
    }
  }
})
</script>
