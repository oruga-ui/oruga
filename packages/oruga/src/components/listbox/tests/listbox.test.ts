import { afterEach, describe, expect, test } from "vitest";
import { enableAutoUnmount, mount } from "@vue/test-utils";

import OListbox from "@/components/listbox/Listbox.vue";
import type { OptionsProp } from "@/composables";

describe("OListbox tests", () => {
    enableAutoUnmount(afterEach);

    const options: OptionsProp = [
        { label: "New York", value: "NY" },
        { label: "Rome", value: "RM" },
        { label: "London", value: "LDN" },
        { label: "Istanbul", value: "IST" },
        { label: "Paris", value: "PRS" },
    ];

    test("render correctly", () => {
        const wrapper = mount(OListbox, {
            props: { options },
        });
        expect(!!wrapper.vm).toBeTruthy();
        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.attributes("data-oruga")).toBe("listbox");
        expect(wrapper.html()).toMatchSnapshot();
    });

    test("should exist", () => {
        const wrapper = mount(OListbox, {
            props: { options },
        });
        expect(wrapper.find(".p-listbox.p-component").exists()).toBe(true);
        expect(wrapper.findAll("li.p-listbox-option").length).toBe(5);
        expect(
            wrapper.findAll("li.p-listbox-option")[0].attributes()[
                "aria-label"
            ],
        ).toBe("New York");
    });

    test("should select a list item", async () => {
        const wrapper = mount(OListbox, {
            props: { options },
        });
        await wrapper.vm.onOptionSelect({}, wrapper.vm.options[0]);

        expect(wrapper.emitted()["update:modelValue"][0]).toEqual([
            wrapper.vm.options[0],
        ]);

        await wrapper.setProps({ modelValue: wrapper.vm.options[0] });

        expect(wrapper.findAll("li.p-listbox-option")[0].classes()).toContain(
            "p-listbox-option-selected",
        );
    });

    describe("filter", () => {
        test("should have correct custom icon", async () => {
            const wrapper = mount(OListbox, {
                props: { options },
            });
            await wrapper.setProps({
                filter: true,
                filterIcon: "pi pi-discord",
            });

            const icon = wrapper.find(
                '.p-inputicon [data-pc-section="filtericon"]',
            );

            expect(icon.classes()).toContain("pi-discord");
        });

        test("should correctly filter", async () => {
            const wrapper = mount(OListbox, {
                props: { options },
            });
            await wrapper.setProps({
                filter: true,
            });

            const filterInput = wrapper.find("input.p-listbox-filter");

            expect(filterInput.exists()).toBe(true);

            await filterInput.setValue("is");

            const options = wrapper.findAll(".p-listbox-option");

            expect(options.length).toBe(2);
            expect(options[0].text()).toBe("Istanbul");
        });

        test("should correctly filter groups", async () => {
            const wrapper = mount(OListbox, {
                props: { options },
            });
            await wrapper.setProps({
                filter: true,
                optionGroupLabel: "label",
                optionLabel: "label",
                optionGroupChildren: "items",
                options: [
                    {
                        label: "Germany",
                        code: "DE",
                        items: [
                            { label: "Berlin", value: "Berlin" },
                            { label: "Frankfurt", value: "Frankfurt" },
                            { label: "Hamburg", value: "Hamburg" },
                            { label: "Munich", value: "Munich" },
                        ],
                    },
                    {
                        label: "USA",
                        code: "US",
                        items: [
                            { label: "Chicago", value: "Chicago" },
                            { label: "Los Angeles", value: "Los Angeles" },
                            { label: "New York", value: "New York" },
                            { label: "San Francisco", value: "San Francisco" },
                        ],
                    },
                ],
            });

            const filterInput = wrapper.find("input.p-listbox-filter");

            expect(filterInput.exists()).toBe(true);

            await filterInput.setValue("ch");

            const optionGroups = wrapper.findAll(".p-listbox-option-group");
            const options = wrapper.findAll(".p-listbox-option");

            expect(optionGroups.length).toBe(2);
            expect(optionGroups[0].text()).toBe("Germany");
            expect(optionGroups[1].text()).toBe("USA");

            expect(options.length).toBe(2);
            expect(options[0].text()).toBe("Munich");
            expect(options[1].text()).toBe("Chicago");
        });
    });
});
