<script setup lang="ts">
import { OButton } from "@/components/button";
import { ref } from "vue";

const isActive = ref(false);
</script>

<template>
    <section class="odocs-spaced">
        <p>
            <o-dropdown
                :trigger-tag="OButton"
                variant="primary"
                label="Default">
                <o-dropdown-item label="Action" />
                <o-dropdown-item label="Another action" />
                <o-dropdown-item label="Something else" />
            </o-dropdown>

            <o-dropdown open-on-hover>
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

            <o-dropdown
                open-on-contextmenu
                trigger-tag="OButton"
                label="Right click">
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

            <o-dropdown trigger-tag="button">
                <template #trigger>
                    Custom
                    <o-icon variant="success" icon="caret-down" />
                </template>

                <o-dropdown-item label="Action" />
                <o-dropdown-item label="Another action" />
                <o-dropdown-item label="Something else" />
            </o-dropdown>

            <o-dropdown teleport label="Append to body" :trigger-tag="OButton">
                <o-dropdown-item label="Action" />
                <o-dropdown-item label="Another action" />
                <o-dropdown-item label="Something else" />
            </o-dropdown>
        </p>
        <br />
        <p>
            <o-field grouped>
                <o-dropdown v-model:active="isActive" :open-on-click="false">
                    <template #trigger>
                        <i>Click the button beside! </i>
                    </template>

                    <o-dropdown-item label="Action" />
                    <o-dropdown-item label="Another action" />
                    <o-dropdown-item label="Something else" />
                </o-dropdown>

                <o-button
                    label="Open / Close"
                    variant="secondary"
                    @click="isActive = !isActive" />
            </o-field>
        </p>
    </section>
</template>
