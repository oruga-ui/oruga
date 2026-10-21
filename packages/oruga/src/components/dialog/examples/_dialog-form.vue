<script setup lang="ts">
defineOptions({
    inheritAttrs: false,
});

defineProps({
    email: { type: String, default: "" },
});

const emit = defineEmits<{
    /** close the dialog with an optional return value */
    close: [returnValue?: string];
}>();

function onSubmit(): void {
    // the native form validation has already succeeded here
    emit("close", "login");
}
</script>

<template>
    <form @submit.prevent="onSubmit">
        <o-field label="Email">
            <o-input
                type="email"
                autocomplete="email"
                autofocus
                :model-value="email"
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

        <div style="display: flex; align-items: center; gap: 5px">
            <o-button
                type="button"
                label="Cancel"
                @click="emit('close', 'cancel')" />
            <o-button type="submit" label="Login" variant="primary" />
        </div>
    </form>
</template>
