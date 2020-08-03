import Vue from 'vue'
import { shallowMount } from '@vue/test-utils'
import OTable from '@components/table/Table'
import { setVueInstance } from '../../utils/config'

let wrapper
const columns = [
    {
        field: 'id',
        label: 'ID',
        width: '40',
        numeric: true,
        sortable: true
    },
]

describe('OTableMobileSort', () => {
    setVueInstance(Vue)

    beforeEach(() => {
        wrapper = shallowMount(OTable, {
            propsData: {
                mobileCards: true,
                columns
            }
        })
    })

    it('is called', () => {
        expect(wrapper.exists()).toBeTruthy()
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })
})
