import { afterEach, describe, expect, test } from "vitest";
import { enableAutoUnmount, mount } from "@vue/test-utils";

import OMenu from "@/components/menu/Menu.vue";

describe("OMenu tests", () => {
    enableAutoUnmount(afterEach);

    test("render correctly", () => {
        const wrapper = mount(OMenu);
        expect(!!wrapper.vm).toBeTruthy();
        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.attributes("data-oruga")).toBe("menu");
        expect(wrapper.html()).toMatchSnapshot();
        expect(wrapper.classes("o-menu")).toBeTruthy();
    });

    test("render prop label correctly", () => {
        const label = "Test";
        const wrapper = mount(OMenu, { props: { label } });
        const labelDiv = wrapper.find(".o-menu__label");
        expect(labelDiv.exists()).toBeTruthy();
        expect(labelDiv.text()).toBe(label);
    });

    test("render slot label correctly", () => {
        const label = "Test";
        const wrapper = mount(OMenu, { slots: { label } });
        const labelDiv = wrapper.find(".o-menu__label");
        expect(labelDiv.exists()).toBeTruthy();
        expect(labelDiv.text()).toBe(label);
    });

    test("render empty list correctly", () => {
        const wrapper = mount(OMenu);
        const listDiv = wrapper.find(".o-menu__list");
        expect(listDiv.exists()).toBeTruthy();
        const items = listDiv.findAll("*");
        expect(items.length).toBe(0);
    });

    test("render default slot correctly", () => {
        const template = '<div class="content"> content </div>';
        const wrapper = mount(OMenu, { slots: { default: template } });
        const listDiv = wrapper.find(".o-menu__list");
        expect(listDiv.exists()).toBeTruthy();
        const content = listDiv.find(".content");
        expect(content.exists()).toBeTruthy();
        expect(content.html()).toBe(template);
    });
});
