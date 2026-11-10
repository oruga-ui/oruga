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

            <o-tooltip label="I'm never closing" always position="top">
                <o-button label="Always" />
            </o-tooltip>

            <o-tooltip
                variant="danger"
                label="Tooltip right"
                position="right"
                :active="active">
                <o-button label="Toggled" />
            </o-tooltip>
        </p>
    </section>
</template>
