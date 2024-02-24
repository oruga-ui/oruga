import { shallowMount } from "@vue/test-utils";
import OMenu from "./Menu";

let wrapper;

describe("BMenu", () => {
    beforeEach(() => {
        wrapper = shallowMount(OMenu);
    });

    it("is called", () => {
        expect(wrapper.name()).toBe("OMenu");
        expect(wrapper.isVueInstance()).toBeTruthy();
    });

    it("render correctly", () => {
        expect(wrapper.html()).toMatchSnapshot();
    });
});

describe("OMenuList", () => {
    beforeEach(() => {
        wrapper = shallowMount(OMenu);
    });

    it("is called", () => {
        expect(wrapper.findAll(".o-menu-label").at(0).text()).toBe("Test");
    });

    it("render correctly", () => {
        expect(wrapper.html()).toMatchSnapshot();
    });

    it("slot label", () => {
        expect(wrapper.findAll(".o-menu-label").at(0).text()).toBe("Test");
    });
});
