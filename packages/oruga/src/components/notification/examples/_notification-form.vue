<script setup lang="ts">
defineOptions({
    inheritAttrs: false,
});

defineProps({
    email: { type: String, default: "" },
    password: { type: String, default: "" },
});

defineEmits<{
    close: [value: { action: string; method?: string }];
}>();
</script>

<template>
    <form action="">
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">Login</p>
                <o-icon
                    clickable
                    native-type="button"
                    icon="times"
                    @click="
                        $emit('close', { action: 'cancel', method: 'x' })
                    " />
            </header>
            <section class="modal-card-body">
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
                    <o-checkbox>Remember me</o-checkbox>
                </o-field>
            </section>
            <footer class="modal-card-foot">
                <o-button
                    label="Close"
                    type="button"
                    @click="
                        $emit('close', { action: 'cancel', method: 'close' })
                    " />
                <o-button label="Login" variant="primary" />
            </footer>
        </div>
    </form>
</template>

<style scoped>
.modal-card {
    display: flex;
    flex-direction: column;
    max-height: calc(100vh - 160px);
    overflow: auto;
    width: 100%;
}
@media screen and (min-width: 769px) {
    .modal-card {
        margin: 0 auto;
        max-height: calc(100vh - 40px);
    }
}

.modal-card .modal-card-foot,
.modal-card .modal-card-head {
    align-items: center;
    background-color: #f5f5f5;
    display: flex;
    flex-shrink: 0;
    justify-content: flex-start;
    padding: 20px;
    position: relative;
}

.modal-card .modal-card-head {
    border-bottom: 1px solid #dbdbdb;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
}
.modal-card .modal-card-head .modal-card-title {
    color: #363636;
    flex-grow: 1;
    flex-shrink: 0;
    font-size: 1.5rem;
    line-height: 1;
    margin: 0;
}

.modal-card .modal-card-body {
    -webkit-overflow-scrolling: touch;
    background-color: #fff;
    flex-grow: 1;
    flex-shrink: 1;
    overflow: auto;
    padding: 20px;
}

.modal-card .modal-card-foot {
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
    border-top: 1px solid #dbdbdb;
}
.modal-card .modal-card-foot button:not(:last-child) {
    margin-right: 0.5em;
}
</style>
