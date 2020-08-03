import { mount } from '@vue/test-utils'
import OSlider from '@components/slider/Slider'
import OSliderTick from '@components/slider/SliderTick'

let wrapper
let wrapperParent

const WrapperComp = {
    template: `
        <OSlider>
            <OSliderTick ref="tick" />
        </OSlider>`,
    components: {
        OSlider, OSliderTick
    }
}

describe('OSliderTick', () => {
    beforeEach(() => {
        wrapperParent = mount(WrapperComp)
        wrapper = wrapperParent.find({ ref: 'tick' })
    })

    it('is called', () => {
        expect(wrapper.exists()).toBeTruthy()
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })
})
