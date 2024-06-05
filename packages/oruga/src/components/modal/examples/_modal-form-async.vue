<script setup lang="ts">
defineProps({
    title: { type: String, default: "" },
    message: { type: String, default: "" },
});

defineEmits(["close"]);
</script>

<template>
    <form action="">
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">{{ title }}</p>
                <o-icon
                    clickable
                    native-type="button"
                    icon="times"
                    @click="
                        $emit('close', { action: 'cancel', method: 'x' })
                    " />
            </header>
            <section class="modal-card-body">
                <p>{{ message }}</p>
            </section>
            <footer class="modal-card-foot">
                <o-button
                    label="No"
                    @click="$emit('close', { action: 'no' })" />
                <o-button
                    label="Yes"
                    variant="primary"
                    @click="$emit('close', { action: 'yes' })" />
            </footer>
        </div>
    </form>
</template>

<style lang="scss" scoped>
.modal-card {
    display: flex;
    flex-direction: column;
    max-height: calc(100vh - 160px);
    overflow: auto;
    width: 100%;

    @media screen and (min-width: 769px) {
        margin: 0 auto;
        max-height: calc(100vh - 40px);
        width: 640px;
    }

    .modal-card-foot,
    .modal-card-head {
        align-items: center;
        background-color: #f5f5f5;
        display: flex;
        flex-shrink: 0;
        justify-content: flex-start;
        padding: 20px;
        position: relative;
    }
    .modal-card-head {
        border-bottom: 1px solid #dbdbdb;
        border-top-left-radius: 6px;
        border-top-right-radius: 6px;

        .modal-card-title {
            color: #363636;
            flex-grow: 1;
            flex-shrink: 0;
            font-size: 1.5rem;
            line-height: 1;
            margin: 0;
        }
    }
    .modal-card-body {
        -webkit-overflow-scrolling: touch;
        background-color: #fff;
        flex-grow: 1;
        flex-shrink: 1;
        overflow: auto;
        padding: 20px;
    }

    .modal-card-foot {
        border-bottom-left-radius: 6px;
        border-bottom-right-radius: 6px;
        border-top: 1px solid #dbdbdb;

        button:not(:last-child) {
            margin-right: 0.5em;
        }
    }
}
</style>
