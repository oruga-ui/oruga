import { afterEach, describe, expect, test } from "vitest";
import { enableAutoUnmount, mount } from "@vue/test-utils";

import DropdownExample from "./DropdownExample.vue";
import ODropdownItem from "@/components/dropdown/DropdownItem.vue";
import ODropdown from "@/components/dropdown/Dropdown.vue";

describe("Dropdown integration tests", () => {
    const values = ["A", "B", "C"];

    enableAutoUnmount(afterEach);

    test("is called", () => {
        const wrapper = mount(DropdownExample, { props: { values } });
        expect(wrapper.attributes("data-oruga")).toBe("dropdown");
        expect(!!wrapper.vm).toBeTruthy();
        expect(wrapper.html()).toMatchSnapshot();

        const items = wrapper.findAllComponents(ODropdownItem);
        expect(items.length).toBe(values.length);
        values.forEach((value, idx) => {
            expect(items.at(idx).attributes("data-oruga")).toBe(
                "dropdown-item",
            );
            expect(items.at(idx).text()).toBe(value);
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

        const dropdown = wrapper.findComponent(ODropdown);
        expect(dropdown.emitted("update:modelValue")).toHaveLength(1);
        expect(dropdown.emitted("change")).toHaveLength(1);
        expect(dropdown.emitted("change")[0][0]).toBe(values[2]);
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

        const dropdown = wrapper.findComponent(ODropdown);
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

        const dropdown = wrapper.findComponent(ODropdown);
        expect(dropdown.emitted("update:modelValue")).toHaveLength(1);
        expect(dropdown.emitted("change")).toHaveLength(1);
        expect(dropdown.emitted("change")[0][0]).toHaveLength(1);
        expect(dropdown.emitted("change")[0][0]).toContain(values[0]);
        expect(dropdown.emitted("close")).toBeUndefined();

        await items[2].trigger("click");

        expect(items[0].classes("o-drop__item--active")).toBeTruthy();
        expect(items[1].classes("o-drop__item--active")).toBeFalsy();
        expect(items[2].classes("o-drop__item--active")).toBeTruthy();

        expect(dropdown.emitted("update:modelValue")).toHaveLength(2);
        expect(dropdown.emitted("change")).toHaveLength(2);
        expect(dropdown.emitted("change")[1][0]).toHaveLength(2);
        expect(dropdown.emitted("change")[1][0]).toContain(values[0]);
        expect(dropdown.emitted("change")[1][0]).toContain(values[2]);
        expect(dropdown.emitted("close")).toBeUndefined();

        await items[0].trigger("click");
        expect(items[0].classes("o-drop__item--active")).toBeFalsy();
        expect(items[1].classes("o-drop__item--active")).toBeFalsy();
        expect(items[2].classes("o-drop__item--active")).toBeTruthy();

        expect(dropdown.emitted("update:modelValue")).toHaveLength(3);
        expect(dropdown.emitted("change")).toHaveLength(3);
        expect(dropdown.emitted("change")[2][0]).toHaveLength(1);
        expect(dropdown.emitted("change")[2][0]).toContain(values[2]);
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

        const dropdown = wrapper.findComponent(ODropdown);
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

        const dropdown = wrapper.findComponent(ODropdown);
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

        const dropdown = wrapper.findComponent(ODropdown);
        expect(dropdown.emitted("update:modelValue")).toHaveLength(1);
        expect(dropdown.emitted("update:modelValue")[0][0]).toStrictEqual(
            values[1],
        );
        expect(dropdown.emitted("change")).toHaveLength(1);
        expect(dropdown.emitted("change")[0][0]).toStrictEqual(values[1]);
        expect(dropdown.emitted("close")).toHaveLength(1);
    });
});
