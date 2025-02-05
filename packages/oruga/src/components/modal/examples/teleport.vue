<script setup lang="ts">
import { ref } from "vue";

const isActive = ref(false);
</script>

<template>
    <section>
        <o-button
            label="Open modal"
            size="medium"
            variant="primary"
            @click="isActive = true" />

        <o-modal v-model:active="isActive" teleport>
            <div style="padding: 10px; background-color: white">
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Etiam sodales leo nec convallis rutrum. Vivamus pharetra
                    molestie arcu at dictum. Nulla faucibus leo eget enim
                    egestas, in tempus justo venenatis. Duis dictum suscipit
                    erat, a dapibus eros lobortis ac. Praesent tempor rhoncus
                    convallis. Nullam in ipsum convallis, rutrum elit eget,
                    dictum ipsum. Nunc sagittis aliquet massa. Etiam lacus
                    sapien, eleifend non eros quis, finibus ornare nisl. Ut
                    laoreet sit amet lacus non dignissim. Sed convallis mattis
                    enim, sed interdum risus molestie ut. Praesent vel ex
                    hendrerit, cursus lectus a, blandit felis. Nam luctus orci
                    nec varius commodo.
                </p>
            </div>
        </o-modal>
    </section>
</template>
