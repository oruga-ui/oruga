<script setup lang="ts">
import { ref } from "vue";

const isActive = ref(false);
</script>

<template>
    <section>
        <o-button
            label="Open Dialog"
            variant="primary"
            aria-haspopup="dialog"
            @click="isActive = true" />

        <o-dialog v-model:active="isActive" closeable>
            <template #title>Advanced Dialog</template>

            <template #subtitle>Dialog subtitle</template>

            <template #image>
                <img
                    alt="Oruga Logo"
                    src="https://avatars2.githubusercontent.com/u/66300512?s=200&v=4" />
            </template>

            <template #content>
                <p class="m-0">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Inventore sed consequuntur error repudiandae numquam
                    deserunt quisquam repellat libero asperiores earum nam
                    nobis, culpa ratione quam perferendis esse, cupiditate neque
                    quas!
                </p>
            </template>

            <template #cancelButton>
                <span>Not now</span>
            </template>

            <template #confirmButton>
                <strong>Got it</strong>
            </template>
        </o-dialog>
    </section>
</template>
