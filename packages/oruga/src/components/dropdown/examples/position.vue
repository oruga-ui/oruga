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
            <o-dropdown position="right" :teleport="teleport">
                <template #trigger>
                    <o-button label="Append to right" />
                </template>

                <o-dropdown-item label="Action" />
                <o-dropdown-item label="Another action" />
                <o-dropdown-item label="Something else" />
            </o-dropdown>

            <o-dropdown position="left" :teleport="teleport">
                <template #trigger>
                    <o-button label="Append to left" />
                </template>

                <o-dropdown-item label="Action" />
                <o-dropdown-item label="Another action" />
                <o-dropdown-item label="Something else" />
            </o-dropdown>

            <o-dropdown position="top" :teleport="teleport">
                <template #trigger>
                    <o-button label="Append to top" />
                </template>

                <o-dropdown-item label="Action" />
                <o-dropdown-item label="Another action" />
                <o-dropdown-item label="Something else" />
            </o-dropdown>

            <o-dropdown position="bottom" :teleport="teleport">
                <template #trigger>
                    <o-button label="Append to bottom" />
                </template>

                <o-dropdown-item label="Action" />
                <o-dropdown-item label="Another action" />
                <o-dropdown-item label="Something else" />
            </o-dropdown>
        </p>

        <p>
            <o-dropdown position="top-right" :teleport="teleport">
                <template #trigger>
                    <o-button label="Append to top-right" />
                </template>

                <o-dropdown-item label="Action" />
                <o-dropdown-item label="Another action" />
                <o-dropdown-item label="Something else" />
            </o-dropdown>

            <o-dropdown position="top-left" :teleport="teleport">
                <template #trigger>
                    <o-button label="Append to top-left" />
                </template>

                <o-dropdown-item label="Action" />
                <o-dropdown-item label="Another action" />
                <o-dropdown-item label="Something else" />
            </o-dropdown>

            <o-dropdown position="bottom-right" :teleport="teleport">
                <template #trigger>
                    <o-button label="Append to bottom-right" />
                </template>

                <o-dropdown-item label="Action" />
                <o-dropdown-item label="Another action" />
                <o-dropdown-item label="Something else" />
            </o-dropdown>

            <o-dropdown position="bottom-left" :teleport="teleport">
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
