<template>
  <div>
    <o-field>
      <o-button size="medium" variant="primary" @click="openLoading">
        Launch loading
      </o-button>
    </o-field>
    <o-field>
      <o-switch v-model="isFullPage">Display loader over full page</o-switch>
    </o-field>
    <p style="position: relative" ref="element">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id
      fermentum quam. Proin sagittis, nibh id hendrerit imperdiet, elit sapien
      laoreet elit
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useProgrammatic } from '../../../../../oruga-next/dist/oruga'

export default defineComponent({
  setup() {
    const isFullPage = ref(true)

    const { oruga } = useProgrammatic()

    function openLoading() {
      const loadingComponent = oruga.loading.open({
        fullPage: isFullPage.value,
        container: isFullPage.value ? null : this.$refs.element
      })
      setTimeout(() => loadingComponent.close(), 3 * 1000)
    }

    return {
      isFullPage,
      openLoading
    }
  }
})
</script>
