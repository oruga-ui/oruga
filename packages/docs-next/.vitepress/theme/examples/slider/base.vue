<script setup>
import { ref } from "vue";

const value = ref(5);
</script>

<template>
    <section>
        <o-field label="Simple">
            <o-slider v-model="value" />
        </o-field>

        <o-field label="Warning">
            <o-slider v-model="value" variant="warning" />
        </o-field>

        <o-field label="Large">
            <o-slider v-model="value" size="large" />
        </o-field>

        <o-field label="Disabled">
            <o-slider :value="30" disabled />
        </o-field>
    </section>
</template>
