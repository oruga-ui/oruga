<script setup>
import { ref } from "vue";

const datetime = ref(new Date());
</script>

<template>
    <section>
        <o-datetimepicker v-model="datetime" inline />
    </section>
</template>
