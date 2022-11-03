<template>
  <o-timepicker v-model="time" inline></o-timepicker>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
    setup() {
        const time = ref(new Date())
        return { time }
    }
})
</script>
