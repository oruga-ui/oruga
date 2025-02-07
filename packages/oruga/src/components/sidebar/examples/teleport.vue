<script setup lang="ts">
import { ref } from "vue";

const isActive = ref(false);
</script>

<template>
    <section>
        <o-button
            label="Open Sidebar"
            size="medium"
            variant="primary"
            @click="isActive = true" />

        <o-sidebar
            v-slot="{ close }"
            v-model:active="isActive"
            fullheight
            overlay
            teleport>
            <o-button icon-left="times" label="Close" @click="close()" />
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
                sodales leo nec convallis rutrum. Vivamus pharetra molestie arcu
                at dictum. Nulla faucibus leo eget enim egestas, in tempus justo
                venenatis. Duis dictum suscipit erat, a dapibus eros lobortis
                ac. Praesent tempor rhoncus convallis. Nullam in ipsum
                convallis, rutrum elit eget, dictum ipsum. Nunc sagittis aliquet
                massa. Etiam lacus sapien, eleifend non eros quis, finibus
                ornare nisl. Ut laoreet sit amet lacus non dignissim. Sed
                convallis mattis enim, sed interdum risus molestie ut. Praesent
                vel ex hendrerit, cursus lectus a, blandit felis. Nam luctus
                orci nec varius commodo.
            </p>
        </o-sidebar>
    </section>
</template>
