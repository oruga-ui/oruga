// import { describe, it, expect, beforeEach } from "vitest";
// import { shallowMount } from "@vue/test-utils";

// import OMenu from "./Menu.vue";

// let wrapper;

// describe("OMenu", () => {
//     beforeEach(() => {
//         wrapper = shallowMount(OMenu);
//     });

//     it("is called", () => {
//         expect(wrapper.attributes("data-oruga")).toBe("menu");
//         expect(wrapper.vm.isOruga).toBeTruthy();
//     });

//     it("render correctly", () => {
//         expect(wrapper.html()).toMatchSnapshot();
//     });
// });

// describe("OMenuList", () => {
//     beforeEach(() => {
//         wrapper = shallowMount(OMenu);
//     });

//     it("is called", () => {
//         expect(wrapper.findAll(".o-menu-label").at(0).text()).toBe("Test");
//     });

//     it("render correctly", () => {
//         expect(wrapper.html()).toMatchSnapshot();
//     });

//     it("slot label", () => {
//         expect(wrapper.findAll(".o-menu-label").at(0).text()).toBe("Test");
//     });
// });
