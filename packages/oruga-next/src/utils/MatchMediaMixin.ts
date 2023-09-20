import { defineComponent } from 'vue'
import { getOptions } from './config'
import { getValueByPath } from './helpers'

export default defineComponent({
    props: {
        /**
         * Mobile breakpoint as max-width value
         */
        mobileBreakpoint: String
    },
    data() {
        return {
            isMatchMedia: undefined
        }
    },
    methods: {
        onMatchMedia(event: any) {
            this.isMatchMedia = event.matches
        }
    },
    mounted() {
        let width = this.mobileBreakpoint
        if (!width) {
            const config = getOptions()
            const defaultWidth = getValueByPath(config, `mobileBreakpoint`, '1023px')
            width = getValueByPath(config, `${this.$options.configField}.mobileBreakpoint`, defaultWidth)
        }
        this.$mediaRef = window.matchMedia(`(max-width: ${width})`)
        if (this.$mediaRef) {
            this.isMatchMedia = this.$mediaRef.matches
            this.$mediaRef.addEventListener('change', this.onMatchMedia)
        } else {
            this.isMatchMedia = false
        }
    },
    unmounted() {
        if (this.$mediaRef) {
            this.$mediaRef.removeEventListener('change', this.onMatchMedia)
        }
    }
})
