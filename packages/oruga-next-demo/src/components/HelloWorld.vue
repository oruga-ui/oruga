<template>
  <o-collapse :open="true">
    <template v-slot:trigger="props">
      <a>{{ props ? 'close' : 'open' }}</a>
      </template>
    <div>Hello</div>
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
