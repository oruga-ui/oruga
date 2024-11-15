import { describe, test, expect, vi, afterEach } from "vitest";
import { enableAutoUnmount, mount } from "@vue/test-utils";
import { nextTick, type ComponentPublicInstance } from "vue";
import { setTimeout } from "timers/promises";

import type { OptionsGroupProp, OptionsItem, OptionsProp } from "@/composables";

import ODropdown from "@/components/dropdown/Dropdown.vue";
import ODropdownItem from "@/components/dropdown/DropdownItem.vue";

describe("Dropdown tests", () => {
    const options: OptionsProp = [
        { label: "Item 1", value: 1 },
        { label: "Item 2", value: 2 },
        { label: "Item 3", value: 3 },
    ];
    const simpleOptions: OptionsProp = ["A", "B", "C"];

    enableAutoUnmount(afterEach);

    test("render correctly with options", async () => {
        const wrapper = mount(ODropdown, {
            props: { options, label: "Some Trigger Label" },
        });
        await nextTick(); // await dropdown item rendered

        expect(!!wrapper.vm).toBeTruthy();
        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.attributes("data-oruga")).toBe("dropdown");
        expect(wrapper.html()).toMatchSnapshot();
        expect(wrapper.classes("o-drop")).toBeTruthy();

        const items = wrapper.findAllComponents(ODropdownItem);
        expect(items.length).toBe(options.length);
        options.forEach((option, idx) => {
            expect(items.at(idx)!.attributes("data-oruga")).toBe(
                "dropdown-item",
            );
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
            props: { options: simpleOptions },
        });
        await nextTick(); // await dropdown item rendered

        expect(!!wrapper.vm).toBeTruthy();
        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.attributes("data-oruga")).toBe("dropdown");
        expect(wrapper.html()).toMatchSnapshot();
        expect(wrapper.classes("o-drop")).toBeTruthy();

        const items = wrapper.findAllComponents(ODropdownItem);
        expect(items.length).toBe(options.length);
        simpleOptions.forEach((option, idx) => {
            expect(items.at(idx)!.attributes("data-oruga")).toBe(
                "dropdown-item",
            );
            expect(items.at(idx)!.text()).toBe(option);
        });
    });

    test("has configurable menu tag", () => {
        const wrapper = mount(ODropdown, { props: { menuTag: "ul" } });
        expect(wrapper.find("ul.o-drop__menu").exists()).toBeTruthy();
    });

    test("has configurable trigger tag", () => {
        const wrapper = mount(ODropdown, { props: { triggerTag: "a" } });
        expect(wrapper.find("a.o-drop__trigger").exists()).toBeTruthy();
    });

    test("reset events before destroy", async () => {
        const wrapper = mount(ODropdown, { props: { active: true } });
        await setTimeout(); // await event handler get set

        document.removeEventListener = vi.fn();
        window.removeEventListener = vi.fn();

        wrapper.unmount();

        // remove scroll listener
        expect(document.removeEventListener).toBeCalledWith(
            "scroll",
            expect.any(Function),
        );
        // remove keyup listener
        expect(document.removeEventListener).toBeCalledWith(
            "keyup",
            expect.any(Function),
            expect.any(Object),
        );
        // remove click outside listener
        expect(window.removeEventListener).toBeCalledWith(
            "click",
            expect.any(Function),
            expect.any(Object),
        );
    });

    describe("test trigger", () => {
        test("render trigger slot correctly", () => {
            const triggerHTML = '<button class="trigger">trigger</button>';
            const wrapper = mount(ODropdown, {
                props: { options: simpleOptions },
                slots: {
                    trigger: triggerHTML,
                },
            });
            const trigger = wrapper.find(".trigger");
            expect(trigger.html()).toBe(triggerHTML);
            expect(trigger.text()).toBe("trigger");
        });

        test("render trigger label correctly", () => {
            const triggerLabel = "MyTriggerLabel";
            const wrapper = mount(ODropdown, {
                props: { options: simpleOptions, label: triggerLabel },
            });
            const trigger = wrapper.find(".o-drop__trigger");
            expect(trigger.exists()).toBeTruthy();
            expect(trigger.text()).contain(triggerLabel);
        });
    });

    describe("test interactions", () => {
        test("react accordingly when clicking item", async () => {
            const wrapper = mount(ODropdown, {
                props: { options: simpleOptions, active: true },
                attachTo: document.body,
            });
            await nextTick(); // await event handler get set

            const menu = wrapper.find(".o-drop__menu");

            expect(wrapper.classes("o-drop--active")).toBeTruthy();
            expect(menu.isVisible()).toBeTruthy();

            const items = wrapper.findAll(".o-drop__item");
            expect(items.length).toBe(simpleOptions.length);

            await items[1].trigger("click");

            const dropdown = wrapper.findComponent<ComponentPublicInstance>(
                '[data-oruga="dropdown"]',
            );
            expect(dropdown.emitted("update:model-value")).toHaveLength(1);
            expect(dropdown.emitted("change")).toHaveLength(1);
            expect(dropdown.emitted("change")![0][0]).toBe(simpleOptions[1]);
            expect(dropdown.emitted("close")).toHaveLength(1);

            expect(wrapper.classes("o-drop--active")).toBeFalsy();
            expect(menu.isVisible()).toBeFalsy();
        });

        test("react accordingly when clicking item with multiple", async () => {
            const wrapper = mount(ODropdown, {
                props: { options: simpleOptions, active: true, multiple: true },
                attachTo: document.body,
            });
            await nextTick(); // await event handler get set

            const menu = wrapper.find(".o-drop__menu");

            expect(wrapper.classes("o-drop--active")).toBeTruthy();
            expect(menu.isVisible()).toBeTruthy();

            const items = wrapper.findAll(".o-drop__item");
            expect(items.length).toBe(simpleOptions.length);

            await items[1].trigger("click");

            expect(wrapper.classes("o-drop--active")).toBeTruthy();
            expect(menu.isVisible()).toBeTruthy();

            await items[0].trigger("click");

            const dropdown = wrapper.findComponent<ComponentPublicInstance>(
                '[data-oruga="dropdown"]',
            );
            expect(dropdown.emitted("update:model-value")).toHaveLength(2);
            expect(dropdown.emitted("change")).toHaveLength(2);
            expect(dropdown.emitted("change")![0][0]).toStrictEqual([
                simpleOptions[1],
            ]);
            expect(dropdown.emitted("change")![1][0]).toStrictEqual([
                simpleOptions[1],
                simpleOptions[0],
            ]);
            expect(dropdown.emitted("close")).toBeUndefined();
        });

        test("react accordingly when clicking outside", async () => {
            const wrapper = mount(ODropdown, {
                props: { active: true },
                attachTo: document.body,
            });
            await setTimeout(); // await event handler get set

            const menu = wrapper.find(".o-drop__menu");

            expect(wrapper.classes("o-drop--active")).toBeTruthy();
            expect(menu.isVisible()).toBeTruthy();

            // click outside
            window.dispatchEvent(new Event("click"));
            await nextTick(); // await dom update

            // check dropdown closed
            const activeEmits = wrapper.emitted("update:active");
            expect(activeEmits).toHaveLength(1);
            expect(activeEmits![0][0]).toBeFalsy();
            expect(wrapper.emitted("close")).toHaveLength(1);
            expect(wrapper.classes("o-drop--active")).toBeFalsy();
            expect(menu.isVisible()).toBeFalsy();
        });

        test("react accordingly when clicking outside with inline", async () => {
            const wrapper = mount(ODropdown, {
                props: { active: true, inline: true },
            });
            await setTimeout(); // await event handler get set

            const menu = wrapper.find(".o-drop__menu");

            expect(wrapper.classes("o-drop--active")).toBeTruthy();
            expect(menu.isVisible()).toBeTruthy();

            // click outside
            window.dispatchEvent(new Event("click"));
            await nextTick(); // await dom update

            // check dropdown closed
            expect(wrapper.emitted("update:active")).toBeUndefined();
            expect(wrapper.emitted("close")).toBeUndefined();
            expect(wrapper.classes("o-drop--active")).toBeTruthy();
            expect(menu.isVisible()).toBeTruthy();
        });

        test("react accordingly when clicking outside with closable", async () => {
            const wrapper = mount(ODropdown, {
                props: { active: true, closeable: false },
            });
            await setTimeout(); // await event handler get set

            const menu = wrapper.find(".o-drop__menu");

            expect(wrapper.classes("o-drop--active")).toBeTruthy();
            expect(menu.isVisible()).toBeTruthy();

            // click outside
            window.dispatchEvent(new Event("click"));
            await nextTick(); // await dom update

            // check dropdown closed
            expect(wrapper.emitted("update:active")).toBeUndefined();
            expect(wrapper.emitted("close")).toBeUndefined();
            expect(wrapper.classes("o-drop--active")).toBeTruthy();
            expect(menu.isVisible()).toBeTruthy();
        });

        test("react accordingly when clicking trigger", async () => {
            const wrapper = mount(ODropdown, {
                props: { options: simpleOptions },
                attachTo: document.body,
            });
            await setTimeout(); // await event handler get set

            const menu = wrapper.find(".o-drop__menu");
            const trigger = wrapper.find(".o-drop__trigger");

            expect(wrapper.classes("o-drop--active")).toBeFalsy();
            expect(menu.isVisible()).toBeFalsy();

            // open on trigger click
            await trigger.trigger("click");
            expect(wrapper.classes("o-drop--active")).toBeTruthy();
            expect(menu.isVisible()).toBeTruthy();

            // close on trigger click
            await trigger.trigger("click");
            expect(wrapper.classes("o-drop--active")).toBeFalsy();
            expect(menu.isVisible()).toBeFalsy();
        });

        test("react accordingly when clicking trigger with disabled", async () => {
            const wrapper = mount(ODropdown, {
                props: { options: simpleOptions, disabled: true },
                attachTo: document.body,
            });
            const menu = wrapper.find(".o-drop__menu");
            const trigger = wrapper.find(".o-drop__trigger");

            expect(wrapper.classes("o-drop--active")).toBeFalsy();
            expect(menu.isVisible()).toBeFalsy();

            await trigger.trigger("click");

            expect(wrapper.classes("o-drop--active")).toBeFalsy();
            expect(menu.isVisible()).toBeFalsy();
        });

        test("react accordingly when pressing escape", async () => {
            const wrapper = mount(ODropdown, {
                props: { active: true },
                attachTo: document.body,
            });
            await setTimeout(); // await event handler get set

            const menu = wrapper.find(".o-drop__menu");
            expect(wrapper.classes("o-drop--active")).toBeTruthy();
            expect(menu.isVisible()).toBeTruthy();

            document.dispatchEvent(
                new KeyboardEvent("keyup", { key: "Escape" }),
            );
            await nextTick(); // await dom update

            expect(wrapper.classes("o-drop--active")).toBeFalsy();
            expect(menu.isVisible()).toBeFalsy();
        });

        test("react accordingly when pressing escape with closable", async () => {
            const wrapper = mount(ODropdown, {
                props: { active: true, closeable: false },
            });
            await setTimeout(); // await event handler get set

            const menu = wrapper.find(".o-drop__menu");

            expect(wrapper.classes("o-drop--active")).toBeTruthy();
            expect(menu.isVisible()).toBeTruthy();

            document.dispatchEvent(
                new KeyboardEvent("keyup", { key: "Escape" }),
            );
            await nextTick(); // await dom update

            expect(wrapper.classes("o-drop--active")).toBeTruthy();
            expect(menu.isVisible()).toBeTruthy();
        });

        test("react accordingly when mouse over without trigger", async () => {
            const wrapper = mount(ODropdown, {
                props: { triggers: ["click"] },
                attachTo: document.body,
            });

            const trigger = wrapper.find(".o-drop__trigger");
            await trigger.trigger("mouseenter");
            expect(wrapper.find(".o-drop__menu").isVisible()).toBeFalsy();
        });

        test("react accordingly when mouse over with trigger", async () => {
            const wrapper = mount(ODropdown, {
                props: { triggers: ["hover"] },
                attachTo: document.body,
            });
            const trigger = wrapper.find(".o-drop__trigger");
            await trigger.trigger("mouseenter");
            expect(wrapper.find(".o-drop__menu").isVisible()).toBeTruthy();
        });
    });

    describe("test teleport", () => {
        test("react accordingly when using teleport to body", () => {
            const wrapper = mount(ODropdown, { props: { teleport: true } });

            expect(wrapper.find(".o-drop__menu").exists()).toBeFalsy();

            const menu = document.getElementsByClassName("o-drop__menu");
            expect(menu.length).toBe(1);
            const teleportWrapper =
                document.getElementsByClassName("o-drop--teleport");
            expect(teleportWrapper.length).toBe(1);
        });

        test("react accordingly when using teleport with element", () => {
            const wrapperDiv = document.createElement("div");
            const wrapperClass = "test-teleport-wrapper";
            wrapperDiv.className = wrapperClass;
            document.body.appendChild(wrapperDiv);

            const wrapper = mount(ODropdown, {
                props: { teleport: wrapperDiv },
            });

            expect(wrapper.find(".o-drop__menu").exists()).toBeFalsy();

            const menu = document.getElementsByClassName("o-drop__menu");
            expect(menu.length).toBe(1);
            const teleportWrapper =
                document.getElementsByClassName("o-drop--teleport");
            expect(teleportWrapper.length).toBe(1);
        });
    });

    describe("test selection", () => {
        test("react accordingly when new item is selected", async () => {
            const wrapper = mount(ODropdown, {
                props: { options, modelValue: options[0].value },
            });
            await nextTick(); // await dropdown item rendered

            const items = wrapper.findAll(".o-drop__item");
            expect(items.length).toBe(options.length);
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
            expect(dropdown.emitted("update:model-value")).toHaveLength(1);
            expect(dropdown.emitted("change")).toHaveLength(1);
            expect(dropdown.emitted("change")![0][0]).toBe(options[2].value);
            expect(dropdown.emitted("close")).toHaveLength(1);
        });

        test("react accordingly when same item is selected", async () => {
            const wrapper = mount(ODropdown, {
                props: { options, modelValue: options[0].value },
            });
            await nextTick(); // await dropdown item rendered

            const items = wrapper.findAll(".o-drop__item");
            expect(items.length).toBe(options.length);
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
            expect(dropdown.emitted("update:model-value")).toBeUndefined();
            expect(dropdown.emitted("change")).toBeUndefined();
            expect(dropdown.emitted("close")).toHaveLength(1);
        });

        test("react accordingly when an item is selected with multiple prop", async () => {
            const wrapper = mount(ODropdown, {
                props: { options, multiple: true },
            });
            await nextTick(); // await dropdown item rendered

            const items = wrapper.findAll(".o-drop__item");
            expect(items.length).toBe(options.length);
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
            expect(dropdown.emitted("update:model-value")).toHaveLength(1);
            expect(dropdown.emitted("change")).toHaveLength(1);
            expect(dropdown.emitted("change")![0][0]).toHaveLength(1);
            expect(dropdown.emitted("change")![0][0]).toContain(
                options[0].value,
            );
            expect(dropdown.emitted("close")).toBeUndefined();

            await items[2].trigger("click");

            expect(items[0].classes("o-drop__item--active")).toBeTruthy();
            expect(items[1].classes("o-drop__item--active")).toBeFalsy();
            expect(items[2].classes("o-drop__item--active")).toBeTruthy();

            expect(dropdown.emitted("update:model-value")).toHaveLength(2);
            expect(dropdown.emitted("change")).toHaveLength(2);
            expect(dropdown.emitted("change")![1][0]).toHaveLength(2);
            expect(dropdown.emitted("change")![1][0]).toContain(
                options[0].value,
            );
            expect(dropdown.emitted("change")![1][0]).toContain(
                options[2].value,
            );
            expect(dropdown.emitted("close")).toBeUndefined();

            await items[0].trigger("click");
            expect(items[0].classes("o-drop__item--active")).toBeFalsy();
            expect(items[1].classes("o-drop__item--active")).toBeFalsy();
            expect(items[2].classes("o-drop__item--active")).toBeTruthy();

            expect(dropdown.emitted("update:model-value")).toHaveLength(3);
            expect(dropdown.emitted("change")).toHaveLength(3);
            expect(dropdown.emitted("change")![2][0]).toHaveLength(1);
            expect(dropdown.emitted("change")![2][0]).toContain(
                options[2].value,
            );
            expect(dropdown.emitted("close")).toBeUndefined();
        });

        test("react accordingly when item is selected without closeable", async () => {
            const wrapper = mount(ODropdown, {
                props: { options, closeable: false },
            });
            await nextTick(); // await dropdown item rendered

            const items = wrapper.findAll(".o-drop__item");
            expect(items.length).toBe(options.length);
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
            expect(dropdown.emitted("update:model-value")).toHaveLength(1);
            expect(dropdown.emitted("change")).toHaveLength(1);
            expect(dropdown.emitted("close")).toBeUndefined();
        });

        test("react accordingly when is disabled", async () => {
            const wrapper = mount(ODropdown, {
                props: { options: simpleOptions, disabled: true, active: true },
                attachTo: document.body,
            });
            await nextTick(); // await dropdown item rendered

            expect(wrapper.classes("o-drop--disabled")).toBeTruthy();
            expect(wrapper.find(".o-drop__menu").isVisible()).toBeFalsy();

            const items = wrapper.findAll(".o-drop__item");
            expect(items.length).toBe(simpleOptions.length);
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
            expect(dropdown.emitted("update:model-value")).toBeUndefined();
            expect(dropdown.emitted("change")).toBeUndefined();
            expect(dropdown.emitted("close")).toBeUndefined();
        });
    });

    describe("handle options props correctly", () => {
        test("react accordingly when is using objects values", async () => {
            const wrapper = mount(ODropdown, {
                props: { options },
            });
            await nextTick(); // await dropdown item rendered

            const items = wrapper.findAll(".o-drop__item");
            expect(items.length).toBe(3);

            items.forEach((item, index) =>
                expect(item.text()).toEqual(options[index].label),
            );

            const item = items[1];
            await item.trigger("click");
            expect(items[0].classes("o-drop__item--active")).toBeFalsy();
            expect(items[1].classes("o-drop__item--active")).toBeTruthy();
            expect(items[2].classes("o-drop__item--active")).toBeFalsy();

            const dropdown = wrapper.findComponent<ComponentPublicInstance>(
                '[data-oruga="dropdown"]',
            );
            expect(dropdown.emitted("update:model-value")).toHaveLength(1);
            expect(dropdown.emitted("update:model-value")![0][0]).toStrictEqual(
                options[1].value,
            );
            expect(dropdown.emitted("change")).toHaveLength(1);
            expect(dropdown.emitted("change")![0][0]).toStrictEqual(
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
