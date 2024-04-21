<script setup lang="ts" generic="T extends Record<string, unknown> | string">
import { type PropType } from "vue";

import OMenu from "@/components/menu/Menu.vue";
import OMenuItem from "@/components/menu/MenuItem.vue";
import type { ComponentProps } from "vue-component-type-helpers";

type MenuItemProps = ComponentProps<typeof OMenuItem>;

defineProps({
    items: { type: Array as PropType<MenuItemProps[]>, required: true },
    label: { type: String, default: undefined },
    enableDefaultItems: { type: Boolean, default: false },
});
</script>

<template>
    <o-menu>
        <template #label>
            {{ label }}
        </template>

        <o-menu-item v-for="el in items" :key="el.label" v-bind="el" />

        <template v-if="enableDefaultItems">
            <o-menu-item icon="cog" expanded>
                <template #label> Administrator </template>
                <o-menu-item icon="user" label="Users" />
                <o-menu-item icon="mobile">
                    <template #label> Devices </template>
                </o-menu-item>
                <o-menu-item icon="money-bill" label="Payments" disabled />
            </o-menu-item>
            <o-menu-item icon="user" label="My Account">
                <o-menu-item label="Account data" />
                <o-menu-item label="Addresses" />
                <div class="test-slot">TEST</div>
            </o-menu-item>
        </template>
    </o-menu>
</template>
