<script setup lang="ts">
import { ref } from "vue";

const tags = ref<string[]>([]);

function getType(item: string): string {
    const random = "Z".charCodeAt(0) - item.toUpperCase().charCodeAt(0);
    if (random >= 1 && random < 5) {
        return "primary";
    } else if (random >= 6 && random < 10) {
        return "danger";
    } else if (random >= 11 && random < 15) {
        return "warning";
    } else if (random >= 15 && random < 20) {
        return "success";
    } else if (random >= 20 && random < 25) {
        return "info";
    }
    return "";
}
</script>

<template>
    <section>
        <o-field label="Enter some items">
            <o-taginput
                ref="input"
                v-model="tags"
                icon="tag"
                placeholder="Add an item"
                allow-new>
                <template #selected="{ options, removeItem }">
                    <o-button
                        v-for="(item, index) in options"
                        :key="index"
                        :label="item.label"
                        :variant="getType(item.value)"
                        rounded
                        @click="removeItem(index, $event)" />
                </template>
            </o-taginput>
        </o-field>

        <p><b>Items:</b> {{ tags }}</p>
    </section>
</template>
