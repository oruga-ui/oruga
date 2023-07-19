<script setup>
import { ref } from "vue";

const time = ref(new Date());
</script>

<template>
    <section>
        <o-timepicker v-model="time" inline />
    </section>
</template>
