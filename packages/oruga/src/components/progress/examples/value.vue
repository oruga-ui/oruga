<script setup lang="ts">
function formatSize(value: number): string {
    return `${value} MB of 256 MB`;
}
</script>

<template>
    <section class="odocs-spaced">
        <o-progress :value="32" show-value aria-label="Tasks completed" />

        <o-progress
            :value="6"
            :max="8"
            show-value
            format="percent"
            aria-label="Steps completed" />

        <o-progress
            :value="0.25"
            :max="1"
            show-value
            format="percent"
            locale="de-DE"
            aria-label="Survey completion" />

        <o-progress
            :value="128"
            :max="256"
            show-value
            :formatter="formatSize"
            aria-label="Download progress" />
    </section>
</template>
