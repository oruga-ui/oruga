<script setup lang="ts">
import { ref } from "vue";

const selected = ref();
</script>

<template>
    <section>
        <o-tree v-model="selected" label="tree">
            <o-tree-item icon="info-circle" label="Info" />
            <o-tree-item icon="cog" expanded>
                <template #label="props">
                    <span>Administrator</span>
                    <o-icon
                        :icon="props.active ? 'chevron-up' : 'chevron-down'" />
                </template>
                <o-tree-item icon="user" label="Users" />
                <o-tree-item icon="mobile">
                    <template #label> Devices </template>
                </o-tree-item>
                <o-tree-item icon="money-bill" label="Payments" disabled />
            </o-tree-item>
            <o-tree-item icon="user">
                <template #label="props">
                    <span>My Account</span>
                    <o-icon
                        :icon="props.active ? 'chevron-up' : 'chevron-down'" />
                </template>
                <o-tree-item label="Account data" />
                <o-tree-item label="Addresses" />
            </o-tree-item>
        </o-tree>

        <p><b> Selected:</b> {{ selected }}</p>
    </section>
</template>
