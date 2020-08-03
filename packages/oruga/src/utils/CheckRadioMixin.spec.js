import { shallowMount } from '@vue/test-utils'
import CheckRadioMixin from '@utils/CheckRadioMixin'

let wrapper

describe('CheckRadioMixin', () => {
    HTMLElement.prototype.insertAdjacentElement = jest.fn()
    beforeEach(() => {
        const component = {
            template: '<div class="o-component"></div>'
        }
        wrapper = shallowMount(component, {
            attachToDocument: true,
            mixins: [CheckRadioMixin]
        })
    })

    it('set value prop', async () => {
        wrapper.setProps({
            value: 'test'
        })
        await wrapper.vm.$nextTick()
        expect(wrapper.vm.newValue).toEqual('test')
    })
})
