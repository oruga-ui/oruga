<template>
    <client-only>
        <vue-telescope-expo :slugs="{ui: 'oruga'}" sortField="createdAt" :image-width="800"/>
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
