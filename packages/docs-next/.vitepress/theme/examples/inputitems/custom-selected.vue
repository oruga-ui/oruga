<template>
  <section>
    <o-field label="Enter some items">
      <o-inputitems
        v-model="items"
        ref="input"
        icon="tag"
        placeholder="Add an item"
      >
        <template #selected="{ items }">
          <o-button
            native-type="button"
            v-for="(item, index) in items"
            :key="index"
            :variant="getType(item)"
            rounded
            @click="$refs.input.removeItem(index, $event)"
          >
            {{ item }}
          </o-button>
        </template>
      </o-inputitems>
    </o-field>
    <p class="content"><b>Items:</b> {{ items }}</p>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const items = ref([])

    function getType(item) {
      const random = 'Z'.charCodeAt(0) - item.toUpperCase().charCodeAt(0)
      if (random >= 1 && random < 5) {
        return 'primary'
      } else if (random >= 6 && random < 10) {
        return 'danger'
      } else if (random >= 11 && random < 15) {
        return 'warning'
      } else if (random >= 15 && random < 20) {
        return 'success'
      } else if (random >= 20 && random < 25) {
        return 'info'
      }
    }

    return {
      items,
      getType
    }
  }
})
</script>
