import { shallowMount, mount, createLocalVue } from '@vue/test-utils'
import OField from '@components/field/Field'
import OFieldBody from '@components/field/FieldBody'
import OInput from '@components/input/Input'

const localVue = createLocalVue()
localVue.component('o-field', OField)
localVue.component('o-field-body', OFieldBody)
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

    describe('class names for the root div.field', () => {
        it('contains "o-field-grouped-multiline" when prop "groupMultiline" is set', () => {
            const wrapper = shallowMount(OField, { propsData: { groupMultiline: true } })
            expect(wrapper.find('.o-field').classes()).toContain('o-field-grouped-multiline')
        })
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

    describe('Passing true for grouped prop', () => {
        const mountOptions = {
            propsData: {
                grouped: true
            },
            localVue,
            slots: {
                default: [OInput, '<button class="button">Button</button>']
            }
        }

        it('groups the children together', () => {
            const wrapper = shallowMount(OField, mountOptions)
            expect(wrapper.find('.o-field').classes()).toContain('o-field-grouped')
        })

        it('appends the classname with value of position when "position" prop is passed', () => {
            const {propsData} = mountOptions
            const wrapper = shallowMount(OField, {
                ...mountOptions,
                propsData: {
                    ...propsData,
                    position: 'is-centered'
                }
            })
            expect(wrapper.find('.o-field').classes()).toContain('o-field-grouped')
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
