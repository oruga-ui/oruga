<script setup lang="ts">
import { h } from "vue";
import { useOruga } from "@oruga-ui/oruga-next";

const oruga = useOruga();

function simple(): void {
    oruga.notification.open("Something happened");
}

function success(): void {
    oruga.notification.open({
        content: "Something happened correctly!",
        variant: "success",
        closeable: true,
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
        closeable: true,
        onClose: () => {
            oruga.notification.open("Custom notification closed!");
        },
    });
}

function pause(): void {
    oruga.notification.open({
        content: `I can be paused if you hover over me`,
        variant: "warning",
        type: "warning",
        pauseOnHover: true,
    });
}
</script>

<template>
    <section class="odocs-spaced">
        <p>
            <o-button label="Launch notification (default)" @click="simple" />
        </p>
        <p>
            <o-button
                label="Launch notification (success)"
                variant="success"
                @click="success" />
        </p>
        <p>
            <o-button
                label="Launch notification (danger)"
                variant="danger"
                @click="danger" />
        </p>
        <p>
            <o-button
                label="Launch notification (pause on hover)"
                variant="warning"
                @click="pause" />
        </p>
    </section>
</template>
