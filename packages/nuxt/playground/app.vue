<template>
    <div style="padding: 2rem; font-family: sans-serif">
        <h1>Oruga Nuxt Playground</h1>

        <OButton @click="count++"> Clicked {{ count }} times </OButton>

        <OInput
            v-model="text"
            placeholder="Type something..."
            style="margin-top: 1rem; display: block" />
        <p>You typed: {{ text }}</p>
    </div>
</template>

<script setup lang="ts">
const count = ref(0);
const text = ref("");
</script>
