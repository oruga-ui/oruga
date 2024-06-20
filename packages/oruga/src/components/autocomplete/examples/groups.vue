<script setup lang="ts">
import { ref } from "vue";

const options = [
    {
        type: "Fruit",
        items: ["Apple", "Banana", "Watermelon"],
    },
    {
        type: "Vegetables",
        items: ["Carrot", "Broccoli", "Cucumber", "Onion"],
    },
];

function filter(data: typeof options, value: string): typeof options {
    return data.reduce((acc, element) => {
        const items = element.items.filter(
            (item) => item.toLowerCase().indexOf(value.toLowerCase()) >= 0,
        );

        return items.length ? [...acc, { type: element.type, items }] : acc;
    }, []);
}

const selected = ref();
</script>

<template>
    <section>
        <o-field label="Find a food">
            <o-autocomplete
                v-model="selected"
                :input="'Apple'"
                :options="options"
                group-field="type"
                group-options="items"
                open-on-focus
                field="user.first_name"
                :filter="filter" />
        </o-field>

        <p><b>Selected:</b> {{ selected }}</p>
    </section>
</template>
