import { describe, test, expect, afterEach, vi } from "vitest";
import { enableAutoUnmount, mount } from "@vue/test-utils";
import { nextTick } from "vue";

import OSwitch from "@/components/switch/Switch.vue";

describe("OSwitch tests", () => {
    enableAutoUnmount(afterEach);

    test("render correctly", () => {
        const wrapper = mount(OSwitch);
        expect(!!wrapper.vm).toBeTruthy();
        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.attributes("data-oruga")).toBe("switch");
        expect(
            wrapper.find("label input[type=checkbox]").exists(),
        ).toBeTruthy(); // has an input checkbox
        expect(wrapper.html()).toMatchSnapshot();
    });

    test("render accordingly when has native attributes", () => {
        const wrapper = mount(OSwitch, {
            props: {
                autocomplete: "on",
                nativeValue: true,
                required: true,
            },
        });

        const input = wrapper.find("input");
        expect(input.exists()).toBeTruthy();
        expect(input.attributes("value")).toBe("true");
        expect(input.attributes("autocomplete")).toBe("on");
        expect(input.attributes("required")).not.toBeUndefined();
    });

    test("render accordingly when has size prop", () => {
        const wrapper = mount(OSwitch, {
            props: { size: "large" },
        });

        expect(wrapper.classes("o-switch--large")).toBeTruthy();
    });

    test("render accordingly when has variant prop", () => {
        const wrapper = mount(OSwitch, {
            props: { variant: "danger" },
        });

        expect(wrapper.classes("o-switch--danger")).toBeTruthy();
    });

    test("render accordingly when has passiveVariant prop", () => {
        const wrapper = mount(OSwitch, {
            props: { passiveVariant: "danger" },
        });

        expect(wrapper.classes("o-switch--danger-passive")).toBeTruthy();
    });

    test("render accordingly when has rounded prop", () => {
        const wrapper = mount(OSwitch, {
            props: { rounded: true },
        });

        const span1 = wrapper.find("span.o-switch__check");
        expect(span1.exists()).toBeTruthy();
        expect(span1.classes("o-switch--rounded")).not.toBeUndefined();

        const span2 = wrapper.find("span.o-switch__check-switch");
        expect(span2.exists()).toBeTruthy();
        expect(span2.classes("o-switch--rounded")).not.toBeUndefined();
    });

    test("render accordingly when is disabled", () => {
        const wrapper = mount(OSwitch, {
            props: { disabled: true },
        });

        expect(wrapper.classes("o-switch--disabled")).toBeTruthy();
        const input = wrapper.find("input");
        expect(input.exists()).toBeTruthy();
        expect(input.attributes("disabled")).not.toBeUndefined();
    });

    test("react accordingly when value change ", async () => {
        const wrapper = mount(OSwitch);

        const input = wrapper.find("input");
        expect(input.exists()).toBeTruthy();

        await input.setValue(true);
        let emits = wrapper.emitted("update:modelValue");
        expect(emits).toHaveLength(1);
        expect(emits![0]).toContainEqual(true);
        expect(wrapper.vm.value).toEqual(true);

        await input.setValue(false);
        emits = wrapper.emitted("update:modelValue");
        expect(emits).toHaveLength(2);
        expect(emits![1]).toContainEqual(false);
        expect(wrapper.vm.value).toEqual(false);
    });

    test("react accordingly when custom string values are given", async () => {
        const trueValue = "Yes";
        const falseValue = "No";
        const wrapper = mount<typeof OSwitch<string>>(OSwitch, {
            props: { trueValue, falseValue },
        });

        const input = wrapper.find("input");
        expect(input.exists()).toBeTruthy();

        await input.setValue(true);
        let emits = wrapper.emitted("update:modelValue");
        expect(emits).toHaveLength(1);
        expect(emits![0]).toContainEqual(trueValue);
        expect(wrapper.vm.value).toEqual(trueValue);

        await input.setValue(false);
        emits = wrapper.emitted("update:modelValue");
        expect(emits).toHaveLength(2);
        expect(emits![1]).toContainEqual(falseValue);
        expect(wrapper.vm.value).toEqual(falseValue);
    });

    test("react accordingly when custom object values are given", async () => {
        const trueValue = { a: "a", b: "b" };
        const falseValue = { y: "y", x: "X" };
        const wrapper = mount<typeof OSwitch<object>>(OSwitch, {
            props: {
                modelValue: falseValue,
                trueValue,
                falseValue,
                "onUpdate:modelValue": (e) =>
                    wrapper.setProps({ modelValue: e }),
            },
        });

        const input = wrapper.find("input");
        expect(input.exists()).toBeTruthy();

        await input.setValue(true);
        let emits = wrapper.emitted("update:modelValue");
        expect(emits).toHaveLength(1);
        expect(emits![0]).toContainEqual(trueValue);
        expect(wrapper.vm.value).toEqual(trueValue);

        await input.setValue(false);
        emits = wrapper.emitted("update:modelValue");
        expect(emits).toHaveLength(2);
        expect(emits![0]).toContainEqual(trueValue);
        expect(emits![1]).toContainEqual(falseValue);
        expect(wrapper.vm.value).toEqual(falseValue);
    });

    test("react accordingly when method focus() is called", async () => {
        const wrapper = mount(OSwitch);

        const input = wrapper.find("input");
        input.element.focus = vi.fn();

        wrapper.vm.focus();
        await nextTick(() => {
            expect(input.element.focus).toHaveBeenCalled();
        });
    });
});
