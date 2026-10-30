<script setup lang="ts">
import { ref } from "vue";

const isActive = ref(false);

const message = ref("");

function onConfirm(): void {
    message.value = "Logged in";
}

function onClose(_event: Event, returnValue?: string): void {
    // an empty return value means the dialog got dismissed without a button
    if (returnValue !== "confirm") message.value = "Login canceled";
}
</script>

<template>
    <section>
        <o-button
            label="Open Form Dialog"
            variant="primary"
            aria-haspopup="dialog"
            @click="isActive = true" />

        <p v-if="message" role="status">{{ message }}</p>

        <o-dialog
            v-slot="{ close, confirm }"
            v-model:active="isActive"
            title="Login"
            closeable
            close-on-confirm
            @confirm="onConfirm"
            @close="onClose">
            <!--
                The confirm event is triggered by the form submit event,
                so the browser validates the required fields first.
            -->
            <form @submit.prevent="confirm()">
                <o-field label="Email">
                    <o-input
                        type="email"
                        autocomplete="email"
                        autofocus
                        placeholder="Your email"
                        required />
                </o-field>

                <o-field label="Password">
                    <o-input
                        type="password"
                        autocomplete="current-password"
                        password-reveal
                        placeholder="Your password"
                        required />
                </o-field>

                <o-field>
                    <o-checkbox label="Remember me" />
                </o-field>

                <div style="display: flex; align-items: center; gap: 5px">
                    <o-button type="button" label="Close" @click="close()" />
                    <o-button type="submit" label="Login" variant="primary" />
                </div>
            </form>
        </o-dialog>
    </section>
</template>
