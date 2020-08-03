import { shallowMount } from '@vue/test-utils'
import OSwitch from '@components/switch/Switch'

let wrapper

describe('OSwitch', () => {
    beforeEach(() => {
        wrapper = shallowMount(OSwitch)
    })

    it('is called', () => {
        expect(wrapper.exists()).toBeTruthy()
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('renders input element by default', () => {
        expect(wrapper.contains('input')).toBeTruthy()
        expect(wrapper.classes()).toContain('o-switch')
    })

    it('updates internal value when v-model is changed', async () => {
        const newValue = 'switch value'
        wrapper.setProps({ value: newValue })
        await wrapper.vm.$nextTick()
        expect(wrapper.vm.newValue).toBe(newValue)
    })

    it('emit input event when computedValue is set', () => {
        const newValue = 'switch value'
        wrapper.vm.computedValue = newValue
        const valueEmitted = wrapper.emitted()['input'][0]
        expect(wrapper.vm.newValue).toBe(newValue)
        expect(valueEmitted).toContainEqual(newValue)
    })

    it('method focus() gives focus to the input element', async () => {
        wrapper.vm.$refs.input.focus = jest.fn()
        wrapper.vm.focus()
        await wrapper.vm.$nextTick()
        expect(wrapper.vm.$refs.input.focus).toHaveBeenCalled()
    })

    it('applies passiveVariant prop properly', async () => {
        const passiveVariant = 'danger'
        const value = false
        wrapper.setProps({ passiveVariant, value })
        await wrapper.vm.$nextTick()
        const switchElement = wrapper.find('.o-switch-check')
        expect(switchElement.classes()).toContain('o-color-danger-passive')
    })
})
