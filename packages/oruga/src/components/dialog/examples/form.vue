<script setup lang="ts">
import { ref } from "vue";

const isActive = ref(false);

function onClose(): void {
    alert("close");
}
function onLogin(): void {
    alert("login");
}
</script>

<template>
    <o-button
        label="Open Form Dialog"
        size="medium"
        variant="primary"
        @click="isActive = true" />

    <o-dialog
        v-slot="{ close, confirm }"
        v-model:active="isActive"
        :backdrop="false"
        title="Login"
        closeable
        @close="onClose"
        @confirm="onLogin">
        <form method="dialog">
            <o-field label="Email">
                <o-input
                    type="email"
                    autofocus
                    placeholder="Your email"
                    required />
            </o-field>

            <o-field label="Password">
                <o-input
                    type="password"
                    password-reveal
                    placeholder="Your password"
                    required />
            </o-field>

            <o-field>
                <o-checkbox label="Remember me" />
            </o-field>

            <div style="display: flex; align-items: center; gap: 5px">
                <o-button type="button" label="Close" @click="close" />
                <o-button label="Login" variant="primary" @click="confirm" />
            </div>
        </form>
    </o-dialog>
</template>
