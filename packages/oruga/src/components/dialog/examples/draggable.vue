<script setup lang="ts">
import { ref } from "vue";

const isActive = ref(false);
</script>

<template>
    <section>
        <o-button
            label="Open Draggable Dialog"
            size="medium"
            variant="primary"
            :aria-expanded="isActive"
            aria-controls="draggable-dialog"
            @click="isActive = true" />

        <o-dialog
            id="draggable-dialog"
            v-model:active="isActive"
            draggable
            closeable>
            <template #title>Drag me by the header</template>

            <template #subtitle>Click and drag the header to reposition</template>

            <template #content>
                <p>
                    This dialog can be repositioned by clicking and dragging the
                    header. The dialog will stay within the viewport boundaries.
                </p>
            </template>

            <template #footer="{ close }">
                <o-button label="Close" @click="close()" />
            </template>
        </o-dialog>
    </section>
</template>
