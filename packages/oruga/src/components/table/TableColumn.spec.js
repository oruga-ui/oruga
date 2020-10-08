import { mount } from '@vue/test-utils'
import OTable from '@components/table/Table'
import OTableColumn from '@components/table/TableColumn'

let wrapper
let wrapperParent

describe('OTableColumn', () => {
    beforeEach(() => {
        wrapperParent = mount(OTable, {
            sync: false,
        })
        wrapper = mount(OTableColumn, {
            provide: {
                $table: wrapperParent.vm
            }
        })
    })

    it('is called', () => {
        expect(wrapper.exists()).toBeTruthy()
    })
})
