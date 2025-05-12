<script setup lang="ts">
import { h, ref } from "vue";
import { useOruga, type ProgrammaticExpose } from "@oruga-ui/oruga-next";

const oruga = useOruga();

function toast(): void {
    oruga.notification.open({
        rootClass: "toast toast-notification",
        message: "Something happened correctly!",
        position: "top",
        queue: true,
        rounded: true,
    });
}

function success(): void {
    oruga.notification.open({
        rootClass: "toast toast-notification",
        message: "Something happened correctly!",
        variant: "success",
        queue: true,
        rounded: true,
    });
}

function danger(): void {
    oruga.notification.open({
        rootClass: "toast toast-notification",
        // here we use a render function to create an inline component (https://vuejs.org/guide/extras/render-function)
        component: h("div", [
            "Something's not good, also I'm on ",
            h("b", "bottom"),
        ]),
        position: "bottom",
        variant: "danger",
        queue: true,
        rounded: true,
        duration: 5000,
    });
}

function queueToast(): void {
    oruga.notification.open({
        rootClass: "toast toast-notification",
        message: "Something happened correctly!",
        position: "top",
        queue: true,
        rounded: true,
    });
}

function pause(): void {
    oruga.notification.open({
        rootClass: "toast toast-notification",
        message: `I can be paused if you hover over me`,
        variant: "warning",
        pauseOnHover: true,
        duration: 5000,
        queue: true,
        rounded: true,
    });
}

const infiniteToast = ref<ProgrammaticExpose>();

function infinite(): void {
    infiniteToast.value = oruga.notification.open({
        rootClass: "toast toast-notification",
        message: `I won't close until you explicitly close me!`,
        variant: "warning",
        type: "warning",
        infinite: true,
        closable: true,
        rounded: true,
    });

    // cleanup ref after toast got closed
    infiniteToast.value.promise.then(() => {
        infiniteToast.value = undefined;
    });
}

function closeIndefinite(): void {
    // close infinite toast
    if (infiniteToast.value) infiniteToast.value.close();
}
</script>

<template>
    <section class="odocs-spaced">
        <p>
            <o-button
                label="Launch toast (default)"
                size="medium"
                @click="toast" />
            <o-button
                label="Launch toast (success)"
                variant="success"
                size="medium"
                @click="success" />
            <o-button
                label="Launch toast (danger)"
                variant="danger"
                size="medium"
                @click="danger" />
        </p>

        <p>
            <o-button
                label="Launch toast (queued)"
                variant="primary"
                size="medium"
                @click="queueToast" />
            <o-button
                label="Launch toast (pause on hover)"
                variant="secondary"
                size="medium"
                @click="pause" />
            <o-button
                label="Launch toast (infinite)"
                variant="warning"
                size="medium"
                @click="infinite" />
            <o-button
                v-if="infiniteToast"
                label="close toast (infinite)"
                variant="danger"
                size="medium"
                @click="closeIndefinite" />
        </p>
    </section>
</template>

<style>
.toast-notification {
    margin: 0.5em 0;
    text-align: center;
    box-shadow:
        0 1px 4px rgb(0 0 0 / 12%),
        0 0 6px rgb(0 0 0 / 4%);
    border-radius: 2em;
    padding: 0.75em 1.5em;
    pointer-events: auto;
    color: rgba(0, 0, 0, 0.7);
    background: #ffdd57;
}
</style>
