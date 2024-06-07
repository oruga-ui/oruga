<script setup lang="ts">
import { h } from "vue";
// @ts-expect-error Examples are loaded differently.
import { useOruga } from "../../../../../oruga/dist/oruga";
import Form from "./_sidebar-form.vue";

const oruga = useOruga();

function imageSidebar(): void {
    const vnode = h("p", { style: { "text-align": "center" } }, [
        h("img", {
            src: "https://avatars2.githubusercontent.com/u/66300512?s=200&v=4",
        }),
    ]);
    oruga.sidebar.open({
        component: vnode,
        fullheight: true,
        overlay: true,
        destroyOnHide: true,
    });
}

function formSidebar(): void {
    oruga.sidebar.open({
        component: Form,
        fullheight: true,
        overlay: true,
        destroyOnHide: true,
    });
}
</script>

<template>
    <section class="odocs-spaced">
        <o-button
            label="Open Sidebar (HTML)"
            size="medium"
            variant="primary"
            @click="imageSidebar()" />

        <o-button
            label="Open Sidebar (Component)"
            size="medium"
            variant="primary"
            @click="formSidebar()" />
    </section>
</template>
