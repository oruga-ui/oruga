import { shallowMount, mount } from '@vue/test-utils'
import OButton from '@components/button/Button'
import config, {setOptions} from '@utils/config'

let wrapper

describe('OButton', () => {
    beforeEach(() => {
        wrapper = shallowMount(OButton)
    })

    it('is called', () => {
        expect(wrapper.name()).toBe('OButton')
        expect(wrapper.isVueInstance()).toBeTruthy()
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
        wrapper.find('.button').trigger('click')
        expect(click).toHaveBeenCalledTimes(1)
    })

    it('should show icon', () => {
        wrapper = mount(OButton, {
            propsData: {
                iconLeft: 'plus'
            }
        })
        expect(wrapper.contains('.icon')).toBe(true)
    })

    it('should be medium', () => {
        wrapper.setProps({
            size: 'is-medium'
        })
        expect(wrapper.classes()).toContain('is-medium')
    })

    it('should be small + icon', () => {
        wrapper = mount(OButton, {
            propsData: {
                size: 'small',
                iconLeft: 'plus'
            }
        })
        expect(wrapper.classes()).toContain('small')
        expect(wrapper.contains('.icon')).toBe(true)
    })

    it('should be large + icon', () => {
        wrapper = mount(OButton, {
            propsData: {
                size: 'is-large',
                iconLeft: 'plus'
            }
        })
        expect(wrapper.classes()).toContain('is-large')
        expect(wrapper.contains('.icon')).toBe(true)
    })

    it('should be rounded when default config set to true', () => {
        setOptions(Object.assign(config, {
            defaultButtonRounded: true
        }))
        wrapper.setProps({
            rounded: config.defaultButtonRounded
        })
        expect(wrapper.classes()).toContain('is-rounded')
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
