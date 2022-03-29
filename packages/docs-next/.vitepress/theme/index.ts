import { h, App } from 'vue'
import { VPTheme } from '@vue/theme'

export default Object.assign({}, VPTheme, {
  Layout: () => {
    // @ts-ignore
    return h(VPTheme.Layout, null, {

    })
  },
  enhanceApp({ app }: { app: App }) {
  }
})
