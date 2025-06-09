<script setup lang="ts">
import { useOruga } from "@oruga-ui/oruga-next";
import ModalForm from "./_modal-form-async.vue";

const oruga = useOruga();

const promptModal = async (): Promise<void> => {
    const instance = oruga.modal.open({
        component: ModalForm,
        props: {
            title: "Ship sprockets?",
            message: "Do you really want me to ship the selected sprockets?",
        },
        trapFocus: true,
    });

    // wait until the modal got closed
    const result = await instance.promise;

    oruga.notification.open({
        duration: 5000,
        message: "Modal dialog returned " + JSON.stringify(result),
        variant: "info",
        position: "top",
        closeable: true,
    });
};

const promptModalCloseAll = async (): Promise<void> => {
    const instance = oruga.modal.open({
        component: ModalForm,
        props: {
            title: "Close All test",
            message:
                "There is a 3 second timeout that will close all programmatic modals",
        },
        trapFocus: true,
    });

    setTimeout(() => oruga.modal.closeAll({ action: "closeAll" }), 3 * 1000);

    // wait until the modal got closed
    const result = await instance.promise;

    oruga.notification.open({
        duration: 5000,
        message: "Modal dialog returned " + JSON.stringify(result),
        variant: "info",
        position: "top",
        closeable: true,
    });
};
</script>

<template>
    <section class="odocs-spaced">
        <p>
            <o-button
                label="Open prompt"
                size="medium"
                variant="primary"
                @click.prevent="promptModal()" />
            <o-button
                label="Open prompt (closeAll timeout)"
                size="medium"
                variant="primary"
                @click.prevent="promptModalCloseAll()" />
        </p>
    </section>
</template>
