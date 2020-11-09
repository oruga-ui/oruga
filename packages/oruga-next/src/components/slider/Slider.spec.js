import { shallowMount } from '@vue/test-utils'
import OSlider from '@components/slider/Slider'

let wrapper

describe('OSlider', () => {
    beforeEach(() => {
        wrapper = shallowMount(OSlider)
    })

    it('is called', () => {
        expect(wrapper.exists()).toBeTruthy()
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('manage props correctly', async () => {
        const newVariant = 'is-info'
        expect(wrapper.vm.newTooltipVariant).toBe(wrapper.vm.variant)
        wrapper.setProps({ tooltipVariant: newVariant })
        expect(wrapper.vm.newTooltipVariant).toBe(newVariant)

        const value1 = 3
        const value2 = 5
        const value = [value1, value2]
        const min = 1
        const max = 7
        wrapper.setProps({ value, min, max })
        await wrapper.vm.$nextTick()
        expect(wrapper.vm.value1).toBe(value1)
        expect(wrapper.vm.value2).toBe(value2)
        expect(wrapper.vm.minValue).toBe(value1)
        expect(wrapper.vm.maxValue).toBe(value2)

        expect(wrapper.vm.tickValues).toEqual([])
        wrapper.setProps({ ticks: true })
        await wrapper.vm.$nextTick()
        expect(wrapper.vm.tickValues).toEqual([2, 3, 4, 5, 6])

        expect(wrapper.vm.precision).toBe(0)
        wrapper.setProps({ step: 0.5 })
        await wrapper.vm.$nextTick()
        expect(wrapper.vm.precision).toBe(1)
    })

    describe('When biggerSliderFocus is set to true', () => {
        it('renders a component with sliderFocus class', async () => {
            wrapper.setProps({biggerSliderFocus: true})
            await wrapper.vm.$nextTick()
            const subject = wrapper.find('.o-slider-focus')
            expect(subject.exists()).toBeTruthy()
        })
    })
})
