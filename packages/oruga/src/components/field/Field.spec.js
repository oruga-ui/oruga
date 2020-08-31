import { shallowMount, mount, createLocalVue } from '@vue/test-utils'
import OField from '@components/field/Field'
import OFieldBody from '@components/field/FieldBody'
import OInput from '@components/input/Input'

const localVue = createLocalVue()
localVue.component('o-field', OField)
localVue.component('o-field-horizontal-content', OFieldBody)
localVue.component('o-input', OInput)

describe('OField', () => {
    it('is called', () => {
        const wrapper = shallowMount(OField)
        expect(wrapper.exists()).toBeTruthy()
    })

    it('render correctly', () => {
        const wrapper = shallowMount(OField)
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('sets input class with type value when prop "variant" is changed dynamically', async () => {
        const variant = { danger: true }
        const wrapper = mount(OField, {
            localVue,
            slots: { default: [OInput] }
        })
        wrapper.setProps({ variant })
        await wrapper.vm.$nextTick()
        expect(wrapper.find('.o-control-input').classes()).toContain('o-control-input-icons-right')
        expect(wrapper.find('.o-control-input').find('.o-icon').classes()).toContain('o-color-danger')
    })

    describe('Passing a message prop', () => {
        const generateMountOptions = ({message}) => {
            return {
                propsData: {message},
                localVue,
                slots: {
                    default: [OInput, '<button class="button">Button</button>']
                }
            }
        }

        it('adds a help <p> element in the root div.field when "message" prop is passed', () => {
            const message = 'Some string message'
            const mountOptions = generateMountOptions({message})
            const wrapper = shallowMount(OField, mountOptions)
            expect(wrapper.find('.o-field').find('p.o-field-message').text()).toEqual(message)
        })

        it('changes the <p> element content in the root div.field when "message" prop is changed dynamically', async () => {
            const message = 'Some string message'
            const mountOptions = generateMountOptions({ message: 'initial message' })
            const wrapper = shallowMount(OField, mountOptions)
            wrapper.setProps({ message })
            await wrapper.vm.$nextTick()
            expect(wrapper.find('.o-field').find('p.o-field-message').text()).toEqual(message)
        })
    })

    describe('managing groups', () => {
        const mountOptions = {
            propsData: {
                grouped: true
            },
            localVue,
            slots: {
                default: [OInput, '<button class="button">Button</button>']
            }
        }

        it('contains "o-field-grouped" when prop "grouped" is set', () => {
            const {propsData} = mountOptions
            const wrapper = mount(OField, {
                ...mountOptions,
                propsData: {
                    ...propsData,
                    grouped: true
                }
            })
            const innerField = wrapper.find('.o-field-horizontal-content').find('.o-field')
            expect(innerField.classes()).toContain('o-field-grouped')  
        })

        it('contains "o-field-grouped-multiline" when prop "groupMultiline" is set', () => {
            const {propsData} = mountOptions
            const wrapper = mount(OField, {
                ...mountOptions,
                propsData: {
                    ...propsData,
                    groupMultiline: true
                }
            })
            const innerField = wrapper.find('.o-field-horizontal-content').find('.o-field')
            expect(innerField.classes()).toContain('o-field-grouped-multiline')
        })

        it('adds a label element under the root div.field when "label" prop is passed', () => {
            const {propsData} = mountOptions
            const wrapper = shallowMount(OField, {
                ...mountOptions,
                propsData: {
                    ...propsData,
                    label: 'Some label'
                }
            })
            expect(wrapper.find('.o-field').find('label').isVisible()).toBe(true)
        })
    })
})
