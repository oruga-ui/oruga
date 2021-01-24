import { mount } from '@vue/test-utils'
import OSkeleton from '@components/skeleton/Skeleton'

let wrapper

describe('OSkeleton', () => {
    beforeEach(() => {
        wrapper = mount(OSkeleton)
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })
})
