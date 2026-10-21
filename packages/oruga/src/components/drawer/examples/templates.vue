<script setup lang="ts">
import { ref } from "vue";

const isNamedActive = ref(false);
const isFooterActive = ref(false);
const result = ref<string>();

function onClose(_event: Event, value?: string): void {
    // an empty return value means the drawer got dismissed without a button
    result.value = value || "dismissed";
}
</script>

<template>
    <section>
        <p>
            <o-button
                label="Open Drawer (named slots)"
                variant="primary"
                aria-haspopup="dialog"
                @click="isNamedActive = true" />

            <o-button
                label="Open Drawer (footer slot)"
                variant="primary"
                aria-haspopup="dialog"
                @click="isFooterActive = true" />
        </p>

        <p v-if="result" role="status">Closed with: {{ result }}</p>

        <!-- every part of the drawer can be replaced by a named slot -->
        <o-drawer
            v-model:active="isNamedActive"
            backdrop
            closeable
            close-on-confirm
            cancel-button="Dismiss"
            confirm-button="Mark all as read"
            button-position="right"
            @close="onClose">
            <template #title>Notifications</template>
            <template #subtitle>You have 3 unread messages</template>

            <!-- custom close icon, the label of the button is set with `aria-close-label` -->
            <template #close>&times;</template>

            <ul>
                <li>Your order has been shipped</li>
                <li>A new version is available</li>
                <li>Someone replied to your comment</li>
            </ul>

            <!-- only text, no interactive content inside of the buttons -->
            <template #cancelButton>
                <span>Not now</span>
            </template>
            <template #confirmButton>
                <strong>Mark all as read</strong>
            </template>
        </o-drawer>

        <!-- the footer slot gets the close and confirm function -->
        <o-drawer
            v-model:active="isFooterActive"
            backdrop
            closeable
            close-on-confirm
            position="right"
            title="Shopping cart"
            subtitle="2 items"
            @close="onClose">
            <ul>
                <li>1x Lightweight UI components</li>
                <li>1x Vue.js sticker</li>
            </ul>

            <template #footer="{ close, confirm }">
                <o-button
                    label="Continue shopping"
                    @click="close('continue')" />
                <o-button label="Checkout" variant="primary" @click="confirm" />
            </template>
        </o-drawer>
    </section>
</template>
