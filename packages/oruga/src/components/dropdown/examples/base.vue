<script setup lang="ts">
import { ref } from "vue";

const keepFirst = ref(false);
const keepOpen = ref(false);
</script>

<template>
    <section class="odocs-spaced">
        <o-field grouped>
            <o-switch v-model="keepOpen">Keep open</o-switch>
            <o-switch v-model="keepFirst">Keep first</o-switch>
        </o-field>

        <o-dropdown :keep-open="keepOpen" :keep-first="keepFirst">
            <template #trigger="{ active }">
                <o-button
                    variant="primary"
                    label="Click me!"
                    :icon-right="active ? 'caret-up' : 'caret-down'" />
            </template>

            <o-dropdown-item label="Action" icon="home" />
            <o-dropdown-item label="Another action" icon="user" />
            <o-dropdown-item label="Something else" icon="sync-alt" />
        </o-dropdown>
    </section>
</template>
