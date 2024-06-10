<script setup lang="ts">
import { h } from "vue";
// @ts-expect-error Examples are loaded differently.
import { useOruga } from "../../../../dist/oruga";
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
        destroyOnHide: true,
    });
}

function cardModal(): void {
    oruga.modal.open({
        component: ModalForm,
        trapFocus: true,
        destroyOnHide: false,
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
