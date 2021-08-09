import {mount} from '@vue/test-utils'
import OTabs from '@components/tabs/Tabs'
import OTabItem from '@components/tabs/TabItem'

import {setOptions} from '@utils/config'
import { getOptions } from '../../utils/config'

let wrapper
let wrapperParent

const WrapperComp = {
    data() {
        return {
            show1: true
        }
    },
    template: `
        <OTabs>
            <OTabItem v-if="show1" value="tab1"/>
            <OTabItem ref="testItem" value="tab2"/>
            <OTabItem value="tab3" :visible="false"/>
        </OTabs>`,
    components: {
        OTabs, OTabItem
    }
}

describe('OTabItem', () => {
    beforeEach(() => {
        wrapperParent = mount(WrapperComp)
        wrapper = wrapperParent.find({ ref: 'testItem' })
    })

    it('is called', () => {
        expect(wrapper.exists()).toBeTruthy()
        expect(wrapper.vm.value).toBe('tab2')
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('computes its position correctly', () => {
        expect(wrapper.vm.index).toBe(1)
    })

    it('will recompute indexes when a sibling gets removed', async () => {
        expect(wrapper.vm.index).toBe(1)
        wrapperParent.vm.show1 = false

        await wrapper.vm.$nextTick()

        expect(wrapper.vm.index).toBe(0)
    })

    it('transition correctly when activate is called', () => {
        wrapper.vm.activate(0)
        expect(wrapper.vm.transitionName).toBe('slide-prev')

        wrapper.vm.activate(2)
        expect(wrapper.vm.transitionName).toBe('slide-next')
    })

    it('transition correctly when deactivate is called', () => {
        wrapper.vm.deactivate(2)
        expect(wrapper.vm.transitionName).toBe('slide-prev')

        wrapper.vm.deactivate(0)
        expect(wrapper.vm.transitionName).toBe('slide-next')
    })

    /*
    it('doesn\'t mount when it has no parent', () => {
        const spy = jest.spyOn(global.console, 'error').mockImplementation(() => {})

        try {
            wrapper = mount({
                template: `<OTabItem/>`,
                components: {
                    OTabItem
                },
                destroyed() {
                    spy()
                }
            })
        } catch (error) {
            expect(error.message).stringMatching(/You should wrap/)
        } finally {
            spy.mockRestore()
        }
    })
    */

    it('transforms default item tag accordingly to props', async () => {
        expect(wrapperParent.find('.o-tabs__nav-item').is('button')).toBe(true)
        setOptions(Object.assign(getOptions(), {
            tabs: {
                itemTag: 'a',
            },
        }))
        wrapperParent = mount(WrapperComp)
        await wrapperParent.vm.$nextTick()
        expect(wrapperParent.find('.o-tabs__nav-item').is('a')).toBe(true)
    })

    it('unregisters when destroyed', async () => {
        const wrapper = mount({
            template: `
        <OTabs>
            <OTabItem ref="item1"/>
            <OTabItem v-if="item2" ref="item2"/>
        </OTabs>`,
            props: {
                item2: {
                    type: Boolean,
                    default: true
                }
            },
            components: {
                OTabs, OTabItem
            }
        })

        expect(wrapper.find({ref: 'item2'})).toBeTruthy()
        await wrapper.vm.$nextTick()
        expect(wrapper.find(OTabs).vm.items.length).toBe(2)

        wrapper.setProps({item2: false})
        await wrapper.vm.$nextTick()
        expect(wrapper.find(OTabs).vm.items.length).toBe(1)

        wrapper.setProps({item2: true})
        wrapper.find(OTabs).setProps({value: 1})
    })
})
