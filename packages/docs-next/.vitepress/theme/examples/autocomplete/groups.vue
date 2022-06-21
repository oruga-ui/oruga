<template>
  <section>
    <p class="content"><b>Selected:</b> {{ selected }}</p>
    <o-field label="Find a food">
      <o-autocomplete
        v-model="name"
        group-field="type"
        group-options="items"
        open-on-focus
        :data="filteredDataObj"
        field="user.first_name" @select="(option) => (selected = option)"
      />
    </o-field>
  </section>
</template>

<script>
import { defineComponent, ref, computed } from 'vue';

const data = [
  {
    type: "Fruit",
    items: ["Apple", "Banana", "Watermelon"],
  },
  {
    type: "Vegetables",
    items: ["Carrot", "Broccoli", "Cucumber", "Onion"],
  },
];

export default defineComponent({
  setup() {
    const name = ref('');
    const selected = ref(null);

    const filteredDataObj = computed(() =>
      data.reduce((acc, element) => {
        const items = element.items.filter(
          (item) => item.toLowerCase().indexOf(name.value.toLowerCase()) >= 0
        );

        return items.length ? [...acc, { type: element.type, items }] : acc;
      }, [])
    );

    return {
      name,
      selected,
      filteredDataObj,
    };
  },
});
</script>
