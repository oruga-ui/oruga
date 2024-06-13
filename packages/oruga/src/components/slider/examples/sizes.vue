<script setup lang="ts">
import { ref } from "vue";

const value = ref(15);
</script>

<template>
    <section>
        <o-field label="Small">
            <o-slider v-model="value" size="small" />
        </o-field>

        <o-field label="Default">
            <o-slider v-model="value" />
        </o-field>

        <o-field label="Medium">
            <o-slider v-model="value" size="medium" />
        </o-field>

        <o-field label="Large">
            <o-slider v-model="value" size="large" />
        </o-field>
    </section>
</template>
