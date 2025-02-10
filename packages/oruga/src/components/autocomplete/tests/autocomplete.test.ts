import { describe, test, expect, afterEach, vi } from "vitest";
import { enableAutoUnmount, mount } from "@vue/test-utils";
import { nextTick } from "vue";

import type { OptionsGroupProp, OptionsItem, OptionsProp } from "@/composables";

import OAutocomplete from "@/components/autocomplete/Autocomplete.vue";

describe("OAutocomplete tests", () => {
    enableAutoUnmount(afterEach);

    test("render correctly", () => {
        const wrapper = mount(OAutocomplete);
        expect(!!wrapper.vm).toBeTruthy();
        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.attributes("data-oruga")).toBe("autocomplete");
        expect(wrapper.html()).toMatchSnapshot();
    });

    describe("OAutocomplete", () => {
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

        test("has a dropdown menu hidden by default", () => {
            const wrapper = mount(OAutocomplete, { attachTo: document.body });
            const dropdown = wrapper.find(".o-drop__menu");
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
                props: { options: OPTIONS },
                attachTo: document.body,
            });

            const input = wrapper.find("input");
            expect(input.exists()).toBeTruthy();

            await input.trigger("focus");
            await input.setValue(VALUE_TYPED);

            let dropdown = wrapper.find(".o-drop__menu");
            expect(dropdown.exists()).toBeTruthy();
            expect(dropdown.isVisible()).toBeTruthy();

            await input.trigger("keydown", { key: "Down" });
            await input.trigger("keydown", { key: "Enter" });

            expect(input.element.value).toBe(OPTIONS[0]);

            dropdown = wrapper.find(".o-drop__menu");
            expect(dropdown.isVisible()).toBeFalsy();
        });

        test("close dropdown on esc", async () => {
            const wrapper = mount(OAutocomplete, {
                props: { options: OPTIONS },
                attachTo: document.body,
            });

            const input = wrapper.find("input");
            expect(input.exists()).toBeTruthy();

            const dropdown = wrapper.find(".o-acp__menu");
            expect(dropdown.exists()).toBeTruthy();
            expect(dropdown.isVisible()).toBeTruthy();

            await input.trigger("focus");

            await input.trigger("keydown", { key: "Escape" });

            expect(dropdown.isVisible()).toBeFalsy();
        });

        test("close dropdown on click outside", async () => {
            const wrapper = mount(OAutocomplete, {
                props: { options: OPTIONS },
            });

            const input = wrapper.find("input");
            expect(input.exists()).toBeTruthy();

            await input.trigger("focus");

            const dropdown = wrapper.find(".o-acp__menu");
            expect(dropdown.exists()).toBeTruthy();
            expect(dropdown.isVisible()).toBeTruthy();

            window.document.body.click();
            await nextTick();

            expect(dropdown.isVisible()).toBeFalsy();
        });

        test("open dropdown on down key click", async () => {
            const wrapper = mount(OAutocomplete, {
                props: { options: OPTIONS },
            });

            const dropdown = wrapper.find(".o-acp__menu");
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
            });

            const dropdown = wrapper.find(".o-acp__menu");
            expect(dropdown.exists()).toBeTruthy();
            expect(dropdown.isVisible()).toBeFalsy();

            const input = wrapper.find("input");
            expect(input.exists()).toBeTruthy();

            await input.trigger("keydown", { key: "Tab" });
            expect(dropdown.isVisible()).toBeFalsy();

            await input.trigger("focus");

            await input.trigger("keydown", { key: "Tab" });
            expect(input.element.value).toBe(OPTIONS[0]);
        });

        test("can openOnFocus and keepFirst", async () => {
            const wrapper = mount(OAutocomplete, {
                props: { options: OPTIONS, openOnFocus: true, keepFirst: true },
            });

            const dropdown = wrapper.find(".o-acp__menu");
            expect(dropdown.exists()).toBeTruthy();
            expect(dropdown.isVisible()).toBeFalsy();

            const input = wrapper.find("input");
            expect(input.exists()).toBeTruthy();

            await input.trigger("focus");

            expect(dropdown.isVisible()).toBeTruthy();
        });

        test("reset events before destroy", () => {
            const wrapper = mount(OAutocomplete, {
                props: { options: OPTIONS },
            });

            document.removeEventListener = vi.fn();
            window.removeEventListener = vi.fn();

            wrapper.unmount();

            expect(document.removeEventListener).toBeCalledWith(
                "click",
                expect.any(Function),
            );
            expect(window.removeEventListener).toBeCalledWith(
                "resize",
                expect.any(Function),
            );
        });

        test("clear button does not exist when the search input is empty", async () => {
            const wrapper = mount(OAutocomplete, {
                props: {
                    options: OPTIONS,
                    modelValue: "",
                    clearable: true,
                },
            });

            const subject = wrapper.find("o-icon-stub");
            expect(subject.exists()).toBeFalsy();
        });

        test("clears search input text when clear button gets clicked", async () => {
            const wrapper = mount(OAutocomplete, {
                props: {
                    options: OPTIONS,
                    modelValue: "Jquery",
                    clearable: true,
                },
            });

            const subject = wrapper.find("o-icon-stub");
            expect(subject.exists()).toBeTruthy();
            await wrapper.find("o-icon-stub").trigger("click");

            const input = wrapper.find("input");
            expect(input.exists()).toBeTruthy();
            expect(input.element.value).toEqual("");
        });

        test("clear button does not appear when clearable property is not set to true", () => {
            const wrapper = mount(OAutocomplete, {
                props: { options: OPTIONS, modelValue: "Jquery" },
            });
            const subject = wrapper.find("o-icon-stub").exists();

            expect(subject).toBeFalsy();
        });

        test("can emit select-header by keyboard and click", async () => {
            const VALUE_TYPED = "test";
            const wrapper = mount(OAutocomplete, {
                props: {
                    checkScroll: true,
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

            await input.trigger("focus");
            await input.setValue(VALUE_TYPED);

            await input.trigger("keydown", { key: "Down" });
            await input.trigger("keydown", { key: "Enter" });

            const header = wrapper.find(".o-acp__item-header");
            expect(header.exists()).toBeTruthy();
            await header.trigger("click");

            const emitted = wrapper.emitted("select-header");
            expect(emitted).toHaveLength(2);
        });

        test("can emit select-footer by keyboard and click", async () => {
            const VALUE_TYPED = "test";
            const wrapper = mount(OAutocomplete, {
                props: {
                    checkScroll: true,
                    selectableHeader: true,
                    selectableFooter: true,
                },
                slots: {
                    header: "<h1>SLOT HEADER</h1>",
                    footer: "<h1>SLOT FOOTER</h1>",
                },
            });
            const input = wrapper.find("input");

            await input.trigger("focus");
            await input.setValue(VALUE_TYPED);

            await input.trigger("keydown", { key: "Down" });
            await input.trigger("keydown", { key: "Down" });
            await input.trigger("keydown", { key: "Enter" });
            await input.trigger("blur");

            const footer = wrapper.find(".o-acp__item-footer");
            expect(footer.exists()).toBeTruthy();
            await footer.trigger("click");

            const emitted = wrapper.emitted("select-footer");
            expect(emitted).toHaveLength(2);
        });

        test("has configurable menu and item tags", () => {
            const wrapper = mount(OAutocomplete, {
                props: { options: OPTIONS, menuTag: "ul", itemTag: "li" },
            });
            expect(wrapper.find("ul.o-acp__menu").exists()).toBeTruthy();
            expect(wrapper.find("li.o-acp__item").exists()).toBeTruthy();
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
