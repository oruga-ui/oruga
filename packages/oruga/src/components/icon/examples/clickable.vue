<script setup lang="ts">
import { ref } from "vue";

const clicks = ref(0);
</script>

<template>
    <section class="odocs-spaced">
        <p>
            <o-icon
                pack="fas"
                icon="trash"
                variant="danger"
                clickable
                aria-label="Delete"
                @click="clicks++" />
        </p>

        <p><b>Delete clicked:</b> {{ clicks }}</p>
    </section>
</template>
