<script setup lang="ts">
import { ref } from "vue";

const teleport = ref(false);
</script>

<template>
    <section class="odocs-spaced">
        <o-field>
            <o-switch v-model="teleport" label="teleport" />
        </o-field>

        <p>
            <o-dropdown position="auto" expanded :teleport="teleport">
                <template #trigger>
                    <o-button
                        variant="primary"
                        label="Position Auto"
                        expanded />
                </template>

                <o-dropdown-item label="Action" />
                <o-dropdown-item label="Another action" />
                <o-dropdown-item label="Something else" />
            </o-dropdown>
        </p>

        <p>
            <o-dropdown :teleport="teleport" position="right">
                <template #trigger>
                    <o-button label="Append to right" />
                </template>

                <o-dropdown-item label="Action" />
                <o-dropdown-item label="Another action" />
                <o-dropdown-item label="Something else" />
            </o-dropdown>

            <o-dropdown :teleport="teleport" position="left">
                <template #trigger>
                    <o-button label="Append to left" />
                </template>

                <o-dropdown-item label="Action" />
                <o-dropdown-item label="Another action" />
                <o-dropdown-item label="Something else" />
            </o-dropdown>

            <o-dropdown :teleport="teleport" position="top">
                <template #trigger>
                    <o-button label="Append to top" />
                </template>

                <o-dropdown-item label="Action" />
                <o-dropdown-item label="Another action" />
                <o-dropdown-item label="Something else" />
            </o-dropdown>

            <o-dropdown :teleport="teleport" position="bottom">
                <template #trigger>
                    <o-button label="Append to bottom" />
                </template>

                <o-dropdown-item label="Action" />
                <o-dropdown-item label="Another action" />
                <o-dropdown-item label="Something else" />
            </o-dropdown>
        </p>

        <p>
            <o-dropdown :teleport="teleport" position="top-right">
                <template #trigger>
                    <o-button label="Append to top-right" />
                </template>

                <o-dropdown-item label="Action" />
                <o-dropdown-item label="Another action" />
                <o-dropdown-item label="Something else" />
            </o-dropdown>

            <o-dropdown :teleport="teleport" position="top-left">
                <template #trigger>
                    <o-button label="Append to top-left" />
                </template>

                <o-dropdown-item label="Action" />
                <o-dropdown-item label="Another action" />
                <o-dropdown-item label="Something else" />
            </o-dropdown>

            <o-dropdown :teleport="teleport" position="bottom-right">
                <template #trigger>
                    <o-button label="Append to bottom-right" />
                </template>

                <o-dropdown-item label="Action" />
                <o-dropdown-item label="Another action" />
                <o-dropdown-item label="Something else" />
            </o-dropdown>

            <o-dropdown :teleport="teleport" position="bottom-left">
                <template #trigger>
                    <o-button label="Append to bottom-left" />
                </template>

                <o-dropdown-item label="Action" />
                <o-dropdown-item label="Another action" />
                <o-dropdown-item label="Something else" />
            </o-dropdown>
        </p>
    </section>
</template>
