<script setup lang="ts">
function onClose(): void {
    alert("close");
}
function onLogin(): void {
    alert("login");
}
</script>

<template>
    <form action="">
        <o-card title="Login" closeable @close="onClose">
            <template #content>
                <o-field label="Email">
                    <o-input type="email" placeholder="Your email" required />
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
            </template>

            <template #footer>
                <div class="card-footer">
                    <o-button
                        label="Close"
                        type="button"
                        @click.prevent="onClose" />
                    <o-button
                        label="Login"
                        variant="primary"
                        @click.prevent="onLogin" />
                </div>
            </template>
        </o-card>
    </form>
</template>

<style scoped>
.card-footer {
    display: flex;
    align-items: center;
}
</style>
