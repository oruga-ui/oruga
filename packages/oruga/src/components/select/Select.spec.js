import { shallowMount } from '@vue/test-utils'
import OSelect from '@components/select/Select'

let wrapper

describe('OSelect', () => {
    beforeEach(() => {
        wrapper = shallowMount(OSelect)
    })

    it('is called', () => {
        expect(wrapper.name()).toBe('OSelect')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('has a select element', () => {
        expect(wrapper.contains('select')).toBeTruthy()
    })

    it('emit input event with value when value change', () => {
        wrapper.setProps({ value: true })
        expect(wrapper.vm.computedValue).toBeTruthy()
        wrapper.vm.computedValue = false
        const valueEmitted = wrapper.emitted()['input'][0]
        expect(valueEmitted).toContainEqual(false)
    })
})
