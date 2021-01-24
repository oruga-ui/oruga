import { shallowMount, mount } from '@vue/test-utils'
import OButton from '@components/button/Button'

let wrapper

describe('OButton', () => {
    beforeEach(() => {
        wrapper = shallowMount(OButton)
    })

    it('is called', () => {
        expect(wrapper.exists()).toBeTruthy()
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('emit a click event', () => {
        const click = jest.fn()
        wrapper = shallowMount(OButton, {
            listeners: {
                'click': click
            }
        })
        wrapper.find('.o-btn').trigger('click')
        expect(click).toHaveBeenCalledTimes(1)
    })

    it('should show icon', () => {
        wrapper = mount(OButton, {
            propsData: {
                iconLeft: 'plus'
            }
        })
        expect(wrapper.contains('.o-icon')).toBeTruthy()
    })

    it('should be medium', async () => {
        wrapper.setProps({
            size: 'medium'
        })
        await wrapper.vm.$nextTick()
        expect(wrapper.classes()).toContain('o-btn--medium')
    })

    it('should be small + icon', () => {
        wrapper = mount(OButton, {
            propsData: {
                size: 'small',
                iconLeft: 'plus'
            }
        })
        expect(wrapper.classes()).toContain('o-btn--small')
        expect(wrapper.contains('.o-btn__icon')).toBeTruthy()
    })

    it('should be large + icon', () => {
        wrapper = mount(OButton, {
            propsData: {
                size: 'large',
                iconLeft: 'plus'
            }
        })
        expect(wrapper.classes()).toContain('o-btn--large')
        expect(wrapper.contains('.o-btn__icon')).toBeTruthy()
    })

    it('should be rounded when prop is set to true', async () => {
        wrapper.setProps({
            rounded: true
        })
        await wrapper.vm.$nextTick()
        expect(wrapper.classes()).toContain('o-btn--rounded')
    })

    it('should set tag to "button" if disabled', () => {
        wrapper.setProps({
            tag: 'a'
        })
        expect(wrapper.vm.computedTag).toBe('a')

        wrapper = shallowMount(OButton, {
            attrs: {
                'disabled': true
            }
        })
        expect(wrapper.vm.computedTag).toBe('button')
    })
})
