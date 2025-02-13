<script setup lang="ts">
import { h } from "vue";
import { useOruga } from "@oruga-ui/oruga-next";
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
    });
}

function formSidebar(): void {
    oruga.sidebar.open({
        component: Form,
        fullheight: true,
        overlay: true,
    });
}
</script>

<template>
    <section class="odocs-spaced">
        <p>
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
        </p>
    </section>
</template>
