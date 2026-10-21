<script setup lang="ts">
import { ref } from "vue";

const isActive = ref(false);
const result = ref<string>();

function onClose(_event: Event, value?: string): void {
    result.value = value || "dismissed";
}
</script>

<template>
    <section>
        <o-button
            label="Open Drawer"
            variant="primary"
            @click="isActive = true" />

        <p v-if="result">Closed with: {{ result }}</p>

        <o-drawer
            v-model:active="isActive"
            backdrop
            closeable
            close-on-confirm
            position="right"
            @close="onClose">
            <template #title>Shopping cart</template>
            <template #subtitle>2 items</template>

            <!-- custom close icon -->
            <template #close>&times;</template>

            <ul>
                <li>1x Lightweight UI components</li>
                <li>1x Vue.js sticker</li>
            </ul>

            <!-- the footer slot gets the close and confirm function -->
            <template #footer="{ close, confirm }">
                <o-button
                    label="Continue shopping"
                    @click="close('continue')" />
                <o-button label="Checkout" variant="primary" @click="confirm" />
            </template>
        </o-drawer>
    </section>
</template>
