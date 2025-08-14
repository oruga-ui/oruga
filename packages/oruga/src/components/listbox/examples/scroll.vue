<script setup lang="ts">
import { ref } from "vue";

const selectedValue = ref();

const items = ref(
    Array.from({ length: 100000 }, (_, i) => ({
        label: `Item #${i}`,
        value: i,
    })),
);
</script>

<template>
    <section class="odocs-spaced">
        <Listbox v-model="selectedValue" :options="items" scoll striped />

        <p><b>Selected:</b> {{ selectedValue }}</p>
    </section>
</template>
