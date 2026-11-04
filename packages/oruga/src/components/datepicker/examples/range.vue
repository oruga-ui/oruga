<script setup lang="ts">
import { ref } from "vue";

const dates = ref<[Date, Date] | []>([]);
</script>

<template>
    <section>
        <o-field label="Travel dates">
            <o-datepicker
                v-model="dates"
                placeholder="Click to select..."
                icon="calendar"
                range />
        </o-field>

        <p><b>Selected:</b> {{ dates }}</p>
    </section>
</template>
