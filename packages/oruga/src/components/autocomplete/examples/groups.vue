<script setup>
import { ref, computed } from "vue";

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

const name = ref("");
const selected = ref(null);

const filteredDataObj = computed(() =>
    data.reduce((acc, element) => {
        const items = element.items.filter(
            (item) => item.toLowerCase().indexOf(name.value.toLowerCase()) >= 0,
        );

        return items.length ? [...acc, { type: element.type, items }] : acc;
    }, []),
);
</script>

<template>
    <section>
        <o-field label="Find a food">
            <o-autocomplete
                v-model="name"
                group-field="type"
                group-options="items"
                open-on-focus
                :data="filteredDataObj"
                field="user.first_name"
                @select="(option) => (selected = option)" />
        </o-field>
        <p><b>Selected:</b> {{ selected }}</p>
    </section>
</template>
