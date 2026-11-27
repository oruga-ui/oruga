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
    <form action="" style="padding: 15px">
        <header style="margin-bottom: 25px">
            <p style="font-size: x-large; margin: 0; font-weight: bold">
                Login
            </p>
            <p>Welcome back !</p>
            <o-icon
                style="position: absolute; top: 0.7rem; right: 0.7rem"
                clickable
                icon="times"
                @click="$emit('close', $event)" />
        </header>

        <section>
            <o-field label="Email">
                <o-input
                    type="email"
                    :value="email"
                    placeholder="Your email"
                    required
                    expanded />
            </o-field>

            <o-field label="Password">
                <o-input
                    type="password"
                    :value="password"
                    password-reveal
                    placeholder="Your password"
                    required
                    expanded />
            </o-field>

            <o-field>
                <o-checkbox label="Remember me" />
            </o-field>
        </section>

        <footer style="margin-top: 15px">
            <o-button
                style="margin-right: 4px"
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
