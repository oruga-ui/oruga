<script setup lang="ts">
import { ref } from "vue";

const teleport = ref(false);
</script>

<template>
    <section class="odocs-spaced">
        <o-field>
            <o-switch v-model="teleport" label="teleport" />
        </o-field>

        <o-tooltip label="Tooltip right" :teleport="teleport" position="right">
            <o-button label="Right" />
        </o-tooltip>

        <o-tooltip label="Tooltip top" :teleport="teleport" position="top">
            <o-button label="Top" />
        </o-tooltip>

        <o-tooltip
            label="Tooltip bottom"
            :teleport="teleport"
            position="bottom">
            <o-button label="Bottom" />
        </o-tooltip>

        <o-tooltip label="Tooltip left" :teleport="teleport" position="left">
            <o-button label="Left" />
        </o-tooltip>
    </section>
</template>
