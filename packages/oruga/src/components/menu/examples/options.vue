<script setup lang="ts">
import { ref } from "vue";
import type { OptionsPropWithGroups } from "@oruga-ui/oruga-next";

const options: OptionsPropWithGroups<string> = [
    {
        group: "Fruits",
        attrs: {
            icon: "info-circle",
        },
        options: ["Apple", "Banana", "Watermelon"],
    },
    {
        group: "Vegetables",
        attrs: {
            icon: "info-circle",
        },
        options: ["Carrot", "Broccoli", "Cucumber", "Onion"],
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
