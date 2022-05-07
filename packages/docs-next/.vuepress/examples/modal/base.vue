<template>
  <section>
    <div class="buttons">
      <o-button
        size="medium"
        variant="primary"
        @click="isImageModalActive = true"
      >
        Open modal
      </o-button>
      <o-button
        size="medium"
        variant="primary"
        @click="isCardModalActive = true"
      >
        Open modal (clip scroll)
      </o-button>
    </div>

    <o-modal :active.sync="isImageModalActive">
      <p style="text-align: center">
        <img
          src="https://avatars2.githubusercontent.com/u/66300512?s=200&v=4"
        />
      </p>
    </o-modal>

    <o-modal :active.sync="isCardModalActive" :width="640" scroll="clip">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sodales
        leo nec convallis rutrum. Vivamus pharetra molestie arcu at dictum.
        Nulla faucibus leo eget enim egestas, in tempus justo venenatis. Duis
        dictum suscipit erat, a dapibus eros lobortis ac. Praesent tempor
        rhoncus convallis. Nullam in ipsum convallis, rutrum elit eget, dictum
        ipsum. Nunc sagittis aliquet massa. Etiam lacus sapien, eleifend non
        eros quis, finibus ornare nisl. Ut laoreet sit amet lacus non dignissim.
        Sed convallis mattis enim, sed interdum risus molestie ut. Praesent vel
        ex hendrerit, cursus lectus a, blandit felis. Nam luctus orci nec varius
        commodo.
      </p>
      <p>
        Sed vulputate metus purus, ut egestas erat congue et. Donec tellus orci,
        malesuada eget dolor sed, pellentesque bibendum nunc. In eu egestas
        diam. Integer sed congue massa. Sed a urna quam. Morbi vulputate dolor
        eleifend ligula lobortis venenatis. Aenean pellentesque risus sit amet
        faucibus molestie. Aliquam eu lorem aliquet, aliquam nulla in,
        vestibulum lorem. Donec mollis mi at sollicitudin tristique. Nullam id
        nibh pulvinar, dignissim nisl id, gravida risus. Nulla arcu elit,
        scelerisque in sollicitudin et, laoreet et metus. Aenean placerat turpis
        nec tincidunt tempus.
      </p>
    </o-modal>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const isImageModalActive = ref(false)
    const isCardModalActive = ref(false)

    return {
      isImageModalActive,
      isCardModalActive
    }
  }
})
</script>
