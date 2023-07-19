<script setup>
import { ref } from "vue";

const dates = ref([]);
</script>

<template>
    <o-field label="Select a date">
        <o-datepicker v-model="dates" multiple placeholder="Click to select...">
        </o-datepicker>
    </o-field>
</template>
