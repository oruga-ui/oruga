<script setup lang="ts">
import { h } from "vue";
import { useOruga } from "@oruga-ui/oruga-next";
import ModalForm from "./_modal-form.vue";

const oruga = useOruga();

function imageModal(): void {
    const vnode = h("p", { style: { "text-align": "center" } }, [
        h("img", {
            src: "https://avatars2.githubusercontent.com/u/66300512?s=200&v=4",
        }),
    ]);

    oruga.modal.open({
        content: [vnode],
    });
}

function cardModal(): void {
    oruga.modal.open({
        component: ModalForm,
        trapFocus: true,
        cancelable: false,
    });
}
</script>

<template>
    <section class="odocs-spaced">
        <o-button
            label="Open modal (HTML)"
            size="medium"
            variant="primary"
            @click="imageModal()" />

        <o-button
            label="Open modal (Component)"
            size="medium"
            variant="primary"
            @click="cardModal()" />
    </section>
</template>
