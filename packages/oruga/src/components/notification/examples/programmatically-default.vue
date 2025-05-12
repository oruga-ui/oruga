<script setup lang="ts">
import { h } from "vue";
import { useOruga } from "@oruga-ui/oruga-next";

const oruga = useOruga();

function simple(): void {
    oruga.notification.open("Something happened");
}

function success(): void {
    oruga.notification.open({
        message: "Something happened correctly!",
        variant: "success",
        closable: true,
    });
}

function danger(): void {
    oruga.notification.open({
        duration: 5000,
        // here we use a render function to create an inline component (https://vuejs.org/guide/extras/render-function)
        component: h("div", [
            "Something's not good, also I'm on ",
            h("b", "bottom"),
        ]),
        position: "bottom",
        variant: "danger",
        type: "danger",
        closable: true,
        onClose: () => {
            oruga.notification.open("Custom notification closed!");
        },
    });
}

function pause(): void {
    oruga.notification.open({
        message: `I can be paused if you hover over me`,
        variant: "warning",
        type: "warning",
        pauseOnHover: true,
    });
}
</script>

<template>
    <section class="odocs-spaced">
        <p>
            <o-button
                label="Launch notification (default)"
                size="medium"
                @click="simple" />
            <o-button
                label="Launch notification (success)"
                variant="success"
                size="medium"
                @click="success" />
        </p>
        <p>
            <o-button
                label="Launch notification (danger)"
                variant="danger"
                size="medium"
                @click="danger" />
            <o-button
                label="Launch notification (pause on hover)"
                variant="warning"
                size="medium"
                @click="pause" />
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
