import { mount } from '@vue/test-utils'
import OSlider from '@components/slider/Slider'

let wrapper
let wrapperParent

describe('OSliderThumb', () => {
    beforeEach(() => {
        wrapperParent = mount(OSlider, {
            propsData: {
                step: 5,
            }
        })
        wrapper = wrapperParent.find({ ref: 'button1' })
    })

    it('is called', () => {
        expect(wrapper.exists()).toBeTruthy()
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('inherits parent properties', () => {
        expect(wrapper.vm.step).toBe(5)
    })

    it('manage focus', () => {
        wrapper.vm.onFocus()
        expect(wrapper.vm.isFocused).toBeTruthy()

        wrapper.vm.onBlur()
        expect(wrapper.vm.isFocused).toBeFalsy()
    })

})
