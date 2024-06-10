<script setup lang="ts">
import { ref } from "vue";

const tags = ref(["Pistoia", "Valdinievole"]);
</script>

<template>
    <section>
        <o-field label="Add some items">
            <o-taginput
                v-model="tags"
                icon="tag"
                placeholder="Add an item"
                aria-close-label="Delete this item" />
        </o-field>

        <p><b>Items:</b> {{ tags }}</p>
    </section>
</template>
