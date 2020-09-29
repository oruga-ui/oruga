import { isVue2, createElement, existsSlot, setScopedSlot, getSlotInstance, getListeners } from './vue-utils'

export default (vModel = false) => {
    const mixin = {
        data() {
            return {
                vueReady: false
            }
        },
        computed: {
            listeners() {
                return getListeners(this)
            }
        },
        methods: {
            existsSlot(name, scoped) {
                return existsSlot(this, name, scoped)
            },
            getSlotInstance(name, scoped, props) {
                return getSlotInstance(this, name, scoped, props)
            },
            setScopedSlot(name, value) {
                setScopedSlot(this, name, value)
            },
            emitModelValue(value) {
                if (isVue2()) {
                    this.$emit('input', value)
                } else {
                    this.$emit('update:modelValue', value)
                }
            }
        },
        created() {
            if (isVue2()) {
                this.vueReady = true
            } else {
                import('vue').then(module => {
                    this.$nextTick = module['nextTick']
                    this.$createElement = (tag, data, children) => createElement(module, tag, data, children)
                    this.vueReady = true
                })
            }
        }
    }

    if (vModel) {
        if (isVue2()) {
            mixin.props = {
                /** @model */
                value: vModel
            }
            mixin.watch = {
                value(value) {
                    this.modelValue = value
                }
            }
        }
    }

    if (!isVue2()) {
        mixin.beforeUnmount = function() {
            this.$options.beforeDestroy.apply(this)
        }
    }

    return mixin
}
