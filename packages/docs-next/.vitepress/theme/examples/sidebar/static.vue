<script setup>
import { ref } from "vue";

const expandOnHover = ref(false);
const mobile = ref("reduced");
const reduce = ref(false);
</script>

<template>
    <section class="sidebar-page">
        <div class="sidebar-layout">
            <o-sidebar
                position="static"
                :mobile="mobile"
                :expand-on-hover="expandOnHover"
                :reduce="reduce"
                active>
                <img
                    width="128"
                    src="https://avatars2.githubusercontent.com/u/66300512?s=200&v=4"
                    alt="Lightweight UI components for Vue.js" />
                <section style="padding: 1em">
                    <h5>Example 1</h5>
                    <h5>Example 2</h5>
                    <h5>Example 3</h5>
                    <h5>Example 4</h5>
                    <h5>Example 5</h5>
                </section>
            </o-sidebar>
        </div>

        <div class="sidebar-layout">
            <o-field>
                <o-switch v-model="reduce" label="Reduced" />
            </o-field>
            <o-field>
                <o-switch v-model="expandOnHover" label="Expand on hover" />
            </o-field>
            <br />
            <o-field label="Mobile Layout">
                <o-select v-model="mobile">
                    <option :value="null"></option>
                    <option value="reduced">Reduced</option>
                    <option value="hidden">Hidden</option>
                    <option value="fullwidth">Fullwidth</option>
                </o-select>
            </o-field>
        </div>
    </section>
</template>

<style lang="scss" scoped>
.sidebar-page {
    display: flex;
    flex-direction: row;
    width: 100%;

    .sidebar-layout {
        padding: 1rem;
        flex-basis: 50%;
    }
}
</style>
