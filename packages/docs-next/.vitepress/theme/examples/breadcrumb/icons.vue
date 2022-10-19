<template>
	<section>
    <o-breadcrumb variant="danger" separator='slash' align="left">
      <o-breadcrumb-item icon-left="home" tag="a" href="/">Home</o-breadcrumb-item>
      <o-breadcrumb-item icon-left="search" tag="a" href="/components/" disabled>Components</o-breadcrumb-item>
      <o-breadcrumb-item icon-left="plus" tag="a" href="/components/Breadcrumb.html" active>Breadcrumb</o-breadcrumb-item>
    </o-breadcrumb>
  </section>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
   
  }
})
</script>

<style lang="css" scoped>
</style>