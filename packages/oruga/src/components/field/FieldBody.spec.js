import { shallowMount, mount, createLocalVue } from '@vue/test-utils'
import OFieldBody from '@components/field/FieldBody'
import OField from '@components/field/Field'
import OInput from '@components/input/Input'

const localVue = createLocalVue()
localVue.component('o-field', OField)

describe('OFieldBody', () => {
    it('is called', () => {
        const wrapper = shallowMount(OFieldBody, {
            slots: {
                default: 'content'
            }
        })
        expect(wrapper.name()).toBe('OFieldBody')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('render correctly', () => {
        const wrapper = shallowMount(OFieldBody, {
            slots: {
                default: 'content'
            }
        })
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('should render the text when the child is a text', () => {
        const text = 'text'
        const wrapper = shallowMount(OFieldBody, {
            slots: {
                default: text
            }
        })
        expect(wrapper.text()).toBe(text)
    })

    describe('when child is an element', () => {
        it('should wrap the element in a o-field', () => {
            const wrapper = mount(OFieldBody, {
                slots: {
                    default: OInput
                },
                localVue
            })
            expect(wrapper.exists(OField)).toBe(true)
        })

        it('should pass type prop to the o-field element', () => {
            const type = 'is-success'
            const wrapper = mount(OFieldBody, {
                slots: {
                    default: OInput
                },
                propsData: {
                    type
                },
                localVue
            })
            expect(wrapper.find(OField).find('input').classes()).toContain(type)
        })

        it('should render the message when message prop is passed', () => {
            const message = 'some message yo'
            const type = 'is-danger'
            const wrapper = mount(OFieldBody, {
                slots: {
                    default: OInput
                },
                propsData: {
                    type,
                    message
                },
                localVue
            })
            expect(wrapper.find('p.help').classes()).toContain(type)
            expect(wrapper.find('p.help').text()).toBe(message)
        })
    })
})
