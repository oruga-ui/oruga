import { mount } from "@vue/test-utils";
import OMenuList from "./MenuList";

let wrapper;

describe("OMenuList", () => {
    beforeEach(() => {
        const Menu = {
            components: { OMenuList },
            template: `
            <div>
                <o-menu-list label="Test">
                </o-menu-list>
            </div>
            `,
        };
        wrapper = mount(Menu);
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
