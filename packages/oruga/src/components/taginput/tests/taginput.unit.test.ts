import { describe, test, expect, afterEach } from "vitest";
import { enableAutoUnmount, mount } from "@vue/test-utils";

import type { OptionsProp } from "@/composables";
import type { DropdownItemProps } from "@/components/dropdown/props";
import type { TaginputOptions } from "../props";

import OTaginput from "@/components/taginput/Taginput.vue";

describe("OTaginput tests", () => {
    enableAutoUnmount(afterEach);

    test("render correctly", () => {
        const wrapper = mount(OTaginput);
        expect(!!wrapper.vm).toBeTruthy();
        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.attributes("data-oruga")).toBe("taginput");
        expect(wrapper.html()).toMatchSnapshot();
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
