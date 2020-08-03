import { shallowMount } from '@vue/test-utils'
import OUpload from '@components/upload/Upload'

let wrapper

describe('OUpload', () => {
    beforeEach(() => {
        wrapper = shallowMount(OUpload)
    })

    it('is called', () => {
        expect(wrapper.exists()).toBeTruthy()
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })
})
