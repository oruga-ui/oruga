import { markRaw } from 'vue'

// THEME
import Layout from './layout/Layout.vue'
import './styles/fonts.css'
import './styles/vars.css'
import './styles/base.css'
import './styles/utils.css'
import './styles/components/custom-block.css'
import './styles/components/vp-code.css'
import './styles/components/vp-doc.css'
import './styles/components/vp-sponsor.css'

import DocWrapper from './components/DocWrapper.vue'
import HFRepos from './components/HFRepos.vue'
import Inspector from './components/Inspector.vue'
import ExampleViewer from './components/ExampleViewer.vue'
import Expo from './components/Expo.vue'

import Oruga from '@oruga-ui/oruga-next'
// import '@oruga-ui/oruga-next/dist/oruga-full-vars.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

export default {
  Layout: Layout,
  enhanceApp({ app }) {

    library.add(fas);

    app.component('vue-fontawesome', FontAwesomeIcon);

    app.component('DocWrapper', DocWrapper)
    app.component('HFRepos', HFRepos)
    app.component('Inspector', Inspector)
    app.component('ExampleViewer', ExampleViewer)
    app.component('Expo', Expo)



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

    if (typeof window !== 'undefined') {
        const theme = localStorage.getItem('oruga.io_theme') || 'fullcss'
        switch (theme) {
            case 'fullcss': {
                app.use(Oruga, {
                    iconPack: 'fas',
                    iconComponent: 'vue-fontawesome'
                })
                const link = document.createElement('link')
                link.rel = 'stylesheet'
                link.href = 'https://cdn.jsdelivr.net/npm/@oruga-ui/oruga-next/dist/oruga-full-vars.min.css'
                document.head.appendChild(link)
                break
            }
            case 'basecss': {
                app.use(Oruga, {
                    iconPack: 'fas',
                    iconComponent: 'vue-fontawesome'
                })
                const link = document.createElement('link')
                link.rel = 'stylesheet'
                link.href = 'https://cdn.jsdelivr.net/npm/@oruga-ui/oruga-next/dist/oruga.min.css'
                document.head.appendChild(link)
                break
            }
            case 'bulmacss': {
                import ('@oruga-ui/theme-bulma').then(ret => {
                    const bulmaConf = ret.bulmaConfig
                    bulmaConf.iconPack = 'fas'
                    bulmaConf.iconComponent = 'vue-fontawesome'
                    app.use(Oruga, bulmaConf)
                })
                const link = document.createElement('link')
                link.rel = 'stylesheet'
                link.href = 'https://cdn.jsdelivr.net/npm/@oruga-ui/theme-bulma/dist/bulma.min.css'
                document.head.appendChild(link)
                break
            }
        }
    } else {
        app.use(Oruga)
    }

  }
}
