import { mount } from '@vue/test-utils'
import OSteps from '@components/steps/Steps'
import OStepItem from '@components/steps/StepItem'

let wrapper

const WrapperComp = {
    template: `
        <OSteps :value="1">
            <OStepItem></OStepItem>
            <OStepItem :visible="false"></OStepItem>
            <OStepItem :clickable="false"></OStepItem>
        </OSteps>`,
    components: {
        OSteps, OStepItem
    }
}

describe('OSteps', () => {
    beforeEach(() => {
        wrapper = mount(WrapperComp, { sync: false }).find(OSteps)
    })

    it('is called', () => {
        expect(wrapper.exists()).toBeTruthy()
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })

    /*
    it('emit input event with value when active step is modified', async () => {
        wrapper.vm.activeId = wrapper.vm.items[0].value

        await wrapper.vm.$nextTick() // Wait until $emits have been handled

        const valueEmitted = wrapper.emitted().input

        expect(valueEmitted).toBeTruthy()
        expect(valueEmitted.length).toBe(1)
        expect(valueEmitted[0][0]).toBe(0)
    })
    */

    it('manage next/previous listener', async () => {
        // First input
        wrapper.setProps({value: 0})

        await wrapper.vm.$nextTick() // Wait until $emits have been handled

        expect(wrapper.vm.value).toBe(0)

        expect(wrapper.vm.hasNext).toBeTruthy()
        wrapper.vm.next()

        await wrapper.vm.$nextTick() // Wait until $emits have been handled

        // Simulate v-model
        wrapper.setProps(
            {value: wrapper.emitted().input[wrapper.emitted().input.length - 1][0]}
        )

        const emitted = wrapper.emitted().input

        expect(emitted).toBeTruthy()
        expect(emitted.length).toBe(1)
        expect(emitted[0][0]).toBe('3')

        expect(wrapper.vm.hasNext).toBeFalsy()

        wrapper.vm.next()

        await wrapper.vm.$nextTick() // Wait until $emits have been handled

        // Simulate v-model
        wrapper.setProps(
            {value: wrapper.emitted().input[wrapper.emitted().input.length - 1][0]}
        )

        expect(wrapper.emitted().input.length).toBe(1) // To still be

        expect(wrapper.vm.hasPrev).toBeTruthy()
        wrapper.vm.prev()

        await wrapper.vm.$nextTick() // Wait until $emits have been handled

        // Simulate v-model
        wrapper.setProps(
            {value: wrapper.emitted().input[wrapper.emitted().input.length - 1][0]}
        )

        expect(wrapper.emitted().input.length).toBe(2)
        expect(wrapper.emitted().input[1][0]).toBe('1')
        expect(wrapper.vm.hasPrev).toBeFalsy()

        wrapper.vm.prev()
        await wrapper.vm.$nextTick() // Wait until $emits have been handled

        expect(wrapper.emitted().input.length).toBe(2) // To still be
    })

    it('manage wrapper classes as expected', () => {
        expect(wrapper.vm.wrapperClasses[2]['o-steps-wrapper-vertical']).toBeFalsy()

        wrapper.setProps({vertical: true})
        expect(wrapper.vm.wrapperClasses[2]['o-steps-wrapper-vertical']).toBeTruthy()

        wrapper.setProps({position: 'right'})
        expect(wrapper.vm.wrapperClasses[3]['o-steps-wrapper-position-right']).toBeTruthy()
    })

    it('throws an error when there is no item', () => {
        const spy = jest.spyOn(global.console, 'error').mockImplementation(() => {})

        try {
            wrapper = mount({
                template: `<OSteps/>`,
                components: {
                    OSteps
                },
                destroyed() {
                    spy()
                }
            })
        } catch (error) {
            expect(error.message).stringMatching(/item inside/)
        } finally {
            spy.mockRestore()
        }
    })
})
