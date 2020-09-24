import { hasFlag } from './helpers'
import { existsSlot, getSlotInstance } from './vue-utils'

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
                    this.childItems.push(item)
                })
            },
            _unregisterItem(item) {
                this.$nextTick(() => {
                    this.childItems = this.childItems.filter((i) => i !== item)
                })
            },
            _nextSequence() {
                return this.sequence++
            }
        }

        if (hasFlag(flags, sorted)) {
            mixin.watch = {
                /**
                 * When items are added/removed deep search in the elements default's slot
                 * And mark the items with their index
                 */
                childItems(items) {
                    if (items.length > 0 && existsSlot(this, 'default', true)) {
                        const tag = items[0].$vnode.tag
                        let index = 0
                        const deepSearch = (children) => {
                            for (const child of children) {
                                if (child.tag === tag) {
                                    // An item with the same tag will for sure be found
                                    const it = items.filter((i) => i.$vnode === child)[0]
                                    if (it) {
                                        it.index = index++
                                    }
                                } else if (child.tag) {
                                    const sub = child.componentInstance
                                        ? (existsSlot(child.componentInstance, 'default', true)
                                            ? getSlotInstance(child.componentInstance, 'default', true)
                                            : child.componentInstance.$children)
                                        : child.children
                                    if (Array.isArray(sub) && sub.length > 0) {
                                        deepSearch(sub.map((e) => e.$vnode))
                                    }
                                }
                            }
                            return false
                        }
                        deepSearch(getSlotInstance(this, 'default', true))
                    }
                }
            }
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
