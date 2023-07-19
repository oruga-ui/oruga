<script setup>
import { h } from "vue";
import { useProgrammatic } from "../../../../../oruga-next/dist/oruga";
import ModalForm from "./_modal-form.vue";

const { oruga } = useProgrammatic();

function imageModal() {
    const vnode = h("p", { style: { "text-align": "center" } }, [
        h("img", {
            src: "https://avatars2.githubusercontent.com/u/66300512?s=200&v=4",
        }),
    ]);
    oruga.modal.open({
        content: [vnode],
    });
}

function cardModal() {
    oruga.modal.open({
        component: ModalForm,
        trapFocus: true,
    });
}
</script>

<template>
    <section>
        <div class="odocs-spaced">
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
        </div>
    </section>
</template>
