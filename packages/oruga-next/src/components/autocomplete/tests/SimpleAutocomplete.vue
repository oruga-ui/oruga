<template>
  <p class="content"><b>Selected:</b> {{ selected }}</p>
  <o-field label="Find a JS framework">
    <o-autocomplete
      rounded
      v-model="name"
      :data="filteredDataArray"
      placeholder="e.g. jQuery"
      icon="search"
      clearable
      @select="select"
    >
      <template #empty>No results found</template>
    </o-autocomplete>
  </o-field>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import OAutocomplete from "../Autocomplete.vue";
import OField from "../../field/Field.vue";
export default defineComponent({
  data() {
    return {
      data: [
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
      ],
      name: "",
      selected: null,
    };
  },
  components: {
    [OAutocomplete.name]: OAutocomplete,
    [OField.name]: OField,
  },
  computed: {
    filteredDataArray(): string[] {
      return this.data.filter((option: any) => {
        return (
          option.toString().toLowerCase().indexOf(this.name.toLowerCase()) >= 0
        );
      });
    },
  },
  methods: {
    select(option: any) {
      this.selected = option;
    },
  },
});
</script>

<style>
</style>
