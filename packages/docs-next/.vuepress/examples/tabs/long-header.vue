<template>
  <o-tabs type="boxed">
    <o-tab-item
      v-for="(item, index) in new Array(45)"
      :key="`longitem-${index}`"
    >
      <template #header>
        <span>Head {{ index }}</span>
      </template>
    </o-tab-item>
  </o-tabs>
</template>

<script>
export default {
  data() {
    return {
      expanded: false,
      atRight: false,
      size: null,
      type: 'default',
    };
  },
};
</script>
