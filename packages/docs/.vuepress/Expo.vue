<template>
    <client-only>
        <vue-telescope-expo :slugs="{ui: 'oruga'}">
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

<script>
import VueTelescopeExpo from 'vue-telescope-expo'
import 'vue-telescope-expo/dist/vue-telescope-expo.css'
export default {
  components: { VueTelescopeExpo },
}
</script>

<style scoped>
.loadingbtn {
  min-width: 9rem;
  border-color: transparent;
  color: #fff;
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
