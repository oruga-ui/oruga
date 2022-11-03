import { shallowMount, mount, createLocalVue } from '@vue/test-utils'
import OField from '@components/field/Field'
import OFieldBody from '@components/field/FieldBody'
import OInput from '@components/input/Input'

const localVue = createLocalVue()
localVue.component('o-field', OField)
localVue.component('o-field__body', OFieldBody)
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
        expect(wrapper.find('.o-ctrl-input').find('.o-icon').classes()).toContain('o-icon--danger')
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
            expect(wrapper.find('.o-field').find('p.o-field__message').text()).toEqual(message)
        })

        it('changes the <p> element content in the root div.field when "message" prop is changed dynamically', async () => {
            const message = 'Some string message'
            const mountOptions = generateMountOptions({ message: 'initial message' })
            const wrapper = shallowMount(OField, mountOptions)
            wrapper.setProps({ message })
            await wrapper.vm.$nextTick()
            expect(wrapper.find('.o-field').find('p.o-field__message').text()).toEqual(message)
        })
    })

    describe('Passing horizontal prop', () => {
        const generateMountOptions = (props) => {
            return {
                propsData: props,
                localVue,
                slots: {
                    default: [OInput, '<button class="button">Button</button>']
                }
            }
        }

        describe('when horizontal props is true', () => {
            let wrapper

            beforeEach(() => {
                const mountOptions = generateMountOptions({ horizontal: true })
                wrapper = shallowMount(OField, mountOptions)
            })

            it('sets horizontal classes correctly when horizontal is true', () => {
                expect(wrapper.find('.o-field__horizontal-label').exists()).toBe(true)
            })

            it('renders OFieldBody component', () => {
                expect(wrapper.find(OFieldBody).exists()).toBe(true)
            })
        })

        describe('when horizontal props is false', () => {
            let wrapper

            beforeEach(() => {
                const mountOptions = generateMountOptions({ horizontal: false })
                wrapper = shallowMount(OField, mountOptions)
            })

            it('does not set horizontal classes when horizontal is false', () => {
                expect(wrapper.find('.o-field__horizontal-label').exists()).toBe(false)
            })

            it('does not render OFieldBody component', () => {
                expect(wrapper.find(OFieldBody).exists()).toBe(false)
            })
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

        it('contains "o-field--grouped" when prop "grouped" is set', () => {
            const {propsData} = mountOptions
            const wrapper = mount(OField, {
                ...mountOptions,
                propsData: {
                    ...propsData,
                    grouped: true
                }
            })
            const innerField = wrapper.find('.o-field__body').find('.o-field')
            expect(innerField.classes()).toContain('o-field--grouped')
        })

        it('contains "o-field--grouped-multiline" when prop "groupMultiline" is set', () => {
            const {propsData} = mountOptions
            const wrapper = mount(OField, {
                ...mountOptions,
                propsData: {
                    ...propsData,
                    groupMultiline: true
                }
            })
            const innerField = wrapper.find('.o-field__body').find('.o-field')
            expect(innerField.classes()).toContain('o-field--grouped-multiline')
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
