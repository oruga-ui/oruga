import { shallowMount } from '@vue/test-utils'
import OTooltip from '@components/tooltip/Tooltip'

let wrapper

describe('OTooltip', () => {
    beforeEach(() => {
        wrapper = shallowMount(OTooltip)
    })

    it('is called', () => {
        expect(wrapper.name()).toBe('OTooltip')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })
})
