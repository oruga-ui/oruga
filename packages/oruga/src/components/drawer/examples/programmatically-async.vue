<script setup lang="ts">
import { useOruga } from "@oruga-ui/oruga-next";

const oruga = useOruga();

async function promptDrawer(): Promise<void> {
    const instance = oruga.drawer.open({
        backdrop: true,
        position: "right",
        title: "Delete item",
        content: "Do you really want to delete the selected item?",
        cancelButton: "No",
        confirmButton: "Yes",
        confirmVariant: "danger",
        closeOnConfirm: true,
    });

    // wait until the drawer got closed, the promise resolves with the arguments of the close event
    const [, returnValue] = await instance.promise;

    oruga.notification.open({
        duration: 5000,
        content: `Drawer closed (${String(returnValue || "dismissed")})`,
        variant: "info",
        position: "top",
        closeable: true,
    });
}
</script>

<template>
    <section class="odocs-spaced">
        <o-button
            label="Open Prompt Drawer"
            size="medium"
            variant="primary"
            aria-haspopup="dialog"
            @click.prevent="promptDrawer()" />
    </section>
</template>
