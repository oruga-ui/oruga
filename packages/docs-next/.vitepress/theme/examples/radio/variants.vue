<script setup>
import { ref } from "vue";

const radio = ref("default");
</script>

<template>
    <section>
        <o-field>
            <o-radio v-model="radio" native-value="default"> Default </o-radio>
        </o-field>
        <o-field>
            <o-radio v-model="radio" native-value="primary" variant="primary">
                Primary
            </o-radio>
        </o-field>
        <o-field>
            <o-radio v-model="radio" native-value="info" variant="info">
                Info
            </o-radio>
        </o-field>
        <o-field>
            <o-radio v-model="radio" native-value="success" variant="success">
                Success
            </o-radio>
        </o-field>
        <o-field>
            <o-radio v-model="radio" native-value="warning" variant="warning">
                Warning
            </o-radio>
        </o-field>
        <o-field>
            <o-radio v-model="radio" native-value="danger" variant="danger">
                Danger
            </o-radio>
        </o-field>
        <p><b>Selection:</b> {{ radio }}</p>
    </section>
</template>
