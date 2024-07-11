<script setup lang="ts">
import { ref } from "vue";

const dates = ref<Date[]>([]);
</script>

<template>
    <section>
        <o-field label="Select a date">
            <o-datepicker
                v-model="dates"
                multiple
                placeholder="Click to select..." />
        </o-field>

        <p><b>Selected:</b> {{ dates }}</p>
    </section>
</template>
