<script setup lang="ts" generic="T extends Record<string, unknown> | string">
import { type PropType } from "vue";

import OMenu from "@/components/menu/Menu.vue";
import OMenuItem from "@/components/menu/MenuItem.vue";
import type { ComponentProps } from "vue-component-type-helpers";

type MenuItemProps = ComponentProps<typeof OMenuItem>;

defineProps({
    items: { type: Array as PropType<MenuItemProps[]>, required: true },
    label: { type: String, default: undefined },
});
</script>

<template>
    <o-menu>
        <template #label>
            {{ label }}
        </template>

        <o-menu-item v-for="el in items" :key="el.label" v-bind="el" />
    </o-menu>
</template>
