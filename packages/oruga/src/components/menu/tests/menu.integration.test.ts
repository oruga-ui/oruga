import { afterEach, describe, expect, test } from "vitest";
import { enableAutoUnmount, flushPromises, mount } from "@vue/test-utils";

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

        const itemComps = wrapper.findAllComponents(OMenuItem);
        expect(itemComps.length).toBe(items.length);
        items.forEach((value, idx) => {
            expect(itemComps.at(idx).attributes("data-oruga")).toBe(
                "menu-item",
            );
            expect(itemComps.at(idx).text()).toBe(value.label);
        });
    });

    test("react accordingly when new item is clicked", async () => {
        const wrapper = mount(MenuExample, { props: { items } });

        const itemComps = wrapper.findAllComponents(OMenuItem);
        expect(itemComps.length).toBe(items.length);

        const item = itemComps.at(0).find("button");
        expect(item.exists()).toBeTruthy();

        await item.trigger("click");
        expect(wrapper.emitted("update:active")[0]).toContainEqual(false);
        expect(wrapper.emitted("update:expanded")[0]).toContainEqual(true);
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

    test("react accordingly when item has disabled prop", async () => {
        const items = [
            { label: "label1", disabled: true },
            { label: "label2", disabled: false },
        ];
        const wrapper = mount(MenuExample, { props: { items } });
        await flushPromises(); // await items get registered in menu

        const itemComps = wrapper.findAllComponents(OMenuItem);
        expect(itemComps.length).toBe(items.length);
        const disabledItem = itemComps.at(0);
        const normalItem = itemComps.at(1);
        expect(disabledItem.exists()).toBeTruthy();
        expect(normalItem.exists()).toBeTruthy();
        const disabledItemButton = disabledItem.find("button");
        const normalItemButton = normalItem.find("button");
        expect(disabledItemButton.attributes("disabled")).toBe("");
        expect(normalItemButton.attributes("disabled")).toBe(undefined);

        await disabledItemButton.trigger("click");
        expect(disabledItem.emitted("update:active")).toBe(undefined);

        // await normalItemButton.trigger("click");
        // console.log(disabledItem.emitted("update:active"));
        // expect(disabledItem.emitted("update:active")).toBe(1);
    });

    // todo: test item disabled
    // todo: test item active "react accordingly when item has active prop"
    // todo: test item active "react accordingly when item active change"
    // todo: test menu accordion "react accordingly when menu is accordion"
    // todo: test menu activable "react accordingly when menu is not activable"
    // Active should only be toggled when activable is set by the parent
});
