import {mount} from '@vue/test-utils'
import OSteps from '@components/steps/Steps'
import OStepItem from '@components/steps/StepItem'

let wrapper

const WrapperComp = {
    template: `
        <OSteps>
            <OStepItem/>
            <OStepItem ref="testItem"/>
            <OStepItem :visible="false"/>
        </OSteps>`,
    components: {
        OSteps, OStepItem
    }
}

describe('OStepItem', () => {
    beforeEach(() => {
        wrapper = mount(WrapperComp, { sync: false }).find({ ref: 'testItem' })
    })

    it('is called', () => {
        expect(wrapper.exists()).toBeTruthy()
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('computes its position correctly', () => {
        expect(wrapper.vm.index).toBe(1)
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

    it('emits an activate event', async () => {
        await wrapper.vm.activate(1)
        const activateEmitted = wrapper.emitted()['activate']
        expect(activateEmitted).toBeTruthy()
    })

    /*
    it('doesn\'t mount when it has no parent', () => {
        const spy = jest.spyOn(global.console, 'error').mockImplementation(() => {})

        try {
            wrapper = mount({
                template: `<OStepItem/>`,
                components: {
                    OStepItem
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
})
