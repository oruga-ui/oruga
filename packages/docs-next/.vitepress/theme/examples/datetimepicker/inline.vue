<script setup>
import { ref } from "vue";

const datetime = ref(new Date());
</script>

<template>
    <o-datetimepicker v-model="datetime" inline></o-datetimepicker>
</template>
