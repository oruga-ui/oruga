<script setup lang="ts">
import { ref } from "vue";
import type { OptionsPropWithGroups } from "@oruga-ui/oruga-next";

const options: OptionsPropWithGroups<string> = [
    {
        label: "Fruits",
        options: ["Apple", "Banana", "Watermelon"],
    },
    {
        label: "Vegetables",
        options: ["Carrot", "Broccoli", "Cucumber", "Onion"],
    },
];

const selected = ref();
</script>

<template>
    <section>
        <o-field label="Find a food">
            <o-autocomplete v-model="selected" :options="options" open-on-focus>
                <template #header>List Groups</template>
            </o-autocomplete>
        </o-field>

        <p><b>Selected:</b> {{ selected }}</p>
    </section>
</template>
