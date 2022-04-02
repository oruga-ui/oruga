<template>
  <client-only>
    <div class="carbon-container" v-if="show">
      <component :is="'script'"
        async type="text/javascript" src="//cdn.carbonads.com/carbon.js?serve=CESI42JW&placement=orugaio" id="_carbonads_js">
      </component>
    </div>
  </client-only>
</template>
<script>
// https://github.com/vuejs/vuefire/blob/master/packages/documentation/docs/.vuepress/components/CarbonAds.vue
export default {
    data () {
      return {
        show: false
      }
    },
    watch: {
        $route(to, from) {
            if (to.path !== from.path && typeof _carbonads === 'object') {
                // eslint-disable-next-line no-undef
                _carbonads.refresh()
            }
        }
    },
    mounted: function () {
      if ((new URL(location.href)).hostname !== "oruga.io") {
        return;
      }
      setTimeout(() => {
        this.show = true
        setTimeout(() => {
          document.querySelectorAll("div[id^=carbonads_]").forEach(el => el.remove());
        }, 1000)
      }, 1000)
    }
}
</script>

<style lang="scss">
div[id^=carbonads_] {
  display: none;
}
.carbon-container {
  align-items: center;
  display: flex;
  justify-content: center;
  max-width: 300px;
  min-height: 140px;
  min-width: 280px;
  font-size: 0.75rem;
  a {
    color: #444;
    font-weight: normal;
    display: inline;
  }
  .carbon-img {
    float: left;
    margin-right: 1rem;
    border: 1px solid var(--c-border);
    img {
      display: block;
    }
  }
  .carbon-poweredby {
    color: #999;
    display: block;
    margin-top: 0.5em;
  }
}

// @media (max-width: $MQMobile) {
@media (max-width: 719px) {
  .carbon-ads {
    .carbon-img img {
      width: 100px;
      height: 77px;
    }
  }
}
</style>

