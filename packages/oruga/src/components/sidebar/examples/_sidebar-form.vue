<script setup lang="ts">
defineOptions({
    inheritAttrs: false,
});

withDefaults(
    defineProps<{
        /** initial value of the email input */
        email?: string;
        /** initial value of the password input */
        password?: string;
    }>(),
    { email: "", password: "" },
);

defineEmits<{
    close: [event: Event];
}>();
</script>

<template>
    <form action="">
        <header>
            <p>Login</p>
            <o-icon
                clickable
                native-type="button"
                icon="times"
                @click="$emit('close', $event)" />
        </header>

        <section>
            <o-field label="Email">
                <o-input
                    type="email"
                    :value="email"
                    placeholder="Your email"
                    required />
            </o-field>

            <o-field label="Password">
                <o-input
                    type="password"
                    :value="password"
                    password-reveal
                    placeholder="Your password"
                    required />
            </o-field>

            <o-field>
                <o-checkbox label="Remember me" />
            </o-field>
        </section>

        <footer>
            <o-button
                label="Close"
                type="button"
                @click="$emit('close', $event)" />
            <o-button label="Login" variant="primary" />
        </footer>
    </form>
</template>

<style scoped>
form {
    padding: 15px;
}

form header {
    display: flex;
    justify-content: space-between;
}
</style>
