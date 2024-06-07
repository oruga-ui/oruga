<script setup lang="ts">
import { reactive } from "vue";

const settings = reactive({
    rounded: false,
    tooltip: true,
    variant: "warning",
    size: "medium",
});
</script>

<template>
    <section>
        <o-field grouped>
            <o-field>
                <o-switch v-model="settings.rounded" label="Rounded" />
            </o-field>
            <o-field>
                <o-switch v-model="settings.tooltip" label="With Tooltip" />
            </o-field>
            <o-field label="Size">
                <o-select v-model="settings.size">
                    <option value="small">small</option>
                    <option value="default">default</option>
                    <option value="medium">medium</option>
                    <option value="large">large</option>
                </o-select>
            </o-field>
            <o-field label="Variant">
                <o-select v-model="settings.variant">
                    <option value="default">default</option>
                    <option value="primary">primary</option>
                    <option value="success">success</option>
                    <option value="info">info</option>
                    <option value="warning">warning</option>
                    <option value="danger">danger</option>
                </o-select>
            </o-field>
        </o-field>

        <o-field label="Tooltip type & Default Variant">
            <o-slider
                :rounded="settings.rounded"
                :tooltip="settings.tooltip"
                :variant="settings.variant"
                :size="settings.size" />
        </o-field>
    </section>
</template>
