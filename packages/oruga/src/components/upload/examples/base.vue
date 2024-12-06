<script setup lang="ts">
import { ref } from "vue";

const file = ref<File>();
</script>

<template>
    <section>
        <o-field>
            <o-upload v-slot="{ onclick }" v-model="file">
                <o-button tag="button" variant="primary" @click="onclick">
                    <o-icon icon="upload" />
                    <span>Click to upload</span>
                </o-button>
            </o-upload>
        </o-field>

        <p><b>Selected:</b> {{ file?.name }}</p>
    </section>
</template>
