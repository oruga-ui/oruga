<script setup lang="ts">
import { ref } from "vue";

const isActive = ref(false);
</script>

<template>
    <section>
        <o-button
            label="Open Dialog"
            size="medium"
            variant="primary"
            :aria-expanded="isActive"
            aria-controls="base-dialog"
            @click="isActive = true" />

        <o-dialog
            id="base-dialog"
            v-model:active="isActive"
            closeable
            :backdrop="false">
            <template #title>Dialog Title</template>

            <template #subtitle>Dialog Subtitle</template>

            <template #content>
                <div>
                    <p style="text-align: center">
                        <img
                            alt="Oruga logo"
                            src="https://avatars2.githubusercontent.com/u/66300512?s=200&v=4" />
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Etiam sodales leo nec convallis rutrum. Vivamus pharetra
                        molestie arcu at dictum. Nulla faucibus leo eget enim
                        egestas, in tempus justo venenatis. Duis dictum suscipit
                        erat, a dapibus eros lobortis ac. Praesent tempor
                        rhoncus convallis. Nullam in ipsum convallis, rutrum
                        elit eget, dictum ipsum. Nunc sagittis aliquet massa.
                        Etiam lacus sapien, eleifend non eros quis, finibus
                        ornare nisl. Ut laoreet sit amet lacus non dignissim.
                        Sed convallis mattis enim, sed interdum risus molestie
                        ut. Praesent vel ex hendrerit, cursus lectus a, blandit
                        felis. Nam luctus orci nec varius commodo.
                    </p>
                </div>
            </template>

            <template #footer="{ close }">
                <o-button label="Close" @click="close" />
            </template>
        </o-dialog>
    </section>
</template>
