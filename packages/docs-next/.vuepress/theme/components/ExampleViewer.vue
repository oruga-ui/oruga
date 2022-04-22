<template>
  <div class="odocs-mt">
    <component :is="cmp"></component>
  </div>
  <div v-if="showCode" class="odocs-mt">
    <o-collapse root-class="odocs-panel" trigger-class="odocs-panel-trigger" :open="isOpen">
      <template #trigger>Show code</template>
      <div class="language-vue ext-vue">
        <pre class="language-vue">
            <code class="odocs-code">{{ code }}</code>
        </pre>
      </div>
    </o-collapse>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, markRaw, onBeforeMount } from 'vue'

export default defineComponent({
  props: {
    example: {
      required: true,
      type: String,
    },
    showCode: {
      type: Boolean,
      default: () => true,
    },
  },
  setup(props) {
    const isOpen = ref(false);
    const cmp = ref(null);
    const code = ref('');

    onBeforeMount(() => {
      import(`../../examples/${props.example}.vue`).then(val => {
        cmp.value = markRaw(val.default);
      })

      import(`../../examples/${props.example}.vue?raw`).then(val => {
        code.value = val.default
      })
    });

    return {
      code,
      cmp,
      isOpen,
    };
  },
})
</script>

<style lang="scss">
.odocs-mt {
  margin-top: 1rem;
}

.odocs-spaced>*:not(:last-child) {
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
}

.odocs-panel-trigger {
  cursor: pointer;
  text-align: center;
  padding: 0.5rem;
  border: 1px solid #ebebeb;
}

.odocs-code {
  display: flex;
  width: 100%;
}
</style>
