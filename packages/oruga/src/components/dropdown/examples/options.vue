<script setup lang="ts">
import { ref } from "vue";
import type { OptionsItem } from "@oruga-ui/oruga-next";

const options: OptionsItem<string>[] = [
    { label: "Flint", value: "flint" },
    { label: "Silver", value: "silver" },
    { label: "Vane", value: "vane" },
    { label: "Billy", value: "billy" },
    { label: "Jack", value: "silver", attrs: { disabled: true } },
];

const selected = ref<string>();
</script>

<template>
    <section class="odocs-spaced">
        <o-dropdown v-model="selected" :options>
            <template #trigger="{ active }">
                <o-button
                    variant="primary"
                    label="Click me!"
                    :icon-right="active ? 'caret-up' : 'caret-down'" />
            </template>
        </o-dropdown>

        <p><b>Selected:</b> {{ selected }}</p>
    </section>
</template>
