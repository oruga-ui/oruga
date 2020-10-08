import { hasFlag } from './helpers'

const items = 1
const sorted = 3

export const Items = items
export const Sorted = sorted

export default (itemName, flags = 0) => {
    const mixin = {
        provide() {
            return {
                ['o' + itemName]: this
            }
        }
    }

    if (hasFlag(flags, items)) {
        mixin.data = function () {
            return {
                childItems: [],
                sequence: 1
            }
        }
        mixin.methods = {
            _registerItem(item) {
                this.$nextTick(() => {
                    item.index = this.childItems.length
                    this.childItems.push(item)
                })
            },
            _unregisterItem(item) {
                this.$nextTick(() => {
                    this.childItems = this.childItems.filter((i) => i !== item)
                    let index = 0
                    this.childItems.forEach(it => {
                        it.index = index++
                    })
                })
            },
            _nextSequence() {
                return this.sequence++
            }
        }

        if (hasFlag(flags, sorted)) {
            mixin.computed = {
                /**
                 * When items are added/removed sort them according to their position
                 */
                sortedItems() {
                    return this.childItems.slice().sort((i1, i2) => {
                        return i1.index - i2.index
                    })
                }
            }
        }
    }
    return mixin
}
