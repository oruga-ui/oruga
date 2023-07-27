<script setup>
import { ref } from "vue";

const checkboxGroup = ref(["Flint"]);
</script>

<template>
    <section>
        <o-field>
            <o-checkbox v-model="checkboxGroup" native-value="Silver">
                Silver
            </o-checkbox>
            <o-checkbox v-model="checkboxGroup" native-value="Flint">
                Flint
            </o-checkbox>
            <o-checkbox v-model="checkboxGroup" native-value="Vane">
                Vane
            </o-checkbox>
            <o-checkbox v-model="checkboxGroup" native-value="Billy" disabled>
                Billy
            </o-checkbox>
        </o-field>
        <p><b>Selection:</b> {{ checkboxGroup }}</p>
    </section>
</template>
