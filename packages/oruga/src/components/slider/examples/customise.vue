<script setup lang="ts">
import { ref } from "vue";

const rounded = ref(false);
const tooltip = ref(true);
const variant = ref("warning");
const size = ref("medium");
</script>

<template>
    <section>
        <o-field grouped>
            <o-field>
                <o-switch v-model="rounded" label="Rounded" />
            </o-field>
            <o-field>
                <o-switch v-model="tooltip" label="With Tooltip" />
            </o-field>
            <o-field label="Size">
                <o-select v-model="size">
                    <option value="small">small</option>
                    <option value="default">default</option>
                    <option value="medium">medium</option>
                    <option value="large">large</option>
                </o-select>
            </o-field>
            <o-field label="Variant">
                <o-select v-model="variant">
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
                :rounded="rounded"
                :tooltip="tooltip"
                :variant="variant"
                :size="size" />
        </o-field>
    </section>
</template>
