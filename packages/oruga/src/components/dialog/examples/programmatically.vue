<script setup lang="ts">
import { h } from "vue";
import { useOruga } from "@oruga-ui/oruga-next";

const oruga = useOruga();

function openDialog(): void {
    oruga.dialog.open({
        component: ModalForm,
        cancelable: false,
    });
}
</script>

<template>
    <section class="odocs-spaced">
        <p>
            <o-button
                label="Open Dialog"
                size="medium"
                variant="primary"
                @click.prevent="openDialog()" />
        </p>
    </section>
</template>
