<script setup>
import { ref } from "vue";

const minutesGranularity = ref(5);
const hoursGranularity = ref(2);
</script>

<template>
    <section>
        <o-field label="Select timepicker">
            <o-timepicker
                placeholder="Click to select"
                icon="clock"
                :increment-minutes="minutesGranularity"
                :increment-hours="hoursGranularity" />
        </o-field>
    </section>
</template>
