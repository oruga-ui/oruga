<script setup lang="ts">
import { ref } from "vue";

const datetime = ref<Date | null>(new Date());
</script>

<template>
    <section>
        <o-field label="Select datetime">
            <o-datetimepicker
                v-model="datetime"
                rounded
                placeholder="Click to select...">
                <template #footer>
                    <div class="footer-container">
                        <o-button
                            variant="primary"
                            @click="datetime = new Date()">
                            <o-icon icon="calendar" />
                            <span>Today</span>
                        </o-button>
                        <o-button variant="danger" @click="datetime = null">
                            <o-icon icon="times" />
                            <span>Clear</span>
                        </o-button>
                    </div>
                </template>
            </o-datetimepicker>
        </o-field>
    </section>
</template>

<style lang="scss" scoped>
.footer-container {
    display: flex;
    justify-content: end;
    margin-top: 0.5rem;

    button {
        margin-left: 0.5rem;
    }
}
</style>
