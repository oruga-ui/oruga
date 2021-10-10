import { shallowMount, mount } from '@vue/test-utils'
import OInput from '@components/input/Input'

let wrapper

describe('OInput', () => {
    beforeEach(() => {
        wrapper = shallowMount(OInput)
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('is called', () => {
        expect(wrapper.exists()).toBeTruthy()
    })

    it('renders input element by default', () => {
        expect(wrapper.contains('input')).toBeTruthy()
        expect(wrapper.classes()).toContain('o-ctrl-input')
    })

    it('render textarea element when type is textarea', async () => {
        wrapper.setProps({ type: 'textarea' })
        await wrapper.vm.$nextTick()

        const target = wrapper.find('textarea')
        expect(target.exists()).toBeTruthy()
        expect(target.classes()).toContain('o-input')
        expect(target.attributes().style).toBeFalsy()
    })

    it('add inline style and call resize for textarea when autosize is true', async () => {
        wrapper.vm.resize = jest.fn()
        wrapper.setProps({ type: 'textarea', autosize: true, value: 'test' })
        await wrapper.vm.$nextTick()
    
        const target = wrapper.find('textarea')
        expect(target.attributes().style).toBeTruthy()

        wrapper.setProps({ type: 'textarea', autosize: true, value: 'test2' })
        await wrapper.vm.$nextTick()
        expect(wrapper.vm.resize).toHaveBeenCalled()
    })

    it('set height to certain px when resized', async () => {
        wrapper.setProps({ type: 'textarea', autosize: true, value: 'test' })
        wrapper.setData({height: 'auto'})
        wrapper.vm.resize() 
        await wrapper.vm.$nextTick()
        expect(wrapper.vm.height).toContain('px')
    })

    it('render field password when the type property is password', () => {
        const wrapper = shallowMount(OInput, {
            propsData: {
                type: 'password',
                passwordReveal: true
            }
        })

        const target = wrapper.find('input')
        expect(target.exists()).toBeTruthy()
        expect(target.attributes().type).toBe('password')
    })

    it('toggles the visibility of the password to true when the togglePasswordVisibility method is called', async () => {
        const wrapper = mount(OInput, {
            propsData: {
                value: 'foo',
                type: 'password',
                passwordReveal: true
            }
        })

        wrapper.setProps({ value: 'bar' })
        await wrapper.vm.$nextTick()

        expect(wrapper.find('input').exists()).toBeTruthy()
        expect(wrapper.vm.newType).toBe('password')
        expect(wrapper.vm.isPasswordVisible).toBeFalsy()
        expect(wrapper.find('input').attributes().type).toBe('password')

        const visibilityIcon = wrapper.find('.o-icon--clickable')
        expect(visibilityIcon.exists()).toBeTruthy()

        visibilityIcon.trigger('click')
        wrapper.setProps({ passwordReveal: false })
        await wrapper.vm.$nextTick()
        expect(wrapper.vm.newType).toBe('text')
        expect(wrapper.vm.isPasswordVisible).toBeTruthy()
        expect(wrapper.find('input').attributes().type).toBe('text')
    })

    it('render the placeholder and readonly attribute when passed', () => {
        const wrapper = shallowMount(OInput, {
            attrs: { placeholder: 'Awesome!', readonly: true }
        })
        const target = wrapper.find('input')

        expect(target.element.getAttribute('placeholder')).toBe('Awesome!')
        expect(target.element.getAttribute('readonly')).toBe('readonly')
    })

    it('expands input when expanded property is passed', async () => {
        wrapper.setProps({ expanded: true })
        await wrapper.vm.$nextTick()

        expect(wrapper.classes()).toContain('o-ctrl-input--expanded')
    })

    it('keep its value on blur', async () => {
        const wrapper = mount(OInput, {
            propsData: {
                value: 'foo'
            },
            methods: {
                checkHtml5Validity: () => true
            }
        })

        const input = wrapper.find('input')

        input.element.value = 'bar'
        input.trigger('input')
        input.trigger('blur')

        expect(input.element.value).toBe('bar')
    })

    it('manage the click on icon', async () => {
        const wrapper = mount(OInput, {
            propsData: {
                icon: 'magnify',
                iconClickable: true
            }
        })

        expect(wrapper.find('input').exists()).toBeTruthy()

        const visibilityIcon = wrapper.find('.o-icon--clickable')
        expect(visibilityIcon.exists()).toBeTruthy()

        visibilityIcon.trigger('click')
        await wrapper.vm.$nextTick()
        expect(wrapper.emitted()['icon-click']).toBeTruthy()
    })
})
