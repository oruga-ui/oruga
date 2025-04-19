<script setup lang="ts">
import { ref } from "vue";

import OCollapse from "../Collapse.vue";

const isOpen = ref(0);

const collapses = [
    {
        title: "Title 1",
        text: "Text 1",
    },
    {
        title: "Title 2",
        text: "Text 2",
    },
    {
        title: "Title 3",
        text: "Text 3",
    },
];
</script>

<template>
    <section>
        <o-collapse
            v-for="(collapse, index) of collapses"
            :key="index"
            class="card"
            :data-testid="`collapse-${index}`"
            :open="isOpen == index"
            @open="isOpen = index">
            <template #trigger="props">
                <div>
                    <p>
                        {{ collapse.title }} ({{
                            props.open ? "Open" : "Closed"
                        }})
                    </p>
                </div>
            </template>
            <div :data-testid="`content-${index}`">
                {{ collapse.text }}
            </div>
        </o-collapse>
    </section>
</template>
