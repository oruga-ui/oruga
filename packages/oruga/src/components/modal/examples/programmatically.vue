<script setup lang="ts">
import { h } from "vue";
import { useOruga } from "@oruga-ui/oruga-next";
import ModalForm from "./_modal-form.vue";

const oruga = useOruga();

function imageModal(): void {
    // here we use a render function to create an dynamic inline component (https://vuejs.org/guide/extras/render-function)
    const vnode = h("p", { style: { "text-align": "center" } }, [
        h("img", {
            alt: "Oruga logo",
            src: "https://avatars2.githubusercontent.com/u/66300512?s=200&v=4",
        }),
    ]);

    oruga.modal.open({
        component: vnode,
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
        <p>
            <o-button
                label="Open modal (HTML)"
                size="medium"
                variant="primary"
                @click.prevent="imageModal()" />

            <o-button
                label="Open modal (Component)"
                size="medium"
                variant="primary"
                @click.prevent="cardModal()" />
        </p>
    </section>
</template>
