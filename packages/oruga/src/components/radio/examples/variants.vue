<script setup lang="ts">
import { ref } from "vue";

const radio = ref("default");
</script>

<template>
    <section>
        <o-field>
            <o-radio
                v-model="radio"
                name="variants"
                native-value="default"
                label="Default" />
        </o-field>

        <o-field>
            <o-radio
                v-model="radio"
                name="variants"
                native-value="primary"
                variant="primary"
                label="Primary" />
        </o-field>

        <o-field>
            <o-radio
                v-model="radio"
                name="variants"
                native-value="success"
                variant="success"
                label="Success" />
        </o-field>

        <o-field>
            <o-radio
                v-model="radio"
                name="variants"
                native-value="info"
                variant="info"
                label="Info" />
        </o-field>

        <o-field>
            <o-radio
                v-model="radio"
                name="variants"
                native-value="warning"
                variant="warning"
                label="Warning" />
        </o-field>

        <o-field>
            <o-radio
                v-model="radio"
                name="variants"
                native-value="danger"
                variant="danger"
                label="Danger" />
        </o-field>

        <p><b>Selection:</b> {{ radio }}</p>
    </section>
</template>
