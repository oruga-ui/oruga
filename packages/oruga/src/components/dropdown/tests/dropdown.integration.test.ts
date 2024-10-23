import { afterEach, describe, expect, test } from "vitest";
import { enableAutoUnmount, mount } from "@vue/test-utils";
import type { ComponentPublicInstance } from "vue";

import DropdownExample from "./DropdownExample.vue";
import ODropdownItem from "@/components/dropdown/DropdownItem.vue";
import ODropdown from "@/components/dropdown/Dropdown.vue";

import type { OptionsGroupProp, OptionsItem, OptionsProp } from "@/composables";

describe("Dropdown integration tests", () => {
    const values = ["A", "B", "C"];

    enableAutoUnmount(afterEach);

    test("render correctly", () => {
        const wrapper = mount(DropdownExample, { props: { values } });
        expect(wrapper.attributes("data-oruga")).toBe("dropdown");
        expect(!!wrapper.vm).toBeTruthy();
        expect(wrapper.html()).toMatchSnapshot();

        const items = wrapper.findAllComponents(ODropdownItem);
        expect(items.length).toBe(values.length);
        values.forEach((value, idx) => {
            expect(items.at(idx)!.attributes("data-oruga")).toBe(
                "dropdown-item",
            );
            expect(items.at(idx)!.text()).toBe(value);
        });
    });

    test("react accordingly when new item is selected", async () => {
        const wrapper = mount(DropdownExample, {
            props: { values, value: values[0] },
        });

        const items = wrapper.findAll(".o-drop__item");
        expect(items.length).toBe(values.length);
        expect(items[0].classes("o-drop__item--active")).toBeTruthy();
        expect(items[1].classes("o-drop__item--active")).toBeFalsy();
        expect(items[2].classes("o-drop__item--active")).toBeFalsy();

        await items[2].trigger("click");

        expect(items[0].classes("o-drop__item--active")).toBeFalsy();
        expect(items[1].classes("o-drop__item--active")).toBeFalsy();
        expect(items[2].classes("o-drop__item--active")).toBeTruthy();

        const dropdown = wrapper.findComponent<ComponentPublicInstance>(
            '[data-oruga="dropdown"]',
        );
        expect(dropdown.emitted("update:modelValue")).toHaveLength(1);
        expect(dropdown.emitted("change")).toHaveLength(1);
        expect(dropdown.emitted("change")![0][0]).toBe(values[2]);
        expect(dropdown.emitted("close")).toHaveLength(1);
    });

    test("react accordingly when same item is selected", async () => {
        const wrapper = mount(DropdownExample, {
            props: { values, value: values[0] },
        });

        const items = wrapper.findAll(".o-drop__item");
        expect(items.length).toBe(values.length);
        expect(items[0].classes("o-drop__item--active")).toBeTruthy();
        expect(items[1].classes("o-drop__item--active")).toBeFalsy();
        expect(items[2].classes("o-drop__item--active")).toBeFalsy();

        await items[0].trigger("click");

        expect(items[0].classes("o-drop__item--active")).toBeTruthy();
        expect(items[1].classes("o-drop__item--active")).toBeFalsy();
        expect(items[2].classes("o-drop__item--active")).toBeFalsy();

        const dropdown = wrapper.findComponent<ComponentPublicInstance>(
            '[data-oruga="dropdown"]',
        );
        expect(dropdown.emitted("update:modelValue")).toBeUndefined();
        expect(dropdown.emitted("change")).toBeUndefined();
        expect(dropdown.emitted("close")).toHaveLength(1);
    });

    test("react accordingly when an item is selected with multiple prop", async () => {
        const wrapper = mount(DropdownExample, {
            props: { values, multiple: true },
        });

        const items = wrapper.findAll(".o-drop__item");
        expect(items.length).toBe(values.length);
        expect(items[0].classes("o-drop__item--active")).toBeFalsy();
        expect(items[1].classes("o-drop__item--active")).toBeFalsy();
        expect(items[2].classes("o-drop__item--active")).toBeFalsy();

        await items[0].trigger("click");

        expect(items[0].classes("o-drop__item--active")).toBeTruthy();
        expect(items[1].classes("o-drop__item--active")).toBeFalsy();
        expect(items[2].classes("o-drop__item--active")).toBeFalsy();

        const dropdown = wrapper.findComponent<ComponentPublicInstance>(
            '[data-oruga="dropdown"]',
        );
        expect(dropdown.emitted("update:modelValue")).toHaveLength(1);
        expect(dropdown.emitted("change")).toHaveLength(1);
        expect(dropdown.emitted("change")![0][0]).toHaveLength(1);
        expect(dropdown.emitted("change")![0][0]).toContain(values[0]);
        expect(dropdown.emitted("close")).toBeUndefined();

        await items[2].trigger("click");

        expect(items[0].classes("o-drop__item--active")).toBeTruthy();
        expect(items[1].classes("o-drop__item--active")).toBeFalsy();
        expect(items[2].classes("o-drop__item--active")).toBeTruthy();

        expect(dropdown.emitted("update:modelValue")).toHaveLength(2);
        expect(dropdown.emitted("change")).toHaveLength(2);
        expect(dropdown.emitted("change")![1][0]).toHaveLength(2);
        expect(dropdown.emitted("change")![1][0]).toContain(values[0]);
        expect(dropdown.emitted("change")![1][0]).toContain(values[2]);
        expect(dropdown.emitted("close")).toBeUndefined();

        await items[0].trigger("click");
        expect(items[0].classes("o-drop__item--active")).toBeFalsy();
        expect(items[1].classes("o-drop__item--active")).toBeFalsy();
        expect(items[2].classes("o-drop__item--active")).toBeTruthy();

        expect(dropdown.emitted("update:modelValue")).toHaveLength(3);
        expect(dropdown.emitted("change")).toHaveLength(3);
        expect(dropdown.emitted("change")![2][0]).toHaveLength(1);
        expect(dropdown.emitted("change")![2][0]).toContain(values[2]);
        expect(dropdown.emitted("close")).toBeUndefined();
    });

    test("react accordingly when item is selected without closeable", async () => {
        const wrapper = mount(DropdownExample, {
            props: { values, closeable: false },
        });

        const items = wrapper.findAll(".o-drop__item");
        expect(items.length).toBe(values.length);
        expect(items[0].classes("o-drop__item--active")).toBeFalsy();
        expect(items[1].classes("o-drop__item--active")).toBeFalsy();
        expect(items[2].classes("o-drop__item--active")).toBeFalsy();

        await items[0].trigger("click");

        expect(items[0].classes("o-drop__item--active")).toBeTruthy();
        expect(items[1].classes("o-drop__item--active")).toBeFalsy();
        expect(items[2].classes("o-drop__item--active")).toBeFalsy();

        const dropdown = wrapper.findComponent<ComponentPublicInstance>(
            '[data-oruga="dropdown"]',
        );
        expect(dropdown.emitted("update:modelValue")).toHaveLength(1);
        expect(dropdown.emitted("change")).toHaveLength(1);
        expect(dropdown.emitted("close")).toBeUndefined();
    });

    test("react accordingly when is disabled", async () => {
        const wrapper = mount(DropdownExample, {
            props: { values, disabled: true },
        });

        const items = wrapper.findAll(".o-drop__item");
        expect(items.length).toBe(values.length);
        expect(items[0].classes("o-drop__item--active")).toBeFalsy();
        expect(items[1].classes("o-drop__item--active")).toBeFalsy();
        expect(items[2].classes("o-drop__item--active")).toBeFalsy();

        await items[0].trigger("click");

        expect(items[0].classes("o-drop__item--active")).toBeFalsy();
        expect(items[1].classes("o-drop__item--active")).toBeFalsy();
        expect(items[2].classes("o-drop__item--active")).toBeFalsy();

        const dropdown = wrapper.findComponent<ComponentPublicInstance>(
            '[data-oruga="dropdown"]',
        );
        expect(dropdown.classes("o-drop--disabled")).toBeTruthy();
        expect(dropdown.emitted("update:modelValue")).toBeUndefined();
        expect(dropdown.emitted("change")).toBeUndefined();
        expect(dropdown.emitted("close")).toBeUndefined();
    });

    test("react accordingly when is using objects values", async () => {
        const values = [{ label: "1" }, { label: "2" }, { label: "3" }];
        const wrapper = mount(DropdownExample, {
            props: { values, field: "label" },
        });

        const items = wrapper.findAll(".o-drop__item");
        expect(items.length).toBe(3);

        items.forEach((item, index) =>
            expect(item.text()).toEqual(values[index].label),
        );

        const item = items[1];
        await item.trigger("click");
        expect(items[0].classes("o-drop__item--active")).toBeFalsy();
        expect(items[1].classes("o-drop__item--active")).toBeTruthy();
        expect(items[2].classes("o-drop__item--active")).toBeFalsy();

        const dropdown = wrapper.findComponent<ComponentPublicInstance>(
            '[data-oruga="dropdown"]',
        );
        expect(dropdown.emitted("update:modelValue")).toHaveLength(1);
        expect(dropdown.emitted("update:modelValue")![0][0]).toStrictEqual(
            values[1],
        );
        expect(dropdown.emitted("change")).toHaveLength(1);
        expect(dropdown.emitted("change")![0][0]).toStrictEqual(values[1]);
        expect(dropdown.emitted("close")).toHaveLength(1);
    });

    describe("render options props correctly", () => {
        test("handle options as primitves correctly", () => {
            const options: OptionsProp = ["Flint", "Silver", "Vane", 0, 1, 2];

            const wrapper = mount(ODropdown, { props: { options } });

            const optionElements = wrapper.findAll(
                '[data-oruga="dropdown-item"]',
            );
            expect(optionElements).toHaveLength(options.length);

            optionElements.forEach((el, idx) => {
                expect(el.text()).toBe(String(options[idx]));
                expect(el.attributes("aria-disabled")).toBe("false");
            });
        });

        test("handle options as object correctly", () => {
            const options: OptionsProp = {
                flint: "Flint",
                silver: "Silver",
                vane: "Vane",
                0: "Zero",
                1: "One",
                2: "Two",
            };

            const wrapper = mount(ODropdown, { props: { options } });

            const optionElements = wrapper.findAll(
                '[data-oruga="dropdown-item"]',
            );
            expect(optionElements).toHaveLength(Object.keys(options).length);

            optionElements.forEach((el, idx) => {
                expect(el.text()).toBe(Object.entries(options)[idx][1]);
                expect(el.attributes("aria-disabled")).toBe("false");
            });
        });

        test("handle options as options array correctly", () => {
            const options: OptionsProp<string | number> = [
                { label: "Flint", value: "flint" },
                { label: "Silver", value: "silver", attrs: { disabled: true } },
                { label: "Vane", value: "vane" },
                { label: "Zero", value: 0 },
                { label: "One", value: 1 },
                { label: "Two", value: 2, attrs: { disabled: true } },
            ];

            const wrapper = mount(ODropdown, { props: { options } });

            const optionElements = wrapper.findAll(
                '[data-oruga="dropdown-item"]',
            );
            expect(optionElements).toHaveLength(options.length);

            optionElements.forEach((el, idx) => {
                expect(el.text()).toBe(options[idx].label);
                expect(el.attributes("aria-disabled")).toBe(
                    options[idx].attrs?.disabled ? "true" : "false",
                );
            });
        });

        test("handle grouped options correctly", () => {
            const options: OptionsGroupProp<string | number | object> = [
                {
                    group: "Black Sails",
                    options: [
                        { label: "Flint", value: "flint" },
                        { label: "Silver", value: "silver" },
                        { label: "Vane", value: "vane" },
                        { label: "Billy", value: "billy" },
                    ],
                },
                {
                    group: "Breaking Bad",
                    options: {
                        heisenberg: "Heisenberg",
                        jesse: "Jesse",
                        saul: "Saul",
                        mike: "Mike",
                    },
                },
                {
                    group: "Game of Thrones",
                    attrs: { disabled: true },
                    options: [
                        "Tyrion Lannister",
                        "Jamie Lannister",
                        "Daenerys Targaryen",
                        "Jon Snow",
                    ],
                },
            ];

            const wrapper = mount(ODropdown, { props: { options } });

            const optionElements = wrapper.findAll(
                '[data-oruga="dropdown-item"]',
            );
            expect(optionElements).toHaveLength(15);

            optionElements.forEach((el, idx) => {
                const isGroup = idx % 5 == 0;
                const g_idx = Math.floor(idx / 5);
                const o_idx = (idx % 5) - 1;

                if (isGroup) {
                    const option = options[g_idx];
                    expect(el.text()).toBe(option.group);
                    expect(el.attributes("aria-disabled")).toBe(
                        option.attrs?.disabled ? "true" : "false",
                    );
                } else {
                    const g_options = options[g_idx].options;

                    let optionLabel;
                    if (idx < 5) {
                        optionLabel = (g_options[o_idx] as OptionsItem).label;
                    } else if (idx < 10) {
                        optionLabel = Object.entries(g_options)[o_idx][1];
                    } else {
                        optionLabel = g_options[o_idx];
                    }

                    expect(el.text()).toBe(optionLabel);
                }
            });
        });
    });
});
