<script setup lang="ts">
import { h } from "vue";
import { useOruga } from "@oruga-ui/oruga-next";
import Form from "./_drawer-form.vue";

const oruga = useOruga();

function imageDrawer(): void {
    const vnode = h("p", { style: { "text-align": "center" } }, [
        h("img", {
            src: "https://avatars2.githubusercontent.com/u/66300512?s=200&v=4",
        }),
    ]);
    oruga.drawer.open({
        ariaLabel: "Image",
        component: vnode,
        backdrop: true,
    });
}

function formDrawer(): void {
    oruga.drawer.open({
        title: "Login",
        closeable: true,
        backdrop: true,
        // the component closes the drawer by emitting a `close` event
        component: Form,
        props: { email: "oruga@example.com" },
    });
}
</script>

<template>
    <section class="odocs-spaced">
        <p>
            <o-button
                label="Open Drawer (HTML)"
                variant="primary"
                aria-haspopup="dialog"
                @click="imageDrawer()" />

            <o-button
                label="Open Drawer (Component)"
                size="medium"
                variant="primary"
                aria-haspopup="dialog"
                @click="formDrawer()" />
        </p>
    </section>
</template>
