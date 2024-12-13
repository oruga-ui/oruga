<script setup lang="ts">
import { ref } from "vue";

import OTabs from "@/components/tabs/Tabs.vue";
import OTabItem from "@/components/tabs/TabItem.vue";

defineProps({
    isStepsClickable: { type: Boolean, default: false },
});

const activeTab = ref(1);
</script>

<template>
    <!-- Taken from the first example in the documentation -->
    <o-tabs v-model="activeTab">
        <o-tab-item
            value="1"
            step="1"
            label="Account"
            :clickable="isStepsClickable">
            <h1 class="title has-text-centered">Account</h1>
            Lorem ipsum dolor sit amet.
        </o-tab-item>

        <o-tab-item
            value="2"
            step="2"
            label="Profile"
            :clickable="isStepsClickable">
            <h1 class="title has-text-centered">Profile</h1>
            Lorem ipsum dolor sit amet.
        </o-tab-item>

        <o-tab-item
            value="3"
            step="3"
            label="Social"
            :clickable="isStepsClickable">
            <h1 class="title has-text-centered">Social</h1>
            Lorem ipsum dolor sit amet.
        </o-tab-item>

        <o-tab-item
            value="4"
            label="Finish"
            :clickable="isStepsClickable"
            disabled>
            <h1 class="title has-text-centered">Finish</h1>
            Lorem ipsum dolor sit amet.
        </o-tab-item>
    </o-tabs>
</template>
