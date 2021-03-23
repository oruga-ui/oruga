import { shallowMount } from '@vue/test-utils'
import BaseComponentMixin from '@utils/BaseComponentMixin'
import OButton from '@components/button/Button'

import { merge } from '@utils/helpers'
import { getOptions, setOptions } from '@utils/config'

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

            setOptions(merge(getOptions(), {
                button: {
                    test: newTestValue
                }
            }, true))
            await wrapper.vm.$nextTick()
            expect(wrapper.vm.computedClass('test', initialTestValue)).toBe(`${initialTestValue} ${newTestValue}`)

            setOptions(merge(getOptions(), {
                button: {
                    override: true
                }
            }, true))
            await wrapper.vm.$nextTick()
            expect(wrapper.vm.computedClass('test', initialTestValue)).toBe(newTestValue)
        })

        it('applies local classes as expected', async () => {
            // TODO test local classes -- rootClass
            const initialRootClassValue = 'initial-class'
            const newGlobalRootClassValue = 'new-global-class'
            const newRootClassValue = 'new-class'

            setOptions(merge(getOptions(), {
                button: {
                    rootClass: newGlobalRootClassValue,
                    override: false
                }
            }, true))
            wrapper.setProps({ rootClass: newRootClassValue })
            await wrapper.vm.$nextTick()
            expect(wrapper.vm.computedClass('rootClass', initialRootClassValue)).toBe(`${initialRootClassValue} ${newGlobalRootClassValue} ${newRootClassValue}`)

            setOptions(merge(getOptions(), {
                button: {
                    override: true
                }
            }, true))
            await wrapper.vm.$nextTick()
            expect(wrapper.vm.computedClass('rootClass', initialRootClassValue)).toBe(`${newGlobalRootClassValue} ${newRootClassValue}`)
        })

        it('applies local classes defined as array', async () => {
            // TODO test local classes -- rootClass
            const initialRootClassValue = 'initial-class'
            const newGlobalRootClassValue = 'new-global-class'
            const newRootClassValue = ['my-new-class', 'new-class']

            setOptions(merge(getOptions(), {
                button: {
                    rootClass: newGlobalRootClassValue,
                    override: false
                }
            }, true))
            wrapper.setProps({ rootClass: newRootClassValue })
            await wrapper.vm.$nextTick()
            expect(wrapper.vm.computedClass('rootClass', initialRootClassValue)).toBe(`${initialRootClassValue} ${newGlobalRootClassValue} ${newRootClassValue.join(' ')}`)

            setOptions(merge(getOptions(), {
                button: {
                    override: true
                }
            }, true))
            await wrapper.vm.$nextTick()
            expect(wrapper.vm.computedClass('rootClass', initialRootClassValue)).toBe(`${newGlobalRootClassValue} ${newRootClassValue.join(' ')}`)
        })

        it('applies override to single classes', async () => {
            const initialRootClassValue = 'initial-class'
            const newGlobalRootClassValue = 'new-global-class'
            const newRootClassValue = 'new-class'

            const initialSizeClassValue = 'initial-size-class'
            const newGlobalSizeClassValue = 'new-global-size-class--'
            const newSizeClassValue = 'new-size-class--'
            const sizeSuffix = 'centered'

            /* Override all except sizeClass */

            setOptions(merge(getOptions(), {
                button: {
                    override: true,
                    rootClass: {
                        class: newGlobalRootClassValue,
                        override: false
                    },
                    sizeClass: {
                        class: newGlobalSizeClassValue,
                    },
                }
            }, true))
            wrapper.setProps({ rootClass: newRootClassValue, sizeClass: newSizeClassValue })
            await wrapper.vm.$nextTick()
            expect(wrapper.vm.computedClass('rootClass', initialRootClassValue))
                .toBe(`${initialRootClassValue} ${newGlobalRootClassValue} ${newRootClassValue}`)

            expect(wrapper.vm.computedClass('sizeClass', initialSizeClassValue, sizeSuffix))
                .toBe(`${newGlobalSizeClassValue}${sizeSuffix} ${newSizeClassValue}${sizeSuffix}`)


            /* Override only sizeClass */
            setOptions(merge(getOptions(), {
                button: {
                    rootClass: {
                        class: newGlobalRootClassValue,
                    },
                    sizeClass: {
                        class: newGlobalSizeClassValue,
                        override: true
                    },
                }
            }, true))
            wrapper.setProps({ rootClass: newRootClassValue, sizeClass: newSizeClassValue })
            await wrapper.vm.$nextTick()
            expect(wrapper.vm.computedClass('rootClass', initialRootClassValue))
                .toBe(`${initialRootClassValue} ${newGlobalRootClassValue} ${newRootClassValue}`)

            expect(wrapper.vm.computedClass('sizeClass', initialSizeClassValue, sizeSuffix))
                .toBe(`${newGlobalSizeClassValue}${sizeSuffix} ${newSizeClassValue}${sizeSuffix}`)

            /* Override sizeClass using a function */
            setOptions(merge(getOptions(), {
                button: {
                    rootClass: {
                        class: newGlobalRootClassValue,
                    },
                    sizeClass: {
                        class: (suffix) => {
                            return `${newGlobalSizeClassValue}suff-${suffix}`
                        },
                        override: true
                    },
                }
            }, true))
            wrapper.setProps({ rootClass: newRootClassValue, sizeClass: newSizeClassValue })
            await wrapper.vm.$nextTick()
            expect(wrapper.vm.computedClass('rootClass', initialRootClassValue))
                .toBe(`${initialRootClassValue} ${newGlobalRootClassValue} ${newRootClassValue}`)

            expect(wrapper.vm.computedClass('sizeClass', initialSizeClassValue, sizeSuffix))
                .toBe(`${newGlobalSizeClassValue}suff-${sizeSuffix} ${newSizeClassValue}${sizeSuffix}`)

            /* Override sizeClass from prop using a function */
            setOptions(merge(getOptions(), {
                button: {
                    rootClass: {
                        class: newGlobalRootClassValue,
                    },
                    sizeClass: {
                        class: (suffix) => {
                            return `${newGlobalSizeClassValue}suff-${suffix}`
                        },
                        override: true
                    },
                }
            }, true))
            wrapper.setProps({ rootClass: newRootClassValue, sizeClass: (suffix) => `${newSizeClassValue}suff-${suffix}` })
            await wrapper.vm.$nextTick()
            expect(wrapper.vm.computedClass('rootClass', initialRootClassValue))
                .toBe(`${initialRootClassValue} ${newGlobalRootClassValue} ${newRootClassValue}`)

            expect(wrapper.vm.computedClass('sizeClass', initialSizeClassValue, sizeSuffix))
                .toBe(`${newGlobalSizeClassValue}suff-${sizeSuffix} ${newSizeClassValue}suff-${sizeSuffix}`)
        })
    })
})
