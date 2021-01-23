import { shallowMount } from '@vue/test-utils'
import OIcon from '@components/icon/Icon'

describe('OIcon', () => {
    it('render correctly', () => {
        const wrapper = shallowMount(OIcon)

        expect(wrapper.html()).toMatchSnapshot()
    })

    it('is vue instance', () => {
        const wrapper = shallowMount(OIcon)

        expect(wrapper.exists()).toBeTruthy()
    })

    it('render icon when icon property is passed', () => {
        const wrapper = shallowMount(OIcon, {
            propsData: { icon: 'eye' }
        })

        expect(wrapper.classes()).toContain('o-icon')
        expect(wrapper.find('i').classes()).toContain('mdi', 'mdi-eye', 'mdi-24px')
    })

    it('returns correct color for newVariant when type is passed as an object', () => {
        const wrapper = shallowMount(OIcon, {
            propsData: {
                icon: 'eye',
                variant: {'primary': true}
            }
        })

        expect(wrapper.classes()).toContain('o-icon--primary')
        expect(wrapper.vm.newVariant).toEqual('primary')
    })

    it('render icon package correctly when the pack property is is passed.', () => {
        const wrapper = shallowMount(OIcon, {
            propsData: {
                icon: 'eye',
                pack: 'fa'
            }
        })

        expect(wrapper.find('i').classes()).toContain('fa-eye')
    })

    it('display size when size propery is passed', async () => {
        const wrapper = shallowMount(OIcon, {
            propsData: {
                icon: 'eye'
            }
        })
        expect(wrapper.find('i').classes()).toContain('mdi-24px')

        wrapper.setProps({ size: 'small' })
        await wrapper.vm.$nextTick()
        expect(wrapper.find('i').classes()).toContainEqual('mdi', 'mdi-eye')

        wrapper.setProps({ size: 'medium' })
        await wrapper.vm.$nextTick()
        expect(wrapper.find('i').classes()).toContain('mdi-36px')

        wrapper.setProps({ size: 'large' })
        await wrapper.vm.$nextTick()
        expect(wrapper.find('i').classes()).toContain('mdi-48px')
    })

    it('overrides icon font size when customSize property is passed', () => {
        const wrapper = shallowMount(OIcon, {
            propsData: {
                icon: 'eye',
                pack: 'fa',
                customSize: 'fa-2x'
            }
        })

        expect(wrapper.find('i').classes()).toContainEqual('fa', 'fa-2x')
    })

    it('render custom classes when customClass property is passed', () => {
        const wrapper = shallowMount(OIcon, {
            propsData: {
                icon: 'eye',
                customClass: 'foo-bar'
            }
        })

        expect(wrapper.find('i').classes()).toContain('foo-bar')
    })
})
