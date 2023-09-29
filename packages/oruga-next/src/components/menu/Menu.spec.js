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
