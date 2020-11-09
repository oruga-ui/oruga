import { DefineComponent, defineComponent } from 'vue'
import { hasFlag } from './helpers'

const items = 1
const sorted = 3

export const Items = items
export const Sorted = sorted

export default (itemName: string, flags = 0) => {
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
            _registerItem(item: any) {
                const vm = (this as any)
                vm.$nextTick(() => {
                    item.index = vm.childItems.length
                    vm.childItems.push(item)
                })
            },
            _unregisterItem(item: any) {
                const vm = (this as any)
                vm.$nextTick(() => {
                    vm.childItems = vm.childItems.filter((i: any) => i !== item)
                    let index = 0
                    vm.childItems.forEach((it: any) => {
                        it.index = index++
                    })
                })
            },
            _nextSequence() {
                return (this as any).sequence++
            }
        }

        if (hasFlag(flags, sorted)) {
            mixin.computed = {
                /**
                 * When items are added/removed sort them according to their position
                 */
                sortedItems() {
                    const vm = (this as any)
                    return vm.childItems.slice().sort((i1: any, i2: any) => {
                        return i1.index - i2.index
                    })
                }
            }
        }
    }
    return mixin
}
