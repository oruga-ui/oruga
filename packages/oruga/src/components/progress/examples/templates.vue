<script setup lang="ts">
const files = ["report.pdf", "invoice.pdf", "photo.png", "notes.txt"];
const uploaded = 3;
</script>

<template>
    <section>
        <o-progress :value="uploaded" :max="files.length" aria-label="Upload">
            <template #default="{ value }">
                {{ value }} of {{ files.length }} files uploaded
            </template>
        </o-progress>
    </section>
</template>
