<script setup lang="ts">
import { ref } from "vue";

const active = ref(true);
</script>

<template>
    <section>
        <o-field>
            <o-switch v-model="active" label="Toggle" />
        </o-field>

        <div class="odocs-spaced">
            <o-tooltip
                label="I'm never closing"
                :active="active"
                always
                position="bottom">
                <o-button label="Always" />
            </o-tooltip>

            <o-tooltip
                variant="danger"
                label="Tooltip right"
                position="right"
                :active="active">
                <o-button label="Right" />
            </o-tooltip>
        </div>
    </section>
</template>
