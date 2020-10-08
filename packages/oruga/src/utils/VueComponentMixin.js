import { isVue2, createElement, existsSlot, setScopedSlot, getSlotInstance, getListeners } from './vue-utils'

export default (params = {}) => {
    const vModel = params.vModel
    const mixin = {
        props: {
            /** @model */
            value: vModel,
            /** @ignore */
            modelValue: vModel
        },
        data() {
            return {
                vueReady: false
            }
        },
        computed: {
            listeners() {
                return getListeners(this)
            },
            model() {
                return isVue2() ? this.value : this.modelValue
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
                this.$watch(this.modelName, this.onModelChange)
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
        },
        // Vue 3: beforeDestroy -> beforeUnmount
        beforeUnmount() {
            if (typeof this.$options.beforeDestroy !== 'undefined') {
                this.$options.beforeDestroy.apply(this)
            }
        }
    }
    return mixin
}
