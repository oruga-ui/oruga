import { shallowMount, mount } from '@vue/test-utils';
import OBreadcrumbItem from '@components/breadcrumb/BreadcrumbItem';

let wrapper;

describe('OBreadcrumbItem',()=>{
	beforeEach(()=>{
		wrapper = shallowMount(OBreadcrumbItem);
	})

	it('is called', ()=>{
		// expect()
		expect(wrapper.exists()).toBeTruthy()
	})
	it('render correctly', ()=>{
		// expect()
		expect(wrapper.html()).toMatchSnapshot()
	})
})