<script setup lang="ts">
import { ref } from "vue";

const teleport = ref(false);
</script>

<template>
    <section class="odocs-spaced">
        <o-field>
            <o-switch v-model="teleport" label="teleport" />
        </o-field>
        <o-field expanded>
            <o-dropdown position="top-right" expanded :teleport="teleport">
                <template #trigger>
                    <o-button
                        class="dropdown-toggle"
                        variant="primary"
                        label="Position top"
                        expanded />
                </template>

                <o-dropdown-item label="Action" />
                <o-dropdown-item label="Another action" />
                <o-dropdown-item label="Something else" />
            </o-dropdown>
        </o-field>

        <o-field expanded>
            <o-dropdown position="bottom-left" expanded :teleport="teleport">
                <template #trigger>
                    <o-button
                        class="dropdown-toggle"
                        variant="primary"
                        label="Position bottom"
                        expanded />
                </template>

                <o-dropdown-item label="Action" />
                <o-dropdown-item label="Another action" />
                <o-dropdown-item label="Something else" />
            </o-dropdown>
        </o-field>

        <hr />

        <o-dropdown :teleport="teleport" position="right">
            <template #trigger>
                <o-button label="Append to body right" />
            </template>

            <o-dropdown-item label="Action" />
            <o-dropdown-item label="Another action" />
            <o-dropdown-item label="Something else" />
        </o-dropdown>

        <o-dropdown :teleport="teleport" position="left">
            <template #trigger>
                <o-button label="Append to body left" />
            </template>

            <o-dropdown-item label="Action" />
            <o-dropdown-item label="Another action" />
            <o-dropdown-item label="Something else" />
        </o-dropdown>

        <o-dropdown :teleport="teleport" position="top">
            <template #trigger>
                <o-button label="Append to body top" />
            </template>

            <o-dropdown-item label="Action" />
            <o-dropdown-item label="Another action" />
            <o-dropdown-item label="Something else" />
        </o-dropdown>

        <o-dropdown :teleport="teleport" position="bottom">
            <template #trigger>
                <o-button label="Append to body bottom" />
            </template>

            <o-dropdown-item label="Action" />
            <o-dropdown-item label="Another action" />
            <o-dropdown-item label="Something else" />
        </o-dropdown>
    </section>
</template>
