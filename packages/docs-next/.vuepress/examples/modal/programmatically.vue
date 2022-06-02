<template>
  <section>
    <div class="odocs-spaced">
      <o-button size="medium" variant="primary" @click="imageModal()">
        Open modal (HTML)
      </o-button>
      <o-button size="medium" variant="primary" @click="cardModal()">
        Open modal (Component)
      </o-button>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, h } from 'vue'
import { useProgrammatic } from '@oruga-ui/oruga-next'
import ModalForm from './_modal-form.vue'

export default defineComponent({
  setup() {

    const { oruga } = useProgrammatic()

    function imageModal() {
      const vnode = h('p', { style: { 'text-align': 'center' } }, [
        h('img', { src: 'https://avatars2.githubusercontent.com/u/66300512?s=200&v=4' })
      ])
      oruga.modal.open({
        content: [vnode]
      })
    }

    function cardModal() {
      oruga.modal.open({
        component: ModalForm,
        trapFocus: true
      })
    }

    return {
      imageModal,
      cardModal
    }
  }
})
</script>

