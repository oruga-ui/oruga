<script setup>
import { ref } from "vue";

const active = ref(true);
</script>

<template>
    <section>
        <o-button label="Toggle" @click="active = !active" />
        <hr />
        <div class="odocs-spaced">
            <o-tooltip label="I'm never closing" :active="active" always>
                <o-button label="Always" />
            </o-tooltip>

            <o-tooltip label="Tooltip right" position="right" :active="active">
                <o-button label="Right" />
            </o-tooltip>
        </div>
    </section>
</template>
