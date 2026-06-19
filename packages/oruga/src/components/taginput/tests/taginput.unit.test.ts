import { describe, test, expect, afterEach } from "vitest";
import { enableAutoUnmount, mount } from "@vue/test-utils";

import type { OptionsProp } from "@/composables";
import type { DropdownItemProps } from "@/components/dropdown/props";
import type { TaginputOptions } from "../props";

import OTaginput from "@/components/taginput/Taginput.vue";
import { setTimeout } from "timers/promises";

describe("OTaginput tests", () => {
    enableAutoUnmount(afterEach);

    test("render correctly", () => {
        const wrapper = mount(OTaginput);
        expect(!!wrapper.vm).toBeTruthy();
        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.attributes("data-oruga")).toBe("taginput");
        expect(wrapper.html()).toMatchSnapshot();
    });

    test("no display counter when counter property set for false", async () => {
        const wrapper = mount(OTaginput, {
            props: { maxlength: 100, counter: true },
        });

        expect(wrapper.find(".o-taginput__counter").exists()).toBeTruthy();
        await wrapper.setProps({ counter: false });
        expect(wrapper.find(".o-taginput__counter").exists()).toBeFalsy();
    });

    test("should send variant prop to Tag component properly", () => {
        const value = ["Test Value"];
        const wrapper = mount(OTaginput, {
            props: { modelValue: value, variant: "danger" },
        });
        const Tag = wrapper.find(".o-tag");
        expect(Tag.classes("o-tag--danger")).toBeTruthy();
    });

    test("should listen Autocomplete events", async () => {
        let firedHeader = false;
        let firedFooter = false;
        const wrapper = mount(OTaginput, {
            props: {
                iconRight: "close-circle",
                iconRightClickable: true,
                selectableHeader: true,
                selectableFooter: true,
                keepOpen: true,
                options: ["Frank", "Eddy", "Howard"],
                onIconRightClick: async () => {
                    await wrapper.setProps({ modelValue: [] });
                },
                onSelectHeader: () => {
                    firedHeader = true;
                },
                onSelectFooter: () => {
                    firedFooter = true;
                },
            },
            slots: {
                header: "<h1>SLOT HEADER</h1>",
                footer: "<h1>SLOT FOOTER</h1>",
            },
        });
        await setTimeout(); // await eventhandler set

        const input = wrapper.find("input");
        const iconRight = wrapper.find(".o-input__icon-right");

        await input.trigger("focus");
        await input.setValue("Frank");
        await wrapper.vm.$nextTick();

        await input.trigger("keydown", { key: "Down" });
        await input.trigger("keydown", { key: "Down" });
        await input.trigger("keydown", { key: "Enter" });
        await wrapper.vm.$nextTick();

        expect(wrapper.findAll(".o-tag")).toHaveLength(1);

        await iconRight.trigger("click");
        await wrapper.vm.$nextTick();

        const dropdownItemHeader = wrapper.find(".o-autocomplete__item-header");
        const dropdownItemFooter = wrapper.find(".o-autocomplete__item-footer");

        await dropdownItemHeader.trigger("click");
        await dropdownItemFooter.trigger("click");

        expect(wrapper.findAll(".o-tag")).toHaveLength(0);
        expect(firedHeader).toBeTruthy();
        expect(firedFooter).toBeTruthy();
    });

    test("should add new items only when allowNew is true", async () => {
        const wrapper = mount(OTaginput, {
            props: {
                options: ["Frank"],
                allowNew: true,
                debounce: 0,
            },
        });

        const input = wrapper.find("input");
        await input.trigger("focus");
        await input.setValue("New Item");
        await input.trigger("keydown", { key: "Enter" });
        await wrapper.vm.$nextTick();

        expect(wrapper.findAll(".o-tag")).toHaveLength(1);
        expect(wrapper.find(".o-tag").text()).toContain("New Item");

        await wrapper.setProps({ allowNew: false });
        await input.setValue("Another Item");
        await input.trigger("keydown", { key: "Enter" });
        await wrapper.vm.$nextTick();

        expect(wrapper.findAll(".o-tag")).toHaveLength(1);
    });

    test("should forward class, style, and id to the autocomplete input", () => {
        const attrs = {
            class: "fallthrough-class",
            style: "font-size: 2rem;",
            id: "fallthrough-id",
        };
        const wrapper = mount(OTaginput, {
            attrs,
            props: {
                options: [],
            },
        });

        const root = wrapper.find("div[data-oruga='taginput']");
        expect(root.classes(attrs.class)).toBe(false);
        expect(root.attributes("style")).toBeUndefined();
        expect(root.attributes("id")).toBeUndefined();

        const input = wrapper.find("input");
        expect(input.exists()).toBeTruthy();
        expect(input.classes(attrs.class)).toBe(true);
        expect(input.attributes("style")).toBe(attrs.style);
        expect(input.attributes("id")).toBe(attrs.id);
    });

    describe("test events", () => {
        test("check emit focus and blur event correctly", async () => {
            const wrapper = mount(OTaginput);
            await setTimeout(); // await eventhandler set

            const input = wrapper.find("input");
            expect(input.exists()).toBeTruthy();

            await input.trigger("focus");
            await input.trigger("blur");

            expect(wrapper.emitted("focus")).toHaveLength(1);
            expect(wrapper.emitted("blur")).toHaveLength(1);
        });
    });

    describe("render options props correctly", () => {
        test("handle options as primitves correctly", () => {
            const options: OptionsProp = ["Flint", "Silver", "Vane", 0, 1, 2];

            const wrapper = mount(OTaginput, { props: { options } });

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

            const wrapper = mount(OTaginput, { props: { options } });

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
            const options: TaginputOptions<string | number> = [
                { label: "Flint", value: "flint" },
                { label: "Silver", value: "silver", disabled: true },
                { label: "Vane", value: "vane" },
                { label: "Zero", value: 0 },
                { label: "One", value: 1 },
                { label: "Two", value: 2, disabled: true },
            ];

            const wrapper = mount(OTaginput, { props: { options } });

            const optionElements = wrapper.findAll(
                '[data-oruga="dropdown-item"]',
            );
            expect(optionElements).toHaveLength(options.length);

            optionElements.forEach((el, idx) => {
                expect(el.text()).toBe(options[idx].label);
                expect(el.attributes("aria-disabled")).toBe(
                    options[idx].disabled ? "true" : "false",
                );
            });
        });

        test("handle grouped options correctly", () => {
            const options: TaginputOptions<string | number | object> = [
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
                    disabled: true,
                    options: [
                        "Tyrion Lannister",
                        "Jamie Lannister",
                        "Daenerys Targaryen",
                        "Jon Snow",
                    ],
                },
            ];

            const wrapper = mount(OTaginput, { props: { options } });

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
                        option.disabled ? "true" : "false",
                    );
                } else {
                    const g_options = options[g_idx].options;

                    let optionLabel;
                    if (idx < 5) {
                        optionLabel = (
                            g_options[o_idx] as DropdownItemProps<string>
                        ).label;
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
