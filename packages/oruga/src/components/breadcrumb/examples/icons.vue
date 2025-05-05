<script setup lang="ts">
import { ref } from "vue";

const iconSize = ref<string>("");
const size = ref<string>("");
</script>

<template>
    <section>
        <o-field grouped>
            <o-field label="Icon Size">
                <o-select v-model="iconSize">
                    <option value="small">Small</option>
                    <option value="">Default</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                </o-select>
            </o-field>

            <o-field label="Text Size">
                <o-select v-model="size">
                    <option value="small">Small</option>
                    <option value="">Default</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                </o-select>
            </o-field>
        </o-field>

        <o-breadcrumb>
            <o-breadcrumb-item
                label="Home"
                :size="size"
                icon-left="home"
                :icon-size="iconSize"
                active />
            <o-breadcrumb-item
                label="Docs"
                :size="size"
                icon-left="plus"
                :icon-size="iconSize"
                disabled />
            <o-breadcrumb-item
                label="Breadcrumb"
                icon-left="location"
                :icon-size="iconSize" />
        </o-breadcrumb>

        <o-breadcrumb>
            <o-breadcrumb-item
                label="Home"
                :size="size"
                icon-right="home"
                :icon-size="iconSize"
                active />
            <o-breadcrumb-item
                label="Docs"
                :size="size"
                icon-right="plus"
                :icon-size="iconSize"
                disabled />
            <o-breadcrumb-item
                label="Breadcrumb"
                :size="size"
                icon-right="location"
                :icon-size="iconSize" />
        </o-breadcrumb>
    </section>
</template>
