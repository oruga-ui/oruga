import { mount } from '@vue/test-utils'
import ODropdown from '@components/dropdown/Dropdown'
import ODropdownItem from '@components/dropdown/DropdownItem'

let wrapper
let wrapperParent

describe('ODropdownItem', () => {
    beforeEach(() => {
        wrapperParent = mount(ODropdown, {
            sync: false,
        })
        wrapper = mount(ODropdownItem, {
            parentComponent: wrapperParent.vm,
            provide: {
                $dropdown: wrapperParent.vm
            }
        })
    })

    it('is called', () => {
        expect(wrapper.exists()).toBeTruthy()
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('returns item classes accordingly', async () => {
        const disabled = false
        wrapper.setProps({
            disabled,
        })
        await wrapper.vm.$nextTick()
        expect(wrapper.vm.rootClasses[1]).toEqual({
            'o-dropdown-item-disabled': disabled,
        })
    })
})
