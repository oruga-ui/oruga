import { shallowMount } from '@vue/test-utils'
import BaseComponentMixin from '@utils/BaseComponentMixin'

let wrapper

describe('BaseComponentMixin', () => {
    HTMLElement.prototype.insertAdjacentElement = jest.fn()
    beforeEach(() => {
        const component = {
            template: '<div class="o-component"></div>'
        }
        wrapper = shallowMount(component, {
            attachToDocument: true,
            mixins: [BaseComponentMixin]
        })

        it('computedClass method', () => {
            expect(wrapper.vm.computedClass).exists()
        })
    })
})
