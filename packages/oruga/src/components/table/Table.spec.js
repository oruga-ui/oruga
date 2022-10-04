import Vue from 'vue'
import { shallowMount } from '@vue/test-utils'
import { useFakeTimers } from 'sinon'
import OInput from '@components/input/Input'
import OTable from '@components/table/Table'
import { setVueInstance } from '../../utils/config'

describe('OTable', () => {
    setVueInstance(Vue)

    let wrapper
    beforeEach(() => {
        wrapper = shallowMount(OTable)
    })

    const tableCols = shallowMount(OTable, {
        propsData: {
            columns: [
                { label: 'default', width: '100px' },
                { label: 'pecent', width: '50%' },
                { label: 'fixed_num', width: 100 },
                { label: 'fixed_str', width: '100' }
            ]
        }
    })

    it('is called', () => {
        expect(wrapper.exists()).toBeTruthy()
    })

    it('has the filter row visible when searchable', () => {
        wrapper.setProps({
            columns: [
                {
                    field: 'id',
                    label: 'ID',
                    width: '40',
                    numeric: true
                }
            ]
        })
        // Don't show if no searchable column
        expect(wrapper.vm.hasSearchablenewColumns).toBe(false)
        // Show if one or more searchable column
        wrapper.setProps({
            columns: [
                {
                    field: 'id',
                    label: 'ID',
                    width: '40',
                    numeric: true,
                    searchable: true
                }
            ]
        })
        expect(wrapper.vm.hasSearchablenewColumns).toBe(true)
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('holds columns', () => {
        const headers = tableCols.findAll('th')

        expect(headers.length).toBeGreaterThanOrEqual(4)

        const cols = headers.filter((th) => {
            return th.find('span')
        })

        expect(cols.length).toBe(4)
        expect(cols.at(0).attributes('style')).toBe('width: 100px;')
        expect(cols.at(1).attributes('style')).toBe('width: 50%;')
        expect(cols.at(2).attributes('style')).toBe('width: 100px;')
        expect(cols.at(3).attributes('style')).toBe('width: 100px;')
    })

    describe('Searchable', () => {
        const data = [
            { id: 1, name: 'Jesse' },
            { id: 2, name: 'João' },
            { id: 3, name: 'Tina' },
            { id: 4, name: 'Anne' },
            { id: 5, name: 'Clarence' }
        ]
        let headRows
        let bodyRows
        let searchInput

        beforeEach(() => {
            wrapper = shallowMount(OTable, {
                propsData: {
                    columns: [
                        { label: 'ID', field: 'id', numeric: true },
                        { label: 'Name', field: 'name', searchable: true }
                    ],
                    data
                }
            })
            headRows = wrapper.findAll('thead tr')
            bodyRows = wrapper.findAll('tbody tr')
            searchInput = wrapper.find(OInput)
        })

        it('displays filter row when at least one column is searchable', () => {
            expect(headRows).toHaveLength(2)
        })

        it('displays filter input only on searchable columns', () => {
            const filterCells = headRows.at(1).findAll('th')

            expect(filterCells.at(0).isEmpty()).toBe(true) // ID column is not searchable
            expect(filterCells.at(1).contains(OInput)).toBe(true) // Name column is searchable
        })

        it('displays all data', () => {
            expect(bodyRows).toHaveLength(5)
        })

        it('displays filtered data when searching', async () => {
            searchInput.vm.$emit('input', 'J')
            await wrapper.vm.$nextTick()

            bodyRows = wrapper.findAll('tbody tr')
            expect(bodyRows).toHaveLength(2) // Jesse and João
        })

        it('displays filtered data when searching and updating data', async () => {
            searchInput.vm.$emit('input', 'J')
            wrapper.setProps({
                data: [
                    ...data,
                    { id: 6, name: 'Justin' }
                ]
            })
            await wrapper.vm.$nextTick()

            bodyRows = wrapper.findAll('tbody tr')
            expect(bodyRows).toHaveLength(3) // Jesse, João and Justin
        })

        it('displays filtered data when searching by name without accent', async () => {
            searchInput.vm.$emit('input', 'Joao')
            await wrapper.vm.$nextTick()
            bodyRows = wrapper.findAll('tbody tr')
            expect(bodyRows).toHaveLength(1) // João
        })

        it('displays filtered data when searching by name with accent', async () => {
            searchInput.vm.$emit('input', 'João')
            await wrapper.vm.$nextTick()
            bodyRows = wrapper.findAll('tbody tr')
            expect(bodyRows).toHaveLength(1) // João
        })

        it('debounce search filtering when debounce-search is defined', () => {
            const clock = useFakeTimers()
            wrapper.setProps({
                debounceSearch: 1000
            })
            for (let i = 0; i < 10; i++) {
                searchInput.vm.$emit('input', 'J'.repeat(10 - i))
                clock.tick(500)
                bodyRows = wrapper.findAll('tbody tr')
                expect(bodyRows).toHaveLength(5) // No filtering yet
            }
            clock.tick(1000)
            bodyRows = wrapper.findAll('tbody tr')
            expect(bodyRows).toHaveLength(5) // Filtering after debounce
        })

        it('tests checkRow method',()=>{
            const shiftCheckRow = jest.spyOn(wrapper.vm,'shiftCheckRow')
            const isRowChecked = jest.spyOn(wrapper.vm,'isRowChecked')
            const removeCheckedRow = jest.spyOn(wrapper.vm,'removeCheckedRow')
            const checkRow = jest.spyOn(wrapper.vm,'checkRow')
            shiftCheckRow.mockImplementationOnce(()=>{})
            isRowChecked.mockImplementationOnce(()=>false)
            removeCheckedRow.mockImplementationOnce(()=>{})
            const index = 0
            let event = {
                shiftKey:true
            }
            wrapper.vm.lastCheckedRowIndex = 1
            const row = {
                id: 1,
                first_name: 'Jesse',
                last_name: 'Simmons',
                date: '2016-10-15 13:43:27',
                gender: 'Male'
              }
            wrapper.vm.checkRow(row,index,event)
            expect(checkRow).toHaveBeenCalledWith(row, 0, event)
            expect(wrapper.emitted().check[0]).toEqual([[],row])
            expect(wrapper.emitted()["update:checkedRows"][0]).toEqual([[]])
            event = {
                shiftKey:false
            }
            wrapper.vm.checkRow(row,index,event)
            expect(checkRow).toHaveBeenCalledWith(row, 0, event)
            expect(wrapper.emitted().check[0]).toEqual([[row],row])
            expect(wrapper.emitted()["update:checkedRows"][0]).toEqual([[row]])
            isRowChecked.mockImplementationOnce(()=>true)
            wrapper.vm.checkRow(row,index,event)
            expect(removeCheckedRow).toHaveBeenCalledWith(row)
        })

        it('tests isAllUncheckable method',async()=>{
            await wrapper.setProps({
                paginated:false,
                data:[{
                    id: 1,
                    first_name: 'Jesse',
                    last_name: 'Simmons',
                    date: '2016-10-15 13:43:27',
                    gender: 'Male'
                  }]
            })
            const isRowCheckable = jest.spyOn(wrapper.vm,'isRowCheckable')
            isRowCheckable.mockImplementationOnce(()=>true)
            expect(wrapper.vm.isAllUncheckable).toEqual(false)
        })

        it('tests total watcher ',async()=>{
            await wrapper.setProps({
                backendPagination:true,
                total:100
            })
            expect(wrapper.vm.newDataTotal).toEqual(100)
        })

        it('tests currentPage watcher ',async()=>{
            await wrapper.setProps({
                currentPage:5
            })
            expect(wrapper.vm.newCurrentPage).toEqual(5)
        })
    })
})
