<script setup>
import { ref } from "vue";

const min = new Date();
min.setHours(9);
min.setMinutes(0);
const max = new Date();
max.setHours(18);
max.setMinutes(0);

const minTime = ref(min);
const maxTime = ref(max);
</script>

<template>
    <section>
        <o-field label="Select time">
            <o-timepicker
                placeholder="Click to select..."
                rounded
                :min-time="minTime"
                :max-time="maxTime" />
        </o-field>
    </section>
</template>
