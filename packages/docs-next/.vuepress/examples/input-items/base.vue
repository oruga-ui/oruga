<template>
  <section>
    <o-field label="Add some items">
      <o-inputitems
        v-model="tags"
        icon="tag"
        placeholder="Add an item"
        aria-close-label="Delete this item"
      >
      </o-inputitems>
    </o-field>
    <p class="content"><b>Items:</b> {{ tags }}</p>
  </section>
</template>

<script>
export default {
  data() {
    return {
      tags: ['Pistoia', 'Valdinievole'],
    };
  },
};
</script>
