import { shallowMount } from '@vue/test-utils'
import OInputitems from '@components/inputitems/Inputitems'

describe('OInputitems', () => {
    it('is called', () => {
        const wrapper = shallowMount(OInputitems)
        expect(wrapper.name()).toBe('OInputitems')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('render correctly', () => {
        const wrapper = shallowMount(OInputitems)
        expect(wrapper.html()).toMatchSnapshot()
    })


})
