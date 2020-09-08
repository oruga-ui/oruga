import { isVue2, createElement, getScopedSlot, setScopedSlot } from './vue-utils'

export default {
    data() {
        return {
            vueReady: false
        }
    },
    methods: {
        getScopedSlot(name) {
            getScopedSlot(this, name)
        },
        setScopedSlot(name, value) {
            setScopedSlot(this, name, value)
        }
    },
    beforeCreate() {
        if (isVue2()) {
            this.vueReady = true
        } else {
            import('vue').then(vue => {
                this.$nextTick = vue['nextTick']
                this.$createElement = (tag, data, children) => {
                    return createElement(vue, tag, data, children)
                }
                this.vueReady = true
            })
        }
    }
}
