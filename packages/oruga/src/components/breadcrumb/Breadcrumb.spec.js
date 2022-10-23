import { shallowMount/*, mount */} from '@vue/test-utils';
import OBreadcrumb from '@components/breadcrumb/Breadcrumb';

let wrapper;

describe('OBreadcrumb',()=>{
	beforeEach(()=>{
		wrapper = shallowMount(OBreadcrumb);
	})
	it('is called', ()=>{
		// expect()
		expect(wrapper.exists()).toBeTruthy()
	})
	it('render correctly', ()=>{
		// expect()
		expect(wrapper.html()).toMatchSnapshot()
	})
	it('centered breadcrumb', ()=>{
		// expect()
	})
	it('large breadcrumb', ()=>{
		// expect()
	})
	it('colored breadcrumb', ()=>{
		// expect()
	})
	it('separator breadcrumb', ()=>{
		// expect()
	})
})