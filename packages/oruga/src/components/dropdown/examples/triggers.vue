<script setup lang="ts">
import { ref } from "vue";

const active = ref(false);
</script>

<template>
    <section class="odocs-spaced">
        <p>
            <o-dropdown>
                <template #trigger="{ active }">
                    <o-button
                        variant="primary"
                        label="Default"
                        :icon-right="active ? 'caret-up' : 'caret-down'" />
                </template>

                <o-dropdown-item label="Action" />
                <o-dropdown-item label="Another action" />
                <o-dropdown-item label="Something else" />
            </o-dropdown>

            <o-dropdown :triggers="['hover']">
                <template #trigger="{ active }">
                    <o-button
                        variant="info"
                        label="Hover"
                        :icon-right="active ? 'caret-up' : 'caret-down'" />
                </template>

                <o-dropdown-item label="Action" />
                <o-dropdown-item label="Another action" />
                <o-dropdown-item label="Something else" />
            </o-dropdown>

            <o-dropdown :triggers="['contextmenu']">
                <template #trigger>
                    <o-button label="Right click" />
                </template>

                <o-dropdown-item label="Action" />
                <o-dropdown-item label="Another action" />
                <o-dropdown-item label="Something else" />
            </o-dropdown>

            <o-dropdown disabled>
                <template #trigger="{ active }">
                    <o-button
                        label="Disabled"
                        disabled
                        :icon-right="active ? 'caret-up' : 'caret-down'" />
                </template>

                <o-dropdown-item label="Action" />
                <o-dropdown-item label="Another action" />
                <o-dropdown-item label="Something else" />
            </o-dropdown>

            <o-dropdown>
                <template #trigger>
                    <div role="button" tabindex="0">
                        Custom
                        <o-icon variant="success" icon="caret-down" />
                    </div>
                </template>

                <o-dropdown-item label="Action" />
                <o-dropdown-item label="Another action" />
                <o-dropdown-item label="Something else" />
            </o-dropdown>

            <o-dropdown teleport>
                <template #trigger>
                    <o-button label="Append to body" />
                </template>

                <o-dropdown-item label="Action" />
                <o-dropdown-item label="Another action" />
                <o-dropdown-item label="Something else" />
            </o-dropdown>
        </p>
        <br />
        <p>
            <o-field grouped>
                <o-dropdown v-model:active="active" :triggers="[]">
                    <template #trigger> Click the button beside! </template>

                    <o-dropdown-item label="Action" />
                    <o-dropdown-item label="Another action" />
                    <o-dropdown-item label="Something else" />
                </o-dropdown>

                <o-button
                    label="Open / Close"
                    variant="primary"
                    @click="active = !active" />
            </o-field>
        </p>
    </section>
</template>
