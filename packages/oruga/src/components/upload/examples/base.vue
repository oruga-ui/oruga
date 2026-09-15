<script setup lang="ts">
import { ref } from "vue";

const file = ref<File>();
</script>

<template>
    <section>
        <o-field>
            <o-upload v-slot="{ click }" v-model="file">
                <o-button tag="button" variant="primary" @click="click">
                    <o-icon icon="upload" />
                    <span>Click to upload</span>
                </o-button>
            </o-upload>
        </o-field>

        <p><b>Selected:</b> {{ file?.name }}</p>
    </section>
</template>
