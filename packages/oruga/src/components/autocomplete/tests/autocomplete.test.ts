import { describe, test, expect, afterEach, vi } from "vitest";
import { enableAutoUnmount, mount } from "@vue/test-utils";
import { nextTick } from "vue";
import { setTimeout } from "timers/promises";

import type { OptionsGroupProp, OptionsItem, OptionsProp } from "@/composables";

import OAutocomplete from "@/components/autocomplete/Autocomplete.vue";

describe("OAutocomplete tests", () => {
    enableAutoUnmount(afterEach);

    const OPTIONS = [
        "Angular",
        "Angular 2",
        "Aurelia",
        "Backbone",
        "Ember",
        "jQuery",
        "Meteor",
        "Node.js",
        "Polymer",
        "React",
        "RxJS",
        "Vue.js",
    ];

    test("render correctly", () => {
        const wrapper = mount(OAutocomplete, {
            props: { options: OPTIONS },
        });
        expect(!!wrapper.vm).toBeTruthy();
        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.attributes("data-oruga")).toBe("autocomplete");
        expect(wrapper.html()).toMatchSnapshot();
    });

    test("has configurable menu and item tags", () => {
        const wrapper = mount(OAutocomplete, {
            props: { options: OPTIONS, menuTag: "ul", itemTag: "li" },
        });
        expect(wrapper.find("ul.o-dropdown__menu").exists()).toBeTruthy();
        expect(wrapper.find("li.o-dropdown__item").exists()).toBeTruthy();
    });

    test("has a dropdown menu hidden by default", () => {
        const wrapper = mount(OAutocomplete, { attachTo: document.body });
        const dropdown = wrapper.find(".o-dropdown__menu");
        expect(dropdown.exists()).toBeTruthy();
        expect(dropdown.isVisible()).toBeFalsy();
    });

    test("can emit input, focus and blur events", async () => {
        const VALUE_TYPED = "test";

        const wrapper = mount(OAutocomplete, {
            props: { options: OPTIONS },
        });

        const input = wrapper.find("input");
        expect(input.exists()).toBeTruthy();

        // open menu
        await input.trigger("focus");
        expect(wrapper.emitted("focus")).toHaveLength(1);

        await input.setValue(VALUE_TYPED);
        await input.trigger("input");

        expect(wrapper.emitted("update:input")).toHaveLength(1);
        expect(wrapper.emitted("update:input")![0]).toContain(VALUE_TYPED);

        await input.trigger("blur");
        expect(wrapper.emitted("blur")).toBeDefined();
    });

    test("can autocomplete with keydown", async () => {
        const VALUE_TYPED = "Ang";

        const wrapper = mount(OAutocomplete, {
            props: { options: OPTIONS, openOnFocus: true, keepOpen: false },
            attachTo: document.body,
        });

        const input = wrapper.find("input");
        expect(input.exists()).toBeTruthy();

        // open menu
        await input.trigger("focus");
        await input.setValue(VALUE_TYPED);

        const dropdown = wrapper.find(".o-dropdown__menu");
        expect(dropdown.exists()).toBeTruthy();
        expect(dropdown.isVisible()).toBeTruthy();

        await input.trigger("keydown", { key: "Down" });
        await input.trigger("keydown", { key: "Enter" });

        expect(input.element.value).toBe(OPTIONS[0]);
        expect(wrapper.emitted("select")).toStrictEqual([[OPTIONS[0]]]);
        expect(wrapper.emitted("update:modelValue")).toStrictEqual([
            [OPTIONS[0]],
        ]);

        expect(dropdown.exists()).toBeTruthy();
        expect(dropdown.isVisible()).toBeFalsy();
    });

    test("set values correct when two-way-binded", async () => {
        const wrapper = mount(OAutocomplete, {
            props: {
                options: OPTIONS,
                modelValue: OPTIONS[2],
                "onUpdate:modelValue": (modelValue) => {
                    wrapper.setProps({ modelValue });
                },
            },
        });
        await nextTick();

        const input = wrapper.find("input");
        expect(input.exists()).toBeTruthy();

        const dropdown = wrapper.find(".o-dropdown__menu");
        expect(dropdown.exists()).toBeTruthy();
        expect(dropdown.isVisible()).toBeFalsy();

        const optionElements = wrapper.findAll('[data-oruga="dropdown-item"]');
        expect(optionElements).toHaveLength(OPTIONS.length);

        // check default selected value
        expect(input.element.value).toBe(OPTIONS[2]);
        expect(optionElements[2].classes("itemSelectedClass"));
        expect(optionElements[2].attributes("aria-selected")).toBeTruthy();

        // chenge selection
        wrapper.setProps({ modelValue: OPTIONS[0] });
        await nextTick();

        // check new selected value
        expect(input.element.value).toBe(OPTIONS[0]);
        expect(optionElements[0].classes("itemSelectedClass"));
        expect(optionElements[0].attributes("aria-selected")).toBeTruthy();
    });

    test("close dropdown on esc", async () => {
        const wrapper = mount(OAutocomplete, {
            props: { options: OPTIONS, openOnFocus: true },
            attachTo: document.body,
        });

        const input = wrapper.find("input");
        expect(input.exists()).toBeTruthy();

        // open menu
        await input.trigger("focus");

        const dropdown = wrapper.find(".o-dropdown__menu");
        expect(dropdown.exists()).toBeTruthy();
        expect(dropdown.isVisible()).toBeTruthy();

        await input.trigger("keydown", { key: "Escape" });

        expect(dropdown.isVisible()).toBeFalsy();
    });

    test("close dropdown on click outside", async () => {
        const wrapper = mount(OAutocomplete, {
            props: { options: OPTIONS, openOnFocus: true },
            attachTo: document.body,
        });

        const input = wrapper.find("input");
        expect(input.exists()).toBeTruthy();

        // open menu
        await input.trigger("focus");
        await setTimeout(); // await event handler get set

        const dropdown = wrapper.find(".o-dropdown__menu");
        expect(dropdown.exists()).toBeTruthy();
        expect(dropdown.isVisible()).toBeTruthy();

        // click outside
        window.dispatchEvent(new Event("click"));
        await nextTick(); // await dom update

        expect(dropdown.isVisible()).toBeFalsy();
    });

    test("open dropdown on down key click", async () => {
        const wrapper = mount(OAutocomplete, {
            props: { options: OPTIONS },
            attachTo: document.body,
        });

        const dropdown = wrapper.find(".o-dropdown__menu");
        expect(dropdown.exists()).toBeTruthy();
        expect(dropdown.isVisible()).toBeFalsy();

        const input = wrapper.find("input");
        expect(input.exists()).toBeTruthy();

        await input.trigger("focus");
        await input.trigger("keydown", { key: "Down" });

        expect(dropdown.isVisible()).toBeTruthy();
    });

    test("manages tab pressed as expected", async () => {
        const wrapper = mount(OAutocomplete, {
            props: { options: OPTIONS, openOnFocus: true, keepFirst: true },
            attachTo: document.body,
        });

        const dropdown = wrapper.find(".o-dropdown__menu");
        expect(dropdown.exists()).toBeTruthy();
        expect(dropdown.isVisible()).toBeFalsy();

        const input = wrapper.find("input");
        expect(input.exists()).toBeTruthy();

        await input.trigger("keydown", { key: "Tab" });
        expect(dropdown.isVisible()).toBeFalsy();

        await input.trigger("focus");

        await input.trigger("keydown", { key: "Tab" });
        expect(input.element.value).toBe("");
    });

    test("can openOnFocus and keepFirst", async () => {
        const wrapper = mount(OAutocomplete, {
            props: { options: OPTIONS, openOnFocus: true, keepFirst: true },
            attachTo: document.body,
        });

        const dropdown = wrapper.find(".o-dropdown__menu");
        expect(dropdown.exists()).toBeTruthy();
        expect(dropdown.isVisible()).toBeFalsy();

        const input = wrapper.find("input");
        expect(input.exists()).toBeTruthy();

        await input.trigger("focus");

        expect(dropdown.isVisible()).toBeTruthy();
    });

    test("keepFirst works as input changes", async () => {
        const wrapper = mount(OAutocomplete, {
            props: { options: OPTIONS, openOnFocus: true, keepFirst: true },
            attachTo: document.body,
        });

        const dropdown = wrapper.find(".o-dropdown__menu");
        expect(dropdown.exists()).toBeTruthy();
        expect(dropdown.isVisible()).toBeFalsy();

        const input = wrapper.find("input");
        expect(input.exists()).toBeTruthy();

        await input.trigger("focus");

        expect(dropdown.isVisible()).toBeTruthy();

        const focusedItem = wrapper.findAll(".o-dropdown__item--focused")[0];
        expect(focusedItem.html()).toContain(OPTIONS[0]);

        await input.setValue("v");

        const updatedFocusedItem = wrapper.findAll(
            ".o-dropdown__item--focused",
        )[0];
        expect(updatedFocusedItem.html()).toContain("Vue.js");
    });

    test("do not open when openOnFocus and empty options", async () => {
        const wrapper = mount(OAutocomplete, {
            props: { options: [], openOnFocus: true },
            attachTo: document.body,
        });

        const dropdown = wrapper.find(".o-dropdown__menu");
        expect(dropdown.exists()).toBeTruthy();
        expect(dropdown.isVisible()).toBeFalsy();

        const input = wrapper.find("input");
        expect(input.exists()).toBeTruthy();

        await input.trigger("focus");

        expect(dropdown.isVisible()).toBeFalsy();
    });

    test("reset events before destroy", async () => {
        document.removeEventListener = vi.fn();
        window.removeEventListener = vi.fn();

        const wrapper = mount(OAutocomplete, {
            props: { options: OPTIONS },
        });
        await nextTick(); // await event handler get set

        wrapper.unmount();

        expect(document.removeEventListener).toBeCalledTimes(2);
        // remove scroll listener
        expect(document.removeEventListener).toBeCalledWith(
            "scroll",
            expect.any(Function),
        );

        expect(window.removeEventListener).toBeCalledTimes(2);
        // remove position listener
        expect(window.removeEventListener).toBeCalledWith(
            "resize",
            expect.any(Function),
        );
    });

    describe("filtering", () => {
        test("do not sort when `backend-filtering` is given", async () => {
            const wrapper = mount(OAutocomplete, {
                props: { options: OPTIONS, backendFiltering: true },
            });
            await nextTick();

            const input = wrapper.find("input");
            expect(input.exists()).toBeTruthy();

            let optionElements = wrapper.findAll(
                '[data-oruga="dropdown-item"]',
            );
            expect(optionElements).toHaveLength(OPTIONS.length);
            optionElements.forEach((option) =>
                expect(option.attributes("disabled")).toBeUndefined(),
            );

            await input.setValue(OPTIONS[2]);

            // check that there are no out filtered elements
            optionElements = wrapper.findAll('[data-oruga="dropdown-item"]');
            expect(optionElements).toHaveLength(OPTIONS.length);
            optionElements.forEach((option) =>
                expect(option.attributes("disabled")).toBeUndefined(),
            );
        });
    });

    describe("clear button", () => {
        test("clear button does not exist when the search input is empty", async () => {
            const wrapper = mount(OAutocomplete, {
                props: {
                    options: OPTIONS,
                    modelValue: "",
                    clearable: true,
                },
            });

            const subject = wrapper.find(".o-icon");
            expect(subject.exists()).toBeFalsy();
        });

        test("clears search input text when clear button gets clicked", async () => {
            const wrapper = mount(OAutocomplete, {
                props: {
                    options: OPTIONS,
                    modelValue: OPTIONS[5],
                    clearable: true,
                },
            });

            const input = wrapper.find("input");
            expect(input.exists()).toBeTruthy();
            expect(input.element.value).toBe(OPTIONS[5]);

            const icon = wrapper.find(".o-icon");
            expect(icon.exists()).toBeTruthy();
            await icon.trigger("click");

            expect(input.element.value).toEqual("");
        });

        test("clear button does not appear when clearable property is not set to true", () => {
            const wrapper = mount(OAutocomplete, {
                props: { options: OPTIONS, modelValue: OPTIONS[5] },
            });
            const subject = wrapper.find(".o-icon").exists();

            expect(subject).toBeFalsy();
        });
    });

    describe("header & footer", () => {
        test("can emit select-header by keyboard and click", async () => {
            const wrapper = mount(OAutocomplete, {
                props: {
                    openOnFocus: true,
                    keepOpen: true,
                    selectableHeader: true,
                    selectableFooter: true,
                },
                slots: {
                    header: "<h1>SLOT HEADER</h1>",
                    footer: "<h1>SLOT FOOTER</h1>",
                },
            });

            const input = wrapper.find("input");
            expect(input.exists()).toBeTruthy();

            // open menu
            await input.trigger("focus");

            // move to header and select by enter
            await input.trigger("keydown", { key: "Down" });
            await input.trigger("keydown", { key: "Enter" });

            expect(wrapper.emitted("select-header")).toHaveLength(1);

            const header = wrapper.find(".o-autocomplete__item-header");
            expect(header.exists()).toBeTruthy();
            await header.trigger("click");

            expect(wrapper.emitted("select-header")).toHaveLength(2);
        });

        test("can emit select-footer by keyboard and click", async () => {
            const wrapper = mount(OAutocomplete, {
                props: {
                    openOnFocus: true,
                    keepOpen: true,
                    selectableHeader: true,
                    selectableFooter: true,
                },
                slots: {
                    header: "<h1>SLOT HEADER</h1>",
                    footer: "<h1>SLOT FOOTER</h1>",
                },
            });
            const input = wrapper.find("input");

            // open menu
            await input.trigger("focus");

            // move to footer and select by enter
            await input.trigger("keydown", { key: "Down" });
            await input.trigger("keydown", { key: "Down" });
            await input.trigger("keydown", { key: "Enter" });

            expect(wrapper.emitted("select-footer")).toHaveLength(1);

            const footer = wrapper.find(".o-autocomplete__item-footer");
            expect(footer.exists()).toBeTruthy();
            await footer.trigger("click");

            expect(wrapper.emitted("select-footer")).toHaveLength(2);
        });
    });

    describe("render options props correctly", () => {
        test("handle options as primitves correctly", () => {
            const options: OptionsProp = ["Flint", "Silver", "Vane", 0, 1, 2];

            const wrapper = mount(OAutocomplete, { props: { options } });

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

            const wrapper = mount(OAutocomplete, { props: { options } });

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

            const wrapper = mount(OAutocomplete, { props: { options } });

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

            const wrapper = mount(OAutocomplete, { props: { options } });

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
                    expect(el.text()).toBe(option.label);
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
