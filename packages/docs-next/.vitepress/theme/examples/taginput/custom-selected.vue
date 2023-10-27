<script setup>
import { ref } from "vue";

const items = ref([]);

function getType(item) {
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
}
</script>

<template>
    <section>
        <o-field label="Enter some items">
            <o-taginput
                ref="input"
                v-model="items"
                icon="tag"
                placeholder="Add an item">
                <template #selected="{ items }">
                    <o-button
                        v-for="(item, index) in items"
                        :key="index"
                        :label="item"
                        native-type="button"
                        :variant="getType(item)"
                        rounded
                        @click="$refs.input.removeItem(index, $event)" />
                </template>
            </o-taginput>
        </o-field>
        <p><b>Items:</b> {{ items }}</p>
    </section>
</template>
