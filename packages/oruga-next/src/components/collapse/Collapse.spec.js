import { shallowMount } from '@vue/test-utils'
import OCollapse from '@components/collapse/Collapse'

let wrapper

describe('OCollapse', () => {
    describe('default', () => {
        beforeEach(() => {
            wrapper = shallowMount(OCollapse)
        })

        it('is called', () => {
            expect(wrapper.exists()).toBeTruthy()
        })

        it('default props and vm', () => {
            expect(wrapper.props().open).toBe(true)
            expect(wrapper.props().animation).toBe('fade')
            expect(wrapper.vm.isOpen).toBe(true)
        })

        it('render correctly', () => {
            expect(wrapper.html()).toMatchSnapshot()
        })
    })
    describe('open prop is false', () => {
        beforeEach(() => {
            wrapper = shallowMount(OCollapse, {
                propsData: {
                    open: false,
                    position: 'bottom'
                }
            })
        })

        it('set default open prop', () => {
            expect(wrapper.props().open).toBe(false)
            expect(wrapper.vm.isOpen).toBe(false)
        })

        it('call toggle method', async () => {
            expect(wrapper.find('.o-clps__content').isVisible()).toBe(false)
            wrapper.vm.toggle()
            await wrapper.vm.$nextTick()
            expect(wrapper.vm.isOpen).toBe(true)
            expect(wrapper.find('.o-clps__content').isVisible()).toBe(true)
        })

        it('emit a click event', async () => {
            expect(wrapper.find('.o-clps__content').isVisible()).toBe(false)
            const updateOpen = jest.fn()
            wrapper.vm.$on('update:open', updateOpen)
            wrapper.find('.o-clps__trigger').trigger('click')
            await wrapper.vm.$nextTick()
            expect(updateOpen).toHaveBeenCalledTimes(1)
            expect(updateOpen).toHaveBeenCalledWith(true)
            expect(wrapper.vm.isOpen).toBe(true)
            expect(wrapper.find('.o-clps__content').isVisible()).toBe(true)
        })

        it('should emit open event', () => {
            const open = jest.fn()
            wrapper.vm.$on('open', open)
            wrapper.find('.o-clps__trigger').trigger('click')
            expect(open).toHaveBeenCalledTimes(1)
        })

        it('update open prop', async () => {
            expect(wrapper.find('.o-clps__content').isVisible()).toBe(false)
            wrapper.setProps({ open: true })
            await wrapper.vm.$nextTick()
            expect(wrapper.vm.isOpen).toBe(true)
            expect(wrapper.find('.o-clps__content').isVisible()).toBe(true)
        })
    })

    it('should have trigger slot', () => {
        const triggerSlot = '<strong> Header </strong>'
        const wrapper = shallowMount(OCollapse, {
            slots: {
                trigger: triggerSlot
            }
        })
        expect(wrapper.find('.o-clps__trigger :first-child').html()).toBe(triggerSlot)
    })

    it('should have scoped trigger slot', () => {
        const triggerSlot = '<strong> Header </strong>'
        const wrapper = shallowMount(OCollapse, {
            scopedSlots: {
                trigger: triggerSlot
            }
        })
        expect(wrapper.find('.o-clps__trigger :first-child').html()).toBe(triggerSlot)
    })

    it('should have default slot', () => {
        const slotDefault = '<div> Content </div>'
        wrapper = shallowMount(OCollapse, {
            slots: {
                default: slotDefault
            }
        })
        expect(wrapper.find('.o-clps__content :first-child').html()).toBe(slotDefault)
    })

    it('should emit close event', () => {
        wrapper = shallowMount(OCollapse, {
            propsData: {
                open: true
            }
        })
        const close = jest.fn()
        wrapper.vm.$on('close', close)
        wrapper.find('.o-clps__trigger').trigger('click')
        expect(close).toHaveBeenCalledTimes(1)
    })
})
