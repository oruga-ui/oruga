<script setup>
import { ref } from "vue";

const maxHeight = 200;
const menus = [
    { icon: "users", text: "People" },
    { icon: "box", text: "Orders" },
    { icon: "credit-card", text: "Payments" },
    { icon: "dolly", text: "Logistics" },
    { icon: "business-time", text: "Jobs" },
    { icon: "shopping-cart", text: "Cart" },
    { icon: "cog", text: "Configuration" },
];

const isScrollable = ref(true);
const currentMenu = ref({ icon: "users", text: "People" });
</script>

<template>
    <section>
        <o-field>
            <o-switch v-model="isScrollable">Scrollable</o-switch>
        </o-field>

        <br />

        <o-dropdown
            v-model="currentMenu"
            :scrollable="isScrollable"
            :max-height="maxHeight"
            aria-role="list">
            <template #trigger>
                <o-button variant="primary" type="button">
                    <o-icon :icon="currentMenu.icon" />
                    <span>{{ currentMenu.text }}</span>
                    <o-icon icon="caret-down" />
                </o-button>
            </template>

            <o-dropdown-item
                v-for="(menu, index) in menus"
                :key="index"
                :value="menu"
                aria-role="listitem">
                <div class="media">
                    <o-icon class="media-left" :icon="menu.icon" />
                    <div class="media-content">
                        <span>{{ menu.text }}</span>
                    </div>
                </div>
            </o-dropdown-item>
        </o-dropdown>
    </section>
</template>

<style lang="scss" scoped>
.media {
    align-items: flex-start;
    display: flex;
    text-align: left;
}
.media-content {
    flex-basis: auto;
    flex-grow: 1;
    flex-shrink: 1;
    text-align: left;
    overflow-y: hidden;
    overflow-x: auto;
}
.media-left {
    margin-right: 1rem;
    flex-basis: auto;
    flex-grow: 0;
    flex-shrink: 0;
}
</style>
