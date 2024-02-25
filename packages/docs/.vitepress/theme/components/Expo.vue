<script setup lang="ts">
import VueTelescopeExpo from "./expo/VueTelescopeExpo.vue";
</script>

<template>
    <vue-telescope-expo
        :slugs="{ ui: 'oruga' }"
        sort-by="lastDetectedAt"
        sort-direction="desc">
        <template #buttons="{ loading, hasMoreItems, loadMoreItems }">
            <o-button
                v-if="hasMoreItems"
                root-class="loadingbtn"
                wrapper-class="loadingbtnwrapper"
                @click="loadMoreItems">
                <o-icon
                    v-if="loading"
                    root-class="loadingicon"
                    pack="fas"
                    icon="sync-alt"
                    spin>
                </o-icon>
                <span v-else>Load more</span>
            </o-button>
        </template>

        <template #retry="{ firstLoadItems }">
            <p>Something went wrong!</p>
            <o-button label="Retry" @click="firstLoadItems" />
        </template>
    </vue-telescope-expo>
</template>

<style lang="scss" scoped>
.loadingbtn,
.loadingbtn:hover,
.loadingbtn:active,
.loadingbtn:focus {
    min-width: 9rem;
    border-color: transparent;
    color: #fff;
    background: var(--vp-c-brand);
    cursor: pointer;
    justify-content: center;
    padding: calc(0.5em - 1px) 1em;
    text-align: center;
    white-space: nowrap;
    border-radius: 4px;
    padding-left: 1rem;
    padding-right: 1rem;
}
.loadingicon {
    margin-top: 0.3rem;
}
</style>
