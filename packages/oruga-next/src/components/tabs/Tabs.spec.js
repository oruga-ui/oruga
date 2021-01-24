import { mount } from '@vue/test-utils'
import OTabs from '@components/tabs/Tabs'
import OTabItem from '@components/tabs/TabItem'

let wrapper

const WrapperComp = {
    template: `
        <OTabs value="tab1">
            <OTabItem value="tab1"></OTabItem>
            <OTabItem value="tab2" :visible="false"></OTabItem>
        </OTabs>`,
    components: {
        OTabs, OTabItem
    }
}

describe('OTabs', () => {
    beforeEach(() => {
        wrapper = mount(WrapperComp).find(OTabs)
    })

    it('is called', () => {
        expect(wrapper.exists()).toBeTruthy()
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('manage main classes accordingly', async () => {
        wrapper.setProps({
            expanded: false,
            vertical: false,
            position: 'centered'
        })
        await wrapper.vm.$nextTick()
        expect(wrapper.vm.rootClasses[2]['o-tabs--fullwidth']).toBeFalsy()
        expect(wrapper.vm.rootClasses[3]['o-tabs--vertical']).toBeFalsy()

        wrapper.setProps({expanded: true})
        await wrapper.vm.$nextTick()
        expect(wrapper.vm.rootClasses[2]['o-tabs--fullwidth']).toBeTruthy()

        wrapper.setProps({vertical: true})
        await wrapper.vm.$nextTick()
        expect(wrapper.vm.rootClasses[3]['o-tabs--vertical']).toBeTruthy()

        wrapper.setProps({position: 'right'})
        await wrapper.vm.$nextTick()
        expect(wrapper.vm.rootClasses[1]['o-tabs--centered']).toBeFalsy()
    })

    /*
    it('emit input event with value when active tab is modified', async () => {
        const idx = 'tab2'
        wrapper.vm.activeId = idx

        await wrapper.vm.$nextTick() // Wait until $emits have been handled

        const valueEmitted = wrapper.emitted().input

        expect(valueEmitted).toBeTruthy()
        expect(valueEmitted[0][0]).toBe(idx)
    })
    */

    it('emit input event with value when childClick is called', async () => {
        const val = 'tab2'

        wrapper.vm.childClick(wrapper.vm.items[1])
        wrapper.vm.childClick(wrapper.vm.items[1])

        await wrapper.vm.$nextTick() // Wait until $emits have been handled

        const valueEmitted = wrapper.emitted().input
        expect(valueEmitted[0][0]).toBe(val)
        // Will be called only once even if we clicked multiple times
        expect(valueEmitted.length).toBe(1)
    })

    it('updates the tab when the value is changed', async () => {
        wrapper.setProps({value: 'tab2'})
        await wrapper.vm.$nextTick()
        expect(wrapper.vm.activeId).toBe('tab2')

        wrapper.setProps({value: 0})
        await wrapper.vm.$nextTick()
        expect(wrapper.vm.activeId).toBe(0)
    })

    it('still renders if there is no item', () => {
        wrapper = mount({
            template: `<OTabs value="tab1"></OTabs>`,
            components: {
                OTabs
            }
        }).find(OTabs)
        expect(wrapper.html()).toMatchSnapshot()
    })
})
