<script setup lang="ts">
import { h, useTemplateRef } from "vue";
import { useOruga } from "@oruga-ui/oruga-next";

const oruga = useOruga();

const container = useTemplateRef("container");

function openTextPopover(): void {
    oruga.popover.open(
        {
            content: "This overlay can have some usefull information.",
        },
        container,
    );
}

function openImagePopover(): void {
    // here we use a render function to create an dynamic inline component (https://vuejs.org/guide/extras/render-function)
    const vnode = h("img", {
        alt: "This is the Oruga Logo!",
        src: "https://avatars2.githubusercontent.com/u/66300512?s=200&v=4",
        style: { "text-align": "center" },
    });

    oruga.popover.open(
        {
            position: "bottom",
            backdrop: true,
            component: vnode,
        },
        container,
    );
}
</script>

<template>
    <section class="odocs-spaced">
        <p>
            <o-button
                label="Open Text Popover"
                size="medium"
                variant="primary"
                @click="openTextPopover()" />

            <o-button
                label="Open Image Popover"
                size="medium"
                variant="primary"
                @click="openImagePopover()" />
        </p>

        <div ref="container" style="background-color: var(--vp-c-brand-3)">
            Container with programmatic popover
        </div>
    </section>
</template>
