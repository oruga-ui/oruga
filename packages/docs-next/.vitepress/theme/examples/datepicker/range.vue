<script setup>
import { ref } from "vue";

const date = ref();
</script>

<template>
    <section>
        <o-field label="Select a date">
            <o-datepicker
                v-model="date"
                placeholder="Click to select..."
                icon="calendar"
                trap-focus
                range />
        </o-field>
        <p><b>Selected:</b> {{ date }}</p>
    </section>
</template>
