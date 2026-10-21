<script setup lang="ts">
import { ref } from "vue";

const active = ref(false);
const backdrop = ref(true);
const closeOnEscape = ref(true);
const closeOnBackdrop = ref(true);
const blockScroll = ref(false);

const log = ref<string[]>([]);

function addLog(message: string): void {
    log.value = [message, ...log.value].slice(0, 5);
}
</script>

<template>
    <section>
        <o-field grouped>
            <o-switch v-model="backdrop" label="Backdrop" />
            <o-switch v-model="closeOnEscape" label="Close on escape" />
            <o-switch v-model="closeOnBackdrop" label="Close on backdrop" />
            <o-switch v-model="blockScroll" label="Block scroll" />
        </o-field>

        <o-button
            label="Show Drawer"
            variant="primary"
            @click="active = true" />

        <ul>
            <li v-for="(entry, index) in log" :key="index">{{ entry }}</li>
        </ul>

        <o-drawer
            v-model:active="active"
            title="Closing behaviour"
            aria-describedby="closing-description"
            :backdrop="backdrop"
            :close-on-escape="closeOnEscape"
            :close-on-backdrop="closeOnBackdrop"
            :block-scroll="blockScroll"
            cancel-button="Cancel"
            confirm-button="Done"
            close-on-confirm
            @cancel="addLog('cancel')"
            @close="
                (_event, value) => addLog(`close (${value || 'no value'})`)
            ">
            <p id="closing-description">
                Press escape, click the backdrop or use a button. The
                <code>cancel</code> event is emitted for a dismiss by the user,
                the <code>close</code> event when the drawer has been closed.
            </p>
        </o-drawer>
    </section>
</template>
