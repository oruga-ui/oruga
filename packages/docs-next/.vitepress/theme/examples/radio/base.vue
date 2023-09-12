<script setup>
import { ref } from "vue";

const radio = ref("Jack");
</script>

<template>
    <section>
        <o-field>
            <o-radio
                v-model="radio"
                name="name"
                native-value="Flint"
                label="Flint" />
            <o-radio
                v-model="radio"
                name="name"
                native-value="Silver"
                label="Silver" />
            <o-radio
                v-model="radio"
                name="name"
                native-value="Jack"
                label="Jack" />
            <o-radio
                v-model="radio"
                name="name"
                native-value="Vane"
                label="Vane"
                disabled />
        </o-field>
        <p><b>Selection:</b> {{ radio }}</p>
    </section>
</template>
