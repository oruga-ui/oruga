import { shallowMount } from '@vue/test-utils'
import OPaginationButton from '@components/pagination/PaginationButton'

let wrapper
const page = 5
const defaultProps = {
    page: {
        number: page,
        isCurrent: false,
        click: jest.fn(),
        disabled: false,
        class: '',
        'aria-label': ''
    }
}

describe('OPagination', () => {
    beforeEach(() => {
        wrapper = shallowMount(OPaginationButton, {
            propsData: defaultProps
        })
    })

    it('is called', () => {
        expect(wrapper.name()).toBe('OPaginationButton')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('returns href as expected', () => {
        expect(wrapper.vm.href).toBe('#')

        wrapper.setProps({ tag: 'button' })
        expect(wrapper.vm.href).toBeUndefined()
    })
})
