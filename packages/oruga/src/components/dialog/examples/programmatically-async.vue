<script setup lang="ts">
import { useOruga } from "@oruga-ui/oruga-next";

const oruga = useOruga();

const promptDialog = async (): Promise<void> => {
    const instance = oruga.dialog.open({
        backdrop: true,
        closeable: true,
        title: "Ship sprockets?",
        content: "Do you really want me to ship the selected sprockets?",
        cancelButton: "No",
        confirmButton: "Yes",
        confirmVariant: "primary",
        closeOnConfirm: true,
    });

    // wait until the modal got closed
    const result = await instance.promise;

    oruga.notification.open({
        duration: 5000,
        message: "Dialog returned " + JSON.stringify(result),
        variant: "info",
        position: "top",
        closeable: true,
    });
};

const promptTimeoutDialog = async (): Promise<void> => {
    const instance = oruga.dialog.open({
        backdrop: true,
        closeable: true,
        title: "Close All test",
        content:
            "There is a 3 second timeout that will close all programmatic modals",
        cancelButton: "No",
        confirmButton: "Yes",
        confirmVariant: "primary",
        closeOnConfirm: true,
    });

    setTimeout(() => oruga.modal.closeAll(), 3 * 1000);

    // wait until the modal got closed
    const result = await instance.promise;

    oruga.notification.open({
        duration: 5000,
        message: "Dialog returned " + JSON.stringify(result),
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
                label="Open Prompt Dialog"
                size="medium"
                variant="primary"
                @click.prevent="promptDialog()" />
            <o-button
                label="Open Prompt Dialog (with timeout)"
                size="medium"
                variant="primary"
                @click.prevent="promptTimeoutDialog()" />
        </p>
    </section>
</template>
