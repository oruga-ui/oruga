<script setup lang="ts">
import { ref } from "vue";

const checkboxGroup = ref(["Flint"]);
</script>

<template>
    <section>
        <o-field>
            <o-checkbox
                v-model="checkboxGroup"
                native-value="Silver"
                label="Silver" />
            <o-checkbox
                v-model="checkboxGroup"
                native-value="Flint"
                label="Flint" />
            <o-checkbox
                v-model="checkboxGroup"
                native-value="Vane"
                label="Vane" />
            <o-checkbox
                v-model="checkboxGroup"
                native-value="Billy"
                label="Billy"
                disabled />
        </o-field>
        <p><b>Selection:</b> {{ checkboxGroup }}</p>
    </section>
</template>
