import { shallowMount } from '@vue/test-utils'
import ORadio from '@components/radio/Radio'

let wrapper

describe('ORadio', () => {
    beforeEach(() => {
        wrapper = shallowMount(ORadio)
    })

    it('is called', () => {
        expect(wrapper.exists()).toBeTruthy()
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('has an input radio', () => {
        expect(wrapper.contains('label input[type=radio]')).toBeTruthy()
    })

    it('emit input event with value when value change', async () => {
        wrapper.setProps({ value: true })
        await wrapper.vm.$nextTick()
        expect(wrapper.vm.computedValue).toBeTruthy()

        wrapper.vm.computedValue = false
        await wrapper.vm.$nextTick()
        const valueEmitted = wrapper.emitted()['input'][0]
        expect(valueEmitted).toContainEqual(false)
    })

    it('method focus() gives focus to the input element', (done) => {
        wrapper.vm.$refs.input.focus = jest.fn()
        wrapper.vm.focus()
        wrapper.vm.$nextTick(() => {
            expect(wrapper.vm.$refs.input.focus).toHaveBeenCalled()
            done()
        })
    })
})
