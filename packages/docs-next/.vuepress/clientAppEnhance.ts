import { defineClientAppEnhance } from '@vuepress/client'

// THEME
import './theme/styles/index.scss'
import CarbonAdsVue from './theme/components/CarbonAds.vue'

import Oruga from '@oruga-ui/oruga-next'
import '@oruga-ui/oruga-next/dist/oruga-full-vars.min.css'

export default defineClientAppEnhance(({ app, router, siteData }) => {

    app.component('CarbonAds', CarbonAdsVue)

    app.use(Oruga)
})
