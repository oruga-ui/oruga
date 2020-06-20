import { shallowMount } from '@vue/test-utils'
import OSliderThumb from '@components/slider/SliderThumb'

let wrapper
const OSlider = {
    template: '<o-slider-stub></o-slider-stub>',
    data() {
        return {
            step: 5,
            precision: 2
        }
    }
} // Mocking only necessary

describe('OSliderThumb', () => {
    beforeEach(() => {
        wrapper = shallowMount(OSliderThumb, {
            parentComponent: OSlider
        })
    })

    it('is called', () => {
        expect(wrapper.name()).toBe('OSliderThumb')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('inherits parent properties', () => {
        expect(wrapper.vm.step).toBe(OSlider.data().step)
        expect(wrapper.vm.precision).toBe(OSlider.data().precision)
    })

    it('manage focus', () => {
        wrapper.vm.onFocus()
        expect(wrapper.vm.isFocused).toBeTruthy()

        wrapper.vm.onBlur()
        expect(wrapper.vm.isFocused).toBeFalsy()
    })
})
