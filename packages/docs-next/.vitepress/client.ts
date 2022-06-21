import { defineClientConfig } from '@vuepress/client'
import { markRaw } from 'vue'

// THEME
import './theme/styles/index.scss'
import CarbonAds from './theme/components/CarbonAds.vue'
import DocWrapper from './theme/components/DocWrapper.vue'
import HFRepos from './theme/components/HFRepos.vue'
import Inspector from './theme/components/Inspector.vue'
import ExampleViewer from './theme/components/ExampleViewer.vue'
import Expo from './theme/components/Expo.vue'

import Oruga from '@oruga-ui/oruga-next';
import '@oruga-ui/oruga-next/dist/oruga-full-vars.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { Examples, Inspectors } from './examples'

export default defineClientConfig({
    enhance({ app, router, siteData }){



        app.use(Oruga)

            for (const key in Examples) {
                app.component(key.toLowerCase(), Examples[key])
            }

            for (const key in Inspectors) {
                app.component(key.toLowerCase(), Inspectors[key])
            }

        app.component('CarbonAds', CarbonAds)
        app.component('DocWrapper', DocWrapper)
        app.component('HFRepos', HFRepos)
        app.component('Inspector', Inspector)
        app.component('ExampleViewer', ExampleViewer)
        app.component('Expo', Expo)



    },
    setup() {},
    rootComponents: [],
})
