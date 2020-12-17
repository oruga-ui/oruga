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
        const switchCheckElement = wrapper.find('.o-switch__check')
        expect(switchCheckElement.classes()).toContain('o-switch__check--unchecked')
        const switchElement = wrapper.find('.o-switch')
        expect(switchElement.classes()).toContain('o-switch--danger-passive')
    })

    it('does not have a label at left by default', () => {
        const value = false
        wrapper.setProps({ value })
        expect(wrapper.classes()).not.toContain('o-switch--left')
    })

    it('has label at left is left-label prop has been sent', async () => {
        const leftLabel = true
        const value = false
        wrapper.setProps({ leftLabel, value })
        await wrapper.vm.$nextTick()
        const wrapperElement = wrapper.find('.o-switch__wrapper')
        expect(wrapperElement.classes()).toContain('o-switch__wrapper--left')
    })
})
