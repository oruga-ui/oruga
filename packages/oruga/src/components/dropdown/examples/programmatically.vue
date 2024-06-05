<script setup lang="ts">
import { ref } from "vue";

const active = ref(false);
</script>

<template>
    <o-field expanded>
        <o-dropdown v-model:active="active">
            <template #trigger="{ active }">
                <o-button
                    variant="primary"
                    label="Click me!"
                    :icon-right="active ? 'caret-up' : 'caret-down'" />
            </template>

            <o-dropdown-item label="Action" />
            <o-dropdown-item label="Another action" />
            <o-dropdown-item label="Something else" />
        </o-dropdown>

        <o-button
            label="Open / Close"
            type="primary"
            @click="active = !active" />
    </o-field>
</template>
