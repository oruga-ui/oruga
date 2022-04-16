import { defaultIfUndefined, hasFlag } from './helpers'

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
            this.newValue = defaultIfUndefined(this.value, this.parent._nextSequence())
            if (!this.parent) {
                if (!hasFlag(flags, optional)) {
                    throw new Error('You should wrap ' + this.$options.name + ' in a ' + parentItemName)
                }
            } else {
                this.parent._registerItem(this)
            }
        },
        beforeDestroy() {
            if (this.parent) {
                this.parent._unregisterItem(this)
            }
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
