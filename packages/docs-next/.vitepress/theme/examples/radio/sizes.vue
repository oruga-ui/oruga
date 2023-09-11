<script setup>
import { ref } from "vue";

const radio = ref("small");
</script>

<template>
    <section>
        <o-field>
            <o-radio v-model="radio" native-value="small" size="small">
                Small
            </o-radio>
        </o-field>
        <o-field>
            <o-radio v-model="radio" native-value="default"> Default </o-radio>
        </o-field>
        <o-field>
            <o-radio v-model="radio" native-value="medium" size="medium">
                Medium
            </o-radio>
        </o-field>
        <o-field>
            <o-radio v-model="radio" native-value="large" size="large">
                Large
            </o-radio>
        </o-field>
        <p><b>Selection:</b> {{ radio }}</p>
    </section>
</template>
