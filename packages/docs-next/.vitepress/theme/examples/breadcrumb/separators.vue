<template>
	<section>
    <o-breadcrumb separator='dot' align="left" size="medium">
      <o-breadcrumb-item tag="a" href="/">Home</o-breadcrumb-item>
      <o-breadcrumb-item tag="a" href="/components/" disabled>Components</o-breadcrumb-item>
      <o-breadcrumb-item tag="a" href="/components/Breadcrumb.html" active>Breadcrumb</o-breadcrumb-item>
    </o-breadcrumb>
    <br>
    <br>
     <o-breadcrumb separator='arrow' align="left" size="medium">
      <o-breadcrumb-item tag="a" href="/">Home</o-breadcrumb-item>
      <o-breadcrumb-item tag="a" href="/components/" disabled>Components</o-breadcrumb-item>
      <o-breadcrumb-item tag="a" href="/components/Breadcrumb.html" active>Breadcrumb</o-breadcrumb-item>
    </o-breadcrumb>
    <br>
    <br>
     <o-breadcrumb separator='chevron' align="left" size="medium">
      <o-breadcrumb-item tag="a" href="/">Home</o-breadcrumb-item>
      <o-breadcrumb-item tag="a" href="/components/" disabled>Components</o-breadcrumb-item>
      <o-breadcrumb-item tag="a" href="/components/Breadcrumb.html" active>Breadcrumb</o-breadcrumb-item>
    </o-breadcrumb>
     <br>
    <br>
     <o-breadcrumb separator='bullet' align="left" size="medium">
      <o-breadcrumb-item tag="a" href="/">Home</o-breadcrumb-item>
      <o-breadcrumb-item tag="a" href="/components/" disabled>Components</o-breadcrumb-item>
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