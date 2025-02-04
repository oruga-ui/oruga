import { afterEach, describe, expect, test } from "vitest";
import { enableAutoUnmount, mount } from "@vue/test-utils";
import type { ComponentPublicInstance, PropType } from "vue";

import OMenu from "@/components/menu/Menu.vue";
import OMenuItem from "@/components/menu/MenuItem.vue";

import type { MenuItemProps } from "../props";

describe("OMenu tests", () => {
    enableAutoUnmount(afterEach);

    test("render correctly", () => {
        const wrapper = mount(OMenu, { props: { label: "My Menu" } });
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

    describe("menu integration tests", () => {
        const items = [
            { label: "label1", icon: "user" },
            { label: "label2", icon: "mobile" },
        ];

        const componentWrapper = {
            components: {
                OMenu,
                OMenuItem,
            },
            props: {
                items: {
                    type: Array as PropType<MenuItemProps<string>[]>,
                    required: true,
                },
            },
            template: `<o-menu v-bind="$attrs">
                <o-menu-item v-for="el in items" :key="el.label" v-bind="el" />
            </o-menu>
            `,
        };

        test("render correctly", () => {
            const wrapper = mount(componentWrapper, {
                props: { items, label: "My Menu" },
            });
            expect(wrapper.attributes("data-oruga")).toBe("menu");
            expect(!!wrapper.vm).toBeTruthy();
            expect(wrapper.html()).toMatchSnapshot();

            const itemComps = wrapper.findAllComponents(OMenuItem);
            expect(itemComps.length).toBe(items.length);
            items.forEach((value, idx) => {
                expect(itemComps.at(idx)!.attributes("data-oruga")).toBe(
                    "menu-item",
                );
                expect(itemComps.at(idx)!.text()).toBe(value.label);
                expect(itemComps.at(idx)!.classes()).toContain("o-menu__item");
            });
        });

        test("react accordingly when new item is clicked", async () => {
            const wrapper = mount(componentWrapper, { props: { items } });

            const itemComps =
                wrapper.findAllComponents<ComponentPublicInstance>(
                    '[data-oruga="menu-item"]',
                );
            expect(itemComps.length).toBe(items.length);

            const itemOne = itemComps.at(0)!;
            const itemTwo = itemComps.at(1)!;
            const itemButtonOne = itemOne.find("button");
            const itemButtonTwo = itemTwo.find("button");
            expect(itemButtonOne.exists()).toBeTruthy();
            expect(itemButtonTwo.exists()).toBeTruthy();

            await itemButtonOne.trigger("click");
            expect(itemOne.emitted("update:active")![0]).toContainEqual(true);
            expect(itemTwo.emitted("update:active")).toBeUndefined();

            await itemButtonTwo.trigger("click");
            expect(itemOne.emitted("update:active")![1]).toContainEqual(false);
            expect(itemTwo.emitted("update:active")![0]).toContainEqual(true);
        });

        test("react accordingly when item has disabled prop", async () => {
            const items = [
                { label: "label1", disabled: true },
                { label: "label2", disabled: false },
            ];
            const wrapper = mount(componentWrapper, { props: { items } });

            const itemComps =
                wrapper.findAllComponents<ComponentPublicInstance>(OMenuItem);
            expect(itemComps.length).toBe(items.length);

            const itemOne = itemComps.at(0)!;
            const itemTwo = itemComps.at(1)!;
            const itemButtonOne = itemOne.find("button");
            const itemButtonTwo = itemTwo.find("button");

            expect(itemButtonOne.attributes("disabled")).toBe("");
            expect(itemButtonOne.classes()).toContain(
                "o-menu__item__button--disabled",
            );
            expect(itemButtonTwo.attributes("disabled")).toBeUndefined();

            await itemButtonOne.trigger("click");
            expect(itemOne.emitted("update:active")).toBeUndefined();
            expect(itemTwo.emitted("update:active")).toBeUndefined();

            await itemButtonTwo.trigger("click");
            expect(itemOne.emitted("update:active")).toBeUndefined();
            expect(itemTwo.emitted("update:active")![0]).toContainEqual(true);
        });

        test("react accordingly when item has active prop", async () => {
            const item = {
                label: "label1",
                icon: "user",
                active: true,
            };
            const wrapper = mount(componentWrapper, {
                props: { items: [item] },
            });

            const itemComp =
                wrapper.findComponent<ComponentPublicInstance>(OMenuItem);
            expect(itemComp.exists()).toBeTruthy();
            const itemButton = itemComp.find("button");
            expect(itemButton.classes()).toContain(
                "o-menu__item__button--active",
            );

            await itemButton.trigger("click");
            expect(itemComp.emitted("update:active")).toHaveLength(1);
            expect(itemComp.emitted("update:active")![0]).toContainEqual(false);
        });

        test("react accordingly when item has tag prop", () => {
            const item = {
                label: "label1",
                icon: "user",
                tag: "a",
                "data-test": "menu-item-tag",
            };
            const wrapper = mount(componentWrapper, {
                props: { items: [item] },
            });

            const itemComp = wrapper.findComponent(OMenuItem);
            expect(itemComp.exists()).toBeTruthy();
            const tag = itemComp.find(item.tag);
            expect(tag.exists()).toBeTruthy();
            expect(tag.attributes("data-test")).toBe(item["data-test"]);
        });

        test("react accordingly when menu is not accordion", async () => {
            const wrapper = mount(componentWrapper, {
                props: { items, accordion: false },
            });

            const itemComps =
                wrapper.findAllComponents<ComponentPublicInstance>(OMenuItem);
            expect(itemComps.length).toBe(items.length);

            const itemOne = itemComps.at(0)!;
            const itemTwo = itemComps.at(1)!;
            const itemButtonOne = itemOne.find("button");
            const itemButtonTwo = itemTwo.find("button");

            await itemButtonOne.trigger("click");
            expect(itemOne.emitted("update:active")![0]).toContainEqual(true);
            expect(itemOne.emitted("update:expanded")).toBeUndefined();
            expect(itemTwo.emitted("update:active")).toBeUndefined();
            expect(itemTwo.emitted("update:expanded")).toBeUndefined();
            await itemButtonTwo.trigger("click");
            expect(itemOne.emitted("update:active")![1]).toContainEqual(false);
            expect(itemOne.emitted("update:expanded")).toBeUndefined();
            expect(itemTwo.emitted("update:active")![0]).toContainEqual(true);
            expect(itemTwo.emitted("update:expanded")).toBeUndefined();
            await itemButtonOne.trigger("click");
            expect(itemOne.emitted("update:active")![2]).toContainEqual(true);
            expect(itemOne.emitted("update:expanded")).toBeUndefined();
            expect(itemTwo.emitted("update:active")![1]).toContainEqual(false);
            expect(itemTwo.emitted("update:expanded")).toBeUndefined();
        });

        test("react accordingly when menu is disabled", async () => {
            const wrapper = mount(componentWrapper, {
                props: { items, disabled: true },
            });

            const itemComps =
                wrapper.findAllComponents<ComponentPublicInstance>(OMenuItem);
            expect(itemComps.length).toBe(items.length);

            const itemOne = itemComps.at(0)!;
            const itemTwo = itemComps.at(1)!;
            const itemButtonOne = itemOne.find("button");
            const itemButtonTwo = itemTwo.find("button");

            await itemButtonOne.trigger("click");
            expect(itemOne.emitted("update:active")).toBeUndefined();
            expect(itemTwo.emitted("update:active")).toBeUndefined();
            await itemButtonTwo.trigger("click");
            expect(itemOne.emitted("update:active")).toBeUndefined();
            expect(itemTwo.emitted("update:active")).toBeUndefined();
            await itemButtonOne.trigger("click");
            expect(itemOne.emitted("update:active")).toBeUndefined();
            expect(itemTwo.emitted("update:active")).toBeUndefined();
        });
    });
});
