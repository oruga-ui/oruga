<script setup lang="ts">
import { ref } from "vue";
import type { OptionsProp, OptionsPropWithGroups } from "@oruga-ui/oruga-next";

const options: OptionsProp<string> = [
  { label: "Flint", value: "flint" },
  { label: "Silver", value: "silver" },
  { label: "Vane", value: "vane" },
  { label: "Billy", value: "billy" },
];

const selected = ref<string>();

const groupOptions: OptionsPropWithGroups<string> = [
  {
    label: "Germany",
    value: "DE",
    options: [
      { label: "Berlin", value: "Berlin" },
      { label: "Frankfurt", value: "Frankfurt" },
      { label: "Hamburg", value: "Hamburg" },
      { label: "Munich", value: "Munich" },
    ],
  },
  {
    label: "USA",
    value: "US",
    options: [
      { label: "Chicago", value: "Chicago" },
      { label: "Los Angeles", value: "Los Angeles" },
      { label: "New York", value: "New York" },
      { label: "San Francisco", value: "San Francisco" },
    ],
  },
  {
    label: "Japan",
    value: "JP",
    options: [
      { label: "Kyoto", value: "Kyoto" },
      { label: "Osaka", value: "Osaka" },
      { label: "Tokyo", value: "Tokyo" },
      { label: "Yokohama", value: "Yokohama" },
    ],
  },
];

const groupSelected = ref<string>();
</script>

<template>
  <section class="odocs-spaced">
    <o-field grouped>
      <o-field label="Options">
        <o-listbox v-model="selected" :options="options" />

        <p><b>Selected:</b> {{ selected }}</p>
      </o-field>

      <o-field label="Grouped Options">
        <o-listbox v-model="groupSelected" :options="groupOptions" />

        <p><b>Selected:</b> {{ groupSelected }}</p>
      </o-field>
    </o-field>
  </section>
</template>
