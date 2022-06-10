<template>
  <section>
    <o-button @click="clickMe">Click Me</o-button>
  </section>
</template>
<script>
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    const clickMe = () => {
      alert('Clicked!')
    }
    return {
      clickMe
    }
  }
});
</script>
