<script setup>
import { ref } from "vue";

const isSwitched = ref(false);
const isSwitchedCustom = ref("Yes");
</script>

<template>
    <section>
        <o-field>
            <o-switch>Default</o-switch>
        </o-field>
        <o-field>
            <o-switch v-model="isSwitched">
                {{ isSwitched }}
            </o-switch>
        </o-field>
        <o-field>
            <o-switch
                v-model="isSwitchedCustom"
                true-value="Yes"
                false-value="No">
                {{ isSwitchedCustom }}
            </o-switch>
        </o-field>
        <o-field>
            <o-switch disabled>Disabled</o-switch>
        </o-field>
    </section>
</template>
