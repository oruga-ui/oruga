import DefaultTheme from 'vitepress/theme'

import { markRaw } from 'vue'

// THEME
import './styles/index.scss'
import CarbonAds from './components/CarbonAds.vue'
import DocWrapper from './components/DocWrapper.vue'
import HFRepos from './components/HFRepos.vue'
import Inspector from './components/Inspector.vue'
import ExampleViewer from './components/ExampleViewer.vue'
import Expo from './components/Expo.vue'

import Oruga from '@oruga-ui/oruga-next';
import '@oruga-ui/oruga-next/dist/oruga-full-vars.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { Examples, Inspectors } from './examples'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
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

  }
}
