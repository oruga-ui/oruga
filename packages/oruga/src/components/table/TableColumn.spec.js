import { mount } from '@vue/test-utils'
import OTableColumn from '@components/table/TableColumn'

let wrapper
const OTable = {
    template: '<o-table-stub></o-table-stub>',
    methods: {
        refreshSlots() { }
    }
}

describe('OTableColumn', () => {
    beforeEach(() => {
        wrapper = mount(OTableColumn, {
            parentComponent: OTable
        })
    })

    it('is called', () => {
        expect(wrapper.name()).toBe('OTableColumn')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })
})
