<script setup>
import { reactive } from "vue";

const clickMe = () => {
    alert("Clicked!");
};

const settings = reactive({
    rounded: false,
    variant: "success",
    size: "medium",
});
</script>

<template>
    <section>
        <o-field grouped>
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
            <o-field label="Rounded">
                <o-switch v-model="settings.rounded" />
            </o-field>
        </o-field>

        <o-button
            :variant="settings.variant"
            :size="settings.size"
            :rounded="settings.rounded"
            @click="clickMe">
            Click Me
        </o-button>
    </section>
</template>
