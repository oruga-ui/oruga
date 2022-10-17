<template>
	<section>
    <o-breadcrumb variant="danger" separator='dot' align="left" size="medium">
      <o-breadcrumb-item tag="a" href="/">Home</o-breadcrumb-item>
      <o-breadcrumb-item tag="a" href="/components/">Components</o-breadcrumb-item>
      <o-breadcrumb-item tag="a" href="/components/Breadcrumb.html" active>Breadcrumb</o-breadcrumb-item>
    </o-breadcrumb>
    <!-- <o-button>Click Me</o-button> -->
  </section>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    // const isSwitched = ref(false)
    // const isSwitchedCustom = ref('Yes')

    // return {
    //   isSwitched,
    //   isSwitchedCustom
    // }
  }
})
</script>

<style lang="css" scoped>
</style>