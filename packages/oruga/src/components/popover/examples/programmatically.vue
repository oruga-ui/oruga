<script setup lang="ts">
import { h, useTemplateRef } from "vue";
import { useOruga } from "@oruga-ui/oruga-next";

const oruga = useOruga();

const target = useTemplateRef("target");

function openTextPopover(): void {
    oruga.popover.open(
        {
            // the target element the popover will be attached to
            target: target,
            content: "This overlay can have some usefull information.",
        },
        // placing target here again to mount the popover inside the target instead of body
        target,
    );
}

function openImagePopover(): void {
    // here we use a render function to create an dynamic inline component (https://vuejs.org/guide/extras/render-function)
    const vnode = h("img", {
        alt: "This is the Oruga Logo!",
        src: "https://avatars2.githubusercontent.com/u/66300512?s=200&v=4",
    });

    oruga.popover.open({
        target: target,
        position: "bottom",
        backdrop: true,
        component: vnode,
    });
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

        <div ref="target" style="background-color: var(--vp-c-brand-3)">
            Container with programmatic popover
        </div>
    </section>
</template>
