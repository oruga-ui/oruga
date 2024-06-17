import { describe, test, expect, afterEach } from "vitest";
import { enableAutoUnmount, mount } from "@vue/test-utils";

import type { OptionsItem } from "../types";

import OSelect from "@/components/select/Select.vue";

describe("OSelect tests", () => {
    enableAutoUnmount(afterEach);

    const options: OptionsItem[] = [
        { label: "Flint", value: "flint" },
        { label: "Silver", value: "silver" },
        { label: "Vane", value: "vane" },
        { label: "Billy", value: "billy" },
        { label: "Jack", value: "silver", attrs: { disabled: true } },
    ];

    test("render correctly", () => {
        const wrapper = mount(OSelect);
        expect(!!wrapper.vm).toBeTruthy();
        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.attributes("data-oruga")).toBe("select");
        expect(wrapper.find("select").exists()).toBeTruthy(); // has a select element
        expect(wrapper.html()).toMatchSnapshot();
    });

    test("render options correctly", () => {
        const wrapper = mount(OSelect, {
            props: { options },
        });

        const optionsElements = wrapper.findAll("option");
        expect(optionsElements.length).toBe(options.length);
        optionsElements.forEach((el, idx) => {
            expect(el.text()).toBe(options[idx].label);
            expect(el.attributes("disabled")).toBe(
                options[idx].attrs?.disabled ? "" : undefined,
            );
        });
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
                multiple: true,
                autocomplete: "on",
                nativeSize: 3,
                modelValue: [],
            },
        });

        const select = wrapper.find("select");
        expect(select.exists()).toBeTruthy();
        expect(select.attributes("multiple")).not.toBeUndefined();
        expect(select.attributes("autocomplete")).toBe("on");
        expect(select.attributes("size")).toBe("3");
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

    // test("react accordingly when value change ", async () => {
    //     const wrapper = mount(OSelect, {
    //         props: { options },
    //     });

    //     const select = wrapper.find("select");
    //     expect(select.exists()).toBeTruthy();

    //     await select.setValue(options[1].value);
    //     let emits = wrapper.emitted("update:modelValue");
    //     expect(emits).toHaveLength(1);
    //     expect(emits[0]).toContain(options[1].value);

    //     await select.setValue(options[2].value);
    //     emits = wrapper.emitted("update:modelValue");
    //     expect(emits).toHaveLength(2);
    //     expect(emits[1]).toContain(options[2].value);
    // });
});
