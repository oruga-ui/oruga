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
		wrapper = shallowMount(OBreadcrumb,{
			propsData : {
				align : "center"
			}
		})
		expect(wrapper.contains('.o-breadcrumb--center')).toBeTruthy();
	})
	it('large breadcrumb', ()=>{
		wrapper = shallowMount(OBreadcrumb, {
			propsData : {
				size : 'large'
			}
		})
		expect(wrapper.contains('.o-breadcrumb--large')).toBeTruthy();
	})
	it('colored breadcrumb', ()=>{
		wrapper = shallowMount(OBreadcrumb, {
			propsData : {
				variant : 'info'
			}
		})
		expect(wrapper.contains('.o-breadcrumb--info')).toBeTruthy();
	})
	it('separator breadcrumb', ()=>{
		wrapper = shallowMount(OBreadcrumb, {
			propsData : {
				separator : "chevron"
			}
		})
		expect(wrapper.contains('.o-breadcrumb--chevron-separator')).toBeTruthy();
	})
})