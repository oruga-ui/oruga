<template>
  <o-collapse :open="true">
    <template #trigger><a>click</a></template>
    <o-input />
  </o-collapse>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
      return {
        activeTab: 0,
        showBooks: false,
        multiline: false
      }
    }
}
</script>
