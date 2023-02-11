<template>
  <section>
    <!-- TEMP -->
    <div style="max-height: 300px; overflow: auto; resize: vertical;">
      <div style="height: 900px; display: flex; align-items: center;">
        <o-field label="Find a JS framework">
          <AutocompleteHMR 
              v-model="name"
              rounded
              expanded
              placeholder="e.g. jQuery"
              icon="search"
              clearable
              :data="filteredDataArray"
              @select="(option) => (selected = option)"
          >
            <template #empty>No results found</template>
          </AutocompleteHMR>
        </o-field>
      </div>
    </div>
    <!-- TEMP - END -->

    <!-- TEMP -->
    <o-field label="Find a JS framework">
      <AutocompleteHMR 
          v-model="name"
          rounded
          expanded
          placeholder="e.g. jQuery"
          icon="search"
          clearable
          :data="filteredDataArray"
          @select="(option) => (selected = option)"
      >
        <template #empty>No results found</template>
      </AutocompleteHMR>
    </o-field>
    <!-- TEMP - END -->

    <p class="content"><b>Selected:</b> {{ selected }}</p>
    <o-field label="Find a JS framework">
      <o-autocomplete
        v-model="name"
        rounded
        expanded
        placeholder="e.g. jQuery"
        icon="search"
        clearable
        :data="filteredDataArray"
        @select="(option) => (selected = option)"
      >
        <template #empty>No results found</template>
      </o-autocomplete>
    </o-field>
  </section>
</template>

<script>
import { defineComponent, ref, computed } from "vue";

const data = [
  "Angular",
  "Angular 2",
  "Aurelia",
  "Backbone",
  "Ember",
  "jQuery",
  "Meteor",
  "Node.js",
  "Polymer",
  "React",
  "RxJS",
  "Vue.js",
];

export default defineComponent({
  setup() {
    const name = ref('');
    const selected = ref(null);
    
    const filteredDataArray = computed(() =>
      data.filter(
        (option) =>
          option.toString().toLowerCase().indexOf(name.value.toLowerCase()) >= 0
      )
    );

    return {
      name,
      selected,
      filteredDataArray,
    };
  },
});
</script>
