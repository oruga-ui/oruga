<script setup lang="ts">
import { ref } from "vue";

const selected = ref();
</script>

<template>
    <section>
        <o-menu v-model="selected" label="Menu">
            <o-menu-item icon="info-circle" label="Info" />
            <o-menu-item icon="cog" expanded>
                <template #label="props">
                    <span>Administrator</span>
                    <o-icon
                        :icon="props.active ? 'chevron-up' : 'chevron-down'" />
                </template>
                <o-menu-item icon="user" label="Users" />
                <o-menu-item icon="mobile">
                    <template #label> Devices </template>
                </o-menu-item>
                <o-menu-item icon="money-bill" label="Payments" disabled />
            </o-menu-item>
            <o-menu-item icon="user">
                <template #label="props">
                    <span>My Account</span>
                    <o-icon
                        :icon="props.active ? 'chevron-up' : 'chevron-down'" />
                </template>
                <o-menu-item label="Account data" />
                <o-menu-item label="Addresses" />
            </o-menu-item>
        </o-menu>

        <p><b> Selected:</b> {{ selected }}</p>
    </section>
</template>
