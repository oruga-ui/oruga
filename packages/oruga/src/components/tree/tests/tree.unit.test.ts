import { afterEach, describe, expect, test } from "vitest";
import { enableAutoUnmount, mount } from "@vue/test-utils";
import { type ComponentPublicInstance, type PropType } from "vue";

import OTree from "@/components/tree/Tree.vue";
import OTreeItem from "@/components/tree/TreeItem.vue";

import type { OptionsGroupProp, OptionsItem, OptionsProp } from "@/composables";
import type { TreeItemProps } from "../props";

describe("OTree tests", () => {
    enableAutoUnmount(afterEach);

    const options: OptionsGroupProp = [
        {
            label: "Documents",
            attrs: {
                icon: "folder",
            },
            options: [
                {
                    label: "Work",
                    value: "work",
                    attrs: {
                        icon: "cog",
                        options: [
                            {
                                label: "Expenses.doc",
                                value: "expenses",
                                attrs: {
                                    icon: "file",
                                },
                            },
                            {
                                label: "Resume.doc",
                                value: "resume",
                                attrs: {
                                    icon: "file",
                                },
                            },
                        ],
                    },
                },
                {
                    label: "Home",
                    value: "home",
                    attrs: {
                        icon: "home",
                        options: [
                            {
                                label: "Invoices.txt",
                                value: "invoices",
                                attrs: {
                                    icon: "file",
                                },
                            },
                        ],
                    },
                },
            ],
        },
        {
            label: "Events",
            value: "events",
            attrs: {
                icon: "calendar",
            },
            options: [
                {
                    label: "Meeting",
                    value: "meeting",
                    attrs: {
                        icon: "calendar-plus",
                    },
                },
                {
                    label: "Product Launch",
                    value: "product-launch",
                    attrs: {
                        icon: "calendar-plus",
                    },
                },
                {
                    label: "Report Review",
                    value: "report-review",
                    attrs: {
                        icon: "calendar-plus",
                    },
                },
            ],
        },
        {
            label: "Movies",
            value: "movies",
            attrs: {
                icon: "star",
            },
            options: [
                {
                    label: "Al Pacino",
                    value: "al-pacion",
                    attrs: {
                        icon: "star",
                        options: [
                            {
                                label: "Scarface",
                                value: "scarface",
                                attrs: {
                                    icon: "video",
                                },
                            },
                            {
                                label: "Serpico",
                                value: "serpico",
                                attrs: {
                                    icon: "video",
                                },
                            },
                        ],
                    },
                },
                {
                    label: "Robert De Niro",
                    value: "robert-de-niro",
                    attrs: {
                        icon: "star",
                        options: [
                            {
                                label: "Goodfellas",
                                value: "goodfellas",
                                attrs: {
                                    icon: "video",
                                },
                            },
                            {
                                label: "Untouchables",
                                value: "untouchables",
                                attrs: {
                                    icon: "video",
                                },
                            },
                        ],
                    },
                },
            ],
        },
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
        template: `
            <o-tree v-bind="$attrs">
                <o-tree-item v-for="el in items" :key="el.label" v-bind="el" />
            </o-tree>
            `,
    };

    test("render correctly", () => {
        const wrapper = mount(OTree);
        expect(!!wrapper.vm).toBeTruthy();
        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.attributes("data-oruga")).toBe("tree");
        expect(wrapper.html()).toMatchSnapshot();
        expect(wrapper.classes("o-tree")).toBeTruthy();
    });

    test("render empty list correctly", () => {
        const wrapper = mount(OTree, { props: { options: [] } });
        expect(wrapper.attributes("data-oruga")).toBe("tree");
        expect(wrapper.html()).toMatchSnapshot();

        const list = wrapper.find(".o-tree__list");
        expect(list.exists()).toBeTruthy();
        const items = list.findAll("*");
        expect(items.length).toBe(1);
    });

    test("render correctly with options", async () => {
        const items = [
            { label: "label1", icon: "user" },
            { label: "label2", icon: "mobile" },
        ];

        const wrapper = mount(componentWrapper, {
            props: { items },
        });
        expect(wrapper.attributes("data-oruga")).toBe("tree");
        expect(wrapper.html()).toMatchSnapshot();

        const itemComps = wrapper.findAllComponents(OTreeItem);
        expect(itemComps.length).toBe(items.length);

        items.forEach((value, idx) => {
            expect(itemComps[idx]!.attributes("data-oruga")).toBe("tree-item");
            expect(itemComps[idx]!.text()).toBe(value.label);
            expect(itemComps[idx]!.classes()).toContain("o-tree__item");
        });
    });

    test("render correctly with deep options", () => {
        const wrapper = mount(OTree, { props: { options } });
        expect(!!wrapper.vm).toBeTruthy();
        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.attributes("data-oruga")).toBe("tree");
        expect(wrapper.html()).toMatchSnapshot();
        expect(wrapper.classes("o-tree")).toBeTruthy();

        const items = wrapper.findAllComponents(OTreeItem);
        expect(items.length).toBe(17);

        items.forEach((value, idx) => {
            expect(items[idx]!.attributes("data-oruga")).toBe("tree-item");
            expect(items[idx]!.classes()).toContain("o-tree__item");
        });
    });

    describe("handle options props correctly", () => {
        const options: OptionsProp = [
            { label: "New York", value: "NY" },
            { label: "Rome", value: "RM" },
            { label: "London", value: "LDN" },
            { label: "Istanbul", value: "IST" },
            { label: "Paris", value: "PRS" },
        ];

        test("react accordingly when is using objects values", async () => {
            const wrapper = mount(OTree, {
                props: { options, selectable: true },
            });

            const items = wrapper.findAll('[data-oruga="tree-item"]');
            expect(items.length).toBe(options.length);

            items.forEach((item, index) =>
                expect(item.text()).toEqual(options[index].label),
            );

            const itemLabel = items[1].find(".o-tree__item-label");
            expect(itemLabel.exists()).toBeTruthy();
            await itemLabel.trigger("click");
            expect(items[0].classes("o-tree__item--selected")).toBeFalsy();
            expect(items[1].classes("o-tree__item--selected")).toBeTruthy();
            expect(items[2].classes("o-tree__item--selected")).toBeFalsy();

            expect(wrapper.emitted("update:modelValue")).toHaveLength(1);
            expect(wrapper.emitted("update:modelValue")![0][0]).toStrictEqual(
                options[1].value,
            );
            expect(wrapper.emitted("select")).toHaveLength(1);
            expect(wrapper.emitted("select")![0][0]).toStrictEqual(
                options[1].value,
            );
        });

        test("handle options as primitves correctly", async () => {
            const options: OptionsProp = ["Flint", "Silver", "Vane", 0, 1, 2];

            const wrapper = mount(OTree, { props: { options } });

            const items = wrapper.findAll('[data-oruga="tree-item"]');
            expect(items).toHaveLength(options.length);

            items.forEach((el, idx) => {
                expect(el.text()).toBe(String(options[idx]));
                expect(el.attributes("aria-disabled")).toBe("false");
                expect(el.attributes("aria-hidden")).toBe("false");
                expect(el.attributes("aria-selected")).toBe("false");
            });
        });

        test("handle options as object correctly", async () => {
            const options: OptionsProp = {
                flint: "Flint",
                silver: "Silver",
                vane: "Vane",
                0: "Zero",
                1: "One",
                2: "Two",
            };

            const wrapper = mount(OTree, { props: { options } });

            const items = wrapper.findAll('[data-oruga="tree-item"]');
            expect(items).toHaveLength(Object.keys(options).length);

            items.forEach((el, idx) => {
                expect(el.text()).toBe(Object.entries(options)[idx][1]);
                expect(el.attributes("aria-disabled")).toBe("false");
                expect(el.attributes("aria-hidden")).toBe("false");
                expect(el.attributes("aria-selected")).toBe("false");
            });
        });

        test("handle options as options array correctly", async () => {
            const options: OptionsProp<string | number> = [
                { label: "Flint", value: "flint" },
                { label: "Silver", value: "silver", attrs: { disabled: true } },
                { label: "Vane", value: "vane" },
                { label: "Zero", value: 0 },
                { label: "One", value: 1 },
                { label: "Two", value: 2, attrs: { disabled: true } },
            ];

            const wrapper = mount(OTree, { props: { options } });

            const items = wrapper.findAll('[data-oruga="tree-item"]');
            expect(items).toHaveLength(options.length);

            items.forEach((el, idx) => {
                expect(el.text()).toBe(options[idx].label);
                expect(el.attributes("aria-disabled")).toBe(
                    options[idx].attrs?.disabled ? "true" : "false",
                );
                expect(el.attributes("aria-hidden")).toBe("false");
                expect(el.attributes("aria-selected")).toBe("false");
            });
        });

        test("handle grouped options correctly", async () => {
            const options: OptionsGroupProp<string | number | object> = [
                {
                    label: "Black Sails",
                    options: [
                        { label: "Flint", value: "flint" },
                        { label: "Silver", value: "silver" },
                        { label: "Vane", value: "vane" },
                        { label: "Billy", value: "billy" },
                    ],
                },
                {
                    label: "Breaking Bad",
                    options: {
                        heisenberg: "Heisenberg",
                        jesse: "Jesse",
                        saul: "Saul",
                        mike: "Mike",
                    },
                },
                {
                    label: "Game of Thrones",
                    attrs: { disabled: true },
                    options: [
                        "Tyrion Lannister",
                        "Jamie Lannister",
                        "Daenerys Targaryen",
                        "Jon Snow",
                    ],
                },
            ];

            const wrapper = mount(OTree, { props: { options } });

            const items = wrapper.findAll('[data-oruga="tree-item"]');
            expect(items).toHaveLength(15);

            items.forEach((el, idx) => {
                const isGroup = idx % 5 == 0;
                const g_idx = Math.floor(idx / 5);
                const o_idx = (idx % 5) - 1;

                const option = options[g_idx];

                if (isGroup) {
                    const label = el.find(".o-tree__item-label");
                    expect(label.exists()).toBeTruthy();
                    expect(label.text()).toBe(option.label);
                    expect(el.attributes("aria-disabled")).toBe(
                        option.attrs?.disabled ? "true" : "false",
                    );
                    expect(el.attributes("aria-hidden")).toBe("false");
                    expect(el.attributes("aria-selected")).toBe("false");
                } else {
                    const g_options = option.options;

                    let optionLabel;
                    if (idx < 5) {
                        optionLabel =
                            (g_options[o_idx] as OptionsItem).label ||
                            g_options[o_idx];
                    } else if (idx < 10) {
                        optionLabel = Object.entries(g_options)[o_idx][1];
                    } else {
                        optionLabel = g_options[o_idx];
                    }

                    expect(el.text()).toBe(optionLabel);
                    expect(el.attributes("aria-disabled")).toBe("false");
                    expect(el.attributes("aria-hidden")).toBe("false");
                    expect(el.attributes("aria-selected")).toBe("false");
                }
            });
        });
    });

    describe("test collapsable", () => {
        test("react accordingly when tree is not collapsable", async () => {
            const wrapper = mount(OTree, {
                props: { options, collapsable: false },
            });

            const items =
                wrapper.findAllComponents<ComponentPublicInstance>(OTreeItem);
            expect(items.length).toBe(17);

            const itemOne = items[0]; // Documents item
            expect(itemOne.find(".o-tree__item-label").text()).toBe(
                "Documents",
            );
            const itemTwo = items[6]; // Events item
            expect(itemTwo.find(".o-tree__item-label").text()).toBe("Events");
            const itemThree = items[10]; // Movies item
            expect(itemThree.find(".o-tree__item-label").text()).toBe("Movies");

            await itemOne.trigger("click");
            expect(itemOne.emitted("open")).toBeUndefined();
            expect(itemOne.emitted("close")).toBeUndefined();
            await itemTwo.trigger("click");
            expect(itemTwo.emitted("open")).toBeUndefined();
            expect(itemTwo.emitted("close")).toBeUndefined();
            await itemThree.trigger("click");
            expect(itemThree.emitted("open")).toBeUndefined();
            expect(itemThree.emitted("close")).toBeUndefined();
        });

        test("react accordingly when tree is collapsable", async () => {
            const wrapper = mount(OTree, {
                props: { options, collapsable: true },
            });

            const items =
                wrapper.findAllComponents<ComponentPublicInstance>(OTreeItem);
            expect(items.length).toBe(17);

            const itemOne = items[0]; // Documents item
            const itemOneLabel = itemOne.find(".o-tree__item-label");
            expect(itemOneLabel.exists()).toBeTruthy();
            expect(itemOneLabel.text()).toBe("Documents",
            );
            const itemTwo = items[6]; // Events item
            const itemTwoLabel = itemTwo.find(".o-tree__item-label");
            expect(itemTwoLabel.exists()).toBeTruthy();
            expect(itemTwoLabel.text()).toBe("Events");

            const itemThree = items[10]; // Movies item
            const itemThreeLabel = itemThree.find(".o-tree__item-label");
            expect(itemThreeLabel.exists()).toBeTruthy();
            expect(itemThreeLabel.text()).toBe("Movies");

            // open tree sections
            await itemOneLabel.trigger("click");
            expect(itemOne.emitted("open")).toBeDefined();
            expect(itemOne.emitted("close")).toBeUndefined();
            await itemTwoLabel.trigger("click");
            expect(itemTwo.emitted("open")).toBeDefined();
            expect(itemTwo.emitted("close")).toBeUndefined();
            await itemThreeLabel.trigger("click");
            expect(itemThree.emitted("open")).toBeDefined();
            expect(itemThree.emitted("close")).toBeUndefined();

            // close all tree sections
            await itemOneLabel.trigger("click");
            expect(itemOne.emitted("open")).toBeDefined();
            expect(itemOne.emitted("close")).toBeDefined();
            await itemTwoLabel.trigger("click");
            expect(itemTwo.emitted("open")).toBeDefined();
            expect(itemTwo.emitted("close")).toBeDefined();
            await itemThreeLabel.trigger("click");
            expect(itemThree.emitted("open")).toBeDefined();
            expect(itemThree.emitted("close")).toBeDefined();
        });
    });

    describe("test selectable", () => {
        const options: OptionsProp = [
            { label: "New York", value: "NY" },
            { label: "Rome", value: "RM" },
            { label: "London", value: "LDN" },
            { label: "Istanbul", value: "IST" },
            { label: "Paris", value: "PRS" },
        ];

        test("react accordingly when new item is selected", async () => {
            const wrapper = mount(OTree, {
                props: {
                    options,
                    selectable: true,
                    modelValue: options[0].value,
                },
            });

            expect(wrapper.classes("o-tree--selectable")).toBeTruthy();

            const items = wrapper.findAll(".o-tree__item");
            expect(items.length).toBe(options.length);

            expect(items[0].classes("o-tree__item--selected")).toBeTruthy();
            expect(items[1].classes("o-tree__item--selected")).toBeFalsy();
            expect(items[2].classes("o-tree__item--selected")).toBeFalsy();

            const itemLabel = items[2].find(".o-tree__item-label");
            expect(itemLabel.exists()).toBeTruthy();
            await itemLabel.trigger("click");

            expect(items[0].classes("o-tree__item--selected")).toBeFalsy();
            expect(items[1].classes("o-tree__item--selected")).toBeFalsy();
            expect(items[2].classes("o-tree__item--selected")).toBeTruthy();

            expect(wrapper.emitted("update:modelValue")).toHaveLength(1);
            expect(wrapper.emitted("update:modelValue")![0][0]).toBe(
                options[2].value,
            );
            expect(wrapper.emitted("select")).toHaveLength(1);
            expect(wrapper.emitted("select")![0][0]).toBe(options[2].value);
        });

        test("react accordingly when item is clicked without selectable", async () => {
            const wrapper = mount(OTree, {
                props: {
                    options,
                    selectable: false,
                },
            });

            const itemComps =
                wrapper.findAllComponents<ComponentPublicInstance>(
                    '[data-oruga="tree-item"]',
                );
            expect(itemComps.length).toBe(options.length);

            const treeItems = wrapper.findAll('[role="treeitem"]');
            expect(treeItems.length).toBe(options.length);

            await treeItems[0].trigger("click");
            await treeItems[1].trigger("click");
            expect(wrapper.emitted("update:modelValue")).toBeUndefined();
        });

        test("react accordingly when same item is deselected", async () => {
            const wrapper = mount(OTree, {
                props: {
                    options,
                    modelValue: options[0].value,
                    selectable: true,
                },
            });

            const items = wrapper.findAll(".o-tree__item");
            expect(items.length).toBe(options.length);

            expect(items[0].classes("o-tree__item--selected")).toBeTruthy();
            expect(items[1].classes("o-tree__item--selected")).toBeFalsy();
            expect(items[2].classes("o-tree__item--selected")).toBeFalsy();

            const itemLabel = items[0].find(".o-tree__item-label");
            expect(itemLabel.exists()).toBeTruthy();
            await itemLabel.trigger("click");

            expect(items[0].classes("o-tree__item--selected")).toBeFalsy();
            expect(items[1].classes("o-tree__item--selected")).toBeFalsy();
            expect(items[2].classes("o-tree__item--selected")).toBeFalsy();

            expect(wrapper.emitted("update:modelValue")).toHaveLength(1);
            expect(wrapper.emitted("update:modelValue")![0][0]).toBe(undefined);
            expect(wrapper.emitted("select")).toBeUndefined();
        });

        test("react accordingly when an item is selected with multiple prop", async () => {
            const wrapper = mount(OTree, {
                props: {
                    options,
                    selectable: true,
                    multiple: true,
                },
            });

            expect(wrapper.classes("o-tree--multiple")).toBeTruthy();

            const items = wrapper.findAll(".o-tree__item");
            expect(items.length).toBe(options.length);

            expect(items[0].classes("o-tree__item--selected")).toBeFalsy();
            expect(items[1].classes("o-tree__item--selected")).toBeFalsy();
            expect(items[2].classes("o-tree__item--selected")).toBeFalsy();

            let itemLabel = items[0].find(".o-tree__item-label");
            expect(itemLabel.exists()).toBeTruthy();

            await itemLabel.trigger("click");

            expect(items[0].classes("o-tree__item--selected")).toBeTruthy();
            expect(items[1].classes("o-tree__item--selected")).toBeFalsy();
            expect(items[2].classes("o-tree__item--selected")).toBeFalsy();

            expect(wrapper.emitted("select")).toHaveLength(1);
            expect(wrapper.emitted("select")![0]).toContain(options[0].value);
            expect(wrapper.emitted("update:modelValue")).toHaveLength(1);
            expect(wrapper.emitted("update:modelValue")![0][0]).toHaveLength(1);
            expect(wrapper.emitted("update:modelValue")![0][0]).toContain(
                options[0].value,
            );

            itemLabel = items[2].find(".o-tree__item-label");
            expect(itemLabel.exists()).toBeTruthy();

            await itemLabel.trigger("click");

            expect(items[0].classes("o-tree__item--selected")).toBeTruthy();
            expect(items[1].classes("o-tree__item--selected")).toBeFalsy();
            expect(items[2].classes("o-tree__item--selected")).toBeTruthy();

            expect(wrapper.emitted("select")).toHaveLength(2);
            expect(wrapper.emitted("select")![1]).toContain(options[2].value);
            expect(wrapper.emitted("update:modelValue")).toHaveLength(2);
            expect(wrapper.emitted("update:modelValue")![1][0]).toHaveLength(2);
            expect(wrapper.emitted("update:modelValue")![1][0]).toContain(
                options[0].value,
            );
            expect(wrapper.emitted("update:modelValue")![1][0]).toContain(
                options[2].value,
            );

            itemLabel = items[0].find(".o-tree__item-label");
            expect(itemLabel.exists()).toBeTruthy();

            await itemLabel.trigger("click");

            expect(items[0].classes("o-tree__item--selected")).toBeFalsy();
            expect(items[1].classes("o-tree__item--selected")).toBeFalsy();
            expect(items[2].classes("o-tree__item--selected")).toBeTruthy();

            expect(wrapper.emitted("select")).toHaveLength(2);
            expect(wrapper.emitted("update:modelValue")).toHaveLength(3);
            expect(wrapper.emitted("update:modelValue")![2][0]).toHaveLength(1);
            expect(wrapper.emitted("update:modelValue")![2][0]).not.toContain(
                options[0].value,
            );
            expect(wrapper.emitted("update:modelValue")![2][0]).toContain(
                options[2].value,
            );
        });

        test("react accordingly when tree is disabled", async () => {
            const wrapper = mount(OTree, {
                props: { options: options, disabled: true },
            });

            expect(wrapper.classes("o-tree--disabled")).toBeTruthy();

            const items = wrapper.findAll(".o-tree__item");
            expect(items.length).toBe(options.length);

            items.forEach((item) =>
                expect(item.classes("o-tree__item--selected")).toBeFalsy(),
            );

            await items[0].trigger("click");

            items.forEach((item) =>
                expect(item.classes("o-tree__item--selected")).toBeFalsy(),
            );

            expect(wrapper.emitted("update:modelValue")).toBeUndefined();
            expect(wrapper.emitted("select")).toBeUndefined();

            expect(wrapper.classes("o-tree--disabled")).toBeTruthy();
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

            const treeItems = wrapper.findAll('[role="treeitem"]');
            expect(treeItems.length).toBe(items.length);

            expect(treeItems[0].attributes("aria-disabled")).toBe("true");
            expect(itemComps[0].classes()).toContain("o-tree__item--disabled");
            expect(itemComps[1].attributes("aria-disabled")).toBe("false");
        });

        test("react accordingly when selected with keydown", async () => {
            const wrapper = mount(OTree, {
                props: { options, selectable: true },
            });

            const list = wrapper.find("ul");
            expect(list.exists()).toBeTruthy();

            await list.trigger("keydown", { code: "ArrowDown", key: "Down" });
            await list.trigger("keydown", { code: "Enter", key: "Enter" });

            expect(wrapper.emitted("select")).toStrictEqual([
                [options[0].value],
            ]);
            expect(wrapper.emitted("update:modelValue")).toStrictEqual([
                [options[0].value],
            ]);
        });
    });
});
