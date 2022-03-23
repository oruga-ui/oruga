import { defineComponent, DefineComponent } from 'vue'
import { hasFlag } from './helpers'

const items = 1
const sorted = 3

export const Items = items
export const Sorted = sorted

export default (itemName: string, flags: number = 0) => {
    const mixin: DefineComponent = defineComponent({
        provide() {
            return {
                ['o' + itemName]: this
            }
        }
    })

    if (hasFlag(flags, items)) {
        mixin.data = function () {
            return {
                childItems: [],
                sequence: 1
            }
        }
        mixin.methods = {
            _registerItem(item) {
                item.index = this.childItems.length
                this.childItems.push(item)
                if (this.$el) {
                    this.$nextTick(() => {
                        const ids = this.childItems.map(it => `[data-id="${itemName}-${it.newValue}"]`).join(',')
                        const sortedIds = Array.from(this.$el.querySelectorAll(ids)).map(
                            (el: any) => el.getAttribute('data-id').replace(`${itemName}-`, ''))
                        this.childItems.forEach(it => it.index = sortedIds.indexOf(`${it.newValue}`))
                    })
                }
            },
            _unregisterItem(item) {
                this.childItems = this.childItems.filter((i) => i !== item)
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
