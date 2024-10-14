<script setup lang="ts">
import { ref } from "vue";

const time = ref<Date | undefined>(new Date());
</script>

<template>
    <section>
        <o-field label="Select time">
            <o-timepicker v-model="time" placeholder="Click to select...">
                <o-button
                    label="Now"
                    variant="primary"
                    icon-left="clock"
                    @click="time = new Date()" />
                <o-button
                    label="Clear"
                    variant="danger"
                    icon-left="times"
                    outlined
                    @click="time = undefined" />
            </o-timepicker>
        </o-field>
    </section>
</template>

<style scoped>
button {
    margin-left: 0.5rem;
}
</style>
