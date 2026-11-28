<script setup lang="ts">
import { ref } from "vue";

const value = ref(40);
</script>

<template>
    <section class="odocs-spaced">
        <o-progress :value="value" aria-label="Upload progress" />

        <p>
            <o-button
                label="Decrease"
                :disabled="value <= 0"
                @click="value = Math.max(value - 10, 0)" />
            <o-button
                label="Increase"
                variant="primary"
                :disabled="value >= 100"
                @click="value = Math.min(value + 10, 100)" />
        </p>
    </section>
</template>
