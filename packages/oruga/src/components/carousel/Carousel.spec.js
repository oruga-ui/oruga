import { shallowMount } from '@vue/test-utils'
import OCarousel from '@components/carousel/Carousel'
import BIcon from '@components/icon/Icon'
import {default as InjectedChildMixin, Sorted} from '../../utils/InjectedChildMixin'

let wrapper

const mockCarouselItems = {
    mixins: [InjectedChildMixin('carousel', Sorted)],
    name: 'OCarouselItem',
    template: '<div></div>',
    computed: {
        isActive() {
            return this.parent.activeIndex === this.index
        }
    }
}

describe('OCarousel', () => {
    beforeEach(() => {
        wrapper = shallowMount(OCarousel, {
            sync: false,
            Component: BIcon,
            propsData: {
                autoplay: false,
                repeat: false
            },
            stubs: {'o-carousel-item': mockCarouselItems},
            slots: {
                default: [
                    '<o-carousel-item/>',
                    '<o-carousel-item/>'
                ]
            }
        })
    })

    it('is called', () => {
        expect(wrapper.name()).toBe('OCarousel')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('reacts when value changes', async () => {
        let value = 1
        wrapper.setProps({ value })
        await wrapper.vm.$nextTick()
        expect(wrapper.vm.activeIndex).toBe(value)

        value = 3
        wrapper.setProps({ value })
        await wrapper.vm.$nextTick()
        expect(wrapper.vm.activeIndex).toBe(1)

        value = 0
        wrapper.setProps({ value })
        await wrapper.vm.$nextTick()
        expect(wrapper.vm.activeIndex).toBe(value)
    })

    it('reacts when autoplay changes', async () => {
        wrapper.vm.startTimer = jest.fn(wrapper.vm.startTimer)
        wrapper.vm.pauseTimer = jest.fn(wrapper.vm.pauseTimer)
        wrapper.vm.next = jest.fn(wrapper.vm.next)

        let autoplay = true
        wrapper.setProps({ autoplay })
        await wrapper.vm.$nextTick()

        expect(wrapper.vm.autoplay).toBe(autoplay)
        expect(wrapper.vm.startTimer).toHaveBeenCalled()

        autoplay = false
        wrapper.setProps({ autoplay })

        await wrapper.vm.$nextTick()

        expect(wrapper.vm.autoplay).toBe(autoplay)
        expect(wrapper.vm.pauseTimer).toHaveBeenCalled()
    })

    it('manage next and previous accordingly', async () => {
        wrapper.vm.startTimer = jest.fn(() => wrapper.vm.startTimer)
        wrapper.vm.pauseTimer = jest.fn(() => wrapper.vm.pauseTimer)

        const first = 0
        const last = 1
        let repeat = false
        wrapper.setProps({ value: last, repeat })

        wrapper.vm.prev()
        expect(wrapper.vm.activeIndex).toBe(first)
        wrapper.vm.prev()
        expect(wrapper.vm.activeIndex).toBe(first) // Wont go below 0 without repeat prop
        repeat = true
        wrapper.setProps({ repeat })
        wrapper.vm.prev()
        expect(wrapper.vm.activeIndex).toBe(last) // Will be set to the last value using repeat
        await wrapper.vm.$nextTick()
        expect(wrapper.vm.startTimer).toHaveBeenCalled()

        wrapper.vm.next()
        expect(wrapper.vm.activeIndex).toBe(first) // Navigate to the first value with repeat
        wrapper.vm.next()
        expect(wrapper.vm.activeIndex).toBe(last)
        repeat = false
        wrapper.setProps({ repeat })
        wrapper.vm.next()
        expect(wrapper.vm.activeIndex).toBe(last) // Wont go above last when not using repeat
    })

    it('manage interaction with indicators', async () => {
        let indicator = wrapper.find('.o-car__indicator__item')

        const first = 0
        const last = 1
        wrapper.setProps({ value: last })
        await wrapper.vm.$nextTick()

        indicator.trigger('mouseover') // no change since indicatorMode is 'click'
        expect(wrapper.vm.activeIndex).toBe(last)

        indicator.trigger('click')
        expect(wrapper.vm.activeIndex).toBe(first)
    })

    it('autoplays', async () => {
        jest.useFakeTimers()
        wrapper.setProps({ autoplay: true, 'pause-hover': false, repeat: false })

        expect(wrapper.vm.activeIndex).toBe(0)

        await wrapper.vm.$nextTick()
        jest.runOnlyPendingTimers()
        await wrapper.vm.$nextTick()
        expect(wrapper.vm.activeIndex).toBe(1)

        jest.runOnlyPendingTimers()
        await wrapper.vm.$nextTick()
        expect(wrapper.vm.activeIndex).toBe(1)

        wrapper.setProps({ repeat: true })

        await wrapper.vm.$nextTick()
        jest.runOnlyPendingTimers()
        await wrapper.vm.$nextTick()
        expect(wrapper.vm.activeIndex).toBe(0)
    })

    it('pauses on hover', async () => {
        jest.useFakeTimers()
        wrapper.setProps({ autoplay: true, 'pause-hover': true, repeat: true })

        await wrapper.vm.$nextTick()
        jest.runOnlyPendingTimers()
        await wrapper.vm.$nextTick()

        expect(wrapper.vm.activeIndex).toBe(1)

        jest.runOnlyPendingTimers()
        await wrapper.vm.$nextTick()

        expect(wrapper.vm.activeIndex).toBe(0)

        wrapper.find('.o-car').trigger('mouseenter')

        jest.runOnlyPendingTimers()
        await wrapper.vm.$nextTick()

        expect(wrapper.vm.activeIndex).toBe(1)

        wrapper.find('.o-car').trigger('mouseleave')
        expect(wrapper.vm.activeIndex).toBe(1)

        jest.runOnlyPendingTimers()
        await wrapper.vm.$nextTick()

        expect(wrapper.vm.activeIndex).toBe(0)
    })

    /*
    it('drags correctly', async () => {
        wrapper = shallowMount(OCarousel, {
            sync: false,
            Component: BIcon,
            propsData: {
                autoplay: false,
                repeat: false,
                itemsToShow: 4,
            },
            stubs: {'o-carousel-item': mockCarouselItems},
            slots: {
                default: [
                    '<o-carousel-item/>',
                    '<o-carousel-item/>',
                    '<o-carousel-item/>',
                    '<o-carousel-item/>',
                    '<o-carousel-item/>',
                    '<o-carousel-item/>',
                    '<o-carousel-item/>'
                ]
            }
        })

        wrapper.setData({delta: 0})
        wrapper.vm._computedWatchers['itemWidth'].value = 100

        await wrapper.vm.$nextTick()
        expect(wrapper.vm.translation).toBe(-0)

        wrapper.setData({delta: -600})
        await wrapper.vm.$nextTick()
        expect(wrapper.vm.translation).toBe(-0)

        wrapper.setData({delta: 2000})
        await wrapper.vm.$nextTick()
        expect(wrapper.vm.translation).toBe(-400)

        wrapper.setProps({
            value: 4
        })
        expect(wrapper.vm.translation).toBe(-400)
        await wrapper.vm.$nextTick()
        wrapper.setData({delta: -300})
        await wrapper.vm.$nextTick()
        expect(wrapper.vm.translation).toBe(-100)
    })
    */

    it('destroys correctly', async () => {
        wrapper.setProps({autoplay: true})
        await wrapper.vm.$nextTick()
        expect(wrapper.vm.timer).toBeTruthy()
        wrapper.destroy()
        expect(wrapper.vm.timer).toBeFalsy()
    })

    it('reset timer before destroy', () => {
        wrapper.vm.pauseTimer = jest.fn(() => wrapper.vm.pauseTimer)

        wrapper.destroy()

        expect(wrapper.vm.pauseTimer).toHaveBeenCalled()
    })
})
