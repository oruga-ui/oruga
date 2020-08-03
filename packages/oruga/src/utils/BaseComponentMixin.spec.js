import { shallowMount } from '@vue/test-utils'
import BaseComponentMixin from '@utils/BaseComponentMixin'
import OButton from '@components/button/Button'

import { merge } from '@utils/helpers'
import config, { setOptions } from '@utils/config'

let wrapper

describe('BaseComponentMixin', () => {
    HTMLElement.prototype.insertAdjacentElement = jest.fn()
    beforeEach(() => {
        /* component = {
            template: '<div class="o-component"></div>'
        } */
        wrapper = shallowMount(OButton, {
            attachToDocument: true,
            mixins: [BaseComponentMixin]
        })
    })

    describe('computedClass method', () => {
        it('can use global classes', async () => {
            const initialTestValue = 'initial test'
            const newTestValue = 'new test'

            setOptions(merge(config, {
                button: {
                    test: newTestValue
                }
            }, true))
            await wrapper.vm.$nextTick()
            expect(wrapper.vm.computedClass('button', 'test', initialTestValue)).toBe(`${initialTestValue} ${newTestValue}`)

            setOptions(merge(config, {
                button: {
                    override: true
                }
            }, true))
            await wrapper.vm.$nextTick()
            expect(wrapper.vm.computedClass('button', 'test', initialTestValue)).toBe(newTestValue)
        })

        it('applies local classes as expected', async () => {
            // TODO test local classes -- rootClass
            const initialRootClassValue = 'initial-class'
            const newGlobalRootClassValue = 'new-global-class'
            const newRootClassValue = 'new-class'

            setOptions(merge(config, {
                button: {
                    rootClass: newGlobalRootClassValue,
                    override: false
                }
            }, true))
            wrapper.setProps({ rootClass: newRootClassValue })
            await wrapper.vm.$nextTick()
            expect(wrapper.vm.computedClass('button', 'rootClass', initialRootClassValue)).toBe(`${initialRootClassValue} ${newGlobalRootClassValue} ${newRootClassValue}`)

            setOptions(merge(config, {
                button: {
                    override: true
                }
            }, true))
            await wrapper.vm.$nextTick()
            expect(wrapper.vm.computedClass('button', 'rootClass', initialRootClassValue)).toBe(`${newGlobalRootClassValue} ${newRootClassValue}`)
        })
    })
})
