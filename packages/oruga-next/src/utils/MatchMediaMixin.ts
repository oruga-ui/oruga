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
            matchMediaRef: undefined,
            isMatchMedia: undefined
        }
    },
    methods: {
        onMatchMedia(event: any) {
            this.isMatchMedia = event.matches
        }
    },
    created() {
        if (typeof window !== 'undefined') {
            let width = this.mobileBreakpoint
            if (!width) {
                const config = getOptions()
                const defaultWidth = getValueByPath(config, `mobileBreakpoint`, '1023px')
                width = getValueByPath(config, `${this.$options.configField}.mobileBreakpoint`, defaultWidth)
            }
            this.matchMediaRef = window.matchMedia(`(max-width: ${width})`)
            this.isMatchMedia = this.matchMediaRef.matches
            this.matchMediaRef.addListener(this.onMatchMedia, false)
        }
    },
    beforeUnmount() {
        if (typeof window !== 'undefined') {
            this.matchMediaRef.removeListener(this.checkMatchMedia)
        }
    }
})
