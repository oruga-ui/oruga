<script setup lang="ts">
import { ref } from "vue";

const isModalActive = ref(false);
</script>

<template>
    <section class="odocs-spaced">
        <p>
            <o-button
                label="Ask important question"
                size="medium"
                variant="primary"
                @click="isModalActive = true" />
        </p>

        <o-modal
            v-model:active="isModalActive"
            :cancelable="false"
            alert
            aria-labelledby="dialog_label"
            aria-describedby="dialog_desc">
            <h2 id="dialog_label">Confirmation</h2>

            <p id="dialog_desc" style="text-align: center">
                Are you sure you want to delete the internet?
            </p>

            <div>
                <o-button label="No" @click="isModalActive = false" />
                <o-button label="Yes" @click="isModalActive = false" />
            </div>
        </o-modal>
    </section>
</template>
