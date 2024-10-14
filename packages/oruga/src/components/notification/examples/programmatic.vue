<script setup lang="ts">
import { useOruga } from "@oruga-ui/oruga-next";
import NotificationForm from "./_notification-form.vue";

const oruga = useOruga();

async function component(): Promise<void> {
    const instance = oruga.programmatic.open({
        component: NotificationForm,
        target: "#notification",
    });

    // wait until the notification got closed
    const result = await instance.promise;

    oruga.notification.open({
        duration: 5000,
        message: "Modal dialog returned " + JSON.stringify(result),
        variant: "info",
        position: "top",
        closable: true,
    });
}
</script>

<template>
    <section>
        <o-button
            label="Launch notification (component)"
            variant="warning"
            size="medium"
            @click="component" />
    </section>
</template>

<style>
.toast-notification {
    margin: 0.5em 0;
    text-align: center;
    box-shadow:
        0 1px 4px rgb(0 0 0 / 12%),
        0 0 6px rgb(0 0 0 / 4%);
    border-radius: 2em;
    padding: 0.75em 1.5em;
    pointer-events: auto;
    color: rgba(0, 0, 0, 0.7);
    background: #ffdd57;
}
</style>
