import { shallowMount } from '@vue/test-utils'
import OTablePagination from '@components/table/OTablePagination'

let wrapper

describe('OTablePagination', () => {
    beforeEach(() => {
        wrapper = shallowMount(OTablePagination, {sync: false})
    })

    it('is called', () => {
        expect(wrapper.name()).toBe('OTablePagination')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })
})
