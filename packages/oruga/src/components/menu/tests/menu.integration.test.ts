import { afterEach, describe, expect, test } from "vitest";
import { enableAutoUnmount, mount } from "@vue/test-utils";

import MenuExample from "./MenuExample.vue";
import OMenuItem from "@/components/menu/MenuItem.vue";

describe("Menu integration tests", () => {
    const items = [
        { label: "label1", icon: "user" },
        { label: "label2", icon: "mobile" },
    ];

    enableAutoUnmount(afterEach);

    test("render correctly", () => {
        const wrapper = mount(MenuExample, { props: { items } });
        expect(wrapper.attributes("data-oruga")).toBe("menu");
        expect(!!wrapper.vm).toBeTruthy();
        expect(wrapper.html()).toMatchSnapshot();

        const itemComps = wrapper.findAllComponents(OMenuItem);
        expect(itemComps.length).toBe(items.length);
        items.forEach((value, idx) => {
            expect(itemComps.at(idx).attributes("data-oruga")).toBe(
                "menu-item",
            );
            expect(itemComps.at(idx).text()).toBe(value.label);
            expect(itemComps.at(idx).classes()).toContain(
                "o-menu__item__wrapper",
            );
        });
    });

    test("react accordingly when new item is clicked", async () => {
        const wrapper = mount(MenuExample, { props: { items } });

        const itemComps = wrapper.findAllComponents(OMenuItem);
        expect(itemComps.length).toBe(items.length);

        const itemOne = itemComps.at(0);
        const itemTwo = itemComps.at(1);
        const itemButtonOne = itemOne.find("button");
        const itemButtonTwo = itemTwo.find("button");
        expect(itemButtonOne.exists()).toBeTruthy();
        expect(itemButtonTwo.exists()).toBeTruthy();

        await itemButtonOne.trigger("click");
        expect(itemOne.emitted("update:active")[0]).toContainEqual(true);
        expect(itemOne.emitted("update:expanded")[0]).toContainEqual(true);
        expect(itemTwo.emitted("update:active")[0]).toContainEqual(false);
        expect(itemTwo.emitted("update:expanded")[0]).toContainEqual(false);

        await itemButtonTwo.trigger("click");
        expect(itemOne.emitted("update:active")[1]).toContainEqual(false);
        expect(itemOne.emitted("update:expanded")[1]).toContainEqual(false);
        expect(itemTwo.emitted("update:active")[1]).toContainEqual(true);
        expect(itemTwo.emitted("update:expanded")[1]).toContainEqual(true);
    });

    test("react accordingly when item has disabled prop", async () => {
        const items = [
            { label: "label1", disabled: true },
            { label: "label2", disabled: false },
        ];
        const wrapper = mount(MenuExample, { props: { items } });

        const itemComps = wrapper.findAllComponents(OMenuItem);
        expect(itemComps.length).toBe(items.length);

        const itemOne = itemComps.at(0);
        const itemTwo = itemComps.at(1);
        const itemButtonOne = itemOne.find("button");
        const itemButtonTwo = itemTwo.find("button");

        expect(itemButtonOne.attributes("disabled")).toBe("");
        expect(itemButtonOne.classes()).toContain("o-menu__item--disabled");
        expect(itemButtonTwo.attributes("disabled")).toBe(undefined);

        await itemButtonOne.trigger("click");
        expect(itemOne.emitted("update:active")).toBe(undefined);
        expect(itemTwo.emitted("update:active")).toBe(undefined);

        await itemButtonTwo.trigger("click");
        expect(itemOne.emitted("update:active")[0]).toContainEqual(false);
        expect(itemTwo.emitted("update:active")[0]).toContainEqual(true);
    });

    test("react accordingly when item has active prop", async () => {
        const item = {
            label: "label1",
            icon: "user",
            active: true,
        };
        const wrapper = mount(MenuExample, { props: { items: [item] } });

        const itemComp = wrapper.findComponent(OMenuItem);
        expect(itemComp.exists()).toBeTruthy();
        const itemButton = itemComp.find("button");
        expect(itemButton.classes()).toContain("o-menu__item--active");

        await itemButton.trigger("click");
        expect(itemComp.emitted("update:active")[0]).toContainEqual(false);
    });

    test("react accordingly when item has tag prop", () => {
        const item = {
            label: "label1",
            icon: "user",
            tag: "a",
            "data-test": "menu-item-tag",
        };
        const wrapper = mount(MenuExample, { props: { items: [item] } });

        const itemComp = wrapper.findComponent(OMenuItem);
        expect(itemComp.exists()).toBeTruthy();
        const tag = itemComp.find(item.tag);
        expect(tag.exists()).toBeTruthy();
        expect(tag.attributes("data-test")).toBe(item["data-test"]);
    });

    test("react accordingly when menu is not accordion", async () => {
        const wrapper = mount(MenuExample, {
            props: { items, accordion: false },
        });

        const itemComps = wrapper.findAllComponents(OMenuItem);
        expect(itemComps.length).toBe(items.length);
        const itemOne = itemComps.at(0);
        const itemTwo = itemComps.at(1);
        const itemButtonOne = itemOne.find("button");
        const itemButtonTwo = itemTwo.find("button");

        await itemButtonOne.trigger("click");
        expect(itemOne.emitted("update:active")[0]).toContainEqual(true);
        expect(itemOne.emitted("update:expanded")).toBe(undefined);
        expect(itemTwo.emitted("update:active")[0]).toContainEqual(false);
        expect(itemTwo.emitted("update:expanded")).toBe(undefined);
        await itemButtonTwo.trigger("click");
        expect(itemOne.emitted("update:active")[1]).toContainEqual(false);
        expect(itemOne.emitted("update:expanded")).toBe(undefined);
        expect(itemTwo.emitted("update:active")[1]).toContainEqual(true);
        expect(itemTwo.emitted("update:expanded")).toBe(undefined);
        await itemButtonOne.trigger("click");
        expect(itemOne.emitted("update:active")[2]).toContainEqual(true);
        expect(itemOne.emitted("update:expanded")).toBe(undefined);
        expect(itemTwo.emitted("update:active")[2]).toContainEqual(false);
        expect(itemTwo.emitted("update:expanded")).toBe(undefined);
    });

    test("react accordingly when menu is not activable", async () => {
        const wrapper = mount(MenuExample, {
            props: { items, activable: false },
        });

        const itemComps = wrapper.findAllComponents(OMenuItem);
        expect(itemComps.length).toBe(items.length);
        const itemOne = itemComps.at(0);
        const itemTwo = itemComps.at(1);
        const itemButtonOne = itemOne.find("button");
        const itemButtonTwo = itemTwo.find("button");

        await itemButtonOne.trigger("click");
        expect(itemOne.emitted("update:active")).toBe(undefined);
        expect(itemOne.emitted("update:expanded")[0]).toContainEqual(true);
        expect(itemTwo.emitted("update:active")).toBe(undefined);
        expect(itemTwo.emitted("update:expanded")[0]).toContainEqual(false);
        await itemButtonTwo.trigger("click");
        expect(itemOne.emitted("update:active")).toBe(undefined);
        expect(itemOne.emitted("update:expanded")[1]).toContainEqual(false);
        expect(itemTwo.emitted("update:active")).toBe(undefined);
        expect(itemTwo.emitted("update:expanded")[1]).toContainEqual(true);
        await itemButtonOne.trigger("click");
        expect(itemOne.emitted("update:active")).toBe(undefined);
        expect(itemOne.emitted("update:expanded")[2]).toContainEqual(true);
        expect(itemTwo.emitted("update:active")).toBe(undefined);
        expect(itemTwo.emitted("update:expanded")[2]).toContainEqual(false);
    });
});
