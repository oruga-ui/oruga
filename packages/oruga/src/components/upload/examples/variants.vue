<script setup lang="ts">
import { ref } from "vue";

const file = ref<File>();
</script>

<template>
    <section>
        <o-field label="Primary">
            <o-upload v-model="file" drag-drop variant="primary" expanded>
                <div style="text-align: center">
                    <o-icon icon="upload" /> Hover to see color variant
                </div>
            </o-upload>
        </o-field>

        <o-field label="Secondary">
            <o-upload v-model="file" drag-drop variant="secondary" expanded>
                <div style="text-align: center">
                    <o-icon icon="upload" /> Hover to see color variant
                </div>
            </o-upload>
        </o-field>

        <o-field label="Success">
            <o-upload v-model="file" drag-drop variant="success" expanded>
                <div style="text-align: center">
                    <o-icon icon="upload" /> Hover to see color variant
                </div>
            </o-upload>
        </o-field>

        <o-field label="Info">
            <o-upload v-model="file" drag-drop variant="info" expanded>
                <div style="text-align: center">
                    <o-icon icon="upload" /> Hover to see color variant
                </div>
            </o-upload>
        </o-field>

        <o-field label="Warning">
            <o-upload v-model="file" drag-drop variant="warning" expanded>
                <div style="text-align: center">
                    <o-icon icon="upload" /> Hover to see color variant
                </div>
            </o-upload>
        </o-field>

        <o-field label="Danger">
            <o-upload v-model="file" drag-drop variant="danger" expanded>
                <div style="text-align: center">
                    <o-icon icon="upload" /> Hover to see color variant
                </div>
            </o-upload>
        </o-field>

        <p><b>Selected:</b> {{ file?.name }}</p>
    </section>
</template>
