<script setup lang="ts">
import { h } from "vue";
import { useOruga } from "@oruga-ui/oruga-next";

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
        component: vnode,
        imageAlt: "Oruga logo",
        imageSrc: "https://avatars2.githubusercontent.com/u/66300512?s=200&v=4",
    });
}
</script>

<template>
    <section class="odocs-spaced">
        <p>
            <o-button
                label="Open Confirm Dialog"
                size="medium"
                variant="primary"
                @click="openConfirmDialog()" />

            <o-button
                label="Open Oruga Image"
                size="medium"
                variant="primary"
                @click="openImageDialog()" />
        </p>
    </section>
</template>
