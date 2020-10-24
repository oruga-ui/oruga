import { shallowMount, createLocalVue } from '@vue/test-utils'
import OFieldBody from '@components/field/FieldBody'
import OField from '@components/field/Field'

const localVue = createLocalVue()
localVue.component('o-field', OField)

describe('OFieldBody', () => {
    it('is called', () => {
        const wrapper = shallowMount(OFieldBody, {
            slots: {
                default: 'content'
            },
            provide: {
                $field: {
                        contentHorizontalClasses:[],
                        innerFieldClasses:[]

                }
            }
        })
        expect(wrapper.exists()).toBeTruthy()
    })

    it('render correctly', () => {
        const wrapper = shallowMount(OFieldBody, {
            slots: {
                default: 'content'
            },
            provide: {
                $field: {
                    contentHorizontalClasses:[],
                    innerFieldClasses:[]

                }
            }
        })
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('should render the text when the child is a text', () => {
        const text = 'text'
        const wrapper = shallowMount(OFieldBody, {
            slots: {
                default: text
            },
            provide: {
                $field: {
                    contentHorizontalClasses:[],
                    innerFieldClasses:[]

                }
            }
        })
        expect(wrapper.text()).toBe(text)
    })
})
