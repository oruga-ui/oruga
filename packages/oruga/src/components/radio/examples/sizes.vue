<script setup lang="ts">
import { ref } from "vue";

const radio = ref("small");
</script>

<template>
    <section>
        <o-field>
            <o-radio
                v-model="radio"
                native-value="small"
                size="small"
                label="Small" />
        </o-field>
        <o-field>
            <o-radio v-model="radio" native-value="default" label="Default" />
        </o-field>
        <o-field>
            <o-radio
                v-model="radio"
                native-value="medium"
                size="medium"
                label="Medium" />
        </o-field>
        <o-field>
            <o-radio
                v-model="radio"
                native-value="large"
                size="large"
                label="Large" />
        </o-field>

        <p><b>Selection:</b> {{ radio }}</p>
    </section>
</template>
