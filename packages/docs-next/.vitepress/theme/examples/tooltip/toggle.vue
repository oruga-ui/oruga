<template>
  <section>
    <o-button @click="active = !active"> Toggle </o-button>

    <hr />

    <div class="odocs-spaced">
        <o-tooltip label="I'm never closing" :active="active" always>
            <o-button> Always </o-button>
        </o-tooltip>

        <o-tooltip label="Tooltip right" position="right" :active="active">
            <o-button> Right </o-button>
        </o-tooltip>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
    setup() {
        const active = ref(true)
        return { active }
    }
})
</script>
