<script setup lang="ts">
defineProps({
    email: { type: String, default: "" },
    password: { type: String, default: "" },
});

defineEmits(["close"]);
</script>

<template>
    <form action="">
        <header>
            <p>Login</p>
            <o-icon
                clickable
                native-type="button"
                icon="times"
                @click="$emit('close')" />
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
            <o-button label="Close" type="button" @click="$emit('close')" />
            <o-button label="Login" variant="primary" />
        </footer>
    </form>
</template>

<style scoped lang="scss">
form {
    padding: 15px;

    header {
        display: flex;
        justify-content: space-between;
    }
}
</style>
