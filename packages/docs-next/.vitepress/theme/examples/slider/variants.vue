<script setup>
import { ref } from "vue";

const value = ref(15);
</script>

<template>
    <section>
        <o-field label="Primary">
            <o-slider
                v-model="value"
                :rounded="true"
                :tooltip="true"
                variant="primary"
                tooltip-variant="primary" />
        </o-field>
        <o-field label="Success">
            <o-slider
                v-model="value"
                :rounded="true"
                :tooltip="true"
                variant="success"
                tooltip-variant="success" />
        </o-field>
        <o-field label="Info">
            <o-slider
                v-model="value"
                :rounded="true"
                :tooltip="true"
                variant="info"
                tooltip-variant="info" />
        </o-field>
        <o-field label="Warning">
            <o-slider
                v-model="value"
                :rounded="true"
                :tooltip="true"
                variant="warning"
                tooltip-variant="warning" />
        </o-field>
        <o-field label="Danger">
            <o-slider
                v-model="value"
                :rounded="true"
                :tooltip="true"
                variant="danger"
                tooltip-variant="danger" />
        </o-field>
    </section>
</template>
