import { shallowMount } from '@vue/test-utils'
import OTimepicker from '@components/timepicker/Timepicker'

let wrapper

describe('Timepicker', () => {
    beforeEach(() => {
        wrapper = shallowMount(OTimepicker)
    })

    it('is called', () => {
        expect(wrapper.name()).toBe('OTimepicker')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })

    // https://github.com/vuejs/vue-test-utils/issues/738#issuecomment-674988368
    it('returns "1" for nativeStep if enableSeconds is true', async () => {
        expect(wrapper.vm.nativeStep).toBeNull()
        wrapper = shallowMount(
            OTimepicker, {
                propsData: { enableSeconds: true }
            }
        )
        await wrapper.vm.$nextTick()
        expect(wrapper.vm.nativeStep).toBe('1')
    })


    it('disables hour if no selectable minutes available', async () => {
        wrapper.setProps({
            minTime: new Date(2019, 8, 22, 11, 55),
            incrementMinutes: 10
        })
        await wrapper.vm.$nextTick()
        expect(wrapper.find('option[value="11"]').attributes()['disabled']).toBe('disabled')
        expect(wrapper.find('option[value="12"]').attributes()['disabled']).not.toBe('disabled')
    })

})
