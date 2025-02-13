<script setup lang="ts">
import { ref } from "vue";

const thisMonth = new Date().getMonth();

const bars = ref(false);
const date = ref(new Date(2020, thisMonth, 1));

const events = [
    { date: new Date(2020, thisMonth, 2) },
    { date: new Date(2020, thisMonth, 6) },
    {
        date: new Date(2020, thisMonth, 6),
        type: "info",
    },
    {
        date: new Date(2020, thisMonth, 8),
        type: "danger",
    },
    {
        date: new Date(2020, thisMonth, 10),
        type: "success",
    },
    {
        date: new Date(2020, thisMonth, 10),
        type: "link",
    },
    { date: new Date(2020, thisMonth, 12) },
    {
        date: new Date(2020, thisMonth, 12),
        type: "warning",
    },
    {
        date: new Date(2020, thisMonth, 16),
        type: "danger",
    },
    { date: new Date(2020, thisMonth, 20) },
    {
        date: new Date(2020, thisMonth, 29),
        type: "success",
    },
    {
        date: new Date(2020, thisMonth, 29),
        type: "warning",
    },
    {
        date: new Date(2020, thisMonth, 29),
        type: "info",
    },
];
</script>

<template>
    <section>
        <o-field>
            <o-switch v-model="bars" label="Indicator Bars" />
        </o-field>

        <o-datepicker
            v-model="date"
            inline
            :events="events"
            :indicators="bars ? 'bars' : 'dots'" />
    </section>
</template>
