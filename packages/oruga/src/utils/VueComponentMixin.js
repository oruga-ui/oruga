import { isVue2, createElement, existsSlot, setScopedSlot, getSlotInstance, getListeners } from './vue-utils'

export default (params = {}) => {
    const vModel = params.vModel
    const mixin = {
        data() {
            return {
                vueReady: false
            }
        },
        computed: {
            listeners() {
                return getListeners(this)
            },
            modelName() {
                return isVue2() ? 'value' : 'modelValue'
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
            emitModel(value) {
                if (isVue2()) {
                    this.$emit('input', value)
                } else {
                    this.$emit('update:modelValue', value)
                }
            },
            getModel() {
                return isVue2() ? this.value : this.modelValue
            }
        },
        created() {
            // v-model watch, onModelChange methods as convetion
            if (vModel && typeof this.onModelChange !== 'undefined') {
                this.$watch(this.getModel, this.onModelChange)
            }
            // set ready when vue module has been loaded
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
        } else {
            mixin.props = {
                /** @model */
                modelValue: vModel
            }
        }
    }

    if (!isVue2()) {
        // Vue 3: beforeDestroy -> beforeUnmount
        mixin.beforeUnmount = function() {
            if (typeof this.$options.beforeDestroy !== 'undefined') {
                this.$options.beforeDestroy.apply(this)
            }
        }
    }

    return mixin
}
