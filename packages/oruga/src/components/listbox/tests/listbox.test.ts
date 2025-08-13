import { afterEach, describe, expect, test } from "vitest";
import { enableAutoUnmount, mount } from "@vue/test-utils";
import { nextTick } from "vue";

import OListbox from "@/components/listbox/Listbox.vue";
import OListItem from "@/components/listbox/ListItem.vue";

import type { OptionsGroupProp, OptionsItem, OptionsProp } from "@/composables";

describe.only("OListbox tests", () => {
    enableAutoUnmount(afterEach);

    const options: OptionsProp = [
        { label: "New York", value: "NY" },
        { label: "Rome", value: "RM" },
        { label: "London", value: "LDN" },
        { label: "Istanbul", value: "IST" },
        { label: "Paris", value: "PRS" },
    ];

    test("render correctly with options", () => {
        const wrapper = mount(OListbox, {
            props: { options },
        });
        expect(!!wrapper.vm).toBeTruthy();
        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.attributes("data-oruga")).toBe("listbox");
        expect(wrapper.html()).toMatchSnapshot();
        expect(wrapper.classes("o-listbox")).toBeTruthy();

        const items = wrapper.findAll('[data-oruga="listbox-item"]');
        expect(items).toHaveLength(options.length);

        items.forEach((item, idx) => {
            expect(item.attributes("data-oruga")).toBe("listbox-item");
            expect(item.classes("o-listbox__item")).toBeTruthy();
            expect(item.text()).toBe(options[idx].label);
        });
    });

    test("render correctly with items", async () => {
        const component = {
            components: { OListbox, OListItem },
            props: ["options"],
            template: `<o-listbox>
                    <template #trigger="{ active }">
                        <button :class="{ active }">Component Trigger Label</button>
                    </template>
    
                    <o-list-item
                        v-for="el in options"
                        :key=" el"
                        :value="el.value">
                        {{ el.label }}
                    </o-list-item>
                </o-listbox>`,
        };

        const wrapper = mount(component, {
            props: { options: options },
        });
        await nextTick(); // wait for next tick to ensure all components are rendered

        expect(!!wrapper.vm).toBeTruthy();
        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.attributes("data-oruga")).toBe("listbox");
        expect(wrapper.html()).toMatchSnapshot();
        expect(wrapper.classes("o-listbox")).toBeTruthy();

        const items = wrapper.findAll('[data-oruga="listbox-item"]');
        expect(items.length).toBe(options.length);

        items.forEach((item, idx) => {
            expect(item.attributes("data-oruga")).toBe("listbox-item");
            expect(item.classes("o-listbox__item")).toBeTruthy();
            expect(item.text()).toBe(options[idx].label);
        });
    });

    test("set value correct when two-way-binded", async () => {
        const wrapper = mount(OListbox, {
            props: {
                options,
                modelValue: options[2].value,
                "onUpdate:modelValue": (modelValue) => {
                    wrapper.setProps({ modelValue });
                },
            },
        });

        const optionElements = wrapper.findAll('[data-oruga="listbox-item"]');
        expect(optionElements).toHaveLength(options.length);

        // check default selected value
        expect(optionElements[2].attributes("aria-selected")).toBeTruthy();

        // chenge selection
        await wrapper.setProps({ modelValue: options[0].value });

        // check new selected value
        expect(optionElements[0].attributes("aria-selected")).toBeTruthy();
    });

    test("has configurable list tag", () => {
        const wrapper = mount(OListbox, { props: { listTag: "ul" } });
        expect(wrapper.find("ul.o-listbox__list").exists()).toBeTruthy();
    });

    describe("handle options props correctly", () => {
        test("react accordingly when is using objects values", async () => {
            const wrapper = mount(OListbox, {
                props: { options, selectable: true },
            });

            const items = wrapper.findAll('[data-oruga="listbox-item"]');
            expect(items.length).toBe(options.length);

            items.forEach((item, index) =>
                expect(item.text()).toEqual(options[index].label),
            );

            await items[1].trigger("click");
            expect(items[0].classes("o-listbox__item--selected")).toBeFalsy();
            expect(items[1].classes("o-listbox__item--selected")).toBeTruthy();
            expect(items[2].classes("o-listbox__item--selected")).toBeFalsy();

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

            const wrapper = mount(OListbox, { props: { options } });

            const items = wrapper.findAll('[data-oruga="listbox-item"]');
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

            const wrapper = mount(OListbox, { props: { options } });

            const items = wrapper.findAll('[data-oruga="listbox-item"]');
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

            const wrapper = mount(OListbox, { props: { options } });

            const items = wrapper.findAll('[data-oruga="listbox-item"]');
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

            const wrapper = mount(OListbox, { props: { options } });

            const items = wrapper.findAll('[data-oruga="listbox-item"]');
            expect(items).toHaveLength(15);

            items.forEach((el, idx) => {
                const isGroup = idx % 5 == 0;
                const g_idx = Math.floor(idx / 5);
                const o_idx = (idx % 5) - 1;

                const option = options[g_idx];

                if (isGroup) {
                    expect(el.text()).toBe(option.label);
                    expect(el.attributes("aria-disabled")).toBe("true");
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

    describe.only("test selectable", () => {
        test.only("react accordingly when new item is selected", async () => {
            const wrapper = mount(OListbox, {
                props: {
                    options,
                    selectable: true,
                    modelValue: options[0].value,
                },
            });

            expect(wrapper.classes("o-listbox--selectable")).toBeTruthy();

            const items = wrapper.findAll(".o-listbox__item");
            expect(items.length).toBe(options.length);

            expect(items[0].classes("o-listbox__item--selected")).toBeTruthy();
            expect(items[1].classes("o-listbox__item--selected")).toBeFalsy();
            expect(items[2].classes("o-listbox__item--selected")).toBeFalsy();

            await items[2].trigger("click");

            expect(items[0].classes("o-listbox__item--selected")).toBeFalsy();
            expect(items[1].classes("o-listbox__item--selected")).toBeFalsy();
            expect(items[2].classes("o-listbox__item--selected")).toBeTruthy();

            expect(wrapper.emitted("update:modelValue")).toHaveLength(1);
            expect(wrapper.emitted("update:modelValue")![0][0]).toBe(
                options[2].value,
            );
            expect(wrapper.emitted("select")).toHaveLength(1);
            expect(wrapper.emitted("select")![0][0]).toBe(options[2].value);
        });

        test("react accordingly when same item is deselected", async () => {
            const wrapper = mount(OListbox, {
                props: {
                    options,
                    modelValue: options[0].value,
                    selectable: true,
                },
            });

            const items = wrapper.findAll(".o-listbox__item");
            expect(items.length).toBe(options.length);
            expect(items[0].classes("o-listbox__item--selected")).toBeTruthy();
            expect(items[1].classes("o-listbox__item--selected")).toBeFalsy();
            expect(items[2].classes("o-listbox__item--selected")).toBeFalsy();

            await items[0].trigger("click");

            expect(items[0].classes("o-listbox__item--selected")).toBeFalsy();
            expect(items[1].classes("o-listbox__item--selected")).toBeFalsy();
            expect(items[2].classes("o-listbox__item--selected")).toBeFalsy();

            expect(wrapper.emitted("update:modelValue")).toHaveLength(1);
            expect(wrapper.emitted("update:modelValue")![0][0]).toBe(undefined);
            expect(wrapper.emitted("select")).toBeUndefined();
        });

        test("react accordingly when an item is selected with multiple prop", async () => {
            const wrapper = mount(OListbox, {
                props: {
                    options,
                    selectable: true,
                    multiple: true,
                },
            });

            expect(wrapper.classes("o-listbox--multiple")).toBeTruthy();

            const items = wrapper.findAll(".o-listbox__item");
            expect(items.length).toBe(options.length);
            expect(items[0].classes("o-listbox__item--selected")).toBeFalsy();
            expect(items[1].classes("o-listbox__item--selected")).toBeFalsy();
            expect(items[2].classes("o-listbox__item--selected")).toBeFalsy();

            await items[0].trigger("click");

            expect(items[0].classes("o-listbox__item--selected")).toBeTruthy();
            expect(items[1].classes("o-listbox__item--selected")).toBeFalsy();
            expect(items[2].classes("o-listbox__item--selected")).toBeFalsy();

            expect(wrapper.emitted("select")).toHaveLength(1);
            expect(wrapper.emitted("select")![0]).toContain(options[0].value);
            expect(wrapper.emitted("update:modelValue")).toHaveLength(1);
            expect(wrapper.emitted("update:modelValue")![0][0]).toHaveLength(1);
            expect(wrapper.emitted("update:modelValue")![0][0]).toContain(
                options[0].value,
            );

            await items[2].trigger("click");

            expect(items[0].classes("o-listbox__item--selected")).toBeTruthy();
            expect(items[1].classes("o-listbox__item--selected")).toBeFalsy();
            expect(items[2].classes("o-listbox__item--selected")).toBeTruthy();

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

            await items[0].trigger("click");

            expect(items[0].classes("o-listbox__item--selected")).toBeFalsy();
            expect(items[1].classes("o-listbox__item--selected")).toBeFalsy();
            expect(items[2].classes("o-listbox__item--selected")).toBeTruthy();

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

        test("react accordingly when is disabled", async () => {
            const wrapper = mount(OListbox, {
                props: { options: options, disabled: true },
            });

            expect(wrapper.classes("o-listbox--disabled")).toBeTruthy();

            const items = wrapper.findAll(".o-listbox__item");
            expect(items.length).toBe(options.length);
            expect(items[0].classes("o-listbox__item--selected")).toBeFalsy();
            expect(items[1].classes("o-listbox__item--selected")).toBeFalsy();
            expect(items[2].classes("o-listbox__item--selected")).toBeFalsy();

            await items[0].trigger("click");

            expect(items[0].classes("o-listbox__item--selected")).toBeFalsy();
            expect(items[1].classes("o-listbox__item--selected")).toBeFalsy();
            expect(items[2].classes("o-listbox__item--selected")).toBeFalsy();

            expect(wrapper.classes("o-listbox--disabled")).toBeTruthy();
            expect(wrapper.emitted("update:modelValue")).toBeUndefined();
            expect(wrapper.emitted("select")).toBeUndefined();
        });

        test("react accordingly when selected with keydown", async () => {
            const wrapper = mount(OListbox, {
                props: {
                    options,
                    selectable: true,
                },
                attachTo: document.body,
            });

            const list = wrapper.find<HTMLElement>(".o-listbox__list");
            expect(list.exists()).toBeTruthy();

            list.element.focus();
            await nextTick(); // wait for focus to be applied

            await wrapper.trigger("keydown", { key: "Down" });
            await wrapper.trigger("keydown", { key: "Enter" });

            expect(wrapper.emitted("select")).toStrictEqual([
                [options[0].value],
            ]);
            expect(wrapper.emitted("update:modelValue")).toStrictEqual([
                [options[0].value],
            ]);
        });
    });

    describe("test filterable", () => {
        test("should have correct custom icon", async () => {
            const wrapper = mount(OListbox, {
                props: {
                    options,
                    filterable: true,
                    filterIcon: "pi pi-discord",
                },
            });

            const input = wrapper.find('[data-oruga="input"]');
            expect(input.exists()).toBeTruthy();
            const icon = input.find('[data-oruga="icon"] i');

            expect(icon.classes()).toContain("pi-discord");
        });

        test("should correctly filter", async () => {
            const wrapper = mount(OListbox, {
                props: { options, filterable: true },
            });

            const filterInput = wrapper.find('[data-oruga="input"] input');
            expect(filterInput.exists()).toBeTruthy();

            await filterInput.setValue("is");

            const items = wrapper.findAll(".o-listbox__item");

            expect(items.length).toBe(2);
            expect(items[0].text()).toBe("Istanbul");
        });

        test("should correctly filter groups", async () => {
            const wrapper = mount(OListbox, {
                props: {
                    filterable: true,
                    options: [
                        {
                            label: "Germany",
                            value: "DE",
                            options: [
                                { label: "Berlin", value: "Berlin" },
                                { label: "Frankfurt", value: "Frankfurt" },
                                { label: "Hamburg", value: "Hamburg" },
                                { label: "Munich", value: "Munich" },
                            ],
                        },
                        {
                            label: "USA",
                            value: "US",
                            options: [
                                { label: "Chicago", value: "Chicago" },
                                { label: "Los Angeles", value: "Los Angeles" },
                                { label: "New York", value: "New York" },
                                {
                                    label: "San Francisco",
                                    value: "San Francisco",
                                },
                            ],
                        },
                    ],
                },
            });

            const filterInput = wrapper.find('[data-oruga="input"] input');
            expect(filterInput.exists()).toBeTruthy();

            await filterInput.setValue("ch");

            const items = wrapper.findAll(".o-listbox__item");
            const optionGroups = wrapper.findAll(".p-listbox-option-group");
            const options = wrapper.findAll(".p-listbox-option");

            expect(optionGroups.length).toBe(2);
            expect(optionGroups[0].text()).toBe("Germany");
            expect(optionGroups[1].text()).toBe("USA");

            expect(options.length).toBe(2);
            expect(options[0].text()).toBe("Munich");
            expect(options[1].text()).toBe("Chicago");
        });

        test("do not sort when `backend-filtering` is given", async () => {
            const wrapper = mount(OListbox, {
                props: { options, backendFiltering: true },
            });

            const items = wrapper.findAll('[data-oruga="listbox-item"]');
            expect(items).toHaveLength(options.length);
            items.forEach((item) =>
                expect(item.attributes("disabled")).toBeFalsy(),
            );

            const filterInput = wrapper.find('[data-oruga="input"] input');
            expect(filterInput.exists()).toBeTruthy();

            await filterInput.setValue(options[2].value);

            // check that there are no out filtered elements
            expect(items).toHaveLength(options.length);
            items.forEach((item) =>
                expect(item.attributes("disabled")).toBeFalsy(),
            );
        });
    });

    describe("header & footer", () => {
        test("can emit select-header by keyboard and click", async () => {
            const wrapper = mount(OListbox, {
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
            const wrapper = mount(OListbox, {
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
