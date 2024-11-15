import { describe, test, expect, afterEach, vi } from "vitest";
import { enableAutoUnmount, mount } from "@vue/test-utils";
import { nextTick } from "vue";

import type { OptionsGroupProp, OptionsItem, OptionsProp } from "@/composables";

import OSelect from "@/components/select/Select.vue";

describe("OSelect tests", () => {
    enableAutoUnmount(afterEach);

    const options: OptionsItem<string>[] = [
        { label: "Flint", value: "flint" },
        { label: "Silver", value: "silver" },
        { label: "Vane", value: "vane" },
        { label: "Billy", value: "billy" },
        { label: "Jack", value: "silver", attrs: { disabled: true } },
    ];

    test("render correctly", () => {
        const wrapper = mount(OSelect, {
            props: { options },
        });
        expect(!!wrapper.vm).toBeTruthy();
        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.attributes("data-oruga")).toBe("select");
        expect(wrapper.find("select").exists()).toBeTruthy(); // has a select element
        expect(wrapper.html()).toMatchSnapshot();
    });

    test("render accordingly when has left icon", async () => {
        const wrapper = mount(OSelect, {
            props: { icon: "arrow" },
        });

        const iconElement = wrapper.find(
            '[data-oruga="select"] > span[data-oruga="icon"]:first-child',
        );
        expect(iconElement.exists()).toBeTruthy();
        expect(iconElement.classes("o-sel__icon-left")).toBeTruthy();

        const select = wrapper.find("select");
        expect(select.exists()).toBeTruthy();
        expect(select.classes("o-sel-iconspace-left")).toBeTruthy();

        await iconElement.trigger("click");
        expect(wrapper.emitted("icon-click")).toBeUndefined();
    });

    test("react accordingly when left icon is clickable", async () => {
        const wrapper = mount(OSelect, {
            props: { icon: "arrow", iconClickable: true },
        });

        const iconElement = wrapper.find(
            '[data-oruga="select"] > span[data-oruga="icon"]:first-child',
        );
        expect(iconElement.exists()).toBeTruthy();
        expect(iconElement.classes("o-sel__icon-left")).toBeTruthy();

        await iconElement.trigger("click");
        expect(wrapper.emitted("icon-click")).toHaveLength(1);
    });

    test("render accordingly when has right icon", async () => {
        const wrapper = mount(OSelect, {
            props: { iconRight: "arrow" },
        });

        const iconElement = wrapper.find(
            '[data-oruga="select"] > span[data-oruga="icon"]:last-child',
        );
        expect(iconElement.exists()).toBeTruthy();
        expect(iconElement.classes("o-sel__icon-right")).toBeTruthy();

        const select = wrapper.find("select");
        expect(select.exists()).toBeTruthy();
        expect(select.classes("o-sel-iconspace-right")).toBeTruthy();

        await iconElement.trigger("click");
        expect(wrapper.emitted("icon-right-click")).toBeUndefined();
    });

    test("react accordingly when right icon is clickable", async () => {
        const wrapper = mount(OSelect, {
            props: { iconRight: "arrow", iconRightClickable: true },
        });

        const iconElement = wrapper.find(
            '[data-oruga="select"] > span[data-oruga="icon"]:last-child',
        );
        expect(iconElement.exists()).toBeTruthy();
        expect(iconElement.classes("o-sel__icon-right")).toBeTruthy();

        await iconElement.trigger("click");
        expect(wrapper.emitted("icon-right-click")).toHaveLength(1);
    });

    test("render accordingly when has native attributes", () => {
        const wrapper = mount(OSelect, {
            props: {
                autocomplete: "on",
                nativeSize: 3,
                required: true,
            },
        });

        const select = wrapper.find("select");
        expect(select.exists()).toBeTruthy();
        expect(select.attributes("autocomplete")).toBe("on");
        expect(select.attributes("size")).toBe("3");
        expect(select.attributes("required")).not.toBeUndefined();
    });

    test("render accordingly when has size prop", () => {
        const wrapper = mount(OSelect, {
            props: { size: "large" },
        });

        const select = wrapper.find("select");
        expect(select.exists()).toBeTruthy();
        expect(select.classes("o-sel--large")).toBeTruthy();
    });

    test("render accordingly when has variant prop", () => {
        const wrapper = mount(OSelect, {
            props: { variant: "danger" },
        });

        expect(wrapper.classes("o-ctrl-sel--danger")).toBeTruthy();

        const select = wrapper.find("select");
        expect(select.exists()).toBeTruthy();
        expect(select.classes("o-sel--danger")).toBeTruthy();
    });

    test("render accordingly when has placeholder prop", () => {
        const placeholder = "Select something";

        const wrapper = mount(OSelect, {
            props: { placeholder },
        });

        const select = wrapper.find("select");
        expect(select.exists()).toBeTruthy();
        expect(select.classes("o-sel--placeholder")).toBeTruthy();

        const options = select.findAll("option");
        expect(options.length).toBe(1);
        expect(options[0].text()).toBe(placeholder);
    });

    test("render accordingly when is disabled", () => {
        const wrapper = mount(OSelect, {
            props: { disabled: true },
        });

        const select = wrapper.find("select");
        expect(select.exists()).toBeTruthy();
        expect(select.classes("o-sel--disabled")).toBeTruthy();
        expect(select.attributes("disabled")).not.toBeUndefined();
    });

    test("react accordingly when value change ", async () => {
        const wrapper = mount(OSelect, {
            props: { options },
        });

        const select = wrapper.find("select");
        expect(select.exists()).toBeTruthy();

        await select.setValue(options[1].value);
        let emits = wrapper.emitted("update:modelValue");
        expect(emits).toHaveLength(1);
        expect(emits![0]).toContain(options[1].value);
        expect(wrapper.vm.value).toEqual(options[1].value);

        await select.setValue(options[2].value);
        emits = wrapper.emitted("update:modelValue");
        expect(emits).toHaveLength(2);
        expect(emits![1]).toContain(options[2].value);
        expect(wrapper.vm.value).toEqual(options[2].value);
    });

    test("react accordingly when method focus() is called", async () => {
        const wrapper = mount(OSelect);

        const select = wrapper.find("select");
        select.element.focus = vi.fn();

        wrapper.vm.focus();
        await nextTick(() => {
            expect(select.element.focus).toHaveBeenCalled();
        });
    });

    test("render accordingly when with multiple prop", async () => {
        const wrapper = mount(OSelect, {
            props: {
                options: options,
                multiple: true,
                modelValue: [],
            },
        });

        const select = wrapper.find("select");
        expect(select.exists()).toBeTruthy();
        expect(select.classes("o-sel--multiple")).toBeTruthy();

        // check all options are there
        const optionValues = wrapper.findAll("option");
        expect(optionValues.length).toBe(options.length);

        // check nochting got emmited yet
        let emit = wrapper.emitted("update:modelValue");
        expect(emit).toBeUndefined();

        // click one option
        await wrapper.setValue([options[1].value]);

        emit = wrapper.emitted("update:modelValue");
        expect(emit).toHaveLength(1);
        expect(emit![0][0]).toHaveLength(1);

        // click second option
        await wrapper.setValue([options[1].value, options[3].value]);

        emit = wrapper.emitted("update:modelValue");
        expect(emit).toHaveLength(2);
        expect(emit![1][0]).toHaveLength(2);

        // click first option again
        await wrapper.setValue([options[1].value]);

        emit = wrapper.emitted("update:modelValue");
        expect(emit).toHaveLength(3);
        expect(emit![2][0]).toHaveLength(1);
    });

    describe("handle options props correctly", () => {
        test("handle options as primitves correctly", () => {
            const options: OptionsProp = ["Flint", "Silver", "Vane", 0, 1, 2];

            const wrapper = mount(OSelect, { props: { options } });

            const groupedElements = wrapper.findAll("optgroup");
            expect(groupedElements).toHaveLength(0);

            const optionElements = wrapper.findAll("option");
            expect(optionElements).toHaveLength(options.length);

            optionElements.forEach((el, idx) => {
                expect(el.text()).toBe(String(options[idx]));
                expect(el.attributes("value")).toBe(String(options[idx]));
                expect(el.attributes("disabled")).toBe(undefined);
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

            const wrapper = mount(OSelect, { props: { options } });

            const groupedElements = wrapper.findAll("optgroup");
            expect(groupedElements).toHaveLength(0);

            const optionElements = wrapper.findAll("option");
            expect(optionElements).toHaveLength(Object.keys(options).length);

            optionElements.forEach((el, idx) => {
                expect(el.text()).toBe(Object.entries(options)[idx][1]);
                expect(el.attributes("value")).toBe(
                    Object.entries(options)[idx][0],
                );
                expect(el.attributes("disabled")).toBe(undefined);
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

            const wrapper = mount(OSelect, { props: { options } });

            const groupedElements = wrapper.findAll("optgroup");
            expect(groupedElements).toHaveLength(0);

            const optionElements = wrapper.findAll("option");
            expect(optionElements).toHaveLength(options.length);

            optionElements.forEach((el, idx) => {
                expect(el.text()).toBe(options[idx].label);
                expect(el.attributes("value")).toBe(String(options[idx].value));
                expect(el.attributes("disabled")).toBe(
                    options[idx].attrs?.disabled ? "" : undefined,
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

            const wrapper = mount(OSelect, { props: { options } });

            const groupedElements = wrapper.findAll("optgroup");
            expect(groupedElements).toHaveLength(options.length);

            groupedElements.forEach((el, idx) => {
                expect(el.attributes("disabled")).toBe(
                    options[idx].attrs?.disabled ? "" : undefined,
                );
            });

            const optionElements = wrapper.findAll("option");
            expect(optionElements).toHaveLength(12);

            optionElements.forEach((el, idx) => {
                let optionLabel;
                let optionValue;
                if (idx < 4) {
                    optionLabel = (options[0].options[idx % 4] as OptionsItem)
                        .label;
                    optionValue = (options[0].options[idx % 4] as OptionsItem)
                        .value;
                } else if (idx < 8) {
                    optionLabel = Object.entries(options[1].options)[
                        idx % 4
                    ][1];
                    optionValue = Object.entries(options[1].options)[
                        idx % 4
                    ][0];
                } else {
                    optionLabel = options[2].options[idx % 4];
                    optionValue = options[2].options[idx % 4];
                }

                expect(el.text()).toBe(optionLabel);
                expect(el.attributes("value")).toBe(optionValue);
            });
        });
    });
});
