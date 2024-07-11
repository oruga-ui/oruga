<script setup lang="ts">
import { ref } from "vue";

const numbers = ref<[number, number]>([2, 5]);
const numbers2 = ref<[number, number]>([2, 6]);
</script>

<template>
    <section>
        <o-field>
            <o-slider
                v-model="numbers"
                range
                :min="1"
                :max="15"
                :step="0.5"
                ticks />
        </o-field>
        <p>{{ numbers }}</p>

        <o-field>
            <o-slider
                v-model="numbers2"
                range
                variant="danger"
                :min="-2"
                :max="8"
                :step="2" />
        </o-field>
        <p>{{ numbers2 }}</p>
    </section>
</template>
