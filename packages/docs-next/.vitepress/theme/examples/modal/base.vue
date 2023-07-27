<script setup>
import { ref } from "vue";

const isImageModalActive = ref(false);
const isCardModalActive = ref(false);
</script>

<template>
    <section class="odocs-spaced">
        <o-button
            label="Open modal"
            size="medium"
            variant="primary"
            @click="isImageModalActive = true" />

        <o-button
            label="Open modal (clip scroll)"
            size="medium"
            variant="primary"
            @click="isCardModalActive = true" />

        <o-modal v-model:active="isImageModalActive">
            <p style="text-align: center">
                <img
                    style="background-color: white"
                    src="https://avatars2.githubusercontent.com/u/66300512?s=200&v=4" />
            </p>
        </o-modal>

        <o-modal v-model:active="isCardModalActive" :width="640" scroll="clip">
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
                <p>
                    Sed vulputate metus purus, ut egestas erat congue et. Donec
                    tellus orci, malesuada eget dolor sed, pellentesque bibendum
                    nunc. In eu egestas diam. Integer sed congue massa. Sed a
                    urna quam. Morbi vulputate dolor eleifend ligula lobortis
                    venenatis. Aenean pellentesque risus sit amet faucibus
                    molestie. Aliquam eu lorem aliquet, aliquam nulla in,
                    vestibulum lorem. Donec mollis mi at sollicitudin tristique.
                    Nullam id nibh pulvinar, dignissim nisl id, gravida risus.
                    Nulla arcu elit, scelerisque in sollicitudin et, laoreet et
                    metus. Aenean placerat turpis nec tincidunt tempus.
                </p>
            </div>
        </o-modal>
    </section>
</template>
