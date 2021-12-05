import { mount } from '@vue/test-utils'
import OCarousel from '@components/carousel/Carousel'
import OCarouselItem from '@components/carousel/CarouselItem'

let wrapper
let wrapperParent

const WrapperComp = {
    data() {
        return {}
    },
    template: `
        <OCarousel ref="carousel">
            <OCarouselItem value="item1"/>
            <OCarouselItem ref="testItem" value="item2"/>
            <OCarouselItem value="item3"/>
        </OCarousel>`,
    components: {
        OCarousel, OCarouselItem
    }
}

describe('OCarouselItem', () => {
    beforeEach(() => {
        wrapperParent = mount(WrapperComp, { sync: false })
        wrapper = wrapperParent.find({ ref: 'testItem' })
    })

    it('is called', () => {
        expect(wrapper.name()).toBe('OCarouselItem')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('computes its position correctly', () => {
        expect(wrapper.vm.index).toBe(1)
    })
})
