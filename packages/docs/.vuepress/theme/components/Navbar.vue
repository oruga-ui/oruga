<template>
  <header class="navbar">
    <SidebarButton @toggle-sidebar="$emit('toggle-sidebar')" />

    <RouterLink
      :to="$localePath"
      class="home-link"
    >
      <img
        v-if="$site.themeConfig.logo"
        class="logo"
        :src="$withBase($site.themeConfig.logo)"
        :alt="$siteTitle"
      >
      <span
        v-if="$siteTitle"
        ref="siteName"
        class="site-name"
        :class="{ 'can-hide': $site.themeConfig.logo }"
      >{{ $siteTitle }}</span>
    </RouterLink>

    <div class="docs-switch-box">
      <o-switch
        override
        rootClass="navbar-switch"
        checkCheckedClass="navbar-switch__check--checked"
        checkClass="navbar-switch__check"
        checkSwitchClass="navbar-switch__check-switch"
        elementsWrapperClass="navbar-switch__wrapper"
        roundedClass="navbar-switch--rounded"
        :value="lite"
        @input="toggleOrugaStyle"
        labelClass="navbar-switch-label">
        Default CSS <a href="/documentation/#oruga-default-stylesheet" title="What does it mean?">[?]</a>
      </o-switch>
    </div>

    <div
      class="links"
      :style="linksWrapMaxWidth ? {
        'max-width': linksWrapMaxWidth + 'px'
      } : {}"
    >
      <AlgoliaSearchBox
        v-if="isAlgoliaSearch"
        :options="algolia"
      />
      <SearchBox v-else-if="$site.themeConfig.search !== false && $page.frontmatter.search !== false" />
      <NavLinks class="can-hide" />
    </div>
  </header>
</template>

<script>
import AlgoliaSearchBox from '@AlgoliaSearchBox'
import SearchBox from '@SearchBox'
import SidebarButton from '@theme/components/SidebarButton.vue'
import NavLinks from '@theme/components/NavLinks.vue'

import toggleStyle from './togglestyles.js'

export default {
  name: 'Navbar',

  components: {
    SidebarButton,
    NavLinks,
    SearchBox,
    AlgoliaSearchBox
  },

  data () {
    return {
      linksWrapMaxWidth: null,
      lite: false,
      showSwitch: process.env.NODE_ENV === 'production'
    }
  },

  computed: {
    algolia () {
      return this.$themeLocaleConfig.algolia || this.$site.themeConfig.algolia || {}
    },

    isAlgoliaSearch () {
      return this.algolia && this.algolia.apiKey && this.algolia.indexName
    }
  },

  methods: {
    toggleOrugaStyle(value, immediate = false) {
        this.lite = value
        localStorage.setItem('oruga.io_lite', value)
        toggleStyle(this.lite, immediate)
    }
  },

  mounted () {
    const MOBILE_DESKTOP_BREAKPOINT = 719 // refer to config.styl
    const NAVBAR_VERTICAL_PADDING = parseInt(css(this.$el, 'paddingLeft')) + parseInt(css(this.$el, 'paddingRight'))
    const handleLinksWrapWidth = () => {
      if (document.documentElement.clientWidth < MOBILE_DESKTOP_BREAKPOINT) {
        this.linksWrapMaxWidth = null
      } else {
        this.linksWrapMaxWidth = this.$el.offsetWidth - NAVBAR_VERTICAL_PADDING
          - (this.$refs.siteName && this.$refs.siteName.offsetWidth || 0)
      }
    }
    handleLinksWrapWidth()
    window.addEventListener('resize', handleLinksWrapWidth, false)
    if (typeof window !== 'undefined') {
      this.lite = localStorage.getItem('oruga.io_lite') === 'true'
    }
  }
}

function css (el, property) {
  // NOTE: Known bug, will return 'auto' if style value is 'auto'
  const win = el.ownerDocument.defaultView
  // null means not to return pseudo styles
  return win.getComputedStyle(el, null)[property]
}
</script>

<style lang="stylus">

.navbar-switch {
  cursor: pointer;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.navbar-switch--primary .navbar-switch__check--checked {
  background: #445e00;
}
.navbar-switch--primary-passive .navbar-switch__check:not(.navbar-switch__check--checked) {
  background: #445e00;
}
.navbar-switch--danger .navbar-switch__check--checked {
  background: #b60000;
}
.navbar-switch--danger-passive .navbar-switch__check:not(.navbar-switch__check--checked) {
  background: #b60000;
}
.navbar-switch--warning .navbar-switch__check--checked {
  background: #f4c300;
}
.navbar-switch--warning-passive .navbar-switch__check:not(.navbar-switch__check--checked) {
  background: #f4c300;
}
.navbar-switch--success .navbar-switch__check--checked {
  background: #006724;
}
.navbar-switch--success-passive .navbar-switch__check:not(.navbar-switch__check--checked) {
  background: #006724;
}
.navbar-switch--info .navbar-switch__check--checked {
  background: #005c98;
}
.navbar-switch--info-passive .navbar-switch__check:not(.navbar-switch__check--checked) {
  background: #005c98;
}
.navbar-switch--small {
  font-size: 0.75rem;
}
.navbar-switch--medium {
  font-size: 1.25rem;
}
.navbar-switch--large {
  font-size: 1.5rem;
}
.navbar-switch__wrapper {
  margin-left: -0.25em;
  margin-right: -0.25em;
  display: inline-flex;
  align-items: center;
  position: relative;
}
.navbar-switch__wrapper > * {
  margin-left: 0.25em;
  margin-right: 0.25em;
}
.navbar-switch__wrapper--left {
  flex-direction: row-reverse;
}
.navbar-switch__check-switch {
  content: "";
  display: block;
  height: calc((2.75em - 0.2em * 2) / 2);
  width: calc((2.75em - 0.2em * 2) / 2);
  background: #f5f5f5;
  box-shadow: 0 3px 1px 0 rgba(0, 0, 0, 0.05), 0 2px 2px 0 rgba(0, 0, 0, 0.1), 0 3px 3px 0 rgba(0, 0, 0, 0.05);
  transition-property: transform;
  transition-duration: 150ms;
  transition-timing-function: ease-out;
  will-change: transform;
  transform-origin: left;
}
.navbar-switch__check {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  width: 2.75em;
  height: calc(2.75em / 2 + 0.2em);
  padding: 0.2em;
  background: #b5b5b5;
  border-radius: 4px;
  transition-property: background;
  transition-duration: 150ms;
  transition-timing-function: ease-out;
}
.navbar-switch__check--checked {
  background: #445e00;
}
.navbar-switch__check--checked .navbar-switch__check-switch {
  transform: translate3d(100%, 0, 0);
}
.navbar-switch input[type=checkbox] {
  position: absolute;
  left: 0;
  opacity: 0;
  outline: none;
  z-index: -1;
}
.navbar-switch--rounded {
  border-radius: 9999px;
}
.navbar-switch--disabled {
  opacity: 0.5;
}


$navbar-vertical-padding = 0.7rem
$navbar-horizontal-padding = 1.5rem

.navbar
  padding $navbar-vertical-padding $navbar-horizontal-padding
  line-height $navbarHeight - 1.4rem
  .logo
    height $navbarHeight - 1.4rem
    min-width $navbarHeight - 1.4rem
    margin-right 0.8rem
    vertical-align top
  .site-name
    font-size 1.3rem
    font-weight 600
    color $textColor
    position relative
  .links
    padding-left 1.5rem
    box-sizing border-box
    background-color white
    white-space nowrap
    font-size 0.9rem
    position absolute
    right $navbar-horizontal-padding
    top $navbar-vertical-padding
    display flex
    .search-box
      flex: 0 0 auto
      vertical-align top
  .docs-switch-box
    display inline
    margin-left 0.8rem

.navbar-switch-label
    font-weight 500

@media (max-width: $MQMobile)
  .navbar
    padding-left 4rem
    .can-hide
      display none
    .links
      padding-left 1.5rem
    .site-name
      width calc(100vw - 9.4rem)
      overflow hidden
      white-space nowrap
      text-overflow ellipsis
</style>
