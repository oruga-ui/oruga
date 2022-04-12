import { defineClientAppEnhance } from '@vuepress/client'

// THEME
import './theme/styles/index.scss'
import CarbonAds from './theme/components/CarbonAds.vue'
import DocWrapper from './theme/components/DocWrapper.vue'
import HFRepos from './theme/components/HFRepos.vue'
import Inspector from './theme/components/Inspector.vue'
import InspectorViewer from './theme/components/InspectorViewer.vue'
import ExampleViewer from './theme/components/ExampleViewer.vue'

import Oruga from '@oruga-ui/oruga-next'
import '@oruga-ui/oruga-next/dist/oruga-full-vars.min.css'

export default defineClientAppEnhance(({ app }) => {

    app.component('CarbonAds', CarbonAds)
    app.component('DocWrapper', DocWrapper)
    app.component('HFRepos', HFRepos)
    app.component('Inspector', Inspector)
    app.component('InspectorViewer', InspectorViewer)
    app.component('ExampleViewer', ExampleViewer)

    app.use(Oruga)
})
