<script setup lang="ts">
import { ref } from "vue";
import type { OptionsPropWithGroups } from "@/composables";

const selectedValue = ref();
const options: OptionsPropWithGroups = [
    {
        label: "Germany",
        value: "DE",
        options: [
            { label: "Berlin", value: "Berlin" },
            { label: "Frankfurt", value: "Frankfurt" },
            { label: "Hamburg", value: "Hamburg" },
            { label: "Munich", value: "Munich" },
        ],
    },
    {
        label: "USA",
        value: "US",
        options: [
            { label: "Chicago", value: "Chicago" },
            { label: "Los Angeles", value: "Los Angeles" },
            { label: "New York", value: "New York" },
            { label: "San Francisco", value: "San Francisco" },
        ],
    },
    {
        label: "Japan",
        value: "JP",
        options: [
            { label: "Kyoto", value: "Kyoto" },
            { label: "Osaka", value: "Osaka" },
            { label: "Tokyo", value: "Tokyo" },
            { label: "Yokohama", value: "Yokohama" },
        ],
    },
];
</script>

<template>
    <section class="odocs-spaced">
        <Listbox v-model="selectedValue" :options="options">
            <template #group="{ option }">
                <div class="flex items-center">
                    <img
                        :alt="option.label"
                        src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png"
                        :class="`flag flag-${option.value.toLowerCase()} mr-2`"
                        style="width: 18px" />
                    <div>{{ option.label }}</div>
                </div>
            </template>
        </Listbox>

        <p><b>Selected:</b> {{ selectedValue }}</p>
    </section>
</template>
