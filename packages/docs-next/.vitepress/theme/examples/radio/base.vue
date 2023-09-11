<script setup>
import { ref } from "vue";

const radio = ref("Jack");
</script>

<template>
    <section>
        <o-field>
            <o-radio v-model="radio" name="name" native-value="Flint">
                Flint
            </o-radio>
            <o-radio v-model="radio" name="name" native-value="Silver">
                Silver
            </o-radio>
            <o-radio v-model="radio" name="name" native-value="Jack">
                Jack
            </o-radio>
            <o-radio v-model="radio" name="name" native-value="Vane" disabled>
                Vane
            </o-radio>
        </o-field>
        <p><b>Selection:</b> {{ radio }}</p>
    </section>
</template>
