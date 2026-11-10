<script setup lang="ts">
import type { ClassBinding } from "@/types";

import OIcon from "@/components/icon/Icon.vue";

defineProps<{
    /** accessible name of the button */
    label: string;
    /** icon of the button */
    icon: string;
    /** size of the icon */
    size?: string;
    /** icon pack of the icon */
    pack?: string;
    /** classes of the button */
    classes: ClassBinding[];
}>();
</script>

<template>
    <button
        type="button"
        :class="classes"
        :aria-label="label"
        data-oruga="close">
        <slot>
            <o-icon :pack="pack" :icon="icon" :size="size" />
        </slot>
    </button>
</template>
