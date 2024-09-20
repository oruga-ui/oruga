<script setup lang="ts">
import { ref } from "vue";

const file = ref<File | null>(null);
</script>

<template>
    <section>
        <o-field label="Primary">
            <o-upload v-model="file" drag-drop variant="primary" expanded>
                <center>
                    <o-icon icon="upload" /> Hover to see color variant
                </center>
            </o-upload>
        </o-field>

        <o-field label="Secondary">
            <o-upload v-model="file" drag-drop variant="secondary" expanded>
                <center>
                    <o-icon icon="upload" /> Hover to see color variant
                </center>
            </o-upload>
        </o-field>

        <o-field label="Success">
            <o-upload v-model="file" drag-drop variant="success" expanded>
                <center>
                    <o-icon icon="upload" /> Hover to see color variant
                </center>
            </o-upload>
        </o-field>

        <o-field label="Info">
            <o-upload v-model="file" drag-drop variant="info" expanded>
                <center>
                    <o-icon icon="upload" /> Hover to see color variant
                </center>
            </o-upload>
        </o-field>

        <o-field label="Warning">
            <o-upload v-model="file" drag-drop variant="warning" expanded>
                <center>
                    <o-icon icon="upload" /> Hover to see color variant
                </center>
            </o-upload>
        </o-field>

        <o-field label="Danger">
            <o-upload v-model="file" drag-drop variant="danger" expanded>
                <center>
                    <o-icon icon="upload" /> Hover to see color variant
                </center>
            </o-upload>
        </o-field>

        <p><b>Selected:</b> {{ file?.name }}</p>
    </section>
</template>
