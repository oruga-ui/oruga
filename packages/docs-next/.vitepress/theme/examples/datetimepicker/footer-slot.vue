<script setup>
import { ref } from "vue";

const datetime = ref(new Date());
</script>

<template>
    <o-field label="Select datetime">
        <o-datetimepicker v-model="datetime" placeholder="Click to select...">
            <template #footer>
                <div class="buttons-footer">
                    <o-button variant="primary" @click="datetime = new Date()">
                        <o-icon icon="calendar"></o-icon>
                        <span>Today</span>
                    </o-button>
                    <o-button variant="danger" @click="datetime = null">
                        <o-icon icon="times"></o-icon>
                        <span>Clear</span>
                    </o-button>
                </div>
            </template>
        </o-datetimepicker>
    </o-field>
</template>

<style lang="scss">
.buttons-footer {
    margin-top: 1rem;
}
</style>
