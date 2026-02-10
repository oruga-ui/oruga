<script setup lang="ts">
import { ref } from "vue";
import type { OptionsProp } from "@oruga-ui/oruga-next";

const options: OptionsProp<string> = [
    { label: "Flint", value: "flint" },
    { label: "Silver", value: "silver" },
    { label: "Vane", value: "vane" },
    { label: "Billy", value: "billy" },
];

const selected = ref<string>();
</script>

<template>
    <section>
        <o-field label="Options">
            <o-dropdown
                v-model="selected"
                :options="options"
                selectable
                aria-label="options example">
                <template #trigger="{ active }">
                    <o-button
                        variant="primary"
                        label="Click me!"
                        :icon-right="active ? 'caret-up' : 'caret-down'" />
                </template>
            </o-dropdown>

            <p><b>Selected:</b> {{ selected }}</p>
        </o-field>
    </section>
</template>
