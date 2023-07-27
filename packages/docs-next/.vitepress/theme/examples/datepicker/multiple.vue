<script setup>
import { ref } from "vue";

const dates = ref([]);
</script>

<template>
    <section>
        <o-field label="Select a date">
            <o-datepicker
                v-model="dates"
                multiple
                placeholder="Click to select..." />
        </o-field>
    </section>
</template>
