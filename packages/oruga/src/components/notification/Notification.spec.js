import { shallowMount } from '@vue/test-utils'
import ONotification from '@components/notification/Notification'

let wrapper

describe('BNotification', () => {
    beforeEach(() => {
        wrapper = shallowMount(ONotification)
    })

    it('is called', () => {
        expect(wrapper.name()).toBe('ONotification')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })
})
