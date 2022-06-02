import { defineClientConfig } from '@vuepress/client'

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

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

export default defineClientConfig({
    enhance({ app, router, siteData }){

        app.component('CarbonAds', CarbonAds)
        app.component('DocWrapper', DocWrapper)
        app.component('HFRepos', HFRepos)
        app.component('Inspector', Inspector)
        app.component('InspectorViewer', InspectorViewer)
        app.component('ExampleViewer', ExampleViewer)

        library.add(fas)

        app.component('vue-fontawesome', FontAwesomeIcon)

        app.use(Oruga, {
            iconPack: 'fas',
            iconComponent: 'vue-fontawesome'
        })
    },
    setup(){},
    rootComponents: [],
})
