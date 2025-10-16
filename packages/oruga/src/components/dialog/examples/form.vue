<script setup lang="ts">
function onClose(): void {
    alert("close");
}
function onLogin(): void {
    alert("login");
}
</script>

<template>
    <o-dialog title="Login" closeable @close="onClose">
        <template #content>
            <form action="">
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

                <div class="dialog-footer">
                    <o-button
                        label="Close"
                        type="button"
                        @click.prevent="onClose" />
                    <o-button
                        label="Login"
                        variant="primary"
                        @click.prevent="onLogin" />
                </div>
            </form>
        </template>
    </o-dialog>
</template>

<style scoped>
.dialog-footer {
    display: flex;
    align-items: center;
    gap: 5px;
}
</style>
