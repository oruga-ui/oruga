import { defineClientAppEnhance } from '@vuepress/client'

import Oruga from '@oruga-ui/oruga-next'
import '@oruga-ui/oruga-next/dist/oruga-full-vars.min.css'

export default defineClientAppEnhance(({ app, router, siteData }) => {
    app.use(Oruga)
})
