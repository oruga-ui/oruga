<script setup lang="ts">
import { ref } from "vue";

const selected = ref<string>("1");
</script>

<template>
    <section>
        <o-steps v-model="selected" rounded aria-label="Account setup progress">
            <o-step-item value="1" step="1" label="Account">
                <h3 :style="{ 'text-align': 'center' }">Account</h3>
                Lorem ipsum dolor sit amet.
            </o-step-item>

            <o-step-item value="2" step="2" label="Profile">
                <h3 :style="{ 'text-align': 'center' }">Profile</h3>
                Lorem ipsum dolor sit amet.
            </o-step-item>

            <o-step-item value="3" step="3" label="Social" disabled>
                <h3 :style="{ 'text-align': 'center' }">Social</h3>
                Lorem ipsum dolor sit amet.
            </o-step-item>

            <o-step-item value="4" step="4" label="Finish">
                <h3 :style="{ 'text-align': 'center' }">Finish</h3>
                Lorem ipsum dolor sit amet.
            </o-step-item>
        </o-steps>

        <p><b>Selected:</b> {{ selected }}</p>
    </section>
</template>
