import { mount } from '@vue/test-utils'
import OPagination from '@components/pagination/Pagination'
import OPaginationButton from '@components/pagination/PaginationButton'

let wrapper
let wrapperParent

const WrapperComp = {
    template: `
        <OPagination>
            <OPaginationButton ref="nextBtn" slot="next" slot-scope="props" :page="props.page"/>
        </OPagination>`,
    components: {
        OPagination, OPaginationButton
    }
}

describe('OPaginationButton', () => {
    beforeEach(() => {
        wrapperParent = mount(WrapperComp)
        wrapper = wrapperParent.find({ ref: 'nextBtn' })
    })

    it('is called', () => {
        expect(wrapper.exists()).toBeTruthy()
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })
})
