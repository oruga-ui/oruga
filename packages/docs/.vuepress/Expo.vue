<template>
    <client-only>
        <vue-telescope-expo :slugs="{ui: 'oruga'}" sortField="createdAt" :image-width="800">
            <template v-slot:buttons="methods">
                <o-button @click="methods.loadMore">Load more!</o-button>
            </template>
            <template v-slot:loading>
                <o-icon pack="fas" icon="sync-alt" spin> </o-icon>
            </template>
            <template v-slot:retry="methods">
                <p>Something went wrong!</p>
                <o-button @click="methods.setUp">Retry</o-button>
            </template>
        </vue-telescope-expo>
    </client-only>
</template>

<script>
import VueTelescopeExpo from './VueTelescopeExpo.vue'
export default {
  components: { VueTelescopeExpo },
}
</script>

<style scoped>

</style>
