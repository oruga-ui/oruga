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

    test("render correctly with options", async () => {
        const wrapper = mount(ODropdown, {
            props: { options, label: "Some Trigger Label" },
        });
        await nextTick(); // await dropdown items rendered

        expect(!!wrapper.vm).toBeTruthy();
        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.attributes("data-oruga")).toBe("dropdown");
        expect(wrapper.html()).toMatchSnapshot();
        expect(wrapper.classes("o-dropdown")).toBeTruthy();

        const items = wrapper.findAllComponents(ODropdownItem);
        expect(items.length).toBe(options.length);
        options.forEach((option, idx) => {
            expect(items.at(idx)!.attributes("data-oruga")).toBe(
                "dropdown-item",
            );
            expect(items.at(idx)!.classes("o-dropdown__item")).toBeTruthy();
            expect(items.at(idx)!.text()).toBe(option.label);
        });
    });

    test("render correctly with items", async () => {
        const component = {
            components: { ODropdown, ODropdownItem },
            props: ["options"],
            template: `<o-dropdown>
                    <template #trigger="{ active }">
                        <button :class="{ active }">Component Trigger Label</button>
                    </template>
    
                    <o-dropdown-item
                        v-for="el in options"
                        :key=" el"
                        :value="el">
                        {{ el }}
                    </o-dropdown-item>
                </o-dropdown>`,
        };

        const wrapper = mount(component, {
            props: { options: simpleOptions, selectable: true },
        });
        await nextTick(); // await dropdown items rendered

        expect(!!wrapper.vm).toBeTruthy();
        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.attributes("data-oruga")).toBe("dropdown");
        expect(wrapper.html()).toMatchSnapshot();
        expect(wrapper.classes("o-dropdown")).toBeTruthy();

        const items = wrapper.findAllComponents(ODropdownItem);
        expect(items.length).toBe(options.length);
        simpleOptions.forEach((option, idx) => {
            expect(items.at(idx)!.attributes("data-oruga")).toBe(
                "dropdown-item",
            );
            expect(items.at(idx)!.classes("o-dropdown__item")).toBeTruthy();
            expect(items.at(idx)!.text()).toBe(option);
        });
    });

    test("has configurable menu tag", () => {
        const wrapper = mount(ODropdown, { props: { menuTag: "ul" } });
        expect(wrapper.find("ul.o-dropdown__menu").exists()).toBeTruthy();
    });

    describe("test selectable", () => {
        test("react accordingly when new item is selected", async () => {
            const wrapper = mount(ODropdown, {
                props: {
                    active: true,
                    options,
                    modelValue: options[0].value,
                    selectable: true,
                },
            });
            await nextTick(); // await dropdown item rendered

            const items = wrapper.findAll(".o-dropdown__item");
            expect(items.length).toBe(options.length);
            expect(items[0].classes("o-dropdown__item--active")).toBeTruthy();
            expect(items[1].classes("o-dropdown__item--active")).toBeFalsy();
            expect(items[2].classes("o-dropdown__item--active")).toBeFalsy();

            await items[2].trigger("click");

            expect(items[0].classes("o-dropdown__item--active")).toBeFalsy();
            expect(items[1].classes("o-dropdown__item--active")).toBeFalsy();
            expect(items[2].classes("o-dropdown__item--active")).toBeTruthy();

            const dropdown = wrapper.findComponent<ComponentPublicInstance>(
                '[data-oruga="dropdown"]',
            );
            expect(dropdown.emitted("update:modelValue")).toHaveLength(1);
            expect(dropdown.emitted("select")).toHaveLength(1);
            expect(dropdown.emitted("select")![0][0]).toBe(options[2].value);
            expect(dropdown.emitted("close")).toHaveLength(1);
        });

        test("react accordingly when same item is selected", async () => {
            const wrapper = mount(ODropdown, {
                props: {
                    active: true,
                    options,
                    modelValue: options[0].value,
                    selectable: true,
                },
            });
            await nextTick(); // await dropdown item rendered

            const items = wrapper.findAll(".o-dropdown__item");
            expect(items.length).toBe(options.length);
            expect(items[0].classes("o-dropdown__item--active")).toBeTruthy();
            expect(items[1].classes("o-dropdown__item--active")).toBeFalsy();
            expect(items[2].classes("o-dropdown__item--active")).toBeFalsy();

            await items[0].trigger("click");

            expect(items[0].classes("o-dropdown__item--active")).toBeTruthy();
            expect(items[1].classes("o-dropdown__item--active")).toBeFalsy();
            expect(items[2].classes("o-dropdown__item--active")).toBeFalsy();

            const dropdown = wrapper.findComponent<ComponentPublicInstance>(
                '[data-oruga="dropdown"]',
            );
            expect(dropdown.emitted("update:modelValue")).toBeUndefined();
            expect(dropdown.emitted("select")).toHaveLength(1);
            expect(dropdown.emitted("select")![0][0]).toBe(options[0].value);
            expect(dropdown.emitted("close")).toHaveLength(1);
        });

        test("react accordingly when an item is selected with multiple prop", async () => {
            const wrapper = mount(ODropdown, {
                props: {
                    active: true,
                    options,
                    selectable: true,
                    multiple: true,
                    keepOpen: true,
                },
                attachTo: document.body,
            });
            await nextTick(); // await dropdown item rendered

            expect(wrapper.classes("o-dropdown--active")).toBeTruthy();

            const menu = wrapper.find(".o-dropdown__menu");
            expect(menu.exists()).toBeTruthy();
            expect(menu.isVisible()).toBeTruthy();

            const items = wrapper.findAll(".o-dropdown__item");
            expect(items.length).toBe(options.length);
            expect(items[0].classes("o-dropdown__item--active")).toBeFalsy();
            expect(items[1].classes("o-dropdown__item--active")).toBeFalsy();
            expect(items[2].classes("o-dropdown__item--active")).toBeFalsy();

            await items[0].trigger("click");

            expect(items[0].classes("o-dropdown__item--active")).toBeTruthy();
            expect(items[1].classes("o-dropdown__item--active")).toBeFalsy();
            expect(items[2].classes("o-dropdown__item--active")).toBeFalsy();
            expect(menu.isVisible()).toBeTruthy();

            const dropdown = wrapper.findComponent<ComponentPublicInstance>(
                '[data-oruga="dropdown"]',
            );
            expect(dropdown.emitted("select")).toHaveLength(1);
            expect(dropdown.emitted("select")![0]).toContain(options[0].value);
            expect(dropdown.emitted("update:modelValue")).toHaveLength(1);
            expect(dropdown.emitted("update:modelValue")![0][0]).toHaveLength(
                1,
            );
            expect(dropdown.emitted("update:modelValue")![0][0]).toContain(
                options[0].value,
            );
            expect(dropdown.emitted("close")).toBeUndefined();

            await items[2].trigger("click");

            expect(items[0].classes("o-dropdown__item--active")).toBeTruthy();
            expect(items[1].classes("o-dropdown__item--active")).toBeFalsy();
            expect(items[2].classes("o-dropdown__item--active")).toBeTruthy();
            expect(menu.isVisible()).toBeTruthy();

            expect(dropdown.emitted("select")).toHaveLength(2);
            expect(dropdown.emitted("select")![1]).toContain(options[2].value);
            expect(dropdown.emitted("update:modelValue")).toHaveLength(2);
            expect(dropdown.emitted("update:modelValue")![1][0]).toHaveLength(
                2,
            );
            expect(dropdown.emitted("update:modelValue")![1][0]).toContain(
                options[0].value,
            );
            expect(dropdown.emitted("update:modelValue")![1][0]).toContain(
                options[2].value,
            );
            expect(dropdown.emitted("close")).toBeUndefined();

            await items[0].trigger("click");
            expect(items[0].classes("o-dropdown__item--active")).toBeFalsy();
            expect(items[1].classes("o-dropdown__item--active")).toBeFalsy();
            expect(items[2].classes("o-dropdown__item--active")).toBeTruthy();

            expect(dropdown.emitted("select")).toHaveLength(3);
            expect(dropdown.emitted("select")![2]).toContain(options[0].value);
            expect(dropdown.emitted("update:modelValue")).toHaveLength(3);
            expect(dropdown.emitted("update:modelValue")![2][0]).toHaveLength(
                1,
            );
            expect(dropdown.emitted("update:modelValue")![2][0]).toContain(
                options[2].value,
            );
            expect(dropdown.emitted("close")).toBeUndefined();
        });

        test("react accordingly when item is selected with keepOpen", async () => {
            const wrapper = mount(ODropdown, {
                props: {
                    active: true,
                    options,
                    keepOpen: true,
                    selectable: true,
                },
            });
            await nextTick(); // await dropdown item rendered

            const items = wrapper.findAll(".o-dropdown__item");
            expect(items.length).toBe(options.length);
            expect(items[0].classes("o-dropdown__item--active")).toBeFalsy();
            expect(items[1].classes("o-dropdown__item--active")).toBeFalsy();
            expect(items[2].classes("o-dropdown__item--active")).toBeFalsy();

            await items[0].trigger("click");

            expect(items[0].classes("o-dropdown__item--active")).toBeTruthy();
            expect(items[1].classes("o-dropdown__item--active")).toBeFalsy();
            expect(items[2].classes("o-dropdown__item--active")).toBeFalsy();

            const dropdown = wrapper.findComponent<ComponentPublicInstance>(
                '[data-oruga="dropdown"]',
            );
            expect(dropdown.emitted("update:modelValue")).toHaveLength(1);
            expect(dropdown.emitted("select")).toHaveLength(1);
            expect(dropdown.emitted("close")).toBeUndefined();
        });

        test("react accordingly when is disabled", async () => {
            const wrapper = mount(ODropdown, {
                props: { options: simpleOptions, disabled: true, active: true },
                attachTo: document.body,
            });
            await nextTick(); // await dropdown item rendered

            expect(wrapper.classes("o-dropdown--disabled")).toBeTruthy();
            expect(wrapper.find(".o-dropdown__menu").isVisible()).toBeFalsy();

            const items = wrapper.findAll(".o-dropdown__item");
            expect(items.length).toBe(simpleOptions.length);
            expect(items[0].classes("o-dropdown__item--active")).toBeFalsy();
            expect(items[1].classes("o-dropdown__item--active")).toBeFalsy();
            expect(items[2].classes("o-dropdown__item--active")).toBeFalsy();

            await items[0].trigger("click");

            expect(items[0].classes("o-dropdown__item--active")).toBeFalsy();
            expect(items[1].classes("o-dropdown__item--active")).toBeFalsy();
            expect(items[2].classes("o-dropdown__item--active")).toBeFalsy();

            const dropdown = wrapper.findComponent<ComponentPublicInstance>(
                '[data-oruga="dropdown"]',
            );
            expect(dropdown.classes("o-dropdown--disabled")).toBeTruthy();
            expect(dropdown.emitted("update:modelValue")).toBeUndefined();
            expect(dropdown.emitted("select")).toBeUndefined();
            expect(dropdown.emitted("close")).toBeUndefined();
        });

        test("react accordingly when selected with keydown", async () => {
            const wrapper = mount(ODropdown, {
                props: {
                    options,
                    selectable: true,
                },
                attachTo: document.body,
            });

            const trigger = wrapper.find(".o-dropdown__trigger");
            expect(trigger.exists()).toBeTruthy();

            // open menu with trigger click
            await trigger.trigger("click");

            let dropdown = wrapper.find(".o-dropdown__menu");

            expect(dropdown.exists()).toBeTruthy();
            expect(dropdown.isVisible()).toBeTruthy();

            await trigger.trigger("keydown", { key: "Down" });
            await trigger.trigger("keydown", { key: "Enter" });

            expect(wrapper.emitted("select")).toStrictEqual([
                [options[0].value],
            ]);
            expect(wrapper.emitted("update:modelValue")).toStrictEqual([
                [options[0].value],
            ]);

            dropdown = wrapper.find(".o-dropdown__menu");

            expect(dropdown.exists()).toBeTruthy();
            expect(dropdown.isVisible()).toBeFalsy();
        });
    });

    describe("handle options props correctly", () => {
        test("react accordingly when is using objects values", async () => {
            const wrapper = mount(ODropdown, {
                props: { active: true, options, selectable: true },
                attachTo: document.body,
            });
            await nextTick(); // await dropdown item rendered

            const items = wrapper.findAll(".o-dropdown__item");
            expect(items.length).toBe(3);

            items.forEach((item, index) =>
                expect(item.text()).toEqual(options[index].label),
            );

            const item = items[1];
            await item.trigger("click");
            expect(items[0].classes("o-dropdown__item--active")).toBeFalsy();
            expect(items[1].classes("o-dropdown__item--active")).toBeTruthy();
            expect(items[2].classes("o-dropdown__item--active")).toBeFalsy();

            const dropdown = wrapper.findComponent<ComponentPublicInstance>(
                '[data-oruga="dropdown"]',
            );
            expect(dropdown.emitted("update:modelValue")).toHaveLength(1);
            expect(dropdown.emitted("update:modelValue")![0][0]).toStrictEqual(
                options[1].value,
            );
            expect(dropdown.emitted("select")).toHaveLength(1);
            expect(dropdown.emitted("select")![0][0]).toStrictEqual(
                options[1].value,
            );
            expect(dropdown.emitted("close")).toHaveLength(1);
        });

        test("handle options as primitves correctly", async () => {
            const options: OptionsProp = ["Flint", "Silver", "Vane", 0, 1, 2];

            const wrapper = mount(ODropdown, { props: { options } });
            await nextTick(); // await dropdown item rendered

            const optionElements = wrapper.findAll(
                '[data-oruga="dropdown-item"]',
            );
            expect(optionElements).toHaveLength(options.length);

            optionElements.forEach((el, idx) => {
                expect(el.text()).toBe(String(options[idx]));
                expect(el.attributes("aria-disabled")).toBe("false");
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

            const wrapper = mount(ODropdown, { props: { options } });
            await nextTick(); // await dropdown item rendered

            const optionElements = wrapper.findAll(
                '[data-oruga="dropdown-item"]',
            );
            expect(optionElements).toHaveLength(Object.keys(options).length);

            optionElements.forEach((el, idx) => {
                expect(el.text()).toBe(Object.entries(options)[idx][1]);
                expect(el.attributes("aria-disabled")).toBe("false");
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

            const wrapper = mount(ODropdown, { props: { options } });
            await nextTick(); // await dropdown item rendered

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

            const wrapper = mount(ODropdown, { props: { options } });
            await nextTick(); // await dropdown item rendered

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
});
