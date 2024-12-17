<script setup lang="ts">
import { ref } from "vue";
import type { OptionsProp } from "@oruga-ui/oruga-next";

const options: OptionsProp<string> = [
    {
        label: "Fruits",
        value: "fruits",
        attrs: {
            icon: "info-circle",
            options: ["Apple", "Banana", "Watermelon"],
        },
    },
    {
        label: "Vegetables",
        value: "vegetables",
        attrs: {
            icon: "info-circle",
            options: ["Carrot", "Broccoli", "Cucumber", "Onion"],
        },
    },
];

const selected = ref();
</script>

<template>
    <section>
        <o-menu
            v-model="selected"
            label="Groceries"
            :options="options"
            :accordion="false" />

        <p><b> Selected:</b> {{ selected }}</p>
    </section>
</template>
