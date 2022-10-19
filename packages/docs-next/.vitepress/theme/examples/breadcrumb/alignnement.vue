<template>
	<section>
    <o-breadcrumb variant="danger" separator='slash' align="left" size="medium">
      <o-breadcrumb-item tag="a" href="/">Home</o-breadcrumb-item>
      <o-breadcrumb-item tag="a" href="/components/">Components</o-breadcrumb-item>
      <o-breadcrumb-item tag="a" href="/components/Breadcrumb.html" active>Breadcrumb</o-breadcrumb-item>
    </o-breadcrumb>
    <br>
    <br>
     <o-breadcrumb variant="danger" separator='slash' align="center" size="medium">
      <o-breadcrumb-item tag="a" href="/">Home</o-breadcrumb-item>
      <o-breadcrumb-item tag="a" href="/components/">Components</o-breadcrumb-item>
      <o-breadcrumb-item tag="a" href="/components/Breadcrumb.html" active>Breadcrumb</o-breadcrumb-item>
    </o-breadcrumb>
    <br>
    <br>
     <o-breadcrumb variant="danger" separator='slash' align="right" size="medium">
      <o-breadcrumb-item tag="a" href="/">Home</o-breadcrumb-item>
      <o-breadcrumb-item tag="a" href="/components/">Components</o-breadcrumb-item>
      <o-breadcrumb-item tag="a" href="/components/Breadcrumb.html" active>Breadcrumb</o-breadcrumb-item>
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