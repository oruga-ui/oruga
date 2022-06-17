import { defineClientConfig } from '@vuepress/client'
import { markRaw } from 'vue'

// THEME
import './theme/styles/index.scss'
import CarbonAds from './theme/components/CarbonAds.vue'
import DocWrapper from './theme/components/DocWrapper.vue'
import HFRepos from './theme/components/HFRepos.vue'
import Inspector from './theme/components/Inspector.vue'
import InspectorViewer from './theme/components/InspectorViewer.vue'
import ExampleViewer from './theme/components/ExampleViewer.vue'
import Expo from './theme/components/Expo.vue'

import Oruga from '../../oruga-next/dist/oruga';
import '../../oruga-next/dist/oruga-full-vars.css'

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
        app.component('Expo', Expo)

        library.add(fas)

        app.component('vue-fontawesome', FontAwesomeIcon)

        app.use(Oruga, {
            iconPack: 'fas',
            iconComponent: 'vue-fontawesome'
        })

        // @ts-ignore
        const examples = import.meta.globEager('./examples/**/index.vue')
        for (const path in examples) {
            const v = path.split('/')
            app.component('example-' + v[2], markRaw(examples[path].default))
        }

         // @ts-ignore
         const inspectors = import.meta.globEager('./examples/**/inspector.vue')
         for (const path in inspectors) {
             const v = path.split('/')
             app.component('inspector-' + v[2] + '-viewer', markRaw(inspectors[path].default))
         }
    },
    setup() {},
    rootComponents: [],
})
