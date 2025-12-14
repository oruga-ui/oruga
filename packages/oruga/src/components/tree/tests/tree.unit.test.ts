import { afterEach, describe, expect, test } from "vitest";
import { enableAutoUnmount, mount } from "@vue/test-utils";
import type { ComponentPublicInstance, PropType } from "vue";

import OTree from "@/components/tree/Tree.vue";
import OTreeItem from "@/components/tree/TreeItem.vue";

import type { TreeItemProps } from "../props";

describe("OTree tests", () => {
    enableAutoUnmount(afterEach);

    test("render correctly", () => {
        const wrapper = mount(OTree, { props: { label: "My Tree" } });
        expect(!!wrapper.vm).toBeTruthy();
        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.attributes("data-oruga")).toBe("tree");
        expect(wrapper.html()).toMatchSnapshot();
        expect(wrapper.classes("o-tree")).toBeTruthy();
    });

    test("render prop label correctly", () => {
        const label = "Test";
        const wrapper = mount(OTree, { props: { label } });
        const labelDiv = wrapper.find(".o-tree__label");
        expect(labelDiv.exists()).toBeTruthy();
        expect(labelDiv.text()).toBe(label);
    });

    test("render slot label correctly", () => {
        const label = "Test";
        const wrapper = mount(OTree, { slots: { label } });
        const labelDiv = wrapper.find(".o-tree__label");
        expect(labelDiv.exists()).toBeTruthy();
        expect(labelDiv.text()).toBe(label);
    });

    test("render empty list correctly", () => {
        const wrapper = mount(OTree);
        const listDiv = wrapper.find(".o-tree__list");
        expect(listDiv.exists()).toBeTruthy();
        const items = listDiv.findAll("*");
        expect(items.length).toBe(0);
    });

    test("render default slot correctly", () => {
        const template = '<div class="content"> content </div>';
        const wrapper = mount(OTree, { slots: { default: template } });
        const listDiv = wrapper.find(".o-tree__list");
        expect(listDiv.exists()).toBeTruthy();
        const content = listDiv.find(".content");
        expect(content.exists()).toBeTruthy();
        expect(content.html()).toBe(template);
    });

    describe("tree integration tests", () => {
        const items = [
            { label: "label1", icon: "user" },
            { label: "label2", icon: "mobile" },
        ];

        const componentWrapper = {
            components: {
                OTree,
                OTreeItem,
            },
            props: {
                items: {
                    type: Array as PropType<TreeItemProps<string>[]>,
                    required: true,
                },
            },
            template: `<o-tree v-bind="$attrs">
                <o-tree-item v-for="el in items" :key="el.label" v-bind="el" />
            </o-tree>
            `,
        };

        test("render correctly", () => {
            const wrapper = mount(componentWrapper, {
                props: { items, label: "My Tree" },
            });
            expect(wrapper.attributes("data-oruga")).toBe("tree");
            expect(!!wrapper.vm).toBeTruthy();
            expect(wrapper.html()).toMatchSnapshot();

            const itemComps = wrapper.findAllComponents(OTreeItem);
            expect(itemComps.length).toBe(items.length);
            items.forEach((value, idx) => {
                expect(itemComps[idx]!.attributes("data-oruga")).toBe(
                    "tree-item",
                );
                expect(itemComps[idx]!.text()).toBe(value.label);
                expect(itemComps[idx]!.classes()).toContain("o-tree__item");
            });
        });

        test("react accordingly when new item is clicked", async () => {
            const wrapper = mount(componentWrapper, { props: { items } });

            const itemComps =
                wrapper.findAllComponents<ComponentPublicInstance>(
                    '[data-oruga="tree-item"]',
                );
            expect(itemComps.length).toBe(items.length);

            const itemOne = itemComps[0]!;
            const itemTwo = itemComps[1]!;
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
                wrapper.findAllComponents<ComponentPublicInstance>(OTreeItem);
            expect(itemComps.length).toBe(items.length);

            const itemOne = itemComps[0]!;
            const itemTwo = itemComps[1]!;
            const itemButtonOne = itemOne.find("button");
            const itemButtonTwo = itemTwo.find("button");

            expect(itemButtonOne.attributes("disabled")).toBe("");
            expect(itemButtonOne.classes()).toContain(
                "o-tree__item__button--disabled",
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
                wrapper.findComponent<ComponentPublicInstance>(OTreeItem);
            expect(itemComp.exists()).toBeTruthy();
            const itemButton = itemComp.find("button");
            expect(itemButton.classes()).toContain(
                "o-tree__item__button--active",
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
                "data-test": "tree-item-tag",
            };
            const wrapper = mount(componentWrapper, {
                props: { items: [item] },
            });

            const itemComp = wrapper.findComponent(OTreeItem);
            expect(itemComp.exists()).toBeTruthy();
            const tag = itemComp.find(item.tag);
            expect(tag.exists()).toBeTruthy();
            expect(tag.attributes("data-test")).toBe(item["data-test"]);
        });

        test("react accordingly when tree is not accordion", async () => {
            const wrapper = mount(componentWrapper, {
                props: { items, accordion: false },
            });

            const itemComps =
                wrapper.findAllComponents<ComponentPublicInstance>(OTreeItem);
            expect(itemComps.length).toBe(items.length);

            const itemOne = itemComps[0]!;
            const itemTwo = itemComps[1]!;
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

        test("react accordingly when tree is disabled", async () => {
            const wrapper = mount(componentWrapper, {
                props: { items, disabled: true },
            });

            const itemComps =
                wrapper.findAllComponents<ComponentPublicInstance>(OTreeItem);
            expect(itemComps.length).toBe(items.length);

            const itemOne = itemComps[0]!;
            const itemTwo = itemComps[1]!;
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
