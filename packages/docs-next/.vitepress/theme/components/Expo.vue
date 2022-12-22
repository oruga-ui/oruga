<template>
    <client-only>
        <vue-telescope-expo :slugs="{ui: 'oruga'}" sortBy="lastDetectedAt" sortDirection="desc">
            <template v-slot:buttons="{ loading, hasMoreItems, loadMoreItems}">
                <o-button v-if="hasMoreItems" root-class="loadingbtn" elements-wrapper-class="loadingbtnwrapper" @click="loadMoreItems">
                  <o-icon root-class="loadingicon" v-if="loading" pack="fas" icon="sync-alt" spin> </o-icon>
                  <span v-else>Load more</span>
                </o-button>
            </template>
            <template v-slot:retry="{firstLoadItems}">
                <p>Something went wrong!</p>
                <o-button @click="firstLoadItems">Retry</o-button>
            </template>
        </vue-telescope-expo>
    </client-only>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import VueTelescopeExpo from './expo/VueTelescopeExpo.vue'

export default defineComponent({
  components: { VueTelescopeExpo },
})
</script>

<style scoped>
.loadingbtn, .loadingbtn:hover, .loadingbtn:active, .loadingbtn:focus {
  min-width: 9rem;
  border-color: transparent;
  color: #fff;
  background: var(--vp-c-brand);;
  cursor: pointer;
  justify-content: center;
  padding: calc(.5em - 1px) 1em;
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
