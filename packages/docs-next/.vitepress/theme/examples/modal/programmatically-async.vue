<script setup>
import { useOruga } from "../../../../../oruga-next/dist/oruga";
import ModalForm from "./_modal-form-async.vue";

const oruga = useOruga();

const promptModal = async () => {
    const instance = oruga.modal.open({
        component: ModalForm,
        props: {
            title: "Ship sprockets?",
            message: "Do you really want me to ship the selected sprockets?",
        },
        trapFocus: true,
    });
    // Note utilizing the promise requires Promise be supported by the browser
    // If you are running Vue 2 on IE 11 this will not be the case unless you
    // add a polyfill in your build.
    const result = await instance.promise;

    oruga.notification.open({
        duration: 5000,
        message: "Modal dialog returned " + JSON.stringify(result),
        variant: "info",
        position: "top",
        closable: true,
    });
};

const promptModalCloseAll = async () => {
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

    // Note utilizing the promise requires Promise be supported by the browser
    // If you are running Vue 2 on IE 11 this will not be the case unless you
    // add a polyfill in your build.
    const result = await instance.promise;

    oruga.notification.open({
        duration: 5000,
        message: "Modal dialog returned " + JSON.stringify(result),
        variant: "info",
        position: "top",
        closable: true,
    });
};
</script>

<template>
    <section class="odocs-spaced">
        <o-button
            label="Open prompt"
            size="medium"
            variant="primary"
            @click="promptModal()" />
        <o-button
            label="Open prompt (closeAll timeout)"
            size="medium"
            variant="primary"
            @click="promptModalCloseAll()" />
    </section>
</template>
