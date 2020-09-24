import { hasFlag } from './helpers'

const sorted = 1
const optional = 2

export const Sorted = sorted
export const Optional = optional

export default (parentItemName, flags = 0) => {
    const mixin = {
        inject: {
            parent: { from: 'o' + parentItemName }
        },
        created() {
            this.newValue = this.value === undefined ? this.parent._nextSequence() : this.value
            if (!this.parent) {
                if (!hasFlag(flags, optional)) {
                    throw new Error('You should wrap ' + this.$options.name + ' in a ' + parentItemName)
                }
            } else if (this.parent._registerItem) {
                this.parent._registerItem(this)
            }
        },
        beforeDestroy() {
            if (this.parent && this.parent._unregisterItem) {
                this.parent._unregisterItem(this)
            }
        },
        // Vue 3
        beforeUnmount() {
            this.$options.beforeDestroy.apply(this)
        }
    }
    if (hasFlag(flags, sorted)) {
        mixin.data = () => {
            return {
                index: null
            }
        }
    }
    return mixin
}
