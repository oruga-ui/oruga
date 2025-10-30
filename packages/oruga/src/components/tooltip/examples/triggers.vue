<script setup lang="ts">
import { ref } from "vue";

const active = ref(true);
</script>

<template>
    <section class="odocs-spaced">
        <p>
            <o-field>
                <o-switch v-model="active" label="Toggle" />
            </o-field>

            <o-tooltip label="I'm never closing" open-on-click close-on-outside>
                <o-button label="Click me" />
            </o-tooltip>

            <o-tooltip
                label="I'm never closing"
                open-on-contextmenu
                close-on-outside>
                <o-button label="Right click me" />
            </o-tooltip>

            <o-tooltip
                label="I'm never closing"
                :active="active"
                always
                position="top">
                <o-button label="Always" />
            </o-tooltip>

            <o-tooltip
                variant="danger"
                label="Tooltip right"
                position="right"
                :open-on-click="false"
                :open-on-contextmenu="false"
                :open-on-focus="false"
                :open-on-hover="false"
                :closeable="false"
                :close-on-escape="false"
                :close-on-outside="false"
                :active="active">
                <o-button label="Toggled" />
            </o-tooltip>
        </p>
    </section>
</template>
