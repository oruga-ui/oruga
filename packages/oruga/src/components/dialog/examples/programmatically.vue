<script setup lang="ts">
import { h } from "vue";
import { useOruga } from "@oruga-ui/oruga-next";
import DialogForm from "./_dialog-form.vue";

const oruga = useOruga();

function openConfirmDialog(): void {
    oruga.dialog.open({
        title: "Save Dialog",
        content: "Are you sure you want to save this?",
        confirmButton: "Save",
        confirmVariant: "success",
        cancelButton: "Cancel",
        buttonPosition: "right",
    });
}

function openImageDialog(): void {
    // here we use a render function to create an dynamic inline component (https://vuejs.org/guide/extras/render-function)
    const vnode = h("p", { style: { "text-align": "center" } }, [
        "This is the Oruga Logo!",
    ]);

    oruga.dialog.open({
        // a dialog without a title needs an accessible name
        ariaLabel: "Oruga logo",
        component: vnode,
        closeOnBackdrop: true,
        closeOnEscape: true,
        imageAlt: "Oruga logo",
        imageSrc: "https://avatars2.githubusercontent.com/u/66300512?s=200&v=4",
    });
}

function openFormDialog(): void {
    oruga.dialog.open({
        title: "Login",
        backdrop: true,
        closeable: true,
        // the component closes the dialog by emitting a `close` event
        component: DialogForm,
        props: { email: "oruga@example.com" },
    });
}
</script>

<template>
    <section class="odocs-spaced">
        <p>
            <o-button
                label="Open Confirm Dialog"
                variant="primary"
                aria-haspopup="dialog"
                @click="openConfirmDialog()" />

            <o-button
                label="Open Oruga Image"
                variant="primary"
                aria-haspopup="dialog"
                @click="openImageDialog()" />

            <o-button
                label="Open Form (Component)"
                variant="primary"
                aria-haspopup="dialog"
                @click="openFormDialog()" />
        </p>
    </section>
</template>
