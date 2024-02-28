// import { describe, it, expect, beforeEach } from "vitest";
// import { shallowMount } from "@vue/test-utils";

// import OMenuItem from "./MenuItem.vue";

// let wrapper;

// describe("OMenuItem", () => {
//     beforeEach(() => {
//         wrapper = shallowMount(OMenuItem);
//     });

//     it("is called", () => {
//         expect(wrapper.attributes("data-oruga")).toBe("menuitem");
//         expect(wrapper.isVueInstance()).toBeTruthy();
//     });

//     it("render correctly", () => {
//         expect(wrapper.html()).toMatchSnapshot();
//     });

//     it("manage onClick", () => {
//         wrapper.vm.reset = jest.fn();

//         wrapper.setProps({ disabled: true });
//         wrapper.vm.onClick();

//         wrapper.setProps({ disabled: false });
//         wrapper.vm.onClick();

//         expect(wrapper.vm.triggerReset).toHaveBeenCalledTimes(1);
//         expect(wrapper.vm.reset).toHaveBeenCalledTimes(1);
//         expect(wrapper.vm.newExpanded).toBeTruthy();
//         expect(wrapper.emitted()["update:expanded"][0]).toContainEqual(true);
//         // Active should only be toggled when activable is set by the parent
//         expect(wrapper.vm.newActive).toBeFalsy();
//         expect(wrapper.emitted()["update:active"][0]).toContainEqual(false);
//     });
// });
