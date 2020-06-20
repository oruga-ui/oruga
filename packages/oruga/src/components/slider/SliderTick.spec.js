import { shallowMount } from '@vue/test-utils'
import OSliderTick from '@components/slider/SliderTick'

let wrapper
const OSlider = {
    template: '<o-slider-stub></o-slider-stub>',
}

describe('OSliderTick', () => {
    beforeEach(() => {
        wrapper = shallowMount(OSliderTick, {
            parentComponent: OSlider
        })
    })

    it('is called', () => {
        expect(wrapper.name()).toBe('OSliderTick')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })
})
