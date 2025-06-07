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

        <o-breadcrumb :size="size">
            <o-breadcrumb-item
                label="Home"
                icon-left="home"
                :icon-size="iconSize" />
            <o-breadcrumb-item
                label="Docs"
                icon-left="plus"
                :icon-size="iconSize" />
            <o-breadcrumb-item
                label="Breadcrumb"
                icon-left="location"
                :icon-size="iconSize"
                active />
        </o-breadcrumb>

        <o-breadcrumb :size="size">
            <o-breadcrumb-item
                label="Home"
                icon-right="home"
                :icon-size="iconSize" />
            <o-breadcrumb-item
                label="Docs"
                icon-right="plus"
                :icon-size="iconSize" />
            <o-breadcrumb-item
                label="Breadcrumb"
                icon-right="location"
                :icon-size="iconSize"
                active />
        </o-breadcrumb>
    </section>
</template>
