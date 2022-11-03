<template>
  <section>
    <o-button @click="activeTab = 1">Set Music</o-button>
    <br /> <br />
    <o-switch v-model="showBooks"> Show Books item </o-switch>
    <o-switch v-model="multiline"> Multiline </o-switch>

    <o-tabs v-model="activeTab" :multiline="multiline">
      <o-tab-item :value="0" label="Pictures">
        Lorem ipsum dolor sit amet.
      </o-tab-item>

      <o-tab-item :value="1" label="Music">
        Lorem <br />
        ipsum <br />
        dolor <br />
        sit <br />
        amet.
      </o-tab-item>

      <o-tab-item :value="2" :visible="showBooks" label="Books">
        What light is light, if Silvia be not seen? <br />
        What joy is joy, if Silvia be not by— <br />
        Unless it be to think that she is by <br />
        And feed upon the shadow of perfection? <br />
        Except I be by Silvia in the night, <br />
        There is no music in the nightingale.
      </o-tab-item>

      <o-tab-item :value="3" label="Videos" icon="video" disabled>
        Nunc nec velit nec libero vestibulum eleifend. Curabitur pulvinar congue
        luctus. Nullam hendrerit iaculis augue vitae ornare. Maecenas vehicula
        pulvinar tellus, id sodales felis lobortis eget.
      </o-tab-item>
    </o-tabs>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
    setup() {
        const activeTab = ref(0)
        const showBooks = ref(false)
        const multiline = ref(false)
        return { activeTab, showBooks, multiline }
    }
})
</script>

