<template>
  <client-only>
    <div class="carbon-container">
      <script async type="text/javascript" src="//cdn.carbonads.com/carbon.js?serve=CESI42JW&placement=orugaio" id="_carbonads_js"></script>
    </div>
  </client-only>
</template>
<script>
// https://github.com/vuejs/vuefire/blob/master/packages/documentation/docs/.vuepress/components/CarbonAds.vue
export default {
    watch: {
        $route(to, from) {
            if (to.path !== from.path && typeof _carbonads === 'object') {
                // eslint-disable-next-line no-undef
                _carbonads.refresh()
            }
        }
    }
}
</script>
<style lang="stylus">
.carbon-container
    align-items: center;
    display: flex;
    justify-content: center;
    max-width: 300px;
    min-height: 140px;
    min-width: 280px;
    font-size 0.75rem
  a
    color #444
    font-weight normal
    display inline
  .carbon-img
    float left
    margin-right 1rem
    border 1px solid $borderColor
    img
      display block
  .carbon-poweredby
    color #999
    display block
    margin-top 0.5em
@media (max-width: $MQMobile)
  .carbon-ads
    .carbon-img img
      width 100px
      height 77px
</style>
