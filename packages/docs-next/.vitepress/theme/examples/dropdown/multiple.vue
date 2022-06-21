<template>
  <section>
    <p class="content"><b>selected</b>: {{ selectedOptions }}</p>
    <o-dropdown v-model="selectedOptions" multiple aria-role="list">
      <template #trigger>
        <o-button variant="primary" type="button">
          <span>Selected ({{ selectedOptions.length }})</span>
          <o-icon icon="caret-down"></o-icon>
        </o-button>
      </template>

      <o-dropdown-item value="option1" aria-role="listitem">
        <span>Option 1</span>
      </o-dropdown-item>

      <o-dropdown-item value="option2" aria-role="listitem">
        <span>Option 2</span>
      </o-dropdown-item>

      <o-dropdown-item value="option3" aria-role="listitem">
        <span>Option 3</span>
      </o-dropdown-item>
    </o-dropdown>
  </section>
</template>
<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const selectedOptions = ref([]);

    return {
      selectedOptions,
    };
  },
});
</script>
