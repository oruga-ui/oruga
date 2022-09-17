import { markRaw } from 'vue'

// THEME
import Layout from './layout/Layout.vue'
import NotFound from 'vitepress/dist/client/theme-default/NotFound.vue'
import './styles/fonts.css'
import './styles/vars.css'
import './styles/base.css'
import './styles/utils.css'
import './styles/index.scss'
import './styles/components/custom-block.css'
import './styles/components/vp-code.css'
import './styles/components/vp-doc.css'
import './styles/components/vp-sponsor.css'

import DocWrapper from './components/DocWrapper.vue'
import HFRepos from './components/HFRepos.vue'
import Inspector from './components/Inspector.vue'
import ExampleViewer from './components/ExampleViewer.vue'
import Expo from './components/Expo.vue'

import Oruga, { useProgrammatic } from '../../../oruga-next/dist/oruga'

import { bulmaConfig } from '@oruga-ui/theme-bulma'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

export default {
  Layout,
  NotFound,
  enhanceApp({ app }) {

    library.add(fas)

    app.component('vue-fontawesome', FontAwesomeIcon)

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

    app.use(Oruga, {
        iconPack: 'fas',
        iconComponent: 'vue-fontawesome'
    })

    if (typeof window !== 'undefined') {
        const theme = localStorage.getItem('oruga.io_theme') || 'fullcss'
        switch (theme) {
            case 'fullcss': {
                if (process.env.NODE_ENV !== 'production') {
                    // @ts-ignore
                    import('../../../oruga-next/dist/oruga-full-vars.css').then(() => {})
                } else {
                    const link = document.createElement('link')
                    link.rel = 'stylesheet'
                    link.href = 'https://cdn.jsdelivr.net/npm/@oruga-ui/oruga-next/dist/oruga-full-vars.min.css'
                    document.head.appendChild(link)
                }
                break
            }
            case 'basecss': {
                const link = document.createElement('link')
                link.rel = 'stylesheet'
                link.href = 'https://cdn.jsdelivr.net/npm/@oruga-ui/oruga-next/dist/oruga.min.css'
                document.head.appendChild(link)
                break
            }
            case 'bulmacss': {
                bulmaConfig.iconPack = 'fas'
                bulmaConfig.iconComponent = 'vue-fontawesome'
                const { oruga } = useProgrammatic()
                oruga.config.setOptions(bulmaConfig)
                const link = document.createElement('link')
                link.rel = 'stylesheet'
                link.href = 'https://cdn.jsdelivr.net/npm/@oruga-ui/theme-bulma/dist/bulma.min.css'
                document.head.appendChild(link)
                break
            }
        }
    }
  }
}
