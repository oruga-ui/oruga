<script setup lang="ts">
import { ref } from "vue";

const selected = ref<string>("");
</script>

<template>
    <section>
        <o-field>
            <o-select
                v-model="selected"
                placeholder="Select a character"
                icon="user"
                expanded
                :options="[
                    {
                        label: 'Names',
                        options: ['Flint', 'Silver', 'Vane', 'Jack'],
                    },
                    {
                        label: 'Numbers',
                        options: [1, 2, 3],
                    },
                ]" />
        </o-field>

        <p><b>Selected:</b> {{ selected }}</p>
    </section>
</template>
