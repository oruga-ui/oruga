<template>
    <section>
        <div class="odocs-spaced">
            <o-button
                label="Launch notification (default)"
                size="medium"
                @click="simple" />
            <o-button
                label="Launch notification (custom)"
                variant="success"
                size="medium"
                @click="success" />
            <hr />
            <o-button label="Launch toast" size="medium" @click="toast" />
            <o-button
                label="Launch toast (queued)"
                variant="success"
                size="medium"
                @click="queueToast" />
            <hr />
            <o-button
                label="Launch notification (custom)"
                variant="danger"
                size="medium"
                @click="danger" />
            <o-button
                label="Launch notification (component)"
                variant="warning"
                size="medium"
                @click="component" />
        </div>
    </section>
</template>

<script setup>
import { useProgrammatic } from "../../../../../oruga-next/dist/oruga";
import NotificationForm from "./_notification-form.vue";

const { oruga } = useProgrammatic();

function toast() {
    oruga.notification.open({
        message: "Something happened correctly!",
        rootClass: "toast-notification",
        position: "top",
    });
}

function queueToast() {
    oruga.notification.open({
        message: "Something happened correctly!",
        rootClass: "toast-notification",
        position: "top",
        queue: true,
    });
}

function simple() {
    oruga.notification.open("Something happened");
}

function success() {
    oruga.notification.open({
        message: "Something happened correctly!",
        variant: "success",
        closable: true,
    });
}

function danger() {
    const notif = oruga.notification.open({
        duration: 5000,
        message: `Something's not good, also I'm on <b>bottom</b>`,
        position: "bottom-right",
        variant: "danger",
        closable: true,
        onClose: () => {
            oruga.notification.open("Custom notification closed!");
        },
    });
}

function component() {
    oruga.notification.open({
        component: NotificationForm,
        position: "bottom-right",
        variant: "warning",
        indefinite: true,
    });
}
</script>

<style lang="scss">
.toast-notification {
    margin: 0.5em 0;
    text-align: center;
    box-shadow: 0 1px 4px rgb(0 0 0 / 12%), 0 0 6px rgb(0 0 0 / 4%);
    border-radius: 2em;
    padding: 0.75em 1.5em;
    pointer-events: auto;
    color: rgba(0, 0, 0, 0.7);
    background: #ffdd57;
}
</style>
