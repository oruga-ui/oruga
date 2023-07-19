<script setup>
import { ref } from "vue";

const radio = ref("default");
</script>

<template>
    <section>
        <div class="field">
            <o-radio v-model="radio" native-value="default"> Default </o-radio>
        </div>
        <div class="field">
            <o-radio v-model="radio" native-value="info" variant="info">
                Info
            </o-radio>
        </div>
        <div class="field">
            <o-radio v-model="radio" native-value="success" variant="success">
                Success
            </o-radio>
        </div>
        <div class="field">
            <o-radio v-model="radio" native-value="danger" variant="danger">
                Danger
            </o-radio>
        </div>
        <div class="field">
            <o-radio v-model="radio" native-value="warning" variant="warning">
                Warning
            </o-radio>
        </div>
    </section>
</template>
