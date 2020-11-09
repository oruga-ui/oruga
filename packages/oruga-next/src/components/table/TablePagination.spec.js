import { shallowMount } from '@vue/test-utils'
import OTablePagination from '@components/table/TablePagination'

let wrapper

describe('OTablePagination', () => {
    beforeEach(() => {
        wrapper = shallowMount(OTablePagination, {sync: false})
    })

    it('is called', () => {
        expect(wrapper.exists()).toBeTruthy()
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })
})
